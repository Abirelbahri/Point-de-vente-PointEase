import React, { useState } from 'react'
import Market from '../market/Market'
import Cart from '../cart/Cart'

const Content = () => {

  const [order, setOrder] = useState([]);

  return (
    <div className="row justify-content-center">   
      <div className="col-lg-9">
        <Market order={order} setOrder={setOrder}/>
      </div>
      <div className="col">
        <Cart order={order} setOrder={setOrder}/>
      </div>   
    </div>
  )
}

export default Content