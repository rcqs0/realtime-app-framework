var React = require('react');
var _ = require('lodash-node/underscore');
var cards = require('../data/cards.json');

var answerCards = _.where(cards, {cardType: 'A'});

var generateHand = function(cards, n) {
    return _.sample(cards, n);
};

var App = React.createClass({
    getInitialState: function() {
        return {hand: []};
    },
    handleClick: function() {
        var newHand = generateHand(answerCards, 7);

        this.setState({hand: newHand});
    },
    render: function() {
        var cards = this.state.hand.map(function(card) {return <li key={card.id}>{card.text}</li>});

        return (
            <div>

                <button onClick={this.handleClick}>Get hand!</button>

                <ul className='cardList'>
                    {cards}
                </ul>

            </div>
        );
    }
});

module.exports = App;