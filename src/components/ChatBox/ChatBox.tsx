import { ReactElement, useEffect, useRef, useState } from "react";
import ChatLine from "../ChatLine/ChatLine";

type ChatBoxProps = {
    chat: [string, string][],
    onSendMessage:  (message: string) => void
}

function ChatBox({chat, onSendMessage}: ChatBoxProps) {
    const [message, setMessage] = useState<string>("");
    const chatContainerRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight
        }
    }, [chat]);

    function handleOnKeyDown(event: React.KeyboardEvent) {
        if (event.key === "Enter") {
            event.preventDefault();

            onSendMessage(message);

            setMessage("");
        }
    }

    return (
            <div>
                <div className="h-100 bg-white rounded-xl mb-5 overflow-auto p-2" ref={chatContainerRef}>
                    {chat.map((message, i) => <ChatLine isStart={chat[i-1] === undefined || chat[i-1][0] !== message[0]} sender={message[0]} content={message[1]}/>)}
                </div>
                <label className="input rounded-xl">
                    <input title="chat input" type="text" placeholder="Aa" value={message} onChange={event => {setMessage(event.target.value)}} onKeyDown={handleOnKeyDown}></input>
                </label>
            </div>
                

    )
}

export default ChatBox;
