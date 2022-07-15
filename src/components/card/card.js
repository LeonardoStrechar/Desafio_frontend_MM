import { InfoRequest } from "../style-components";

export default function Card(props) {
    return (
        <div className="divStyle">
            <InfoRequest className="infoRequest">{props.pointOne}</InfoRequest>
            <InfoRequest>{props.pointTwo}</InfoRequest>
            <InfoRequest>{props.pointThree}</InfoRequest>
        </div>
    );
}