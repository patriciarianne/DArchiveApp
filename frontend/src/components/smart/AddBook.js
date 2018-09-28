import React, { Component } from 'react'
import { Container, Col, Jumbotron, Button, Modal, Input, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import { Link, withRouter } from 'react-router-dom';
import BookForm from '../dumb/BookForm'
import { ipfs } from '../../helpers/contractConfig';
import { addBook, getWallet } from '../../helpers/libraryContract'

class AddBook extends Component {
  constructor(props) {
    super(props)
    this.state = {
      openModal: false
    }

    this.toggle = this.toggle.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
    this.uploadImage = this.uploadImage.bind(this)
    this.uploadFile = this.uploadFile.bind(this)
    this.addBook = this.addBook.bind(this)
    this.redirectToLibrary = this.redirectToLibrary.bind(this)
  }

  toggle() {
    this.setState({
      openModal: !this.state.openModal
    })
  }

  handleInputChange(event) {
    const { id, value } = event.target
    this.setState({
      [id]: value
    })
  }

  async uploadImage(event) {
    const file = event.target.files[0]
    let reader = new FileReader()
    reader.readAsArrayBuffer(file)
    reader.onloadend = async () => {
      const buffer = await Buffer.from(reader.result)
      this.setState({bufferImage: buffer})
    }
  }

  async uploadFile(event) {
    const file = event.target.files[0]
    let reader = new FileReader()
    reader.readAsArrayBuffer(file)
    reader.onloadend = async () => {
      const buffer = await Buffer.from(reader.result)
      this.setState({bufferFile: buffer})
    }
  }

  async addBook() {
    const {
      password,
      bufferImage, 
      bufferFile, 
      title, 
      description,
      genre,
      price
      } = this.state
    const image = await ipfs.add(bufferImage)
    const file = await ipfs.add(bufferFile)
    const book = {
      title,
      description,
      genre,
      price,
      linkHash: file[0].hash,
      imageHash: image[0].hash
    }
    const wallet = await getWallet(password)
    try {
      await addBook(book, wallet)
      console.log(book, 'BOOK')
      this.redirectToLibrary()
    } catch (error) {
      throw new Error
    }
  } 

  redirectToLibrary() {
    this.props.history.push('library')
   }

  render() {
    return (
      <Container>
        <Col sm={8} xs={12} md={{ size: 8, offset: 2 }}>
          <Jumbotron style={{ backgroundColor: '#FEF3D1', marginTop: 20}}>
            <BookForm
              handleInputChange={this.handleInputChange}
              uploadImage={this.uploadImage}
              uploadFile={this.uploadFile}
            />
            <Button style={buttonStyle} onClick={this.toggle}>Add Book</Button>
          </Jumbotron>
        </Col>
        <Modal isOpen={this.state.openModal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>Wallet Password</ModalHeader>
          <ModalBody>
            <Input type="password" name="password" id="password" value={this.state.password} onChange={(text) => this.handleInputChange(text)}/>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.addBook}>Continue</Button>{' '}
            <Button color="secondary" onClick={this.toggle}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </Container>
    )
  }
}

const buttonStyle = {
  marginRight: '10%',
  marginLeft: '10%',
  marginTop: 20,
  width: '80%',
  backgroundColor: '#851E00',
  color: '#ffff'
}

export default withRouter(AddBook)
