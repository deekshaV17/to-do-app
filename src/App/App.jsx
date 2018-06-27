import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Route, Switch } from 'react-router-dom';

import TodoList from './TodoList';
import AddTask from './AddTask';

import { Provider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";

import '../styles/App.scss';

class App extends Component {

  state = {
    currentTask: {},
  };

  editTask = (currentTask) => {
    this.setState({ currentTask })
  };

  render(){
    return (
      <Provider template={AlertTemplate}>
      <div className='todoContainer'>
        <BrowserRouter>
          <Switch>
            <Route
              exact
              path="/"
              render={() => <TodoList editTask={this.editTask}/>}
            />
            <Route
              exact
              path="/add-task"
              render={() => <AddTask currentTask={this.state.currentTask}/>}
            />
          </Switch>
        </BrowserRouter>
      </div>
      </Provider>
    );
  }
}

export default App;
