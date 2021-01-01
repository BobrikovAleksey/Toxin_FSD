import BaseView from '../basic/base-view.js';


class News extends BaseView {
    $name = 'News';

    template = `
        <div class="news-page">
            <div class="container">
                <h1>Новости</h1>
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

export default News;
