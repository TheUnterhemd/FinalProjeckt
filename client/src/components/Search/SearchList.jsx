import React from 'react';
import { Typography } from '@mui/material';
import PersonCard from '../PersonCard';


const SearchList = ({ searchData }) => {

    if (searchData.length === 0) {
        return <Typography variant='body1'>No data to load...</Typography>;
    }

    return (
        <>
            {searchData?.map((searchData) => (
                <PersonCard data={searchData} />
            ))}
        </>
    )
}

export default SearchList