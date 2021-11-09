import NavBar from "../../components/navbar";
import 'bootstrap/dist/css/bootstrap.min.css'
import { CCard } from "@coreui/react";
import { Fade } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css'
import { Slide } from 'react-slideshow-image';
import Widgets from "../../components/Widget";
//import image from '../../public/images/
import {
    Stat,SimpleGrid,Link,
    StatLabel,
    StatNumber,
    StatHelpText,
    StatArrow,
    StatGroup,Heading,Button
  } from "@chakra-ui/react"
import { CProgress } from "@coreui/react";
import { CProgressBar } from "@coreui/react";
const Dashboard=()=>{
    return(
        <>
        
        <Slideshow/>
       
        {/* <StatGroup bg="white" p="5" boxShadow="dark-lg">
        <Stat>
            <StatLabel>Number of Admin online</StatLabel>
            <StatNumber>30</StatNumber>
            <StatHelpText>
            <StatArrow type="increase" />
            25%
            <CProgress className="mb-3">
    <CProgressBar value={25}/>
  </CProgress>
            </StatHelpText>
        </Stat>

        <Stat >
            <StatLabel>Number of Admin Offline</StatLabel>
            <StatNumber>120</StatNumber>
            <StatHelpText>
            <StatArrow type="decrease" />
           75 %
           <CProgress className="mb-3">
    <CProgressBar value={75}/>
  </CProgress>
            </StatHelpText>
        </Stat>
        </StatGroup>
        <StatGroup bg="white" p="5" boxShadow="dark-lg">
        <Stat>
            <StatLabel>Number of Downloads</StatLabel>
            <StatNumber>1000000</StatNumber>
            <StatHelpText>
            <StatArrow type="increase" />
            
            
            </StatHelpText>
        </Stat>

        <Stat >
            <StatLabel>Number of Users</StatLabel>
            <StatNumber>100000</StatNumber>
            <StatHelpText>
            <StatArrow type="decrease" />
          
            </StatHelpText>
        </Stat>
        </StatGroup>
        <StatGroup bg="white" p="5" boxShadow="dark-lg">
        <Stat>
            <StatLabel>Number of time reprts download as pdf</StatLabel>
            <StatNumber>1000000</StatNumber>
            <StatHelpText>
            <StatArrow type="increase" />
            
            
            </StatHelpText>
        </Stat>

        <Stat >
            <StatLabel>Number of time Generatereports</StatLabel>
            <StatNumber>100000</StatNumber>
            <StatHelpText>
            <StatArrow type="decrease" />
            <Button ><Link to={`/admin/genarate/`}>Generatereports</Link></Button>
          
            </StatHelpText>
        </Stat>
        </StatGroup> */}

        </>
    )
}

const slideImages = [
    {
      url: '/background1.jpg',
      caption: 'Welcome'
    },
    {
      url: 'https://images.unsplash.com/photo-1507237998874-b4d52d1dd655?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1yZWxhdGVkfDR8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=900&q=60',
      caption: 'Take features'
    },
    {
      url: 'https://images.unsplash.com/photo-1627875764093-315831ac12f7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1yZWxhdGVkfDJ8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=900&q=60',
      caption: 'Have A Nice Day'
    },
    {
      url: 'https://images.unsplash.com/photo-1571432248690-7fd6980a1ae2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1yZWxhdGVkfDl8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=900&q=60',
      caption: 'Bye'
    },
    {
      url: 'https://images.unsplash.com/photo-1612852098516-55d01c75769a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1yZWxhdGVkfDR8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=900&q=60',
      caption: 'Welcome Back'
    },
    
  ];
  
  const Slideshow = () => {
      return (
        <div className="slide-container" style={{height:"100vh"}}>
          <Slide>
           {slideImages.map((slideImage, index)=> (
              <div className="each-slide" key={index}>
                <div style={{'backgroundImage': `url(${slideImage.url})`,height:"100vh",objectFit:"cover"}}>
                <Heading fontSize={{ base: '3xl', md: '4xl', lg: '5xl' }} style={{textAlign: 'center',paddingTop:"200px"}}>
                  {slideImage.caption}
                </Heading>
                </div>
              </div>
            ))} 
          </Slide>
        </div>
      )
  }
  
export default Dashboard;