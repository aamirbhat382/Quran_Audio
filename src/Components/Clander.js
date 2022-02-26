import {useLocation} from 'react-router-dom';
import { useState,useEffect } from "react";
import NavBar from './NavBar'
import parse from 'html-react-parser';



function Clander() {
const [data, setData] = useState(null);
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);

let year = new Date().getFullYear();
let month = new Date().getMonth()+1
const URL = `https://api.aladhan.com/v1/gToHCalendar/${month}/${year}`
const loadData = (url)=>{
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            `This is an HTTP error: The status is ${response.status}`
          );
        }
        return response.json();
      })
      .then((data) => {
        console.log(data.data)
        
        setData(data.data);
        setError(null);
      })
      .catch((err) => {
        setError(err.message);
        setData(null);
      })
      .finally(() => {
        setLoading(false);
      });
    
}
useEffect(() => {
  loadData(URL)
  }, []);

const WeekDayStart =(data)=>{
  let html = ``
  if(data[0].gregorian.weekday.en === "Sunday"){
    html = ``
  }
  else if(data[0].gregorian.weekday.en === "Monday")
    for(let i =0 ; i<1;i++){
       html += `<button class="btn cal-btn" type="button"></button>`
    }
    else if(data[0].gregorian.weekday.en === "Tuesday")
    for(let i =0 ; i<2;i++){
       html += `<button class="btn cal-btn" type="button"></button>`
    }
    else if(data[0].gregorian.weekday.en === "Wednesday")
    for(let i =0 ; i<3;i++){
       html += `<button class="btn cal-btn" type="button"></button>`
    }
     else if(data[0].gregorian.weekday.en === "Thursday")
    for(let i =0 ; i<4;i++){
       html += `<button class="btn cal-btn" type="button"></button>`
    }
    else if(data[0].gregorian.weekday.en === "Friday")
    for(let i =0 ; i<5;i++){
       html += `<button class="btn cal-btn" type="button"></button>`
    }
    else if(data[0].gregorian.weekday.en === "Saturday")
    for(let i =0 ; i<6;i++){
       html += `<button class="btn cal-btn" type="button"></button>`
    }
    
  
 
  return html
          
        
}
const Month =(data)=>{
   return data.map(element=>{
         if(element.gregorian.day === new Date().getDate().toString()){
            return(
            <strong className="cal-month-name">{element.gregorian.month.en} | {element.hijri.month.en}</strong>)
           
         }})
      
    
}
const Style = {
 
  color: 'blue',
  
};
  return (
    <NavBar>
    <div className="container my-3 p-2 shadow rounded-3">
<div class="d-grid gap-1">
    <div class="cal">
      <div class="cal-month">
        <button class="btn cal-btn" type="button">
          <svg class="bi" width="16" height="16"><use href="#arrow-left-short"></use></svg>
        </button>
        <strong class="cal-month-name">{data && Month(data)}</strong>
        <button class="btn cal-btn" type="button">
          <svg class="bi" width="16" height="16"><use href="#arrow-right-short"></use></svg>
        </button>
      </div>
      <div class="cal-weekdays text-muted">
        <div class="cal-weekday">Sun</div>
        <div class="cal-weekday">Mon</div>
        <div class="cal-weekday">Tue</div>
        <div class="cal-weekday">Wed</div>
        <div class="cal-weekday">Thu</div>
        <div class="cal-weekday">Fri</div>
        <div class="cal-weekday">Sat</div>
      </div>
      <div class="cal-days">
      {data && parse(WeekDayStart(data))}
        
        {data && data.map((element=>{
          return(
            <button class="btn cal-btn " style={ element.gregorian.day === new Date().getDate().toString() ? { color:'#e1e1ed',background:"#48974e"} : {}} >{element.gregorian.day} <br/>{element.hijri.day}</button>
          )
        }))
          
        }
   
      </div>
    </div>
  </div>
  </div>
    </NavBar>
  );
}

export default Clander