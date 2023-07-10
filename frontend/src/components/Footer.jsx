import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => {
  return (
    <footer>
      <Container>
        <Row>
          <Col className="text-center py-3">
            Copyright &copy; Kaiser Rashid productions. Payment of pizza is
            pending.
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
