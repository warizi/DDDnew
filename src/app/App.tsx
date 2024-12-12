import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { MainLayout } from './layout'
import { TodoPage } from '@pages/todo'
import { RecoilRoot } from 'recoil'
import { ContextMenuProvider } from '@shared/components/contextMenu'

const queryClient = new QueryClient()
function App() {

  return (
    <QueryClientProvider client={queryClient}>
      <RecoilRoot>
        <ContextMenuProvider>
          <BrowserRouter>
            <Routes>
              <Route element={<MainLayout />}>
                <Route path="/" element={<div>Home</div>} />
                <Route path="/todo" element={<TodoPage />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </ContextMenuProvider>
      </RecoilRoot>
    </QueryClientProvider>
  )
}

export default App
