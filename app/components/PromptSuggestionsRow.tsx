import PromptSuggestionButton from "./PromptSuggestionButton";
import { Trophy, Clock, Users, Flag, Zap } from 'lucide-react';

const PromptSuggestionRow = ({ onPromptClick }) => {
    const prompts = [
        {
            text: "What are the current F1 team standings?",
            icon: <Trophy className="w-4 h-4" />,
            category: "Standings"
        },
        {
            text: "What was the fastest F1 lap time ever recorded?",
            icon: <Clock className="w-4 h-4" />,
            category: "Records"
        },
        {
            text: "Who has the most F1 World Championships?",
            icon: <Users className="w-4 h-4" />,
            category: "Champions"
        },
        {
            text: "Tell me about the history of the Monaco Grand Prix.",
            icon: <Flag className="w-4 h-4" />,
            category: "History"
        },
        {
            text: "Who won the F1 World Championship in 2023?",
            icon: <Trophy className="w-4 h-4" />,
            category: "Recent"
        },
        {
            text: "What are the key rules and regulations in Formula 1 racing?",
            icon: <Zap className="w-4 h-4" />,
            category: "Rules"
        }
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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