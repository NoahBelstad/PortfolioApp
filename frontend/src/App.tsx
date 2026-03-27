import '@mantine/core/styles.css';
import { useState } from 'react';
import { MantineProvider, AppShell, createTheme } from '@mantine/core';
import { Header } from './components/layout/Header';
import { Hero } from './components/hero/Hero';
import { ProjectCarousel } from './components/projects/ProjectCarousel';

const darkTheme = createTheme({
  primaryColor: 'primary',
  colors: {
    primary: ['#E3F2FD', '#BBDEFB', '#90CAF9', '#64B5F6', '#42A5F5', '#2196F3', '#1E88E5', '#1976D2', '#1565C0', '#0D47A1'],
    text: ['#FFFFFF', '#F5F5F5', '#EEEEEE', '#E0E0E0', '#BDBDBD', '#9E9E9E', '#757575', '#616161', '#424242', '#212121'],
  },
});

// Example light theme, will not be used yet but can be added in the future
const lightTheme = createTheme({
  primaryColor: 'primary',
  colors: {
    primary: ['#FFF3E0', '#FFE0B2', '#FFCC80', '#FFB74D', '#FFA726', '#FF9800', '#FB8C00', '#F57C00', '#EF6C00', '#E65100'],
    text: ['#212121', '#424242', '#616161', '#757575', '#9E9E9E', '#BDBDBD', '#E0E0E0', '#EEEEEE', '#F5F5F5', '#FFFFFF'],
  },
});

export default function App() {
  const [colorScheme] = useState<'light' | 'dark'>('dark');

  return (
    <MantineProvider 
      theme={colorScheme === 'dark' ? darkTheme : lightTheme} 
      forceColorScheme={colorScheme}
    >
      <AppShell
        header={{ height: 60 }}
        padding={0}
      >
        <AppShell.Header 
          style={{ 
            borderBottom: '1px solid var(--mantine-color-default-border)' 
          }}
        >
          <Header />
        </AppShell.Header>

        <AppShell.Main>
          <Hero />
          <ProjectCarousel />
        </AppShell.Main>
      </AppShell>
    </MantineProvider>
  );
}