const LoadingBubble = () => {
    return (
        <div className="loading-bubble">
            <div className="loading-content">
                <div className="loading-indicator">
                    <div className="loading-dots">
                        <div className="loading-dot"></div>
                        <div className="loading-dot"></div>
                        <div className="loading-dot"></div>
                    </div>
                    <span className="loading-text">F1 GPT is thinking...</span>
                </div>
            </div>
        </div>
    );
};

export default LoadingBubble;