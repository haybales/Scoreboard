import React from 'react';
import Stopwatch from './Stopwatch';

export function Header(props){
  return (
    <div className="header">
      <Stats players={props.players}/>
      <h1>{props.title}</h1>
      <Stopwatch />
    </div>
  );
}
Header.propTypes = {
  title: React.PropTypes.string.isRequired,
  players: React.PropTypes.array.isRequired,
};


export function Stats(props){
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


export function Counter(props){
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


export function Player(props){
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
