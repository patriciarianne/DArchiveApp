import React from 'react';
import { Card, CardImg, CardBody,
  CardTitle, CardSubtitle, Button } from 'reactstrap';

const BookItem = (props) => {
  const { book, redirectToBook } = props
  return (
    <div style={{marginTop: 10}}>
      <Card style={{ padding: 10 }}>
        <CardImg top style={style.image} src={`https://gateway.ipfs.io/ipfs/${book.imageHash}`} alt="book cover" />
        <CardBody className="text-center">
          <CardTitle>{book.title}</CardTitle>
          <CardSubtitle>{book.price} ETH</CardSubtitle>
          <Button style={style.button} onClick={() => redirectToBook(book.index)}>
            View details
            {/* <a style={{textDecoration: 'none', color: '#fff'}} href={`https://gateway.ipfs.io/ipfs/${book.linkHash}`} download>Download</a> */}
          </Button>
        </CardBody>
      </Card>
    </div>
  );
};

const style = {
  button: {
    marginRight: '20%',
    marginLeft: '20%',
    width: '60%',
    backgroundColor: '#851E00',
    color: '#ffff',
    marginTop: 5
    },
    image: {
      width: '230px',
      height: '290px' 
    }
}
export default BookItem;