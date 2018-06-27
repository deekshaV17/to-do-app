import React from 'react';
import { Button, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import Heading from './Heading';

const EmptyList = () => (
  <div>
    <Heading />
    Empty Message
    Click to add your first task
    <Link to={'/add-task'}>
    <Button icon>
      <Icon name='plus' />
    </Button>
    </Link>
  </div>
);

export default EmptyList;
