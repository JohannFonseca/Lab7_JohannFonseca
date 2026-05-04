// Este componente es un "nodo" o botoncito en el árbol de habilidades
// Representa un tema individual (como Historia, Ingredientes, etc.)
export default class SkillNode extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    static get observedAttributes() {
        return ['selected', 'topic-id', 'title', 'icon', 'phase-color'];
    }

    attributeChangedCallback() {
        this.render();
    }

    connectedCallback() {
        this.render();
        // Cuando hacemos clic en el nodo, lanzamos el evento 'node-select'
        // app.js está escuchando este evento para cambiar el video
        this.addEventListener('click', () => {
            const id = this.getAttribute('topic-id');
            if (id) {
                this.dispatchEvent(new CustomEvent('node-select', {
                    detail: { topicId: id },
                    bubbles: true,
                    composed: true
                }));
            }
        });
    }

    render() {
        const id = this.getAttribute('topic-id');
        const title = this.getAttribute('title');
        const icon = this.getAttribute('icon');
        const color = this.getAttribute('phase-color') || '#d97706';
        const selected = this.hasAttribute('selected');

        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: block;
                    width: 72px;
                    height: 72px;
                    cursor: pointer;
                }
                .node {
                    width: 100%;
                    height: 100%;
                    /* Si está seleccionado, cambia el color de fondo */
                    background: ${selected ? color : 'var(--surface, #0d0d1a)'};
                    border: 1px solid ${selected ? 'white' : color};
                    /* Este clip-path le da esa forma futurista con esquinas cortadas */
                    clip-path: polygon(0 0, 85% 0, 100% 15%, 100% 100%, 15% 100%, 0 85%);
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    transition: all 0.2s ease;
                    position: relative;
                    box-shadow: ${selected ? `0 0 15px ${color}` : 'none'};
                }
                .node:hover {
                    transform: scale(1.05); /* Se hace un poquito más grande al pasar el mouse */
                    box-shadow: 0 0 15px ${color};
                    border-color: white;
                }
                .icon {
                    font-size: 1.5rem;
                    margin-bottom: 2px;
                }
                .title {
                    font-family: 'Share Tech Mono', monospace;
                    font-size: 0.5rem;
                    text-transform: uppercase;
                    color: ${selected ? 'black' : 'white'};
                    text-align: center;
                    padding: 0 2px;
                    overflow: visible;
                    white-space: normal;
                    line-height: 1;
                    width: 100%;
                }
            </style>
            <div class="node" title="${title}">
                <div class="icon">${icon}</div>
                <div class="title">${title}</div>
            </div>
        `;
    }
}

customElements.define('skill-node', SkillNode);
