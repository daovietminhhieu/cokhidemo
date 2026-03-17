// Nếu Node <18, cài: npm i node-fetch
const fetch = require("node-fetch");
const BASE_URL = "http://localhost:3000/local";

// -------------------- AUTH --------------------
async function registerUser(user) {
    const res = await fetch(`${BASE_URL}/system/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
    });
    return res.json();
}

async function loginUser({ email, password }) {
    const res = await fetch(`${BASE_URL}/system/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
    });
    return res.json();
}


async function createNewItem(item) {
    const res = await fetch(`${BASE_URL}/user/create-new-item`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(item),
    });
    return res.json();
}

async function updateItemById(id, item) {
    const res = await fetch(`${BASE_URL}/user/update-item-by-id/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(item),
    });
    return res.json();
}

async function deleteItemById(id) {
    const res = await fetch(`${BASE_URL}/user/delete-item-by-id/${id}`, {
        method: "DELETE",
    });
    return res.json();
}

async function getItemById(id) {
    const res = await fetch(`${BASE_URL}/user/get-item-by-id/${id}`);
    return res.json();
}

async function getItems() {
    const res = await fetch(`${BASE_URL}/user/get-items`);
    return res.json();
}

async function runAllTests() {
    console.log("======== Start Full Test ========");

    const items = [
        { name: "Item 1", price: 100, quantity: 10 },
        { name: "Item 2", price: 200, quantity: 20 },
        { name: "Item 3", price: 300, quantity: 30 },
    ]

    for (const item of items) {
        const result = await createNewItem(item);
        console.log(result);
    }

    const allItems = await getItems();
    console.log(allItems);

    const item = await getItemById(allItems[0].id);
    console.log(item);

    const updatedItem = await updateItemById(allItems[0].id, { name: "Updated Item 1", price: 150, quantity: 15 });
    console.log(updatedItem);

    const deletedItem = await deleteItemById(allItems[2].id);
    console.log(deletedItem);

    const allItemsAfterDelete = await getItems();
    console.log(allItemsAfterDelete);

    console.log("======== End Full Test ========");


}

runAllTests().catch(console.error);