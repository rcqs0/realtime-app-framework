var React = require('react');
var PlayerActions = require('../actions/PlayerActions');
var PlayerStore = require('../stores/PlayerStore');
var CardList = require('./CardList');
var StackedCardList = require('./StackedCardList');

var getPlayerState = function() {
    return PlayerStore.getAll();
};

var Hand = React.createClass({
    getInitialState: function() {
        return getPlayerState();
    },
    componentWillMount: function() {
        PlayerStore.addChangeListener(this._onChange);

        PlayerActions.identify(this.props.id);
        PlayerActions.changeId(this.props.id);
    },
    render: function() {

        var statusText = this.state.gameState === 'PLAY_CARDS' ? 'Play your cards!' : 'Waiting for judge...';

        var hideCards = this.state.gameState == 'PLAY_CARDS';

        return (
            <div>
                <div className="top-bar">
                    <div className="top-bar-inner">
                        <div>
                            {this.state.isJudge ? <b>judge</b> : ''} {this.state.id}!
                            <span className="points-badge"> {this.state.points} Points</span>
                        </div>
                        <div className="status-text">{statusText}</div>
                    </div>
                </div>
                <div className="pad">
                    {!this.state.gameState ? <div className="bottom-bar"><button className="button" onClick={this._startGame}>Start</button></div> : <StackedCardList cards={[this.state.question]} />}

                    {!this.state.isJudge ? <StackedCardList cards={this.state.cards} handler={this._playCard} /> : ''}
                    {this.state.isJudge ? <StackedCardList cards={this.state.board} handler={this._selectCard} hidden={hideCards} /> : ''}
                </div>
                <div className="bottom-bar">
                    {this.state.isJudge ? <button className="button" onClick={this._confirmCard}>Confirm</button> : ''}
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