import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import Searcher from '../Searcher/Searcher';
import { Container, Image, Col, Row, Media } from 'react-bootstrap';
import './../../resources/newBook.css';

const Home = () => {
  const { currentUser } = useAuth();

  return (
    <Container
      className="align-items-center justify-content-center"
      style={{ marginTop: '2%' }}
    >
      <Row>
        <Col className="text-center">
          <h1>Explore Our Collection</h1>
        </Col>
      </Row>
      <Row>
        <Col className="text-center">
          Our Library contains books from a variety of authors and genres for
          you to choose from. <br /> Take a look at our featured titles below,
          and browse the entire collection to find something you love or to
          discover something new.
        </Col>
      </Row>
      <Row>{currentUser && <Searcher />}</Row>
      <Row>
        <Col>
          <Media>
            <Image
              className="bgnew"
              type="image/png"
              width={950}
              height={600}
              style={{ margin: 'auto' }}
              src="https://i.ibb.co/VVCgNtX/new.png"
            />
          </Media>
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
