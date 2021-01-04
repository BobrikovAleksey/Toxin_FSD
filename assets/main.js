import $config from './app/config.js';
import $router from './app/router/index.js';

// views
import About from './app/views/About.js';
import Agreements from  './app/views/Agreements.js';
import LandingPage from  './app/views/LandingPage.js';
import News from  './app/views/News.js';
import Services from  './app/views/Services.js';
import Vacancies from  './app/views/Vacancies.js';

// components
import Header from './app/components/Header.js';


const template = `
    <x-header> </x-header>

    <main> </main>

    <x-footer> </x-footer>
`;

const app = {
    $config,
    $router,

    $state: {
        page: '',
    },

    $classes: {
        // views
        About,
        Agreements,
        LandingPage,
        News,
        Services,
        Vacancies,

        // components
        Header,
    },

    $components: [
        {
            className: 'Header',
            params: { name: 'header' },
        },
        // { className: 'Footer' },
    ],

    $cache: {
        components: {},
        views: {},
    },

    init() {
        const app = document.querySelector('#app');
        app.insertAdjacentHTML('afterend', template);
        app.parentNode.removeChild(app);

        this.$mainNode = document.querySelector('main');

        this.$components.forEach((el) => {
            const Component = this.$classes[el.className];
            const node = document.querySelector(Component.getTagName());

            if (node) {
                const newComponent =  new Component(
                    el.hasOwnProperty('params') ? el.params : {},
                    el.hasOwnProperty('cache') ? el.cache : false
                );

                newComponent.create(this, node, this.$cache.components);
            }
        });

        this.$router.$app = this;
    },

    /**
     * Добавляет и отображает текущую страницу в DOM
     * @param viewName string
     * @param params object
     */
    renderView(viewName, params = {}) {
        if (!this.$mainNode) return;

        this.$cache.views.hasOwnProperty('_current') && this.$cache.views._current.hide();

        if (!this.$cache.views.hasOwnProperty(viewName)) {
            const View = this.$classes[viewName];
            (new View(params)).create(this, this.$mainNode);

        } else {
            this.$cache.views[viewName].show();
            this.$cache.views._current = this.$cache.views[viewName];
        }

        this.$cache.views._current = this.$cache.views[viewName];
    },
};

app.init();
