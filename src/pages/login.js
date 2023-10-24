import * as React from 'react';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import meeting from '../assets/meeting.png';
import colours from '../colours';


export default function Login() {
    return (
        <Grid container component="main" sx={{ height: '100vh' }} >
            <Grid
                item
                xs={false}
                md={7}
                sx={{
                    display: { xs: 'none', md: 'block' },
                    backgroundImage: `url(${meeting})`,
                    backgroundColor: colours.secondaryOrange,
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
                            sx={{ mt: 1, mb: 3 }}
                        >
                            Continue With Google
                        </Button>
                        <br />
                        <Link href="#" variant="p">
                            {"Don't have an account? Sign Up"}
                        </Link>
                    </Box>
                </Box>
            </Grid>
        </Grid>
    )
}