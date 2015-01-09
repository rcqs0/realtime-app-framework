var React = require('react');
var Hand = require('./Hand');
var Board = require('./Board');

var App = React.createClass({
    getInitialState: function() {
        return {view: 'MAIN', id: Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5)}
    },
    renderMain: function() {
        return (
            <div>
                <div>
                    <input type="text" value={this.state.id} onChange={this._handleChange} />
                </div>
                <div>
                    <button className="button" onClick={this._joinGame}>Join game</button>
                    <button className="button" onClick={this._viewBoard}>View board</button>
                </div>
            </div>
        );
    },
    renderPlayer: function() {

        return <Hand id={this.state.id} />;
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
    _handleChange: function(e) {
        this.setState({id: e.target.value});
    },
    _joinGame: function() {
        this.setState({view: 'PLAYER'});
    },
    _viewBoard: function() {
        this.setState({view: 'BOARD'});
    }
});

module.exports = App;