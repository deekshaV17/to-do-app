import React, { Component } from "react";
import PropTypes from "prop-types";

import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Button, Icon } from "semantic-ui-react";

import "../styles/Heading.scss";

const propTypes = {
  todoList: PropTypes.array,
  location: PropTypes.object,
};

const defaultProps = {
  todoList: [],
  location: {},
};

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

Heading.propTypes = propTypes;
Heading.defaultProps = defaultProps;

export default Heading;
