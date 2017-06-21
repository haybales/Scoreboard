import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import './index.css';

var PLAYERS = [
  {
    name: "Sam Furr",
    score: 31,
    id: 1
  },
  {
    name: "Jeff",
    score: 33,
    id: 2
  },
  {
    name: "Your Mom",
    score: 29,
    id: 3
  },
];

ReactDOM.render(<App initialPlayers={PLAYERS}/>, document.getElementById('root'));
registerServiceWorker();
