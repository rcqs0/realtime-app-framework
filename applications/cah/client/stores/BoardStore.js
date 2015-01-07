var Bacon = require('baconjs');
var dispatcher = require('../dispatcher/Dispatcher');

var stream = new Bacon.Bus();
var CHANGE_EVENT = 'change';

var board = [];

function replaceBoard(newBoard) {

    board = newBoard;

}

var BoardStore = {

    emitChange: function() {
        stream.push(CHANGE_EVENT);
    },

    addChangeListener: function(callback) {
        stream.onValue(callback);
    },

    getAll: function() {
        return {
            board: board
        };
    }

};

dispatcher.register(function(action) {

    switch(action.actionType) {

        case 'UPDATE_BOARD':

            replaceBoard(action.board);

            break;

        default:
            return true;
    }

    BoardStore.emitChange();

});

module.exports = BoardStore;

