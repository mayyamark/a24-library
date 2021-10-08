import React, { useState } from 'react';
import { Form, Row, Col, Button } from 'react-bootstrap';
import { useBook } from '../../../contexts/BookContext';
import './UpdateBook.css';

const UpdateBook = (props) => {
  const { hideEditBook, sendUpdatedBook } = props;
  const { book } = useBook();
  const id = book.bookId;

  const statusIdInitialValue =
    (book.status === 'free' && '1') ||
    (book.status === 'borrowed' && '2') ||
    (book.status === 'unlisted' && '3');

  const [isFormValid, setIsFormValid] = useState(true);
  const [form, setForm] = useState({
    name: {
      value: book.name,
      validations: {
        required: false,
        minLength: 1,
      },
      valid: true,
      touched: false,
    },
    image: {
      value: book.image,
      validations: {
        required: false,
        minLength: 10,
      },
      valid: true,
      touched: false,
    },
    description: {
      value: book.description,
      validations: {
        required: false,
        minLength: 10,
      },
      valid: true,
      touched: false,
    },
    authorFirstName: {
      value: book.author.split(' ')[0],
      validations: {
        required: false,
        minLength: 1,
        maxLength: 20,
      },
      valid: true,
      touched: false,
    },
    authorLastName: {
      value: book.author.split(' ')[1],
      validations: {
        required: false,
        minLength: 1,
        maxLength: 20,
      },
      valid: true,
      touched: false,
    },
    genre: {
      value: book.genre,
      validations: {
        required: false,
        minLength: 3,
        maxLength: 20,
      },
      valid: true,
      touched: false,
    },
    status_id: {
      value: statusIdInitialValue,
      validations: {
        required: false,
      },
      valid: true,
      touched: false,
    },
    isDeleted: {
      value: book.isDeleted,
      validations: {
        required: false,
      },
      valid: true,
      touched: false,
    },
  });

  const updateBook = (event) => {
    event.preventDefault();

    const updateData = Object.keys(form).reduce((acc, key) => {
      return {
        ...acc,
        [key]: form[key].value,
      };
    }, {});

    sendUpdatedBook(id, updateData);
    hideEditBook();
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
    <div className="form-container edit-book">
      <h3>Update book:</h3>
      <Form noValidate onSubmit={updateBook}>
        <Form.Group>
          <Form.Label id={!form.name.valid ? 'invalid-label' : ''}>
            Book title:
          </Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={form.name.value}
            id={!form.name.valid ? 'invalid-label' : ''}
            onChange={inputChangeHandler}
            placeholder="Enter book title"
          />
        </Form.Group>
        <Form.Group>
          <Form.Label id={!form.image.valid ? 'invalid-label' : ''}>
            Image URL:
          </Form.Label>
          <Form.Control
            type="text"
            name="image"
            value={form.image.value}
            id={!form.image.valid ? 'invalid-label' : ''}
            onChange={inputChangeHandler}
            placeholder="Paste book cover URL"
          />
        </Form.Group>
        <Form.Group>
          <Form.Label
            id={
              !(form.authorFirstName.valid && form.authorLastName.valid)
                ? 'invalid-label'
                : ''
            }
          >
            Author:
          </Form.Label>
          <Row>
            <Col>
              <Form.Control
                name="authorFirstName"
                value={form.authorFirstName.value}
                id={!form.authorFirstName.valid ? 'invalid-label' : ''}
                onChange={inputChangeHandler}
                placeholder="First name"
              />
            </Col>
            <Col>
              <Form.Control
                name="authorLastName"
                value={form.authorLastName.value}
                id={!form.authorLastName.valid ? 'invalid-label' : ''}
                onChange={inputChangeHandler}
                placeholder="Last name"
              />
            </Col>
          </Row>
        </Form.Group>
        <Form.Group>
          <Form.Label id={!form.genre.valid ? 'invalid-label' : ''}>
            Genre:
          </Form.Label>
          <Form.Control
            type="text"
            name="genre"
            value={form.genre.value}
            id={!form.genre.valid && 'invalid-input'}
            onChange={inputChangeHandler}
            placeholder="Enter genre"
          />
        </Form.Group>
        <Form.Group>
          <Form.Label id={!form.description.valid ? 'invalid-label' : ''}>
            Description:
          </Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            name="description"
            value={form.description.value}
            id={!form.description.valid ? 'invalid-label' : ''}
            onChange={inputChangeHandler}
            placeholder="Enter some description"
          ></Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.Label>Select book status:</Form.Label>
          <Col sm={10} className="checkboxes-and-radios">
            <Form.Check
              type="radio"
              value="1"
              name="status_id"
              onChange={inputChangeHandler}
              label="Free"
              id="radio-1"
              defaultChecked={book.status === 'free'}
            />
            <Form.Check
              type="radio"
              value="2"
              name="status_id"
              onChange={inputChangeHandler}
              label="Borrowed"
              id="radio-2"
              defaultChecked={book.status === 'borrowed'}
            />
            <Form.Check
              type="radio"
              value="3"
              name="status_id"
              onChange={inputChangeHandler}
              label="Unlisted"
              id="radio-3"
              defaultChecked={book.status === 'unlisted'}
            />
          </Col>
        </Form.Group>
        {book.isDeleted === 1 && (
          <Form.Group>
            <Form.Label>Visible for users:</Form.Label>
            <Col sm={10} className="checkboxes-and-radios">
              <Form.Check
                type="radio"
                value="0"
                name="isDeleted"
                onChange={inputChangeHandler}
                label="Yes"
                id="radio-4"
              />
            </Col>
          </Form.Group>
        )}
        <Button variant="primary" type="submit" disabled={!isFormValid}>
          Update
        </Button>{' '}
        <Button variant="primary" onClick={() => hideEditBook()}>
          Cancel
        </Button>
      </Form>
    </div>
  );
};

export default UpdateBook;
