import React from 'react';
import { 
  Box, 
  Button, 
  Heading, 
  Text,
  Alert,
  AlertIcon,
  useColorModeValue
} from '@chakra-ui/react';

// Create a wrapper component to use hooks
function ColorModeWrapper({ children }) {
  const bgColor = useColorModeValue('gray.50', 'gray.800');
  const borderColor = useColorModeValue('red.200', 'red.800');
  
  return children({ bgColor, borderColor });
}

export default class ErrorBoundary extends React.Component {
  state = { 
    hasError: false,
    error: null,
    errorInfo: null 
  };

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ errorInfo });
    console.error('Component Error:', error, errorInfo);
  }

  handleReset = () => {
    this.setState({ 
      hasError: false,
      error: null,
      errorInfo: null 
    });
  };

  render() {
    const { hasError, error, errorInfo } = this.state;

    if (hasError) {
      return (
        <ColorModeWrapper>
          {({ bgColor, borderColor }) => (
            <Box 
              p={6}
              m={4}
              borderWidth="1px"
              borderRadius="md"
              borderColor={borderColor}
              bg={bgColor}
              textAlign="center"
            >
              <Alert status="error" mb={4} borderRadius="md">
                <AlertIcon />
                Component Failed to Render
              </Alert>
              
              <Heading as="h3" size="md" mb={2}>
                {error?.toString() || 'Unknown Error'}
              </Heading>

              {this.props.showDetails && (
                <Box 
                  mt={4} 
                  p={3} 
                  bg="blackAlpha.100" 
                  borderRadius="md" 
                  textAlign="left"
                  fontSize="sm"
                >
                  <Text fontWeight="bold">Error Details:</Text>
                  <Text as="pre" whiteSpace="pre-wrap">
                    {errorInfo?.componentStack}
                  </Text>
                </Box>
              )}

              <Button
                colorScheme="red"
                variant="outline"
                mt={4}
                onClick={this.handleReset}
              >
                Try Again
              </Button>
              
              <Button
                ml={3}
                onClick={() => window.location.reload()}
              >
                Refresh Page
              </Button>
            </Box>
          )}
        </ColorModeWrapper>
      );
    }

    return this.props.children; 
  }
}