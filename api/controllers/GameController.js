/**
 * GameController
 *
 * @description :: Server-side logic for managing games
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

    index: function(req, res) {

        // Render base layout and inject the client-side application

        return res.view('base', {application: 'game'});

    }
};