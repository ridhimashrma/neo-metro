import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Bus, Eye, EyeOff } from 'lucide-react';
import '../styles/neometro.css';

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const { login, register, isLoading } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
  
    if (isLogin) {
      const success = await login(email, password);
  
      if (success) {
        navigate('/dashboard');
      } else {
        setError('Invalid credentials');
      }
  
    } else {
      const success = await register(name, email, password, phone);
  
      if (success) {
        navigate('/dashboard');
      } else {
        setError('Registration failed');
      }
    }
  };

  return (
    <div className="login-container" style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'radial-gradient(circle at center, rgba(0, 245, 255, 0.08), transparent 70%)'
    }}>
      <div className="glass" style={{ width: '100%', maxWidth: '460px', padding: '48px 40px', borderRadius: '28px' }}>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <div style={{
            width: '90px', height: '90px', margin: '0 auto 20px',
            background: 'linear-gradient(135deg, #00f5ff, #7c3aed)',
            borderRadius: '20px', display: 'flex',
            alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 0 40px rgba(0, 245, 255, 0.5)'
          }}>
            <Bus size={48} color="white" />
          </div>
          <h1 className="neon-cyan" style={{ fontSize: '2.8rem', fontWeight: '900', letterSpacing: '-2px' }}>
            NEO METRO
          </h1>
          <p style={{ color: '#67e8f9', marginTop: '8px', fontSize: '1rem' }}>
            Smart City Management System
          </p>
        </div>

        <div style={{ display: 'flex', background: 'rgba(0,0,0,0.3)', borderRadius: '12px', padding: '6px', marginBottom: '32px' }}>
          <button 
            onClick={() => setIsLogin(true)}
            style={{
              flex: 1, padding: '14px', borderRadius: '10px',
              fontWeight: '700', fontSize: '0.95rem',
              background: isLogin ? '#00d4ff' : 'transparent',
              color: isLogin ? '#000' : '#94a3b8'
            }}>
            SIGN IN
          </button>
          <button 
            onClick={() => setIsLogin(false)}
            style={{
              flex: 1, padding: '14px', borderRadius: '10px',
              fontWeight: '700', fontSize: '0.95rem',
              background: !isLogin ? '#7c3aed' : 'transparent',
              color: !isLogin ? '#fff' : '#94a3b8'
            }}>
            REGISTER
          </button>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {!isLogin && (
            <>
              <input type="text" placeholder="Full Name" value={name} onChange={e => setName(e.target.value)} required 
                className="glass" style={{ padding: '16px 20px', border: 'none', color: 'white', fontSize: '1rem' }} />
              <input type="tel" placeholder="Phone Number" value={phone} onChange={e => setPhone(e.target.value)} required 
                className="glass" style={{ padding: '16px 20px', border: 'none', color: 'white', fontSize: '1rem' }} />
            </>
          )}

          <input type="email" placeholder="Email Address" value={email} onChange={e => setEmail(e.target.value)} required 
            className="glass" style={{ padding: '16px 20px', border: 'none', color: 'white', fontSize: '1rem' }} />

          <div style={{ position: 'relative' }}>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              className="glass"
              style={{ padding: '16px 20px', border: 'none', color: 'white', fontSize: '1rem', width: '100%' }}
            />
            <button type="button" onClick={() => setShowPassword(!showPassword)} 
              style={{ position: 'absolute', right: '20px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: '#67e8f9' }}>
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          {error && <p style={{ color: '#f87171', textAlign: 'center' }}>{error}</p>}

          <button type="submit" disabled={isLoading} className="btn-neon" style={{ marginTop: '10px', fontSize: '1.1rem', height: '58px' }}>
            {isLoading ? 'CONNECTING...' : isLogin ? 'ENTER' : 'CREATE ACCOUNT'}
          </button>
        </form>

        <div style={{ marginTop: '32px', textAlign: 'center', fontSize: '0.85rem', color: '#67e8f9' }}>
          Demo: <strong>admin@smartcity.com</strong> / admin123
        </div>
      </div>
    </div>
  );
}