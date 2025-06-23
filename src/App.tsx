import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import PokimonList from './Pokemon/screens/List';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <PokimonList />
    </QueryClientProvider>
  );
}

export default App;
