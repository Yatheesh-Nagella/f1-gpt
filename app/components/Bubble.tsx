const Bubble = ({ message }) => {
    const { content, role } = message;
    
    return (
        <div className={`message-wrapper ${role}`}>
            <div className={`message-bubble ${role}`}>
                <p className="message-text">{content}</p>
            </div>
        </div>
    );
};

export default Bubble;