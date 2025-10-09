import { useAuthContext } from "../../hooks/useAuthContext";

type ChatLineProps = {
    sender: string,
    content: string,
    isStart: boolean
}

function ChatLine({sender, content, isStart}: ChatLineProps) {
    const {user} = useAuthContext();

    return (
        <div className={`chat chat-${user?.name === sender ? "end" : "start"}`}>
            <div className={`chat-header ${!isStart || user?.name === sender ? "hidden" : ""}`}>
                {sender}
            </div>
            <div className="chat-bubble bg-blue-200">
                {content}
            </div>
        </div>
    )
}

export default ChatLine;
