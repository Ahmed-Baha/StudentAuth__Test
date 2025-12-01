import Display from './pages/display'
import {Routes, Route , Link,NavLink, useNavigate} from "react-router-dom"
import {Button ,Nav,Container,Navbar,Modal} from 'react-bootstrap'
import Register from './pages/register'
import Login from './pages/login'
import axios from "axios"
import { useState } from 'react'
import PrivateData from './pages/privateData'
import Home from './pages/Home'


function App() {
  const [showLogoutModal, setShowLogoutModal] = useState(false);

const openModal = () => setShowLogoutModal(true);
const closeModal = () => setShowLogoutModal(false);

   const navigate = useNavigate()
const handlelogout = async () => {
  const url = `http://localhost:3000`;
  try {
    const res = await axios.post(`${url}/logout`, {}, { withCredentials: true });
    console.log(res.data);

    closeModal(); 
    navigate('/login');
  } catch (err) {
    console.log(err);
  }
};

  return (
      <>
      <Navbar bg="dark" data-bs-theme="dark" expand="lg" fixed="top">
        <Container>
          <Navbar.Brand as={Link} to="/">
            My App
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="main-nav" />
          <Navbar.Collapse id="main-nav">
            <Nav className="me-auto">
              <NavLink className="nav-link" to="/">
                Home
              </NavLink>
              <NavLink className="nav-link" to="/display">
                display
              </NavLink>

              <NavLink className="nav-link" to="/register">
                Register
              </NavLink>
              <NavLink className="nav-link" to="/login">
                login
              </NavLink>
              <NavLink onClick={openModal} className="nav-link" style={{ cursor: "pointer" }}>
  logout
</NavLink>

            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <div style={{ marginTop: "80px" }}>
        <Routes>
          <Route path="/display" element={<Display />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/privateData" element={<PrivateData />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
      <Modal show={showLogoutModal} onHide={closeModal} centered>
  <Modal.Header closeButton>
    <Modal.Title>Confirm Logout</Modal.Title>
  </Modal.Header>

  <Modal.Body>
    Are you sure you want to logout?
  </Modal.Body>

  <Modal.Footer>
    <Button variant="secondary" onClick={closeModal}>
      Cancel
    </Button>
    <Button variant="danger" onClick={handlelogout}>
      Yes, Logout
    </Button>
  </Modal.Footer>
</Modal>
    </>
       
    
  )
}

export default App
