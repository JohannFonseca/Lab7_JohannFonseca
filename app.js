import { COURSE_DATA } from './data/course.js';
import SkillNode from './components/SkillNode.js';
import SkillPhase from './components/SkillPhase.js';
import YtPlayer from './components/YtPlayer.js';
import HighlightList from './components/HighlightList.js';
import ChapterCard from './components/ChapterCard.js';

// Esta es la clase principal que controla toda la app
// La idea es centralizar aquí todo lo que pasa para no volvernos locos
class App {
    constructor() {
        // Aquí guardo el "estado" de la app, básicamente qué está viendo el usuario
        this.state = {
            selectedTopicId: null, // Qué tema eligió en el sidebar
            activeVideoId: null,   // El video que se está reproduciendo
            activeChapterId: null  // El capítulo específico si es que hay uno
        };

        // Estos son los contenedores del HTML que voy a estar manipulando
        this.nodes = {
            skillTree: document.getElementById('skill-tree'),
            welcomeView: document.getElementById('welcome-view'),
            topicView: document.getElementById('topic-view')
        };

        // Arranco la magia
        this.init();
    }

    init() {
        this.renderSidebar();      // Dibujo el menú de la izquierda
        this.attachEventListeners(); // Me pongo a escuchar qué hace el usuario
    }

    // Esta función dibuja el árbol de habilidades (el sidebar)
    renderSidebar() {
        this.nodes.skillTree.innerHTML = ''; // Limpio lo que haya
        
        // Recorro los datos del curso que importamos arriba
        COURSE_DATA.phases.forEach(phase => {
            // Creo el componente de la "Fase" (los bloques grandes)
            const phaseEl = document.createElement('skill-phase');
            phaseEl.setAttribute('title', phase.title);
            phaseEl.setAttribute('icon', phase.icon);
            phaseEl.setAttribute('phase-color', phase.color);

            // Meto los temas dentro de cada fase
            phase.topics.forEach(topic => {
                const nodeEl = document.createElement('skill-node');
                nodeEl.setAttribute('topic-id', topic.id);
                nodeEl.setAttribute('title', topic.title);
                nodeEl.setAttribute('icon', topic.icon);
                nodeEl.setAttribute('phase-color', phase.color);
                
                // Si este es el que seleccionamos, le pongo el atributo 'selected' para que brille
                if (this.state.selectedTopicId === topic.id) {
                    nodeEl.setAttribute('selected', '');
                }

                phaseEl.appendChild(nodeEl);
            });

            this.nodes.skillTree.appendChild(phaseEl);
        });
    }

    // Aquí es donde manejo los clics y eventos globales
    attachEventListeners() {
        // Cuando alguien hace clic en un nodo del árbol
        document.addEventListener('node-select', (e) => {
            const topicId = e.detail.topicId;
            const topic = this.findTopicById(topicId);
            
            // Actualizo el estado
            this.state.selectedTopicId = topicId;
            this.state.activeVideoId = topic.videoId;
            this.state.activeChapterId = null; // Reinicio el capítulo al cambiar de tema

            this.renderSidebar(); // Redibujo el sidebar para que se vea el seleccionado
            this.renderTopicView(topic); // Dibujo la vista central
        });

        // Este evento lo lanzan los highlights para adelantar el video
        document.addEventListener('seek', (e) => {
            const player = document.querySelector('yt-player');
            if (player) {
                player.setAttribute('start-time', e.detail.time);
            }
        });

        // Cuando eligen un capítulo específico de un video
        document.addEventListener('chapter-play', (e) => {
            this.state.activeVideoId = e.detail.videoId;
            this.state.activeChapterId = e.detail.chapterId;
            
            const topic = this.findTopicById(this.state.selectedTopicId);
            this.renderTopicView(topic); // Actualizo la vista para mostrar el capítulo activo
        });
    }

    // Función auxiliar para buscar un tema entre todas las fases
    // Es como buscar una aguja en un pajar de objetos
    findTopicById(id) {
        for (const phase of COURSE_DATA.phases) {
            const topic = phase.topics.find(t => t.id === id);
            if (topic) return { ...topic, phaseColor: phase.color };
        }
        return null;
    }

    // Esta es la función pesada: dibuja toda la interfaz central de un tema
    renderTopicView(topic) {
        // Escondo el mensaje de bienvenida y muestro el contenido
        this.nodes.welcomeView.classList.add('hidden');
        this.nodes.topicView.classList.remove('hidden');

        // Armo el HTML con Template Literals (¡son un éxito!)
        let html = `
            <div class="topic-header">
                <h1 class="medieval" style="color: ${topic.phaseColor}; font-size: 2.5rem; margin-bottom: 0.5rem;">${topic.icon} ${topic.title}</h1>
                <p class="rajdhani" style="color: var(--text-dim); letter-spacing: 1px; margin-bottom: 2rem;">${topic.desc.toUpperCase()}</p>
            </div>

            <!-- El componente del reproductor de YouTube que hicimos -->
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
                    <!-- Si no hay capítulo seleccionado, muestro los highlights del tema principal -->
                    ${topic.highlights && this.state.activeChapterId === null ? `
                        <h2 class="section-title" style="margin-top: 0;">HIGHLIGHTS</h2>
                        <highlight-list color="${topic.phaseColor}" highlights='${JSON.stringify(topic.highlights || [])}'></highlight-list>
                    ` : ''}
                </div>
            </div>
        `;

        this.nodes.topicView.innerHTML = html;
    }
}

// Lanzo la aplicación al cargar el script
new App();
