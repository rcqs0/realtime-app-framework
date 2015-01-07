var React = require('react');
var PlayerActions = require('../actions/PlayerActions');
var PlayerStore = require('../stores/PlayerStore');

var getPlayerState = function() {
    return PlayerStore.getAll();
};

var Hand = React.createClass({
    getInitialState: function() {
        var state = getPlayerState();
        state.view = 'PLAYER';

        return state;
    },
    componentWillMount: function() {
        PlayerStore.addChangeListener(this._onChange);

        PlayerActions.identify(this.state.id);
    },
    render: function() {
        var cardNodes = this.state.cards.map(function(card) {

            return (

                <li key={card.id} onClick={this._playCard.bind(this, card)}>
                    {card.played ? <b>{card.text}</b> : card.text}
                </li>

            );

        }.bind(this));

        var boardCardNodes = this.state.board.map(function(card) {

            return (

                <li key={card.id} onClick={this._selectCard.bind(this, card)}>
                    {card.selected ? <b>{card.text}</b> : card.text}
                </li>

            );

        }.bind(this));

        var boardCardPlaceholderNodes = this.state.board.map(function(card) {

            return <li key={card.id}>...</li>;

        });

        var boardNodes = this.state.gameState == 'PLAY_CARDS' ? boardCardPlaceholderNodes : boardCardNodes;

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
                    {!this.state.gameState ? <button onClick={this._startGame}>Start game!</button> : ''}
                </div>
                <div>
                    Question: {this.state.question.text}
                </div>
                <div>
                    {!this.state.isJudge ? <ul>{cardNodes}</ul> : ''}
                </div>
                <div>
                    {this.state.isJudge ? <ul>{boardNodes}</ul> : ''}
                </div>
                <div>
                    {this.state.isJudge ? <button onClick={this._confirmCard}>Confirm</button> : ''}
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
    },
    _confirmCard: function() {
        PlayerActions.confirmCard(this.state.id);
    }
});

module.exports = Hand;