const PromptSuggestionButton = ({ text, onClick, icon, category }) => {
    return (
        <button className="suggestion-card" onClick={onClick}>
            <div className="suggestion-header">
                <div className="suggestion-icon-section">
                    <div className="suggestion-icon">{icon}</div>
                    <span className="suggestion-category">{category}</span>
                </div>
            </div>
            <p className="suggestion-text">{text}</p>
        </button>
    );
};

export default PromptSuggestionButton;
