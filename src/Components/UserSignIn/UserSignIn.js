import React, { useContext, useEffect, useState } from 'react';
import { Avatar, Box, Button, Container, createTheme, CssBaseline, Grid, TextField, ThemeProvider, Typography } from '@mui/material';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { UserContext } from '../../App';
import './UserSignIn.css';
import loginPageCover from '../../image/display/displayCoverThree.png';
import loginAvatar from '../../image/complaint-box-500x500.png';

const UserSignIn = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const theme = createTheme();
    const [userInfo, setUserInfo] = useState(null);
    const [userLoadData, setUserLoadData] = useState(null);
    let navigate = useNavigate();

    useEffect(() => {
        fetch('https://whispering-mountain-24832.herokuapp.com/userData')
        .then(res => res.json())
        .then(data => setUserLoadData(
            data.find(userData => (userData.userEmail===userInfo?.email && userData.userPassword===userInfo?.password))
        ))
    }, [userInfo?.email, userInfo?.password])

    const handleChange = e => {
        const oldInfo = {...userInfo};
        oldInfo[e.target.name] = e.target.value;
        setUserInfo(oldInfo);
    }

    const handleSubmit = event => {
        event.preventDefault();

        setLoggedInUser(userLoadData);
        sessionStorage.setItem("user", JSON.stringify(userLoadData));

        if(userLoadData?.userEmail && userLoadData?.userPassword){
            navigate("/home", { 
                replace: true,
            });
        }
        else{
            alert("email or password is incorrect");
        }
    }

    return (
        <section className='userSignInPage'>
            <div className='userSignInPageBody'>
                <div className='loginPageImage'>
                    <img src={loginPageCover} alt="login cover" />
                    <div className='signInOverly'></div>
                </div>

                <div className='loginPageForm'>
                    <ThemeProvider theme={theme}>
                        <Container component="main" maxWidth="xs">
                            <CssBaseline />
                            <Box
                                sx={{
                                    paddingTop: 2,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                }}
                            >
                                <Avatar src={loginAvatar} sx={{ m: 1, width: "100px", height: "100px" }}></Avatar>
                                <Typography component="h1" variant="h5">
                                    Sign In
                                </Typography>
                                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                                    <TextField
                                        margin="normal"
                                        required
                                        fullWidth
                                        id="email"
                                        label="Email Address"
                                        name="email"
                                        autoComplete="email"
                                        onChange={handleChange}
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
                                        onChange={handleChange}
                                    />
                                    <Button
                                        type="submit"
                                        fullWidth
                                        variant="contained"
                                        sx={{ mt: 3, mb: 2, backgroundColor: "red", backgroundImage: `radial-gradient(circle at bottom left,
                                            red,
                                            green 100%)` }}
                                    >
                                        Sign In
                                    </Button>
                                    <Grid container>
                                        <Grid item>
                                            <Link to="/signUpPage" variant="body2">
                                            {"Don't have an account? Sign Up"}
                                            </Link>
                                        </Grid>
                                    </Grid>
                                </Box>
                            </Box>
                            {/* <Box style={{"color": "gray"}}>
                                <h3 style={{"textAlign": "center", "marginTop": "30px", "fontSize": "15px"}}>For Test Visit</h3>
                                <div style={{"display": "flex", "flexDirection": "row"}}>
                                    <div>
                                        <h4 style={{"fontSize": "14px", "marginTop": "20px"}}>User:</h4>
                                        <p style={{"fontSize": "12px", "paddingLeft": "25px"}}>Email: kamal@gmail.com</p>
                                        <p style={{"fontSize": "12px", "paddingLeft": "25px"}}>Pass: 123</p>
                                    </div>
                                    <div>
                                        <h4 style={{"fontSize": "14px", "marginTop": "20px"}}>Staff:</h4>
                                        <p style={{"fontSize": "12px", "paddingLeft": "25px"}}>Email: sabbir@gmail.com</p>
                                        <p style={{"fontSize": "12px", "paddingLeft": "25px"}}>Pass: 123</p>
                                    </div>
                                    <div>
                                        <h4 style={{"fontSize": "14px", "marginTop": "20px"}}>Admin:</h4>
                                        <p style={{"fontSize": "12px", "paddingLeft": "25px"}}>Email: sajjad@gmail.com</p>
                                        <p style={{"fontSize": "12px", "paddingLeft": "25px"}}>Pass: 456</p>
                                    </div>
                                </div>
                            </Box> */}
                        </Container>
                    </ThemeProvider>
                </div>
            </div>
        </section>
    );
};

export default UserSignIn;