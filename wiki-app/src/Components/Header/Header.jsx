import React,{ useState, useEffect } from 'react'
import { NavLink, Link } from 'react-router-dom'

function Header() {

    const [ randomEntry, setRandomEntry ] = useState('');

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
        <div className='Header'> 
            <ul>
                <li> <NavLink to='/'>StartSeite</NavLink></li>
                <li> <Link to={`/entry/${ randomEntry }`}>Zufälliger Eintrag </Link></li>
                <li> <NavLink to='/entry/create'>Eintrag Erstellen</NavLink></li>
            </ul>
        </div>
    )
}

export default Header
