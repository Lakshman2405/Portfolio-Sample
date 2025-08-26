import React, { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import {
  faGithub,
  faLinkedin,
  faMedium,
  faStackOverflow,
} from "@fortawesome/free-brands-svg-icons";
import { Box, HStack } from "@chakra-ui/react";

const socials = [
  {
  icon: faEnvelope,
  url: "https://mail.google.com/mail/?view=cm&fs=1&to=lakshmangurusai24@gmail.com&su=Portfolio%20Contact",
  },
  {
    icon: faGithub,
    url: "https://github.com/Lakshman2405",
  },
  {
    icon: faLinkedin,
    url: "https://www.linkedin.com/in/sikhakolli-lakshman-guru-sai-808854300/recent-activity/all/",
  },
  {
    icon: faMedium,
    url: "https://medium.com",
  },
  {
    icon: faStackOverflow,
    url: "https://stackoverflow.com",
  },
];

const Header = () => {
  const [shouldHide, setShouldHide] = useState(false);
  const prevScrollY = useRef(0);

  const handleClick = (anchor) => () => {
    const id = `${anchor}-section`;
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY > prevScrollY.current && currentScrollY > 100) {
        // Scrolling down and past 100px threshold
        setShouldHide(true);
      } else {
        // Scrolling up
        setShouldHide(false);
      }
      
      prevScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <Box
      position="fixed"
      top={0}
      left={0}
      right={0}
      transform={shouldHide ? "translateY(-200px)" : "translateY(0)"}
      transitionProperty="transform"
      transitionDuration="0.3s"
      transitionTimingFunction="ease-in-out"
      backgroundColor="#18181b"
      zIndex={10}
    >
      <Box color="white" maxWidth="1280px" margin="0 auto">
        <HStack px={16} py={4} justifyContent="space-between" alignItems="center">
          <nav>
            <HStack spacing={4}>
              {socials.map((social, index) => (
                <a 
                  key={index}
                  href={social.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  aria-label={social.url.replace('https://', '').split('.')[0]}
                >
                  <FontAwesomeIcon icon={social.icon} size="2x" />
                </a>
              ))}
            </HStack>
          </nav>
          <nav>
            <HStack spacing={8}>
              <a 
                href="#projects" 
                onClick={handleClick("projects")}
                style={{ fontWeight: "bold" }}
              >
                Projects
              </a>
              <a 
                href="#contactme" 
                onClick={handleClick("contactme")}
                style={{ fontWeight: "bold" }}
              >
                Contact Me
              </a>
            </HStack>
          </nav>
        </HStack>
      </Box>
    </Box>
  );
};

export default Header;