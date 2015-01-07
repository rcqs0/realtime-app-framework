var Bacon = require('baconjs');

var stream = new Bacon.Bus();

var Dispatcher = {
    dispatch: function(action) {
        stream.push(action);

        console.log(action);
    },

    register: function(callback) {
        stream.onValue(callback);
    }

};

module.exports = Dispatcher;