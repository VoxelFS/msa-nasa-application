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
import { useAuth } from './Auth';
import { useNavigate } from 'react-router-dom';

const defaultTheme = createTheme();

export const Login = () => {
    const [user, setUser] = React.useState('');
    const auth = useAuth();
    const navigate = useNavigate();

    const handleLogin = () => {
        auth.login(user);
        navigate('/account', {replace: true});
    }

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
                            Please login to view feedback!
                        </Typography>
                        <Box sx={{ mt: 3 }}>
                                    <TextField
                                        autoComplete="given-name"
                                        name="name"
                                        required
                                        fullWidth
                                        id="name"
                                        label="Username"
                                        autoFocus
                                        onChange={(e) => setUser(e.target.value)}
                                />

                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                                onClick={handleLogin}
                            >
                                Sign In
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