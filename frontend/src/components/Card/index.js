import * as React from "react"
import {} from "react-feather"

import './styles.css'

const Card = ({cents, date, description, mode}) => {
    return(
        <div className="card">
            <div className="header">
                <p>
                    {cents} centavos
                </p>
                <p>
                    Data: {date}
                </p>
            </div>
            <p>
                {description} no {mode}
            </p>
        </div>
    );
}

export default Card;