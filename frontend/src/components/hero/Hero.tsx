import { Title, Text, Button, Container, Stack, Group } from '@mantine/core';

export function Hero() {
  return (
    <div style={{ minHeight: '470px', paddingTop: '60px' }}>
      <Container size="md">
        <Stack align="center" gap="xl">
          
          <Title c="text.2" fz="5rem" fw={900} ta="center">
            Noah Belstad
          </Title>
          
          <Text c="text.5" size="lg" maw={600} ta="center">
            Building robust backends with Kotlin & Spring Boot, and responsive frontends with React & Mantine.
          </Text>

          <Group justify="center" gap="md" mt={20}>
            <Button 
              component="a"
              href="https://github.com/noahbelstad" 
              target="_blank"
              size="xl" 
              variant="outline" 
              color="primary" 
              radius="xl"
            >
              View my github
            </Button>
            
            <Button 
              component="a"
              href="/contact"
              size="xl" 
              variant="outline" 
              color="primary" 
              radius="xl"
            >
              Contact me
            </Button>
          </Group>
        </Stack>
      </Container>
    </div>
  );
}