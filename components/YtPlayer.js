export default class YtPlayer extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    static get observedAttributes() {
        return ['video-id', 'start-time'];
    }

    attributeChangedCallback() {
        this.render();
    }

    connectedCallback() {
        this.render();
    }

    parseTimeToSeconds(timeStr) {
        if (!timeStr) return 0;
        const parts = timeStr.split(':').map(Number);
        if (parts.length === 3) return parts[0] * 3600 + parts[1] * 60 + parts[2];
        if (parts.length === 2) return parts[0] * 60 + parts[1];
        return parts[0];
    }

    render() {
        const videoId = this.getAttribute('video-id');
        const startTimeStr = this.getAttribute('start-time');
        const startTime = this.parseTimeToSeconds(startTimeStr);

        if (!videoId || videoId === 'undefined' || videoId === 'null') {
            this.shadowRoot.innerHTML = `
                <div style="color: var(--accent-amber); padding: 2rem; border: 1px dashed var(--accent-copper); text-align: center; font-family: sans-serif;">
                    ESPERANDO SELECCIÓN DE TEMA...
                </div>
            `;
            return;
        }

        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: block;
                    width: 100%;
                    aspect-ratio: 16 / 9;
                    background: #000;
                    border: 1px solid var(--accent-copper, #92400e);
                    overflow: hidden;
                }
                iframe {
                    width: 100%;
                    height: 100%;
                    border: none;
                }
            </style>
            <iframe 
                src="https://www.youtube.com/embed/${videoId}?start=${startTime}&autoplay=1&rel=0&origin=${window.location.origin}" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                allowfullscreen>
            </iframe>
        `;
    }
}

customElements.define('yt-player', YtPlayer);
