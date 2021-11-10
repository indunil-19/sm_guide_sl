import { Flex,Heading, VStack ,Text} from "@chakra-ui/layout"
import { Input, InputGroup, InputLeftAddon ,Button, Checkbox,useToast} from "@chakra-ui/react"
import { useState ,useContext,useEffect } from "react";
import { BiUserCircle } from "react-icons/bi";
import { RiLockPasswordLine } from "react-icons/ri";
import { Link, } from "react-router-dom";
import { useHistory } from "react-router";
import { TravelContext } from "../../context/TravelContext";

export const SignIn=()=>{
  
    
    const {state, dispatch}=useContext(TravelContext)
    const history=useHistory()
    const toast=useToast()
    const [email, setEmail]=useState("")
    const [password,setPassword]=useState("")


    useEffect(()=>{
      
        if(state && state._id){
            
            history.push('/travelPlan')
        }else{
               history.push('/travelPlan/signin')
        }
      },[])



    const sign=()=>{
        if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
            toast({
                title: "Enter valid email",
                position:"top-right",
                status:"error",
                duration: 4000,
                isClosable: true,
              })
            return
        }
            fetch("/api/signin",{
                method:"post",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({
                    password,
                    email
                })
            }).then(res=>res.json())
            .then(data=>{
                console.log(data)
                if(data.error){

                    toast({
                        title: data.error,
                        position:"top-right",
                        status:"error",
                        duration: 4000,
                        isClosable: true,
                      })
                }
                else{

                    toast({
                        title: data.message,
                        position:"top-right",
                        status:"success",
                        duration: 4000,
                        isClosable: true,
                      })
                    localStorage.setItem("user",JSON.stringify(data.user))
                    dispatch({type:"USER",payload:data.user})
                    history.push('/travelPlan')
                }
            }).catch(err=>{
                console.log("dfdfgghgh")
            })

    }
    return(
        <>
        
        <Flex  flexDirection="column" justifyContent="center" alignItems="center" minHeight="100vh" backgroundSize="cover" backgroundPosition="center" backgroundImage="url('https://images.unsplash.com/photo-1578519050142-afb511e518de?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1374&q=80')">
           
           <Flex p={10} borderColor="white" borderWidth={3}  borderRadius={8} width="md" justifyContent="center" alignItems="center" boxShadow="dark-lg" color="white">
            <VStack spacing={10} w="md" color="white">
                <Heading as="h2" size="xl" color="white">
                   SignIn
                </Heading>

                <InputGroup >
                    <BiUserCircle  />
                    <Input type="email" placeholder="email"  value={email}   onChange={(e)=>setEmail(e.target.value)}  />
                </InputGroup>

                {/* If you add the size prop to `InputGroup`, it'll pass it to all its children. */}
                <InputGroup >
                    <RiLockPasswordLine/>
                    <Input placeholder="password" type="password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
                </InputGroup>

                {/* <Checkbox defaultIsChecked>Remember me</Checkbox> */}

                <Button colorScheme="blue" onClick={()=>sign()}>Sign In</Button>
                <Text >Forget Password?<Link to="/travelPlan/reset" >click here</Link></Text>
                <Text >you don't have an account?<Link to="/travelPlan/signup" >SignUp</Link></Text>
                
            </VStack>
            
            </Flex>
        </Flex>
        
        </>
    )
}