import React from 'react';
import { Form, FormGroup, Label, Input } from 'reactstrap';

const UserForm = (props) => {
  const { handleInputChange, isRegistration, values } = props
  const labelStyle = {
    marginTop: 10,
    color: '#3E0F01'
  }
  return (
    <Form>
      {
        isRegistration ? (
          <FormGroup>
          <Label style={labelStyle}>Name</Label>
          <Input type="text" name="name" id="name" value={values.name || ''} onChange={handleInputChange} />
        </FormGroup>
        ) : null
      }
      
      <FormGroup>
        <Label style={labelStyle}>Email</Label>
        <Input type="email" name="email" id="email" value={values.email || ''} onChange={handleInputChange} />
      </FormGroup>
      <FormGroup>
        <Label style={labelStyle}>Password</Label>
        <Input type="password" name="password" id="password" value={values.password || ''}onChange={handleInputChange}/>
      </FormGroup>

      {
        isRegistration ? (
          <FormGroup>
          <Label style={labelStyle}>Confirm Password</Label>
          <Input type="password" name="confirmPassword" id="confirmPassword" value={values.confirmPassword || ''} onChange={handleInputChange}/>
        </FormGroup>
        ) : null
      }
      
    </Form>
  )
}

export default UserForm