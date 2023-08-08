import React, { useEffect, useState } from "react";
import Nav from "./Nav";
import { useAuth } from "./Auth";
import { Box, Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Container, Grid, Modal, Stack, Typography } from "@mui/material";
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';

export default function Account() {
    const auth = useAuth();
    const [images, setImages] = useState([]);
    const [show, setShow] = useState(false);
    const [data, setData] = useState([]);

    useEffect(() => {
        getData();

        async function getData() {
            const res = await fetch(
                `https://msa-nasa-project.azurewebsites.net/api/Images/${auth.user}`
            );
            const data = await res.json();
            setImages(data);
        }
    }, []);

    function handleModal(image, title, description) {
        setData([image, title, description]);
        setShow(true);
    }

    async function Unsave(image, title, description) {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
        "id": 0,
        "image": image,
        "title": title,
        "description": description,
        "userID": auth.user
        });

        const requestOptions = {
        method: 'DELETE',
        headers: myHeaders,
        body: raw,
        };

        await fetch("https://msa-nasa-project.azurewebsites.net/api/Images", requestOptions);

        setShow(false);
    }

    return (
        <>
            <Nav />
            <Container maxWidth="md" sx={{ mt: 12}}>
                <Box
                    sx={{
                        marginTop: 15,
                        marginLeft: 10,
                        marginRight : -15,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        
                    }}
                >
                    <Typography variant="h4">
                        Welcome back, here are your saved images
                    </Typography>
                    <Stack direction="column" spacing={2} sx={{
                        maxHeight: 700, overflow: 'hidden', overflowY: 'scroll'
                    }}>  
                        <Grid container spacing={4} >
                            <ImageList variant="masonry" cols={3} gap={8}>
                                {images && (images.map((item, index) => (
                                    <ImageListItem key={index} onClick={() => handleModal(item.image, item.title, item.description)}>
                                        <img
                                            src={`${item.image}?w=248&fit=crop&auto=format`}
                                            srcSet={`${item.image}?w=248&fit=crop&auto=format&dpr=2 2x`}
                                            alt={item.title}
                                            loading="lazy"
                                            
                                        />
                                        <ImageListItemBar 
                                            title={item.title}
                                        />
                                    </ImageListItem>
                                )))}
                            </ImageList>
                        </Grid>
            
                    </Stack>
                    <Button variant="contained" fullWidth sx={{ mt: 3 }} onClick={() => auth.logout()}>
                        Logout
                    </Button>
                </Box>
            </Container>

            {images && (<Container>
                <Modal
                    open={show}
                    onClose={() => setShow(false)}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        height: "100vh", 
                    }}
                >
                    <Card sx={{ maxWidth: 400 }}>
                        <CardActionArea>
                            <CardMedia
                                component="img"
                                height="400"
                                image={data[0]}
                                alt={data[1]}
                            />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">
                                        {data[1]}
                                    </Typography>
                                    <Typography variant="body1" color="text.secondary">
                                        <Box
                                            sx={{
                                                display: "flex",
                                                flexDirection: "column",
                                                height: 90,
                                                overflow: "auto",
                                                overflowY: "scroll"
                                            }}
                                        >
                                            {data[2]}
                                        </Box>
                                    </Typography>
                                </CardContent>
                        </CardActionArea>
                        <CardActions>
                            <Button size="medium" color="primary" onClick={() => Unsave(data[0], data[1], data[2])}>
                                Unsave
                            </Button>
                        </CardActions>
                    </Card>
                </Modal>
            </Container>
            )}
        </>
    );
}