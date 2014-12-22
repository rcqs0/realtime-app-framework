var _ = require('lodash-node/underscore');
var Bacon = require('baconjs');
var dispatcher = require('../dispatcher/Dispatcher');

var stream = new Bacon.Bus();
var CHANGE_EVENT = 'change';

var cards = _.map(require('../data/cards.json'), function(card) {

    card.owner = null;
    card.played = false;

    return card;

});

var players = [];
var board = [];

function assignCardsToPlayer(playerId) {

    var newCards = _.sample(cards, 3);

    _.each(newCards, function(card) {

        card.owner = playerId;

    });

}

function playCard(newCard) {

    // remove current cards player has on board
    var playerCardsOnBoard = _.filter(board, function(card) {

        return card.owner == newCard.owner;

    });

    _.each(playerCardsOnBoard, function(card) {
        card.played = false;
    });

    board = _.difference(board, playerCardsOnBoard);

    // add new cards to board
    newCard.played = true;

    board.push(newCard);

}

var CardStore = {

    emitChange: function() {
        stream.push(CHANGE_EVENT);
    },

    addChangeListener: function(callback) {
        stream.onValue(callback);
    },

    getCardsOfPlayer: function(playerId) {
        return _.where(cards, {owner: playerId});
    },

    getPlayers: function() {
        return players;
    },

    getBoard: function() {
        return board;
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

            _.each(players, function(player) {

                assignCardsToPlayer(player.id);

            });

            break;

        case 'PLAY_CARD':

            playCard(action.card);

            break;

        default:
            return true;
    }

    CardStore.emitChange(); // emit different change events depending on action?? definately.

});

module.exports = CardStore;