import { InfoRequest } from "../style-components";

const width = {
    width: "400px",
};

export default function CardThreeEntrypoints(props) {
    return (
        <div className="divStyle">
            <InfoRequest style={width}>{props.pointOne}</InfoRequest>
            <InfoRequest>{props.pointTwo}</InfoRequest>
            <InfoRequest>{props.pointThree}</InfoRequest>
        </div>
    );
}