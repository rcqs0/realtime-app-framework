var React = require('react');
var _ = require('lodash-node/underscore');
var cards = require('../data/cards.json');

var answerCards = _.where(cards, {cardType: 'A'});
var questionCards = _.where(cards, {cardType: 'Q'});

var generateHand = function(cards, n) {
    return _.sample(cards, n);
};

var generateQuestion = function(cards) {
    return _.sample(cards, 1)[0];
};

var App = React.createClass({
    getInitialState: function() {
        return {hand: [], question: {text: '...'}, selected: null};
    },
    generateNewHand: function() {
        var newHand = generateHand(answerCards, 10);

        this.setState({hand: newHand});
    },
    generateNewQuestion: function() {
        var newQuestion = generateQuestion(questionCards);

        this.setState({question: newQuestion});
    },
    selectAnswer: function(card) {
        this.setState({selected: card});
    },
    testSocket: function() {
        io.socket.get('/socket/test', function(data, res) {
            console.log(data);
        });
    },
    render: function() {
        var cards = this.state.hand.map(function(card) {
            if (this.state.selected == card) {
                return <li key={card.id} onClick={this.selectAnswer.bind(this, card)} className='selected'>{card.text}</li>
            } else {
                return <li key={card.id} onClick={this.selectAnswer.bind(this, card)}>{card.text}</li>
            }
        }.bind(this));

        return (
            <div>
                <div className='question-card'>
                    {this.state.question.text}
                    <span className='chosen'>{this.state.selected ? '   ' + this.state.selected.text : ''}</span>
                </div>
                <div>
                    <button onClick={this.generateNewQuestion}>Get question!</button>
                    <button onClick={this.generateNewHand}>Get hand!</button>
                </div>
                <div>
                    <ul className='cardList'>
                        {cards}
                    </ul>
                </div>
                <div>
                    <button onClick={this.testSocket}>Host</button>
                </div>
            </div>
        );
    }
});

module.exports = App;