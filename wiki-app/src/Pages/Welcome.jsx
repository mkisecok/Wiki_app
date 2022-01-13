import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';


function Welcome() {

    const[ entries, setEntries ] = useState([]);
    const[ loading, setLoading ] = useState(false);

    useEffect(()=>{
        const allEntries= JSON.parse(window.localStorage.getItem/'entries') || []

        const sortedEntries = allEntries.reduce((r,e)=>{

            let group = e.title[0].toUpperCase();

            if(!r[group])
            {
                r[group] = {group, children:[ e ]}
            }
            else
            {
                r[group].children.push(e)
            }
        })
    },[])

    return (
        <div className='Welcome'>
            welcome
        </div>
    )
}

export default Welcome
