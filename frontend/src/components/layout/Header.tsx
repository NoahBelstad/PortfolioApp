import { Group, Text, Container, Burger, Drawer, Stack, Box, Button, UnstyledButton } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

export function Header() {
  const [opened, { toggle, close }] = useDisclosure(false);

  const items = (
    <>
      <Button variant="subtle" color="gray" size="sm" radius="xl" onClick={close}>
        About
      </Button>
      <Button variant="subtle" color="gray" size="sm" radius="xl" onClick={close}>
        Projects
      </Button>
      <Button variant="filled" color="blue" size="sm" radius="xl" onClick={close}>
        Contact
      </Button>
    </>
  );

  return (
    <Box 
      component="header" 
      h={70} 
      style={{ 
        borderBottom: '1px solid #373A40', 
        backgroundColor: '#1A1B1E', 
        position: 'sticky', 
        top: 0, 
        zIndex: 100 
      }}
    >
      <Container size="xl" h="100%">
        <Group justify="space-between" h="100%">
        <UnstyledButton component="a" href="/">
          <Group gap={4}>
            <Text 
              fw={900} 
              fz="xl" 
              c="blue" 
              style={{ letterSpacing: '2px' }}
            >
              PORT
            </Text>
            <Text 
              fw={300} 
              fz="xl" 
              c="white" 
              style={{ letterSpacing: '2px' }}
            >
              FOLIO
            </Text>
          </Group>
        </UnstyledButton>

          <Group gap="md" visibleFrom="sm">
            {items}
          </Group>

          <Burger 
            opened={opened} 
            onClick={toggle} 
            hiddenFrom="sm" 
            size="sm" 
            color="white" 
          />
        </Group>

        <Drawer 
          opened={opened} 
          onClose={close} 
          size="100%" 
          padding="md" 
          title="Menu" 
          hiddenFrom="sm"
          zIndex={1000}
          styles={{
            content: { backgroundColor: '#1A1B1E' },
            header: { backgroundColor: '#1A1B1E' },
          }}
        >
          <Stack gap="lg" mt="xl" align="center">
            {items}
          </Stack>
        </Drawer>
      </Container>
    </Box>
  );
}