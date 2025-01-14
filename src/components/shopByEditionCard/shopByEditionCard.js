import "./shopByEditionCard.css"
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { useEffect, useState } from 'react';

export default function ShopByEditionCard(){
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        window.addEventListener('resize', handleResize);
        handleResize();

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const Cards = [
        {
            year:2018,
            img:"/assets/images/2018.png"
        },
        {
            year:2019,
            img:"/assets/images/2019.png"
        },
        {
            year:2020,
            img:"/assets/images/2020.png"
        },
        {
            year:2021,
            img:"/assets/images/2021.png"
        },
        {
            year:2022,
            img:"/assets/images/2022.png"
        },
        {
            year:2023,
            img:"/assets/images/2023.png"
        }
    ];

    return(
        <div className={`Cards ${isMobile ? 'mobile' : ''}`}>
            {Cards.map((e)=>( 
                <div className="card">
                    <div className="card-img">
                        <img style={{width:"100%",height:"100%"}} src={e.img} alt="" srcset="" />
                    </div>
                    <a className="card-text" href="">
                        <p>View {e.year} Edition </p>
                        <KeyboardArrowRightIcon/>
                    </a>
                </div>
            ))}
        </div>
    )
}