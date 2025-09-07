const Bubble = ({ message }) => {
    const { content, role } = message;
    
    return (
        <div className={`flex ${role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div
                className={`max-w-3xl rounded-2xl px-6 py-4 ${
                    role === 'user'
                        ? 'bg-gradient-to-r from-red-600 to-red-500 text-white shadow-lg shadow-red-500/25'
                        : 'bg-gray-800/80 backdrop-blur-sm text-gray-100 border border-gray-700/50'
                }`}
            >
                <p className="leading-relaxed whitespace-pre-wrap">{content}</p>
            </div>
        </div>
    );
};

export default Bubble;