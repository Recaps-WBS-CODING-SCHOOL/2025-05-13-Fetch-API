import { useState } from 'react';
import { deleteDuck } from '../data/ducks';
import EditForm from './EditForm';

const DuckCard = ({ duck, setDucks }) => {
    const { _id, name, imgUrl, quote } = duck;
    const [editing, setEditing] = useState(false);

    const handleDelete = async () => {
        try {
            await deleteDuck(_id);
            setDucks((prev) => prev.filter((duck) => duck._id !== _id));
        } catch (error) {
            console.error(error);
        }
    };

    if (editing)
        return (
            <EditForm duck={duck} setEditing={setEditing} setDucks={setDucks} />
        );
    return (
        <div className='shadow-xl hover:shadow-2xl hover:cursor-pointer w-96 rounded-md m-auto flex-flex-col'>
            <figure className='rounded-t-md overflow-hidden w-full h-96'>
                <img className='w-full h-full' src={imgUrl} alt={name} />
            </figure>
            <div className='flex flex-col p-6 pt-2 rounded-b-md bg-slate-800 h-40'>
                <h2 className='text-3xl border-b-2 mb-4 border-b-gray-400'>
                    {name}
                </h2>
                <p>{quote}</p>
                <div className='flex justify-end gap-4 w-full'>
                    <button
                        onClick={handleDelete}
                        className='bg-red-600 p-2 rounded-lg font-bold'
                    >
                        Delete
                    </button>
                    <button
                        onClick={() => setEditing(true)}
                        className='bg-blue-600 p-2 rounded-lg font-bold'
                    >
                        Edit
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DuckCard;
