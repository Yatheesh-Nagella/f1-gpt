import PromptSuggestionButton from "./PromptSuggestionButton";

const PromptSuggestionRow = ({ onPromptClick }) => {
    const prompts = [
        "What are the current F1 team standings?",
        "What was the fastest F1 lap time ever recorded?",
        "Who has the most F1 World Championships?",
        "Tell me about the history of the Monaco Grand Prix.",
        "Who won the F1 World Championship in 2023?",
        "What are the key rules and regulations in Formula 1 racing?"
    ];

    return(
        <div className="prompt-suggestion-row">
            {prompts.map((prompt, index) => (
                <PromptSuggestionButton
                    key={`suggestion-${index}`}
                    text={prompt}
                    onClick={() => onPromptClick(prompt)}/>
            ))}
        </div>
    )
}

export default PromptSuggestionRow;