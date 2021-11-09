import React,{useState} from 'react'
import {useHistory} from 'react-router-dom'
import {
    Box,
    useColorModeValue,
    SimpleGrid,
    GridItem,
    Stack,
    FormControl,
    FormLabel,
    Input,
    Button,
    Heading,
    useToast
    
  } from "@chakra-ui/react";
const SignUp  = ()=>{
    const history = useHistory()
    const [firstName,setFirstName] = useState("")
    const [lastName,setLastName] = useState("")
    const [dob, setDob]=useState("")
    const [password,setPasword] = useState("")
    const [email,setEmail] = useState("")
    
    const toast=useToast()

    // useEffect(()=>{
    //     if(url){
    //         uploadFields()
    //     }
    // },[url])
    // const uploadPic = ()=>{
    //     const data = new FormData()
    //     data.append("file",image)
    //     data.append("upload_preset","new-insta")
    //     data.append("cloud_name","cnq")
    //     fetch("https://api.cloudinary.com/v1_1/cnq/image/upload",{
    //         method:"post",
    //         body:data
    //     })
    //     .then(res=>res.json())
    //     .then(data=>{
    //        setUrl(data.url)
    //     })
    //     .catch(err=>{
    //         console.log(err)
    //     })
    // }
    const postData = ()=>{
        if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
            toast({
                title: "Add admin.",
                description: "invalid email.",
                status: "error",
                duration: 7000,
                isClosable: true,
              })
            return
        }
        fetch("/admin/signup",{
            method:"post",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                firstname:firstName,
                lastname:lastName,
                dob,
                password,
                email,
            
            })
        }).then(res=>res.json())
        .then(data=>{
           if(data.error){
            toast({
                title: "Add admin.",
                description: data.error,
                status: "error",
                duration: 7000,
                isClosable: true,
              })
           }
           else{
            toast({
                title: "Add admin.",
                description: data.message,
                status: "success",
                duration: 7000,
                isClosable: true,
              })
               history.push('/admin/viewAdmins')
           }
        }).catch(err=>{
            console.log(err)
        })
    }
    

   return (
      <>
      
      <>
                    <Box bg={useColorModeValue("gray.50", "inherit")} p={10}>
                    
                    <Box visibility={{ base: "hidden", sm: "visible" }} aria-hidden="true">
                        <Box py={5}>
                        <Box
                            borderTop="solid 1px"
                            borderTopColor={useColorModeValue("gray.200", "whiteAlpha.200")}
                        ></Box>
                        <Heading>Fill the form</Heading>
                        </Box>
                    </Box>

                    <Box mt={[10, 0]}>
                        
                        <SimpleGrid
                        display={{ base: "initial", md: "grid" }}
                        columns={{ md: 3 }}
                        spacing={{ md: 6 }}
                        >
                        
                        <GridItem mt={[5, null, 0]} colSpan={{ md: 2 }}>
                            
                            <Stack
                                px={4}
                                py={5}
                                p={[null, 6]}
                                bg={useColorModeValue("white", "gray.700")}
                                spacing={6}
                            >
                                <SimpleGrid columns={6} spacing={6}>
                                <FormControl as={GridItem} colSpan={[6, 3]}>
                                    <FormLabel
                                    htmlFor="first_name"
                                    fontSize="sm"
                                    fontWeight="md"
                                    color={useColorModeValue("gray.700", "gray.50")}
                                    >
                                    First name
                                    </FormLabel>
                                    <Input
                                    type="text"
                                    name="first_name"
                                    id="first_name"
                                    autoComplete="given-name"
                                    mt={1}
                                    focusBorderColor="brand.400"
                                    shadow="sm"
                                    size="sm"
                                    w="full"
                                    rounded="md"
                                    value={firstName}
                                    onChange={(e)=>setFirstName(e.target.value)}
                                    />
                                </FormControl>

                                <FormControl as={GridItem} colSpan={[6, 3]}>
                                    <FormLabel
                                    htmlFor="last_name"
                                    fontSize="sm"
                                    fontWeight="md"
                                    color={useColorModeValue("gray.700", "gray.50")}
                                    >
                                    Last name
                                    </FormLabel>
                                    <Input
                                    type="text"
                                    name="last_name"
                                    id="last_name"
                                    autoComplete="family-name"
                                    mt={1}
                                    focusBorderColor="brand.400"
                                    shadow="sm"
                                    size="sm"
                                    w="full"
                                    rounded="md"
                                    value={lastName}
                                    onChange={(e)=>setLastName(e.target.value)}
                                    />
                                </FormControl>

                                <FormControl as={GridItem} colSpan={[6, 3]}>
                                    <FormLabel
                                    htmlFor="email_address"
                                    fontSize="sm"
                                    fontWeight="md"
                                    color={useColorModeValue("gray.700", "gray.50")}
                                    >
                                    Email address
                                    </FormLabel>
                                    <Input
                                    type="text"
                                    name="email_address"
                                    id="email_address"
                                    autoComplete="email"
                                    mt={1}
                                    focusBorderColor="brand.400"
                                    shadow="sm"
                                    size="sm"
                                    w="full"
                                    rounded="md"
                                    value={email}
                                    onChange={(e)=>setEmail(e.target.value)}
                                    />
                                </FormControl>

                                <FormControl as={GridItem} colSpan={6,3}>
                                    <FormLabel
                                    htmlFor="password"
                                    fontSize="sm"
                                    fontWeight="md"
                                    color={useColorModeValue("gray.700", "gray.50")}
                                    >
                                    Password
                                    </FormLabel>
                                    <Input
                                    type="password"
                                    name="password"
                                    id="password"
                                    autoComplete="email"
                                    mt={1}
                                    focusBorderColor="brand.400"
                                    shadow="sm"
                                    size="sm"
                                    w="full"
                                    rounded="md"
                                    value={password}
                                    onChange={(e)=>setPasword(e.target.value)}
                                    />
                                </FormControl>

                                

                                <FormControl as={GridItem} colSpan={6,3}>
                                    <FormLabel
                                    htmlFor="dob"
                                    fontSize="sm"
                                    fontWeight="md"
                                    color={useColorModeValue("gray.700", "gray.50")}
                                    >
                                    Birthday
                                    </FormLabel>
                                    <Input
                                    type="date"
                                    name="Date of Birth"
                                    id="dob"
                                    autoComplete="dob"
                                    mt={1}
                                    focusBorderColor="brand.400"
                                    shadow="sm"
                                    size="sm"
                                    w="full"
                                    rounded="md"
                                    value={dob}
                                    onChange={(e)=>setDob(e.target.value)}
                                    max={`${(new Date()).getFullYear()}-${(new Date()).getMonth()}-${(new Date()).getDate()}`}
                                    />
                                </FormControl>

                                
                                </SimpleGrid>
                            </Stack>
                            <Box
                                px={{ base: 4, sm: 6 }}
                                py={3}
                                bg={useColorModeValue("gray.50", "gray.900")}
                                textAlign="right"
                            >
                                <Button
                            
                                colorScheme="blue"
                                _focus={{ shadow: "" }}
                                fontWeight="md"
                                onClick={()=>postData()}
                                >
                                Save
                                </Button>
                            </Box>
                           
                        </GridItem>
                        </SimpleGrid>
                    </Box>

                    <Box visibility={{ base: "hidden", sm: "visible" }} aria-hidden="true">
                        <Box py={5}>
                        <Box
                            borderTop="solid 1px"
                            borderTopColor={useColorModeValue("gray.200", "whiteAlpha.200")}
                        ></Box>
                        </Box>
                    </Box>

                    
                    </Box>
      </>
      
      
      </>
   )
}


export default SignUp
