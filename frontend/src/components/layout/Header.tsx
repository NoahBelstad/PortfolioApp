import { Group, Container, Button, Burger, Drawer, Stack } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

export function Header() {
  const [opened, { toggle, close }] = useDisclosure();

  return (
    <Container size="xl" h="100%">
      <Group justify="space-between" h="100%">
        <Button component="a" href="/" size="xl" fw={800} variant="transparent" color="blue">
          PORTFOLIO
        </Button>

        <Group gap="sm" visibleFrom="sm">
          <Button component="a" href="/about" size="sm" fw={500} variant="outline" color="blue" radius="xl">
            About
          </Button>
          <Button component="a" href="/contact" size="sm" fw={500} variant="outline" color="blue" radius="xl">
            Contact
          </Button>
          <Button component="a" href="/projects" size="sm" fw={500} variant="filled" color="blue" radius="xl">
            Projects
          </Button>
        </Group>

        <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />

        <Drawer
          opened={opened}
          onClose={close}
          size="65%"
          position="right"
          hiddenFrom="sm"
          transitionProps={{ transition: 'slide-left', duration: 250 }}
          styles={{
            content: {
              height: '100%',
              top: '20%',
              right: '20px',
              // Format: top-left | top-right | bottom-right | bottom-left
              borderRadius: '24px 0 0 24px', 
            },
          }}
        >
          <Stack gap="md">
            <Button component="a" href="/about" size="lg" variant="outline" radius="xl" onClick={close}>
              About
            </Button>
            <Button component="a" href="/contact" size="lg" variant="outline" radius="xl" onClick={close}>
              Contact
            </Button>
            <Button component="a" href="/projects" size="lg" variant="filled" radius="xl" onClick={close}>
              Projects
            </Button>
          </Stack>
        </Drawer>
      </Group>
    </Container>
  );
}