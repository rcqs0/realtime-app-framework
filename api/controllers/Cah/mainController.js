/**
 * Cah/mainController
 *
 * @description :: Server-side logic for managing cah/mains
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {



    /**
     * `CahController.index()`
     */
    index: function (req, res) {

        return res.view('base', {application: 'cah'});

    }
};


