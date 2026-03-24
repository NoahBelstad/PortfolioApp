import { useRef } from 'react';
import { Carousel } from '@mantine/carousel';
import { Card, Image, Text, Badge, Group, Button, Container, Title } from '@mantine/core';
import Autoplay from 'embla-carousel-autoplay';
import '@mantine/carousel/styles.css';

const PROJECTS_DATA = [
  { id: 1, title: "Project Alpha", description: "Spring Boot & React.", tag: "Kotlin" },
  { id: 2, title: "Project Beta", description: "Python WebSockets.", tag: "Python" },
  { id: 3, title: "Project Gamma", description: "Lua Game Scripts.", tag: "Lua" },
  { id: 4, title: "Project Delta", description: "Mantine Portfolio.", tag: "React" },
  { id: 5, title: "Project Epsilon", description: "Fullstack App.", tag: "TypeScript" },
];

export function ProjectCarousel() {
  const autoplay = useRef(Autoplay({ delay: 3000 }));

  return (
    <Container size="lg" py={50}>
      <Title order={2} mb="xl" c="white" fz="2rem">
        Featured Projects
      </Title>

      <Carousel
        height="auto"
        slideSize={{ base: '100%', sm: '50%', md: '25%' }}
        slideGap="md"
        // In Mantine v7, these are direct props:

        emblaOptions={{
            loop: true,
            dragFree: false,
            align: 'center'
        }}

        // Plugins are passed as an array
        plugins={[autoplay.current]}
        // Use arrow functions for stability in TS
        onMouseEnter={() => autoplay.current.stop()}
        onMouseLeave={() => autoplay.current.play()}
      >
        {PROJECTS_DATA.map((project) => (
          <Carousel.Slide key={project.id}>
            <Card shadow="md" padding="lg" radius="md" withBorder h="100%">
              <Card.Section>
                <Image
                  src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-8.png"
                  height={160}
                  alt={project.title}
                />
              </Card.Section>

              <Group justify="space-between" mt="md" mb="xs">
                <Text fw={700} c="white">{project.title}</Text>
                <Badge color="blue" variant="light">{project.tag}</Badge>
              </Group>

              <Text size="sm" c="dimmed" mb="md">
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