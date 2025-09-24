import { useState } from "react";

function MPGamePage() {
    const [list, setList] = useState<string[]>([])

    return (
        <div className="place-items-center">
            Multiplayer Game Page
        </div>
    )
}

export default MPGamePage;
