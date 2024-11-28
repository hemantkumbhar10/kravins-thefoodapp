import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from 'react-query'
import { AppContextProvider } from './contexts/AuthContext.tsx'
import { Provider } from 'react-redux';
import store from './store/index.tsx'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0
    }
  }
})

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <AppContextProvider>
          <Provider store={store}>
          <App />
          </Provider>
        </AppContextProvider>
      </QueryClientProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
