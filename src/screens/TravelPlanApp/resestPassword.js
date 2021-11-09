import React,{useState} from 'react'
import {useHistory} from 'react-router-dom'
import { useToast } from "@chakra-ui/react"
import { Flex } from '@chakra-ui/layout'
import { Button } from '@chakra-ui/button'
import { Text } from '@chakra-ui/layout'
import { Input } from "@chakra-ui/react"
const ResestPassword  = ()=>{
    const history = useHistory()
    const [email,setEmail] = useState("")
    const toast = useToast()
    const PostData = ()=>{
        if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
            toast({
                title: "Password Reset.",
                description: "You entered password is incorrect",
                status: "error",
                duration: 6000,
                isClosable: true,
            })
            return
        }
        fetch('/reset-password',{
            method:"post",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                email
            })
        }).then(res=>res.json())
        .then(data=>{
           if(data.error){
            toast({
                title: "Password Reset.",
                description: data.error,
                status: "error",
                duration: 6000,
                isClosable: true,
            })
           }
           else{
            toast({
                title: "Password Reset.",
                description: data.message,
                status: "success",
                duration: 6000,
                isClosable: true,
            })
               history.push('/travelPlan/signin')
           }
        }).catch(err=>{
            console.log(err)
        })
    }
   return (
      
          <Flex flexDirection="column" justifyContent="center" maxWidth="80%" m="auto" alignItems="center" boxShadow="dark-lg" p={10} mt="100px">
            <Text fontSize="3xl">Reset Password</Text>
            <Input
            type="text"
            placeholder="email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            />
            <Button colorScheme="blue" m={5} 
            onClick={()=>PostData()}
            >
               reset password
            </Button>
            
    
        </Flex>
      
   )
}

export default ResestPassword;