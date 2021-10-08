import React, { useState, useEffect } from 'react';
import swal from 'sweetalert';
import { useAuth } from '../../contexts/AuthContext';
import { Nav } from 'react-bootstrap';
import BASE_URL from '../../common/base-url';
import useQueryParams from '../../custom-hooks/useQueryParams';
import Loader from '../../components/Loader/Loader';
import AllBooksView from '../../components/AllBooks/AllBooksView';
import Home from '../../components/Home/Home';

const Search = () => {
  const { currentUser } = useAuth();
  const { page, name, author, genre } = useQueryParams();

  let query, queryValue;

  if (name) {
    query = 'name';
    queryValue = name;
  } else if (author) {
    query = 'author';
    queryValue = author;
  } else if (genre) {
    query = 'genre';
    queryValue = genre;
  }

  const fetchUrl =
    currentUser.role === 'Admin' ? `${BASE_URL}/admin` : BASE_URL;

  const [books, setBooks] = useState([]);
  const [pagesInfo, setPagesInfo] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);

    fetch(`${fetchUrl}/books?page=${page}&${query}=${queryValue}`, {
      method: 'GET',
      headers: new Headers({
        Authorization: `Bearer ${currentUser.token}`,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message) {
          throw new Error(data.message);
        } else {
          const { books, ...rest } = data;
          setBooks(books);
          setPagesInfo(rest);
        }
      })
      .catch((err) => {
        swal({
          title: 'You have no permission!',
          text: 'Probably you have been banned!',
          icon: 'error',
          button: 'OK :(',
        });

        setError(err.message);
      })
      .finally(() => setLoading(false));
  }, [fetchUrl, currentUser, page, query, queryValue]);

  if (error) {
    return <Home />;
  }

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <AllBooksView books={books} pagesInfo={pagesInfo} />
      {books.length === 0 && (
        <h4 className="warn-message">
          No matches found! Check out our{' '}
          <Nav.Link style={{ display: 'contents' }} href="/books?page=1">
            collection
          </Nav.Link>
          ..
        </h4>
      )}
      <Nav className="justify-content-center" activeKey="/home">
        {pagesInfo.hasPreviousPage && (
          <Nav.Item>
            <Nav.Link
              href={`/search?page=${
                pagesInfo.currentPage - 1
              }&${query}=${queryValue}`}
            >
              PREVIOUS
            </Nav.Link>
          </Nav.Item>
        )}
        {pagesInfo.hasNextPage && (
          <Nav.Item>
            <Nav.Link
              href={`/search?page=${
                pagesInfo.currentPage + 1
              }&${query}=${queryValue}`}
            >
              NEXT
            </Nav.Link>
          </Nav.Item>
        )}
      </Nav>
    </>
  );
};

export default Search;
