import { useState, useEffect } from "react";
import api from "./api";
import { Calendar, User, Clock, CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

function BookAppointment() {
    const [doctors, setDoctors] = useState([]);
    const [docId, setDocId] = useState("");
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        api.get("/doctors").then(res => setDoctors(res.data));
    }, []);

    const book = async () => {
        if (!docId || !date || !time) {
            alert("Please fill in all fields.");
            return;
        }
        setLoading(true);
        try {
            await api.post("/appointments", {
                doctor_id: Number(docId),
                appointment_date: date,
                appointment_time: time,
            });
            alert("Appointment Booked successfully.");
            navigate("/appointments");
        } catch (err) {
            alert("Failed to book appointment. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="form-card glass-panel animate-fade-in">
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: 'rgba(99, 102, 241, 0.1)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary-light)', marginBottom: '1rem' }}>
                    <Calendar size={30} />
                </div>
                <h2>Schedule Visit</h2>
                <p style={{ color: 'var(--text-secondary)' }}>Choose your preferred doctor and time slot</p>
            </div>

            <div className="input-container">
                <label><User size={14} style={{ marginRight: '8px' }} /> Select Physician</label>
                <select value={docId} onChange={e => setDocId(e.target.value)}>
                    <option value="">Choose a doctor...</option>
                    {doctors.map(doc => (
                        <option key={doc.id} value={doc.id}>
                            {doc.name} - {doc.department}
                        </option>
                    ))}
                </select>
            </div>

            <div className="input-container">
                <label><Calendar size={14} style={{ marginRight: '8px' }} /> Preferred Date</label>
                <input type="date" value={date} onChange={e => setDate(e.target.value)} />
            </div>

            <div className="input-container">
                <label><Clock size={14} style={{ marginRight: '8px' }} /> Preferred Time</label>
                <input type="time" value={time} onChange={e => setTime(e.target.value)} />
            </div>

            <button
                className="btn btn-primary"
                style={{ width: '100%', marginTop: '1.5rem' }}
                onClick={book}
                disabled={loading}
            >
                {loading ? "Processing..." : (
                    <>
                        <CheckCircle size={18} style={{ marginRight: '8px' }} />
                        Confirm Booking
                    </>
                )}
            </button>
        </div>
    );
}

export default BookAppointment;
