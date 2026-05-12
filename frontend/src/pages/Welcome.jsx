import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import styles from './Welcome.module.css';

export default function WelcomePage() {
  const { user, clearSession } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    clearSession();
    navigate('/login');
  }

  return (
    <div className={styles.page}>
      {/* Nav */}
      <nav className={styles.nav}>
        <span className={styles.navLogo}>
          <svg width="22" height="22" viewBox="0 0 28 28" fill="none" aria-hidden="true">
            <circle cx="14" cy="14" r="14" fill="#533afd" />
            <path d="M8 14.5c0-3.31 2.69-6 6-6s6 2.69 6 6-2.69 6-6 6-6-2.69-6-6z" fill="#fff" opacity=".3" />
            <path d="M11 14.5c0-1.65 1.35-3 3-3s3 1.35 3 3-1.35 3-3 3-3-1.35-3-3z" fill="#fff" />
          </svg>
          Stripi
        </span>
        <div className={styles.navActions}>
          <span className={styles.navUser}>{user}</span>
          <button className={styles.btnSecondary} onClick={handleLogout}>
            Cerrar sesión
          </button>
        </div>
      </nav>

      {/* Hero with gradient mesh */}
      <div className={styles.mesh} aria-hidden="true" />

      <main className={styles.main}>
        <section className={styles.hero}>
          <span className={styles.pillTag}>Panel de control</span>
          <h1 className={styles.heroHeading}>
            Bienvenido, <br />{user}
          </h1>
          <p className={styles.heroBody}>
            Has iniciado sesión correctamente. Tu token de acceso está activo y seguro
            en tu sesión actual.
          </p>
        </section>

        {/* Feature cards */}
        <section className={styles.cards}>
          <div className={styles.card}>
            <div className={styles.cardIcon} aria-hidden="true">
              <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path d="M12 2a10 10 0 1 1 0 20A10 10 0 0 1 12 2zm0 2a8 8 0 1 0 0 16A8 8 0 0 0 12 4zm-1 4h2v5h-2V8zm0 7h2v2h-2v-2z" fill="#533afd" />
              </svg>
            </div>
            <h2 className={styles.cardTitle}>Sesión activa</h2>
            <p className={styles.cardBody}>
              Tu token de acceso expira en <strong>300 segundos</strong>. Usa el token de
              refresco para renovar tu sesión automáticamente.
            </p>
          </div>

          <div className={styles.card}>
            <div className={styles.cardIcon} aria-hidden="true">
              <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path d="M12 1l9 4v6c0 5-3.75 9.74-9 11C6.75 20.74 3 16 3 11V5l9-4zm0 2.18L5 6.31V11c0 4.13 2.94 7.99 7 9.19 4.06-1.2 7-5.06 7-9.19V6.31L12 3.18zM11 8h2v5h-2V8zm0 7h2v2h-2v-2z" fill="#533afd" />
              </svg>
            </div>
            <h2 className={styles.cardTitle}>JWT seguro</h2>
            <p className={styles.cardBody}>
              Autenticación basada en JSON Web Tokens con firma HS256. Los tokens
              se almacenan únicamente en la sesión del navegador.
            </p>
          </div>

          <div className={styles.card}>
            <div className={styles.cardIcon} aria-hidden="true">
              <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path d="M4 6h16M4 12h16M4 18h7" stroke="#533afd" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </div>
            <h2 className={styles.cardTitle}>API REST</h2>
            <p className={styles.cardBody}>
              Backend construido con FastAPI. Endpoints disponibles: <code>/auth/login</code> y{' '}
              <code>/auth/refresh</code>.
            </p>
          </div>
        </section>

        {/* Dashboard mockup */}
        <section className={styles.mockupSection}>
          <div className={styles.mockup}>
            <div className={styles.mockupHeader}>
              <span className={styles.mockupTitle}>Estado de la sesión</span>
              <span className={styles.statusBadge}>● Activa</span>
            </div>
            <table className={styles.mockupTable}>
              <thead>
                <tr>
                  <th>Parámetro</th>
                  <th>Valor</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Usuario</td>
                  <td className={styles.tnum}>{user}</td>
                </tr>
                <tr>
                  <td>Tipo de token</td>
                  <td className={styles.tnum}>Bearer JWT</td>
                </tr>
                <tr>
                  <td>Expiración</td>
                  <td className={styles.tnum}>300 s</td>
                </tr>
                <tr>
                  <td>Algoritmo</td>
                  <td className={styles.tnum}>HS256</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
}
