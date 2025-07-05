import { ModalProvider } from "@/components/shared/modal"

export const Provider = ({children}:{children:React.ReactNode}) => {
  return (
    <ModalProvider>
    <div>
        {children}
    </div>
    </ModalProvider>
  )
}
