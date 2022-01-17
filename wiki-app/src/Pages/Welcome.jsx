import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';


function Welcome() {

    const[ entries, setEntries ] = useState([]);
    const[ loading, setLoading ] = useState(false);

    useEffect(()=>{
        const allEntries= JSON.parse(window.localStorage.getItem('entries'))||[]

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
            r[group].children.sort((a,b)=>a.title.toUpperCase() > b.title.toUpperCase() && (1 || -1 ))
           
            return r
        }, {})

        const result=Object.values(sortedEntries)
        result.sort((a,b)=> a.group.toUpperCase() > b.group.toUpperCase() && (1 || -1 ))
        setEntries(result);
        setLoading(false)
    },[])

    return (
        <div className='Welcome'>
            <h2> Willkommen auf unserer Wiki </h2>

            {
                loading
                ?
                <p>Loading...</p>
                :
                <>
                <h3>Einträge</h3>
                {
                    entries.length === 0 
                    ?
                    <p>Keine Einträge vorhanden</p>
                    :
                    entries.map((item,i)=>
                    {
                        return(
                            <div key={ i }>
                                <strong>{item.group}</strong>
                                <br />
                                <ul>
                                    {
                                        item.children.map((entry,j)=>
                                        {
                                            return(
                                                <li key={ j }>
                                                    <Link to={`/entry/${entry.id}`}> {entry.title}</Link>
                                                </li>
                                            )
                                        })
                                    }
                                </ul>
                            </div>

                        )
                    })

                }
                </>
            }
        </div>
    )
}

export default Welcome
