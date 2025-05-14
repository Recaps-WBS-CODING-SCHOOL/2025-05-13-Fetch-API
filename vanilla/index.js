const pond = document.querySelector('#pond');
const summonBtn = document.querySelector('#summon-btn');
const addForm = document.querySelector('#add-form');
const editModal = document.querySelector('#edit-modal');

const renderDuck = (duckObj, container) => {
    const { _id, imgUrl, name, quote } = duckObj;
    const card = document.createElement('div');
    card.className =
        'shadow-xl hover:shadow-2xl hover:cursor-pointer w-96 rounded-md m-auto flex-flex-col';

    const figure = document.createElement('figure');
    figure.className = 'rounded-t-md overflow-hidden w-full h-96';
    const img = document.createElement('img');
    img.className = 'w-full';
    img.src = imgUrl;
    img.alt = name;
    figure.appendChild(img);

    const body = document.createElement('div');
    body.className = 'flex flex-col p-6 pt-2 rounded-b-md bg-slate-800 h-40';
    const title = document.createElement('h2');
    title.className = 'text-3xl border-b-2 mb-4 border-b-gray-400';
    title.textContent = name;
    const text = document.createElement('p');
    text.textContent = quote;

    const btns = document.createElement('div');
    btns.className = 'flex justify-end gap-4 w-full';
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.className = 'bg-red-600 p-2 rounded-lg font-bold';
    deleteBtn.addEventListener('click', async () => {
        try {
            await deleteDuck(_id);
            card.remove();
        } catch (error) {
            errorHandler(error, card);
        }
    });
    const editBtn = document.createElement('button');
    editBtn.textContent = 'Edit';
    editBtn.className = 'bg-blue-600 p-2 rounded-lg font-bold';
    editBtn.addEventListener('click', async () => {
        editModal.showModal();
        const editForm = document.querySelector('#edit-form');
        const editName = editForm.querySelector('#edit-name');
        const editImgUrl = editForm.querySelector('#edit-img-url');
        const editQuote = editForm.querySelector('#edit-quote');

        editName.value = name;
        editImgUrl.value = imgUrl;
        editQuote.value = quote;

        editForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            if (!editName.value || !editImgUrl.value || !editQuote.value) {
                alert('Please fill in required fields!');
                return;
            }
            const updatedDuck = {
                name: editName.value,
                imgUrl: editImgUrl.value,
                quote: editQuote.value,
            };
            try {
                await updateDuck(_id, updatedDuck);

                img.src = updatedDuck.imgUrl;
                img.alt = updatedDuck.name;
                title.textContent = updatedDuck.name;
                text.textContent = updatedDuck.quote;

                editModal.close();
            } catch (error) {
                errorHandler(error, editForm);
            }
        });
    });
    btns.appendChild(deleteBtn);
    btns.appendChild(editBtn);
    body.appendChild(title);
    body.appendChild(text);
    body.appendChild(btns);

    card.appendChild(figure);
    card.appendChild(body);

    container.appendChild(card);
};

const errorHandler = (error, container) => {
    console.error(error);
    const h2 = document.createElement('h2');
    h2.className = 'inline-block m-auto text-6xl mb-6 text-red-600';
    h2.textContent = error;
    container.appendChild(h2);

    setTimeout(() => h2.remove(), 3000);
};

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

summonBtn.addEventListener('click', async () => {
    try {
        const allDucks = await getAllDucks();
        allDucks.forEach((duck) => renderDuck(duck, pond));
    } catch (error) {
        errorHandler(error, pond);
    }
});

addForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = addForm.querySelector('#name');
    const imgUrl = addForm.querySelector('#img-url');
    const quote = addForm.querySelector('#quote');

    if (!name.value || !imgUrl.value) {
        alert('Please fill in required fields!');
        return;
    }

    const newDuck = {
        name: name.value,
        imgUrl: imgUrl.value,
        quote: quote.value || null,
    };
    try {
        const newDuckData = await createDuck(newDuck);
        console.log(newDuckData);
        renderDuck(newDuckData, pond);
        e.target.reset();
    } catch (error) {
        errorHandler(error, addForm);
    }
});
