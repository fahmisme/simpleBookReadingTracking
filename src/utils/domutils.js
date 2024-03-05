export const clearElement = (elementId) => {
    const element = document.getElementById(elementId);
    if (element) element.innerHTML = "";
};

export const createListElement = async (bookList) => {
    const books = await contract.myLibrary();
    createListElement(books[0], "showBooks"); // Asumsikan books[0] adalah array string yang berisi judul buku
};
