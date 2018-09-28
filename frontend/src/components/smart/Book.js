import React, { Component } from 'react'
import ethers from 'ethers'
import { withRouter } from 'react-router-dom';
import { Container, Button, Modal, ModalHeader, ModalBody, ModalFooter, Input } from 'reactstrap'
import BookView from '../dumb/BookView'
import { getBookAt, getWallet, buyBook, removeBook } from '../../helpers/libraryContract'

class Book extends Component {
  constructor(props) {
    super(props)
    this.state = {
      book: {},
      openModal: false,
    }

    this.toggle = this.toggle.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
    this.functionBook = this.functionBook.bind(this)
    this.redirectToFile = this.redirectToFile.bind(this)
  }

  async componentDidMount() {
    const { index } = this.props.match.params
    const book = await getBookAt(index)
    const wallet = JSON.parse(sessionStorage.getItem('jsonWallet'))
    const isAuthor = book.author.toLowerCase() == `0x${wallet.address}` ? true : false
    this.setState({book, isAuthor})
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

  async functionBook() {
    const { index } = this.props.match.params
    const { book, password, isAuthor } = this.state
    const wallet = await getWallet(password)
    const val = ethers.utils.formatEther(book.price)
    if (isAuthor) {
      try {
        const result = await removeBook(index, wallet)
        console.log(result, 'Removed book')
        this.setState({openModal: !this.state.openModal})
      } catch (error) {
        throw new Error(error)
      }
    } else {
      try {
        const result = await buyBook(index, val, wallet)
        console.log(result, 'Buy book')
        this.redirectToFile(book.linkHash)
        this.setState({openModal: !this.state.openModal})
      } catch (error) {
        throw new Error(error)
      }
    }
  }

  redirectToFile(fileHash) {
    window.location.href = `https://gateway.ipfs.io/ipfs/${fileHash}`
  }

  render() {
    return (
      <Container>
        <BookView book={this.state.book} toggle={this.toggle} isBookAuthor={this.state.isAuthor}/>

        <Modal isOpen={this.state.openModal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Wallet Password</ModalHeader>
          <ModalBody>
            <Input type="password" name="password" id="password" value={this.state.password} onChange={(text) => this.handleInputChange(text)}/>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.functionBook}>Continue</Button>{' '}
            <Button color="secondary" onClick={this.toggle}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </Container>
    )
  }
}

export default withRouter(Book)