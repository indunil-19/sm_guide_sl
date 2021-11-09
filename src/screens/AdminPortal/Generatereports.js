import {React,useState}from 'react'
import Adminlist from "../../components/reportconponents/Adminlist"
import Viewuserlist from "../../components/reportconponents/Userlist"
import Travelplanlist from "../../components/reportconponents/Travelplanlist"
import { Select ,Button,Stack} from "@chakra-ui/react"
import ReactDOMServer from "react-dom/server";
//import jsPDF from "jspdf";
//const doc = new jsPDF();
export default function Generatereports() {
  const [type,settype]=useState("Not Seleced")
 
  return (
    <div style={{justifyContent: 'center',textAlign: 'center'}}>
    <div style={{textAlign: 'center'}}>
       <Select onClick={(e)=>settype(e.target.value)} placeholder="Select Type of report">
  <option value="Userlist">UserDetails</option>
  <option value="Adminlist">AdminDetails</option>
  <option value="Travelplan1">TravelplanDetails</option>
</Select></div>
    
      {genaratereport(type)}
      <div style={{padding:"100px"}}><Button >GenaratereportasPdf</Button></div>
    </div>
  )
}

const genaratereport=(value)=>{
  if(value==="Userlist"){
    return <Viewuserlist/>;
  }
  else if(value==="Adminlist"){
    return <Adminlist/>;
  }
  else if(value==="Travelplan1"){
    return <Travelplanlist/>;
  }
  else {
    return <div>NOT SELECTED</div>;
  }
}

