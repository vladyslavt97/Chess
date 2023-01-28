import React, { useEffect, useState } from 'react'
import './AllUsers.css'
export default function AllUsers() {
  const [allusers, setAllUsers] = useState([]);
  console.log('all: ', allusers);
  
  useEffect(()=>{
        fetch('/api/allusers')
        .then((response) => response.json()
        )
        .then((data) => {
            setAllUsers(data.allUsers);
        })
        .catch((error) => {
            console.error('Error caught:', error);
        });
    }, [])
    
  return (
    <div id='friends-div'>
        <div>All Users</div>
        <input type="text" id='search-for-friends'/>

        <div id='all-users-list'>
          {allusers.map(user=>(
              <div key={user.id} >
                <h4>{user.first} {user.last}</h4>
              </div>
            )
            )}
        </div>
    </div>
  )
}
