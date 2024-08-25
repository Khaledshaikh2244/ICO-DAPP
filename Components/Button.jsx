import React from "react";

// getting props 
// dynamic class for specific btn

const Button = ({name, handleCLick, classStyle}) => {
  return <button className= {`${classStyle} new-button` } onClick={handleCLick}>{name}</button>
};

export default Button;
