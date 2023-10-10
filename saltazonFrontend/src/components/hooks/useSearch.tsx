import React, { useContext } from 'react';
import SearchContext from '../context/searchContext';
import { SearchContextInterface } from '../context/searchContext';

const useSearch = (): SearchContextInterface => {
  return useContext(SearchContext);
}

export default useSearch;
