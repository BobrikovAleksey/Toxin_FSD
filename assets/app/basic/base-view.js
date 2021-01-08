class BaseView {
    /**
     * @var template        string          шаблон представления
     *
     * @var $app            object          ссылка на приложение
     * @var $el             NodeElement     ссылка на связанный с объектом html-элемент
     * @var $name           string          уникальное название объекта
     * @var $state          object          состояние объекта
     * @var $cache          object          сохраненное состояние объекта и прочие временные данные
     */

    constructor(data = {}, cache = false) {
        this.$state = { ...data };
        this.$cache = cache ? { ...data } : {};
    };

    /**
     * Создает html-элемент в корневом элементе страницы - <main>
     * @param app
     */
    create(app) {
        this.$app = app;
        app.$mainNode.insertAdjacentHTML('beforeend', this._getTemplate());
        this.$el = app.$mainNode.lastElementChild;

        if (this.hasOwnProperty('$name')) {
            this.$app.$cache.views[this['$name']] = this;
            this['$cache'].components = {};
        } else {
            this['$cache'].components = null;
        }

        if (!this.hasOwnProperty('$components')) return;

        this['$components'].forEach((el) => {
            const Component = app.$classes[el.className];
            const node = this.$el.querySelector(Component.getTagName());

            if (node) {
                const newComponent =  new Component(
                    el.hasOwnProperty('params') ? el.params : {},
                    el.hasOwnProperty('cache') ? el.cache : false
                );

                newComponent.create(this.$app, node, this['$cache'].components);
            }
        });
    };

    /** Скрывает страницу */
    hide = function () {
        if (this.$el) {
            this.$el.style.visibility = 'hidden';
            this.$el.style.position = 'absolute';
        }
    }.bind(this);

    /** Показывает страницу */
    show = function () {
        if (this.$el) {
            this.$el.style.visibility = 'visible';
            this.$el.style.position = 'relative';
        }
    }.bind(this);

    /**
     * Возвращает шаблон с заменой url
     * @return {string}
     * @private
     */
    _getTemplate = function () {
        const urlPattern = /{{\s*url\s*}}/g;

        return this.hasOwnProperty('template') ? this['template'].replace(urlPattern, this.$app.$config.baseUrl) : '';
    }.bind(this);
}

export default BaseView;
