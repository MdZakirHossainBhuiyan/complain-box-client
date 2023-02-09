import { Avatar, Card, CardContent, CardHeader, CardMedia, IconButton, TextField, Typography,  } from '@mui/material';
import React, { useContext, useState } from 'react';
import '../NewComplains.css';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import ForwardIcon from '@mui/icons-material/Forward';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { UserContext } from '../../../App';

const NewComplainsCard = ({newComplain}) => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const [displayInput, setDisplayInput] = useState(false);
    const [displayCommentBox, setDisplayCommentBox] = useState(false);
    const [inputValue, setInputValue] = useState({
        complainId: newComplain?.id,
        seeComplain: newComplain?.seeComplain,
        adminComments: "Have no comments"
    });

    const handleAccept = (id) => {
        (displayCommentBox)?setDisplayCommentBox(false):setDisplayCommentBox(true);
        const newValue = {...inputValue};
        newValue['complainId'] = id;
        setInputValue(newValue);
    }

    const submitAccept = (id) => {
        fetch(`http://localhost:5000/statusUpdate/${id}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            }
        })
        .then(res => res.json())
        .then(data => {
            alert('Updated successfully');
        })
    }

    const handleCancel = (id) => {

        if (window.confirm("Are you sure to Delete this complaint?")) {
            fetch(`http://localhost:5000/complainDelete/${id}`, {
                method: 'DELETE'
            })
            .then(res => res.json())
            .then(data => {
                alert('Deleted successfully');
            })
        } else {
            alert('Thanks for your confirmation');
        }
    }

    const handleForward = (id) => {
        (displayInput)?setDisplayInput(false):setDisplayInput(true);
        const newValue = {...inputValue};
        newValue['complainId'] = id;
        setInputValue(newValue);
    }

    const handleChange = (e) => {
        const newValue = {...inputValue};
        newValue[e.target.name] = e.target.value;
        setInputValue(newValue);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch(`https://complain-box-server.vercel.app/updateComplain/${inputValue?.complainId}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(inputValue)
        })
        .then(res => res.json())
        .then(data => {
            alert('Updated successfully');
        })
        setDisplayCommentBox(false);
    }

    return (
        <Card sx={{ maxWidth: 345, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
            <div>
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
                    <Typography>
                        <small>This complain for <i>{newComplain.seeComplain}</i></small>
                    </Typography>
                    <Typography variant="h6" color="text.secondary">
                        {newComplain.complainTitle} {<small className='complainStatus'> {newComplain?.status}</small>}
                        {
                            loggedInUser?.userStatus==="admin" &&
                            <div className='actionButtonGroup'>
                                <button onClick={() => handleAccept(newComplain?._id)} className='actionButtonStyle acceptButton'><CheckIcon /></button>
                                <button onClick={() => handleCancel(newComplain?._id)} className='actionButtonStyle cancelButton'><ClearIcon /></button>
                                {/* <button onClick={() => handleForward(newComplain?._id)} className='actionButtonStyle forwardButton'><ForwardIcon /></button> */}
                            </div>
                        }
                    </Typography>
                </CardContent>
                {
                    displayCommentBox &&
                    <CardContent>
                        <form className='formBody' onSubmit={handleSubmit}>
                            <div className='complainBox-formInputDiv'>
                                <TextField name='adminComments' onChange={handleChange} id="outlined-name" label="write some comments" fullWidth />
                            </div>
                            <div className='complainBox-formInputDiv'>
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">Forward to</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        name="seeComplain"
                                        label="Status of Staff"
                                        onChange={handleChange}
                                    >
                                        <MenuItem value="Magistrate">Magistrate</MenuItem>
                                        <MenuItem value="Mayor">Mayor</MenuItem>
                                        <MenuItem value="UNO">UNO</MenuItem>
                                        <MenuItem value="Union Chairman">Union Chairman</MenuItem>
                                        <MenuItem value="Word Member">Word Member</MenuItem>
                                    </Select>
                                </FormControl>
                            </div>
                            <div className='addStaff-submit'>
                                <button>Confirm</button>
                            </div>
                        </form>
                    </CardContent>
                }
                {/* <CardContent>
                    {
                        displayInput && 
                        <form onSubmit={handleSubmit}>
                            <div className='complainBox-formInputDiv'>
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">Forward to</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        name="status"
                                        label="Status of Staff"
                                        value={inputValue.seeComplain}
                                        onChange={handleChange}
                                    >
                                        <MenuItem value="Magistrate">Magistrate</MenuItem>
                                        <MenuItem value="Mayor">Mayor</MenuItem>
                                        <MenuItem value="UNO">UNO</MenuItem>
                                        <MenuItem value="Union Chairman">Union Chairman</MenuItem>
                                        <MenuItem value="Word Member">Word Member</MenuItem>
                                    </Select>
                                </FormControl>
                            </div>
                            <div className='addStaff-submit'>
                                <button>Forward</button>
                            </div>
                        </form>
                    }
                </CardContent> */}
                <CardContent>
                    <Typography variant="body2" color="text.secondary">
                        {newComplain.description}
                    </Typography>
                </CardContent>
            </div>
            <div>
                <CardContent style={{"display": "flex", "flexDirection": "row", "alignItems": "center", "justifyContent": "center"}}>
                    <Avatar aria-label="recipe">
                        <LocationOnIcon />
                    </Avatar>
                    <Typography style={{"marginLeft": "10px"}} variant="body2" color="text.secondary">
                        {newComplain.village}, {newComplain.union}, {newComplain.thana}, {newComplain.district}, {newComplain.division}
                    </Typography>
                </CardContent>
            </div>
        </Card>
    );
};

export default NewComplainsCard;