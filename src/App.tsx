import { Suspense } from "react";
import "./App.component.css";
import { Loader, Navbar } from "./components";
import { Route } from "wouter";
import pages from "./pages";
import StoreProvider from "./context/StoreContext";
import UserProvider from "./context/UserContext";
import NotificationProvider from "./context/NotificationContext";

function App() {
  return (
    <Suspense fallback={<Loader />}>
      <StoreProvider>
        <NotificationProvider>
          <UserProvider>
            <Navbar />
            {Object.entries(pages).map(([key, page]) => (
              <Route key={key} path={key} component={page} />
            ))}
          </UserProvider>
        </NotificationProvider>
      </StoreProvider>
    </Suspense>
  );
}

export default App;
