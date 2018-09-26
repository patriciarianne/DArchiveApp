import React, { Component } from 'react'
import { Container, Col, Jumbotron } from 'reactstrap'

import BookForm from '../dumb/BookForm'
class AddBook extends Component {
  constructor(props) {
    super(props)
  }

  async uploadPhoto(event) {
    const file = event.target.files[0]
    let reader = new FileReader()
    reader.readAsArrayBuffer(file)
    reader.onloadend = async () => {
      const buffer = await Buffer.from(reader.result)
      this.setState({buffer})
    }
  }
  render() {
    return (
      <Container>
        <Col sm={8} xs={12} md={{ size: 8, offset: 2 }}>
          <Jumbotron>
            <BookForm
              handleInputChange={()=>{}}
              uploadImage={()=>{}}
              uploadFile={()=>{}}
            />
          </Jumbotron>
        </Col>
      </Container>
    )
  }
}

export default AddBook
