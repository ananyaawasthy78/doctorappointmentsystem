import { useState } from "react";
import api from "./api";
import { UserPlus, User, Mail, Lock, ShieldCheck } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

function Register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");
    const [role, setRole] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const register = async () => {
        if (!role) {
            alert("Please select a role.");
            return;
        }
        setLoading(true);
        try {
            await api.post("/register", {
                name: name,
                email: email,
                password: pass,
                role: role
            });
            alert("Registered successfully. Please login.");
            navigate("/login");
        } catch (err) {
            alert("Registration failed.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="form-card glass-panel animate-fade-in">
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: 'rgba(99, 102, 241, 0.1)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary-light)', marginBottom: '1rem' }}>
                    <UserPlus size={30} />
                </div>
                <h2>Create Account</h2>
                <p style={{ color: 'var(--text-secondary)' }}>Join our community of healthcare excellence</p>
            </div>

            <div className="input-container">
                <label><User size={14} style={{ marginRight: '8px' }} /> Full Name</label>
                <input
                    placeholder="Arushi Sharma"
                    value={name}
                    onChange={e => setName(e.target.value)}
                />
            </div>

            <div className="input-container">
                <label><Mail size={14} style={{ marginRight: '8px' }} /> Email Address</label>
                <input
                    type="email"
                    placeholder="name@example.com"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />
            </div>

            <div className="input-container">
                <label><Lock size={14} style={{ marginRight: '8px' }} /> Password</label>
                <input
                    type="password"
                    placeholder="••••••••"
                    value={pass}
                    onChange={e => setPass(e.target.value)}
                />
            </div>

            <div className="input-container">
                <label><ShieldCheck size={14} style={{ marginRight: '8px' }} /> Identifying Role</label>
                <select value={role} onChange={e => setRole(e.target.value)}>
                    <option value="">Select Role</option>
                    <option value="doctor">Medical Professional (Doctor)</option>
                    <option value="patient">Standard User (Patient)</option>
                </select>
            </div>

            <button
                className="btn btn-primary"
                style={{ width: '100%', marginTop: '1rem' }}
                onClick={register}
                disabled={loading}
            >
                {loading ? "Creating account..." : "Register Now"}
            </button>

            <div style={{ textAlign: 'center', marginTop: '1.5rem', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                Already have an account? <Link to="/login" style={{ color: 'var(--primary-light)', textDecoration: 'none', fontWeight: 600 }}>Sign In</Link>
            </div>
        </div>
    );
}

export default Register;
