import { Grid } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Container, Divider, Popup } from 'semantic-ui-react'
import Grouped from '../Components/Grouped/Grouped';

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
    const local=JSON.parse(window.localStorage.getItem('entries'))
    return (
        <Container textAlign='left' style={{margin:'20px'}}>
        <div className='Welcome'>
            <h2 > Willkommen auf unserer Wiki </h2>
            
            {
                loading
                ?
                <p>Loading...</p>
                :
                <>
                {/* Material UI Grid */}
                <Grid container spacing={2}> 
                    <Grid item xs={8}>
                        <h3>Einträge</h3>
                    </Grid>
                    <Grid item xs={4}>
                        {
                            local && <Grouped local={local} />
                        }
                       
                    </Grid>
                </Grid>
                
                
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
                                                    <Popup
                                                    content={`${entry.content.slice(0,50)}...`}
                                                    trigger={<Link to={`/entry/${entry.id}`}> {entry.title}</Link>}
                                                    position='right center'
                                                    offset={[0, 50]}
                                                    inverted
                                                    />
                                                </li>
                                            )
                                        })
                                    }
                                </ul>
                                <Divider/>
                            </div>

                        )
                    })

                }
                </>
            }
            
        </div>
        </Container>
    )
}

export default Welcome
