import { Link, useLocation } from "react-router-dom";
import { Activity, LayoutDashboard, User, Calendar, LogIn, UserPlus, PlusCircle } from "lucide-react";

const Navbar = () => {
    const location = useLocation();

    const isActive = (path) => location.pathname === path;

    return (
        <nav className="navbar">
            <Link to="/" className="nav-logo">
                <Activity size={32} color="#818cf8" />
                <span>DocCare</span>
            </Link>
            <div className="nav-links">
                <Link to="/" className={`nav-link ${isActive("/") ? "active" : ""}`}>
                    <LayoutDashboard size={18} />
                    <span>Doctors</span>
                </Link>
                <Link to="/appointments" className={`nav-link ${isActive("/appointments") ? "active" : ""}`}>
                    <Calendar size={18} />
                    <span>My Appointments</span>
                </Link>
                <Link to="/book" className={`nav-link ${isActive("/book") ? "active" : ""}`}>
                    <PlusCircle size={18} />
                    <span>Book</span>
                </Link>
                <Link to="/admin" className={`nav-link ${isActive("/admin") ? "active" : ""}`}>
                    <User size={18} />
                    <span>Admin</span>
                </Link>
            </div>
            <div className="nav-links">
                <Link to="/login" className="btn btn-outline" style={{ padding: '0.5rem 1rem' }}>
                    <LogIn size={18} />
                    <span>Login</span>
                </Link>
                <Link to="/register" className="btn btn-primary" style={{ padding: '0.5rem 1rem' }}>
                    <UserPlus size={18} />
                    <span>Register</span>
                </Link>
            </div>
        </nav>
    );
};

export default Navbar;
