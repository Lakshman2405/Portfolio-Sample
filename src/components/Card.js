import { Image, Heading, Text, VStack, HStack, Box } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

const Card = ({ title, description, imageSrc }) => {
  return (
    <VStack 
      spacing={4} 
      align="start"
      p={4}
      borderWidth="1px"
      borderRadius="lg"
      bg="white"
      boxShadow="md"
      height="100%"
      width="100%"  // Added to ensure full width
    >
      {/* Image with multiple fallback strategies */}
      <Box width="100%" height="200px" position="relative">
        <Image
          src={imageSrc}
          alt={`${title} project screenshot`}
          borderRadius="lg"
          objectFit="cover"
          width="100%"
          height="100%"
          fallback={
            <Box 
              bg="gray.100" 
              width="100%" 
              height="100%"
              display="flex" 
              alignItems="center" 
              justifyContent="center"
              borderRadius="lg"
            >
              <Text color="gray.500">Loading project image...</Text>
            </Box>
          }
          onError={(e) => {
            e.target.src = "https://via.placeholder.com/300x200?text=Project+Image";
          }}
        />
      </Box>
      
      {/* Content with forced dark text */}
      <Box width="100%">
        <Heading size="md" color="black !important" mb={2}>
          {title}
        </Heading>
        <Text 
          color="gray.800" 
          fontSize="md"
          lineHeight="tall"
        >
          {description}
        </Text>
      </Box>

      {/* See more link */}
      <HStack 
        spacing={2} 
        align="center"
        width="100%"
        justifyContent="flex-end"
      >
        <Text 
          color="blue.500" 
          fontWeight="semibold"
          _hover={{ textDecoration: "underline" }}
        >
          See more
        </Text>
        <FontAwesomeIcon 
          icon={faArrowRight} 
          size="1x" 
          color="#3182ce" // Matching blue.500
        />
      </HStack>
    </VStack>
  );
};

export default Card;