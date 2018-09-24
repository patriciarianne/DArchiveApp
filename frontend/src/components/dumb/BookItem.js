import React from 'react';
import { Card, CardImg, CardBody,
  CardTitle, CardSubtitle, Button } from 'reactstrap';

const BookItem = (props) => {
  const { book } = props
  return (
    <div style={{marginTop: 10}}>
      <Card>
        <CardImg top width="100%" src="https://vignette.wikia.nocookie.net/harrypotter/images/7/7b/Harry01english.jpg/revision/latest?cb=20150208225304" alt="book cover" />
        <CardBody className="text-center">
          <CardTitle>{book.title}</CardTitle>
          <CardSubtitle>{book.price}</CardSubtitle>
          <Button style={{marginTop: 5}}>Download</Button>
        </CardBody>
      </Card>
    </div>
  );
};

export default BookItem;