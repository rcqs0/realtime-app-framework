var Bacon = require('baconjs');
var dispatcher = require('../dispatcher/Dispatcher');

var stream = new Bacon.Bus();
var CHANGE_EVENT = 'change';

var id = null;
var cards = [];
var isJudge = false;
var points = 0;
var gameState = null;
var board = [];
var question = {
    text: '...?'
};

function changeId(playerId) {

    id = playerId;

}

function updatePlayer(player) {

    cards = player.cards;
    isJudge = player.isJudge;
    points = player.points;

}

function updateAll(state) {

    question = state.question;
    board = state.board;
    gameState = state.gameState;

}

var PlayerStore = {

    emitChange: function() {
        stream.push(CHANGE_EVENT);
    },

    addChangeListener: function(callback) {
        stream.onValue(callback);
    },

    getAll: function() {
        return {
            id: id,
            cards: cards,
            isJudge: isJudge,
            points: points,
            gameState: gameState,
            board: board,
            question: question
        };
    }

};

dispatcher.register(function(action) {

    switch(action.actionType) {

        case 'CHANGE_ID':

            changeId(action.playerId);

            break;

        case 'UPDATE_PLAYER':

            if (action.player.id === id) {
                updatePlayer(action.player);
            }

            break;

        case 'UPDATE_ALL':

            updateAll(action.state);

            break;

        default:
            return true;
    }

    PlayerStore.emitChange();

});

module.exports = PlayerStore;

