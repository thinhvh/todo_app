import { Box } from '@mui/system';
import Todo from './pages/Todo';


function App() {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%', height: '100%' }} >
      <Todo />
    </Box>
  );
}

export default App;
