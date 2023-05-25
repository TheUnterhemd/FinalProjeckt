import { Box, Typography } from '@mui/material';
import PersonCard from '../PersonCard';
import CourseCard from '../CourseCard';

const SearchList = ({ searchData, courseFilter }) => {

    if (searchData.trainer.length === 0 && searchData.courses.length === 0) {
        return <Typography variant='body1'>No data to load...</Typography>;
    }

    //filter & conditions
    let filteredCourses = searchData.courses;
    if (courseFilter.price || courseFilter.price === 0) {
        filteredCourses = filteredCourses.filter(
            (course) => course.price <= courseFilter.price
        );
    }

    if (courseFilter.formattedDate) {
        filteredCourses = filteredCourses.filter(
            (course) => course.start.split('T')[0] === courseFilter.formattedDate
        );
    }

    if (courseFilter.sort) {
        switch (courseFilter.sort) {
            case 'ascPrice':
                filteredCourses = filteredCourses.sort((a, b) => a.price - b.price);
                break;
            case 'descPrice':
                filteredCourses = filteredCourses.sort((a, b) => b.price - a.price);
                break;
            case 'ascDate':
                filteredCourses = filteredCourses.sort((a, b) => new Date(a.start) - new Date(b.start));
                break;
            case 'descDate':
                filteredCourses = filteredCourses.sort((a, b) => new Date(b.start) - new Date(a.start));
                break;
            default:
        }
    }

    return (
        <Box display="flex" flexDirection="column" sx={{ width: "100%" }}>
            <Typography variant='h5'>Trainer:</Typography>
            <Box display="flex" flexWrap="wrap">
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