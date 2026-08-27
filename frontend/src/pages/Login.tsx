import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../components/UI/Card';
import { COLORS, RADIUS } from '../theme/tokens';
import { useAuth } from '../context/AuthContext';

export const Login: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      await login(email);
      navigate('/');
    } catch {
      setError('Something went wrong. Try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: COLORS.background,
      }}
    >
      <Card style={{ width: 360, padding: 32 }}>
        <div
          style={{
            fontFamily: "'Manrope', sans-serif",
            fontWeight: 700,
            fontSize: 20,
            color: COLORS.textPrimary,
            marginBottom: 8,
          }}
        >
          Sign in
        </div>
        <div style={{ fontSize: 13, color: COLORS.textMuted, marginBottom: 20 }}>
          Enter your email to continue.
        </div>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            required
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{
              width: '100%',
              boxSizing: 'border-box',
              background: COLORS.pillMutedBg,
              color: COLORS.textPrimary,
              border: `1px solid ${COLORS.inputBorder}`,
              borderRadius: RADIUS.input,
              padding: '10px 14px',
              fontSize: 14,
              fontFamily: "'Manrope', sans-serif",
              marginBottom: 12,
            }}
          />
          {error && (
            <div style={{ color: COLORS.negative, fontSize: 13, marginBottom: 12 }}>{error}</div>
          )}
          <button
            type="submit"
            disabled={submitting}
            style={{
              width: '100%',
              background: COLORS.accent,
              color: COLORS.background,
              border: 'none',
              borderRadius: RADIUS.input,
              padding: '10px 18px',
              fontWeight: 700,
              fontSize: 14,
              cursor: submitting ? 'default' : 'pointer',
              opacity: submitting ? 0.7 : 1,
              fontFamily: "'Manrope', sans-serif",
            }}
          >
            {submitting ? 'Signing in…' : 'Continue'}
          </button>
        </form>
      </Card>
    </div>
  );
};

export default Login;
