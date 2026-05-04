// Este componente dibuja una lista de puntos importantes del video
// Cuando haces clic en uno, el video salta a ese segundo exacto
export default class HighlightList extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.render();
    }

    render() {
        const color = this.getAttribute('color') || '#d97706';
        const highlightsJson = this.getAttribute('highlights');
        let highlights = [];
        
        // El atributo 'highlights' viene como un string de JSON
        // Tenemos que convertirlo a un objeto de JS para usar .map()
        try {
            if (highlightsJson && highlightsJson !== 'undefined' && highlightsJson !== 'null') {
                highlights = JSON.parse(highlightsJson);
            }
        } catch (e) {
            console.error("Error parsing highlights", e);
        }

        // Si no hay highlights, no dibujamos nada
        if (highlights.length === 0) {
            this.shadowRoot.innerHTML = '';
            return;
        }

        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: block;
                    margin-top: 1rem;
                }
                .container {
                    display: flex;
                    flex-direction: column;
                    gap: 8px;
                }
                .item {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    padding: 8px;
                    background: rgba(13, 13, 26, 0.6);
                    border-left: 2px solid ${color};
                    cursor: pointer;
                    transition: all 0.2s;
                    font-family: 'Rajdhani', sans-serif;
                }
                .item:hover {
                    background: rgba(146, 64, 14, 0.1);
                    transform: translateX(5px); /* Efecto de desplazamiento al pasar el mouse */
                }
                .time {
                    font-family: 'Share Tech Mono', monospace;
                    color: ${color};
                    font-size: 0.9rem;
                    min-width: 60px;
                }
                .label {
                    color: white;
                    font-size: 0.9rem;
                    letter-spacing: 0.5px;
                }
            </style>
            <div class="container">
                ${highlights.map(h => `
                    <div class="item" data-time="${h.time}">
                        <span class="time">[${h.time}]</span>
                        <span class="label">${h.label}</span>
                    </div>
                `).join('')}
            </div>
        `;

        // Agregamos el evento de clic a cada item de la lista
        this.shadowRoot.querySelectorAll('.item').forEach(item => {
            item.onclick = () => {
                // Lanzamos un evento 'seek' que la App escuchará para adelantar el YouTube
                this.dispatchEvent(new CustomEvent('seek', {
                    detail: { time: item.dataset.time },
                    bubbles: true,
                    composed: true
                }));
            };
        });
    }
}

customElements.define('highlight-list', HighlightList);
