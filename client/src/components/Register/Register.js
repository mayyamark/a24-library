import React, { useRef, useState } from 'react';
import { Form, Button, Card, Alert } from 'react-bootstrap';
import { Container } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import './Register.css';
export default function Register() {
  const passwordRef = useRef();
  const usernameRef = useRef();
  const { login, register, error } = useAuth();
  const [isRegistering, setIsRegistering] = useState(false);
  const history = useHistory();

  const submitHandler = async (event) => {
    event.preventDefault();
    if (isRegistering) {
      register(event.target[0].value, event.target[1].value).then(() =>
        history.push('/'),
      );
    } else {
      login(event.target[0].value, event.target[1].value).then(() =>
        history.push('/'),
      );
    }
  };

  const loginClickHandler = () => {
    setIsRegistering(!isRegistering);
  };

  return (
    <Container
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: '100vh' }}
    >
      <div className="w-100" style={{ maxWidth: '400px' }}>
        <Card>
          <Card.Body>
            <h2 className="text-center mb-4">
              {isRegistering ? 'Register' : 'Login'}
            </h2>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={submitHandler}>
              <Form.Group id="username">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  ref={usernameRef}
                  required
                ></Form.Control>
              </Form.Group>
              <Form.Group id="password">
                <Form.Label>Passowrd</Form.Label>
                <Form.Control
                  type="password"
                  ref={passwordRef}
                  required
                ></Form.Control>
              </Form.Group>
              <Button className="w-100" type="submit">
                {isRegistering ? 'Register' : 'Login'}
              </Button>
            </Form>
          </Card.Body>
        </Card>
        <div className="d-flex align-items-center justify-content-center">
          <button className="auth-button" onClick={loginClickHandler}>
            {isRegistering
              ? 'Already have an account? Login'
              : 'Don\'t have an account? Register'}
          </button>
        </div>
      </div>
    </Container>
  );
}
