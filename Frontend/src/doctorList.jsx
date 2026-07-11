import { useEffect, useState } from "react";
import api from "./api";
import { User, Stethoscope, Clock, Search } from "lucide-react";

function DoctorList() {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const res = await api.get("/doctors");
        setDoctors(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchDoctors();
  }, []);

  return (
    <div className="animate-fade-in">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
        <div>
          <h1 style={{ marginBottom: '0.5rem' }}>Find Your Specialist</h1>
          <p style={{ color: 'var(--text-secondary)' }}>Book appointments with top-rated medical professionals.</p>
        </div>
        <div style={{ position: 'relative' }}>
          <input
            type="text"
            placeholder="Search doctors..."
            style={{ paddingLeft: '3rem', width: '300px' }}
          />
          <Search size={18} style={{ position: 'absolute', left: '1.25rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
        </div>
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '5rem' }}>
          <p>Loading doctors...</p>
        </div>
      ) : (
        <div className="grid-container">
          {doctors.length === 0 ? (
            <div className="glass-panel" style={{ textAlign: 'center', gridColumn: '1/-1' }}>
              <p>No doctors available at the moment.</p>
            </div>
          ) : (
            doctors.map((doc) => (
              <div key={doc.id} className="doctor-card">
                <div style={{ display: 'flex', gap: '1.5rem', marginBottom: '1.5rem' }}>
                  <div style={{ width: '60px', height: '60px', borderRadius: '15px', background: 'rgba(99, 102, 241, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary-light)' }}>
                    <User size={30} />
                  </div>
                  <div>
                    <h3 style={{ margin: 0 }}>Dr. {doc.name}</h3>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                      <Stethoscope size={14} />
                      <span>{doc.department}</span>
                    </div>
                  </div>
                </div>

                <div className="doctor-info" style={{ marginBottom: '1.5rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <Clock size={16} />
                    <span><b>Available:</b> {doc.available_from} – {doc.available_to}</span>
                  </div>
                </div>

                <a href="/book" className="btn btn-primary" style={{ width: '100%' }}>
                  Book Now
                </a>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}

export default DoctorList;

