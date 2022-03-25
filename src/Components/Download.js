import React from 'react'
import amazon from './amazon.png'
import NavBar from './NavBar'

function Download() {
  return (
      <>
      <NavBar/>
      <main>
      <div className='d-flex justify-content-center flex-column flex-wrap align-items-center py-3'> 
      <h1 className='text-light'>Download App</h1> 
      <a href='/' target="_blank"  className='text-center'>
      <img src={amazon}></img>
    </a> 
    <a href='/' target="_blank"  className='text-light'>Download from G-Drive</a>
        
    </div>
    </main>
    </>
  )
}

export default Download