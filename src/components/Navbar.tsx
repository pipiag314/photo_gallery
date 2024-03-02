import { Link } from "react-router-dom";
import style from "./Navbar.module.css";

const Navbar = () => {
  return (
    <nav className={style.navbar}>
      <ul className={style.list_container}>
        <li>
          <Link to="/home">Home</Link>
        </li>
        <li>
          <Link to="/history">History</Link>
        </li>
      </ul>
    </nav>
  );
};
export default Navbar;
