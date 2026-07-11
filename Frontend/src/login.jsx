import { useState } from "react";
import api from "./api";
import { LogIn, Mail, Lock } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

function Login() {
    const [email, setemail] = useState('');
    const [pass, setpass] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const login = async () => {
        setLoading(true);
        try {
            const formData = new URLSearchParams();
            formData.append("username", email);
            formData.append("password", pass);

            const res = await api.post("/login", formData, {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                }
            });
            localStorage.setItem("token", res.data.access_token);
            alert("Logged in successfully");
            navigate("/");
        } catch (err) {
            alert("Login failed. Please check your credentials.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="form-card glass-panel animate-fade-in">
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: 'rgba(99, 102, 241, 0.1)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary-light)', marginBottom: '1rem' }}>
                    <LogIn size={30} />
                </div>
                <h2>Welcome Back</h2>
                <p style={{ color: 'var(--text-secondary)' }}>Enter your details to access your account</p>
            </div>

            <div className="input-container">
                <label><Mail size={14} style={{ marginRight: '8px' }} /> Email Address</label>
                <input
                    type="email"
                    placeholder="name@example.com"
                    value={email}
                    onChange={e => setemail(e.target.value)}
                />
            </div>

            <div className="input-container">
                <label><Lock size={14} style={{ marginRight: '8px' }} /> Password</label>
                <input
                    type="password"
                    placeholder="••••••••"
                    value={pass}
                    onChange={e => setpass(e.target.value)}
                />
            </div>

            <button
                className="btn btn-primary"
                style={{ width: '100%', marginTop: '1rem' }}
                onClick={login}
                disabled={loading}
            >
                {loading ? "Signing in..." : "Sign In"}
            </button>

            <div style={{ textAlign: 'center', marginTop: '1.5rem', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                Don't have an account? <Link to="/register" style={{ color: 'var(--primary-light)', textDecoration: 'none', fontWeight: 600 }}>Create one</Link>
            </div>
        </div>
    );
}

export default Login;
