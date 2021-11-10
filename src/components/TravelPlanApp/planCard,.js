import {  useContext, useState } from "react";
import { Flex, HStack, VStack } from "@chakra-ui/layout"
import { Text, Image, Heading , Button,Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverHeader,
    PopoverBody,
    PopoverFooter,
    PopoverArrow,
    PopoverCloseButton,Input,useToast} from "@chakra-ui/react"
import { TravelContext } from "../../context/TravelContext";
import { useHistory } from "react-router"
import {EditIcon} from '@chakra-ui/icons'

export const PlanCard=({_id="",name,days,createdDate, travelPlan,startLocation,startLocationName})=>{
    const {state, dispatch}=useContext(TravelContext)
    const [newName,setNewName]=useState(name)
    const history=useHistory()
    const toast=useToast()

    const changeName=()=>{
        fetch("/api/user/changePlanName",{
            method:"post",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                planId:_id,
                name:newName
            })
        }).then(res=>res.json()).
        then(result=>{
            console.log(result)
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
                  name=newName
                  
            }

        }).catch(e=>{
            console.log(e)
        }) 
    }
    return(
       
                    <Flex margin={5} borderWidth="1px" borderRadius="lg" p={5} maxWidth="container.md" >
                       <HStack>
                       <Image src={"https://images.unsplash.com/photo-1632429619634-3d97fc1693e9?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=387&q=80"}  width="400px" height="300px" objectFit="cover" borderRadius="lg"  /> 
                       <VStack p={3} alignItems="start" spacing={5}>
                                <HStack>
                                <Heading as="h3" size="lg">
                                    {name}
                                </Heading>                                 
                                        <>
                                        <Popover>
                                            <PopoverTrigger>
                                                <Button><EditIcon /></Button>
                                            </PopoverTrigger>
                                            <PopoverContent>
                                                <PopoverArrow />
                                                <PopoverCloseButton />
                                                <PopoverBody p={6} >
                                                     <Input placeholder="Name" m={3} onChange={(e)=>setNewName(e.target.value)} value={newName}/>
                                                     <Button  colorScheme="teal" onClick={()=>changeName()}>
                                                        Save
                                                    </Button>
                                                </PopoverBody>
                                            </PopoverContent>
                                            </Popover>
                                        
                                        </>
                                </HStack>

                                <Heading as="h5" size="sm">
                                    {days} days
                                </Heading>

                                <Button colorScheme="teal" variant="outline" onClick={()=>{
                                        dispatch({type:"set_travelPlan" , payload:{travelPlan:travelPlan}})
                                        dispatch({type:"set_planId" , payload:{planId:_id}})
                                        dispatch({type:"USER_PREFERENCES",payload:{userPreferences:{
                                            startLocation:startLocation,
                                            startLocationName:startLocationName
                                        }}}) ;
                                        history.push("/travelPlan/viewMyTravelPlan")

                                }}>
                                    View Plan
                                </Button>

                                <Text fontSize="sm">created : {createdDate}</Text>
                       </VStack>
                       </HStack>

                    </Flex>
                    
    )
}

