import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./login";
import BookAppointment from "./BookAppointment";
import AddDoc from "./addDoc";
import DoctorList from "./doctorList";
import Register from "./register";
import MyAppointments from "./myAppointments";
import Layout from "./components/Layout";

function App() {
    return (
        <Router>
            <Layout>
                <Routes>
                    <Route path="/" element={<DoctorList />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/book" element={<BookAppointment />} />
                    <Route path="/appointments" element={<MyAppointments />} />
                    <Route path="/admin" element={<AddDoc />} />
                </Routes>
            </Layout>
        </Router>
    );
}

export default App;
