// credentials.js

const { useState, useEffect } = React;

// --- DATA ---
const CERTIFICATES = [
    {
        id: 1, title: "Endpoint Administrator", code: "MD-102", issuer: "Microsoft", img: "certifications/md-102.png",
        url: "https://learn.microsoft.com/api/credentials/share/en-us/GauravSingh-7912/"
    },
    {
        id: 2,
        title: "Azure Fundamentals",
        img: "certifications/az-900.png",
        code: "AZ-900",
        issuer: "Microsoft",
        url: "https://learn.microsoft.com/api/credentials/share/en-us/GauravSingh-7912/10AA771F7F24C256?sharingId=258B974C6AF453FD"
    },
    {
        id: 3, title: "M365 Fundamentals", code: "MS-900", issuer: "Microsoft", img: "certifications/ms-900.png",
        url: "https://learn.microsoft.com/api/credentials/share/en-us/GauravSingh-7912/FD1F99EC31E6EE20?sharingId=258B974C6AF453FD"
    },
    {
        id: 4, title: "Google IT Support", code: "Professional", issuer: "Google", img: "certifications/google-it.png",
        url: "https://coursera.org/share/ef71a62eaf2e305cea1a9c61dba45644"
    },
    {
        id: 5, title: "IBM AI Engineering", code: "Professional", issuer: "IBM", img: "certifications/ibm-ai.png",
        url: "https://coursera.org/share/15de6e4130424c6639d47f863b50bf18"
    },
    {
        id: 6, title: "Linux", code: "Professional", issuer: "Linux", img: "certifications/linux.png",
        url: "https://www.linkedin.com/learning/certificates/2d6f45c475833e2c0a432a60d9532a7ccf779b7d2e0f6f43c5c6558d463ef0b7?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_certifications_details%3BjDLVAsIoSWiemPfpA7HdHQ%3D%3D"
    },
];

const BADGES = [
    { id: 1, name: "Badge 1", badgeId: "4e201feb-2e1c-4f7b-9094-ff487404e006" },
    { id: 2, name: "Badge 2", badgeId: "82ae1a2a-999b-4f39-b5b5-e66614a00d35" },
    { id: 3, name: "Badge 3", badgeId: "5b1e405e-21b0-418b-af3e-40ad871147c6" },
    { id: 4, name: "Badge 4", badgeId: "461df96f-bbdf-443f-9762-50474c19f56f" },
    { id: 5, name: "Badge 5", badgeId: "b13ff8be-47d3-44e4-bb2e-877991f9d889" },
];

const APPLIED_SKILLS = [
    {
        id: 1,
        title: "Microsoft Applied Skill 1",
        issuer: "Microsoft",
        url: "https://learn.microsoft.com/api/credentials/share/en-us/GauravSingh-7912/27803118315447CB?sharingId=258B974C6AF453FD",
        img: "certifications/as-iame.png",
    },
    {
        id: 2,
        title: "Microsoft Applied Skill 2",
        issuer: "Microsoft",
        url: "https://learn.microsoft.com/api/credentials/share/en-us/GauravSingh-7912/27803118315447CB?sharingId=258B974C6AF453FD",
        img: "certifications/as-dcam.png",
    },
    {
        id: 3,
        title: "Microsoft Applied Skill 3",
        issuer: "Microsoft",
        url: "https://learn.microsoft.com/en-ca/users/gauravsingh-6655/credentials/7a348bc5a60f452e?ref=https%3A%2F%2Fwww.linkedin.com%2F",
        img: "certifications/as-adds.png",
    },
    {
        id: 4,
        title: "IBM",
        issuer: "IBM",
        url: "https://courses.cognitiveclass.ai/certificates/25c3fb6e59bf4517a0d38d7e47f55651",
        img: "certifications/ibm-ce.png",
    },
    {
        id: 5,
        title: "Microsoft Applied Skill 4",
        issuer: "Microsoft",
        url: "https://learn.microsoft.com/api/credentials/share/en-us/GauravSingh-7912/BD7F66CE8303A831?sharingId=258B974C6AF453FD",
        img: "certifications/as-csmt.png",
    },
];

const CredentialsComponent = () => {
    const [activeTab, setActiveTab] = useState('certificates');
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        setIsLoaded(true);
        // Initialize Lucide icons
        if (window.lucide) window.lucide.createIcons();

        // Dynamically load the Credly script when the Badges tab is active
        if (activeTab === 'badges') {
            const oldScript = document.getElementById('credly-embed-script');
            if (oldScript) oldScript.remove();

            const script = document.createElement('script');
            script.id = 'credly-embed-script';
            script.src = "//cdn.credly.com/assets/utilities/embed.js";
            script.async = true;
            document.body.appendChild(script);
        }
    }, [activeTab]);

    return (
        <div className="credentials-wrapper">

            {/* Header */}
            <div className="react-header">
                <h2 className="section-title">Credentials &amp; Skills</h2>
                <p style={{ fontFamily: 'var(--font-mono)', opacity: 0.7 }}>
                    // SYSTEM.VERIFIED_MODULES <br />
                    // SELECT_TAB_TO_VIEW
                </p>
            </div>

            {/* Tabs */}
            <div className="react-tabs">
                {['certificates', 'badges', 'skills'].map(tab => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`react-tab-btn ${activeTab === tab ? 'active' : ''}`}
                    >
                        0{tab === 'certificates' ? '1' : tab === 'badges' ? '2' : '3'}_{tab}
                    </button>
                ))}
            </div>

            {/* Content Area */}
            <div className="react-content">

                {/* CERTIFICATES TAB */}
                {activeTab === 'certificates' && (
                    <div className="react-grid-certs fade-in">
                        {CERTIFICATES.map(cert => (
                            <div key={cert.id} className="cert-card">
                                <a href={cert.url}
                                    target="_blank"
                                    rel="noopener noreferrer">
                                    <div className="cert-img-container">
                                        <img src={cert.img} alt={cert.title} />
                                    </div>

                                    {/* Hover Preview Overlay */}
                                    <div className="cert-preview-overlay">
                                        <img src={cert.img} alt={`${cert.title} Preview`} />
                                    </div>

                                    <div className="cert-details">
                                        <h3 style={{ textDecoration: 'none', color: 'var(--primary-color)' }}>{cert.title}</h3>
                                        <p style={{ textDecoration: 'none', color: 'var(--primary-color)' }}>{cert.code} • {cert.issuer}</p>
                                        <span style={{
                                            display: 'inline-block',
                                            marginTop: '1rem',
                                            fontSize: '0.85rem',
                                            fontWeight: 'bold',
                                            textDecoration: 'underline',
                                            color: 'var(--primary-color)'
                                        }}>View Credential</span>
                                    </div>
                                </a>
                            </div>
                        ))}
                    </div>
                )}

                {/* BADGES TAB */}
                {activeTab === 'badges' && (
                    <div className="fade-in">
                        <h3 style={{ fontFamily: 'var(--font-mono)', fontSize: '1.2rem', marginBottom: '1.5rem', textTransform: 'uppercase', borderBottom: 'var(--border-width) solid var(--primary-color)', paddingBottom: '0.5rem' }}>
                            // Verified Badges
                        </h3>

                        <div className="react-grid-badges">
                            {BADGES.map(badge => (
                                <div
                                    key={badge.id}
                                    className="badge-card"
                                    style={{ padding: 0, border: 'none', background: 'transparent' }}
                                >
                                    <div
                                        data-iframe-width="270"
                                        data-iframe-height="270"
                                        data-share-badge-id={badge.badgeId}
                                        data-share-badge-host="https://www.credly.com"
                                    ></div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* SKILLS TAB */}
                {activeTab === 'skills' && (
                    <div className="fade-in">
                        <div className="applied-skills-section">
                            <h3 style={{ fontFamily: 'var(--font-mono)', fontSize: '1.2rem', marginBottom: '1.5rem', textTransform: 'uppercase', borderBottom: 'var(--border-width) solid var(--primary-color)', paddingBottom: '0.5rem' }}>
                                // Microsoft Applied Skills
                            </h3>

                            <div className="react-grid-certs">
                                {APPLIED_SKILLS.map(skill => (
                                    <div key={skill.id} className="cert-card">
                                        <a
                                            href={skill.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            <div className="cert-img-container">
                                                <img src={skill.img} alt={skill.title} />
                                            </div>

                                            {/* Hover Preview Overlay */}
                                            <div className="cert-preview-overlay">
                                                <img src={skill.img} alt={`${skill.title} Preview`} />
                                            </div>

                                            <div className="cert-details">
                                                <h3 style={{ textDecoration: 'none', color: 'var(--primary-color)' }}>{skill.title}</h3>
                                                <p style={{ textDecoration: 'none', color: 'var(--primary-color)' }}>{skill.issuer}</p>
                                                <span style={{
                                                    display: 'inline-block',
                                                    marginTop: '1rem',
                                                    fontSize: '0.85rem',
                                                    fontWeight: 'bold',
                                                    textDecoration: 'underline',
                                                    color: 'var(--primary-color)'
                                                }}>
                                                    Verify Credential ↗
                                                </span>
                                            </div>
                                        </a>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

// Mount the component
const rootElement = document.getElementById('react-credentials-root');
const root = ReactDOM.createRoot(rootElement);
root.render(<CredentialsComponent />);