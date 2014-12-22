var Player = function(username) {
    this.name = username;
    this.id = username;
    this.answerCards = [];
    this.playedCards = [];
    this.points = 0;
    this.isJudge = false;
    this.socket = null;
};

module.exports = Player;