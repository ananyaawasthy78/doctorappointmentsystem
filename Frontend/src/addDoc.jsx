import { useEffect, useState } from "react";
import api from "./api";
import { UserPlus, Stethoscope, Clock, Save, Shield } from "lucide-react";

function AddDoc() {
    const [departments, setDepartments] = useState([]);
    const [departmentId, setDepartmentId] = useState("");
    const [from, setFrom] = useState("");
    const [to, setTo] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        api.get("/departments")
            .then(res => setDepartments(res.data))
            .catch(err => console.error("Error fetching departments:", err));
    }, []);

    const submit = async () => {
        if (!departmentId || !from || !to) {
            alert("Please select department and availability times.");
            return;
        }
        setLoading(true);
        try {
            await api.post("/doctors", {
                department_id: Number(departmentId),
                available_from: from,
                available_to: to
            });
            alert("Doctor profile created successfully");
            setDepartmentId("");
            setFrom("");
            setTo("");
        } catch (err) {
            alert("Failed to create doctor profile. Are you logged in as a doctor?");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="form-card glass-panel animate-fade-in">
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: 'rgba(99, 102, 241, 0.1)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary-light)', marginBottom: '1rem' }}>
                    <Shield size={30} />
                </div>
                <h2>Doctor Administration</h2>
                <p style={{ color: 'var(--text-secondary)' }}>Configure your professional profile and availability</p>
            </div>

            <div className="input-container">
                <label><Stethoscope size={14} style={{ marginRight: '8px' }} /> Medical Department</label>
                <select value={departmentId} onChange={e => setDepartmentId(e.target.value)}>
                    <option value="">Choose your specialization...</option>
                    {departments.map(dep => (
                        <option key={dep.id} value={dep.id}>
                            {dep.name}
                        </option>
                    ))}
                </select>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div className="input-container">
                    <label><Clock size={14} style={{ marginRight: '8px' }} /> Available From</label>
                    <input type="time" value={from} onChange={e => setFrom(e.target.value)} />
                </div>

                <div className="input-container">
                    <label><Clock size={14} style={{ marginRight: '8px' }} /> Available To</label>
                    <input type="time" value={to} onChange={e => setTo(e.target.value)} />
                </div>
            </div>

            <button
                className="btn btn-primary"
                style={{ width: '100%', marginTop: '1.5rem' }}
                onClick={submit}
                disabled={loading}
            >
                {loading ? "Saving..." : (
                    <>
                        <Save size={18} style={{ marginRight: '8px' }} />
                        Save Doctor Profile
                    </>
                )}
            </button>

            <div style={{ marginTop: '2rem', padding: '1rem', borderRadius: '12px', background: 'rgba(244, 114, 182, 0.05)', border: '1px solid rgba(244, 114, 182, 0.1)', display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <div style={{ color: 'var(--accent)' }}>
                    <Shield size={20} />
                </div>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', margin: 0 }}>
                    <b>Privacy Note:</b> Your availability will be visible to all registered patients for booking.
                </p>
            </div>
        </div>
    );
};

export default AddDoc;
