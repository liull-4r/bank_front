import "../src/assets/css/style.css";
import "../src/assets/css/bootstrap.min.css";
import "../src/assets/css/custom.css";
import { lazy } from "react";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PrivateAuthRoute from "./Markup/components/Auth/PrivateAuthRoute";
import { useUserRole } from "./context/AuthContext";
import UnAuthorized from "./Markup/pages/UnAuthorized";
import PrincipalList from "./Markup/components/PrincipalList/PrincipalList";
import CustomerDataForm from "./Markup/components/CustomerDataForm/CustomerDataForm";
import PrincipalNotifications from "./Markup/components/Notifications/PrincipalNotifications";
import PrincipalDetail from "./Markup/components/Detail/PrincipalDetail";
import PrincipalResponseDetail from "./Markup/components/Detail/PrincipalResponseDetail";
import UserNotifications from "./Markup/components/Notifications/UserNotifications";
import UserDetail from "./Markup/components/Detail/UserDetail";
import UserResponse from "./Markup/components/Response/UserResponse";
import ResponsePrincipalList from "./Markup/components/PrincipalList/ResponsePrincipalList";
import AssignPrincipal from "./Markup/components/Assign/AssignPrincipal";
import CsoHeader from "./Markup/components/Header/CsoHeader";
import PrincipalHeader from "./Markup/components/Header/PrincipalHeader";
import Home from "./Markup/pages/Home";
import Profile from "./Markup/pages/Profile";
const Header = lazy(() => import("./Markup/components/Header/Header"));
const Login = lazy(() => import("./Markup/pages/Login"));
const Forgot = lazy(() => import("./Markup/pages/Forgot"));
const ResetPasswordConfirm = lazy(() =>
  import("./Markup/pages/ResetPasswordConfirm")
);

function App() {
  const { userRole } = useUserRole();

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/login"
          element={
            <>
              <Header />
              <Login />
            </>
          }
        />
        <Route
          path="/unauthorized"
          element={
            <>
              <Header />
              <UnAuthorized />
            </>
          }
        />
        <Route
          path="/forgot"
          element={
            <>
              <Header />
              <Forgot />
            </>
          }
        />
        <Route
          path="/password/reset/confirm/:uid?/:token"
          element={
            <>
              <ResetPasswordConfirm />
            </>
          }
        />

        <Route
          path="/principals"
          element={
            <>
              <CsoHeader />
              <PrivateAuthRoute roles={["CSO"]}>
                <PrincipalList />
              </PrivateAuthRoute>
            </>
          }
        />
        <Route
          path="/customerdataform"
          element={
            <>
              <CsoHeader />
              <PrivateAuthRoute roles={["CSO"]}>
                <CustomerDataForm />
              </PrivateAuthRoute>
            </>
          }
        />
        <Route
          path="/principalnotifications"
          element={
            <>
              <PrincipalHeader />
              <PrivateAuthRoute roles={["Principal"]}>
                <PrincipalNotifications />
              </PrivateAuthRoute>
            </>
          }
        />
        <Route
          path="/usernotifications"
          element={
            <>
              <CsoHeader />
              <PrivateAuthRoute roles={["CSO"]}>
                <UserNotifications />
              </PrivateAuthRoute>
            </>
          }
        />
        <Route
          path="/principaldetail/:id"
          element={
            <>
              <PrincipalHeader />
              <PrivateAuthRoute roles={["Principal"]}>
                <PrincipalDetail />
              </PrivateAuthRoute>
            </>
          }
        />
        <Route
          path="/userdetail/:id"
          element={
            <>
              <CsoHeader />
              <PrivateAuthRoute roles={["CSO"]}>
                <UserDetail />
              </PrivateAuthRoute>
            </>
          }
        />
        <Route
          path="/principalresponsedetail/:id"
          element={
            <>
              <PrincipalHeader />
              <PrivateAuthRoute roles={["Principal"]}>
                <PrincipalResponseDetail />
              </PrivateAuthRoute>
            </>
          }
        />
        <Route
          path="/userresponse"
          element={
            <>
              <CsoHeader />
              <PrivateAuthRoute roles={["CSO"]}>
                <UserResponse />
              </PrivateAuthRoute>
            </>
          }
        />
        <Route
          path="/responselist"
          element={
            <>
              <CsoHeader />
              <PrivateAuthRoute roles={["CSO"]}>
                <ResponsePrincipalList />
              </PrivateAuthRoute>
            </>
          }
        />
        <Route
          path="/assign"
          element={
            <>
              <PrincipalHeader />
              <PrivateAuthRoute roles={["Principal"]}>
                <AssignPrincipal />
              </PrivateAuthRoute>
            </>
          }
        />

        <Route
          path="/profile"
          element={
            <>
              {userRole === "CSO" && <CsoHeader />}
              {userRole === "Principal" && <PrincipalHeader />}

              {userRole !== "CSO" && userRole !== "Principal" && <Header />}

              <PrivateAuthRoute roles={["CSO", "Principal"]}>
                <Profile />
                {/* {userRole === "Patient" && <PatientDetail />} */}
              </PrivateAuthRoute>
            </>
          }
        />
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
