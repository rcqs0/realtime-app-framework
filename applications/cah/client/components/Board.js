var React = require('react');
var PlayerActions = require('../actions/PlayerActions');
var BoardStore = require('../stores/BoardStore');

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

        var boardCardNodes = this.state.board.map(function(card) {

            return (

                <li key={card.id}>
                    {card.selected ? <b>{card.text}</b> : card.text}
                </li>

                );

        }.bind(this));

        var boardCardPlaceholderNodes = this.state.board.map(function(card) {

            return <li key={card.id}>...</li>;

        });

        var boardNodes = this.state.gameState == 'PLAY_CARDS' ? boardCardPlaceholderNodes : boardCardNodes;

        var playerNodes = this.state.players.map(function(player) {
            return <li>{player.id}: {player.points}</li>;
        });

        return (
            <div>
                <div>
                    Players:
                    <ul>
                        {playerNodes}
                    </ul>
                </div>
                <div>
                    Question: {this.state.question.text}
                </div>
                <div>
                    <ul>{boardNodes}</ul>
                </div>
            </div>
            );
    },
    _onChange: function() {
        this.setState(getBoardState());
    }
});

module.exports = Board;