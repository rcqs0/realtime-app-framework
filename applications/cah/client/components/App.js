var React = require('react');
var Hand = require('./Hand');
var Board = require('./Board');

var App = React.createClass({
    getInitialState: function() {
        return {view: 'MAIN'}
    },
    renderMain: function() {
        return (
            <div>
                <button onClick={this._joinGame}>Join game</button>
                <button onClick={this._viewBoard}>View board</button>
            </div>
        );
    },
    renderPlayer: function() {

        return <Hand />;
    },
    renderBoard: function() {
        return <Board />;
    },
    render: function() {
        switch (this.state.view) {

            case 'PLAYER':

                return this.renderPlayer();

                break;

            case 'BOARD':

                return this.renderBoard();

                break;

            default:

                return this.renderMain();

        }
    },
    _joinGame: function() {
        this.setState({view: 'PLAYER'});
    },
    _viewBoard: function() {
        this.setState({view: 'BOARD'});
    }
});

module.exports = App;