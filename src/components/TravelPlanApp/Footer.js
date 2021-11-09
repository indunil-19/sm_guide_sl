import { Flex, HStack, VStack,Text ,Heading,Divider} from "@chakra-ui/layout"
import { Link } from "react-router-dom"
import { useHistory } from "react-router"

export const Footer=()=>{
    const history=useHistory()
    return(
        <>
        <Flex width="full" bg="black"  mt="165px" color="white" justifyContent="space-around" p={10}  >
             <VStack>
                <HStack spacing={10}>
                <VStack alignItems="start" spacing={8}>

                     
                     
                     <Heading as="h3" size="lg" cursor="pointer" onClick={()=>{
                            history.push("/travelPlan/about")
                     }}>
                        About Us
                    </Heading>
                 
                    

                    <Heading as="h3" size="lg" cursor="pointer" onClick={()=>{
                            history.push("/travelPlan/contact")
                    }}>
                        Contact Us
                    </Heading>
                  
                </VStack>

                <Divider orientation="vertical"   variant="solid" p={3}  />

                <VStack>
                     
                     <>

                     <iframe src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2FSL-Travellers-107617261719910%2F&tabs=messages%2C%20timeline%20&width=340&height=500&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=false&appId" width="340" height="500" style={{border:"none",overflow:"hidden"}} scrolling="no" frameborder="0" allowfullscreen="true" allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"></iframe>                    </>
                </VStack>
                </HStack>
                       <Divider  orientation="horizontal"   variant="solid" p={3}  />
                </VStack>
               
        </Flex>
       


        </>
    )
}