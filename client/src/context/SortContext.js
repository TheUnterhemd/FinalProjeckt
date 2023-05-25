import {createContext, useState} from 'react'

export const SortContext = createContext();

const SortProvider = ({children}) => {
    const [sort, setSort] = useState('');

  return (
    <SortContext.Provider value={{ sort, setSort }}>
      {children}
    </SortContext.Provider>
  )
}

export default SortProvider;