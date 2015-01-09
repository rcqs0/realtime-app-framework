var React = require('react');
var _ = require('lodash-node/underscore');
var PlayerActions = require('../actions/PlayerActions');
var BoardStore = require('../stores/BoardStore');
var CardList = require('./CardList');
var PlayerList = require('./PlayerList');

var getBoardState = function() {
    return BoardStore.getAll();
};

var Board = React.createClass({
    getInitialState: function() {

        return getBoardState();
    },
    componentWillMount: function() {
        BoardStore.addChangeListener(this._onChange);

        PlayerActions.connect();
    },
    render: function() {

        var bigCards = [this.state.question];
        var selectedCard = _.findWhere(this.state.board, {selected: true});
        if (selectedCard) {
            bigCards.push(selectedCard);
        }

        var hideCards = this.state.gameState == 'PLAY_CARDS';

        return (
            <div className="container-fluid">
                <div className="col-9">

                    <CardList cards={bigCards} />
                    <CardList cards={this.state.board} hidden={hideCards} small />

                </div>
                <div className="col-3">
                    <div className="side-bar">
                        <div className="side-bar-inner">

                            <h1>Players</h1>
                            <PlayerList players={this.state.players} />

                        </div>
                    </div>
                </div>
            </div>
            );
    },
    _onChange: function() {
        this.setState(getBoardState());
    },
});

module.exports = Board;