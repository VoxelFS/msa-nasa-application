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
import Nav from './Nav';
import { useAuth } from './Auth';
import { useNavigate } from 'react-router-dom';
import LoginIcon from '@mui/icons-material/Login';

const defaultTheme = createTheme();

export const Login = () => {
    const [user, setUser] = React.useState('');
    const [password, setPassword] = React.useState('');
    const auth = useAuth();
    const navigate = useNavigate();

    const handleLogin = async () => {
        await auth.login(user, password);
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
                            <LoginIcon />
                        </Avatar>
                        <Typography component="h3" variant="h6">
                            Please login to view your saved photos!
                        </Typography>
                        <Box sx={{ mt: 3 }}>
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
                                        onChange={(e) => setUser(e.target.value)}
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
                                    />
                                </Grid>
                            </Grid>

                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                                onClick={handleLogin}
                            >
                                Sign In
                            </Button>
                        </Box>
                    </Box>
                </Container>
            </ThemeProvider>
        </Container>
        </>
    );
}