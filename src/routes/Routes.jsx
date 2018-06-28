import React from 'react'
import Loadable from 'react-loadable';

import { BrowserRouter } from 'react-router-dom';
import { Route, Switch } from 'react-router-dom';

function MyLoadingComponent() {
  return <div>Loading...</div>;
}

const todoList = Loadable({
  loader: () => import('../components/TodoList'),
  loading: MyLoadingComponent,
});

const addTask = Loadable({
  loader: () => import('../components/AddTask'),
  loading: MyLoadingComponent,
});

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route
        exact
        path="/"
        component={todoList}
      />
      <Route
        exact
        path="/add-task/"
        component={addTask}
      />
    </Switch>
  </BrowserRouter>
);

export default Routes;
