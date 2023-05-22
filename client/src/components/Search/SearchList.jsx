import React from 'react';
import { Box, Typography } from '@mui/material';
import PersonCard from '../PersonCard';
import CourseCard from '../CourseCard';


const SearchList = ({ searchData }) => {

    if (searchData.trainer.length === 0 && searchData.courses.length === 0) {
        return <Typography variant='body1'>No data to load...</Typography>;
    }

    return (
        <Box display="flex" flexDirection="column" >
            <Typography variant='h5'>Trainer:</Typography>
            <Box display="flex">
                {searchData.trainer.length > 0 && searchData?.trainer.map((searchData) => (
                    <Box m={1}>
                        <PersonCard data={searchData} />
                    </Box>
                ))}
            </Box>
            <Typography variant='h5'>Courses:</Typography>
            <Box display="flex" flexWrap="wrap">
                {searchData.courses.length > 0 && searchData?.courses.map((searchData) => (
                    <Box m={1}>
                        <CourseCard data={searchData} />
                    </Box>
                ))}
            </Box>
        </Box >
    )
}

export default SearchList