export default function Tool({ toolName, children }) {
    return (
        <div className='mx-2 my-6 py-3 border-2 border-gray-400 drop-shadow-xl bg-gray-100 rounded-xl text-center'>
            <h1 className='pl-2 text-2xl text-left font-bold tracking-tight'>{toolName}</h1>
            {children}
        </div>
    );
}