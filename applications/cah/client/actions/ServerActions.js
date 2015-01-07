var dispatcher = require('../dispatcher/Dispatcher');

function dispatch(action) {
    dispatcher.dispatch(action);
}

function dispatchClient(action) {

    sails.io.sockets.in('cah-room').emit('action', action);

}

// ACTIONS

var ServerActions = {

    updatePlayer: function(player) {
        var action = {
            actionType: 'UPDATE_PLAYER',
            player: player
        };

        dispatchClient(action);
    },

    updateAll: function(state) {

        var action = {
            actionType: 'UPDATE_ALL',
            state: state
        };

        dispatchClient(action);

    }

};

module.exports = ServerActions;