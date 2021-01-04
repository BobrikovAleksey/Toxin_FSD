class BaseComponent {
    /**
     * @var template            string          шаблон компонента
     * @var templateList        string          шаблон списка в компоненте
     *
     * @var $app                object          ссылка на приложение
     * @var $el                 NodeElement     ссылка на связанный с объектом html-элемент
     * @var $name               string          уникальное название объекта
     * @var $state              object          состояние объекта
     * @var $cache              object          сохраненное состояние объекта и прочие временные данные
     *
     * @static getTagName       function        возвращает имя тега
     * @static getClassName     function        возвращает имя класса
     */

    /**
     * Возвращает подходящее склонение в зависимости от числа
     * @param num           number
     * @param units         string[]    ['предмет', 'предмета', 'предметов']
     * @returns {string}
     */
    static declOfNum = (num, units) => {
        if (!Array.isArray(units) || units.length === 0) units = [''];

        while (units.length < 3) units.push(units[0]);

        num = Math.abs(Math.floor(num)) % 100;
        if (num > 10 && num < 20) return units[2];

        num %= 10;
        return num > 1 && num < 5 ? units[1] : ( num === 1 ? units[0] : units[2] );
    }

    constructor(data = {}, cache = false) {
        this.$state = { ...data };
        this.$cache = cache ? { ...data } : {};
    };

    /**
     * Проверка изменения состояния
     * @returns {boolean}
     */
    isChanged = function (propsList = []) {
        if (!this.hasOwnProperty('$cache')) return false;

        if (propsList.length === 0) propsList = Object.keys(this.$cache);

        for (const key in propsList) {
            if (!this.$cache.hasOwnProperty(key)) continue;
            if (!this.$state.hasOwnProperty(key) || this.$cache[key] !== this.$state[key]) return true;
        }

        return false;
    }.bind(this);

    /**
     * Создает html-элемент вместо указанного
     * @param app
     * @param node
     * @param storage       object      место хранения компонента
     */
    create(app, node, storage = null) {
        this.$app = app;
        node.insertAdjacentHTML('afterend', this._getTemplate());
        this.$el = node.nextElementSibling;
        this.$el.className += ` ${ node.className }`;
        node.parentNode.removeChild(node);

        if (storage !== null && this.$name) {
            storage[this.$name] = this;
            this.$cache.components = {};
        } else {
            this.$cache.components = null;
        }


        if (!this.hasOwnProperty('components')) return;

        this.components.forEach((el) => {
            const Component = app.components[el.type];
            const node = this.$el.querySelector(Component.getTagName());

            if (node) {
                const newComponent =  new Component(el.params, el.hasOwnProperty('cache') && el.cache);

                newComponent.create(app, node, this.$components);
            }
        });
    };

    /**
     * Возвращает шаблон с заменой url и вставкой списка
     * @return {string}
     * @private
     */
    _getTemplate = function () {
        const listPattern = /{{\s*list\s*}}/g;
        const urlPattern = /{{\s*url\s*}}/g;

        return this.template.replace(listPattern, this._getTemplateList())
                            .replace(urlPattern, this.$app.$config.baseUrl);
    }.bind(this);

    /**
     * Возвращает шаблон из списочных элементов
     * @return {string}
     * @private
     */
    _getTemplateList = function () {
        if (!this.hasOwnProperty('templateList') || !this.$state.hasOwnProperty('list')) return '';

        return this.templateList.repeat(this.$state.list.length);
    }.bind(this);
}

export default BaseComponent;
