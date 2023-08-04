import React, { useState, useEffect, useContext } from "react";
import NavBar from "./NavBar";
import book from "../book.png";

function Test() {
  let url = book;
  useEffect(() => {
   
   
  }, [url])
  function changePage() {
    url = "./901";
  }
 

  return (
    <NavBar>
      <div className="container py-3">
        <div className="page">
          <img src={url}></img>
        </div>
        <button onClick={changePage} className="btn btn-light mx-2 my-1">Next Page</button>
        <button className="btn btn-light my-1">Prev Page</button>
      </div>
    </NavBar>
  );
}

export default Test;
