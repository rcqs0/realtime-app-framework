/**
 * Cah/ioController
 *
 * @description :: Server-side logic for managing cah/ios
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

var _ = require('lodash-node');

var Player = require('../../../applications/cah/server/models/Player');
var Game = require('../../../applications/cah/server/models/Game');

var game = new Game;

module.exports = {

    identify: function(req, res) {

        var name = req.param('name');

        var player = game.getPlayer({name: name});
        console.log(player);

        if (!player) {
            player = new Player(name);

            game.addPlayer(player);
        }

        player.socket = req.socket.id;

        res.json(player);
    },

    start: function(req, res) {
        var io = sails.io;

        game.assignQuestion();
        game.assignAnswers();
        game.assignJudge();

        _.each(game.players, function(player) {
            io.sockets.socket(player.socket).emit('playerUpdate', player);
        });
    }

};
