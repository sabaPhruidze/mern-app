import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import Header from "./components/Header";
import PrivateRoute from "./components/PrivateRoute";
const Dashboard = lazy(() => import("./pages/Dashboard"));

const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
function App() {
  return (
    <Router>
      <Suspense
        fallback={
          <div className="flex w-screen h-screen justify-center items-center">
            <p>loading...</p>
          </div>
        }
      >
        <div>
          <Header />
          <Routes>
            <Route element={<PrivateRoute/>}>
              <Route path="/" element={<Dashboard />} />
            </Route>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </div>
      </Suspense>
    </Router>
  );
}

export default App;
