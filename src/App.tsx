import { Suspense } from "react";
import "./App.component.css";
import { Navbar } from "./components";
import { Route } from "wouter";
import pages from "./pages";
import StoreProvider from "./context/StoreContext";

function App() {
  return (
    <Suspense fallback={<div>Mohh</div>}>
      <Navbar />
      <StoreProvider>
        {Object.entries(pages).map(([key, page]) => (
          <Route key={key} path={key} component={page} />
        ))}
      </StoreProvider>
    </Suspense>
  );
}

export default App;
