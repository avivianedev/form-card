import { useState } from "react"
import { AppContext } from "./AppContext"
import propTypes from "prop-types";

export const Provider = ({ children }) => {
    const [cardname, SetCardname] = useState('')
    const [cardNumber, SetcardNumber] = useState()
    const [expmonth, SetExpMonth] = useState('')
    const [year, SetYear] = useState('')
    const [cvc, Setcvc] = useState()



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
