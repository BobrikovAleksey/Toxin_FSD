import BaseView from '../basic/base-view.js';


class About extends BaseView {
    $name = 'About';

    template = `
        <div class="about-page">
            <div class="container">
                <h1>О нас</h1>
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

export default About;
