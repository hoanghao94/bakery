import React from 'react'
import { Link } from 'react-router-dom'
import '../style/Home.css'

function Home() {
    return (
        <div className='home' 
        >
            <div className='headerContainer'
            >
                <p>BÁNH ĂN DẶM TRẺ EM</p>
                <Link to='/menu'>
                    <button className='btn'> ORDER NOW</button>
                </Link>
            </div>
        </div >
    )
}

export default Home