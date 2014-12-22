var _ = require('lodash-node/underscore');
var async = require('async');

var Game = function() {

    this.players = [];
    this.judge = {};
    this.question = {};
    this.answers = [];
    this.numCards = 3;

    this.turn = 0;
    this.started = false;

    this.cards = _.map(require('../data/cards.json'), function(cardData) {
        var card = cardData;

        card.owner = false;
        card.played = false;
        card.discarded = false;

        return card;
    });

    this.getCard = function(cardData) {
        return _.findWhere(this.cards, cardData);
    };

    this.addPlayer = function(player) {
        this.players.push(player);
    };

    this.getPlayer = function(playerData) {
        return _.findWhere(this.players, playerData);
    };

    this.assignAnswers = function() {
        // discard and remove played answer cards
        _.each(this.players, function(player) {
            var playedCards = player.playedCards;

            _.each(playedCards, function(card) {
                card.discarded = true;
            });

            player.answerCards = _.difference(player.answerCards, playedCards);
            player.playedCards = [];
        });

        // assign new answer cards to players
        async.eachSeries(this.players, function(player, cb) {
            var availableAnswerCards = _.where(this.cards, {owner: false, discarded: false, cardType: 'A'});

            var numNewCards = this.numCards - player.answerCards.length;

            var newCards = _.sample(availableAnswerCards, numNewCards);

            _.each(newCards, function(card) {
                player.answerCards.push(card);

                card.owner = player.id;
            });

            cb();
        }.bind(this));
    };

    this.assignJudge = function() {
        if (!this.judge) {
            this.judge = this.players[0];
        } else {
            this.judge.isJudge = false;

            var numPlayers = this.players.length;

            var judgeIndex = _.indexOf(this.players, this.judge);

            if (judgeIndex < numPlayers -1) {
                this.judge = this.players[judgeIndex + 1];
            } else {
                this.judge = this.players[0];
            }
        }

        this.judge.isJudge = true;
    };

    this.assignQuestion = function() {
        if (this.question) {
            this.question.discarded = true;
        }

        var availableQuestionCards = _.where(this.cards, {discarded: false, cardType: 'Q'});

        var questionCard = _.sample(availableQuestionCards);
        questionCard.played = true;

        this.question = questionCard;
    };

    this.playCards = function(playerInfo, cardsInfo) {
        var player = this.getPlayer(playerInfo);

        player.playedCards = [];

        _.each(cardsInfo, function(cardInfo) {
            var answerCard = _.findWhere(player.answerCards, cardInfo);

            if (answerCard) {
                player.playedCards.push(answerCard);
            }
        });
    };

    this.getAnswerCards = function() {
        return _.flatten(_.pluck(this.players, 'playedCards'));
    };

    this.chooseAnswers = function(playerInfo, cardsInfo) {

        var player = this.getPlayer(playerInfo);
        var playedAnswerCards = this.getAnswerCards();

        var answerCards = _.map(cardsInfo, function(cardInfo) {
            return _.findWhere(playedAnswerCards, cardInfo);
        });

        if (this.judge == player && this.question) {

            if (this.question.numAnswers == answerCards.length) {

                var winner = this.getPlayer({id: answerCards[0].owner});

                winner.points += 1;

                console.log(winner.name + ' won this turn!');

                this.nextTurn();
            }
        }

        return winner;
    };

    this.nextTurn = function() {
        this.assignAnswers();
        this.assignQuestion();
        this.assignJudge();
    };

    this.requiredAnswers = function() {
        if (this.question) {
            return this.question.numAnswers;
        } else {
            return 0;
        }
    };
};

module.exports = Game;