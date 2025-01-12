import "./kpi.css"
import { kpiCard } from "../../constants/screenData";

export default function KPI() {
    const KPIs = {
        total_books: "15,254",
        books_sold: "7,589",
        happy_customers: "97%"
    }
    return (
        <div className="kpis">
            <div className="kpi-item">
                <img src={kpiCard.icons.book} alt="" />
                <div className="kpi">
                    <div className="number">
                        {KPIs.total_books}
                    </div>
                    <div className="text">
                        TOTAL BOOKS
                    </div>
                </div>
            </div>
            <div className="kpi-item">
                <img src={kpiCard.icons.cart} alt="" />
                <div className="kpi">
                    <div className="number">
                        {KPIs.books_sold}
                    </div>
                    <div className="text">BOOKS SOLD</div>
                </div>
            </div>
            <div className="kpi-item">
                <img src={kpiCard.icons.emoji} alt="" />
                <div className="kpi">
                    <div className="number">
                        {KPIs.happy_customers}
                    </div>
                    <div className="text">HAPPY CUSTOMERS</div>
                </div>
            </div>
        </div>
    )
}