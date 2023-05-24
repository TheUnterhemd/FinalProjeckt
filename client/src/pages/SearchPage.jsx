//import { useContext } from 'react'
// import { SearchContext } from '../context/SearchContext';

import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useFetch } from '../hooks/useFetch';
import { Box, Button, Container, Typography, Slider } from '@mui/material';
import SearchList from '../components/Search/SearchList';
import MapTest from "./MapTest";

const SearchPage = () => {
    // const { searchType } = useContext(SearchContext)
    //setting up query for search
    const [showFilters, setShowFilters] = useState(false);
    /* const [location, setLocation] = useState(''); */
    const [price, setPrice] = useState('');

    const toggleFilter = () => {
        setShowFilters(!showFilters);
    }

    const queryString = useLocation().search;
    const queryParams = new URLSearchParams(queryString);
    const query = queryParams.get('q');


    /* const searchURL = `http://localhost:5002/${searchType}?q=${query}`; */
    let searchURL = `http://localhost:5002/search/?q=${query}`

    const { data, isPending, error } = useFetch(searchURL);



    const valueText = (value) => {
        return `${value}€`;
    }

    return (
        <Container maxWidth="lg" >
            <Button variant='outlined' onClick={toggleFilter} sx={{ m: 1 }}>
                {showFilters ? 'Hide Filters' : 'Show Filters'}
            </Button>
            {
                showFilters &&
                <Box sx={{ display: "flex", justifyContent: "center" }}>
                    <Box sx={{ display: "flex", alignItems: "center", flexDirection: "column", width: "80%" }}>

                        {data && <MapTest markerOptions={data.courses} />}
                        <Typography>Price:</Typography>
                        <Slider
                            aria-label="Price"
                            defaultValue={100}
                            step={10}
                            max={500}
                            sx={{ width: "50%" }}
                            valueLabelDisplay='auto'
                            valueLabelFormat={valueText}
                            onChange={(e) => setPrice(e.target.value)} />
                    </Box>
                </Box>
            }

            <Box sx={{ height: '100vh', display: "flex", flexWrap: "wrap" }}>
                {error && <Typography variant='body1'>{error}</Typography>}
                {isPending && <Typography variant='body1'>Loading...</Typography>}
                {data && <SearchList searchData={data} coursePrice={price} />}
            </Box>
        </Container>
    )
}

export default SearchPage
