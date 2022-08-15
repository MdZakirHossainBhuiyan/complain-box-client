import React from 'react';
import '../UserQuery.css';

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
            <div className='userQuery-subjectDiv'>
                <p>{query.subject}</p>
            </div>
            <div className='userQuery-contactDiv'>
                <h4>Name: {query.userName}</h4>
                <p>Email: {query.userEmail}</p>
            </div>
            <div className='userQuery-bodyDiv'>
                <p>{query.mailBody}</p>
            </div>
            <div className='userQuery-ButtonDiv'>
                {
                    (query.readingStatus==='Unread') &&
                    <button onClick={() => handleReadingStatus(query._id)}>Mark As Read</button>
                }
                {
                    (query.readingStatus==='Read') &&
                    <button onClick={() => handleDeleteQuery(query._id)}>Delete Query</button>
                }
            </div>
        </div>
    );
};

export default UserQueryCard;