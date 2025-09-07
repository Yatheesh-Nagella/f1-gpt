const PromptSuggestionButton = ({ text, onClick, icon, category }) => {
    return (
        <button 
            className="group bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-4 hover:bg-gray-700/50 hover:border-red-500/50 transition-all duration-300 text-left hover:scale-105 hover:shadow-lg hover:shadow-red-500/10"
            onClick={onClick}
        >
            <div className="flex items-center space-x-3 mb-2">
                <div className="text-red-400 group-hover:text-red-300 transition-colors">
                    {icon}
                </div>
                <span className="text-xs font-semibold text-red-400 bg-red-400/10 px-2 py-1 rounded-full">
                    {category}
                </span>
            </div>
            <p className="text-gray-200 group-hover:text-white transition-colors text-sm font-medium">
                {text}
            </p>
        </button>
    );
};

export default PromptSuggestionButton;