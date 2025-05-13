import DuckCard from './DuckCard';

const DuckPond = ({ ducks, setDucks }) => {
    return (
        <section
            id='pond'
            className='flex justify-center flex-wrap gap-4 p-4 w-full'
        >
            {ducks?.map((duck) => (
                <DuckCard key={duck._id} duck={duck} setDucks={setDucks} />
            ))}
        </section>
    );
};

export default DuckPond;
