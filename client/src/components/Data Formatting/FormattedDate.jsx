import React from 'react'
import { Typography } from "@mui/material";

const FormattedDate = ({ startDate, endDate }) => {

    //times
    const startTime = startDate?.split('T')[1];
    const endTime = endDate?.split('T')[1];

    //formattedDates
    const startingDate = new Date(startDate);
    const startDay = String(startingDate.getDate()).padStart(2, '0');
    const startMonth = String(startingDate.getMonth() + 1).padStart(2, '0');
    const startYear = startingDate.getFullYear();
    const formattedStartDate = `${startDay}.${startMonth}.${startYear}`;

    const endingDate = new Date(endDate);
    const endDay = String(endingDate.getDate()).padStart(2, '0');
    const endMonth = String(endingDate.getMonth() + 1).padStart(2, '0');
    const endYear = endingDate.getFullYear();
    const formattedEndDate = `${endDay}.${endMonth}.${endYear}`;

    return (
        <>
            {
                startDate ?
                    (
                        <Typography variant="body1">
                            Starts: {formattedStartDate + ` |${startTime}`}
                        </Typography>
                    ) : (
                        <Typography variant="body1">
                            Ends: {formattedEndDate + ` |${endTime}`}
                        </Typography>
                    )
            }
        </>
    )
}

export default FormattedDate