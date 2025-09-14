import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import ProgressBar from 'react-bootstrap/ProgressBar';   // ✅ Move this import up
import 'bootstrap/dist/css/bootstrap.min.css'; // ✅ Bootstrap CSS

function BasicExample() {
  return <ProgressBar now={60} />;
}

function App() {
  return (
    <>
      {/* ✅ Navbar */}
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="#home">Home</Nav.Link>
              <Nav.Link href="#link">Link</Nav.Link>
              <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">
                  Another action
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">
                  Separated link
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* ✅ Other components */}
      <h1>hello bootstrap</h1>
      <Button variant="danger">ok</Button>
      <button>click me</button>
      <Alert variant="primary">This is a primary alert—check it out!</Alert>

      {/* ✅ ProgressBar example */}
      <BasicExample />
    </>
  );
}

export default App;
