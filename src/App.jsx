import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import HabitTracker from './components/HabitTracker';
import './App.css';

const theme = createTheme();

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <HabitTracker />
    </ThemeProvider>
  )
}

export default App
