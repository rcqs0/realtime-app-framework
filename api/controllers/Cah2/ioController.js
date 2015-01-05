/**
 * Cah/ioController
 *
 * @description :: Server-side logic for managing cah/ios
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

var x = null;
var socket = null;

var _ = require('lodash-node');

var dispatcher = require('../../../applications/cah2/client/dispatcher/Dispatcher');
var CardStore = require('../../../applications/cah2/client/stores/CardStore');
var ServerActions = require('../../../applications/cah2/client/actions/ServerActions');

CardStore.addChangeListener(function() {

    var players = CardStore.getPlayers();

    _.each(players, function(player) {

        ServerActions.updatePlayer(CardStore.getPlayer(player.id));
        
    });

    ServerActions.updateBoard(CardStore.getBoard());
});

module.exports = {

    action: function(req, res) {

        socket = req.socket;

        socket.join('cah2-room');

        var action = req.param('action');
        x = action;

        dispatcher.dispatch(action);

        //console.log(action);

    }

};
