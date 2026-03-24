import { AppShell, Container, Group, Text, Button, Box } from '@mantine/core';

export function Header() {
  return (
    <AppShell.Header>
      <Container size="lg" h="100%">
        <Group justify="space-between" h="100%">

          {/* Logo Section */}
          <Group gap="xs">
            <Box
              style={{
                width: 28,
                height: 28,
                backgroundColor: '#228be6',
                borderRadius: '6px'
              }}
            />
            <Text 
              fw={700} 
              size="lg" 
              // Changed 'tracking' to 'lts' (letter-spacing)
              lts={-0.5} 
            >
              PORTFOLIO
            </Text>
          </Group>

          {/* Navigation Section */}
          <Group gap={5}>
            <Button variant="subtle" color="gray" size="sm">Projects</Button>
            <Button variant="subtle" color="gray" size="sm">Skills</Button>
            <Button variant="filled" color="blue" radius="xl" size="sm" ml="xs">
              Contact Me
            </Button>
          </Group>

        </Group>
      </Container>
    </AppShell.Header>
  );
}