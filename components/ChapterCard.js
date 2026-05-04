export default class ChapterCard extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    static get observedAttributes() {
        return ['active', 'chapter-id', 'title', 'duration', 'video-id', 'color', 'highlights'];
    }

    attributeChangedCallback() {
        this.render();
    }

    connectedCallback() {
        this.render();
    }

    render() {
        const id = this.getAttribute('chapter-id');
        const title = this.getAttribute('title');
        const duration = this.getAttribute('duration');
        const videoId = this.getAttribute('video-id');
        const color = this.getAttribute('color') || '#65a30d';
        const active = this.hasAttribute('active');
        const highlights = this.getAttribute('highlights') || '[]';

        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: block;
                    margin-bottom: 1rem;
                }
                .card {
                    background: ${active ? 'rgba(101, 163, 13, 0.05)' : 'var(--surface, #0d0d1a)'};
                    border: 1px solid ${active ? color : 'rgba(146, 64, 14, 0.2)'};
                    padding: 1rem;
                    transition: all 0.3s;
                }
                .header {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    margin-bottom: ${active ? '1rem' : '0'};
                }
                .info {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                }
                .play-btn {
                    width: 32px;
                    height: 32px;
                    background: ${active ? color : 'transparent'};
                    border: 1px solid ${color};
                    color: ${active ? 'black' : color};
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                    font-size: 0.8rem;
                }
                .play-btn:hover {
                    background: ${color};
                    color: black;
                }
                .title {
                    font-family: 'MedievalSharp', cursive;
                    font-size: 1rem;
                    color: ${active ? 'white' : 'var(--text-dim)'};
                }
                .duration {
                    font-family: 'Share Tech Mono', monospace;
                    font-size: 0.8rem;
                    color: var(--accent-copper);
                }
                .highlights-panel {
                    display: ${active ? 'block' : 'none'};
                    padding-top: 1rem;
                    border-top: 1px solid rgba(146, 64, 14, 0.1);
                }
            </style>
            <div class="card">
                <div class="header">
                    <div class="info">
                        <div class="play-btn">▶</div>
                        <div class="title">${title}</div>
                    </div>
                    <div class="duration">${duration}</div>
                </div>
                <div class="highlights-panel">
                    <highlight-list color="${color}" highlights='${highlights}'></highlight-list>
                </div>
            </div>
        `;

        this.shadowRoot.querySelector('.play-btn').onclick = () => {
            this.dispatchEvent(new CustomEvent('chapter-play', {
                detail: { videoId: videoId, chapterId: id },
                bubbles: true,
                composed: true
            }));
        };
    }
}

customElements.define('chapter-card', ChapterCard);
