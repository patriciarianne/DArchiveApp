import React, { Component } from 'react'
import { Container } from 'reactstrap'
import BookView from '../dumb/BookView'
import { getBookAt, getIsBookAuthor } from '../../helpers/libraryContract'

class Book extends Component {
  constructor(props) {
    super(props)
    this.state = {
      book: {}
    }
  }

  async componentDidMount() {
    const { index } = this.props.match.params
    const book = await getBookAt(index)
    this.setState({book})
  }

  render() {
    return (
      <Container>
        <BookView book={this.state.book}/>
      </Container>
    )
  }
}

export default Book