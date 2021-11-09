import { Flex ,HStack,Text,Heading} from "@chakra-ui/layout"
import { Image } from "@chakra-ui/image"
import { TravelContext } from "../../context/TravelContext"
import { useContext, useEffect,useState, useRef} from "react"
import { Input,InputGroup ,InputLeftAddon,Button,Select, useToast} from "@chakra-ui/react"
import {  EditIcon, CloseIcon , CheckIcon,} from '@chakra-ui/icons'
import Autocomplete from "react-google-autocomplete";
import { Link } from "react-router-dom"

export const MyAccount=()=>{
    const {state,dispatch} = useContext(TravelContext)
    const [edit, setEdit]=useState(false)
    const [isLoading,setLoading]=useState(false)
    const [isLoading1,setLoading1]=useState(false)
    const [first_name,setFirst_name]=useState(state.firstname)
    const [last_name,setLast_name]=useState(state.lastname)
    const [dob,setDOB]=useState(state.dob)
    const [religion,setReligion]=useState(state.religion)
    const [country,setCountry]=useState(state.country)
    const [email,setEmail]=useState(state.email)
    const [pic, setPic]=useState(state.pic)
    const toast=useToast()
    const inputRef = useRef()

    useEffect(()=>{
                setFirst_name(state.firstname)
                setLast_name(state.lastname)
                setDOB(state.dob)
                setCountry(state.country)
                setReligion(state.religion)
                setEmail(state.email) 
                setPic(state.pic)              
    },[])

    const postDetails = (image)=>{
        setLoading1(true)
        console.log(image)
        const data = new FormData()
        data.append("file",image)
        data.append("upload_preset","employeeApp")
        data.append("cloud_name","myimagcloud")
        fetch("https://api.cloudinary.com/v1_1/myimagcloud/image/upload",{
            method:"post",
            body:data
        })
        .then(res=>res.json())
        .then(data=>{
           setPic(data.url)
           setLoading1(false)
        })
        .catch(err=>{
            console.log(err)
        })
      
      
      }

    const updateData=()=>{
        setLoading(true)
        fetch(`/user/updateUser`,{
            method:"post",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                _id:state._id,
                firstname:first_name,
                lastname:last_name,
                dob:dob,
                country:country,
                religion:religion,
                email:email, 
                pic:pic 
  
            })
        }).then(res=>res.json())
        .then(data=>{
            console.log(data)
            setLoading(false)
            
          if(data.error){
              console.log(data.data)
              toast({
                title: data.error,
                position:"top-right",
                status:"error",
                duration: 4000,
                isClosable: true,
              })
              return;
          }
          else{
            toast({
                title: data.message,
                position:"top-right",
                status:"success",
                duration: 4000,
                isClosable: true,
              })
              
              dispatch({type:"UPDATE",payload:data.data})
              localStorage.setItem("user",JSON.stringify(data.data))
              setEdit(false)
            
          }
        }).catch(err=>{
            console.log(err)
      })
    }

    return(
        <>
         <Flex flexDirection="column" justifyContent="center" width="80%" m={5} mx="auto" alignItems="center" p={5} boxShadow="dark-lg" >
            <input  ref={inputRef} type="file" style={{display:"none"}} onChange={(e)=>postDetails(e.target.files[0])}/>
            <HStack>
                <Image
                borderRadius="full"
                boxSize="150px"
                src={state.pic}
                
                />
                {edit ? <Button isLoading={isLoading1} onClick={()=>inputRef.current.click()} ><EditIcon/></Button>: <></>}
            </HStack>
            

            <InputGroup p={3}>
                <InputLeftAddon children="First Name" />
                <Input type="text" placeholder="First Name"  value={first_name}  onChange={(e)=>setFirst_name(e.target.value)}  isDisabled={!edit} />
            </InputGroup>

            <InputGroup p={3}>
                <InputLeftAddon children="Last Name" />
                <Input type="text" placeholder="Last Name"  value={last_name} onChange={(e)=>setLast_name(e.target.value)} isDisabled={!edit} />
            </InputGroup>

            <InputGroup p={3}>
                <InputLeftAddon children="Birth Day" />
                <Input type="date" placeholder="Birth Day"  value={dob} onChange={(e)=>setDOB(e.target.value)} isDisabled={!edit} />
            </InputGroup>

            <InputGroup p={3}>
                <InputLeftAddon children="Religion" />
                <Select placeholder="religion" color="black" value={religion} onChange={(e)=>setReligion(e.target.value)} isDisabled={!edit}>
                        <option value="Buddhism">Buddhism</option>
                        <option value="Hindu">Hindu</option>
                        <option value="Islam">Islam</option>
                        <option value="Catholic">Catholic</option>
                        <option value="">None</option>
                </Select>
            </InputGroup>

            <InputGroup p={3}>
                <InputLeftAddon children="Country" />
                {!edit ? <Input type="text" placeholder="Country"  value={country} onChange={(e)=>setCountry(e.target.value)} isDisabled={!edit} /> :
                <Autocomplete style={{width:"100%" ,height:"40px", padding:"10px",  borderRadius:"5px", borderColor:"grey", borderWidth:"1px"}}
                         apiKey={"AIzaSyChMTwAb_hWwYdvcM_gSGcx84k_al-EtIA"}
                            onPlaceSelected={(place) => {
                                    setCountry(place.name)
                            }}

                            options={{
                                types: [],
                                fields:["ALL"]
                               
                            }}
                            defaultValue={country}
                     />}
            </InputGroup>

            <InputGroup p={3}>
                <InputLeftAddon children="Email" />
                <Input type="email" placeholder="Country"  value={email} onChange={(e)=>setEmail(e.target.value)} isDisabled={!edit}  />
            </InputGroup>



            <Flex flexDirection="row" justifyContent="space-between" padding="10" > 
                { !edit ? <Button leftIcon={<EditIcon /> } colorScheme="teal" variant="solid" onClick={()=>setEdit(true)} >
                Edit
                </Button>                
                : 
                <>
                <Button 
                leftIcon={<CheckIcon /> }
                isLoading={isLoading}
                loadingText="saving" colorScheme="teal" variant="solid" onClick={()=>updateData()}>
                Save
                </Button>
                {!isLoading ?  <Button leftIcon={<CloseIcon /> } colorScheme="teal" variant="solid" onClick={()=>setEdit(false)}>
                Cancel
                </Button> : <></>} 
                </>  
                } 
            </Flex>

         </Flex>

         <Flex flexDirection="column" justifyContent="center" width="80%" m={5} mx="auto" alignItems="center" p={5} boxShadow="dark-lg" >

                <Heading as="h3" size="lg" p={2}>
                    Do you need to change your password???
                </Heading>

               <Link to="/travelPlan/changePassword"> 
                <Button colorScheme="red" variant="solid" p={2} >
                    Click Here
                </Button>
                </Link>
         </Flex>
        
        </>
    )
}