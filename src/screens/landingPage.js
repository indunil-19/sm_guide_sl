import React, { useState } from "react";
import {
  Text,
  Box,
  Flex,
  useColorModeValue,
  Image,
  HStack,
  Stack,
  Center,
  Button
} from "@chakra-ui/react";
import { Heading } from "@chakra-ui/layout";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";
import { Footer } from "../components/TravelPlanApp/Footer";
import { Footer2 } from "../components/TravelPlanApp/Footer2";


const TravelApp=()=>{    
  const arrowStyles = {
    cursor: "pointer",
    pos: "absolute",
    top: "50%",
    w: "auto",
    mt: "-22px",
    p: "16px",
    color: "white",
    fontWeight: "bold",
    fontSize: "18px",
    transition: "0.6s ease",
    borderRadius: "0 3px 3px 0",
    userSelect: "none",
    _hover: {
      opacity: 0.8,
      bg: "black",
    },
  };

  const slides = [
    {
      img:
        "https://images.unsplash.com/photo-1606326128683-60ff4212127e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      label: "Smart Guide",
      description: "New way to plan your trip.",
    },
    {
      img:
        "https://images.unsplash.com/photo-1536560328749-3dd331d32a05?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      label: "It's free",
      description: "",
    },
    {
      img:
        "https://images.unsplash.com/photo-1622061750348-18a9a34d329f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=889&q=80",
      label: "Third Slide",
      description:
        "Praesent commodo cursus magna, vel scelerisque nisl consectetur.",
    },
    {
      img:
        "https://images.unsplash.com/photo-1607672996533-98ec2fb71625?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1347&q=80",
      label: "Fourth Slide",
      description: "Nulla vitae elit libero, a pharetra augue mollis interdum.",
    },
    {
      img:
        "https://images.unsplash.com/photo-1621271407944-fed854709efc?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=746&q=80",
      label: "Fifth Slide",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  const slidesCount = slides.length;

  const prevSlide = () => {
    setCurrentSlide((s) => (s === 0 ? slidesCount - 1 : s - 1));
  };
  const nextSlide = () => {
    setCurrentSlide((s) => (s === slidesCount - 1 ? 0 : s + 1));
  };
  const setSlide = (slide) => {
    setCurrentSlide(slide);
  };
  const carouselStyle = {
    transition: "all .5s",
    ml: `-${currentSlide * 100}%`,
  };

  return (
    <>
    <Center  h="100px" color="white" fontSize="50px">
      <Heading>
        <Image src="https://res.cloudinary.com/dm36weewi/image/upload/v1636177256/logo_fydibn.jpg" height="100px" />
      </Heading>
    </Center>
    <Flex
      w="full"
      bg={useColorModeValue("gray.200", "gray.600")}
      p={3}
      alignItems="center"
      justifyContent="center"
    >
      <Flex w="full" pos="relative" overflow="hidden">
        <Flex h="650px" w="full" {...carouselStyle}>
          {slides.map((slide, sid) => (
            <Box key={`slide-${sid}`} boxSize="full" shadow="md" flex="none">
              <Text
                color="white"
                fontSize="xs"
                p="8px 12px"
                pos="absolute"
                top="0"
              >
                {sid + 1} / {slidesCount}
              </Text>
              <Image src={slide.img} boxSize="full" backgroundSize="cover" objectFit="cover" />
              <Stack
                p="8px 12px"
                pos="absolute"
                bottom="24px"
                textAlign="center"
                w="full"
                mb="8"
                color="white"
              >
                <Text fontSize="2xl">{slide.label}</Text>
                <Text fontSize="lg">{slide.description}</Text>
              </Stack>
            </Box>
          ))}
        </Flex>
        <Text {...arrowStyles} left="0" onClick={prevSlide}>
          &#10094;
        </Text>
        <Text {...arrowStyles} right="0" onClick={nextSlide}>
          &#10095;
        </Text>
        <HStack justify="center" pos="absolute" bottom="8px" w="full">
          {Array.from({ length: slidesCount }).map((_, slide) => (
            <Box
              key={`dots-${slide}`}
              cursor="pointer"
              boxSize={["7px", , "15px"]}
              m="0 2px"
              bg={currentSlide === slide ? "blackAlpha.800" : "blackAlpha.500"}
              rounded="50%"
              display="inline-block"
              transition="background-color 0.6s ease"
              _hover={{ bg: "blackAlpha.800" }}
              onClick={() => setSlide(slide)}
            ></Box>
          ))}
        </HStack>
      </Flex>
    </Flex>
    
    
    <Box flexDirection="column" display="flex" p={10} mt="-350px" alignItems="center">
    <Button rightIcon={<ArrowForwardIcon />} mx="auto" colorScheme="teal" variant="solid" size="lg" mb={5}>
       Download App form Here
    </Button>
    <Link to="/travelPlan" >
      <Button rightIcon={<ArrowForwardIcon />} mx="auto" colorScheme="teal" variant="solid" size="lg">
        Vist our Web site
      </Button>
    </Link>
    </Box>

    <Footer/>
    <Footer2/>
    
    </>
  );
            
          }

export default TravelApp;