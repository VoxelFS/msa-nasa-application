import React, { useState } from "react";
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import ListSubheader from '@mui/material/ListSubheader';
import { CardActions, Container } from "@mui/material";
import { Modal } from "@mui/material";
import { Card, CardActionArea, CardContent, CardMedia, Typography, Button } from "@mui/material";
import { Box } from "@mui/material"
import { useAuth } from "./Auth";


export default function Gallery({json, search}) {

    const [show, setShow] = useState(false);
    const [modalDataIndex, setModalDataIndex] = useState(0);
    const auth = useAuth();

    function handleModal(index) {
        setModalDataIndex(index)
        setShow(true);
    }

    async function savePhoto(image, title, description) {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        
        var raw = JSON.stringify({
        "id": 0,
        "image": image,
        "title": title,
        "description": description,
        "userID": auth.user
        });

        var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        };

        await fetch("https://msa-nasa-project.azurewebsites.net/api/Images", requestOptions);
        setShow(false);
    }

    return (
        <>
        <Container maxWidth="md" sx={{ height:300 }}>
            <ImageListItem key="Subheader">
                <ListSubheader component="div">Showing images of {search}</ListSubheader>
            </ImageListItem>
            <Box sx={{
                width: 1000,
                height: 550,
                overflowY: 'scroll'
            }}>
            <ImageList variant="masonry" cols={3} gap={7} >
                {json.map((item, index) => (
                    <ImageListItem key={index} onClick={() => handleModal(index)} >
                        <img 
                            src={`${item.links[0].href}?w=248&fit=crop&auto=format`}
                            srcSet={`${item.links[0].href}?w=248&fit=crop&auto=format&dpr=4 4x`}
                            alt={item.data[0].title}
                            loading="lazy"
                            
                        />
                        <ImageListItemBar
                            title={item.data[0].title}
                        />
                    </ImageListItem>
                    
                ))}
            </ImageList>
            </Box>
        </Container>
        
        <Container>
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
                            image={json[modalDataIndex].links[0].href}
                            alt={json[modalDataIndex].data[0].title}
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                {json[modalDataIndex].data[0].title}
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
                                {json[modalDataIndex].data[0].description}
                            </Box>
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                    {auth.user && (
                        <CardActions>
                        <Button size="medium" color="primary" onClick={() => savePhoto(json[modalDataIndex].links[0].href, json[modalDataIndex].data[0].title, json[modalDataIndex].data[0].description)}>
                            Save
                        </Button>
                    </CardActions>
                    )}
                </Card>
            </Modal>
        </Container>
        
        </>
    );
}