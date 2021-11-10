import React from 'react'
import { useState,useEffect ,useContext} from 'react'
import { Button, ButtonGroup,Box,Image } from "@chakra-ui/react";
import { Flex } from '@chakra-ui/layout';
import { AdminContext } from '../../context/AdminContext';
import { useHistory } from 'react-router';
export default function Travelplanlist() {
    const [data,setData]=useState([])
    const[travelplanconut,setcount]=useState("gdfgdghdgh")
    const[rate,setrate]=useState("fsvsvfs")
    const[review,setreview]=useState("fdfgddgdg")
    const {state, dispatch}=useContext(AdminContext)
    const history=useHistory()

   useEffect(()=>{
    fetch("/api/admin/viewTravelplan")
    .then(res=>res.json())
    .then(result=>{
        console.log(result)
       if(result.error){
        //   M.toast({html: result.error,classes:"#c62828 red darken-3"})
       }
       else{
            console.log(result.travelplan.length)

             setData(result.travelplan)
       }
    }).catch(err=>{
        console.log(err)
    })
   },[])
    return (
        <Flex boxShadow="lg" p={2} mx="auto" alignItems="center" justifyContent="center">
        <div>
            <>
            <table>
                <thead>
                <tr >
                    <th> Index</th>
                    <th style={{padding:"30px"}}>rate</th>
                    <th style={{padding:"30px"}}>review</th>
                    <th style={{padding:"30px"}}>Status</th>
                    <th style={{padding:"30px"}}>View</th>
                    <th style={{padding:"30px"}}>Delete</th>

                </tr>
                <hr/>
                </thead>
                
                <tbody>
                    
                        {
                            data.map((item,index)=>{
                                return(
                                    <tr key={index}>
                                        <td >{index+1}</td>
                                        <td style={{padding:"30px"}}>{item.rate}</td>
                                        <td style={{padding:"30px"}}>{item.review}</td>
                                        <td style={{padding:"30px"}}>{item.public ? "Published" :"NotPublished"}</td>
                
                                        <td style={{padding:"30px"}}>
                                        <Button onClick={()=>{
                                            dispatch({type:"set_travelPlan" , payload:{travelPlan:item.travelPlan}})
                                            dispatch({type:"set_planId" , payload:{planId:item._id}})
                                            history.push("/admin/viewMyTravelPlan")
                                        }}>view</Button></td>
                                        <td style={{padding:"30px"}}><Button>delete</Button></td>       
                                        
                                    </tr>
                                )
                            })
                        }
                </tbody>
            </table>
            </>
        </div>
        </Flex>
    )
}
