import React from 'react';
import { Form, FormGroup, Label, Input } from 'reactstrap';

const UserForm = (props) => {
  const { handleInputChange, isRegistration, values } = props
  return (
    <Form>
      {
        isRegistration ? (
          <FormGroup>
          <Label>Name</Label>
          <Input type="text" name="name" id="name" value={values.name || ''} onChange={handleInputChange} />
        </FormGroup>
        ) : null
      }
      
      <FormGroup>
        <Label>Email</Label>
        <Input type="email" name="email" id="email" value={values.email || ''} onChange={handleInputChange} />
      </FormGroup>
      <FormGroup>
        <Label>Password</Label>
        <Input type="password" name="password" id="password" value={values.password || ''}onChange={handleInputChange}/>
      </FormGroup>

      {
        isRegistration ? (
          <FormGroup>
          <Label>Confirm Password</Label>
          <Input type="password" name="confirmPassword" id="confirmPassword" value={values.confirmPassword || ''} onChange={handleInputChange}/>
        </FormGroup>
        ) : null
      }
      
    </Form>
  )
}

export default UserForm