import { useRef } from 'react';
import { Carousel } from '@mantine/carousel';
import { Card, Image, Text, Badge, Group, Button, Container, Title } from '@mantine/core';
import AutoScroll from 'embla-carousel-auto-scroll';
import '@mantine/carousel/styles.css';

const PROJECTS_DATA = [
  { id: 1, title: "Project Alpha", description: "Spring Boot & React.", tag: "Kotlin" },
  { id: 2, title: "Project Beta", description: "Python WebSockets.", tag: "Python" },
  { id: 3, title: "Project Gamma", description: "Lua Game Scripts.", tag: "Lua" },
  { id: 4, title: "Project Delta", description: "Mantine Portfolio.", tag: "React" },
  { id: 5, title: "Project Epsilon", description: "Fullstack App.", tag: "TypeScript" },
];

export function ProjectCarousel() {
  const autoScroll = useRef(
    AutoScroll({ 
      speed: 0.7,          
      stopOnInteraction: false, 
      stopOnMouseEnter: true 
    })
  );

  return (
    <Container size="xl" py={20}>
      <Title order={2} mb="xl" c="white" fz="2rem">
        Featured Projects
      </Title>

      <Carousel
        vars={(theme) => ({
          root: {
            '--carousel-height': '430px',
            [`@media (min-width: ${theme.breakpoints.sm})`]: { '--carousel-height': '480px' },
            [`@media (min-width: ${theme.breakpoints.md})`]: { '--carousel-height': '550px' },
          },
        })}
        height="var(--carousel-height)"
        slideSize={{ base: '100%', sm: '50%', md: '45%' }}
        slideGap="md"
        withControls={false}
        draggable={true}
        plugins={[autoScroll.current]}

        emblaOptions={{
          loop: true,
          dragFree: true,
          align: 'start',
        }}
      >
        {PROJECTS_DATA.map((project) => (
          <Carousel.Slide key={project.id}>
            <Card shadow="md" padding="lg" radius="md" withBorder h="100%">
              <Card.Section>
                <Image
                  src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-8.png"
                  h={{ base: 160, sm: 220, md: 240 }}
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