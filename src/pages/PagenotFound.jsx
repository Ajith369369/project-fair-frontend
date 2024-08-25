import React from 'react'
import { Link } from 'react-router-dom'

function PagenotFound() {
  return (
    <>
      <div style={{width:'100%', height:'100vh', display:'flex', justifyContent:'center', alignItems:'center' }}>
        <div className="row">
          <div className="col-md-1"></div>
          <div className="col-md-10 d-flex flex-column justify-content-center align-items-center">
            <img src="/images/electrocuted-caveman-animation-404-error-page.gif" alt="no image" style={{width:'100%', height:'350px'}} />
            <h1 className='mt-3'>Looks like you're lost.</h1>
            <h5 className='mt-2'>The page you are looking for is unavailable.</h5>
            <Link to={'/'}><button className='btn btn-success rounded-0 mt-3'>Back Home</button></Link>
          </div>
          <div className="col-md-1"></div>
        </div>
      </div>
    </>
  )
}

export default PagenotFound