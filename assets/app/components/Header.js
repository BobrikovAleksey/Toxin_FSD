import BaseComponent from '../basic/base-component.js';
import icons from './icons.js';


class Header extends BaseComponent {
    template = `
        <header class="header">
            <div class="container header__container">
                <a class="header__logo" href="{{ url }}">${ icons.logo }</a>

                <div class="header__menu-icon" data-action="open">
                    <button class="button-purple header__menu-button header__menu-button_menu" data-value="close"> </button>

                    <button class="button-purple header__menu-button header__menu-button_close" data-value="open"> </button>
                </div>

                <ul class="menu">
                    <li class="menu__item">
                        <a class="menu__link" href="{{ url }}about" data-page="about">О нас</a>
                    </li>

                    <li class="menu__item">
                        <details data-key="1">
                            <summary class="menu__link menu__link_icon" data-page="services">Услуги</summary>

                            <ul class="menu__submenu">
                                <li class="menu__sub-item">
                                    <a class="menu__sub-link" href="{{ url }}services/1">Услуга</a>
                                </li>

                                <li class="menu__sub-item">
                                    <a class="menu__sub-link" href="{{ url }}services/2">Услуга</a>
                                </li>

                                <li class="menu__sub-item">
                                    <a class="menu__sub-link" href="{{ url }}services/3">Услуга</a>
                                </li>
                            </ul>   
                        </details>
                    </li>

                    <li class="menu__item">
                        <a class="menu__link" href="{{ url }}vacancies" data-page="vacancies">Вакансии</a>
                    </li>

                    <li class="menu__item">
                        <a class="menu__link" href="{{ url }}news" data-page="news">Новости</a>
                    </li>

                    <li class="menu__item">
                        <details data-key="2">
                            <summary class="menu__link menu__link_icon" data-page="agreements">Соглашения</summary>

                            <ul class="menu__submenu">
                                <li class="menu__sub-item">
                                    <a class="menu__sub-link" href="{{ url }}agreements/1">Соглашение</a>
                                </li>

                                <li class="menu__sub-item">
                                    <a class="menu__sub-link" href="{{ url }}agreements/2">Соглашение</a>
                                </li>

                                <li class="menu__sub-item">
                                    <a class="menu__sub-link" href="{{ url }}agreements/3">Соглашение</a>
                                </li>
                            </ul>   
                        </details>
                    </li>

                    <li class="menu__item menu__authorization">
                        <button class="button-white menu__button">
                            <span class="menu__button_text">Войти</span>

                            <i class="fa fa-sign-in menu__button_icon"> </i>
                        </button>
                    </li>

                    <li class="menu__item menu__authorization">
                        <button class="button-purple menu__button">
                            <span class="menu__button_text">Зарегистрироваться</span>

                            <i class="fa fa-user-plus menu__button_icon"> </i>
                        </button>
                    </li>

                    <li class="menu__item menu__account">
                        <p class="menu__account_text">Юлий Цезарь</p>
                    </li>
                </ul>
            </div>
        </header>
    `;

    static getClassName = () => 'Header';
    static getTagName = () => 'x-header';

    constructor({ name = 'header' } = {}) {
        super();

        if (typeof name === 'string') this.$name = name;

        this.$cache = {
            mouse: '',
        };
    };

    clickMenuItem = function () {
        this.$app.$router.update();
        this.closeMenu();
    }.bind(this);

    /** Закрывает меню */
    closeMenu = function () {
        this.$cache.nodes.menuIcon.setAttribute('data-action', 'open');
        this.closeSubmenus();
    }.bind(this);

    /** Переключает видимость меню */
    toggleMenu = function (event) {
        const value = event.target.hasAttribute('data-value') ? event.target.getAttribute('data-value') : 'open';

        this.$cache.nodes.menuIcon.setAttribute('data-action', value);
        value === 'open' && this.closeSubmenus();
    }.bind(this);

    /**
     * Закрывает все подменю
     * @param key integer
     */
    closeSubmenus = function (key = false) {
        this.$cache.nodes.submenus.forEach((el) => {
            if (!el.hasAttribute('data-key') || el.getAttribute('data-key') !== key) {
                el.hasAttribute('open') && el.removeAttribute('open');
            }
        });
    }.bind(this);

    /** Обработка скрытия и отображения подменю */

    clickSubmenu = function () {
        this.closeSubmenus(this.$cache.mouse);
    }.bind(this);

    mouseEnter = function (event) {
        this.$cache.mouse = event.target.hasAttribute('data-key') ? event.target.getAttribute('data-key') : false;
    }.bind(this);

    mouseLeave = function () {
        this.$cache.mouse = false;
    }.bind(this);

    hideSubmenus = function () {
        if (this.$cache.mouse) return;

        this.closeSubmenus();
    }.bind(this);

    /** Обновляет меню */
    update = function () {
        this.$cache.nodes.menuLinks.forEach((el) => {
            if (el.hasAttribute('data-page') && el.getAttribute('data-page') === this.$app.$state.page) {
                !el.classList.contains('menu__link_active') && el.classList.add('menu__link_active')
            } else {
                el.classList.contains('menu__link_active') && el.classList.remove('menu__link_active');
            }
        });
    }.bind(this);

    create(app, node, storage = null) {
        super.create(app, node, storage);

        this.$cache.nodes = {
            menu: this.$el.querySelector('.menu'),
            menuIcon: this.$el.querySelector('.header__menu-icon'),
            menuLinks: this.$el.querySelectorAll('.menu__link'),
            submenus: this.$el.querySelectorAll('details'),
        };

        const menuButtons = this.$el.querySelectorAll('.header__menu-button');
        menuButtons.forEach((el) => el.addEventListener('click', this.toggleMenu));

        const links = this.$cache.nodes.menu.querySelectorAll('a[href]');
        links.forEach((el) => el.addEventListener('click', this.clickMenuItem));

        const buttons = this.$cache.nodes.menu.querySelectorAll('.menu__button');
        buttons.forEach((el) => el.addEventListener('click', this.clickMenuItem));

        const account = this.$cache.nodes.menu.querySelector('.menu__account_text');
        account.addEventListener('click', this.clickMenuItem);

        const logo = this.$el.querySelector('.header__logo');
        logo.addEventListener('click', this.clickMenuItem);

        this.$cache.nodes.submenus.forEach((el) => {
            el.addEventListener('click', this.clickSubmenu);
            el.addEventListener('mouseenter', this.mouseEnter);
            el.addEventListener('mouseleave', this.mouseLeave);
        });

        document.addEventListener('mousedown', this.hideSubmenus);
        window.addEventListener('resize', this.closeMenu);
    };
}

export default Header;
