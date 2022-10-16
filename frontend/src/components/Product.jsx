import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Rating from './Rating';

const Product = ({ product }) => {
  const { _id, image, name, rating, numReviews, price } = product;
  return (
    <Card className="my-3 p-3 rounded">
      <Link to={`/products/${_id}`}>
        <Card.Img src={image} variant="top" />
      </Link>

      <Card.Body>
        <Link to={`/products/${_id}`}>
          <Card.Title as="div" style={{ color: '#000' }}>
            {name}
          </Card.Title>
        </Link>

        <Card.Text as="div">
          {/* <div className="my-3">
            {rating} from {numReviews} reviews
          </div> */}
          <Rating value={rating} text={`${numReviews} reviews`} />
        </Card.Text>
        <Card.Text as="h3" style={{ color: '#000' }}>
          ${price}
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Product;
