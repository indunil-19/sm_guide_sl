import React, { useState, useEffect } from 'react'
import { Heading,Center, Flex, Text  } from '@chakra-ui/layout'
import { useParams } from 'react-router'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';


export const Province = (props) => {
  const {pid}=useParams()
  const [ima,setIma]=useState([])
  const [name, setName]=useState("")
  const [description, setDescription]=useState("")
  useEffect(()=>{
    
     fetch("/api/admin/getProvinceData/"+pid).
     then(res=>res.json())
     .then(data=>{
        console.log(data)
        setIma(data.images)
        setName(data.name)
        setDescription(data.description)
        console.log(ima)
       
     }).catch(err=>{
         console.log(err)
     })
  
  },[])
          
  return (  
     <Flex flexDirection="column" boxShadow="2xl" bg="white" my={10} p={4} borderRadius="2px" borderColor="grey" width="70%" mx="auto">
     <Center><Heading mb={4}>{name}</Heading></Center>
     <img src={ima? ima[0]: ""} />
     <Text fontSize="md" p={4}>{description}</Text>
     </Flex> 
  )
}

const Carousal1=({photos=[]})=>{
    const [references, setReferences]=useState([])
    useEffect(()=>{
            setReferences(photos)
    }, [photos])
    return(
        <Carousel>
                
                {
                    references.map((reference)=>{
                        return(
                            <div >
                            <img src={reference} />
                             </div>
                        )
                    })
                }
                
            </Carousel>
    )
}



