var Bacon = require('baconjs');
var _ = require('lodash-node/underscore');
var dispatcher = require('../dispatcher/Dispatcher');

var stream = new Bacon.Bus();
var CHANGE_EVENT = 'change';

var _state = {
    gameState: null,
    question: {},
    board: [],
    judge: {},
    players: []
};

var BoardStore = {

    emitChange: function() {
        stream.push(CHANGE_EVENT);
    },

    addChangeListener: function(callback) {
        stream.onValue(callback);
    },

    getAll: function() {

        return _state;

    }

};

dispatcher.register(function(action) {

    switch(action.actionType) {

        case 'UPDATE_ALL':

            _state = action.state;

            break;

        default:
            return true;
    }

    BoardStore.emitChange();

});

module.exports = BoardStore;

