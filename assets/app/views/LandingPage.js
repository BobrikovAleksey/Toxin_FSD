import BaseView from '../basic/base-view.js';


class LandingPage extends BaseView {
    $name = 'LandingPage';

    template = `
        <div class="landing-page">
            <div class="container">
                <h1>Главная страница</h1>
            </div>
        </div>
    `;

    constructor(data = {}, cache = false) {
        super(data, cache);
    };

    create(app) {
        super.create(app);
    };
}

export default LandingPage;
