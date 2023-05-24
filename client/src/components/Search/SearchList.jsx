import React from 'react';
import { Box, Typography } from '@mui/material';
import PersonCard from '../PersonCard';
import CourseCard from '../CourseCard';


const SearchList = ({ searchData, coursePrice }) => {

    if (searchData.trainer.length === 0 && searchData.courses.length === 0) {
        return <Typography variant='body1'>No data to load...</Typography>;
    }

    let filteredCourses = searchData.courses;
    if (coursePrice || coursePrice === 0) {
        filteredCourses = filteredCourses.filter(
            (course) => course.price <= coursePrice
        );
    }

    return (
        <Box display="flex" flexDirection="column" >
            <Typography variant='h5'>Trainer:</Typography>
            <Box display="flex">
                {searchData.trainer.length > 0 && searchData?.trainer.map((searchData) => (
                    <Box m={1} key={searchData._id}>
                        <PersonCard data={searchData} />
                    </Box>
                ))}
            </Box>
            <Typography variant='h5'>Courses:</Typography>
            <Box display="flex" flexWrap="wrap">
                {filteredCourses.length > 0 &&
                    filteredCourses.map((courseData) => (
                        <Box m={1} key={courseData._id}>
                            <CourseCard data={courseData} />
                        </Box>
                    ))}
            </Box>
        </Box >
    )
}

export default SearchList