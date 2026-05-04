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
                    margin-bottom: 2rem;
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
                    flex-grow: 1;
                    height: 1px;
                    background: linear-gradient(to right, ${color}, transparent);
                }
                .grid {
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
                <slot></slot>
            </div>
        `;
    }
}

customElements.define('skill-phase', SkillPhase);
