import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';

import slugify from 'slugify';
import ReactMarkdown from 'react-markdown';



function Editor() {

    //Erstllen zwei hooks für eintrags und titel 

    const [ title, setTitle ]=useState('');
    const [ content, setContent ] = useState('');
    
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
       if(id !== undefined)
       {
            const entries = JSON.parse(window.localStorage.getItem('entries'));

            const currentEntry = entries.filter(entry => entry.id === id)[0];
            setTitle(currentEntry.title)
            setContent(currentEntry.content);
       }
    }, [])

    const handleSave = () => {
        const newPost={
            id:slugify(title, 
                {
                lower:true, //kleingescgrieben
                strict:true, //spezielle symbol löschen
                trim:true // kein leerzeichen entsheht
                }),
            title,
            content,
            timestamp:new Date().getTime()
        }
        const entries = JSON.parse(window.localStorage.getItem('entries')) || [];
        if(id !== undefined)
        {
            const filteredEntries = entries.filter(entry=>entry.id !== id);

            filteredEntries.push(newPost);
            window.localStorage.setItem('entries', JSON.stringify(filteredEntries))
        }
        else
        {
            entries.push(newPost);
            window.localStorage.setItem('entries', JSON.stringify(entries))
        }
        navigate('/entry/' + newPost.id)
        
    }
    return (
        <div className='Editor'>

            <h1>Eintrag Erstellen </h1>

            <div>
                <h3>Titel</h3>
                <input type="text" value={ title }  onChange={(e)=> setTitle(e.target.value)}/>
                <h3>Inhalt</h3>
                <textarea
                value={content}
                onChange={(e)=> setContent(e.target.value)}
                cols='30'
                rows='10'  
                ></textarea>
            </div>
            <div>
                <h3>Titel</h3>
                <p> { title }</p>
               
                <h3>Inhalt</h3>
                <ReactMarkdown>{ content }</ReactMarkdown>
                <button
                onClick={handleSave}
                disabled={ title.length === 0}
                >
                    Speichern
                </button>
            </div>
        </div>
    )
}

export default Editor
