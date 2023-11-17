import React from 'react';
import {useState} from 'react';
//import Axios from 'axios';


export const AddPosts = ({set}) => {

    const [getTopic, setTopic]  = useState('');
    const [getData, setData]  = useState('');

return (

<>
<h3> AddPosts </h3>


    <div>
    <input
        type="text"
        placeholder="Topic"
        value={getTopic}
        onChange={e => setTopic(e.target.value)} />
    </div>
    <div>
        <input
            type="text"
            placeholder="your content"
            value={getData}
            onChange={e => setData(e.target.value)} />
    </div>

    <button onClick={(e) => {
    
    
    fetch('http://localhost:3001/addPost', {method: 'POST', body: `topic=${getTopic}&data=${getData}`, headers: {'Content-type': 'application/x-www-form-urlencoded'}})
    .then(fetch('http://localhost:3001/getPosts')
        .then(response => response.json())
        .then(response => set(response))
        .then(alert(`Topic: ${getTopic}, Post Content: ${getData} `))
        );
    
} 
    }> Submit</button>

    
</>
);


}