import { Box,HStack } from "@chakra-ui/layout"
import { Button ,Heading, Menu,MenuButton,MenuList,MenuItem,MenuItemOption,MenuGroup,MenuOptionGroup,MenuIcon,MenuCommand,MenuDivider,Image} from "@chakra-ui/react"
import { FaUserCircle} from "react-icons/fa";
import {Link} from "react-router-dom"
import { TravelContext } from "../../context/TravelContext";
import { useHistory } from "react-router";
import { useContext } from "react";

const NavBar=()=>{
    const {state,dispatch} = useContext(TravelContext)
     const history = useHistory()

     const logout=()=>{
         fetch("/api/logout").then(res=>res.json()).
         then(result=>console.log(result)).
         catch(e=>{
             console.log(e)
         })
     }
    return (
        <>
        
        <Box width="full" boxShadow="xl" p="6" bg="white" height="75px" position="fixed" zIndex="9">
        <HStack spacing="24px" justifyContent="space-between" alignItems="center"> 
            <Box>

            {state && state._id ? <>
                <Link to="/travelPlan">
                    {/* <Heading>Travel Guide</Heading> */}
                    <Image src="https://res.cloudinary.com/dm36weewi/image/upload/v1636177256/logo_fydibn.jpg" mt="-5" />
                </Link> 
            
            </>:
            <>
                <Link >
                     <Image src="https://res.cloudinary.com/dm36weewi/image/upload/v1636177256/logo_fydibn.jpg" mt="-5" />
                </Link> 
            
            </>}   
            
            </Box>
            <Box>
                
                {state && state._id ? <><NavBarAccountItem name={state ? state.firstname+" "+ state.lastname  : ""}  country={state ? state.country : ""}/>
                          <Button colorScheme="teal" variant="outline" onClick={()=>{
                              logout()
                              localStorage.clear()
                              dispatch({type:"CLEAR"})
                              history.push('/travelPlan/signin')
                          }}>
                                Sign out
                            </Button>

                           
                         </>
                    :
                         <>
                        <Link to="/travelPlan/signin">
                            <Button colorScheme="teal" variant="outline">
                                Sign in
                            </Button>

                        </Link>
                
                
                         </>
                }
                    
            </Box>
            
        </HStack>
        </Box>
        <Box width="full" boxShadow="xl" p="6" bg="white" height="75px">
        </Box>        
        </>
    )
}

export default NavBar



const NavBarAccountItem=({name,country})=>{
    return(
        <>
        
        <Menu >
                <MenuButton mr={3}
                    px={2}
                    py={2}
                    transition="all 0.2s"
                    borderRadius="full"
                    borderWidth="1px"
                    _hover={{ bg: "gray.400" }}
                    _expanded={{ bg: "blue.400" }}
                    _focus={{ boxShadow: "outline" }}
                >
                    < FaUserCircle />
                </MenuButton>
                <MenuList>

                    <MenuItem isDisabled={true}>{name}</MenuItem>
                    <MenuItem isDisabled={true}>{country}</MenuItem>
                    
                    <MenuDivider />

                    <Link to="/travelPlan/myAccount"><MenuItem >My Account</MenuItem></Link>
                    <Link to="/travelPlan/myplans"><MenuItem>My travel Plans</MenuItem></Link>
                    
                </MenuList>
        </Menu>
        
        
        
        </>
    )
}