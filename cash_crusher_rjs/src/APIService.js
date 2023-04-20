import logo from './logo.svg';
import './App.css';
import LineChart from './linechart'
import React, { useState, useEffect } from 'react'

function APIService() {

  const [data, setData] = useState([{}])

// retrieve data from flask

  useEffect(() => {
    fetch("/data").then(
      res => res.json()).then(
        data => {
          setData(data)
          console.log(data)
        })
  }, [])

  
  //this sends the received data from the parent to child class component for it to graph
  
}

export default APIService;