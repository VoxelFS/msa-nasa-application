import React, { useState } from "react";
import { useEffect } from "react";
import Nav from "./Nav";
import { Box, Container, Divider } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";


export default function POTD() {
    const [photoData, setPhotoData] = useState(null);

    useEffect(() => {
        fetchPhoto();

        async function fetchPhoto() {
            const res = await fetch(
                'https://api.nasa.gov/planetary/apod?api_key=ak1wcVMN6rYN6JFCJYWbN11XT7GDHRIcs5X1pu8H'
            );
            const data = await res.json();
            setPhotoData(data);
        }
    }, []);

    if (!photoData) return <div />;

    return (
        <div>
            <Nav />
            <Container maxWidth="md" sx={{ mt: 10 }}>
                <Stack direction="column" spacing={1}>
                    <Typography variant="h4" sx={{fontSize: 30}}>
                    
                        <b>{photoData.title}</b>
                    </Typography>
                    <Stack 
                        direction="row"
                        divider={<Divider orientation="vertical" flexItem />}
                        spacing={2}
                        sx={{
                            alignContent: "center"
                        }}
                    >
                        {photoData.media_type === 'image' ? (
                            <img src={photoData.url} alt={photoData.title} height={500} />
                        ) : (
                            <iframe 
                                title="space-video"
                                src={photoData.url}
                                frameBorder={0}
                                gesture="media"
                                allow="encrypted-media"
                                allowFullScreen
                                className="photo"
                            />
                        )}
                    <Grid sx>
                        <Card sx={{ minWidth: 300 }}>
                            <CardContent>
                                <Typography sx={{ fontSize: 15 }} color="text.secondary" gutterBottom>
                                    <b>{photoData.date}</b>
                                </Typography>
                                <Box sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    height: 430,
                                    overflow: "auto",
                                    overflowY: "scroll"
                                }}>
                                    <Typography variant="body2" sx={{ fontSize: 15}}>
                                        {photoData.explanation}
                                    </Typography>
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>
                    </Stack>
                </Stack>
                    
                    
            </Container>
            
            
        </div>
    );
}