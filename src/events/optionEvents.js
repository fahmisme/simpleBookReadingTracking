import { clearElement } from '../utils/domutils.js';
import { initializeContract } from '../contracts/contract.js';

export const getOption = async () => {
    clearElement("showOption");
    clearElement("showBooks");
    clearElement("showForm");
    clearElement("doDelete");

    const contract = await initializeContract();
    const books = await contract.myLibrary();

    // Membuat elemen <select> untuk iterasi dari array books
    let showOptionElement = document.getElementById("showOption");
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
    showOptionElement.appendChild(selectElement);

    // Membuat elemen <select> lain untuk iterasi dari array ["None", "Start", "Process", "Done"]
    let selectElementStatus = document.createElement("select");

    // Iterasi melalui array ["None", "Start", "Process", "Done"]
    let statusOptions = ["None", "Start", "Process", "Done"];
    for (let i = 0; i < statusOptions.length; i++) {
        let optionElement = document.createElement("option");
        let textNode = document.createTextNode(statusOptions[i]);
        optionElement.appendChild(textNode);
        optionElement.value = i;
        
        selectElementStatus.appendChild(optionElement);
    }

    // Menambahkan <select> lain ke DOM
    showOptionElement.appendChild(selectElementStatus);

    let buttonElement = document.createElement("button");
    buttonElement.type = "button";
    buttonElement.id = "updateStatus";
    buttonElement.innerHTML = "Update it, <i>Bookworm!</i>";
    buttonElement.addEventListener("click", async function() {
        try {
            const indexBook = selectElement.value;
            const statusBook = selectElementStatus.value;

            // Validasi input dan logika tambahan di sini
            console.log("Update status read on process...");
            // Asumsikan contract.addNewBooks adalah fungsi yang sudah didefinisikan
            await contract.statusRead(indexBook, statusBook);
            
            console.log("Wait...");
        } catch (error) {
            console.error(error);
        };
    });
    showOptionElement.appendChild(buttonElement);
};
