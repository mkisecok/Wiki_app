import React from 'react'
import { useNavigate } from 'react-router-dom'
function NotFound() {

    const navigate=useNavigate();


    return (
        <div className='NotFound'>
            <h1>404</h1>

            <p>
                Seite nicht gefunden
            </p>

            <button onClick={()=> navigate(-1) }>Zurück zur vorherigen Seite</button>
        </div>
    )
}

export default NotFound
