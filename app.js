import { COURSE_DATA } from './data/course.js';
import SkillNode from './components/SkillNode.js';
import SkillPhase from './components/SkillPhase.js';
import YtPlayer from './components/YtPlayer.js';
import HighlightList from './components/HighlightList.js';
import ChapterCard from './components/ChapterCard.js';

class App {
    constructor() {
        this.state = {
            selectedTopicId: null,
            activeVideoId: null,
            activeChapterId: null
        };

        this.nodes = {
            skillTree: document.getElementById('skill-tree'),
            welcomeView: document.getElementById('welcome-view'),
            topicView: document.getElementById('topic-view')
        };

        this.init();
    }

    init() {
        this.renderSidebar();
        this.attachEventListeners();
    }

    renderSidebar() {
        this.nodes.skillTree.innerHTML = '';
        COURSE_DATA.phases.forEach(phase => {
            const phaseEl = document.createElement('skill-phase');
            phaseEl.setAttribute('title', phase.title);
            phaseEl.setAttribute('icon', phase.icon);
            phaseEl.setAttribute('phase-color', phase.color);

            phase.topics.forEach(topic => {
                const nodeEl = document.createElement('skill-node');
                nodeEl.setAttribute('topic-id', topic.id);
                nodeEl.setAttribute('title', topic.title);
                nodeEl.setAttribute('icon', topic.icon);
                nodeEl.setAttribute('phase-color', phase.color);
                
                if (this.state.selectedTopicId === topic.id) {
                    nodeEl.setAttribute('selected', '');
                }

                phaseEl.appendChild(nodeEl);
            });

            this.nodes.skillTree.appendChild(phaseEl);
        });
    }

    attachEventListeners() {
        document.addEventListener('node-select', (e) => {
            const topicId = e.detail.topicId;
            const topic = this.findTopicById(topicId);
            
            this.state.selectedTopicId = topicId;
            this.state.activeVideoId = topic.videoId;
            this.state.activeChapterId = null;

            this.renderSidebar();
            this.renderTopicView(topic);
        });

        document.addEventListener('seek', (e) => {
            const player = document.querySelector('yt-player');
            if (player) {
                player.setAttribute('start-time', e.detail.time);
            }
        });

        document.addEventListener('chapter-play', (e) => {
            this.state.activeVideoId = e.detail.videoId;
            this.state.activeChapterId = e.detail.chapterId;
            
            const topic = this.findTopicById(this.state.selectedTopicId);
            this.renderTopicView(topic);
        });
    }

    findTopicById(id) {
        for (const phase of COURSE_DATA.phases) {
            const topic = phase.topics.find(t => t.id === id);
            if (topic) return { ...topic, phaseColor: phase.color };
        }
        return null;
    }

    renderTopicView(topic) {
        this.nodes.welcomeView.classList.add('hidden');
        this.nodes.topicView.classList.remove('hidden');

        let html = `
            <div class="topic-header">
                <h1 class="medieval" style="color: ${topic.phaseColor}; font-size: 2.5rem; margin-bottom: 0.5rem;">${topic.icon} ${topic.title}</h1>
                <p class="rajdhani" style="color: var(--text-dim); letter-spacing: 1px; margin-bottom: 2rem;">${topic.desc.toUpperCase()}</p>
            </div>

            <yt-player video-id="${this.state.activeVideoId}"></yt-player>

            <div class="topic-content-grid" style="display: grid; grid-template-columns: 1fr 300px; gap: 2rem; margin-top: 2rem;">
                <div class="main-column">
                    ${topic.chapters ? `
                        <h2 class="section-title">CAPÍTULOS TÉCNICOS</h2>
                        <div class="chapters-list">
                            ${topic.chapters.map(ch => `
                                <chapter-card 
                                    chapter-id="${ch.id}"
                                    title="${ch.title}"
                                    duration="${ch.duration}"
                                    video-id="${ch.videoId}"
                                    color="${topic.phaseColor}"
                                    ${this.state.activeChapterId === ch.id ? 'active' : ''}
                                    highlights='${JSON.stringify(ch.highlights || [])}'
                                ></chapter-card>
                            `).join('')}
                        </div>
                    ` : ''}
                </div>
                
                <div class="side-column">
                    ${topic.highlights && this.state.activeChapterId === null ? `
                        <h2 class="section-title" style="margin-top: 0;">HIGHLIGHTS</h2>
                        <highlight-list color="${topic.phaseColor}" highlights='${JSON.stringify(topic.highlights)}'></highlight-list>
                    ` : ''}
                </div>
            </div>
        `;

        this.nodes.topicView.innerHTML = html;
    }
}

new App();
