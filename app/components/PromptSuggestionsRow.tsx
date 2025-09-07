import PromptSuggestionButton from "./PromptSuggestionButton";
import { Trophy, Clock, Users, Flag, Zap } from 'lucide-react';

const PromptSuggestionRow = ({ onPromptClick }) => {
    const prompts = [
        {
            text: "What are the current F1 team standings?",
            icon: <Trophy size={20} />,
            category: "Standings"
        },
        {
            text: "What was the fastest F1 lap time ever recorded?",
            icon: <Clock size={20} />,
            category: "Records"
        },
        {
            text: "Who has the most F1 World Championships?",
            icon: <Users size={20} />,
            category: "Champions"
        },
        {
            text: "Tell me about the history of the Monaco Grand Prix.",
            icon: <Flag size={20} />,
            category: "History"
        },
        {
            text: "Who won the F1 World Championship in 2023?",
            icon: <Trophy size={20} />,
            category: "Recent"
        },
        {
            text: "What are the key rules and regulations in Formula 1 racing?",
            icon: <Zap size={20} />,
            category: "Rules"
        }
    ];

    return (
        <div className="suggestions-grid">
            {prompts.map((prompt, index) => (
                <PromptSuggestionButton
                    key={`suggestion-${index}`}
                    text={prompt.text}
                    icon={prompt.icon}
                    category={prompt.category}
                    onClick={() => onPromptClick(prompt.text)}
                />
            ))}
        </div>
    );
};

export default PromptSuggestionRow;