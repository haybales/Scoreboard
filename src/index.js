import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import './index.css';

var PLAYERS = [];

ReactDOM.render(<App initialPlayers={PLAYERS}/>, document.getElementById('root'));
registerServiceWorker();
