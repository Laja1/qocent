import { ModalProvider } from "@/components/shared/modal"
import { ToastWrapper } from "@/components/shared/toast"
import { persistor, store } from "@/store"
import { Provider } from 'react-redux'
import { PersistGate } from "redux-persist/integration/react"


export const ProviderWrapper = ({children}:{children:React.ReactNode}) => {
  return (
    <Provider store={store}>
       <PersistGate loading={null} persistor={persistor}>
    <ModalProvider>
    <ToastWrapper />
    <div>
        {children}
    </div>
    </ModalProvider>
    </PersistGate>
    </Provider>
  )
}
