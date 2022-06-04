import "./MessageBox.scss";

export enum MessageType {
    Error,
    Win,
    Loss
};

interface MessageBoxProps {
    message: string;
    messageType: MessageType | null;
}

function MessageBox(props: MessageBoxProps) {
    let classes = "message-box";
    switch (props.messageType) {
        case MessageType.Error:
            classes += " shake";
            break;
        case MessageType.Loss:
            classes += " drop";
            break;
        case MessageType.Win:
            classes += " hop";
            break;
        default:
            break;
    }

    return (
        <div className={classes}>
            <span className="message-box-message">{props.message}</span>
        </div>
    );
}

export default MessageBox;