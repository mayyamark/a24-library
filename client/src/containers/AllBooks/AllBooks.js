import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import swal from 'sweetalert';
import { useAuth } from '../../contexts/AuthContext';
import { Nav } from 'react-bootstrap';
import useQueryParams from '../../custom-hooks/useQueryParams';
import BASE_URL from '../../common/base-url';
import Loader from '../../components/Loader/Loader';
import AllBooksView from '../../components/AllBooks/AllBooksView';
import Home from '../../components/Home/Home';

const AllBooks = () => {
  const { currentUser } = useAuth();
  const { page } = useQueryParams();
  const history = useHistory();

  const fetchUrl =
    currentUser.role === 'Admin' ? `${BASE_URL}/admin` : BASE_URL;

  const [books, setBooks] = useState([]);
  const [pagesInfo, setPagesInfo] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);

    fetch(`${fetchUrl}/books?page=${page}`, {
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
  }, [fetchUrl, currentUser, page, history]);

  if (error) {
    return <Home />;
  }

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <AllBooksView books={books} />

      <Nav className="justify-content-center">
        {pagesInfo.hasPreviousPage && (
          <Nav.Item>
            <Nav.Link href={`/books?page=${pagesInfo.currentPage - 1}`}>
              PREVIOUS
            </Nav.Link>
          </Nav.Item>
        )}
        {pagesInfo.hasNextPage && (
          <Nav.Item>
            <Nav.Link href={`/books?page=${pagesInfo.currentPage + 1}`}>
              NEXT
            </Nav.Link>
          </Nav.Item>
        )}
      </Nav>
    </>
  );
};

export default AllBooks;
