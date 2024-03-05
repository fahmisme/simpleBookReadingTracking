import { initializeContract } from '../contracts/contract.js';
import { clearElement } from '../utils/domutils.js';

export const getBooks = async () => {
    clearElement("showOption");
    clearElement("showBooks");
    clearElement("showForm");
    clearElement("doDelete");

    const contract = await initializeContract();
    const books = await contract.myLibrary();
    // Implementasi untuk menampilkan buku
    let showbooksElement = document.getElementById("showBooks");
    let olElement = document.createElement("ol");
    let textNode;

    for (let i = 0; i < books[0].length; i++) {
        if (books[0][i] != 0 || books[1][i] != 0) {                
            // Membuat elemen <li> baru untuk setiap iterasi
            let liElement = document.createElement("li");
            
            textNode = document.createTextNode(`${books[0][i]} - ${books[1][i]} pages - ${books[2][i]}`);
            liElement.appendChild(textNode);
            
            olElement.appendChild(liElement);
        }
    }
    showbooksElement.appendChild(olElement);
};
