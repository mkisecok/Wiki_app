import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import Moment from 'react-moment';
import 'moment/locale/de';
import { useContext } from 'react';
import LoginContext from '../LoginContext';

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
        <div className='Page'>
           {
               loading ?
               <p > Loading...</p>
               :
               <div>
                   <h1>{entry.title}</h1>
                    {
                        isLogin
                        ?
                        <div>
                       <button onClick={()=> handleEditEntry()}>Editieren</button>
                       <button onClick={()=> handleDeleteEntry()}>Löschen</button>
                        </div>
                        :
                        <h4 style={{color:'red'}}>Bitte sich einloggen, um der Text zu arbeiten</h4>
                    }
                   
                   <hr />
                   <ReactMarkdown>{ entry.content }</ReactMarkdown>
                   <hr />
                   Letzte änderung:&nbsp;
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
    )
}

export default Page
