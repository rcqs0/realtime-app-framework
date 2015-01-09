/**
 * Cah/ioController
 *
 * @description :: Server-side logic for managing cah/ios
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

var _ = require('lodash-node');

var dispatcher = require('../../../applications/cah/client/dispatcher/Dispatcher');
var CardStore = require('../../../applications/cah/client/stores/CardStore');
var ServerActions = require('../../../applications/cah/client/actions/ServerActions');

CardStore.addChangeListener(function() {

    var players = CardStore.getPlayers();

    _.each(players, function(player) {

        ServerActions.updatePlayer(CardStore.getPlayer(player.id));

    });

    ServerActions.updateAll(CardStore.getAll());
});

module.exports = {

    action: function(req, res) {

        req.socket.join('cah-room');

        var action = req.param('action');

        dispatcher.dispatch(action);

    }

};