import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { MainLayout } from './layout'
import { NotePage, TodoPage } from '@pages/todo'
import { RecoilRoot } from 'recoil'
import { ContextMenuProvider } from '@shared/components/contextMenu'
import { PATH_URL } from '@shared/consts'

const queryClient = new QueryClient()
function App() {

  return (
    <QueryClientProvider client={queryClient}>
      <RecoilRoot>
        <ContextMenuProvider>
          <BrowserRouter>
            <Routes>
              <Route element={<MainLayout />}>
                <Route path={PATH_URL.HOME} element={<div>Home</div>} />
                <Route path={PATH_URL.TODO} element={<TodoPage />} />
                <Route path={PATH_URL.NOTE} element={<NotePage />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </ContextMenuProvider>
      </RecoilRoot>
    </QueryClientProvider>
  )
}

export default App
