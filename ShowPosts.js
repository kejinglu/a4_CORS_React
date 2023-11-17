import React, {useState} from 'react';
import './ShowPosts.css';

export const ShowPosts = ({get}) => {
    const [getList, setList] = useState([]);
    if(getList.length <1) {fetch('http://localhost:3001/getPosts', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    }
    ).then(response => response.json()).then(response => setList(response))};
    
return (

        <>
        {get.map(post => (

            <div className="container">
                <h3> {post.topic} </h3>
                <h3> {post.data} </h3>
            </div>

        ))}
        </>
);

}