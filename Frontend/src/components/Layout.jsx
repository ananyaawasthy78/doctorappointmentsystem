import Navbar from "./Navbar";

const Layout = ({ children }) => {
    return (
        <div id="root">
            <Navbar />
            <main className="main-content animate-fade-in">
                {children}
            </main>
            <footer>
                <div style={{ marginBottom: '1rem' }}>
                    <p>&copy; 2026 DocCare Systems. All rights reserved.</p>
                </div>
                <div style={{ fontSize: '0.875rem' }}>
                    Helping you find the best care, whenever you need it.
                </div>
            </footer>
        </div>
    );
};

export default Layout;
