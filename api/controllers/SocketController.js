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

    console.log(req.user);

    return res.json({
      todo: 'test() is not implemented yet!'
    });
  }
};

