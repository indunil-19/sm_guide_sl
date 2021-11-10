import { Flex, HStack, Text } from "@chakra-ui/layout"
import { useEffect, useRef, useState } from "react"
import { Button } from "@chakra-ui/button"
import { PlanCard } from "../../components/AdminComponents/planCard"
import { IoRemoveCircleOutline } from "react-icons/io5"
import { AlertIcon } from "@chakra-ui/alert"
import {Alert} from "@chakra-ui/react"

export const PublicPlans=()=>{
    const [rate,setRate]=useState("")
    const [plans,setPlans]=useState([])
    const alert=useRef()

    useEffect(()=>{
        getPublicPlans()
    },[])


    const getPublicPlans=()=>{
        fetch('/api/admin/getPublicPlans',{
            method:"get"
        }).then(res=>res.json()).
        then(data=>{
            setPlans(data.myPlans)
            if(data.myPlans.length==0){
                alert.current.style.display="block"
                return
            }
            alert.current.style.display="none"
            console.log(data)
        }).catch(e=>{
            console.log(e)
        })
    }

    const removePublic=(pid)=>{
        fetch('/api/admin/removePublic',{
            method:"post",
            headers:{
                "Content-Type":"application/json",
            },
            body:JSON.stringify({
                planId:pid})
            }).then(res=>res.json()).
            then(result=>{
                if(result.data){
                    const newPlans=plans.filter(plan=>{
                        return plan._id !=result.data._id                            
                    })
                    setPlans(newPlans)
                }
                
                console.log(result)
            })
            .catch((e)=>{
                console.log(e)
            })
    }

    return(
        <>
        
   
       
        <>
        {plans && plans.map((plan,index)=>{
                    return(
                        <>
                         <Flex flexDirection="column" alignItems="center" p={3}>
                            <HStack>

                           

                            <Button colorScheme="blue" onClick={()=>{
                                removePublic(plan._id)
                            }}><IoRemoveCircleOutline /></Button>
                        
                            <PlanCard _id={plan._id} name={plan.name ? plan.name : `My plan ${index+1}`} days={plan.travelPlan[0].length} createdDate={plan.createdAt} travelPlan={plan.travelPlan} />

                            </HStack>
                         </Flex>
                        </>
                    )
        })}

        </>
        <Flex display="none" ref={alert}> 
        <Alert status="warning" m={5} > 
            <AlertIcon />
            Seems there is no public plans...
        </Alert>
        </Flex>



        
        
        </>
    )
}