/**
 * SocketController
 *
 * @description :: Server-side logic for managing sockets
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

  /**
   * `SocketController.test()`
   */
  test: function (req, res) {

    game.createGame(req.user);

    return res.json({count: game.getHost()});
  }
};

