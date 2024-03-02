import { useContext } from "react"
import { Link } from "react-router-dom"

import { SearchedContext } from "../../context/SearchedContext"
import style from "./Histroy.module.css";

const History = () => {

  const {searchedText} = useContext(SearchedContext)
  
  return (
    <div className={style.container}>
      <h1>Searched History: </h1>
      <div>
        {searchedText.map(text => (
          <Link key={text} to={`/history/${text.split(" ").join("-")}`}>
            <h2>{text}</h2>
          </Link>
        ))}
      </div>
    </div>
  )
}
export default History