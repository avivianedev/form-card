import { useContext } from "react"
import "./Card.scss"
import { AppContext } from "../../context/AppContext"



export default function Card() {

    function mcc(v) {
        v = v.replace(/\D/g, ""); // Permite apenas dígitos
        v = v.replace(/(\d{4})/g, "$1 "); // Coloca um espaço a cada 4 caracteres
        v = v.replace(/\.$/, ""); // Remove o ponto se estiver sobrando
        v = v.substring(0, 19)// Limita o tamanho

        return v;
    }
    const expmonthformat = (d) => {
        d = d.replace(/(\d{2})/g, "$1 /")
        return d
    }

    const { cardname, Setname, cardNumber,
        SetcardNumber,
        expmonth,
        SetExpMonth,
        year,
        SetYear,
        cvc,
        Setcvc } = useContext(AppContext)



    return (
        <div className="card-container">
            <div className="card-images">
                <div className="card-front">
                    <img src="/assets/images/bg-card-front.png" alt="image card front" />
                    <div className="card-circle"></div>
                    <div className="card-circle-thin"></div>
                    <div className="card-data">
                        <h1 className="card-number">{cardNumber}</h1>
                        <div className="card-name">
                            <h2>{`${cardname}`.toUpperCase()}</h2>
                            <p>{expmonthformat(expmonth)}{`${" " + year}`}</p>
                        </div>
                    </div>
                </div>
                <div className="card-back">
                    <img src="/assets/images/bg-card-back.png" alt="image card back" />
                    <span className="card-cvc">{cvc}</span>
                </div>

            </div>

        </div>
    )
}
