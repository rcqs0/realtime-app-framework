var Bacon = require('baconjs');
var dispatcher = require('../dispatcher/Dispatcher');

var stream = new Bacon.Bus();
var CHANGE_EVENT = 'change';

var id = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5);;
var cards = [];

function replaceCards(newCards) {

    cards = newCards;

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
            cards: cards
        };
    }

};

dispatcher.register(function(action) {

    switch(action.actionType) {

        case 'RECEIVE_CARDS':

            if (action.playerId === id) {
                replaceCards(action.cards);
            }

            break;

        default:
            return true;
    }

    PlayerStore.emitChange();

});

module.exports = PlayerStore;

