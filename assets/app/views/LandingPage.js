import BaseView from '../basic/base-view.js';


class LandingPage extends BaseView {
    $name = 'LandingPage';

    template = `
        <div class="landing-page">
            <div class="container landing-page__container">
                <x-card-search> </x-card-search>
                
                <p class="landing-page__about">Лучшие номера для вашей работы, отдыха и просто вдохновения</p>
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
