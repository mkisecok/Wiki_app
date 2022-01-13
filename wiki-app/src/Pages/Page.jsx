import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import Moment from 'react-moment';
import 'moment/locale/de';

function Page() {

    const [ entry, setEntry ]= useState([]);
    const [ loading, setLoading ] = useState(true);
    const navigate=useNavigate();
    const { id } = useParams();

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

                   <div>
                       <button onClick={()=> handleEditEntry()}>Editieren</button>
                       <button onClick={()=> handleDeleteEntry()}>Löschen</button>
                   </div>
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
