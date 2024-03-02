import { Link, useParams } from "react-router-dom";
import style from "./Searched.module.css";

const Searched = () => {
    const {id} = useParams();

  return (
    <div className={style.container}>
        <Link className={style.back} to="/history">⬅️</Link>
        <h1>{id}</h1>
    </div>
  )
}
export default Searched