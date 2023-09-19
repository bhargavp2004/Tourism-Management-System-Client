import React from 'react'

function Home() {
  return (
    <div>
      {
        localStorage.getItem('token') &&
      
        <p>This is user home page</p>
      }
    </div>
  )
}

export default Home
