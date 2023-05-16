import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, CardActionArea, Box, Avatar, Stack, Typography, Chip } from '@mui/material'

import { LocationOn } from '@mui/icons-material'

const CourseShowcase = ({ data }) => {
    const navigate = useNavigate();

    const handleOpen = (e) => {
        e.preventDefault();
        navigate(`/course/${data._id}`);
    }

    return (
        <Card onClick={handleOpen}>
            <CardActionArea>
                <Box sx={{ p: 2, display: 'flex', width: "15rem", justifyContent: "space-between", alignItems: "center", }}>
                    <Box sx={{ display: "flex", alignItems: "center", }}>
                        <Avatar variant="rounded" src={data.imgURL} sx={{ mr: "5px" }} />
                        <Stack spacing={0.5}>
                            <Typography fontWeight={700}>{data.title}</Typography>
                            <Box
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    overflow: 'hidden',
                                    maxWidth: '6.5rem',
                                }}
                                color="text.secondary"
                            >
                                <LocationOn />
                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                    sx={{
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                        whiteSpace: 'nowrap',
                                    }}
                                >
                                    {data.location}
                                </Typography>
                            </Box>
                        </Stack>
                    </Box>
                    <Box>
                        <Chip label={`${data.price} €`} />
                    </Box>
                </Box>
            </CardActionArea>
        </Card>
    )
}

export default CourseShowcase