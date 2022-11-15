export default function Tool({ toolName, children }) {
    return (
        <div className='flex flex-col justify-center mx-2 my-6 py-3 md:mx-auto md:my-8 md:w-4/6 lg:w-3/6 xl:w-2/6 border-2 border-gray-400 drop-shadow-xl bg-gray-100 rounded-xl text-center'>
            <h1 className='pl-2 text-2xl text-left font-bold tracking-tight'>{toolName}</h1>
            {children}
        </div>
    );
}