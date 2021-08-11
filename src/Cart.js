import React from 'react';
import { Table } from 'react-bootstrap';
import { connect, useSelector, useDispatch } from 'react-redux';

function Cart(props) {

    let state = useSelector((state)=>state.reducer);

    let dispatch = useDispatch();


  return (
    <div>
      <Table responsive='sm'>
        <thead>
          <tr>
            <th>#</th>
            <th>상품명</th>
            <th>수량</th>
            <th>변경</th>
          </tr>
        </thead>
        <tbody>
          {state.map((a, i) => {
            return (
              <tr key={i}>
                <td>{a.id}</td>
                <td>{a.name}</td>
                <td>{a.quantity}</td>
                <td>
                  {' '}
                  <button
                    onClick={() => {
                      dispatch({ type: 'quantityIncrease', payload: a.id });
                    }}
                  >
                    +
                  </button>{' '}
                  <button
                    onClick={() => {
                      dispatch({ type: 'quantityDecrease', payload: a.id });
                    }}
                  >
                    -
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      {props.alertState === true ? (
        <div className='my-alert2'>
          <p>지금 구매하시면 신규할인 20%</p>
          <button
            onClick={() => {
              dispatch({ type: 'close' });
            }}
          >
            닫기
          </button>
        </div>
      ) : null}
    </div>
  );
}

// function stateToProps(state) {
//   return {
//     state: state.reducer,
//     alertState: state.alertReducer,
//   };
// }

// export default connect(stateToProps)(Cart);

 export default Cart;
