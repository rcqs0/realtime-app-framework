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
        console.log(this.state.cards);

        var cardNodes = this.state.cards.map(function(card) {

            return (

                <li key={card.id} onClick={this._playCard.bind(this, card)}>
                    {card.played ? <b>{card.text}</b> : card.text}
                </li>

            );

        }.bind(this));

        var boardCardNodes = this.state.board.map(function(card) {return <li key={card.id} onClick={this._selectCard.bind(this, card)}>{card.text}</li>;}.bind(this));
        return (
            <div>
                <div>
                    Game state: {this.state.gameState}
                </div>
                <div>
                    Hello, {this.state.isJudge ? <b>judge</b> : ''} {this.state.id}!
                </div>
                <div>
                    Points: {this.state.points}
                </div>
                <div>
                    <button onClick={this._startGame}>Start game!</button>
                </div>
                <div>
                    {!this.state.isJudge ? <ul>{cardNodes}</ul> : ''}
                </div>
                <div>
                    {this.state.isJudge ? <ul>{boardCardNodes}</ul> : ''}
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
    },
    _selectCard: function(card) {
        PlayerActions.selectCard(this.state.id, card);
    }
});

module.exports = Hand;