
export default function Card({style, text}){

    return(
        <div className={`card text-bg-${style} mb-3`}>
            <div className="card-body">
                <h5 className="card-title text-center">{text}</h5>
            </div>
        </div>
    );
}