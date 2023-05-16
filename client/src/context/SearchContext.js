import {createContext, useState} from 'react'

export const SearchContext = createContext();

const SearchProvider = ({children}) => {
    const [searchType, setSearchType] = useState('');

  return (
    <SearchContext.Provider value={{ searchType, setSearchType }}>
    {children}
  </SearchContext.Provider>
  )
}

export default SearchProvider