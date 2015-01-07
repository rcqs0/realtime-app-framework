var Bacon = require('baconjs');
var dispatcher = require('../dispatcher/Dispatcher');

var stream = new Bacon.Bus();
var CHANGE_EVENT = 'change';

var id = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5);;
var cards = [];
var isJudge = false;
var points = 0;
var gameState = null;
var board = [];

function replaceBoard(newBoard) {

    board = newBoard;

}

function updatePlayer(player) {

    cards = player.cards;
    isJudge = player.isJudge;
    points = player.points;

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
            board: board
        };
    },

    getBoard: function() {
        return {
            board: board
        };
    }

};

dispatcher.register(function(action) {

    switch(action.actionType) {

        case 'UPDATE_PLAYER':

            if (action.player.id === id) {
                updatePlayer(action.player);
            }

            break;

        case 'UPDATE_GAME_STATE':

            gameState = action.gameState;

            break;

        case 'RECEIVE_BOARD':

            replaceBoard(action.board);

            break;

        default:
            return true;
    }

    PlayerStore.emitChange();

});

module.exports = PlayerStore;

