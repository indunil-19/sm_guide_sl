import React, { useState,useContext } from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router';
import { CCard,CCardImage,CCardBody,CCardText } from '@coreui/react'
import { Text } from '@chakra-ui/layout'
import { Avatar } from '@chakra-ui/avatar'
import { Button } from '@chakra-ui/button'
//import { Admincontext } from '../context/AdminContext'
export default function ViewUser() {
  //const{state,dispatch}=useContext(Admincontext)
    const {pid}=useParams()

    const[Firstname,setfirstname]=useState("")
    const[Lastname,setlastname]=useState("")
    const[Country,setCountry]=useState("")
    const[Religion,setReligion]=useState("")
    const[Picture,setPicture]=useState("")
    useEffect(()=>{
        fetch("/api/admin/viewUsers")
        .then(res=>res.json())
        .then(result=>{
            
           if(result.error){
            //   M.toast({html: result.error,classes:"#c62828 red darken-3"})
           }
           else{
                console.log(result.users[pid])
                //let dat=result.users
                setfirstname((result.users)[pid].firstname)
                setlastname((result.users)[pid].lastname)
                setCountry((result.users)[pid].country)
                setReligion((result.users)[pid].religion)
                setPicture((result.users)[pid].pic)
                
           }
        }).catch(err=>{
            console.log(err)
        })
       },[])
    return (
            <div>
            <CCard style={{minWidth:"30rem" ,maxWidth: '60rem',display:"flex",flexDirection:"column",alignItems:"center",backgroundColor:"darkgray" }}>
            <CCardImage orientation="top" src="/background1.jpg"  style={{marginBottom:"-50px"}}/>
            <Avatar src={Picture} size="2xl" style={{textAlign:"center"}}/>
            <CCardBody >
              <CCardText>
                  <Text style={{fontSize:"40px",padding:"20px"}}>Username :- {Firstname}</Text>
                  <Text style={{fontSize:"40px",padding:"20px"}}>Lastname :-{Lastname}</Text>
                  <Text style={{fontSize:"40px",padding:"20px"}}>Country :-{Country}</Text>
                  <Text style={{fontSize:"40px",padding:"20px"}}>Religion :-{Religion}</Text>
                  <div style={{padding:"20px"}}><Button>delete</Button></div>
                
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