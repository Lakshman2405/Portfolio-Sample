import { ChakraProvider, Box, VStack } from '@chakra-ui/react';
import Header from './components/Header';
import LandingSection from './components/LandingSection';
import ProjectsSection from './components/ProjectsSection';
import ContactMeSection from './components/ContactMeSection';
import Footer from './components/Footer';
import { AlertProvider } from './context/alertContext';
import Alert from './components/Alert';
import ErrorBoundary from './components/ErrorBoundary';

function App() {
  return (
    <ChakraProvider>
      <AlertProvider>
        <Box minH="100vh" display="flex" flexDirection="column">
          <Header />
          <Box as="main" flex="1" py={8}>
            <VStack spacing={12} align="stretch">

              
              <ErrorBoundary>
                <LandingSection />
              </ErrorBoundary>
              
              <ErrorBoundary>
                <ProjectsSection />
              </ErrorBoundary>
              
              <ErrorBoundary>
                <ContactMeSection />
              </ErrorBoundary>
            </VStack>
          </Box>
          <Footer />
          <Alert />
        </Box>
      </AlertProvider>
    </ChakraProvider>
  );
}

export default App;