var count = 0;
var host = null;

var q = {
    getCounter: function() {
        count += 1;

        return count;
    },

    createGame: function(user) {
        host = user;
    },

    getHost: function() {
        return host;
    }
};

module.exports = q;