import { Flex, Heading } from "@chakra-ui/layout"
import { Input,InputGroup,InputLeftAddon } from "@chakra-ui/input"
import { useState } from "react"
import { Button } from "@chakra-ui/button"
import { useToast } from "@chakra-ui/toast"
import { useHistory } from "react-router"
export const ChangePassword=()=>{
    const [prevoiusPass,setPreviousPass]=useState("")
    const [newPass,setNewPass]=useState("")
    const history=useHistory()
    const toast=useToast()

    const updatepassword=()=>{

        fetch("/api/user/updatepassword",{
            method:"post",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                prevoiusPassowrd:prevoiusPass,
                newPassword:newPass
            })
        }).then(res=>res.json()).
        then(result=>{
            if(result.error){
                toast({
                    title: result.error,
                    position:"top-right",
                    status:"error",
                    duration: 4000,
                    isClosable: true,
                  })
            }else{
                toast({
                    title: result.message,
                    position:"top-right",
                    status:"success",
                    duration: 4000,
                    isClosable: true,
                  })
                  history.push("/travelPlan/myAcccount")
            }

        }).catch(e=>{
            console.log(e)
        })
    }
    return(
        <>

        <Flex flexDirection="column" justifyContent="center" width="80%" m={5} mx="auto" alignItems="center" p={10} boxShadow="dark-lg"  >
         
            <Heading>Change Password</Heading>
            <InputGroup p={3} m={3}>
                <InputLeftAddon children="previous password" />
                <Input type="text" placeholder="previous password"  value={prevoiusPass}  onChange={(e)=>setPreviousPass(e.target.value)}  />
            </InputGroup>

            <InputGroup p={3} m={3}>
                <InputLeftAddon children="New password" />
                <Input type="text" placeholder="New password"  value={newPass} onChange={(e)=>setNewPass(e.target.value)}  />
            </InputGroup>

            <Button colorScheme="blue" m={10} onClick={()=>updatepassword()}>
                Submit
            </Button>

        </Flex>
        
        </>
    )
}