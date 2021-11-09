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
    const[fetchdata,setfetchdata]=useState([])
    const[filterfirstname,setfilterfirstname]=useState("")
    const [userlist, setuserlist] = useState([]);
    const[filterlastname,setfilterlastname]=useState("")
    const[filtercountry,setfiltercountry]=useState("")
    const[filterreligion,setfilterreligion]=useState("")
    const [Currentuser,setcurrentuser]=useState([])
    const [isloading,setloading]=useState(true)
    const filterbyfirstname=(filterfirstname)=>{
        if(filterfirstname===""){
            return userlist
        }
        else{
            return []
        }
    }
    const filteredbyfirstname =(filterfirstname)=>{ 
        if(!filterfirstname.length)
        return fetchdata 
        else{
            console.log(filterfirstname)
            console.log(userlist.map(person => (person.firstname) == filterfirstname))
            return userlist.filter(person => (person.firstname.toLowerCase()).includes(filterfirstname.toLowerCase()))}

    }
    const filteredbycountry =(filtercountry)=>{ 
        if(!filtercountry.length)
        return fetchdata 
        else{
            console.log(filterfirstname)
            console.log(userlist.map(person => (person.country) == filtercountry))
            return userlist.filter(person => (person.country.toLowerCase()).includes(filtercountry.toLowerCase()))}

    }
    const filteredbylastname =(filterlastname)=>{ 
        if(!filterlastname.length)
        return fetchdata 
        else{
            console.log(filterlastname)
            console.log(userlist.map(person => (person.lastname) == filterlastname))
            return fetchdata.filter(person => (person.lastname.toLowerCase()).includes(filterlastname.toLowerCase()))}

    }
    
    const filteredbyreligion =(filterreligion)=>{ 
        if(!filterreligion.length)
        return fetchdata 
        else{
            console.log(filterlastname)
            console.log(userlist.map(person => (person.religion) == filterreligion))
            return fetchdata.filter(person => (person.religion.toLowerCase()).includes(filterreligion.toLowerCase()))}

    }
        
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
                setfetchdata(result.users)
                console.log(userlist)
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
                    <th> Id</th>
                    <th style={{padding:"10px"}}>Profile</th>
                    <th style={{padding:"10px"}}>First Name <input placeholder="firstname"  onChange={(e)=>setuserlist(filteredbyfirstname(e.target.value))}></input></th>
                    <th style={{padding:"10px"}}>Last Nmae<input placeholder="lastname" onChange={(e)=>setuserlist(filteredbylastname(e.target.value))}></input></th>
                    <th style={{padding:"10px"}}>Religion<input placeholder="Religion" onChange={(e)=>setuserlist(filteredbyreligion(e.target.value))}>
                    
                
              </input>
                    </th>
                    <th style={{padding:"10px"}}>Country<input placeholder="country" onChange={(e)=>setuserlist(filteredbycountry(e.target.value))}></input></th>
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
                                        <td style={{padding:"10px"}}>
                                                
                                        <Button ><Link to={`/admin/viewUser/${index}`}>Show</Link></Button>
                                        </td>
                                        <td style={{padding:"10px"}}>
                                                
                                        <Button ><Link to={`/admin/viewUser/${index}`}>delete</Link></Button>
                                        </td>
                                        
                                    </tr>
                                )
                            })
                        }
                </tbody>
            </table>
             
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
