import React, { useContext, useState } from 'react';
import logo from './logo.svg';
import { Navbar, Container, Nav, NavDropdown, Button } from 'react-bootstrap';
import ShoesItem from './data.js';
import './App.css';
import Detail from './Detail.js';
import Cart from './Cart.js';
import axios from 'axios';

import { Link, Route, Switch, useHistory } from 'react-router-dom';

let stockContext = React.createContext();

function App() {
  let [shoes, shoesChange] = useState(ShoesItem);
  let [stock, stockChange] = useState([10, 11, 12]);

  return (
    <div className='App'>
      <Navbar bg='light' expand='lg'>
        <Container>
          <Navbar.Brand href='#home'>React-Bootstrap</Navbar.Brand>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='me-auto'>
              <Nav.Link as={Link} to='/'>
                Home
              </Nav.Link>
              <Nav.Link as={Link} to='/detail'>
                Detail
              </Nav.Link>
              <NavDropdown title='Dropdown' id='basic-nav-dropdown'>
                <NavDropdown.Item href='#action/3.1'>Action</NavDropdown.Item>
                <NavDropdown.Item href='#action/3.2'>
                  Another action
                </NavDropdown.Item>
                <NavDropdown.Item href='#action/3.3'>
                  Something
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href='#action/3.4'>
                  Separated link
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Switch>
        <Route exact path='/'>
          <div className='background'>
            <h1>20% Season Off</h1>
            <p>This is a simple hero unit</p>
            <p>
              <Button variant='primary'>Primary</Button>{' '}
            </p>
          </div>

          <div className='container'>
            <stockContext.Provider value={stock}>
              <div className='row'>
                {shoes.map((a, i) => {
                  return <Product key={i} shoes={a} />;
                })}
              </div>
            </stockContext.Provider>
          </div>
        </Route>

        <Route path='/detail/:id'>
          <Detail shoes={shoes} />
        </Route>

        <Route path='/cart'>
          <Cart></Cart>
        </Route>

        <Route path='/:id'>
          <div>Anyting you want</div>
        </Route>
      </Switch>

      <Button
        variant='primary'
        onClick={() => {
          axios
            .get('https://codingapple1.github.io/shop/data2.json')
            .then((result) => {
              shoesChange([...shoes, ...result.data]);
            })
            .catch(() => {
              console.log('Fail');
            });
        }}
      >
        More
      </Button>
    </div>
  );
}

function Product(props) {
  let stock = useContext(stockContext);
  let history = useHistory();

  return (
    <div className='col-md-4' onClick={()=>{
      history.push('/detail/' + props.shoes.id)
    }}>
      <img src={props.shoes.url} width='100%' alt='shoes 1'></img>
      <h4>{props.shoes.title}</h4>
      <p>{props.shoes.content}</p>
      <p>{props.shoes.price}</p>
      {stock}
    </div>
  );
}

export default App;
