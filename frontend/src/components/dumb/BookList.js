import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import BookItem from '../dumb/BookItem';

const BookList = (props) => {
  const { books } = props
  return (
    <Container>
      <Row>
      {
        books.map(book => {
          return (
          <Col sm={{ size: 'auto', offset: 1 }}>
            <BookItem book={book}/>
          </Col>
          )
        })
      }
      </Row>
    </Container>
  );
};

export default BookList;