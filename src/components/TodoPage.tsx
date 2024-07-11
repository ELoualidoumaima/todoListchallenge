import { Delete, Edit } from '@mui/icons-material';
import {
  Box, Button, Container, IconButton, TextField, Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
import useFetch from '../hooks/useFetch';
import { Task } from '../index';

const TodoPage = () => {
  const api = useFetch();
  const [ tasks, setTasks ] = useState<Task[]>([]);
  const [ newTaskName, setNewTaskName ] = useState<string>('');
  const [ editingTask, setEditingTask ] = useState<Task | null>(null);

  const handleFetchTasks = async () => {
    try {
      const fetchedTasks = await api.get('/tasks');
      if (Array.isArray(fetchedTasks)) {
        setTasks(fetchedTasks);
      } else {
        console.error('Expected an array of tasks, received:', fetchedTasks);
      }
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await api.delete(`/tasks/${id}`);
      handleFetchTasks();
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const handleSave = async () => {
    if (newTaskName.trim() === '') {
      return;
    }

    try {
      if (editingTask) {
        await api.patch(`/tasks/${editingTask.id}`, { name: newTaskName });
        setEditingTask(null);
      } else {
        await api.post('/tasks', { name: newTaskName });
      }
      setNewTaskName('');
      handleFetchTasks();
    } catch (error) {
      console.error('Error saving task:', error);
    }
  };

  const handleEdit = (task: Task) => {
    setEditingTask(task);
    setNewTaskName(task.name);
  };

  useEffect(() => {
    handleFetchTasks();
  }, []);

  return (
    <Container>
      <Box display="flex" justifyContent="center" mt={5}>
        <Typography variant="h2">HDM Todo List</Typography>
      </Box>

      <Box justifyContent="center" mt={5} flexDirection="column">
        {tasks.map((task) => (
          <Box key={task.id} display="flex" justifyContent="center" alignItems="center" mt={2} gap={1} width="100%">
            <TextField
              size="small"
              value={task.name}
              fullWidth
              sx={{ maxWidth: 350 }}
              disabled
            />
            <Box>
              <IconButton color="primary" onClick={() => handleEdit(task)}>
                <Edit />
              </IconButton>
              <IconButton color="error" onClick={() => handleDelete(task.id)}>
                <Delete />
              </IconButton>
            </Box>
          </Box>
        ))}
        <Box display="flex" justifyContent="center" alignItems="center" mt={2}>
          <TextField
            size="small"
            value={newTaskName}
            onChange={(e) => setNewTaskName(e.target.value)}
            label="Nouvelle Tâche"
            variant="outlined"
          />
          <Button variant="outlined" onClick={handleSave} sx={{ ml: 2 }}>
            {editingTask ? 'Mettre à jour la tâche' : 'Ajouter une tâche'}
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default TodoPage;
