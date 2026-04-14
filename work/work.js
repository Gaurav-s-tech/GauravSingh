// work.js — Accordion + hover preview for work page
document.addEventListener('DOMContentLoaded', () => {
    // ── Accordion: experience rows ──
    document.querySelectorAll('.l-exp-row').forEach(btn => {
        btn.addEventListener('click', () => {
            const panel = btn.nextElementSibling;
            const open = btn.getAttribute('aria-expanded') === 'true';
            // Close all others
            document.querySelectorAll('.l-exp-row').forEach(b => {
                b.setAttribute('aria-expanded', 'false');
                b.nextElementSibling.hidden = true;
            });
            // Toggle clicked
            if (!open) {
                btn.setAttribute('aria-expanded', 'true');
                panel.hidden = false;
            }
            // Dismiss the hover preview on click
            document.getElementById('work-preview').classList.remove('show');
        });
    });

    // ── Hover preview (experience buttons + project links) ──
    const preview = document.getElementById("work-preview");
    const prevLabel = document.getElementById("work-prev-label");
    const prevList = document.getElementById("work-prev-list");

    function renderPreview(raw) {
        if (raw.includes('•')) {
            prevLabel.textContent = '';
            prevList.style.display = 'flex';
            prevList.innerHTML = '';
            raw.split('•').map(s => s.trim()).filter(s => s.length > 0).forEach(point => {
                const li = document.createElement('li');
                li.textContent = point;
                prevList.appendChild(li);
            });
        } else {
            prevList.style.display = 'none';
            prevList.innerHTML = '';
            prevLabel.textContent = raw.trim();
        }
    }

    // Experience buttons: show on hover, hide on mouseleave, also hide on click
    document.querySelectorAll("button.l-exp-row[data-preview]").forEach((btn) => {
        btn.addEventListener("mouseenter", () => {
            renderPreview(btn.dataset.preview);
            preview.classList.add("show");
        });
        btn.addEventListener("mouseleave", () => {
            preview.classList.remove("show");
        });
    });

    // Project links: show on hover, hide on mouseleave (normal behaviour)
    document.querySelectorAll("a.l-row[data-preview]").forEach((row) => {
        row.addEventListener("mouseenter", () => {
            renderPreview(row.dataset.preview);
            preview.classList.add("show");
        });
        row.addEventListener("mouseleave", () => {
            preview.classList.remove("show");
        });
    });

    document.addEventListener("mousemove", (e) => {
        const cardW = 380;
        const left = Math.min(e.clientX + 28, window.innerWidth - cardW - 16);
        preview.style.left = left + "px";
        preview.style.top = e.clientY - 75 + "px";
    });
});
