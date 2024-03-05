import { getBooks } from './events/bookEvents.js';
import { getForm } from './events/formEvents.js';
import { getOption } from './events/optionEvents.js';
import { deleteOption } from './events/deleteEvents.js';

document.getElementById("getBooks").addEventListener("click", getBooks);
document.getElementById("getForm").addEventListener("click", getForm);
document.getElementById("getOption").addEventListener("click", getOption);
document.getElementById("deleteOption").addEventListener("click", deleteOption);
