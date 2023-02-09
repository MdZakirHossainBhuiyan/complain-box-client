import { CircularProgress } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../App';
import './NewComplains.css';
import NewComplainsCard from './NewComplainsCard/NewComplainsCard';

const NewComplains = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const [filteredComplains, setFilteredComplains] = useState(null);
    const [loader, setLoader] = useState(false);

    useEffect(() => {
        const fetchNewComplainsData = async () => {
            setLoader(true);

            const res = await fetch('https://complain-box-server.vercel.app/comlains');
            const data = await res.json();
            
            if(loggedInUser.userStatus==='admin'){
                setFilteredComplains(data.filter(item => item.status==="pending"));
            }
            else if(loggedInUser.userStatus==='Magistrate'){
                setFilteredComplains(data.filter(item => item.seeComplain===loggedInUser.userStatus && item.division===loggedInUser.division && item.district===loggedInUser.district && item.status!=="pending"));
            }
            else if(loggedInUser.userStatus==='Mayor'){
                setFilteredComplains(data.filter(item => item.seeComplain===loggedInUser.userStatus && item.division===loggedInUser.division && item.district===loggedInUser.district && item.status!=="pending"));
            }
            else if(loggedInUser.userStatus==='UNO'){
                setFilteredComplains(data.filter(item => item.seeComplain===loggedInUser.userStatus && item.division===loggedInUser.division && item.district===loggedInUser.district && item.thana===loggedInUser.thana && item.status!=="pending"));
            }
            else if(loggedInUser.userStatus==='Union Chairman'){
                setFilteredComplains(data.filter(item => item.seeComplain===loggedInUser.userStatus && item.division===loggedInUser.division && item.district===loggedInUser.district && item.thana===loggedInUser.thana && item.union===loggedInUser.union && item.status!=="pending"));
            }
            else if(loggedInUser.userStatus==='Word Member'){
                setFilteredComplains(data.filter(item => item.seeComplain===loggedInUser.userStatus && item.division===loggedInUser.division && item.district===loggedInUser.district && item.thana===loggedInUser.thana && item.word===loggedInUser.word && item.status!=="pending"));
            }

            // for(let i=0; i<data?.length; i++){
            //     if(data[i].seeComplain!==loggedInUser.userStatus){
            //         continue;
            //     }
            //     let flag = true;
            //     for(let key in data[i]){
            //         for(let userKey in loggedInUser){
            //             if(loggedInUser[userKey] !==null && locationArray.includes(key) && key===userKey && data[i][key]!==loggedInUser[userKey]){
            //                 flag = false;
            //             }
            //         }
            //     }
            //     if(flag){
            //         staffComplains(data[i]);
            //     }
            // }

            setLoader(false);
        }

        fetchNewComplainsData();
    }, [])

    return (
        <section className='newComplain-section'>
            {/* <div className='newComplain-header'>
                {
                    (loggedInUser?.userStatus==='admin') && <h1>New Complains</h1>
                }
                {
                    (loggedInUser?.userStatus!=='admin' && loggedInUser?.userStatus!=='user') && <h1>Your Complains</h1>
                }
            </div> */}
            {
                (loader)?<CircularProgress />:
                <div className='newComplain-content'>
                    {
                        (filteredComplains?.length!==0 && !loader)?filteredComplains?.map(newComplain => <NewComplainsCard newComplain={newComplain} />):<p style={{"marginTop": "50px"}}>You have no Complain</p>
                    }
                </div>
            }
        </section>
    );
};

export default NewComplains;