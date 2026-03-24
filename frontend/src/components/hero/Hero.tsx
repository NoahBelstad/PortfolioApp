import { Container, Title, Text, Button, Group, Stack } from '@mantine/core';

export function Hero() {
  return (
    <Container size="lg" pt={20} pb={40}>
      <Stack align="center" gap="xl">
        <Stack align="center" gap={10}>
          <Title 
            order={1} 
            style={{ 
              textAlign: 'center', 
              lineHeight: 1.1, 
              fontWeight: 800,
              // Fixes the TypeScript error and ensures scaling
              fontSize: 'clamp(3.5rem, 10vw, 6rem)', 
            }}
          >
            Noah Belstad
            <Text 
              component="span" 
              inherit={false} 
              c="white"
              style={{ 
                display: 'block', 
                // Scales the subtitle proportionally
                fontSize: 'clamp(1.2rem, 3vw, 1.8rem)', 
                fontWeight: 500,
                marginTop: '0.5rem'
              }}
            >
              Fullstack Developer
            </Text>
          </Title>
          
          <Text 
            size="xl" 
            c="dimmed" 
            style={{ 
              maxWidth: 600, 
              textAlign: 'center',
              // Makes the description text slightly more readable on small screens
              fontSize: 'clamp(1rem, 2vw, 1.25rem)' 
            }}
          >
            15 year old Fullstack developer, developing websites and applications for fun! 
            I have experience with React, Kotlin (Spring Boot), Lua and Python. 
            I am passionate about learning new technologies and improving my skills.
          </Text>
        </Stack>

        <Group justify="center">
          <Button size="lg" radius="xl" color="blue">
            Check my GitHub
          </Button>
          <Button size="lg" radius="xl" variant="outline" color="blue">
            Download CV
          </Button>
        </Group>
      </Stack>
    </Container>
  );
}