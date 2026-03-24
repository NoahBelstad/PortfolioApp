import '@mantine/core/styles.css';
import { MantineProvider, AppShell } from '@mantine/core';

import { Header } from './components/layout/Header';
import { Hero } from './components/hero/Hero';
import { ProjectCarousel } from './components/projects/ProjectCarousel';

export default function App() {
  return (
    <MantineProvider defaultColorScheme="dark">
      <AppShell
        header={{ height: 60 }}
        padding="md"
      >
        <Header />
        <AppShell.Main>
          <Hero />
          {}
          <ProjectCarousel />
        </AppShell.Main>
      </AppShell>
    </MantineProvider>
  );
}