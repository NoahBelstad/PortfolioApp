import { useRef, useEffect, useState } from 'react';
import { Carousel } from '@mantine/carousel';
import { Card, Image, Text, Badge, Group, Button, Container, Title, Loader, Center } from '@mantine/core';
import AutoScroll from 'embla-carousel-auto-scroll';
import '@mantine/carousel/styles.css';

interface Project {
  id: number;
  title: string;
  description: string;
  tag: string;
}

const MOCK_DATA: Project[] = [
  { id: 1, title: "Project Alpha", description: "Spring Boot & React.", tag: "Kotlin" },
  { id: 2, title: "Project Beta", description: "Python WebSockets.", tag: "Python" },
  { id: 3, title: "Project Gamma", description: "Lua Game Scripts.", tag: "Lua" },
  { id: 4, title: "Project Delta", description: "Mantine Portfolio.", tag: "React" },
];

export function ProjectCarousel() {
  // Fix 1: Pass the Project interface to useState
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  const autoScroll = useRef(
    AutoScroll({ speed: 0.7, stopOnInteraction: false, stopOnMouseEnter: true })
  );

  useEffect(() => {
    // Replace 'your-github-username' with your actual username
    fetch('http://localhost:8080/api/v1/github/your-github-username')
      .then((res) => {
        if (!res.ok) throw new Error('Network response was not ok');
        return res.json();
      })
      .then((data) => {
        setProjects(data.length > 0 ? data : MOCK_DATA);
        setLoading(false);
      })
      .catch((err) => {
        console.warn("Backend unreachable, using mock data:", err);
        setProjects(MOCK_DATA);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <Center h={400}><Loader color="blue" /></Center>;
  }

  return (
    <Container size="xl" py={50}>
      <Title order={2} mb="xl" c="white" fz="2rem">Featured Projects</Title>

      <Carousel
        vars={(theme) => ({
          root: {
            '--carousel-height': '420px',
            [`@media (min-width: ${theme.breakpoints.sm})`]: { '--carousel-height': '480px' },
            [`@media (min-width: ${theme.breakpoints.md})`]: { '--carousel-height': '550px' },
          },
        })}
        height="var(--carousel-height)"
        slideSize={{ base: '100%', sm: '50%', md: '33.333333%' }}
        slideGap="md"
        draggable
        withControls
        plugins={[autoScroll.current]}
        emblaOptions={{ dragFree: true, align: 'start', loop: true }}
      >
        {/* Fix 2: Remove ': any' as it's now typed via the state */}
        {projects.map((project) => (
          <Carousel.Slide key={project.id}>
            <Card shadow="md" padding="lg" radius="md" withBorder h="100%">
              <Card.Section>
                <Image
                  src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-8.png"
                  h={{ base: 160, sm: 200, md: 250 }}
                  alt={project.title}
                />
              </Card.Section>

              <Group justify="space-between" mt="md" mb="xs">
                <Text fw={700} c="white" fz="lg">{project.title}</Text>
                <Badge color="blue" variant="light">{project.tag}</Badge>
              </Group>

              <Text size="sm" c="dimmed" mb="md" lineClamp={2}>
                {project.description}
              </Text>

              <Button color="blue" fullWidth radius="md" mt="auto">
                View Project
              </Button>
            </Card>
          </Carousel.Slide>
        ))}
      </Carousel>
    </Container>
  );
}