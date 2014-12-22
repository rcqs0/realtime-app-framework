var dispatcher = require('../dispatcher/Dispatcher');

function dispatch(action) {
    dispatcher.dispatch(action);
}

function dispatchServer(action) {
    io.socket.post('/cah2/io/action', {action: action});
}

io.socket.on('action', function(action) {
    dispatcher.dispatch(action);

    console.log(action);
});

// ACTIONS

var PlayerActions = {

    identify: function(playerId) {

        var action = {
            actionType: 'IDENTIFY_PLAYER',
            playerId: playerId
        };

        dispatchServer(action);

    },

    startGame: function() {

        var action = {
            actionType: 'START_GAME'
        };

        dispatchServer(action);

    },

    playCard: function(card) {

        var action = {
            actionType: 'PLAY_CARD',
            card: card
        };

        dispatchServer(action);

    }

};

module.exports = PlayerActions;