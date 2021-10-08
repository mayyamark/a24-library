import { useLocation } from 'react-router-dom';

const useQueryParams = () =>
  Object.fromEntries(new URLSearchParams(useLocation().search));

export default useQueryParams;
