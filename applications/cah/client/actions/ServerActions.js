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

    updateBoard: function(board) {

        var action = {
            actionType: 'RECEIVE_BOARD',
            board: board
        };

        dispatchClient(action);

    },

    updateGameState: function(gameState) {

        var action = {
            actionType: 'UPDATE_GAME_STATE',
            gameState: gameState
        };

        dispatchClient(action);

    }

};

module.exports = ServerActions;