import { CellState } from "../../types/Game";
import { FaBomb } from "react-icons/fa";
import { FaExplosion } from "react-icons/fa6"
import { RiTriangularFlagFill, RiNumber1, RiNumber2, RiNumber3, RiNumber4, RiNumber5, RiNumber6, RiNumber7, RiNumber8 } from "react-icons/ri";

type SPGameFieldCellIconProps = {
    cellState: CellState
}

function SPGameFieldCellIcon({cellState}: SPGameFieldCellIconProps) {

    switch (cellState) {
        case "mine":
            return <FaBomb className="mx-auto" />
        case "mine_activated":
            return <FaExplosion className="mx-auto" />
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
