import {React,useState,useEffect} from 'react';
import { useMemo } from 'react';
import {useTable,useGlobalFilter,useFilters} from 'react-table';
import ReactTable from 'react-table';
import { ViewIcon } from "@chakra-ui/icons";
import { Avatar } from '@chakra-ui/avatar';
import { Input } from '@chakra-ui/input';
import { Button, ButtonGroup,Box,Image } from "@chakra-ui/react";
import { Radio, RadioGroup } from "@chakra-ui/react";
import 'bootstrap/dist/css/bootstrap.min.css'
import {
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,Select
  } from "@chakra-ui/react";
  import {
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverHeader,
    PopoverBody,
    PopoverFooter,
    PopoverArrow,
    PopoverCloseButton,
  } from "@chakra-ui/react";
import {
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
  } from "@chakra-ui/react"
import { Link } from 'react-router-dom';
export default function Viewuserlist() {
    const [userlist, setuserlist] = useState([]);
    
    
        
    useEffect(()=>{
        fetch("/admin/viewUsers")
        .then(res=>res.json())
        .then(result=>{
            
           if(result.error){
            //   M.toast({html: result.error,classes:"#c62828 red darken-3"})
           }
           else{
                //console.log(result)
                //let dat=result.users
                setuserlist(result.users)
                console.log(result.users)
           }
        }).catch(err=>{
            console.log(err)
        })
       },[])
    
    
    return (
        <div>
        
          
                
        <table style={{minWidth:"300px",maxWidth:"500px"}}>
                <thead>

                <tr >
                                        <td >Index</td>
                                        <td style={{padding:"10px"}}>Profile </td>
                                        <td style={{padding:"10px"}}>firstname</td>
                                        <td style={{padding:"10px"}}>lastname</td>
                                        <td style={{padding:"10px"}}>religion</td>
                                        <td style={{padding:"10px"}}>country</td>
                                        <td style={{padding:"10px"}}>Dob</td>
                                        <td style={{padding:"10px"}}>Email</td>

                    
                </tr>
                </thead>

                <tbody>
                    
                        {
                            userlist.map((item,index)=>{
                                return(
                                    <tr key={index}>
                                        <td >{index+1}</td>
                                        <td style={{padding:"10px"}}><Profile value={item.pic} firstname1={item.firstname}/></td>
                                        <td style={{padding:"10px"}}>{item.firstname}</td>
                                        <td style={{padding:"10px"}}>{item.lastname}</td>
                                        <td style={{padding:"10px"}}>{item.religion}</td>
                                        <td style={{padding:"10px"}}>{item.country}</td>
                                        <td style={{padding:"10px"}}>{item.dob}</td>
                                        <td style={{padding:"10px"}}>{item.email}</td>
                                        
                                        
                                        
                                    </tr>
                                )
                            })
                        }
                </tbody>
            </table>
             <h1>UserCount  {userlist.length}</h1>
          </div>
        
    )

}
const Profile=(props)=>(<Popover  >
    <PopoverTrigger>
        <Avatar src={props.value}/>
    </PopoverTrigger>
    <PopoverContent>
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverHeader style={{backgroundColor:"grey"}}>{props.firstname1}</PopoverHeader>
        <PopoverBody style={{backgroundColor:"grey"}}>
            
        <div><Image src={props.value} alt="Segun Adebayo"  style={{objectFit:"contain"}}/></div>
            
        
            </PopoverBody>
    </PopoverContent>
    </Popover>)
