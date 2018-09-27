import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import BookItem from '../dumb/BookItem';

const BookList = (props) => {
  const { books, redirectToBook } = props
  return (
    <Container>
      <Row>
      {
        books.map(book => {
          return (
          <Col sm={{ size: 'auto', offset: 1 }} key={book.title}>
            <BookItem book={book} redirectToBook={redirectToBook}/>
          </Col>
          )
        })
      }
      </Row>
    </Container>
  );
};

export default BookList;