import "./Form.scss"
import { AppContext } from "../../context/AppContext";
import { useContext, useState } from "react"

import validator from 'validator';

import { useForm } from "react-hook-form";
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import Modal from "../Modal";

function validateCardValid(valcard) {
    return validator.isCreditCard(valcard)
}

function mcc(n) {
    let v = String(n)
    v = v.replace(/\D/g, ""); // Permite apenas dígitos
    v = v.replace(/(\d{4})/g, "$1 "); // Coloca um espaço a cada 4 caracteres
    v = v.replace(/\.$/, ""); // Remove o ponto se estiver sobrando
    v = v.substring(0, 19)// Limita o tamanho

    return v;
}

const createCardPaymentSchema = z.object({
    name: z.string()
        .nonempty("Can't be blank")
        .toUpperCase()
    ,
    cardNumber: z.string()
        .nonempty("Wrong Format, numbers only")
        .transform(number => mcc(number))
        .refine(numcard => validateCardValid(numcard), "Invalid Card")
    ,

    expmonth: z.coerce.number()
        .max(31, "Invalid")
        .refine(n => { return n !== 0 }, "Can't be blank")
        .refine(n => {
            let d = String(n);
            return d.length === 2
        },
            "Format MM")
    ,

    expyear: z.coerce.number()
        .refine(n => { return n !== 0 }, "Can't be blank")
        .refine(n => {
            let d = String(n);
            return d.length === 2
        },
            "Format YY")
        .refine(y => {
            const data = new Date()
            const yMax = (data.getFullYear() + 5)
            const yFormatted = yMax.toString().slice(2, 4)
            return y <= yFormatted
        }, "Invalid year")
    ,
    cvc: z.coerce.number()
        .max(9999, "Format 123 or 124")
        .refine(n => { return n !== 0 }, "Can't be blank")
    //.nonempty("Can't be blank"),

})

export default function Form() {
    const [showModal, SetShowModal] = useState(false)

    const { register,
        handleSubmit,
        formState: { errors }
    } = useForm({
        resolver: zodResolver(createCardPaymentSchema)

    });

    const addCardPayment = (data) => {
        validator.isCreditCard(data.cardNumber)
        SetShowModal(!showModal);
    }
    const closeModal = () => {
        SetShowModal(!showModal);
    }

    const { SetCardname,
        SetcardNumber,
        SetExpMonth,
        SetYear,
        Setcvc,
    } = useContext(AppContext)


    return (
        <>
            {showModal ? <Modal
                closeModal={closeModal}
            /> : <form className="form-control" onSubmit={handleSubmit(addCardPayment)}>
                <div className="form-content">
                    <label>CARDHOLDER NAME</label>
                    <input
                        type="text"
                        placeholder="e.g. Jane Appleseed"
                        {...register("name", { onChange: (e) => { SetCardname(e.target.value) } })}

                    />
                    {errors.name && <span className="msg-error">{errors.name.message}</span>}
                </div>
                <div className="form-content">
                    <label>CARD NUMBER</label>
                    <input
                        type="number"
                        placeholder="e.g. 1234 5678 9123 0000"
                        {...register("cardNumber", { onChange: (e) => { SetcardNumber(mcc(e.target.value)) } })}

                    //
                    />
                    {errors.cardNumber && <span className="msg-error">{errors.cardNumber.message}</span>}

                </div>
                <div className="card-date-exp-container">
                    <div className="card-date-label">
                        <label>EXP. DATE (MM/YY)</label>
                        <label>CVC</label>
                    </div>
                    <div className="card-date-input-container">
                        <div className="card-date-content">
                            <div className="card-date-input">
                                <input
                                    type="number"
                                    placeholder="MM"
                                    {...register("expmonth", { onChange: (e) => { SetExpMonth(e.target.value) } })}

                                />
                                <div className="error-hidden">
                                    {errors.expmonth && <span className="msg-error-date-exp">{errors.expmonth.message}</span>}
                                </div>
                            </div>
                            <div className="card-date-input">
                                <input
                                    type="number"
                                    placeholder="YY"
                                    {...register("expyear", { onChange: (e) => { SetYear(e.target.value) } })}
                                />
                                <span className="error-hidden">
                                    {errors.expyear && <span className="msg-error-date-exp">{errors.expyear.message}</span>}
                                </span>
                            </div>
                        </div>

                        <div className="card-cvc">
                            <input type="number"
                                placeholder="e.g. 123"

                                max={9999}

                                {...register("cvc", { onChange: (e) => { Setcvc(e.target.value) } })}
                            />
                            <div className="error-hidden">
                                {errors.cvc && <span className="msg-error-date-exp">{errors.cvc.message}</span>}
                            </div>
                        </div>


                    </div>

                </div>
                <button type="submit"
                >Confirm
                </button>
            </form>}



        </>

    )
}
