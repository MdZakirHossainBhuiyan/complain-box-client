import React, { useState } from 'react';
import { Avatar, Box, Button, Container, createTheme, CssBaseline, Grid, TextField, ThemeProvider, Typography } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';

const SignUp = () => {
    const theme = createTheme();
    const [userInfo, setUserInfo] = useState(null);
    let navigate = useNavigate();

    const handleBlur = (e) => {
        const addInfo = {...userInfo};
        addInfo[e.target.name] = e.target.value;
        setUserInfo(addInfo);
    }

    const handleSubmit = event => {
        event.preventDefault();
        alert("Your signUp successfully done.");
        const formData = new FormData();
        formData.append('userName', userInfo.name);
        formData.append('userEmail', userInfo.email);
        formData.append('userPassword', userInfo.password);

        fetch('https://whispering-mountain-24832.herokuapp.com/addUser', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            navigate("/userSignIn", { replace: true });
        })
        .catch((err) => {
            console.error(err);
        })
    }
    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}></Avatar>
                    <Typography component="h1" variant="h5">
                        Sign Up
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="name"
                            label="Full Name"
                            name="name"
                            autoComplete="name"
                            autoFocus
                            onBlur={handleBlur}
                            onChange
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            onBlur={handleBlur}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            onBlur={handleBlur}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign Up
                        </Button>
                        <Grid container>
                            <Grid item sx={{alignItems: 'center'}}>
                                <Link to="/userSignIn" variant="body2">
                                    {"Have an account? Sign In"}
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
};

export default SignUp;