var React = require('react');
var PlayerActions = require('../actions/PlayerActions');
var PlayerStore = require('../stores/PlayerStore');

var getPlayerState = function() {
    return PlayerStore.getAll();
};

var Hand = React.createClass({
    getInitialState: function() {
        return getPlayerState();
    },
    componentWillMount: function() {
        PlayerStore.addChangeListener(this._onChange);

        PlayerActions.identify(this.state.id);
    },
    render: function() {
        var cardNodes = this.state.cards.map(function(card) {return <li key={card.id} onClick={this._playCard.bind(this, card)}>{card.text}</li>;}.bind(this));
        return (
            <div>
                <div>
                    Hello, {this.state.id}!
                </div>
                <div>
                    <button onClick={this._startGame}>Start game!</button>
                </div>
                <div>
                    <ul>{cardNodes}</ul>
                </div>
            </div>
        );
    },
    _onChange: function() {
        this.setState(getPlayerState());
    },
    _startGame: function() {
        PlayerActions.startGame();
    },
    _playCard: function(card) {
        PlayerActions.playCard(card);
    }
});

module.exports = Hand;