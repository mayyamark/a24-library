import React, { useState } from 'react';
import { InputGroup, FormControl, Form, Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import './Searcher.css';

const Searcher = () => {
  const [query, setQuery] = useState('name');
  const [queryValue, setQueryValue] = useState(null);
  const history = useHistory();

  return (
    <div className="book-search">
      <Form>
        <InputGroup className="mb-3">
          <FormControl
            placeholder="Search..."
            aria-label="Recipient's username"
            aria-describedby="basic-addon2"
            onChange={(ev) => setQueryValue(ev.target.value)}
          />
          <InputGroup.Append>
            <Button
              variant="outline-primary"
              type="submit"
              onClick={() =>
                history.push(`/search?page=1&${query}=${queryValue}`)
              }
            >
              <i className="fa fa-search"></i> GO
            </Button>
          </InputGroup.Append>
        </InputGroup>
        <span>
          <Form.Check
            inline
            name="query"
            defaultChecked
            label="Title"
            type="radio"
            value="name"
            onChange={(ev) => setQuery(ev.target.value)}
          />
          <Form.Check
            inline
            name="query"
            label="Author"
            type="radio"
            value="author"
            onChange={(ev) => setQuery(ev.target.value)}
          />
          <Form.Check
            inline
            name="query"
            label="Genre"
            type="radio"
            value="genre"
            onChange={(ev) => setQuery(ev.target.value)}
          />
        </span>
      </Form>
    </div>
  );
};

export default Searcher;
