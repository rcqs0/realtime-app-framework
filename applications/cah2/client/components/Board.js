var React = require('react');
var BoardStore = require('../stores/BoardStore');

var getBoardState = function() {
    return BoardStore.getAll();
};

var Hand = React.createClass({
    getInitialState: function() {
        return getBoardState();
    },
    componentWillMount: function() {
        BoardStore.addChangeListener(this._onChange);
    },
    render: function() {
        var cardNodes = this.state.board.map(function(card) {return <li key={card.id}>{card.text}</li>;});
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
    }
});

module.exports = Hand;