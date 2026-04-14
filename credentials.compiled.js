// credentials.compiled.js — Pre-compiled from credentials.js (no Babel needed)
"use strict";

var _React = React;
var useState = _React.useState;
var useEffect = _React.useEffect;
var h = React.createElement;

// --- DATA ---
var CERTIFICATES = [
    { id: 1, title: "Endpoint Administrator", code: "MD-102", issuer: "Microsoft", img: "certifications/md-102.png",
      url: "https://learn.microsoft.com/api/credentials/share/en-us/GauravSingh-7912/" },
    { id: 2, title: "Azure Fundamentals", img: "certifications/az-900.png", code: "AZ-900", issuer: "Microsoft",
      url: "https://learn.microsoft.com/api/credentials/share/en-us/GauravSingh-7912/10AA771F7F24C256?sharingId=258B974C6AF453FD" },
    { id: 3, title: "M365 Fundamentals", code: "MS-900", issuer: "Microsoft", img: "certifications/ms-900.png",
      url: "https://learn.microsoft.com/api/credentials/share/en-us/GauravSingh-7912/FD1F99EC31E6EE20?sharingId=258B974C6AF453FD" },
    { id: 4, title: "Google IT Support", code: "Professional", issuer: "Google", img: "certifications/google-it.png",
      url: "https://coursera.org/share/ef71a62eaf2e305cea1a9c61dba45644" },
    { id: 5, title: "IBM AI Engineering", code: "Professional", issuer: "IBM", img: "certifications/ibm-ai.png",
      url: "https://coursera.org/share/15de6e4130424c6639d47f863b50bf18" },
    { id: 6, title: "Linux", code: "Professional", issuer: "Linux", img: "certifications/linux.png",
      url: "https://www.linkedin.com/learning/certificates/2d6f45c475833e2c0a432a60d9532a7ccf779b7d2e0f6f43c5c6558d463ef0b7?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_certifications_details%3BjDLVAsIoSWiemPfpA7HdHQ%3D%3D" },
];

var BADGES = [
    { id: 1, name: "Badge 1", badgeId: "4e201feb-2e1c-4f7b-9094-ff487404e006" },
    { id: 2, name: "Badge 2", badgeId: "82ae1a2a-999b-4f39-b5b5-e66614a00d35" },
    { id: 3, name: "Badge 3", badgeId: "5b1e405e-21b0-418b-af3e-40ad871147c6" },
    { id: 4, name: "Badge 4", badgeId: "461df96f-bbdf-443f-9762-50474c19f56f" },
    { id: 5, name: "Badge 5", badgeId: "b13ff8be-47d3-44e4-bb2e-877991f9d889" },
];

var APPLIED_SKILLS = [
    { id: 1, title: "Implement Identity & Access Management", issuer: "Microsoft",
      url: "https://learn.microsoft.com/api/credentials/share/en-us/GauravSingh-7912/27803118315447CB?sharingId=258B974C6AF453FD",
      img: "certifications/as-iame.png" },
    { id: 2, title: "Deploy & Configure Azure Monitor", issuer: "Microsoft",
      url: "https://learn.microsoft.com/api/credentials/share/en-us/GauravSingh-7912/27803118315447CB?sharingId=258B974C6AF453FD",
      img: "certifications/as-dcam.png" },
    { id: 3, title: "Configure Active Directory Domain Services", issuer: "Microsoft",
      url: "https://learn.microsoft.com/en-ca/users/gauravsingh-6655/credentials/7a348bc5a60f452e?ref=https%3A%2F%2Fwww.linkedin.com%2F",
      img: "certifications/as-adds.png" },
    { id: 4, title: "IBM Cognitive Enterprise", issuer: "IBM",
      url: "https://courses.cognitiveclass.ai/certificates/25c3fb6e59bf4517a0d38d7e47f55651",
      img: "certifications/ibm-ce.png" },
    { id: 5, title: "Configure SIEM Security Tools", issuer: "Microsoft",
      url: "https://learn.microsoft.com/api/credentials/share/en-us/GauravSingh-7912/BD7F66CE8303A831?sharingId=258B974C6AF453FD",
      img: "certifications/as-csmt.png" },
];

// --- Helper: render a cert/skill card ---
function renderCertCard(item, showCode) {
    return h('div', { key: item.id, className: 'cert-card' },
        h('a', { href: item.url, target: '_blank', rel: 'noopener noreferrer' },
            h('div', { className: 'cert-img-container' },
                h('img', { src: item.img, alt: item.title })
            ),
            h('div', { className: 'cert-preview-overlay' },
                h('img', { src: item.img, alt: item.title + ' Preview' })
            ),
            h('div', { className: 'cert-details' },
                h('h3', { style: { textDecoration: 'none', color: 'var(--primary-color)' } }, item.title),
                h('p', { style: { textDecoration: 'none', color: 'var(--primary-color)' } },
                    showCode ? (item.code + ' \u2022 ' + item.issuer) : item.issuer
                ),
                h('span', { style: {
                    display: 'inline-block', marginTop: '1rem', fontSize: '0.85rem',
                    fontWeight: 'bold', textDecoration: 'underline', color: 'var(--primary-color)'
                } }, showCode ? 'View Credential' : 'Verify Credential \u2197')
            )
        )
    );
}

// --- Main Component ---
var CredentialsComponent = function () {
    var _useState1 = useState('certificates');
    var activeTab = _useState1[0];
    var setActiveTab = _useState1[1];

    var _useState2 = useState(false);
    var isLoaded = _useState2[0];
    var setIsLoaded = _useState2[1];

    useEffect(function () {
        setIsLoaded(true);
        if (window.lucide) window.lucide.createIcons();

        if (activeTab === 'badges') {
            var oldScript = document.getElementById('credly-embed-script');
            if (oldScript) oldScript.remove();

            var script = document.createElement('script');
            script.id = 'credly-embed-script';
            script.src = '//cdn.credly.com/assets/utilities/embed.js';
            script.async = true;
            document.body.appendChild(script);
        }
    }, [activeTab]);

    var tabLabels = { certificates: '01', badges: '02', skills: '03' };

    return h('div', { className: 'credentials-wrapper' },
        // Header
        h('div', { className: 'react-header' },
            h('h2', { className: 'section-title' }, 'Credentials & Skills'),
            h('p', { style: { fontFamily: 'var(--font-mono)', opacity: 0.7 } },
                '// SYSTEM.VERIFIED_MODULES', h('br'), '// SELECT_TAB_TO_VIEW'
            )
        ),

        // Tabs
        h('div', { className: 'react-tabs' },
            ['certificates', 'badges', 'skills'].map(function (tab) {
                return h('button', {
                    key: tab,
                    onClick: function () { setActiveTab(tab); },
                    className: 'react-tab-btn ' + (activeTab === tab ? 'active' : '')
                }, tabLabels[tab] + '_' + tab);
            })
        ),

        // Content
        h('div', { className: 'react-content' },

            // CERTIFICATES TAB
            activeTab === 'certificates' && h('div', { className: 'react-grid-certs fade-in' },
                CERTIFICATES.map(function (cert) { return renderCertCard(cert, true); })
            ),

            // BADGES TAB
            activeTab === 'badges' && h('div', { className: 'fade-in' },
                h('h3', { style: {
                    fontFamily: 'var(--font-mono)', fontSize: '1.2rem', marginBottom: '1.5rem',
                    textTransform: 'uppercase', borderBottom: 'var(--border-width) solid var(--primary-color)',
                    paddingBottom: '0.5rem'
                } }, '// Verified Badges'),
                h('div', { className: 'react-grid-badges' },
                    BADGES.map(function (badge) {
                        return h('div', {
                            key: badge.id, className: 'badge-card',
                            style: { padding: 0, border: 'none', background: 'transparent' }
                        },
                            h('div', {
                                'data-iframe-width': '270', 'data-iframe-height': '270',
                                'data-share-badge-id': badge.badgeId,
                                'data-share-badge-host': 'https://www.credly.com'
                            })
                        );
                    })
                )
            ),

            // SKILLS TAB
            activeTab === 'skills' && h('div', { className: 'fade-in' },
                h('div', { className: 'applied-skills-section' },
                    h('h3', { style: {
                        fontFamily: 'var(--font-mono)', fontSize: '1.2rem', marginBottom: '1.5rem',
                        textTransform: 'uppercase', borderBottom: 'var(--border-width) solid var(--primary-color)',
                        paddingBottom: '0.5rem'
                    } }, '// Microsoft Applied Skills'),
                    h('div', { className: 'react-grid-certs' },
                        APPLIED_SKILLS.map(function (skill) { return renderCertCard(skill, false); })
                    )
                )
            )
        )
    );
};

// Mount
var rootElement = document.getElementById('react-credentials-root');
var root = ReactDOM.createRoot(rootElement);
root.render(h(CredentialsComponent));
