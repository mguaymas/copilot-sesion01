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

        {/* Microsoft Certifications */}
        <section className={styles.certSection}>
          <div className={styles.certHeader}>
            <span className={styles.pillTag}>Microsoft Learn</span>
            <h2 className={styles.certHeading}>Certificaciones Microsoft 2025–2026</h2>
            <p className={styles.certSubtitle}>
              Impulsa tu carrera con las certificaciones más relevantes de Microsoft para este año.
            </p>
          </div>
          <div className={styles.certGrid}>
            <div className={styles.certCard}>
              <span className={styles.certBadge}>Principiante</span>
              <div className={styles.certIconWrap} aria-hidden="true">
                <svg width="28" height="28" fill="none" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z" fill="#0078d4"/>
                </svg>
              </div>
              <h3 className={styles.certTitle}>AZ-900</h3>
              <p className={styles.certName}>Microsoft Azure Fundamentals</p>
              <p className={styles.certDesc}>
                Comprende los conceptos de nube, servicios de Azure, seguridad, privacidad,
                cumplimiento y precios. Ideal para quienes inician en la nube.
              </p>
              <a
                href="https://learn.microsoft.com/es-es/credentials/certifications/azure-fundamentals/"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.certLink}
              >
                Ver certificación →
              </a>
            </div>

            <div className={styles.certCard}>
              <span className={styles.certBadge}>Principiante</span>
              <div className={styles.certIconWrap} aria-hidden="true">
                <svg width="28" height="28" fill="none" viewBox="0 0 24 24">
                  <path d="M12 2a10 10 0 1 0 0 20A10 10 0 0 0 12 2zm0 18a8 8 0 1 1 0-16 8 8 0 0 1 0 16zm-1-5h2v2h-2v-2zm0-8h2v6h-2V7z" fill="#0078d4"/>
                </svg>
              </div>
              <h3 className={styles.certTitle}>AI-900</h3>
              <p className={styles.certName}>Microsoft Azure AI Fundamentals</p>
              <p className={styles.certDesc}>
                Demuestra conocimientos fundamentales de IA y aprendizaje automático en Azure,
                incluyendo visión artificial, procesamiento de lenguaje natural y IA generativa.
              </p>
              <a
                href="https://learn.microsoft.com/es-es/credentials/certifications/azure-ai-fundamentals/"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.certLink}
              >
                Ver certificación →
              </a>
            </div>

            <div className={styles.certCard}>
              <span className={styles.certBadge}>Principiante</span>
              <div className={styles.certIconWrap} aria-hidden="true">
                <svg width="28" height="28" fill="none" viewBox="0 0 24 24">
                  <path d="M12 1l9 4v6c0 5-3.75 9.74-9 11C6.75 20.74 3 16 3 11V5l9-4zm0 2.18L5 6.31V11c0 4.13 2.94 7.99 7 9.19 4.06-1.2 7-5.06 7-9.19V6.31L12 3.18z" fill="#0078d4"/>
                </svg>
              </div>
              <h3 className={styles.certTitle}>SC-900</h3>
              <p className={styles.certName}>Microsoft Security, Compliance & Identity Fundamentals</p>
              <p className={styles.certDesc}>
                Cubre los fundamentos de seguridad, cumplimiento e identidad en Microsoft Azure y
                Microsoft 365. Perfecta para roles de seguridad.
              </p>
              <a
                href="https://learn.microsoft.com/es-es/credentials/certifications/security-compliance-and-identity-fundamentals/"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.certLink}
              >
                Ver certificación →
              </a>
            </div>

            <div className={styles.certCard}>
              <span className={`${styles.certBadge} ${styles.certBadgeIntermediate}`}>Intermedio</span>
              <div className={styles.certIconWrap} aria-hidden="true">
                <svg width="28" height="28" fill="none" viewBox="0 0 24 24">
                  <path d="M20 7H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2zm-9 6H7v-1h4v1zm6 0h-4v-1h4v1z" fill="#0078d4"/>
                </svg>
              </div>
              <h3 className={styles.certTitle}>AZ-104</h3>
              <p className={styles.certName}>Microsoft Azure Administrator Associate</p>
              <p className={styles.certDesc}>
                Demuestra habilidades para implementar, gestionar y supervisar la infraestructura
                de Azure, incluyendo identidades, gobernanza, almacenamiento y redes.
              </p>
              <a
                href="https://learn.microsoft.com/es-es/credentials/certifications/azure-administrator/"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.certLink}
              >
                Ver certificación →
              </a>
            </div>

            <div className={styles.certCard}>
              <span className={`${styles.certBadge} ${styles.certBadgeIntermediate}`}>Intermedio</span>
              <div className={styles.certIconWrap} aria-hidden="true">
                <svg width="28" height="28" fill="none" viewBox="0 0 24 24">
                  <path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z" fill="#0078d4"/>
                </svg>
              </div>
              <h3 className={styles.certTitle}>AZ-204</h3>
              <p className={styles.certName}>Developing Solutions for Microsoft Azure</p>
              <p className={styles.certDesc}>
                Para desarrolladores que diseñan e implementan soluciones en Azure: Azure Functions,
                aplicaciones web, almacenamiento, seguridad y monitoreo.
              </p>
              <a
                href="https://learn.microsoft.com/es-es/credentials/certifications/azure-developer/"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.certLink}
              >
                Ver certificación →
              </a>
            </div>

            <div className={styles.certCard}>
              <span className={`${styles.certBadge} ${styles.certBadgeAdvanced}`}>Avanzado</span>
              <div className={styles.certIconWrap} aria-hidden="true">
                <svg width="28" height="28" fill="none" viewBox="0 0 24 24">
                  <path d="M12 2L2 7l10 5 10-5-10-5zm0 7L4.5 5.5 12 2l7.5 3.5L12 9zm-8 3l8 4 8-4v2l-8 4-8-4v-2z" fill="#0078d4"/>
                </svg>
              </div>
              <h3 className={styles.certTitle}>AZ-305</h3>
              <p className={styles.certName}>Designing Microsoft Azure Infrastructure Solutions</p>
              <p className={styles.certDesc}>
                Valida la experiencia en diseño de soluciones de infraestructura en Azure:
                identidad, gobierno, datos, continuidad del negocio y migraciones.
              </p>
              <a
                href="https://learn.microsoft.com/es-es/credentials/certifications/azure-solutions-architect/"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.certLink}
              >
                Ver certificación →
              </a>
            </div>
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
