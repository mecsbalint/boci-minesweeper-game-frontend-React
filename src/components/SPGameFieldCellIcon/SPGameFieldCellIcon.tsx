import { FaBomb } from "react-icons/fa";
import { CellState } from "../../types/Game";
import { RiTriangularFlagFill } from "react-icons/ri";
import { RiNumber1 } from "react-icons/ri";
import { RiNumber2 } from "react-icons/ri";
import { RiNumber3 } from "react-icons/ri";
import { RiNumber4 } from "react-icons/ri";
import { RiNumber5 } from "react-icons/ri";
import { RiNumber6 } from "react-icons/ri";
import { RiNumber7 } from "react-icons/ri";
import { RiNumber8 } from "react-icons/ri";

type SPGameFieldCellIconProps = {
    cellState: CellState
}

function SPGameFieldCellIcon({cellState}: SPGameFieldCellIconProps) {

    switch (cellState) {
        case "mine":
            return <FaBomb className="mx-auto" />
        case "flagged":
            return <RiTriangularFlagFill className="mx-auto" />
        case "1":
            return <RiNumber1 className="mx-auto" />
        case "2":
            return <RiNumber2 className="mx-auto" />
        case "3":
            return <RiNumber3 className="mx-auto" />
        case "4":
            return <RiNumber4 className="mx-auto" />
        case "5":
            return <RiNumber5 className="mx-auto" />
        case "6":
            return <RiNumber6 className="mx-auto" />
        case "7":
            return <RiNumber7 className="mx-auto" />
        case "8":
            return <RiNumber8 className="mx-auto" />
        default: 
            return <></>
    }
}

export default SPGameFieldCellIcon;
