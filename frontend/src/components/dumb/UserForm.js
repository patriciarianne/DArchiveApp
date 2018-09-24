import React from 'react';
import { Form, FormGroup, Label, Input } from 'reactstrap';

const UserForm = (props) => {
  return (
    <Form>
      <FormGroup>
          <Label>Email</Label>
          <Input type="email" name="email" />
        </FormGroup>
        <FormGroup>
          <Label>Password</Label>
          <Input type="password" name="password"/>
        </FormGroup>
    </Form>
  )
}

export default UserForm