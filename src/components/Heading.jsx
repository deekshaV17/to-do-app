import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Button, Icon } from "semantic-ui-react";

import "../styles/Heading.scss";

@connect(store => ({todoList: store.TodoReducer.tasks}))
class Heading extends Component {
  render() {
    return (
      <div className="headingContainer">
        <h1>
          My Todo List
        </h1>
        {this.props.todoList.length > 0 && this.props.location.pathname === "/" &&
        <Link to={"/add-task"} className="headingAddItem">
          <Button icon className="headingAddItemButton">
            <Icon name="plus"/>
          </Button>
        </Link>
        }
      </div>
    );
  }
}

export default Heading;
