import NiceModal from '@ebay/nice-modal-react'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { ProviderWrapper } from './providers/index.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ProviderWrapper>
      <NiceModal.Provider>
        <App />
      </NiceModal.Provider>
    </ProviderWrapper>
  </StrictMode>,
)
