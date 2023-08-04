import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import EmailIcon from '@mui/icons-material/Email';
import Nav from './Nav';

const defaultTheme = createTheme();

export default function Subscribe() {

    async function handleSubmit(event) {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        await fetch('/api/email', {
            method: 'POST',
            body: JSON.stringify({
                firstName: data.get('name')
            })
        })

        console.log({
          email: data.get('email'),
          name: data.get('name'),
        });
      };

    return (
        <>
            <Nav />
        <Container maxWidth="md" sx={{ mt: 20 }}>
            <ThemeProvider theme={defaultTheme}>
                <Container component="main" maxWidth="s">
                    <CssBaseline />
                    <Box
                        sx={{
                            marginTop: 25,
                            marginLeft: 35,
                            marginRight : 6,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            
                        }}
                    >
                        <Avatar sx={{ m: 1}}>
                            <EmailIcon />
                        </Avatar>
                        <Typography component="h2" variant="h5">
                            Sign up to receive daily NASA images
                        </Typography>
                        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                            <Grid container spacing={2}>
                                <Grid item xs={15} sm={15}>
                                    <TextField
                                        autoComplete="given-name"
                                        name="name"
                                        required
                                        fullWidth
                                        id="name"
                                        label="Name"
                                        autoFocus
                                />
                                </Grid>
              
                                <Grid item xs={12}>
                                    <TextField
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                    />
                                </Grid>
                            </Grid>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Sign Up
                            </Button>
                            <Grid container justifyContent="flex-end">
                            </Grid>
                        </Box>
                    </Box>
                </Container>
            </ThemeProvider>
        </Container>

        </>
    );
}