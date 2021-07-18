import React, { useContext } from "react";
import { Button, Container, Nav, Navbar } from "react-bootstrap";
import { Link, RouteComponentProps, withRouter } from "react-router-dom";

import { getRequest } from "../lib/axios";
import { LoginContext } from "./LoginContext";

const NavBar: React.FC<RouteComponentProps> = ({ history }) => {
  const { logged, setLogged, newCustomer, setNewCustomer, user, setUser } =
    useContext(LoginContext);

  const logOut = async () => {
    try {
      const res = await getRequest("users/logout");
      if ((res.status = 200)) {
        setLogged(false);
        setUser(null);
        history.push("/welcome/login");
      }
    } catch (error) {}
  };

  return (
    <Navbar bg='light' expand='lg'>
      <Container>
        <Navbar.Brand href='/welcome'>Strivago</Navbar.Brand>
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse id='basic-navbar-nav'>
          <Nav className='ml-auto d-flex align-items-center'>
            {user?.role === "host" && (
              <Nav.Link as={Link} to='/accommodations/me'>
                My acs
              </Nav.Link>
            )}
            {!logged ? (
              <>
                <a href='/welcome/login'>
                  <Button variant='link'>{"Log in"}</Button>
                </a>
              </>
            ) : (
              <>
                <div className='mr-2'>{`Hello, ${user?.name}`}</div>
                <Button variant='info' onClick={() => logOut()}>
                  {"Log out"}
                </Button>
              </>
            )}
            {!newCustomer && !logged && (
              <Button
                className='float-right'
                onClick={() => setNewCustomer(true)}>
                Sign up
              </Button>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default withRouter(NavBar);
