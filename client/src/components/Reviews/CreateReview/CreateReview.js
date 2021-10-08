import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

const CreateReview = (props) => {
  const { hideCreateReview, sendReview } = props;

  const [isFormValid, setIsFormValid] = useState(false);
  const [text, setText] = useState({
    value: '',
    validations: {
      required: true,
      minLength: 1,
      maxLength: 200,
    },
    valid: false,
    touched: false,
  });

  const textChangeHandler = (ev) => {
    const { value } = ev.target;

    const updatedText = { ...text };
    updatedText.value = value;
    updatedText.touched = true;
    updatedText.valid =
      text.value.trim().length >= text.validations.minLength &&
      text.value.trim().length <= text.validations.maxLength;

    setText(updatedText);

    setIsFormValid(updatedText.valid);
  };

  const createReview = (ev) => {
    ev.preventDefault();

    sendReview({ text: text.value });

    setText('');
    hideCreateReview();
  };

  return (
    <div className="form-container create-review-container">
      <Form onSubmit={createReview}>
        <Form.Group>
          <Form.Label>Content:</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            name="text"
            value={text.value}
            onChange={textChangeHandler}
            placeholder="Share your opinion..."
          ></Form.Control>
        </Form.Group>
        <Button variant="primary" type="submit" disabled={!isFormValid}>
          Send
        </Button>{' '}
        <Button variant="primary" onClick={() => hideCreateReview()}>
          Cancel
        </Button>
      </Form>
    </div>
  );
};

export default CreateReview;
