import '@styles/Footer.scss';
import getSvg from '@images/svg'
import { Link } from 'react-router-dom';


function Footer() {
    const {
        phone
    } = getSvg()


    return (
        <footer className="footer footer_bg">
            <div className="footer__container block-normalizer">
                <div className="footer__content f-row">
                    <span className="footer__company-name text-l">© KurskFlora, 2024-2024</span>
                    <div className="footer__numbers-block f-row gap-4">
                        <div className="footer__numbers-phone-holder">
                            {phone(undefined, undefined, undefined, "footer__numbers-phone")}
                        </div>
                        <div className="footer__numbers-holder f-column">
                            <span className="footer__number text-l">+7 800 555 35 35</span>
                            <span className="footer__number text-l">+7 800 666 36 36</span>
                        </div>
                    </div>
                    <Link className="footer__addresses-link" to="/addresses">Адреса цветочных центров</Link>
                </div>
            </div>
        </footer>
    )
}

export default Footer;
