import { Heading ,Flex,Text, HStack, VStack} from "@chakra-ui/layout"
import { Image,Button, ButtonGroup } from "@chakra-ui/react"
import { FaFacebook,FaTwitter, FaInstagram  } from "react-icons/fa"
export const About=()=>{
    return(
        <>
        
        <Flex justifyContent="center" boxShadow="dark-lg" alignItems="center" flexDirection="column" m={5} p={5} textAlign="center" width="80%" mx="auto">
            <Heading p={3}>About Us</Heading>
            <Text fontSize="2xl">We are 3rd year undergratuate students of university of moratuwa , department of computer scinece engineering. we are developing front end and backend of this travel plan system based on google maps api</Text>
            <Text fontSize="4xl" as="ins">Our Team</Text>
            <HStack spacing={10}>
            <Flex p={5}>
            <VStack>
            <Image
            borderRadius="full"
            boxSize="150px"
            src="https://media-exp1.licdn.com/dms/image/C5603AQF-DLgGlDqztg/profile-displayphoto-shrink_200_200/0/1614412651837?e=1640217600&v=beta&t=uapQlbTObo5bgjBVX-ydgxU2PLXnLCv1_TJedeUVOZk"
            alt="Segun Adebayo"
            />
            <Heading as="h5" size="sm">
                K.D.L.I.Udayangana
            </Heading>

            <Text fontSize="sm">Frontend and Backend Developer</Text>
            <Text fontSize="sm">https://www.linkedin.com/in/indunil-udayangana/</Text>
            
            </VStack>
            </Flex>

            <Flex p={5}>
            <VStack>
            <Image
            borderRadius="full"
            boxSize="150px"
            src="https://media-exp1.licdn.com/dms/image/C5103AQHmsIzl9wV5fA/profile-displayphoto-shrink_800_800/0/1583088050242?e=1640217600&v=beta&t=WaeUULXsmU6efwjAd7brmY7IvGMs4U-VVXXmZ3-tqVI"
            alt="Segun Adebayo"
            />
            <Heading as="h5" size="sm">
                Chirath Vandabona
            </Heading>

            <Text fontSize="sm">Mobile App Developer</Text>
            <Text fontSize="sm">https://www.linkedin.com/in/chirath-vandabona-6a4a33169/</Text>
        
            </VStack>
            </Flex>

            <Flex p={5}>
            <VStack>
            <Image
            borderRadius="full"
            boxSize="150px"
            src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
            alt="Segun Adebayo"
            />
            <Heading as="h5" size="sm">
                Subramamium Varathan
            </Heading>

            <Text fontSize="sm">Frontend Developer</Text>
            <Text fontSize="sm">https://www.linkedin.com/in/subramanijam-varatharajan/</Text>
            
            </VStack>
            </Flex>

            </HStack>
     
            <HStack my="60px">
            <Button colorScheme="facebook" leftIcon={<FaFacebook />}>
                Facebook
            </Button>
            <Button colorScheme="twitter" leftIcon={<FaTwitter />}>
                Twitter
            </Button>
            <Button colorScheme="red" leftIcon={<FaFacebook />}>
                Instergram
            </Button>
            </HStack>
     
        </Flex>

        
        
        </>
    )
}