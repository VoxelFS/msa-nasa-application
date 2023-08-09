import React from "react";
import Nav from "./Nav";
import { Box, Card, CardContent, Container, Divider, Grid, Stack, Typography } from "@mui/material";
import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import LoginIcon from '@mui/icons-material/Login';

export default function About() {
    return (
        <>
        <Nav />
        <Box sx={{
                    marginTop: 20,
                    marginLeft: 35,
                    marginRight : 6,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    
                }}>
        <Container maxWidth="md" sx={{ mt: 12}}>
        <Stack direction="column" spacing={0}>
            <Typography variant="h4">
                About this site
            </Typography>
            <Grid container spacing={2}>
                <Grid item xs>
                    <Card sx={{ minWidth: 270, minHeight: 350}}>
                        <CardContent>
                            <Box sx={{ m: 1 }}>
                            <Typography variant="h5" component="div">
                                <TravelExploreIcon />
                                <br/>
                                Search for images
                            </Typography>
                            </Box>
                            <Divider />
                            <Box sx={{ m: 1 }}>
                            <Typography variant="body2">
                                This page fetches images from the NASA image library based on the keyword which the user enters.
                                Images returned from the library will be displayed in an image grid.
                            </Typography>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs>
                    <Card sx={{ minWidth: 270, minHeight: 350}}>
                        <CardContent>
                            <Box sx={{ m: 1 }}>
                            <Typography variant="h5" component="div">
                                <RocketLaunchIcon />
                                <br/>
                                Picture of the day
                            </Typography>
                            </Box>
                            <Divider />
                            <Box sx={{ m: 1 }}>
                            <Typography variant="body2">
                                This page fetches the Astronomy picture of the day from the NASA API and displays it.
                                The page displays the image along with the title, date and a brief explanation of the image.
                            </Typography>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs>
                    <Card sx={{ minWidth: 270, minHeight: 350}}>
                        <CardContent>
                            <Box sx={{ m: 1}}>
                            <Typography variant="h5" component="div">
                                <LoginIcon />
                                <br/>
                                Sign Up
                            </Typography>
                            </Box>
                            <Divider />
                            <Box sx={{ m: 1}}>
                            <Typography variant="body2">
                                This page allows the user to sign up for an account and save their favourite NASA pictures. This page also 
                                allows existing users to sign in to view their favourite NASA pictures.

                            </Typography>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Stack>
        </Container>
        </Box>
        </>
    );
}