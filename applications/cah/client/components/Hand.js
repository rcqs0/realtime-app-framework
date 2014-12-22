var React = require('react');

var Hand = React.createClass({
    getInitialState: function() {
        return {player: {answerCards: []}, username: ''};
    },
    handleChange: function(e) {
        this.setState({username: e.target.value});
    },
    identify: function() {
        io.socket.get('/cah/io/identify?name=' + this.state.username, function(player, res) {
            this.setState({player: player});
        }.bind(this));

        io.socket.on('playerUpdate', function(player) {
            this.setState({player: player});
        }.bind(this));
    },
    startGame: function() {
        io.socket.get('/cah/io/start', null);
    },
    render: function() {
        var cardNodes = this.state.player.answerCards.map(function(card) {
            return <li key={card.id}>{card.text}</li>;
        });

        return (
            <div>
                <div>
                    <input value={this.state.username} onChange={this.handleChange} placeholder='Enter name' />
                    <button onClick={this.identify}>Identify</button>
                </div>
                <div>
                    Identified as {this.state.player.name}!
                </div>
                <div>
                    <button onClick={this.startGame}>Start game!</button>
                </div>
                <div>
                    <ul>
                        {cardNodes}
                    </ul>
                </div>
            </div>
        );
    }
});

module.exports = Hand;