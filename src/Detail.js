import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import styled from 'styled-components';
import './Detail.scss';
import { Nav } from 'react-bootstrap';
import { CSSTransition } from 'react-transition-group';
import { connect } from 'react-redux';

let Box = styled.div`
  padding: 20px;
`;
let Tle = styled.h4`
  font-size: 25px;
`;

function Detail(props) {
  let [alert, alertChange] = useState(true);

  let [pressTab, pressTabChange] = useState(0);
  let [aniSwitch, aniSwitchChange] = useState(false);

  useEffect(() => {
    let timer = setTimeout(() => {
      alertChange(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, [alert]);

  let { id } = useParams();
  let history = useHistory();
  let realProduct = props.shoes.find((x) => x.id == id);

  return (
    <div className='container'>
      <Box>
        <Tle className='red'>Detail</Tle>
      </Box>

      {alert === true ? <Alert /> : null}

      <div className='row'>
        <div className='col-md-6'>
          <img
            src='https://codingapple1.github.io/shop/shoes1.jpg'
            width='100%'
            alt='shoes'
          />
        </div>
        <div className='col-md-6 mt-4'>
          <h4 className='pt-5'>{realProduct.title}</h4>
          <p>{realProduct.content}</p>
          <p>{realProduct.price}</p>
          <button className='btn btn-danger' onClick={()=>{
              props.dispatch({ type: 'addItem', payload: {id:realProduct.id, name: realProduct.title, quantity: 1 }});
            history.push('/cart');
          }}>주문하기</button>
          <button
            className='btn btn-danger'
            onClick={() => {
              history.goBack();
            }}
          >
            뒤로가기
          </button>
        </div>
      </div>

      <Nav className='mt-5' variant='tabs' defaultActiveKey='link-0'>
        <Nav.Item>
          <Nav.Link
            eventKey='link-0'
            onClick={() => {
              aniSwitchChange(false);
              pressTabChange(0);
            }}
          >
            Active
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            eventKey='link-1'
            onClick={() => {
              aniSwitchChange(false);
              pressTabChange(1);
            }}
          >
            Option 2
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey='disabled' disabled>
            Disabled
          </Nav.Link>
        </Nav.Item>
      </Nav>

      <CSSTransition in={aniSwitch} classNames='wow' timeout={500}>
        <TabContent pressTab={pressTab} aniSwitchChange={aniSwitchChange} />
      </CSSTransition>
    </div>
  );
}

function TabContent(props) {
  useEffect(() => {
    props.aniSwitchChange(true);
  });

  if (props.pressTab === 0) {
    return <div>You pressed 0</div>;
  } else if (props.pressTab === 1) {
    return <div>You pressed 1</div>;
  } else if (props.pressTab === 2) {
    return <div>You pressed 2</div>;
  }
}

function Alert() {
  return (
    <div className='my-alert2'>
      <p>Almost sold out!</p>
    </div>
  );
}

function stateToProps(state) {
  return {
    state: state.reducer,
    alertState: state.alertReducer,
  };
}

export default connect(stateToProps)(Detail);
