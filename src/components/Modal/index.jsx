import "./Modal.scss"


export const Modal = ({ closeModal }) => {

    return (
        <div className="modal">
            <img src="/assets/images/icon-complete.svg" alt="Sucess" />
            <h1>THANK YOU</h1>
            <p>We've added your card details</p>
            <button onClick={closeModal}>Continue</button>
        </div>
    )
}

export default Modal