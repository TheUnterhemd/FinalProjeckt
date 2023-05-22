//import { useContext } from 'react'
// import { SearchContext } from '../context/SearchContext';
import { useLocation } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";
import { Box, Container, Typography } from "@mui/material";
import SearchList from "../components/Search/SearchList";
import MapTest from "./MapTest";

const SearchPage = () => {
  // const { searchType } = useContext(SearchContext)
  //setting up query for search
  const queryString = useLocation().search;
  const queryParams = new URLSearchParams(queryString);
  const query = queryParams.get("q");

  /* const searchURL = `http://localhost:5002/${searchType}?q=${query}`; */
  const searchURL = `http://localhost:5002/search/?q=${query}`;
  const { data, isPending, error } = useFetch(searchURL);

  return (
    <Container maxWidth="lg">
      {data && <MapTest markerOptions={data.courses} />}
      <Box sx={{ height: "100vh", display: "flex" }}>
        {error && <Typography variant="body1">{error}</Typography>}
        {isPending && <Typography variant="body1">Loading...</Typography>}
        {data && <SearchList searchData={data} />}
      </Box>
    </Container>
  );
};

export default SearchPage;
