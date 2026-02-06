import { ModalProvider } from "@/components/shared/modal";
import { ToastWrapper } from "@/components/shared/toast";
import { persistor, store } from "@/store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { GoogleOAuthProvider } from "@react-oauth/google";

export const ProviderWrapper = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const GOOGLE_CLIENT_ID = import.meta.env.VITE_CLIENT_ID;

  return (
    <Provider store={store}>
      <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
        <PersistGate loading={null} persistor={persistor}>
          <ModalProvider>
            <ToastWrapper />
            <div>{children}</div>
          </ModalProvider>
        </PersistGate>
      </GoogleOAuthProvider>
    </Provider>
  );
};
