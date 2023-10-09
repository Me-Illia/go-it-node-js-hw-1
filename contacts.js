import fs from "fs/promises";
import path from "path";
import { nanoid } from "nanoid";

const contactsPath = path.resolve("db", "contacts.json");
// const contactsPath = path.join(__dirname, "contacts.json") - work only in CommonJS

const updateContacts = contacts =>  fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2)); // перезаписуємо файл (перезаписується строкою, тому використовуємо "JSON.stringify")
// updateContacts зробили окремою функцією (стрілочна), так як перезаписання контактів буде повторюватись і щоби не писати те саме вивели в 1-ну функцію

export async function listContacts() {
    // ...твій код. Повертає масив контактів.
    const data = await fs.readFile(contactsPath, "utf-8"); // зчитуємо файл
    // await повертає в промісах в змінну вже сам результат
    return JSON.parse(data); // повертаємо дані в змінну, після виклику функції "listContacts()" отримажємо результат при виклику index.js
}

export async function getContactById(contactId) {
    // ...твій код. Повертає об'єкт контакту з таким id. Повертає null, якщо контакт з таким id не знайдений.
    const contacts = await listContacts(); // отримуємо списки контактів
    const result = contacts.find(item => item.id === contactId); // методом .find знаходимо певний "contactId"
    return result || null; // повертаємо в функцію змінну result або null (це як для бази данних)
}

export async function removeContact(contactId) {
    // ...твій код. Повертає об'єкт видаленого контакту. Повертає null, якщо контакт з таким id не знайдений.
    const contacts = await listContacts();
    const index = contacts.findIndex(item => item.id == contactId); // метод .findIndex повертає "-1" якщо не знайщов певний айді, підійде для умови
    // чому не використовували .filter ане, знаходимо спочатку індексом? — Бо якщо використали фільтр, то ми би ніколи не дізналися чи є з таким айді контакт, якщо би і був "null" то ми би його не отримали таким чином як зараз
    if (index === - 1) {
        return null;
    } 
    const [result] = contacts.splice(index, 1); // методом .splice вирізаємо і повертаємо знайдений масив (p.s - даний метод також зберігає вирізаний елемент)
    // const [result] чому саме так? — робимо Деструктуризацію масиву для того щоби одразу звернутися до потрібного елементу
    await updateContacts(contacts) // перезаписуємо файл 
    return result; // повертаємо видаленний елемент (це для логу при виконанні щоби показало - що саме видалили)
}

export async function addContact(data) {
    // ...твій код. Повертає об'єкт доданого контакту. 
    const contacts = await listContacts();
    const newContact = { // створюю новий обєкт контакту (...data спеціально якщо даних буде більше)
        id: nanoid(),
        ...data,
    };
    contacts.push(newContact);
    await updateContacts(contacts) // перезаписуємо файл 
    return newContact;
}