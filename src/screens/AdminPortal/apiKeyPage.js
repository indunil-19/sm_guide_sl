import { Flex, HStack } from "@chakra-ui/layout";
import { Input,InputGroup,InputLeftAddon } from "@chakra-ui/input";
import { Button } from "@chakra-ui/button";
import { Text,useToast } from "@chakra-ui/react"
import { Heading } from "@chakra-ui/react"
import { useEffect, useState } from "react";

const ApiKeyDetailsPage=()=>{

    
    const toast=useToast()
    const [apiKey,setApiKey]=useState("")
    const [newApiKey,setNewApiKey]=useState("")
    const [date,setDate]=useState("")



    useEffect(()=>{
        fetch("/api/admin/getApiKet").then(res=>res.json()).then(data=>{
            console.log(data)
            setApiKey(data.result.apiKey)
            setDate(data.result.updateDate)
        }).catch(e=>{
            console.log(e)
        })
    },[])







    const updateApiKey=()=>{
        fetch("/api/admin/updateApiKey", {
            method:"post",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                apiKey:newApiKey
            })
        }).then(res=>res.json()).then(data=>{
            console.log(data)
            if(data.error){

                toast({
                    title: data.error,
                    position:"top-right",
                    status:"error",
                    duration: 9000,
                    isClosable: true,
                  })
            }
            else{

                toast({
                    title: data.message,
                    position:"top-right",
                    status:"success",
                    duration: 9000,
                    isClosable: true,
                  })
              
             setDate(data.result.updateDate)
             setApiKey(data.result.apiKey)
               
            }
            
        }).catch(e=>{
            console.log(e)
        })
    }




    return(
        <>
        
        <Flex flexDirection="column" width="80%" height="80vh" justifyContent="center" alignItems="center" boxShadow="lg" p={5} bgColor="white" mx="auto">

        <InputGroup p={5}>
            <InputLeftAddon children="update api key" />
            <Input type="text" placeholder="" onChange={(e)=>setNewApiKey(e.target.value)} value={newApiKey} />
        </InputGroup>

        <Button colorScheme="blue" variant="solid" onClick={()=>updateApiKey()} m={3}>
            submit
        </Button>


        <HStack>
                <Heading as="h3" size="lg" p={5}>
                    Your api key:
                </Heading>

                <Text fontSize="3xl" p={5}>{apiKey}</Text>
        </HStack>

        <Text fontSize="2xl" p={4}>Last update: {date}</Text>

        </Flex>
        </>
    )
}
export default ApiKeyDetailsPage;