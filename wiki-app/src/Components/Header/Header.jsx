import React,{ useState, useEffect } from 'react'
import { useContext } from 'react';
import { NavLink, Link } from 'react-router-dom'
import { Menu } from 'semantic-ui-react'
import LoginContext from '../../LoginContext';
function Header() {

    const [ randomEntry, setRandomEntry ] = useState('');
    const {isLogin, setIsLogin}=useContext(LoginContext)
    
    useEffect(() => {
            //wir holen uns alle einträge aus der localstorage

            const allEntries = JSON.parse(window.localStorage.getItem('entries'))

            //wir führen das zufällige  selectieren eines eintrags nur aus, wenn der wert entries in der localstorage existiert, und mindestens einen eintrag hat 

            if(allEntries && allEntries.length > 0 )
            {
                const id = allEntries[Math.floor(Math.random() * allEntries.length)].id

                setRandomEntry(id)
            }
        
    }, [])
    return (

        <div>
    
        <Menu pointing secondary>
          <Menu.Item as={NavLink} to='/' name='StartSeite' />
          <Menu.Item as={Link} to={`/entry/${ randomEntry }`}  name='Zufälliger Eintrag' />
          {
              isLogin
              ?
              <>
                <Menu.Item as={NavLink} to='/entry/create' name='Eintrag Erstellen' />
                <Menu.Menu position='right'>
                <Menu.Item as={Link} to='#' onClick={()=> setIsLogin(!isLogin)} name='Auslogen'/>
                </Menu.Menu>
              </>
              :
                <Menu.Menu position='right'>
                <Menu.Item as={Link} to='#' onClick={()=> setIsLogin(!isLogin)} name='Einlogen'/>
                </Menu.Menu>

          }
        </Menu>

        
      </div>
      
    )
}

export default Header
