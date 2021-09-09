import React, {useState} from "react";
import { DollarSign } from "react-feather";

import "./styles.css";

const Card = ({ cents, date, description, mode }) => {
  
  const [clicked, setClicked] = useState(false)

  return (
    <div className={clicked ?"card-clicked":"card"} onClick={() => {setClicked(!clicked)}}>
      <div className="header">
        <p>
          <DollarSign size={15}/>
          {cents} centavos
        </p>
        <p>Data: {date}</p>
      </div>
      <p>
        {description} no {mode}
      </p>
    </div>
  );
}

export default Card;
