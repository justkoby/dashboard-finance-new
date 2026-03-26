import mtnLogo from '../assets/mtn_logo.png';

export default function MtnLogo() {
  return (
    <div className="mtn-logo-container" style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '40px' }}>
      <img src={mtnLogo} alt="MTN Logo" style={{ width: '45px', height: '45px', borderRadius: '50%' }} />
      <div style={{ lineHeight: '1', fontWeight: '800', color: '#5b5a58', fontSize: '1.2rem' }}>
        MTN<br />WORKSPACE
      </div>
    </div>
  );
}
