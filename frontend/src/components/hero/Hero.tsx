import { Title, Text, Button, Container } from '@mantine/core';

export function Hero() {
  return (
    <div style={{ position: 'relative', height: '600px', backgroundColor: '#1A1B1E' }}>
      <Container size="md" pt={150} style={{ position: 'relative', zIndex: 1 }}>
        <Title c="white" fz="4rem" fw={900}>
          Fullstack Developer
        </Title>
        <Text c="dimmed" mt="md" size="lg" maw={600}>
          Building robust backends with Kotlin & Spring Boot, and responsive frontends with React & Mantine.
        </Text>
        <Button size="xl" variant="gradient" gradient={{ from: 'blue', to: 'cyan' }} mt={40}>
          Check My Work
        </Button>
      </Container>
    </div>
  );
}