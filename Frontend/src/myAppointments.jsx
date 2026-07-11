import { useState, useEffect } from "react";
import api from "./api";
import { ClipboardList, Calendar, Clock, User } from "lucide-react";

function MyAppointments() {
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                const res = await api.get("/appointments");
                setAppointments(res.data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchAppointments();
    }, []);

    return (
        <div className="animate-fade-in">
            <div style={{ marginBottom: '3rem' }}>
                <h1>My Appointments</h1>
                <p style={{ color: 'var(--text-secondary)' }}>Keep track of your upcoming medical visits.</p>
            </div>

            {loading ? (
                <div style={{ textAlign: 'center', padding: '5rem' }}>
                    <p>Loading your schedule...</p>
                </div>
            ) : (
                <div className="grid-container">
                    {appointments.length === 0 ? (
                        <div className="glass-panel" style={{ textAlign: 'center', gridColumn: '1/-1', padding: '5rem' }}>
                            <div style={{ color: 'var(--text-muted)', marginBottom: '1rem' }}>
                                <ClipboardList size={48} style={{ opacity: 0.5 }} />
                            </div>
                            <p>You don't have any appointments scheduled yet.</p>
                            <a href="/book" className="btn btn-outline" style={{ marginTop: '1.5rem' }}>Book your first appointment</a>
                        </div>
                    ) : (
                        appointments.map((appt) => (
                            <div key={appt.id} className="doctor-card">
                                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                                    <div style={{ padding: '0.75rem', borderRadius: '12px', background: 'rgba(99, 102, 241, 0.1)', color: 'var(--primary-light)' }}>
                                        <Calendar size={20} />
                                    </div>
                                    <span style={{ fontWeight: 700, fontSize: '1.1rem' }}>Appointment Details</span>
                                </div>

                                <div className="doctor-info" style={{ gap: '1rem' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                        <User size={16} />
                                        <span><b>Doctor:</b> {appt.doctor_name}</span>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                        <Calendar size={16} />
                                        <span><b>Date:</b> {appt.appointment_date}</span>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                        <Clock size={16} />
                                        <span><b>Time:</b> {appt.appointment_time}</span>
                                    </div>
                                </div>

                                <div style={{ marginTop: '1.5rem', paddingTop: '1.5rem', borderTop: '1px solid var(--border-glass)', display: 'flex', justifyContent: 'flex-end' }}>
                                    <span className="btn btn-outline" style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem' }}>Status: Confirmed</span>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            )}
        </div>
    );
}

export default MyAppointments;
