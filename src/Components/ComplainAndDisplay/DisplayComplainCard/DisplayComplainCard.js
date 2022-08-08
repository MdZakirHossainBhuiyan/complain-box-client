import { Avatar, Card, CardContent, CardHeader, CardMedia, IconButton, Typography,  } from '@mui/material';
import React, { useContext } from 'react';
import './DisplayComplainCard.css';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import DeleteIcon from '@mui/icons-material/Delete';
import { UserContext } from '../../../App';

const DisplayComplainCard = ({complain}) => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);

    const handleComplainCardDelete = (id) => {
        console.log('complain id for delete', id);
    }

    return (
        <Card sx={{ maxWidth: 345 }}>
            <CardHeader
                avatar={
                    <Avatar aria-label="recipe">
                    </Avatar>
                }
                action={
                    <IconButton aria-label="settings">
                        {(complain?.userName===loggedInUser.userName && complain?.userName===loggedInUser.userName)?<DeleteIcon onClick={() => handleComplainCardDelete(complain._id)} />:<MoreVertIcon />}
                    </IconButton>
                }
                title={(complain.identity==="yes")?complain.userName:"Unknown Name"}
                subheader={(complain.identity==="yes")?complain.userEmail:"Unknown Email"}
            />
            <CardMedia
                component="img"
                height="194"
                image={`data:image/png;base64,${complain.image.img}`}
                alt="Paella dish"
            />
            <CardContent>
                <Typography variant="h6" color="text.secondary">
                    {complain.complainTitle} {(complain?.status) && <small className='complainStatus'>{complain?.status}</small>}
                </Typography>
            </CardContent>
            <CardContent>
                <Typography variant="body2" color="text.secondary">
                    {complain.description}
                </Typography>
            </CardContent>
            <CardContent style={{"display": "flex", "flexDirection": "row", "alignItems": "center", "justifyContent": "center"}}>
                <Avatar aria-label="recipe">
                    <LocationOnIcon />
                </Avatar>
                <Typography style={{"marginLeft": "10px"}} variant="body2" color="text.secondary">
                    {complain.village}, {complain.union}, {complain.thana}, {complain.district}, {complain.division}
                </Typography>
            </CardContent>
        </Card>
    );
};

export default DisplayComplainCard;