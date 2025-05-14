const getAllDucks = async () => {
    // console.log('You tried to fetch the ducks!');
    const res = await fetch('https://duckpond-89zn.onrender.com/wild-ducks');
    if (!res.ok) throw new Error(`${res.status}. Something went wrong!`);
    const data = await res.json();
    return data;
};

const createDuck = async (newDuck) => {
    // console.log(newDuck);
    const res = await fetch('https://duckpond-89zn.onrender.com/wild-ducks', {
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify(newDuck),
    });
    if (!res.ok) throw new Error(`${res.status}. Something went wrong!`);
    const data = await res.json();
    return data;
};

const updateDuck = async (duckId, updatedDuck) => {
    const res = await fetch(
        `https://duckpond-89zn.onrender.com/wild-ducks/${duckId}`,
        {
            method: 'PUT',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify(updatedDuck),
        }
    );
    if (!res.ok) throw new Error(`${res.status}. Something went wrong!`);
    const data = await res.json();
    return data;
};

const deleteDuck = async (duckId) => {
    const res = await fetch(
        `https://duckpond-89zn.onrender.com/wild-ducks/${duckId}`,
        { method: 'DELETE' }
    );
    if (!res.ok) throw new Error(`${res.status}. Something went wrong!`);
};

export { getAllDucks, createDuck, updateDuck, deleteDuck };
