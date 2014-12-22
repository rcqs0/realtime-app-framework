var React = require('react');
var Hand = require('./Hand');

var App = React.createClass({
    getInitialState: function() {
        return {view: 'hand'};
    },
    switchToHand: function() {
        this.setState({view: 'hand'});
    },
    switchToBoard: function() {
        this.setState({view: 'board'});
    },
    render: function() {

        var view = '';

        if (this.state.view == 'hand') {
            view = <Hand />
        }

        return (
            <div>
                <div>
                    <button onClick={this.switchToHand}>View hand</button>
                    <button onClick={this.switchToBoard}>View board</button>
                </div>
                <div>{view}</div>
            </div>
        );
    }
});

module.exports = App;