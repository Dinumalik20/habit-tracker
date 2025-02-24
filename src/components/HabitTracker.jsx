import { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  TextField,
  Button,
  Checkbox,
  Grid,
  Card,
  CardContent,
  LinearProgress,
  Fade
} from '@mui/material';
import { Add as AddIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { format } from 'date-fns';

const HabitTracker = () => {
  const [habits, setHabits] = useState([]);
  const [newHabit, setNewHabit] = useState('');

  const addHabit = () => {
    if (newHabit.trim()) {
      setHabits([...habits, {
        id: Date.now(),
        name: newHabit,
        completed: false,
        createdAt: new Date()
      }]);
      setNewHabit('');
    }
  };

  const toggleHabit = (id) => {
    setHabits(habits.map(habit =>
      habit.id === id ? { ...habit, completed: !habit.completed } : habit
    ));
  };

  const deleteHabit = (id) => {
    setHabits(habits.filter(habit => habit.id !== id));
  };

  const completionRate = habits.length > 0
    ? (habits.filter(habit => habit.completed).length / habits.length) * 100
    : 0;

  return (
    <Container maxWidth="md" sx={{ backgroundColor: '#f8f9fa', p: 3, borderRadius: 2 }}>
      <Box sx={{ my: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom align="center" sx={{ fontWeight: 'bold', color: '#1976d2' }}>
          Habit Tracker
        </Typography>

        <Card sx={{ mb: 4, backgroundColor: '#f5f5f5' }}>
          <CardContent>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Progress Overview
            </Typography>
            <LinearProgress 
              variant="determinate" 
              value={completionRate} 
              sx={{ height: 10, borderRadius: 5, mb: 1 }}
            />
            <Typography variant="body2" color="text.secondary" align="right">
              {Math.round(completionRate)}% Complete
            </Typography>
          </CardContent>
        </Card>
        
        <Card sx={{ mb: 4 }}>
          <CardContent>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs>
                <TextField
                  fullWidth
                  label="New Habit"
                  value={newHabit}
                  onChange={(e) => setNewHabit(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && addHabit()}
                  variant="outlined"
                  sx={{ backgroundColor: '#ffffff' }}
                />
              </Grid>
              <Grid item>
                <Button
                  variant="contained"
                  startIcon={<AddIcon />}
                  onClick={addHabit}
                  sx={{
                    backgroundColor: '#2196f3',
                    '&:hover': {
                      backgroundColor: '#1976d2'
                    }
                  }}
                >
                  Add Habit
                </Button>
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        <Box sx={{ display: 'grid', gap: 2 }}>
          {habits.map(habit => (
            <Fade in key={habit.id}>
              <Card>
                <CardContent sx={{
                  display: 'flex',
                  alignItems: 'center',
                  py: 2,
                  backgroundColor: habit.completed ? '#e8f5e9' : '#f8f9fa'
                }}>
                  <Checkbox
                    checked={habit.completed}
                    onChange={() => toggleHabit(habit.id)}
                    sx={{ '& .MuiSvgIcon-root': { fontSize: 28 } }}
                  />
                  <Box sx={{ flex: 1, ml: 2 }}>
                    <Typography
                      variant="h6"
                      sx={{
                        textDecoration: habit.completed ? 'line-through' : 'none',
                        color: habit.completed ? '#4caf50' : 'inherit'
                      }}
                    >
                      {habit.name}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      Created on {format(habit.createdAt, 'PP')}
                    </Typography>
                  </Box>
                  <IconButton
                    onClick={() => deleteHabit(habit.id)}
                    aria-label="delete"
                    sx={{
                      color: '#f44336',
                      '&:hover': {
                        backgroundColor: 'rgba(244, 67, 54, 0.08)'
                      }
                    }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </CardContent>
              </Card>
            </Fade>
          ))}
          {habits.length === 0 && (
            <Card sx={{ backgroundColor: '#e3f2fd' }}>
              <CardContent sx={{ textAlign: 'center', py: 4 }}>
                <Typography variant="h6" color="text.secondary">
                  No habits added yet
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Add a new habit to get started!
                </Typography>
              </CardContent>
            </Card>
          )}
        </Box>
      </Box>
    </Container>
  );
};

export default HabitTracker;