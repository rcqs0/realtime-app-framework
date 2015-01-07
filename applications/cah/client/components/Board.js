var React = require('react');
var PlayerActions = require('../actions/PlayerActions');
var BoardStore = require('../stores/PlayerStore');

var getBoardState = function() {
    return BoardStore.getBoard();
};

var Board = React.createClass({
    getInitialState: function() {
        return getBoardState();
    },
    componentWillMount: function() {
        BoardStore.addChangeListener(this._onChange);
    },
    render: function() {
        var cardNodes = this.state.board.map(function(card) {return <li key={card.id} onClick={this._selectCard.bind(this, card)}>{card.text}</li>;}.bind(this));
        return (
            <div>
                <div>
                    <ul>{cardNodes}</ul>
                </div>
            </div>
            );
    },
    _onChange: function() {
        this.setState(getBoardState());
    },
    _selectCard: function(card) {
        PlayerActions.selectCard(card);
    }
});

module.exports = Board;