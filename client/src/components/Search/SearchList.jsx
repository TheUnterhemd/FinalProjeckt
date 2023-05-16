import React from 'react';
import { Box, Typography } from '@mui/material';
import PersonCard from '../PersonCard';
import CourseCard from '../CourseCard';


const SearchList = ({ searchData }) => {

    if (searchData.trainer.length === 0 && searchData.courses.length === 0) {
        return <Typography variant='body1'>No data to load...</Typography>;
    }

    return (
        <>
            {searchData.trainer.length > 0 ? searchData?.trainer.map((searchData) => (
                <Box m={1}>
                    <PersonCard data={searchData} />
                </Box>
            )) : searchData?.courses.map((searchData) => (
                <Box m={1}>
                    <CourseCard data={searchData} />
                </Box>
            ))}
        </>
    )
}

export default SearchList