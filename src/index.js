import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/App';
import './style/style.scss';
import MarvelServices from './services/MarverServices'

const marvelServices = new MarvelServices()

marvelServices.getAllCharacters().then(res => res.data.results.forEach(item => console.log(item.name)))

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

