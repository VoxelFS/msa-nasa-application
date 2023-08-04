import React, { useState } from "react";
import { Button, Container, Stack, TextField } from "@mui/material";
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
    }

    return ( 
        <div>
            <div>
                <Nav />
            </div>
            <Container maxWidth="md" sx={{ mt: 10 }}>
                <Stack spacing={2} direction="row">
                
                    <TextField
                        id="search"
                        type="search"
                        label="Search beyond the stars..."
                        value={search}
                        onChange={handleChange}
                        sx={{ width: 600}}
                    />
                    <Button variant="contained" disabled={search === ""} onClick={async () => await searchNASA()}>Search</Button>
                    
                </Stack>
            </Container>
            <div>
                {photos && <Gallery json={photos} search={search} />}
            </div>
            
        </div>
    );
}