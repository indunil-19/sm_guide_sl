import React, { useState, useEffect } from 'react'
import { Heading,Center, Flex,   } from '@chakra-ui/layout'
import { useParams } from 'react-router'
import { Description } from '../../components/description'
import { Galary } from '../../components/galary'


export const ViewProvince = (props) => {
  const {pid}=useParams()
  const [ima,setIma]=useState([])
  const [name, setName]=useState("")
  const [description, setDescription]=useState("")
  useEffect(()=>{
    
     fetch("/admin/getProvinceData/"+pid).
     then(res=>res.json())
     .then(data=>{
        console.log(data)
        setIma(data.images)
        setName(data.name)
        setDescription(data.description)
       
     }).catch(err=>{
         console.log(err)
     })
  
  },[])
          
  return (
   <>
     <Flex flexDirection="column" boxShadow="2xl" bg="white" p={10}>
     <Center><Heading mb={4}>{name}</Heading></Center>
     <Galary imarr={ima} pid={pid} />
     <Description des={description} pid={pid} />
     </Flex>
   </>
  )
}



