import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import Moment from 'react-moment';
import 'moment/locale/de';
import { useContext } from 'react';
import LoginContext from '../LoginContext';
import { Button, Container, Divider, Icon } from 'semantic-ui-react';

function Page() {

    const [ entry, setEntry ]= useState([]);
    const [ loading, setLoading ] = useState(true);
    const navigate=useNavigate();
    const { id } = useParams();
    const {isLogin}=useContext(LoginContext)
    
    useEffect(()=>{

        const currentEntry=JSON.parse(window.localStorage.getItem('entries')).find(entry=>entry.id === id)
        setEntry(currentEntry)
        setLoading(false)
    },[]);

    const handleEditEntry = () => {
        navigate(`/entry/${ id }/edit`)
    }

    const handleDeleteEntry = () => {

        const allEntries= JSON.parse(window.localStorage.getItem('entries'));

        const leftoverEntries = allEntries.filter(oldEntries=> oldEntries.id !== entry.id);

        window.localStorage.setItem('entries', JSON.stringify(leftoverEntries));
         navigate('/')


    }

    return (
        <Container textAlign='left' style={{margin:'20px'}}>
        <div className='Page'>
           {
               loading ?
               <p > Loading...</p>
               :
               <div>
                   <h1>{entry.title.toUpperCase()}</h1>
                    {
                        isLogin
                        ?
                        <div>
                       <Button content='Editieren' icon='pencil' labelPosition='left' color='blue'  onClick={()=> handleEditEntry()}/>      
                       <Button icon='trash alternate' content='Löschen' labelPosition='left' color='red' onClick={()=> handleDeleteEntry()}/>
                      
                        </div>
                        :
                        <div style={{backgroundColor:'#ffdddd', borderLeft:'6px solid #f44336', padding:'15px'}}>
                        <h4 style={{color:'red'}}>Bitte sich einloggen, um der Text zu arbeiten</h4>
                        </div>
                    }
                   
                   <Divider/>
                   <ReactMarkdown>{ entry.content }</ReactMarkdown>
                   <Divider/>
                   Letzte änderung:&nbsp;
                   <Icon name='clock'></Icon>
                   <strong>
                       <Moment fromNow locale='de'>
                           {
                              new Date(entry.timestamp)
                            .toLocaleString()
                           }
                       </Moment>
                   </strong>
               </div>
           }
        </div>
        </Container>
    )
}

export default Page
