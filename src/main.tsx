import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { ProviderWrapper } from './providers/index.tsx'
import NiceModal from '@ebay/nice-modal-react'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ProviderWrapper>
    <NiceModal.Provider>
    <App />
    </NiceModal.Provider>
    </ProviderWrapper>
  </StrictMode>,
)
