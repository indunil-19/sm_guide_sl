import React, { useState,useContext,useEffect } from 'react';
import { useParams } from 'react-router';
import { CCard,CCardImage,CCardBody,CCardText } from '@coreui/react'
import { Text } from '@chakra-ui/layout'
import { Avatar } from '@chakra-ui/avatar'
import { Button } from '@chakra-ui/button'
//import { Admincontext } from '../context/AdminContext'
export default function ViewAdmin() {
  const pid=useParams()
  //const{state,dispatch}=useContext(Admincontext)
    const [data,setdata]=useState([])
    const[Firstname,setfirstname]=useState("gdfgdghdgh")
    const[Lastname,setlastname]=useState("fsvsvfs")
    const[Dob,setdob]=useState("fdfgddgdg")
    const[Email,setemail]=useState("afdsgdgghfu")
    useEffect(()=>{
      fetch("/admin/viewAdmins")
      .then(res=>res.json())
      .then(result=>{
          console.log(result)
         if(result.error){
          //   M.toast({html: result.error,classes:"#c62828 red darken-3"})
         }
         else{
              //console.log(result)
               setdata(result.admins)
               setfirstname((result.admins)[pid.pid].firstname)
               setlastname((result.admins)[pid.pid].lastname)
               setdob((result.admins)[pid.pid].dob)
               setemail((result.admins)[pid.pid].email)
              //dispatch({type:"Adminlist" , payload:{Adminlist:result.admins}})
              //console.log(state.Adminlist[0].firstname)
         }
      }).catch(err=>{
          console.log(err)
      })
     },[])
    
    return (
            <div>
            <CCard style={{minWidth:"30rem" ,maxWidth: '60rem',display:"flex",flexDirection:"column",alignItems:"center",backgroundColor:"darkgray" }}>
            <CCardImage orientation="top" src="/background1.jpg"  style={{marginBottom:"-50px"}}/>
            <Avatar src="https://bit.ly/sage-adebayo" size="2xl" style={{textAlign:"center"}}/>
            <CCardBody >
              <CCardText>
                  <Text style={{fontSize:"40px",padding:"20px"}}>Firstname :- {Firstname}</Text>
                  <Text style={{fontSize:"40px",padding:"20px"}}>Lastname :-{Lastname}</Text>
                  <Text style={{fontSize:"40px",padding:"20px"}}>Dob :-{Dob}</Text>
                  <Text style={{fontSize:"40px",padding:"20px"}}>Email :-{Email}</Text>
                  <div style={{padding:"20px"}}><Button onClick={()=>console.log(data[pid.pid].dob) }>Edit</Button></div>
                
              </CCardText>
            </CCardBody>
          </CCard>
            </div>
        
    )
}
const list1=[{'index':1,'username':"Varatharajan",'country':"Srilanka",'religion':"Hindu",'picture':"https://bit.ly/sage-adebayo"},
    {'index':2,'username':"kamal",'country':"Srilanka",'religion':"Hindu",'picture':"https://bit.ly/dan-abramov"},
    {'index':1,'username':"Varatharajan",'country':"Srilanka",'religion':"Hindu",'picture':"https://bit.ly/sage-adebayo"},
    {'index':2,'username':"kamal",'country':"Srilanka",'religion':"Hindu",'picture':"https://bit.ly/dan-abramov"},
    {'index':1,'username':"Varatharajan",'country':"Srilanka",'religion':"Hindu",'picture':"https://bit.ly/sage-adebayo"},
    {'index':2,'username':"kamal",'country':"Srilanka",'religion':"Hindu",'picture':"https://bit.ly/dan-abramov"},
    

];