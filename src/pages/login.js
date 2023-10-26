import * as React from 'react';
import { useNavigate } from 'react-router-dom';

import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import GoogleIcon from '@mui/icons-material/Google';

import meeting from '../assets/meeting.png';
import Colours from '../colours';

import { UserAuth } from '../config/auth';


const Login = () => {
    const { googleSignIn, user } = UserAuth();
    const navigate = useNavigate();

    const handleGoogleSignIn = async () => {
        try {
            await googleSignIn();
        } catch (error) {
            console.error(error)
        }
    }

    React.useEffect(() => {
        if (user != null) {
          navigate('/');
        }
      }, [user, navigate]);

    return (
        <Grid container component="main" sx={{ height: '100vh' }} >
            <Grid
                item
                xs={false}
                md={7}
                sx={{
                    display: { xs: 'none', md: 'block' },
                    backgroundImage: `url(${meeting})`,
                    backgroundColor: Colours.secondaryOrange,
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'contain',
                    backgroundPosition: 'center',
                    backgroundOrigin: 'content-box',
                    p: 10
                }}
            />
            <Grid item xs={12} md={5} component={Paper} elevation={5} square sx={{ textAlign: 'center', py: 10 }} >
                <Box
                    sx={{
                        mx: 4,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'space-evenly',
                        height: '100%'
                    }}
                >
                    <Box>
                        <Typography component="h1" variant="h3">
                            Welcome back!
                        </Typography>
                        <Typography component="p" variant="p" sx={{ mt: 3 }}>
                            Sign in to with your google account.
                        </Typography>
                    </Box>
                    <Box>
                        <Button
                            variant="contained"
                            size='large'
                            sx={{ mt: 1, mb: 3, textTransform: "none", color: Colours.lightText }}
                            startIcon={<GoogleIcon sx={{ mr: 1 }} />}
                            onClick={handleGoogleSignIn}
                        >
                            Continue with Google
                        </Button>
                    </Box>
                </Box>
            </Grid>
        </Grid>
    )
}

export default Login;