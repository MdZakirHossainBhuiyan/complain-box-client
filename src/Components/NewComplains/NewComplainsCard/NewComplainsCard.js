import { Avatar, Button, Card, CardContent, CardHeader, CardMedia, IconButton, Stack, Typography,  } from '@mui/material';
import React from 'react';
import '../NewComplains.css';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import LocationOnIcon from '@mui/icons-material/LocationOn';

const NewComplainsCard = ({newComplain}) => {
    return (
        <Card sx={{ maxWidth: 345 }}>
            <CardHeader
                avatar={
                    <Avatar aria-label="recipe">
                    </Avatar>
                }
                action={
                    <IconButton aria-label="settings">
                      <MoreVertIcon />
                    </IconButton>
                }
                title={newComplain.userName}
                subheader={newComplain.userEmail}
            />
            <CardMedia
                component="img"
                height="194"
                image={`data:image/png;base64,${newComplain.image.img}`}
                alt="Paella dish"
            />
            <CardContent>
                <Typography variant="h6" color="text.secondary">
                    {newComplain.complainTitle} {(newComplain?.status) && <small className='complainStatus'>{newComplain?.status}</small>}
                </Typography>
            </CardContent>
            <CardContent>
                <Typography variant="body2" color="text.secondary">
                    {newComplain.description}
                </Typography>
            </CardContent>
            <CardContent style={{"display": "flex", "flexDirection": "row", "alignItems": "center", "justifyContent": "center"}}>
                <Avatar aria-label="recipe">
                    <LocationOnIcon />
                </Avatar>
                <Typography style={{"marginLeft": "10px"}} variant="body2" color="text.secondary">
                    {newComplain.village}, {newComplain.union}, {newComplain.thana}, {newComplain.district}, {newComplain.division}
                </Typography>
            </CardContent>

            <Stack style={{"margin": "20px 50px"}}>
                <Button className="newComplainCardButton" variant="contained">Accept</Button>
                <Button variant="outlined">Cancel</Button>
                <Button>Move to</Button>
            </Stack>
        </Card>
    );
};

export default NewComplainsCard;