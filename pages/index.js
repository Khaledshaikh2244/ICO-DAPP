import React from 'react'
import { useStateContext } from '../Context/index'
const index = () => {
  const {
    buyToken,
  } = useStateContext();
  return (
    <div>
      <footer />
    </div>
  ) 
}

export default index
