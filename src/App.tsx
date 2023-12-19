
import { QueryClientProvider, QueryClient } from "react-query"
import { Api } from "./api/api";
import { Search } from './pages/search'

const client = new QueryClient();

function App() {

  return (
    <QueryClientProvider client={client}>
      <div className="flex flex-wrap p-3 gap-2 w-[100%] items-center justify-center">
        <Api />
        <Search />
      </div>
    </QueryClientProvider>
  )
}

export default App
