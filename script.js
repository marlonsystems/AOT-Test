/* =========================
   AOT CORE SCRIPT
   ========================= */

const AOT = {
    state: {
        view: "start",
        songs: JSON.parse(localStorage.getItem("aot_songs")) || [
            "Echoes of Neon",
            "Midnight Run",
            "Silent Frame"
        ]
    },

    /* ---------- INIT ---------- */
    init() {
        this.cache();
        this.bindNav();
        this.render();
        console.log("AOT Core initialized");
    },

    cache() {
        this.content = document.getElementById("content");
        this.navItems = document.querySelectorAll("nav span");
    },

    /* ---------- NAV ---------- */
    bindNav() {
        this.navItems.forEach(item => {
            item.addEventListener("click", () => {
                this.switchView(item.textContent.toLowerCase());
                this.setActive(item);
            });
        });
    },

    setActive(activeItem) {
        this.navItems.forEach(i => i.classList.remove("active"));
        activeItem.classList.add("active");
    },

    switchView(view) {
        if (this.state.view === view) return;
        this.state.view = view;
        this.animateOut(() => this.render());
    },

    /* ---------- ANIMATION ---------- */
    animateOut(callback) {
        this.content.style.opacity = "0";
        this.content.style.transform = "translateY(10px)";
        setTimeout(() => {
            callback();
            this.animateIn();
        }, 200);
    },

    animateIn() {
        this.content.style.opacity = "1";
        this.content.style.transform = "translateY(0)";
    },

    /* ---------- RENDER ---------- */
    render() {
        this.content.innerHTML = "";

        const views = {
            start: () => this.renderStart(),
            film: () => this.renderFilms(),
            serie: () => this.renderSeries(),
            musik: () => this.renderMusic()
        };

        views[this.state.view]?.();
    },

    renderStart() {
        this.content.innerHTML = `
            <div class="section">
                <h2>AOT Originals</h2>
                <div class="row">
                    <div class="card">NEON CITY<br>Film</div>
                    <div class="card">BLACK SIGNAL<br>Serie</div>
                </div>
            </div>
            <div class="section">
                <h2>Soundtracks</h2>
                <div class="row">
                    ${this.state.songs.map(s => `<div class="music">${s}</div>`).join("")}
                </div>
            </div>
        `;
    },

    renderFilms() {
        this.content.innerHTML = `
            <h2>Filme</h2>
            <div class="row">
                <div class="card">NEON CITY</div>
                <div class="card">LAST HORIZON</div>
            </div>
        `;
    },

    renderSeries() {
        this.content.innerHTML = `
            <h2>Serien</h2>
            <div class="row">
                <div class="card">BLACK SIGNAL</div>
                <div class="card">DARK ZONE</div>
            </div>
        `;
    },

    renderMusic() {
        this.content.innerHTML = `
            <div class="upload">
                <input id="songInput" placeholder="Song Name eingeben">
                <button onclick="AOT.addSong()">Hochladen</button>
            </div>
            <div class="row">
                ${this.state.songs.map(s => `<div class="music">${s}</div>`).join("")}
            </div>
        `;
    },

    /* ---------- MUSIC ---------- */
    addSong() {
        const input = document.getElementById("songInput");
        if (!input || !input.value.trim()) return;

        this.state.songs.push(input.value.trim());
        localStorage.setItem("aot_songs", JSON.stringify(this.state.songs));
        this.render();
    }
};

/* ---------- AUTO START ---------- */
document.addEventListener("DOMContentLoaded", () => AOT.init());


