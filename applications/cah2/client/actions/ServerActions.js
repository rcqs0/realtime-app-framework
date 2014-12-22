var dispatcher = require('../dispatcher/Dispatcher');

function dispatch(action) {
    dispatcher.dispatch(action);
}

function dispatchClient(action) {

    sails.io.sockets.in('cah2-room').emit('action', action);

}

// ACTIONS

var ServerActions = {

    updatePlayer: function(playerId, cards) {

        var action = {
            actionType: 'RECEIVE_CARDS',
            cards: cards,
            playerId: playerId
        };

        dispatchClient(action);

    },

    updateBoard: function(board) {

        var action = {
            actionType: 'RECEIVE_BOARD',
            board: board
        };

        dispatchClient(action);

    }

};

module.exports = ServerActions;