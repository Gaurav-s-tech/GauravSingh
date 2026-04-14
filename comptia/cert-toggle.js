// cert-toggle.js — Shared certification panel toggle for CompTIA and Microsoft pages
function toggleCert(certId) {
    document.querySelectorAll('.cert-select-card').forEach(function (card) {
        card.classList.remove('active');
    });

    document.querySelectorAll('.cert-panel').forEach(function (panel) {
        panel.classList.remove('open');
    });

    document.getElementById('cert-' + certId).classList.add('active');

    var panel = document.getElementById('panel-' + certId);
    panel.classList.add('open');

    setTimeout(function () {
        if (typeof ScrollTrigger !== 'undefined') {
            ScrollTrigger.refresh();
        }

        var smoother = ScrollSmoother.get();
        if (smoother) {
            smoother.scrollTo(panel, true, 'top top+=80');
        } else if (typeof gsap !== 'undefined') {
            var panelTop = panel.getBoundingClientRect().top + window.scrollY - 80;
            gsap.to(window, { duration: 0.8, scrollTo: panelTop, ease: 'power2.out' });
        } else {
            panel.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }, 150);
}
