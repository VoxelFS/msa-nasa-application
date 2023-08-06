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
import { Card, CardActions, CardContent, Modal } from '@mui/material';

const defaultTheme = createTheme();

export default function Subscribe() {

    const [open, setOpen] = React.useState(false);

    async function handleSubmit(event) {
        setOpen(true);
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const feedback = data.get('feedback');
        const name = data.get('name');
        
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        
        const raw = JSON.stringify({
        "id": 0,
        "name": name,
        "email": feedback, // i know that it says email, but couldnt change this to feedback due to time constraints. please just think of email as feedback :D
        });
        
        const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        };
        
        await fetch("https://msa-nasa-project.azurewebsites.net/api/Users", requestOptions);
        
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
                            Have feedback on the site? Leave them here!
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
                                    id="feedback"
                                    label="Leave some feedback"
                                    name="feedback"
                                    multiline
                                    rows={6}
                                    />
                                </Grid>
                            </Grid>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Send
                            </Button>
                            <Grid container justifyContent="flex-end">
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
                            Thank you for your feedback!
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button size="medium" onClick={() => setOpen(false)}>Close</Button>
                    </CardActions>
                </Card>
            </Modal>
        </Container>
        </>
    );
}