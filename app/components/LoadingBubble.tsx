const LoadingBubble = () => {
    return (
        <div className="flex justify-start">
            <div className="bg-gray-800/80 backdrop-blur-sm rounded-2xl px-6 py-4 border border-gray-700/50">
                <div className="flex items-center space-x-2 text-red-400">
                    <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-red-400 rounded-full animate-bounce" style={{animationDelay: '0ms'}}></div>
                        <div className="w-2 h-2 bg-red-400 rounded-full animate-bounce" style={{animationDelay: '150ms'}}></div>
                        <div className="w-2 h-2 bg-red-400 rounded-full animate-bounce" style={{animationDelay: '300ms'}}></div>
                    </div>
                    <span className="text-sm">F1 GPT is thinking...</span>
                </div>
            </div>
        </div>
    );
};

export default LoadingBubble;