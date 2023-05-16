/* import {MenuItem} from '@mui/material';
import { useContext } from 'react';
import { SearchContext } from '../../context/SearchContext'; */
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, TextField } from '@mui/material';

const Searchbar = () => {
  //for example trainer/byName or byCourse, also possible course/ByName 
  // const { searchType, setSearchType } = useContext(SearchContext);
  const [search, setSearch] = useState('')
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();

    navigate(`/search?q=${search}`);
  }

  return (
    <>
      {/* <Box sx={{ display: "flex" }}>
        <TextField
          select
          value={searchType}
          onChange={(e) => setSearchType(e.target.value)}
          label="Search Type"
          sx={{ width: "10rem", mr: 1 }}
          margin="normal"
        >
          <MenuItem value="trainer/byName">Trainer by Name</MenuItem>
          <MenuItem value="trainer/byCourse">Trainer by Course</MenuItem>
          <MenuItem value="course/ByName">Course by Name</MenuItem>
        </TextField> */}
      <Box
        component='form'
        onSubmit={handleSearch}
      >
        <TextField
          margin="normal"
          required
          fullWidth
          id="search"
          label="Search"
          name="search"
          onChange={(e) => setSearch(e.target.value)}
        />
      </Box>
      {/* </Box> */}
    </>
  )
}

export default Searchbar