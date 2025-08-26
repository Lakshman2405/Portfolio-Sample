import React from "react";
import { SimpleGrid, Heading, Box, Skeleton, Alert, AlertIcon } from "@chakra-ui/react";
import FullScreenSection from "./FullScreenSection";
import Card from "./Card";

// Method 1: Direct imports (recommended)
import photo1 from "../images/p1.jpg";
import photo2 from "../images/p2.jpg";
import photo3 from "../images/p3.jpg";
import photo4 from "../images/p4.jpg";

// Method 2: Public folder fallback (alternative)
const publicImages = {
  photo1: process.env.PUBLIC_URL + "/images/p1.jpg",
  photo2: process.env.PUBLIC_URL + "/images/p2.jpg",
  photo3: process.env.PUBLIC_URL + "/images/p3.jpg",
  photo4: process.env.PUBLIC_URL + "/images/p4.jpg"
};

// Placeholder for missing images
const placeholderImage = "https://via.placeholder.com/400x300?text=Project+Image";

const projects = [
  {
    id: 1,
    title: "React Space",
    description: "AR components with Redux integration",
    getImageSrc: () => photo1 || publicImages.photo1 || placeholderImage,
    tags: ["React", "AR"]
  },
  {
    id: 2,
    title: "Infinite Scroll",
    description: "60 FPS virtualized scrolling",
    getImageSrc: () => photo2 || publicImages.photo2 || placeholderImage,
    tags: ["Performance"]
  },
  {
    id: 3,
    title: "Photo Gallery",
    description: "Monetization platform",
    getImageSrc: () => photo3 || publicImages.photo3 || placeholderImage,
    tags: ["React", "Commerce"]
  },
  {
    id: 4,
    title: "Event Planner",
    description: "Local activity discovery",
    getImageSrc: () => photo4 || publicImages.photo4 || placeholderImage,
    tags: ["Mobile"]
  }
];

// Error boundary for the entire section
class ProjectsSectionBoundary extends React.Component {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Projects Section Error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <Box p={8} bg="red.50" borderRadius="md">
          <Alert status="error">
            <AlertIcon />
            Failed to load projects section. Please refresh the page.
          </Alert>
        </Box>
      );
    }

    return this.props.children;
  }
}

const ProjectsSection = () => {
  const [imagesLoaded, setImagesLoaded] = React.useState(false);

  React.useEffect(() => {
    // Preload images
    const loadImages = async () => {
      try {
        await Promise.all(
          projects.map(project => {
            const img = new Image();
            img.src = project.getImageSrc();
            return new Promise((resolve, reject) => {
              img.onload = resolve;
              img.onerror = reject;
            });
          })
        );
        setImagesLoaded(true);
      } catch (error) {
        console.warn("Some images failed to load:", error);
        setImagesLoaded(true); // Still show content even if some images fail
      }
    };

    loadImages();
  }, []);

  return (
    <ProjectsSectionBoundary>
      <FullScreenSection
        as="section"
        backgroundColor="#14532d"
        isDarkBackground
        px={{ base: 4, md: 8 }}
        py={16}
        id="projects"
      >
        <Box maxW="1280px" mx="auto" w="full">
          <Heading as="h2" size="xl" color="white" mb={12}>
            Featured Projects
          </Heading>

          {!imagesLoaded ? (
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
              {projects.map((project) => (
                <Skeleton key={project.id} height="400px" borderRadius="md" />
              ))}
            </SimpleGrid>
          ) : (
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
              {projects.map((project) => (
                <Card
                  key={project.id}
                  title={project.title}
                  description={project.description}
                  imageSrc={project.getImageSrc()}
                  tags={project.tags}
                />
              ))}
            </SimpleGrid>
          )}
        </Box>
      </FullScreenSection>
    </ProjectsSectionBoundary>
  );
};

export default ProjectsSection;