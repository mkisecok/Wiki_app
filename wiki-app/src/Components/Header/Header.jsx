import React,{ useState, useEffect } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { Menu } from 'semantic-ui-react'
function Header() {

    const [ randomEntry, setRandomEntry ] = useState('');
    const [isLogin, setIsLogin]=useState(false);
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
                <Menu.Item as={Link} to='#' onClick={()=> setIsLogin(!isLogin)} name='logout'/>
                </Menu.Menu>
              </>
              :
                <Menu.Menu position='right'>
                <Menu.Item as={Link} to='#' onClick={()=>setIsLogin(!isLogin)} name='login'/>
                </Menu.Menu>

          }
          
          
              
                  
                  
                  :
                  
              
          
          
          
        </Menu>

        
      </div>
        // <div className='Header'> 
        //     <ul>
        //         <li> <NavLink to='/'>StartSeite</NavLink></li>
        //         <li> <Link to={`/entry/${ randomEntry }`}>Zufälliger Eintrag </Link></li>
        //         <li> <NavLink to='/entry/create'>Eintrag Erstellen</NavLink></li>
        //     </ul>
        // </div>
    )
}

export default Header
