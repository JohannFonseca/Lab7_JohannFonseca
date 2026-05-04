// Este componente es un Web Component personalizado para manejar el video de YouTube
// Es como crear nuestra propia etiqueta de HTML <yt-player>
export default class YtPlayer extends HTMLElement {
    constructor() {
        super(); // Siempre llamar a super() en el constructor
        // attachShadow crea una "burbuja" aislada para que nuestro CSS no afecte al resto de la página
        this.attachShadow({ mode: 'open' });
    }

    // Aquí le decimos al navegador qué atributos queremos vigilar
    // Si estos cambian, se dispara attributeChangedCallback
    static get observedAttributes() {
        return ['video-id', 'start-time'];
    }

    // Cada vez que cambiamos el ID del video o el tiempo, redibujamos
    attributeChangedCallback() {
        this.render();
    }

    // Cuando el componente se mete en el DOM por primera vez
    connectedCallback() {
        this.render();
    }

    // Esta función es un dolor de cabeza, pero sirve para pasar "00:01:30" a segundos puros
    // YouTube necesita los segundos exactos para el parámetro ?start=
    parseTimeToSeconds(timeStr) {
        if (!timeStr) return 0;
        const parts = timeStr.split(':').map(Number);
        // Maneja formatos HH:MM:SS, MM:SS o solo SS
        if (parts.length === 3) return parts[0] * 3600 + parts[1] * 60 + parts[2];
        if (parts.length === 2) return parts[0] * 60 + parts[1];
        return parts[0];
    }

    // Aquí es donde sucede la magia visual
    render() {
        const videoId = this.getAttribute('video-id');
        const startTimeStr = this.getAttribute('start-time');
        const startTime = this.parseTimeToSeconds(startTimeStr);

        // Si no hay video seleccionado, mostramos un mensaje bonito para no dejar el hueco
        if (!videoId || videoId === 'undefined' || videoId === 'null') {
            this.shadowRoot.innerHTML = `
                <div style="color: var(--accent-amber); padding: 2rem; border: 1px dashed var(--accent-copper); text-align: center; font-family: sans-serif;">
                    ESPERANDO SELECCIÓN DE TEMA...
                </div>
            `;
            return;
        }

        // Metemos el CSS y el iframe de YouTube dentro del Shadow DOM
        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: block;
                    width: 100%;
                    aspect-ratio: 16 / 9; /* Esto mantiene la forma de tele vieja/moderna */
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
            <!-- El iframe carga el video con autoplay y el tiempo de inicio -->
            <iframe 
                src="https://www.youtube.com/embed/${videoId}?start=${startTime}&autoplay=1&rel=0&origin=${window.location.origin}" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                allowfullscreen>
            </iframe>
        `;
    }
}

// Registramos el componente para poder usar <yt-player> en el HTML
customElements.define('yt-player', YtPlayer);
