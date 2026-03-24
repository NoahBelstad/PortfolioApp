import { Group, Text, Container, Anchor } from '@mantine/core';

export function Header() {
  return (
    <Container size="xl" h="100%">
      <Group justify="space-between" h="100%">
        <Text fw={900} size="xl" c="blue">PORTFOLIO</Text>
        <Group gap="xl">
          <Anchor href="#" c="dimmed" size="sm" fw={500}>About</Anchor>
          <Anchor href="#" c="dimmed" size="sm" fw={500}>Projects</Anchor>
          <Anchor href="#" c="dimmed" size="sm" fw={500}>Contact</Anchor>
        </Group>
      </Group>
    </Container>
  );
}