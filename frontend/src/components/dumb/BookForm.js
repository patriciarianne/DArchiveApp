import React from 'react'
import { Form, FormGroup, Label, Input, Row } from 'reactstrap';

 const BookForm = (props) => {
   const { handleInputChange, uploadImage, uploadFile } = props
   const labelStyle = {
     marginTop: 10,
     fontWeight: 'bold',
     color: '#851E00'
   }

  return (
    <Form>
      <FormGroup>
        <h3 style={{textAlign: 'center'}}>Add Book to Library</h3>
        <Row>
          <Label style={labelStyle}>Title</Label>
          <Input type="text" name="title" id="title" onChange={handleInputChange} />
        </Row>
        <Row>
          <Label style={labelStyle}>Description</Label>
          <Input type="textarea" name="description" id="description" onChange={handleInputChange} />
        </Row>
        <Row>
          <Label style={labelStyle}>Genre</Label>
          <Input type="text" name="genre" id="genre" onChange={handleInputChange} />
        </Row>
        <Row>
          <Label style={labelStyle}>Price (ETH)</Label>
          <Input type="number" name="price" id="price" onChange={handleInputChange} />
        </Row>
        <Row>
          <Label style={labelStyle}>Book Cover</Label>
          <Input type="file" name="bookImage" id="bookImage" onChange={uploadImage} accept="image/*"/>
        </Row>
        <Row>
          <Label style={labelStyle}>Book File (PDF)</Label>
          <Input type="file" name="bookFile" id="bookFile" onChange={uploadFile} accept="application/pdf"/>
        </Row>
      </FormGroup>
    </Form>
  )
}

export default BookForm
