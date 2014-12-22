var Game = require('./applications/cah/server/models/Game');
var Player = require('./applications/cah/server/models/Player');

var game = new Game;

var henk = new Player('henk');
var piet = new Player('piet');

game.addPlayer(henk);
game.addPlayer(piet);

game.assignAnswers();
game.assignQuestion();
game.assignJudge();

game.playCards(henk, [henk.answerCards[0]]);
game.playCards(piet, [piet.answerCards[0]]);

game.chooseAnswers(henk, [piet.answerCards[0]]);