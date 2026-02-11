import NiceModal from '@ebay/nice-modal-react'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { ds } from './design-system/ds'
import './index.css'
import { ProviderWrapper } from './providers/index.tsx'

// Restore design system state from localStorage / URL param
// (does nothing unless previously activated — safe no-op by default)
ds.init();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ProviderWrapper>
      <NiceModal.Provider>
        <App />
      </NiceModal.Provider>
    </ProviderWrapper>
  </StrictMode>,
)
