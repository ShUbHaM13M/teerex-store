import { Suspense } from "react";
import "./App.component.css";
import { Navbar } from "./components";
import { Route } from "wouter";
import pages from "./pages";
import StoreProvider from "./context/StoreContext";
import UserProvider from "./context/UserContext";

function App() {
  return (
    <Suspense fallback={<div>Mohh</div>}>
      <StoreProvider>
        <UserProvider>
          <Navbar />
          {Object.entries(pages).map(([key, page]) => (
            <Route key={key} path={key} component={page} />
          ))}
        </UserProvider>
      </StoreProvider>
    </Suspense>
  );
}

export default App;
