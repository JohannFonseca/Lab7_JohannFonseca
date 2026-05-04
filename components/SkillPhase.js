// Este componente agrupa varios SkillNodes bajo un mismo título (como "Fundamentos")
// Es como un contenedor para las diferentes etapas del curso
export default class SkillPhase extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.render();
    }

    render() {
        const title = this.getAttribute('title');
        const icon = this.getAttribute('icon');
        const color = this.getAttribute('phase-color') || '#d97706';

        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: block;
                    margin-bottom: 2rem; /* Espacio entre fases */
                }
                .header {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    margin-bottom: 1rem;
                }
                .icon {
                    font-size: 1.2rem;
                }
                .title {
                    font-family: 'MedievalSharp', cursive;
                    font-size: 0.9rem;
                    color: ${color};
                    text-transform: uppercase;
                    letter-spacing: 1px;
                }
                .line {
                    /* Esta es la línea decorativa que se va desvaneciendo */
                    flex-grow: 1;
                    height: 1px;
                    background: linear-gradient(to right, ${color}, transparent);
                }
                .grid {
                    /* Los nodos se acomodan uno al lado del otro y saltan de línea si no caben */
                    display: flex;
                    flex-wrap: wrap;
                    gap: 12px;
                }
            </style>
            <div class="header">
                <span class="icon">${icon}</span>
                <span class="title">${title}</span>
                <div class="line"></div>
            </div>
            <div class="grid">
                <!-- <slot> permite que app.js meta los SkillNodes aquí adentro en el HTML -->
                <slot></slot>
            </div>
        `;
    }
}

customElements.define('skill-phase', SkillPhase);
