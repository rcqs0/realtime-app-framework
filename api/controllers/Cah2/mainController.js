/**
 * Cah2/mainController
 *
 * @description :: Server-side logic for managing cah2/mains
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
    index: function (req, res) {

        return res.view('base', {application: 'cah2'});

    }
};

