const chocolates = [
    {
        id: 1,
        name: "Cadbury Dairy Milk Silk Chocolate Bar",
        price: 2.00,
        image: "https://m.media-amazon.com/images/I/61AOakq3itL._AC_UL400_.jpg"
    },
    {
        id: 2,
        name: "Cadbury Dairy Milk Tangy Mango Madbury Chocolate",
        price: 45.50,
        image: "https://m.media-amazon.com/images/I/61pm6yuJpKL._AC_UL400_.jpg"
    },
    {
        id: 3,
        name: "Cadbury Dairy Milk Nutty Kulfi Madbury Chocolate Bar",
        price: 46.00,
        image: "https://m.media-amazon.com/images/I/61JfC09VqYL._AC_UL400_.jpg"
    },
    {
        id: 4,
        name: "Cadbury Dairy Milk Silk Oreo",
        price: 171.50,
        image: "https://m.media-amazon.com/images/I/51A11QM92LL._AC_UL400_.jpg"
    },
    {
        id: 5,
        name: "Cadbury 5 Star Chocolate Bar",
        price: 20.00,
        image: "https://m.media-amazon.com/images/I/51cAZBMYMAL._AC_UL400_.jpg"
    },
    {
        id: 6,
        name: "Cadbury Dairy Milk Silk Ganache Chocolate Bar",
        price: 184.50,
        image: "https://m.media-amazon.com/images/I/51LVkIloqsL._AC_UL400_.jpg"
    },
    {
        id: 7,
        name: "Cadbury Dairy Milk Silk Mousse Chocolate Bar",
        price: 180.00,
        image: "https://m.media-amazon.com/images/I/513yW762m7L._AC_UL400_.jpg"
    },
    {
        id: 8,
        name: "Cadbury Dairy Milk Silk Roast Almond Chocolate Bar",
        price: 80.50,
        image: "https://m.media-amazon.com/images/I/51Ui3JCMiJL._AC_UL400_.jpg"
    },
    {
        id: 9,
        name: "Cadbury Dairy Milk Silk Bubbly Chocolate Bar",
        price: 183.00,
        image: "https://m.media-amazon.com/images/I/51j6lfF9BAL._AC_UL400_.jpg"
    },
    {
        id: 10,
        name: "Cadbury Dairy Milk Roast Almond Chocolate Bar",
        price: 2.50,
        image: "https://m.media-amazon.com/images/I/618q5qWraWL._AC_UL400_.jpg"
    }
];

let selectedChocolates = [];

function addToPack(chocolateId) {
    const addButton = document.getElementById(`addButton${chocolateId}`);


    if (selectedChocolates.length >= 8) {
        alert("You can select up to 8 chocolates.");
        return;
    }


    const existingIndex = selectedChocolates.findIndex(item => item.id === chocolateId);
    if (existingIndex === -1) {
        selectedChocolates.push({ id: chocolateId, quantity: 1 });
    } else {
        selectedChocolates[existingIndex].quantity++;
    }
    updateSelectedChocolates();
    calculateTotalPrice();

  
    addButton.disabled = true;
    addButton.classList.add('disabled');
}

function removeFromPack(chocolateId) {
    const addButton = document.getElementById(`addButton${chocolateId}`);
    const selectedChocolatesList = document.getElementById('selected-chocolates');


    const index = selectedChocolates.findIndex(item => item.id === chocolateId);

    if (index !== -1) {

        if (selectedChocolates[index].quantity > 1) {
            selectedChocolates[index].quantity--;
        } else {
            selectedChocolates.splice(index, 1);
        }
        updateSelectedChocolates();
        calculateTotalPrice();


        addButton.disabled = false;
        addButton.classList.remove('disabled');
    }
}

function updateSelectedChocolates() {
    const selectedChocolatesList = document.getElementById('selected-chocolates');
    selectedChocolatesList.innerHTML = ''; 

    selectedChocolates.forEach((item) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <img class="chocolate-img" src="${chocolates[item.id - 1].image}" alt="Chocolate ${item.id}">
            Chocolate ${item.id} (Quantity: ${item.quantity})
            <button class="button remove-button" onclick="removeFromPack(${item.id})">Remove</button>
            `;
        selectedChocolatesList.appendChild(li);
    });
}

function calculateTotalPrice() {
    let total = 0;
    selectedChocolates.forEach((item) => {
        const chocolate = chocolates.find(choc => choc.id === item.id);
        if (chocolate) {
            total += chocolate.price * item.quantity;
        }
    });
    const totalPriceElement = document.getElementById('total-price');
    totalPriceElement.textContent = total.toFixed(2);
}

const chocolatesList = document.getElementById('chocolates');
chocolates.forEach(chocolate => {
    const li = document.createElement('li');
    li.innerHTML = `
        <div class="chocolate-card">
            <img class="chocolate-img" src="${chocolate.image}" alt="${chocolate.name}">
            <div class="chocolate-info">
                <div class="chocolate-title">${chocolate.name}</div>
                <div class="chocolate-price">$${chocolate.price.toFixed(2)}</div>
            </div>
            <div class="button-container">
                <button class="button" onclick="addToPack(${chocolate.id})" id="addButton${chocolate.id}">Add</button>
            </div>
        </div>
    `;
    chocolatesList.appendChild(li);
});
