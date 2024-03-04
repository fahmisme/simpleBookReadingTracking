import { ethers } from 'ethers';

let contract = undefined;
let signer = undefined;
const contractAddress = "0x057762b40c53a80ec8aef5ada4703be74f0ea960";
const contractABI = [
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_title",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "_pages",
				"type": "uint256"
			}
		],
		"name": "addNewBooks",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_id",
				"type": "uint256"
			}
		],
		"name": "deleteBooks",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_id",
				"type": "uint256"
			},
			{
				"internalType": "enum booksReadUpdate.statusReading",
				"name": "_status",
				"type": "uint8"
			}
		],
		"name": "statusRead",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			},
			{
				"internalType": "enum booksReadUpdate.statusReading",
				"name": "",
				"type": "uint8"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "detailsbook",
		"outputs": [
			{
				"internalType": "string",
				"name": "nameBooks",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "pages",
				"type": "uint256"
			},
			{
				"internalType": "enum booksReadUpdate.statusReading",
				"name": "status",
				"type": "uint8"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "myLibrary",
		"outputs": [
			{
				"internalType": "string[]",
				"name": "",
				"type": "string[]"
			},
			{
				"internalType": "uint256[]",
				"name": "",
				"type": "uint256[]"
			},
			{
				"internalType": "string[]",
				"name": "",
				"type": "string[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
];

const provider = new ethers.providers.Web3Provider(window.ethereum, "sepolia");

provider.send("eth_requestAccounts", []).then(() => {
    provider.listAccounts().then((accounts) => {
        signer = provider.getSigner(accounts[0]);
        contract = new ethers.Contract(
            contractAddress,
            contractABI,
            signer
            );
        });
    });

document.getElementById("getBooks").addEventListener("click", async function(){
    try {
        console.log('Wait a few seconds...')
        
        const books = await contract.myLibrary();

        let showbooksElement = document.getElementById("showBooks");
        if (showbooksElement.innerHTML !== "") {
            showbooksElement.innerHTML = "";
        }

		let showOptionElement = document.getElementById("showOption");
		showOptionElement.innerHTML = "";

        let showFormElement = document.getElementById("showForm");    
        showFormElement.innerHTML = "";

		let doDeleteElement = document.getElementById("doDelete");
        doDeleteElement.innerHTML = "";

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
        
    } catch (error) {
        console.error(error);
    };
});

document.getElementById("getForm").addEventListener("click", async function(){
    try {
        console.log('Wait a few seconds...')
        
        let showFormElement = document.getElementById("showForm");
        if (showFormElement.innerHTML !== "") {
            showFormElement.innerHTML = "";
        }

        let showbooksElement = document.getElementById("showBooks");
        showbooksElement.innerHTML = "";

        let showOptionElement = document.getElementById("showOption");
		showOptionElement.innerHTML = "";

		let doDeleteElement = document.getElementById("doDelete");
        doDeleteElement.innerHTML = "";

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
    catch (error) {
        console.error(error);
    };
});

document.getElementById("getOption").addEventListener("click", async function(){
    try {
        console.log('Wait a few seconds...');
        
        let showOptionElement = document.getElementById("showOption");
        if (showOptionElement.innerHTML !== "") {
            showOptionElement.innerHTML = ""; // Hapus konten lama
        }

        let showbooksElement = document.getElementById("showBooks");
        showbooksElement.innerHTML = "";

        let showFormElement = document.getElementById("showForm");
        showFormElement.innerHTML = "";

		let doDeleteElement = document.getElementById("doDelete");
        doDeleteElement.innerHTML = "";

        const books = await contract.myLibrary();

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
    }
    catch (error) {
        console.error(error);
    };
});

document.getElementById("deleteOption").addEventListener("click", async function(){
	try {
        console.log('Wait a few seconds...');
        
        let doDeleteElement = document.getElementById("doDelete");
        if (doDeleteElement.innerHTML !== "") {
            doDeleteElement.innerHTML = ""; // Hapus konten lama
        }

        let showbooksElement = document.getElementById("showBooks");
        showbooksElement.innerHTML = "";

        let showFormElement = document.getElementById("showForm");
        showFormElement.innerHTML = "";

		let showOptionElement = document.getElementById("showOption");
		showOptionElement.innerHTML = "";

        const books = await contract.myLibrary();

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
    }
    catch (error) {
        console.error(error);
    };
});