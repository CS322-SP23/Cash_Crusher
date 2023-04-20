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
  

export default APIService;