import React, { useState, useEffect } from 'react'
import M from 'materialize-css'
import { Textarea } from "@chakra-ui/react"
import { Button } from '@chakra-ui/button'
import {  Flex   } from '@chakra-ui/layout'
import {  EditIcon, CloseIcon , CheckIcon} from '@chakra-ui/icons'



export const Description=({des, pid})=>{
    useEffect(()=>
      setDescription1(des),[des])
  
  
    const [description1, setDescription1]=useState("")
    const [edit, setEdit]=useState(true)
    const [isLoading,setLoading]=useState(false)
  
    
  
    const updateDescription=()=>{
        setLoading(true)
  
        fetch("/api/admin/descriptionUpdate",{
          method:"post",
          headers:{
              "Content-Type":"application/json",
          },
          body:JSON.stringify({
              description:description1,
              pid:pid,
          })
      }).then(res=>res.json())
      .then(data=>{
        console.log(data)
        if(data.message){
            setDescription1(data.result.description)
  
            M.toast({html: data.message,classes:"#c62828 red darken-3"})
            setLoading(false)
            setEdit(true)
  
  
        }
        if (data.error){
          M.toast({html: data.message,classes:"#c62828 red darken-3"})
        }
        
      }).catch(err=>{
          console.log(err)
      })
    }
  
    return(
      <>
      <Flex flexDirection="column" justifyContent="center" padding={5}>
      <Textarea style={{marginTop:15, padding:10}} value={description1} placeholder="type description here" isDisabled={edit} onChange={(e)=>{ setDescription1(e.target.value); }}></Textarea> 
      <Flex flexDirection="row" justifyContent="space-between" padding="10" > 
      { edit ? <Button leftIcon={<EditIcon /> } colorScheme="teal" variant="solid" onClick={()=>setEdit(false)}>
       Edit
      </Button> : 
      <>
       <Button 
      leftIcon={<CheckIcon /> }
      isLoading={isLoading}
      loadingText="saving" colorScheme="teal" variant="solid" onClick={()=>updateDescription()}>
       Save
      </Button>
      {!isLoading ?  <Button leftIcon={<CloseIcon /> } colorScheme="teal" variant="solid" onClick={()=>setEdit(true)}>
       Cancel
      </Button> : <></>} 
      </>  
      } 
      </Flex>
      </Flex>
      </>
    )
   
  }
  
  