import { useState, useEffect } from 'react';
import { getAllDucks } from './data/ducks';

import Header from './components/Header';
import DuckPond from './components/DuckPond';
import DuckForm from './components/DuckForm';

function App() {
    const [ducks, setDucks] = useState([]);
    useEffect(() => {
        // const getAndSetDucks = async () => {
        //     try {
        //         const allDucks = await getAllDucks();
        //         setDucks(allDucks);
        //     } catch (error) {
        //         console.error(error);
        //     }
        // };
        // getAndSetDucks();

        (async () => {
            try {
                const allDucks = await getAllDucks();
                setDucks(allDucks);
            } catch (error) {
                console.error(error);
            }
        })();
    }, []);

    return (
        <div className='bg-slate-600 text-gray-300 flex flex-col min-h-screen'>
            <Header />
            <main className='flex-grow flex flex-col justify-between py-4'>
                <DuckPond ducks={ducks} setDucks={setDucks} />
                <DuckForm setDucks={setDucks} />
            </main>
        </div>
    );
}

export default App;
