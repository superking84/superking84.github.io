import './MessageBox.scss';

interface MessageBoxProps {
    message: string;
}

function MessageBox(props: MessageBoxProps) {
    return (
        <div className="message-box">
            <span className="message-box-message">{props.message}</span>
        </div>
    );
}

export default MessageBox;