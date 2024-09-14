import '@styles/Header.scss';
import { Link } from "react-router-dom";

const HeaderOption = ({ href, text, active }) => {

    return (
        <li className="header__nav-option">
            <Link to={href} className={`header__nav-link f-column text-menu text-link ${active && "header__nav-link_active"}`}>
                {text}
            </Link>
        </li>
    )
}
export default HeaderOption