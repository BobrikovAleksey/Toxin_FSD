import Router from './Router.js';

const router = new Router({ mode: 'hash', root: '/' });

const renderView = (viewName, params = {})  => {
    router.$app && router.$app.hasOwnProperty('renderView') && router.$app.renderView(viewName, params);
};

router
    .add(/about/, () => {
        renderView('About');
    })
    .add(/agreements\/(.*)/, (argument) => {
        renderView('Agreements');
    })
    .add(/news/, () => {
        renderView('News');
    })
    .add(/services\/(.*)/, (service) => {
        renderView('Services');
    })
    .add(/vacancies/, () => {
        renderView('Vacancies');
    })
    .add('', () => {
        renderView('LandingPage');
    });

export default router;
