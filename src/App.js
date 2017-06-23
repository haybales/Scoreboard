import React from 'react';
import './App.css';
import AddPlayerForm from './AddPlayerForm';
import {Header, Stats, Counter, Player} from './statics';

var nextId = 4;

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
