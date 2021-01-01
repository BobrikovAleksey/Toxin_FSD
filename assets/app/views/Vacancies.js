import BaseView from '../basic/base-view.js';


class Vacancies extends BaseView {
    $name = 'Vacancies';

    template = `
        <div class="vacancies-page">
            <div class="container">
                <h1>Вакансии</h1>
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

export default Vacancies;
