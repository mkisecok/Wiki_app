import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';

import slugify from 'slugify';
import ReactMarkdown from 'react-markdown';
import { useContext } from 'react';
import LoginContext from '../LoginContext';
import { Button, Container, Divider, Form, Grid, GridColumn, GridRow, Header, Input, TextArea } from 'semantic-ui-react';



function Editor() {

    //Erstllen zwei hooks für eintrags und titel 

    const [ title, setTitle ]=useState('');
    const [ content, setContent ] = useState('');
    
    const navigate = useNavigate();
    const { id } = useParams();
    const {isLogin} =useContext(LoginContext);
    
    
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
    <Container textAlign='left' style={{margin:'20px'}}>

    <div className='Editor'>
        <Grid>
         <GridColumn width={16}>

            <GridRow><h1>Eintrag Erstellen </h1></GridRow>
         </GridColumn>   
            
        {
            isLogin
            ?
            <>
            <GridColumn width={8}>
                <GridRow>
                <Input
                action={{
                    color:'teal',
                    labelPosition:'left',
                    icon:'tag',
                    content:'Titel',
                }}
                actionPosition='left'
                placeholder='Eintrag Titel'
                onChange={(e)=> setTitle(e.target.value)}
                value={ title }
                />

                
                
                <h3>Inhalt</h3>
                <Form>
                    <TextArea
                    placeholder='Ihrer Eintrag...'
                    value={content}
                    rows={15}
                    onChange={(e)=> setContent(e.target.value)}
                    />
                    
                </Form>
                <Button
                content='Speichern'
                icon='save'
                labelPosition='left'
                color='blue' 
                onClick={handleSave}
                disabled={ title.length === 0}
                style={{marginTop:'15px'}}/>
                
                </GridRow>
            </GridColumn>
            <GridColumn width={8}>
                
                <GridRow >
                    {
                    (title || content) &&
                    <>
                    <h2> Output</h2>
                    <div style={{borderLeft:'6px solid #04AA6D',backgroundColor:'#ddffdd' , padding:'15px', width:'80%'}} >
                    <Header as='h2'> { title.toUpperCase() } </Header>
                    <Divider/>
                    <ReactMarkdown  >{ content }</ReactMarkdown>
                    </div>
                    </>
                    }
                
                </GridRow >
            </GridColumn>
            </>
            :
            <GridColumn width={16}>
                <GridRow>
                <h4 style={{color:'red'}}>Bitte sich einloggen, um der Text zu arbeiten</h4>
                </GridRow>
            </GridColumn>

        }
        </Grid>
    </div>
    </Container>
    
    )
}

export default Editor

