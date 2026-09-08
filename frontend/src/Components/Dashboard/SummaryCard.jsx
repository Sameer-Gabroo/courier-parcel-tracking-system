import {
    FiPackage,
    FiTruck,
    FiCheckCircle,
    FiAlertCircle
} from "react-icons/fi";

function SummaryCard({ title, value, description, type }) {

    const icons = {
        total: <FiPackage />,
        transit: <FiTruck />,
        delivered: <FiCheckCircle />,
        delayed: <FiAlertCircle />
    };

    return (
        <article className={`summary-card ${type}`}>

            <span className="summary-card-accent" aria-hidden="true" />

            <div className="summary-card-content">
                <p className="summary-card-title">
                    {title}
                </p>

                <h3 className="summary-card-value">
                    {value}
                </h3>

                <p className="summary-card-description">
                    {description}
                </p>
            </div>

            <div className="summary-card-icon" aria-hidden="true">
                {icons[type]}
            </div>

        </article>
    );
}

export default SummaryCard;
