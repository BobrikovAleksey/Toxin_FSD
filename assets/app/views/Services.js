import BaseView from '../basic/base-view.js';


class Services extends BaseView {
    $name = 'Services';

    template = `
        <div class="services-page">
            <div class="container">
                <h1>Услуги</h1>
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

export default Services;
