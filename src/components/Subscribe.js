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
import { Card, CardActions, CardContent, Divider, Modal } from '@mui/material';
import Link from '@mui/material/Link';

const defaultTheme = createTheme();

export default function Subscribe() {

    const [open, setOpen] = React.useState(false);
    const [exist, setExist] = React.useState(false);

    async function handleSubmit(event) {
        
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const password = data.get('password');
        const email = data.get('email');
        
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        
        const raw = JSON.stringify({
        "id": 0,
        "name": email,
        "email": password, // i know that it says email, but couldnt change this to feedback due to time constraints. please just think of email as password :D
        });
        
        const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        };
        
        const res = await fetch("https://msa-nasa-project.azurewebsites.net/api/Users", requestOptions);
        if (res.ok === true) {
            setOpen(true);
        }
        else if (res.ok === false) {
            setExist(true);
        }
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
                        <Typography component="h3" variant="h6">
                            Sign up to save your favourite NASA images!
                        </Typography>
                        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                            <Grid container spacing={2}>
                                <Grid item xs={15} sm={15}>
                                    <TextField
                                        autoComplete="given-name"
                                        name="email"
                                        required
                                        fullWidth
                                        id="email"
                                        label="Email"
                                        autoFocus
                                />
                                </Grid>
              
                                <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="new-password"
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
                                <Grid item>
                                    <Link href="/login" variant="body2">
                                        Already have an account? Sign in
                                    </Link>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                </Container>
            </ThemeProvider>
        </Container>
        
        <Container>
            <Modal 
                open={open}
                onClose={() => setOpen(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100vh", 
                }}
            >
                <Card sx={{ minWidth: 275 }}>
                    <CardContent>
                        <Typography variant='h5' component="div">
                            Thank you for signing up!
                        </Typography>
                        <Typography variant="body1" color="text.secondary">
                            You can sign in now.
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button size="medium" onClick={() => setOpen(false)}>Close</Button>
                    </CardActions>
                </Card>
            </Modal>
        </Container>

        <Container>
            <Modal 
                open={exist}
                onClose={() => setExist(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100vh", 
                }}
            >
                <Card sx={{ minWidth: 275 }}>
                    <CardContent>
                        <Typography variant='h5' component="div">
                            Account already exists.
                        </Typography>
                        <Typography variant="body1" color="text.secondary">
                            Please sign in instead.
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button size="medium" onClick={() => setExist(false)}>Close</Button>
                    </CardActions>
                </Card>
            </Modal>
        </Container>
        </>
    );
}