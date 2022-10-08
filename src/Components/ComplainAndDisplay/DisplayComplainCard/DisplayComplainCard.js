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
        fetch(`https://whispering-mountain-24832.herokuapp.com/complainDelete/${id}`, {
            method: 'DELETE'
        })
        .then(res => res.json())
        .then(data => {
            alert('Deleted successfully');
        })
    }

    return (
        <Card
            sx={{
                maxWidth: 345,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between"
            }}
        >
            <div>
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
            <CardContent>
                <Typography variant="body2" color="text.secondary">
                    {complain.createdTime} | {complain.month} {complain.day}, {complain.year}
                </Typography>
            </CardContent>
            <CardMedia
                component="img"
                height="194"
                image={`data:image/png;base64,${complain?.image?.img}`}
                alt="Paella dish"
            />
            <CardContent>
                {
                    loggedInUser.userStatus==="admin" &&
                    <Typography>
                        <small>This complain for <i>{complain?.seeComplain}</i></small>
                    </Typography>
                }
                <Typography style={{ height: "65px"}} variant="h6" color="text.secondary">
                    {complain.complainTitle} {(complain?.status) && <small className='complainStatus'>{complain?.status}</small>}
                </Typography>
            </CardContent>
            <CardContent>
                <Typography variant="body2" color="text.secondary">
                    {complain.description}
                </Typography>
            </CardContent>
            </div>
            <div>
            <CardContent style={{"display": "flex", "flexDirection": "row", "alignItems": "center", "justifyContent": "center"}}>
                <Avatar aria-label="recipe">
                    <LocationOnIcon />
                </Avatar>
                <Typography style={{"marginLeft": "10px"}} variant="body2" color="text.secondary">
                    {complain.village}, {complain.union}, {complain.thana}, {complain.district}, {complain.division}
                </Typography>
            </CardContent>
            </div>
            
            
        </Card>
    );
};

export default DisplayComplainCard;