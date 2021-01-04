class Router {
    $app = null;

    root = '/';
    routes = [];
    timeout = 50;

    constructor(options = {}) {
        this.mode = history.pushState ? 'history' : 'hash';
        if (options.mode) this.mode = options.mode;
        if (options.root) this.root = options.root;

        this.listen();
    };

    /**
     * Добавляет маршрут
     * @param path string
     * @param callback Function
     * @returns {Router}
     */
    add = (path, callback) => {
        this.routes.push({ path, callback });
        return this;
    };

    /**
     * Удаляет маршрут
     * @param path string
     * @returns {Router}
     */
    remove = (path) => {
        const i = this.routes.findIndex((route) => route.path === path);

        if (i >= 0) this.routes.slice(i, 1);
        return this;
    };

    /**
     * Очистить маршруты
     * @returns {Router}
     */
    flush = () => {
        this.routes = [];
        return this;
    };

    /**
     * Удаляет первый и последний символы "/"
     * @param path string
     * @returns {string}
     */
    clearSlashes = (path) => path.toString().replace(/^\/|\/$/g, '');

    /**
     * Возвращает фрагмент (маршрут)
     * @returns {string}
     */
    getFragment = () => {
        let fragment;

        if (this.mode === 'history') {
            fragment = this.clearSlashes(decodeURI(location.pathname + location.search)).replace(/\?(.*)$/, '');
            fragment = this.root !== '/' ? fragment.replace(this.root, '') : fragment;
        } else {
            const match = location.href.match(/#(.*)$/);
            fragment = match ? match[1] : '';
        }

        return this.clearSlashes(fragment);
    };

    /**
     * Изменяет маршрут (перемещение)
     * @param path string
     * @returns {Router}
     */
    navigate = (path = '') => {
        if (this.mode === 'history') {
            history.pushState(null, null, this.root + this.clearSlashes(path));
        } else {
            location.href = location.href.replace(/#(.*)$/, `#${path}`);
        }
        return this;
    };

    /**
     * Проверяет изменение маршрута и производит обновление
     */
    update = () => {
        if (this.current === this.getFragment() || this.$app === null) return;

        this.current = this.getFragment();
        this.routes.some((route) => {
            const match = this.current.match(route.path);

            if (match) {
                match.shift();
                route.callback.apply({}, match);
                return match;
            }

            return false;
        });
    };

    /**
     * Назначает слушателя маршрута в адресной строке с определенным интервалом
     */
    listen = () => {
        clearInterval(this.interval);
        this.interval = setInterval(this.update, this.timeout);
    }
}

export default Router;
