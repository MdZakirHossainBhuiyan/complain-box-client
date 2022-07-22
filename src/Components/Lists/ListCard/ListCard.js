import { Avatar, Box, Button, ButtonGroup, Card, CardActions, CardContent, Typography } from '@mui/material';
import React, { useContext } from 'react';
import '../List.css';
import BadgeOutlinedIcon from '@mui/icons-material/BadgeOutlined';
import DeleteIcon from '@mui/icons-material/Delete';
import UpdateIcon from '@mui/icons-material/Update';
import SendIcon from '@mui/icons-material/Send';
import Stack from '@mui/material/Stack';
import { UserContext } from '../../../App';

const ListCard = ({data}) => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);

    const handleDelete = (id) => {
        fetch(`http://localhost:5000/delete/${id}`, {
            method: 'DELETE'
        })
        .then(res => res.json())
        .then(data => {
            alert('Deleted successfully');
        })
    }

    return (
        <Card>
            <Box sx={{ display: 'flex', flexDirection: 'column'}}>
                <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                    <Avatar sx={{margin: '10px'}}>
                        <BadgeOutlinedIcon />
                    </Avatar>
                    <Typography component="div" variant="h5" sx={{color: 'orange'}}>
                        {data.userName}
                    </Typography>
                    <Typography sx={{color: 'gray'}}>
                        {data.userStatus}
                    </Typography>
                    {
                        (data.userStatus!=="admin") &&
                        <Typography sx={{color: 'gray', fontStyle: 'italic', fontSize: '12px'}}>
                            {data.district}, {data.division}
                        </Typography>
                    }
                </CardContent>
            </Box>
            <Box  sx={{ display: 'flex', flexDirection: 'column'}}>
                <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                    <Typography sx={{ width: '100%', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                       Phone: {data.userPhone}
                    </Typography>
                    <Typography sx={{ width: '100%', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}} >
                        Address: {data.userAddress}
                    </Typography>
                    {
                        (data.userStatus!=="admin") &&
                        <Typography sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}> <br /><br />
                            Dedicated Area:
                            <Typography sx={{color: 'gray', fontStyle: 'italic', fontSize: '12px'}}>
                                Word No. {data.word}, Union: {data.union}, Thana: {data.thana}
                            </Typography>
                        </Typography>
                    }
                </CardContent>
            </Box>
            <Stack sx={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', margin: '15px'}} direction="row" spacing={2}>
                {
                    loggedInUser?.userStatus==="admin" && 
                    <Button onClick={() => handleDelete(data._id)} sx={{border: '1px solid #d3cfcf'}} variant="outlined">
                        <DeleteIcon sx={{color: 'gray'}} />
                    </Button>
                }
                {
                    loggedInUser?.userStatus==="admin" &&
                    <Button sx={{border: '1px solid #d3cfcf'}} variant="outlined">
                        <UpdateIcon sx={{color: 'gray'}} />
                    </Button>
                }
                <Button sx={{border: '1px solid #d3cfcf'}} variant="outlined">
                    <SendIcon sx={{color: 'gray'}} />
                </Button>
            </Stack>
        </Card>
    );
};

export default ListCard;