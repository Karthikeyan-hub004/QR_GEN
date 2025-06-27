import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { QrCode, User, LogOut, Home, Plus } from 'lucide-react';

const Header = () => {
  const { user, logout } = useAuth();

  return (
    <header className="header">
      <div className="header-content">
        <Link to="/" className="logo">
          <QrCode className="inline w-6 h-6 mr-2" />
          QR Generator
        </Link>
        
        <nav>
          <ul className="nav-links">
            <li><Link to="/"><Home className="inline w-4 h-4 mr-1" />Home</Link></li>
            {user ? (
              <>
                <li><Link to="/generate"><Plus className="inline w-4 h-4 mr-1" />Generate</Link></li>
                <li><Link to="/dashboard"><User className="inline w-4 h-4 mr-1" />Dashboard</Link></li>
                <li>
                  <button onClick={logout} className="btn btn-outline">
                    <LogOut className="inline w-4 h-4 mr-1" />
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li><Link to="/login" className="btn btn-outline">Login</Link></li>
                <li><Link to="/register" className="btn btn-primary">Register</Link></li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
