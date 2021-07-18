import React, { useContext } from "react";
import { Button, Container, Nav, Navbar } from "react-bootstrap";
import { Link, RouteComponentProps, withRouter } from "react-router-dom";

import { getRequest } from "../lib/axios";
import { initialUser } from "../types";
import { LoginContext } from "./LoginContext";

const NavBar: React.FC<RouteComponentProps> = ({ history }) => {
  const { logged, setLogged, newCustomer, setNewCustomer, user, setUser } =
    useContext(LoginContext);

  const logOut = async () => {
    try {
      const res = await getRequest("users/logout");
      if ((res.status = 200)) {
        setLogged(false);
        setUser(initialUser);
        history.push("/welcome/login");
      }
    } catch (error) {}
  };

  return (
    <Navbar bg='light' expand='lg' className='fixed-top'>
      <Container>
        <Navbar.Brand href='/accommodations'>Strivago</Navbar.Brand>
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse id='basic-navbar-nav'>
          <Nav className='mr-auto'>
            <Nav.Link as={Link} to='/accommodations'>
              Accommodations
            </Nav.Link>
          </Nav>
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
