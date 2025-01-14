import "./buyButton.css"
export default function BuyButton({onclick}){
    return (
        <button className="BuyNow" onClick={onclick}>Buy Now</button>
    )
}