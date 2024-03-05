import { clearElement } from '../utils/domutils.js';
import { initializeContract } from '../contracts/contract.js';

export const getForm = async () => {
    clearElement("showOption");
    clearElement("showBooks");
    clearElement("showForm");
    clearElement("doDelete");

    const contract = await initializeContract();

    let showFormElement = document.getElementById("showForm");

    let titleBook = document.createElement('input');
    titleBook.type = "text";
    titleBook.id = "titleBook";
    titleBook.placeholder = "Satanic verse";
    titleBook.size = "24";
    
    let pagesBook = document.createElement('input');
    pagesBook.type = "text";
    pagesBook.id = "pagesBook";
    pagesBook.placeholder = "560";
    pagesBook.size = "18";

    let buttonElement = document.createElement("button");
    buttonElement.type = "button";
    buttonElement.id = "setbooks";
    buttonElement.innerHTML = "Save it, <i>Bookworm!</i>";

    showFormElement.appendChild(titleBook);
    showFormElement.appendChild(pagesBook);
    showFormElement.appendChild(buttonElement);

    // Menambahkan event listener ke tombol yang baru saja dibuat
    document.getElementById("setbooks").addEventListener("click", async function() {
        try {
            const titleBook = document.getElementById("titleBook").value;
            const pagesBook = document.getElementById("pagesBook").value;

            // Validasi input dan logika tambahan di sini
            console.log("Adding new books on process...");
            // Asumsikan contract.addNewBooks adalah fungsi yang sudah didefinisikan
            await contract.addNewBooks(titleBook, pagesBook);
            
            console.log("Wait...");
        } catch (error) {
            console.error(error);
        };
    });
}