import Router from './Router.js';

const router = new Router({ mode: 'hash', root: '/' });

const renderView = (viewName, { page = 'landing-page' } = {})  => {
    const app = router.$app;

    if (app) {
        const components = app['$cache']['components'];

        if (app.hasOwnProperty('$state')) app.$state.page = page;

        app.hasOwnProperty('renderView') && app.renderView(viewName);
        components.hasOwnProperty('header') && components.header.update();
    }
};

router
    .add(/about/, () => {
        renderView('About', { page: 'about' });
    })
    .add(/agreements\/(.*)/, (argument) => {
        renderView('Agreements', { page: 'agreements' });
    })
    .add(/news/, () => {
        renderView('News', { page: 'news' });
    })
    .add(/services\/(.*)/, (service) => {
        renderView('Services', { page: 'services' });
    })
    .add(/vacancies/, () => {
        renderView('Vacancies', { page: 'vacancies' });
    })
    .add('', () => {
        renderView('LandingPage', { page: 'landing-page' });
    });

export default router;
