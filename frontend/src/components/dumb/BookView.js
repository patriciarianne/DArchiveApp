import React from 'react';
import { Media, Button, Row } from 'reactstrap'

const BookView = (props) => {
  const { book, toggle, isBookAuthor } = props
  const button = isBookAuthor ? (
    <Button style={style.removeButton} onClick={toggle}>Remove Book</Button>
  ) : <Button style={style.button} onClick={toggle}>Buy to download</Button>
  return (
    <Media>
      <Media left>
        <Row>
          <img src={`https://gateway.ipfs.io/ipfs/${book.imageHash}`} alt={book.title} style={style.image}/>
        </Row>
        <Row>
          {button}
        </Row>
      </Media>
      <Media body style={{padding: 20}}>
        <Media heading>
          {book.title}
        </Media>
        {book.description}
      </Media>
    </Media>
  )
}

const style = {
  button: {
    marginRight: '20%',
    marginLeft: '20%',
    width: '60%',
    backgroundColor: '#851E00',
    color: '#ffff'
    },
  removeButton: {
    marginRight: '20%',
    marginLeft: '20%',
    width: '60%',
    backgroundColor: '#C10505',
    color: '#ffff'
    },
  label: {
    fontSize: 28,
    textAlign: 'center',
    color: '#851E00',
  },
  image: {
    width: '380px', 
    height: '420px',
    padding: 20
  }
}

export default BookView