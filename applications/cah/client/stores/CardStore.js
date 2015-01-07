var _ = require('lodash-node/underscore');
var Bacon = require('baconjs');
var async = require('async');
var dispatcher = require('../dispatcher/Dispatcher');

var stream = new Bacon.Bus();
var CHANGE_EVENT = 'change';

var cards = _.map(require('../data/cards.json'), function(card) {

    card.owner = null;
    card.played = false;
    card.discarded = false;

    return card;

});

var players = [];
var board = [];
var gameState = null;

function getAvailableCards() {

    return _.where(cards, {owner: null, discarded: false, played: false});

}

function getPlayer(playerId) {

    return _.findWhere(players, {id: playerId});

}

function getCardsOfPlayer(playerId) {

    return _.where(cards, {owner: playerId});

}

function assignCardsToPlayers() {

    async.eachSeries(players, function(player, callback) {

        var playerId = player.id;

        var maxNumCards = 3;

        var playerCardCount = getCardsOfPlayer(playerId).length;

        var numNewCards = maxNumCards - playerCardCount;

        var availableCards = getAvailableCards();

        var newCards = _.sample(availableCards, numNewCards);

        _.each(newCards, function (card) {

            card.owner = playerId;

        });

        callback();
    });

}

function assignJudge() {

    var currentJudge = _.findWhere(players, {isJudge: true});

    if (currentJudge) {

        currentJudge.isJudge = false;

        var currentJudgeIndex = _.indexOf(players, currentJudge);

        var numPlayers = players.length;

        if (currentJudgeIndex < numPlayers - 1) {

            players[currentJudgeIndex + 1].isJudge = true;

        } else {

            players[0].isJudge = true;

        }

    } else {

        players[0].isJudge = true;

    }

}

function getJudge() {

    return _.findWhere(players, {isJudge: true});

}

function changeGameState(newState) {

    gameState = newState;

}

function playCard(newCard) {

    var currentJudge = getJudge();

    var playerIsJudge = currentJudge.id === newCard.owner;

    if (gameState === 'PLAY_CARDS' && !playerIsJudge) {

        // remove current cards player has on board
        var playerCardsOnBoard = _.filter(board, function (card) {

            return card.owner == newCard.owner;

        });

        _.each(playerCardsOnBoard, function (card) {
            card.played = false;
        });

        board = _.difference(board, playerCardsOnBoard);

        // add new cards to board
        newCard.played = true;

        board.push(newCard);

        if (board.length === players.length - 1) {

            changeGameState('SELECT_CARD');

        }

    }

}

function clearBoard() {

    _.each(board, function(card) {

        card.discarded = true;

    });

    board = [];

}

function assignWinner(playerId) {

    var winner = getPlayer(playerId);

    winner.points += 1;

    return winner;

}

function selectCard(playerId, card) {

    if (gameState === 'SELECT_CARD') {

        var currentJudge = getJudge();

        if (playerId === currentJudge.id) {

            var winner = assignWinner(card.owner);

            console.log(winner);

            startTurn();

        }

    }

}

function startTurn() {

    changeGameState('PLAY_CARDS');

    clearBoard();
    assignCardsToPlayers();
    assignJudge();

}

var CardStore = {

    emitChange: function() {
        stream.push(CHANGE_EVENT);
    },

    addChangeListener: function(callback) {
        stream.onValue(callback);
    },

    getCardsOfPlayer: function(playerId) {
        return getCardsOfPlayer(playerId);
    },

    getPlayer: function(playerId) {
        var player = _.findWhere(players, {id: playerId});
        player.cards = getCardsOfPlayer(playerId);

        return player;
    },

    getPlayers: function() {
        return players;
    },

    getBoard: function() {
        return board;
    },

    getGameState: function() {
        return gameState;
    }

};

dispatcher.register(function(action) {

    switch(action.actionType) {

        case 'IDENTIFY_PLAYER':

            var playerId = action.playerId;

            if (!_.findWhere(players, {id: playerId})) {

                // TODO: make stores isomorphic classes and use dehydrate / rehydrate to update the client store
                players.push({
                    id: playerId,
                    isJudge: 0,
                    points: 0
                    // cards?
                });

            }

            break;

        case 'START_GAME':

            startTurn();

            break;

        case 'PLAY_CARD':

            playCard(action.card);

            break;

        case 'SELECT_CARD':

            selectCard(action.playerId, action.card);

            break;

        default:
            return true;
    }

    CardStore.emitChange(); // emit different change events depending on action?

});

module.exports = CardStore;