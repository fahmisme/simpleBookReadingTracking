import { clearElement } from '../utils/domutils.js';
import { initializeContract } from '../contracts/contract.js';

export const deleteOption = async () => {
    clearElement("doDelete");
    clearElement("showOption");
    clearElement("showBooks");
    clearElement("showForm");

    const contract = await initializeContract();
    const books = await contract.myLibrary();

    let doDeleteElement = document.getElementById("doDelete");
    // Membuat elemen <select> untuk iterasi dari array books
    let selectElement = document.createElement("select");

    // Iterasi melalui array books
    for (let i = 0; i < books[0].length; i++) {
        if (books[0][i] != 0 || books[1][i] != 0) {
            let optionElement = document.createElement("option");
            let textNode = document.createTextNode(books[0][i]);
            optionElement.appendChild(textNode);
            optionElement.value = i;
            
            selectElement.appendChild(optionElement);
        }
    }

    // Menambahkan <select> ke DOM
    doDeleteElement.appendChild(selectElement);
    let buttonElement = document.createElement("button");
    buttonElement.type = "button";
    buttonElement.id = "deleteBook";
    buttonElement.innerHTML = "Delete it, <i>Bookworm!</i>";
    buttonElement.addEventListener("click", async function() {
        try {
            const indexBook = selectElement.value;

            // Validasi input dan logika tambahan di sini
            console.log("Update status read on process...");
            // Asumsikan contract.addNewBooks adalah fungsi yang sudah didefinisikan
            await contract.deleteBooks(indexBook);
            
            console.log("Wait...");
        } catch (error) {
            console.error(error);
        };
    });
    doDeleteElement.appendChild(buttonElement);
};
