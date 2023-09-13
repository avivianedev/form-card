import Card from "../../components/Card";
import Form from "../../components/Form";
import "./Home.scss";





export default function Home() {

    return (

        <div className="home-container">
            <div className="home-image">
                <img className="img-desktop" src="/assets/images/bg-main-desktop.png" alt="" />
            </div>
            <div className="img-responsive-mobile">
                <img src="/assets/images/bg-main-mobile.png" alt="" />
            </div>
            <div className="contend">
                <Card />
                <Form />
            </div>


        </div>
    )
}
