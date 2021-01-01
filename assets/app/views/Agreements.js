import BaseView from '../basic/base-view.js';


class Agreements extends BaseView {
    $name = 'Agreements';

    template = `
        <div class="agreements-page">
            <div class="container">
                <h1>Соглашения</h1>
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

export default Agreements;
