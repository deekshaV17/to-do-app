import React from 'react';
import { Button, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

import Heading from './Heading';

import '../styles/EmptyList.scss';

const EmptyList = () => (
  <div className='emptyListContainer'>
    <Heading />
    <div className='emptyInfoContainer'>
      <div className='emptyTaskHeading'>Seems like your task list is empty!</div>
      <div className='emptyTaskInfo'> Click to add your first task</div>
      <Link to={'/add-task'}>
        <Button icon className='addTaskButton'>
          <Icon name='plus' />
        </Button>
      </Link>
    </div>
  </div>
);

export default EmptyList;
