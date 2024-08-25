import { faStackOverflow } from '@fortawesome/free-brands-svg-icons'
import { faPowerOff } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Container, Navbar } from 'react-bootstrap'
import { Link } from 'react-router-dom'


function Header() {
  return (
    <>
    <Navbar className="bg-success">
        <Container>
          <Navbar.Brand className='text-light'>
            <Link to={'/'} className='text-light' style={{textDecoration:'none'}}>
              <h4>
                <FontAwesomeIcon icon={faStackOverflow} className='fa-2x'/>
                Project Fair
              </h4>
            </Link>
          </Navbar.Brand>
          <button className='btn btn-warning rounded-0'><FontAwesomeIcon icon={faPowerOff} className='me-2'/>Logout</button>
        </Container>
      </Navbar>
    </>
  )
}

export default Header