import React from "react";
import {
  BrowserRouter,
  Switch,
  Route
} from 'react-router-dom';
import TodoList from './containers/TodoList/TodoList';
import NotFoundPage from './containers/NotFoundPage';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path='/' component={TodoList} />
        <Route component={NotFoundPage} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;