import { useState } from "react"
import { AppContext } from "./AppContext"
import propTypes from "prop-types";

export const Provider = ({ children }) => {
    const [cardname, SetCardname] = useState('Felicia Leire')
    const [cardNumber, SetcardNumber] = useState("9591 6489 6389 101E")
    const [expmonth, SetExpMonth] = useState('09')
    const [year, SetYear] = useState('26')
    const [cvc, Setcvc] = useState('000')



    const value = {
        cardname,
        SetCardname,
        cardNumber,
        SetcardNumber,
        expmonth,
        SetExpMonth,
        year,
        SetYear,
        cvc,
        Setcvc

    }

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    )


}
Provider.propTypes = {
    children: propTypes.any,
}.isRequired
