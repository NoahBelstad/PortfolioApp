import { useRef, useEffect, useState } from 'react';
import { Carousel } from '@mantine/carousel';
import { Card, Image, Text, Badge, Group, Button, Container, Title, Loader, Center } from '@mantine/core';
import AutoScroll from 'embla-carousel-auto-scroll';
import '@mantine/carousel/styles.css';

interface Project {
  name: string;
  description: string;
  url?: string;
  language?: string;
  previewUrl?: string | null;
  languageBreakdown?: Record<string, number>;
}

export function ProjectCarousel() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  const autoScroll = useRef(
    AutoScroll({ speed: 0.7, stopOnInteraction: false, stopOnMouseEnter: false })
  );

  useEffect(() => {
      fetch('http://localhost:8080/api/v1/github/noahbelstad')
        .then((res) => res.json())
        .then((data) => {
          console.log("Data from backend:", data);
          setProjects(data);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Fetch error:", err);
          setLoading(false);
        });
    }, []);

    if (loading) return <Center h={400}><Loader color="blue" /></Center>;

    return (
      <Container size="xl" py={50}>
        <Title order={2} mb="xl" c="white">Featured Projects</Title>
        <Carousel>
          {projects.map((project) => (
            <Carousel.Slide key={project.name}>
              <Card shadow="md" padding="lg" radius="md" withBorder h="100%">
                <Card.Section>
                  <Image
                    src={project.previewUrl || "https://placehold.co/600x400?text=No+Preview"}
                    height={220}
                    alt={project.name}
                    fit="cover"
                    fallbackSrc="https://placehold.co/600x400?text=Error+Loading+Image"
                  />
                </Card.Section>

                <Group justify="space-between" mt="md" mb="xs">
                  <Text fw={700} c="white" fz="lg">{project.name}</Text>
                  <Badge color="blue" variant="light">
                    {project.language || "Code"}
                  </Badge>
                </Group>

                <Text size="sm" c="dimmed" mb="md" lineClamp={2}>
                  {project.description || "No description provided for this repository."}
                </Text>

                <Button
                  component="a"
                  href={project.url}
                  target="_blank"
                  color="blue"
                  fullWidth
                  radius="md"
                  mt="auto"
                >
                  View on GitHub
                </Button>
              </Card>
            </Carousel.Slide>
          ))}
        </Carousel>
      </Container>
    );
  }