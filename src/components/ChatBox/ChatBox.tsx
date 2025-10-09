import { useState } from "react";

type ChatBoxProps = {
    chat: [string, string][],
    onSendMessage:  (message: string) => void
}

function ChatBox({chat, onSendMessage}: ChatBoxProps) {
    const [message, setMessage] = useState<string>("");

    function handleOnKeyDown(event: React.KeyboardEvent) {
        event.preventDefault();

        if (event.key === "Enter") {
            onSendMessage(message);
        }
    }

    return (
        <>
            <ul>
                {chat.map(message => `${message[0]}: ${message[1]}`)}
            </ul>
            <label className="input">
                <input title="chat input" type="text" value={message} onChange={event => setMessage(event.target.value)} onKeyDown={handleOnKeyDown}></input>
            </label>
        </>
    )
}

export default ChatBox;
