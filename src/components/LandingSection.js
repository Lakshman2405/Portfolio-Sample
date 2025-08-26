import React from "react";
import { Avatar, Heading, VStack, Text } from "@chakra-ui/react";
import FullScreenSection from "./FullScreenSection";
import mypic from "../images/lakshman1.jpg";

const greeting = "Hello, I am Lakshman Guru Sai!";
const bio1 = "A frontend developer specialised in React";

const LandingSection = () => (
  <FullScreenSection
    justifyContent="center"
    alignItems="center"
    isDarkBackground
    backgroundColor="#2A4365"
  >
    <VStack spacing={6} align="center">
      <Avatar 
        src={mypic}
        size="2xl" 
        name="Lakshman Guru Sai" 
      />
      <Heading as="h1" size="xl" color="white">
        {greeting}
      </Heading>
      <VStack spacing={2}>
        <Text fontSize="lg" color="white">
          {bio1}
        </Text>
      </VStack>
    </VStack>
  </FullScreenSection>
);

export default LandingSection;