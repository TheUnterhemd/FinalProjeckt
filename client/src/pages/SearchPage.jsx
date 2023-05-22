//import { useContext } from 'react'
// import { SearchContext } from '../context/SearchContext';

import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useFetch } from '../hooks/useFetch';
import { Box, Button, Container, Typography, Slider, TextField } from '@mui/material';
import SearchList from '../components/Search/SearchList';
import MapTest from "./MapTest";

const SearchPage = () => {
    // const { searchType } = useContext(SearchContext)
    //setting up query for search
    const [showFilters, setShowFilters] = useState(false);
    const [location, setLocation] = useState('');
    const [price, setPrice] = useState('');

    const toggleFilter = () => {
        setShowFilters(!showFilters);
    }

    const queryString = useLocation().search;
    const queryParams = new URLSearchParams(queryString);
    const query = queryParams.get('q');


    /* const searchURL = `http://localhost:5002/${searchType}?q=${query}`; */
    const searchURL = `http://localhost:5002/search/?q=${query}${location && `&location=${location}`}${price && `&price=${price}`}`
    const { data, isPending, error } = useFetch(searchURL);

    const valueText = (value) => {
        return `${value}€`;
    }

    return (
        <Container maxWidth="lg">
            <Button variant='outlined' onClick={toggleFilter}>
                {showFilters ? 'Hide Filters' : 'Show Filters'}
            </Button>
            {
                showFilters &&
                <Box sx={{ display: "flex", alignItems: "center" }}>
                    <TextField
                        margin="normal"
                        fullWidth
                        id="location"
                        label="Location"
                        name="location"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                    />

                    <Slider
                        aria-label="Price"
                        defaultValue={50}
                        getAriaValueText={valueText}
                        step={10}
                        valueLabelDisplay='auto'
                        onChange={(e) => setPrice(e.target.value)} />
                </Box>
            }
            
            {data && <MapTest markerOptions={data.courses} />}

            <Box sx={{ height: '100vh', display: "flex", flexWrap: "wrap" }}>
                {error && <Typography variant='body1'>{error}</Typography>}
                {isPending && <Typography variant='body1'>Loading...</Typography>}
                {data && <SearchList searchData={data} />}
            </Box>
        </Container>
    )
}

export default SearchPage
