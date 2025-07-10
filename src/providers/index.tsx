import { ModalProvider } from "@/components/shared/modal"
import { ToastWrapper } from "@/components/shared/toast"
import { store } from "@/store"
import { Provider } from 'react-redux'


export const ProviderWrapper = ({children}:{children:React.ReactNode}) => {
  return (
    <Provider store={store}>
    <ModalProvider>
    <ToastWrapper />
    <div>
        {children}
    </div>
    </ModalProvider>
    </Provider>
  )
}
