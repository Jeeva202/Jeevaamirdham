import "./shopByEditionCard.css"

export default function ShopByEditionCard(){
    const Cards = [
        {
            year:2018,
            img:""
        },
        {
            year:2019,
            img:""
        },
        {
            year:2020,
            img:""
        },
        {
            year:2021,
            img:""
        },
        {
            year:2022,
            img:""
        }
    ]
    return(
        <div className="Cards">
            {Cards.map((e)=>(
                <div className="card">
                    <div className="card-img">
                        <img src={e.img} alt="" srcset="" />
                    </div>
                    <a className="card-text" href="">
                        View {e.year} Edition
                    </a>
                </div>
            ))}
        </div>
    )
}