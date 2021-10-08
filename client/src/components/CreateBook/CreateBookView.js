import React, { useState } from 'react';
import { Form, Row, Col, Button } from 'react-bootstrap';
import './CreateBookView.css';

const CreateBook = (props) => {
  const { sendBook } = props;

  const [isFormValid, setIsFormValid] = useState(false);
  const [form, setForm] = useState({
    name: {
      value: '',
      validations: {
        required: true,
        minLength: 1,
      },
      valid: false,
      touched: false,
    },
    image: {
      value: '',
      validations: {
        required: true,
        minLength: 10,
      },
      valid: false,
      touched: false,
    },
    description: {
      value: '',
      validations: {
        required: true,
        minLength: 10,
      },
      valid: false,
      touched: false,
    },
    authorFirstName: {
      value: '',
      validations: {
        required: true,
        minLength: 1,
        maxLength: 20,
      },
      valid: false,
      touched: false,
    },
    authorLastName: {
      value: '',
      validations: {
        required: true,
        minLength: 1,
        maxLength: 20,
      },
      valid: false,
      touched: false,
    },
    genre: {
      value: '',
      validations: {
        required: true,
        minLength: 3,
        maxLength: 25,
      },
      valid: false,
      touched: false,
    },
    status_id: {
      value: '',
      validations: {
        required: true,
      },
      valid: false,
      touched: false,
    },
  });

  const createBook = (ev) => {
    ev.preventDefault();

    const bookData = Object.keys(form).reduce((acc, key) => {
      return {
        ...acc,
        [key]: form[key].value,
      };
    }, {});

    sendBook(bookData);
  };

  const isInputValid = (input, validations) => {
    let isValid = true;

    if (validations.required) {
      isValid = isValid && input.length !== 0;
    }
    if (validations.minLength) {
      isValid = isValid && input.length >= validations.minLength;
    }
    if (validations.maxLength) {
      isValid = isValid && input.length <= validations.maxLength;
    }

    return isValid;
  };

  const inputChangeHandler = (ev) => {
    const { name, value } = ev.target;

    const updatedElement = { ...form[name] };
    updatedElement.value = value;
    updatedElement.touched = true;
    updatedElement.valid = isInputValid(value, updatedElement.validations);

    const updatedForm = { ...form, [name]: updatedElement };
    setForm(updatedForm);

    const checkIfFormIsValid = Object.values(updatedForm).every(
      (el) => el.valid,
    );
    setIsFormValid(checkIfFormIsValid);
  };

  return (
    <div className="form-container create-book">
      <h3>New book:</h3>
      <Form noValidate onSubmit={createBook}>
        <Form.Group>
          <Form.Label id={form.name.valid ? 'valid-label' : 'invalid-label'}>
            Book title:
          </Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={form.name.value}
            id={form.name.valid && 'valid-input'}
            onChange={inputChangeHandler}
            placeholder="Enter book title"
          />
        </Form.Group>

        <Form.Group>
          <Form.Label id={form.image.valid ? 'valid-label' : 'invalid-label'}>
            Image URL:
          </Form.Label>
          <Form.Control
            type="text"
            name="image"
            value={form.image.value}
            id={form.image.valid && 'valid-input'}
            onChange={inputChangeHandler}
            placeholder="Paste book cover URL"
          />
        </Form.Group>

        <Form.Group>
          <Form.Label
            id={form.authorFirstName.valid ? 'valid-label' : 'invalid-label'}
          >
            Author:
          </Form.Label>
          <Row>
            <Col>
              <Form.Control
                name="authorFirstName"
                value={form.authorFirstName.value}
                id={form.authorFirstName.valid && 'valid-input'}
                onChange={inputChangeHandler}
                placeholder="First name"
              />
            </Col>
            <Col>
              <Form.Control
                name="authorLastName"
                value={form.authorLastName.value}
                id={form.authorLastName.valid && 'valid-input'}
                onChange={inputChangeHandler}
                placeholder="Last name"
              />
            </Col>
          </Row>
        </Form.Group>

        <Form.Group>
          <Form.Label id={form.genre.valid ? 'valid-label' : 'invalid-label'}>
            Genre:
          </Form.Label>
          <Form.Control
            type="text"
            name="genre"
            value={form.genre.value}
            id={form.genre.valid && 'valid-input'}
            onChange={inputChangeHandler}
            placeholder="Enter genre"
          />
        </Form.Group>

        <Form.Group>
          <Form.Label
            id={form.description.valid ? 'valid-label' : 'invalid-label'}
          >
            Description:
          </Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            name="description"
            value={form.description.value}
            onChange={inputChangeHandler}
            id={form.description.valid && 'valid-input'}
            placeholder="Enter some description"
          ></Form.Control>
        </Form.Group>

        <Form.Group>
          <Form.Label
            id={form.status_id.valid ? 'valid-label' : 'invalid-label'}
          >
            Select book status:
          </Form.Label>
          <Col sm={10} className="checkboxes-and-radios">
            <Form.Check
              type="radio"
              value="1"
              name="status_id"
              onChange={inputChangeHandler}
              label="Free"
              id="radio-1"
            />
            <Form.Check
              type="radio"
              value="2"
              name="status_id"
              onChange={inputChangeHandler}
              label="Borrowed"
              id="radio-2"
            />
            <Form.Check
              type="radio"
              value="3"
              name="status_id"
              onChange={inputChangeHandler}
              label="Unlisted"
              id="radio-3"
            />
          </Col>
        </Form.Group>

        <Button
          variant="primary"
          size="lg"
          type="submit"
          disabled={!isFormValid}
        >
          Create
        </Button>
      </Form>
    </div>
  );
};

export default CreateBook;
