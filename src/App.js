import React, { Component } from 'react';
import './App.css';

var nextId = 4;

var AddPlayerForm = React.createClass({
  getInitialState: function(){
    return{
      value: '',

    };
  },

  handleChange: function(e){
    return(this.setState({value: e.target.value}));
  },

  render: function(){
    return(
      <div className="add-player-form">
        <form onSubmit={this.onSubmit}>
          <input type="text" value={this.state.value} onChange={this.handleChange} />
          <input type="submit" value="Add Player" />
        </form>
      </div>
    );
  },
  propTypes: {
    addPlayer: React.PropTypes.func.isRequired,
  },
  onSubmit: function(e){
    e.preventDefault();
    this.props.addPlayer(this.state.value);
    this.setState({value: ''});
  },

});


function Header(props){
  return (
    <div className="header">
      <Stats players={props.players}/>
      <h1>{props.title}</h1>
    </div>
  );
}
Header.propTypes = {
  title: React.PropTypes.string.isRequired,
  players: React.PropTypes.array.isRequired,
};

function Stats(props){
  var totalPlayers = props.players.length;
  var totalPoints = props.players.reduce(function(total, player){
    return total + player.score;
  }, 0);
  return(
    <table className="stats">
      <tbody>
        <tr>
          <td>Players:</td>
          <td>{totalPlayers}</td>
        </tr>
        <tr>
          <td>Total Points:</td>
          <td>{totalPoints}</td>
        </tr>
      </tbody>
    </table>
  )
}
Stats.propTypes = {
  players: React.PropTypes.array.isRequired,
};


function Counter(props){
  return (
    <div className="counter">
      <button className="counter-action decrement" onClick={function(){props.onChange(-1);}}> - </button>
      <div className="counter-score"> {props.score} </div>
      <button className="counter-action increment" onClick={function(){props.onChange(1);}}> + </button>
    </div>
  );
}

Counter.propTypes = {
  score: React.PropTypes.number.isRequired,
  onChange: React.PropTypes.func.isRequired,
}


function Player(props){
  return(
    <div className="player">
      <div className="player-name">
        <a className="remove-player" onClick={props.onRemove}>✖</a>
        {props.name}
      </div>
      <Counter score={props.score} onChange={props.onScoreChange}/>
    </div>
  );
}

Player.propTypes={
  name: React.PropTypes.string.isRequired,
  score: React.PropTypes.number.isRequired,
  onScoreChange: React.PropTypes.func.isRequired,
  onRemove: React.PropTypes.func.isRequired,
}


var App = React.createClass({

  onScoreChange: function(index, delta){
    this.state.players[index].score += delta;
    this.setState(this.state);
  },

  onAddPlayer: function(inputName){
    this.state.players.push({
      name: inputName,
      score: 0,
      id: nextId,
    });
    this.setState(this.state);
    nextId++;
  },

  onRemovePlayer: function(index){
    this.state.players.splice(index, 1);
    this.setState(this.state);
  },

  render: function(){
    return(
      <div className="scoreboard">
        <Header title={this.props.title} players={this.state.players} />

        <div className="players">
          {this.state.players.map(function(player, index){
            return (
              <Player
                onRemove={function(){this.onRemovePlayer(index)}.bind(this)}
                onScoreChange={function(delta){this.onScoreChange(index, delta)}.bind(this)}
                name={player.name}
                score={player.score}
                key={player.id} />
            );
          }.bind(this))}
        </div>
        <AddPlayerForm addPlayer={this.onAddPlayer}/>
      </div>
    );
  },

  getDefaultProps: function(){
    return{
      title: "Scoreboard"
    }
  },

  getInitialState: function(){
    return{
      players: this.props.initialPlayers,

    };
  },


  propTypes: {
    title: React.PropTypes.string,
    initialPlayers: React.PropTypes.arrayOf(React.PropTypes.shape({
      name: React.PropTypes.string.isRequired,
      score: React.PropTypes.number.isRequired,
      id: React.PropTypes.number.isRequired
    })).isRequired
  }
});


export default App;
