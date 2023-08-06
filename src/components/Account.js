import React, { useEffect, useState } from "react";
import Nav from "./Nav";
import { useAuth } from "./Auth";
import { Box, Button, Card, CardContent, Container, Divider, Grid, Stack, Typography } from "@mui/material";
import InfoIcon from '@mui/icons-material/Info';

export default function Account() {
    const auth = useAuth();
    const [feedback, setFeedback] = useState(null);

    

    useEffect(() => {
        getData();

        async function getData() {
            const res = await fetch(
                'https://msa-nasa-project.azurewebsites.net/api/Users'
            );
            const data = await res.json();
            setFeedback(data);
        }
    }, []);

    return (
        <>
            <Nav />
            <Container maxWidth="md" sx={{ mt: 12}}>
                <Stack direction="column" spacing={0} sx={{
                            marginTop: 20,
                            marginLeft: 11,
                            marginRight: -15,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            maxHeight: 700, overflow: 'hidden', overflowY: 'scroll'
                        }}>
                    <Typography variant="h4">
                        Welcome back, here are some feedback about this site:
                    </Typography>
                <Grid container spacing={4} >
                    {feedback && (feedback.map((item, index) => (
                        <Grid item xs={4}>
                            <Card sx={{ minWidth: 270, minHeight: 250}}>
                                <CardContent>
                                    <Box sx={{ m: 1 }}>
                                    <Typography variant="h5" component="div">
                                        <InfoIcon />
                                        <br/>
                                        Feedback {index + 1}: {item.name}
                                    </Typography>
                                    </Box>
                                    <Divider />
                                    <Box sx={{ m: 1, height: 100, overflow: "auto", overflowY: "scroll" }}>
                                    <Typography variant="body2">
                                        {item.email}
                                    </Typography>
                                    </Box>
                                </CardContent>
                            </Card>
                        </Grid>
                    )))}
                </Grid>
                <Button variant="contained" fullWidth sx={{ mt: 3 }} onClick={() => auth.logout()}>
                    Logout
                </Button>
                </Stack>
                
            </Container>
        </>
    );
}