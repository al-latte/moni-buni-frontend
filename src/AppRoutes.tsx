import { Navigate, Route, Routes } from "react-router-dom"
import { LoginPage } from "./pages/LoginPage"
import { SignupPage } from "./pages/SignupPage"
import { HomePage } from "./pages/HomePage"

export const AppRoutes = () => {
  return (
    <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/login" element={<LoginPage/>} />
        <Route path="/signup" element={<SignupPage/>} />
        <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  )
}