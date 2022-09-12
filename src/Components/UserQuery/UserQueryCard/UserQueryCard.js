import React from 'react';
import '../UserQuery.css';
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import MarkEmailReadIcon from '@mui/icons-material/MarkEmailRead';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';

const UserQueryCard = ({query}) => {

    const handleReadingStatus = (id) => {
        fetch(`https://whispering-mountain-24832.herokuapp.com/readingStatusUpdate/${id}`, {
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

    const handleDeleteQuery = (id) => {
        fetch(`https://whispering-mountain-24832.herokuapp.com/contactDelete/${id}`, {
            method: 'DELETE'
        })
        .then(res => res.json())
        .then(data => {
            alert('Deleted successfully');
        })
    }

    return (
        <div className='userQueryCard-body'>
            <div className='userQuery-contactDiv'>
                <div className='userIcon'>
                    <AccountCircleOutlinedIcon style={{"fontSize": "30px", "color": "orange"}}/>
                </div>
                <div className='userIcon'>
                    <h4>{query.userName}</h4>
                </div>
                <div className='userIcon'>
                    <CircleOutlinedIcon  style={{"fontSize": "10px", "color": "blue"}}/>
                </div>
                <div className='userIcon'>
                    <p>{query.userEmail}</p>
                </div>
            </div>
            <div className='userQuery-subjectDiv'>
                <p>Subject: <span>{query.subject}</span></p>
            </div>
            <div className='userQuery-bodyDiv'>
                <p>{query.mailBody}</p>
            </div>
            <div className='userQuery-ButtonDiv'>
                {
                    (query.readingStatus==='Unread') &&
                    <button onClick={() => handleReadingStatus(query._id)}>Mark As Read <MarkEmailReadIcon style={{"fontSize": "15px", "marginLeft": "10px"}} /></button>
                }
                {
                    (query.readingStatus==='Read') &&
                    <button onClick={() => handleDeleteQuery(query._id)}>Delete Query <DeleteOutlinedIcon style={{"fontSize": "15px", "marginLeft": "10px"}} /></button>
                }
            </div>
        </div>
    );
};

export default UserQueryCard;