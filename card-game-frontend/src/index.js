import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import Game from './components/Game';
import { Provider } from "react-redux";
import store from "./redux/store";
import { BrowserRouter, Route, Switch } from 'react-router-dom';
ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
    <Switch>
        <Route exact path="/" component={App}/>
        <Route exact path="/game/:id" component={Game}/>
      </Switch>
    </BrowserRouter>
    {/* <App /> */}
  </Provider>,
  document.getElementById('root')
);

