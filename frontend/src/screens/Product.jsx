import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Image, ListGroup, Card, Button } from 'react-bootstrap';
import Rating from '../components/Rating';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { listProductsDetails } from '../actions/productActions';

const Product = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const productDetails = useSelector((state) => state.productDetails);
  const { product, error, loading } = productDetails;

  useEffect(() => {
    dispatch(listProductsDetails(id));
  }, [id, dispatch]);

  const { image, name, rating, numReviews, price, description, countInStock } =
    product;

  return (
    <>
      <Link className="btn btn-light my-3" to="/">
        Go Back
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Row>
          <Col md={6}>
            <Image src={image} alt={name} fluid />
          </Col>
          <Col md={3}>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h3>{name}</h3>
              </ListGroup.Item>

              <ListGroup.Item>
                <Rating value={rating} text={`${numReviews} reviews`} />
              </ListGroup.Item>

              <ListGroup.Item>Price: ${price}</ListGroup.Item>

              <ListGroup.Item>Description: ${description}</ListGroup.Item>
            </ListGroup>
          </Col>
          <Col md={3}>
            <Card>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <Row>
                    <Col>Price: </Col>
                    <Col>
                      <strong>${price}</strong>
                    </Col>
                  </Row>
                </ListGroup.Item>

                <ListGroup.Item>
                  <Row>
                    <Col>Status: </Col>
                    <Col>{countInStock > 0 ? 'In Stock' : 'Out of Stock'}</Col>
                  </Row>
                </ListGroup.Item>

                <ListGroup.Item>
                  <Button
                    className="w-100"
                    type="btn"
                    disabled={countInStock === 0}
                  >
                    Add to Cart
                  </Button>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
        </Row>
      )}
    </>
  );
};

export default Product;
