import React, { useState } from "react";
import { Box, Button, Container, Stack, TextField } from "@mui/material";
import Gallery from "./Gallery";
import Nav from "./Nav";

export default function Home() {

    const [search, setSearch] = useState("");
    const [photos, setPhotos] = useState(null);

    const handleChange = (e) => {
        setSearch(e.target.value);
    };

    async function searchNASA() {
        const res = await fetch(
            `https://images-api.nasa.gov/search?media_type=image&q=${search}`
        );
        const pre = await res.json();
        setPhotos(await pre.collection.items);
        console.log(photos) 
    }

    return ( 
        <div>
            <div>
                <Nav />
            </div>
            <Box sx={{
                    marginTop: 20,
                    marginLeft: 35,
                    marginRight : 6,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    
                }}>
            <Container maxWidth="md">
                <Stack spacing={2} direction="row">
                
                    <TextField
                        id="search"
                        type="search"
                        label="Search beyond the stars..."
                        value={search}
                        onChange={handleChange}
                        autoFocus
                        sx={{ width: 600}}
                    />
                    <Button variant="contained" disabled={search === ""} onClick={async () => await searchNASA()}>Search</Button>
                    
                </Stack>
            </Container>
            <div>
                <Box sx={{ 
                        marginRight: 52,
                        marginLeft: 20,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center'
                    }}>
                    {photos && <Gallery json={photos} search={search} />}
                </Box>
            </div>
            </Box>
        </div>
    );
}