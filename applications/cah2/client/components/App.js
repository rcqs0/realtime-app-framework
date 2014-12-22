var React = require('react');
var Hand = require('./Hand');
var Board = require('./Board');

var App = React.createClass({
    render: function() {

        return (
            <div>
                <Hand />
                <Board />
            </div>
        );
    }
});

module.exports = App;