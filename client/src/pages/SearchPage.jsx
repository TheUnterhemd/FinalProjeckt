import { useState, useEffect, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { useFetch } from '../hooks/useFetch';
import { Box, Button, Container, Typography, Slider } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import SearchList from '../components/Search/SearchList';
import MapTest from "./MapTest";
import SortMenu from '../components/SortMenu';
import { SortContext } from '../context/SortContext';

const SearchPage = () => {
    //setting up filters
    const [showFilters, setShowFilters] = useState(false);
    /* const [location, setLocation] = useState(''); */
    const [price, setPrice] = useState('');
    const [date, setDate] = useState('');
    const [formattedDate, setFormattedDate] = useState('');
    const { sort } = useContext(SortContext);

    const filters = { price, formattedDate, sort };

    //format Date for comparison
    useEffect(() => {
        if (date) {
            const localDate = new Date(date.$d);
            const adjustedDate = new Date(localDate.getTime() - localDate.getTimezoneOffset() * 60000);
            const formatted = adjustedDate.toISOString().split('T')[0];
            setFormattedDate(formatted);
        } else {
            setFormattedDate("");
        }
    }, [date]);

    //filter toggle
    const toggleFilter = () => {
        setShowFilters(!showFilters);
    }

    //getting query params for searchURL
    const queryString = useLocation().search;
    const queryParams = new URLSearchParams(queryString);
    const query = queryParams.get('q');


    let searchURL = `http://localhost:5002/search/?q=${query}`

    const { data, isPending, error } = useFetch(searchURL);


    //func for slider value
    const valueText = (value) => {
        return `${value}€`;
    }

    return (
        <Container maxWidth="lg" >
            <Button variant='outlined' onClick={toggleFilter} sx={{ m: 1 }}>
                {showFilters ? 'Hide Filters' : 'Show Filters'}
            </Button>
            <SortMenu />
            {
                showFilters &&
                <Box sx={{ display: "flex", justifyContent: "center" }}>
                    <Box sx={{ display: "flex", alignItems: "center", flexDirection: "column", width: "80%" }}>

                        {data && <MapTest markerOptions={data.courses} />}
                        <Box sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            width: "100%"
                        }}>
                            <Typography sx={{ marginRight: 1 }}>Price:</Typography>
                            <Slider
                                aria-label="Price"
                                defaultValue={100}
                                step={10}
                                max={500}
                                sx={{ width: "60%" }}
                                valueLabelDisplay='auto'
                                valueLabelFormat={valueText}
                                onChange={(e) => setPrice(e.target.value)} />
                            <DatePicker
                                label="Start Date"
                                views={['month', 'day']}
                                sx={{ margin: 1 }}
                                format='DD/MM/YYYY'
                                onChange={(newValue) => setDate(newValue)} />
                        </Box>
                    </Box>
                </Box>
            }

            <Box sx={{ height: '100vh', display: "flex", flexWrap: "wrap" }}>
                {error && <Typography variant='body1'>{error}</Typography>}
                {isPending && <Typography variant='body1'>Loading...</Typography>}
                {data && <SearchList searchData={data} courseFilter={filters} />}
            </Box>
        </Container>
    )
}

export default SearchPage
