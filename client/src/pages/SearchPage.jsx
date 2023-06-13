import { useState, useEffect, useContext } from "react";
import { useLocation } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";
import { Box, Container, Typography, useMediaQuery } from "@mui/material";
import SearchList from "../components/Search/SearchList";
import FilterMenu from "../components/FilterMenu";
import { SortContext } from "../context/SortContext";
import Searchbar from "../components/Search/Searchbar";

const SearchPage = () => {
  //setting up filters
  /* const [location, setLocation] = useState(''); */
  const [price, setPrice] = useState("");
  const [date, setDate] = useState("");
  const [formattedDate, setFormattedDate] = useState("");
  const { sort } = useContext(SortContext);

  //filter & setFilter Objects for external components
  const filters = { price, formattedDate, sort };
  const setFilters = { setPrice, setDate };

  //format Date for comparison
  useEffect(() => {
    if (date) {
      const localDate = new Date(date.$d);
      const adjustedDate = new Date(
        localDate.getTime() - localDate.getTimezoneOffset() * 60000
      );
      const formatted = adjustedDate.toISOString().split("T")[0];
      setFormattedDate(formatted);
    } else {
      setFormattedDate("");
    }
  }, [date]);

  // Check if it's mobile view
  const isMobileView = useMediaQuery("(max-width: 600px");

  //getting query params for searchURL
  const queryString = useLocation().search;
  const queryParams = new URLSearchParams(queryString);
  const query = queryParams.get("q");
  //fetching data
  let searchURL = `http://localhost:5002/search/?q=${query}`;
  const { data, isPending, error } = useFetch(searchURL);

  return (
    <Container maxWidth="lg" sx={{ mt: 12 }}>
      {isMobileView && <Searchbar />}
      <FilterMenu setFilter={setFilters} data={data} />
      <Box
        sx={{ minHeight: "100vh", display: "flex", flexWrap: "wrap", mb: 10 }}
      >
        {error && <Typography variant="body1">{error}</Typography>}
        {isPending && <Typography variant="body1">Loading...</Typography>}
        {data && <SearchList searchData={data} courseFilter={filters} />}
      </Box>
    </Container>
  );
};

export default SearchPage;
