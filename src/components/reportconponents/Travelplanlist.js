import React from 'react'
import { useState,useEffect } from 'react'
import { Button, ButtonGroup,Box,Image } from "@chakra-ui/react";
export default function Travelplanlist() {
    const [data,setData]=useState([])

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
        <div>
            <>
            <table>
                <thead>
                <tr >
                    <th> Index</th>
                    <th style={{padding:"30px"}}>Id</th>
                    <th style={{padding:"30px"}}>rate</th>
                    <th style={{padding:"30px"}}>review</th>
                    <th style={{padding:"30px"}}>Status</th>
                    <th style={{padding:"30px"}}>Createdtime</th>

                </tr>
                </thead>

                <tbody>
                    
                        {
                            data.map((item,index)=>{
                                return(
                                    <tr key={index}>
                                        <td >{index+1}</td>
                                        <td>{item._id}</td>
                                        <td style={{padding:"30px"}}>{item.rate}</td>
                                        <td style={{padding:"30px"}}>{item.review}</td>
                                        <td style={{padding:"30px"}}>{item.public ? "Published" :"NotPublished"}</td>
                
                                        <td style={{padding:"30px"}}>{item.createdAt}</td>       
                                        
                                    </tr>
                                )
                            })
                        }
                </tbody>
            </table>
            <h1>TravelPlanCount {data.length}</h1>
            </>
        </div>
    )
}
