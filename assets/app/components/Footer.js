import BaseComponent from '../basic/base-component.js';
import icons from './icons.js';


class Footer extends BaseComponent {
    template = `
        <footer class="footer">
            <div class="footer-menu">
                <div class="container footer-menu__container">
                    <div class="footer-menu__about">
                        <a class="footer-menu__logo" href="{{ url }}">${ icons.logo }</a>

                        <p class="footer-menu__description">
                            Бронирование номеров в лучшем отеле 2019 года по версии ассоциации «Отельные взгляды»
                        </p>
                    </div>

                    <nav>
                        <ul class="menu">
                            <li class="menu__list">
                                <details class="menu__column" open>
                                    <summary class="menu__caption">Навигация</summary>

                                    <ul>
                                        <li class="menu__item">
                                            <a class="menu__link" href="{{ url }}about">О нас</a>
                                        </li>

                                        <li class="menu__item">
                                            <a class="menu__link" href="{{ url }}news">Новости</a>
                                        </li>

                                        <li class="menu__item">
                                            <a class="menu__link" href="{{ url }}support">Служба поддержки</a>
                                        </li>

                                        <li class="menu__item">
                                            <a class="menu__link" href="{{ url }}services/all">Услуги</a>
                                        </li>
                                    </ul>
                                </details>
                            </li>

                            <li class="menu__list">
                                <details class="menu__column" open>
                                    <summary class="menu__caption">О нас</summary>

                                    <ul>
                                        <li class="menu__item">
                                            <a class="menu__link" href="{{ url }}about">О сервисе</a>
                                        </li>

                                        <li class="menu__item">
                                            <a class="menu__link" href="{{ url }}team">Наша команда</a>
                                        </li>

                                        <li class="menu__item">
                                            <a class="menu__link" href="{{ url }}vacancies">Вакансии</a>
                                        </li>

                                        <li class="menu__item">
                                            <a class="menu__link" href="{{ url }}investors">Инвесторы</a>
                                        </li>
                                    </ul>
                                </details>
                            </li>

                            <li class="menu__list">
                                <details class="menu__column" open>
                                    <summary class="menu__caption">Служба поддержки</summary>

                                    <ul>
                                        <li class="menu__item">
                                            <a class="menu__link" href="{{ url }}agreements/all">Соглашения</a>
                                        </li>

                                        <li class="menu__item">
                                            <a class="menu__link" href="{{ url }}community">Сообщества</a>
                                        </li>

                                        <li class="menu__item">
                                            <a class="menu__link" href="{{ url }}contact-us">Связь с нами</a>
                                        </li>
                                    </ul>
                                </details>
                            </li>
                        </ul>
                    </nav>

                    <div class="footer-menu__subscribe">
                        <h3>Подписка</h3>

                        <p class="footer-menu__text">Получайте специальные предложения и новости сервиса</p>

                        <form class="subscribe footer-menu__form" method="post">
                            <input class="input subscribe__input" type="email" name="email" placeholder="Email" />

                            <button class="subscribe__button" type="submit" tabindex="-1"> </button>
                        </form>
                    </div>
                </div>
            </div>

            <div class="footer-copyright">
                <div class="container footer-copyright__container">
                    <a class="footer-copyright__logo" href="{{ url }}">${ icons.logo }</a>

                    <p class="footer-copyright__text" >Copyright © 2018 Toxin отель. Все права зачищены.</p>

                    <nav class="footer-copyright__links">
                        <a class="footer-copyright__link" href="https://twitter.com/" target="_blank">
                            ${ icons.twitter }
                        </a>

                        <a class="footer-copyright__link" href="https://www.facebook.com/" target="_blank">
                            ${ icons.facebook }
                        </a>

                        <a class="footer-copyright__link" href="https://www.instagram.com/" target="_blank">
                            ${ icons.instagram }
                        </a>
                    </nav>
                </div>
            </div>
        </footer>
    `;

    static getClassName = () => 'Footer';
    static getTagName = () => 'x-footer';

    constructor({ name = 'footer' } = {}) {
        super();

        if (typeof name === 'string') this.$name = name;
    };

    /** Переключает видимость меню при изменении размера дисплея */
    toggleVisibilityMenu = function () {
        if (window.innerWidth > 580) {
            this.$cache.nodes.menus.forEach((el, i) => {
                !el.hasAttribute('open') && el.setAttribute('open', '');
                this.$cache.nodes.captions[i].setAttribute('tabindex', -1);
            });

        } else {
            this.$cache.nodes.menus.forEach((el, i) => {
                el.hasAttribute('open') && el.removeAttribute('open');
                this.$cache.nodes.captions[i].setAttribute('tabindex', 0);
            });
        }
    }.bind(this);

    create(app, node, storage = null) {
        super.create(app, node, storage);

        this.$cache.nodes = {
            captions: this.$el.querySelectorAll('.menu__caption'),
            menus: this.$el.querySelectorAll('.menu__column'),
        };

        window.addEventListener('resize', this.toggleVisibilityMenu);
        this.toggleVisibilityMenu();
    };
}

export default Footer;
