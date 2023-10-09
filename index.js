// ------------------Робимо термінал------------------------------
//                      Варіант №1
// const argv = require('yargs').argv; // імпортується пакет yargs для зручного парсу аргументів командного рядка.
// const actionIndex = process.argv.indexOf("--action"); // знаходимо індекс "--action" в команді терміналу
// if(actionIndex !== -1) { // тобто якщо значення не мінусове значить є і у нас вже є індекс ключа в терміналі "--action", тому все що пісял його індексу (це +1 до індексу) є та сама дія що пише людина. Таким чином можемо дізнатися що виконувати
//    const action = process.argv [actionIndex + 1];
//    invokeAction({action});
//}
//
//                      Варіант №2 Я ВИКОРИСТАВ ПОКИ ЩО САМЕ ЙОГО
// Можливо зробити зручно. Зробити так щоби те що писалося через два дефізи "--" було ключом, а все що після значенням дії
// встановлюємо 2 пакети. 1-й що дає зробить консольний додаток (тобто перетворити масив в об'єкт) називається yargs. npm install yargs
import yargs from "yargs"; // імпортуємо
//       потім в самому низу дописуємо
// const {argv} = yargs(process.argv.slice(2)); // .slice(2) це ми убираємо лишнє
// invokeAction(argv);
//
//                      Пакет № 2 (commander) складніший в налаштувані, але дає більше можливостей
//npm install commander
// import { program } from "commander";
//       потім в самому низу дописуємо
// program
//  .option("-a, --action <type>");
//  .option("-i, --contactId <type>");
//  .option("-n, --name <type>");
//  .option("-e, --email <type>");
//  .option("-p, --phone <type>");
//
// program.parse(process.argv); // передаємо масив в process.argv щоби він його розпарсив і перетворив в об'єкт
//
// const options = program.opts(); // щоби отримає об'єкт, який він перетвортив
// console.log(options);
// invokeAction(options); // викликаємо щоби працювало
//________________________________________________________________

import * as contacts from "./contacts.js"

async function invokeAction({action, contactId, name, email, phone}) {
    switch (action) {
        case "list":
            const allContacts = await contacts.listContacts();
            return console.table(allContacts);
        case "getById":
            const oneContact = await contacts.getContactById(contactId);
            return console.table(oneContact);
        case "add":
            const newContact = await contacts.addContact({ name, email, phone })
            return console.table(newContact);
        case "deleteById":
            const deleteContact = await contacts.removeContact(contactId);
            return console.table(deleteContact);
        default:
      console.warn('\x1B[31m Unknown action type!');
    }
}

// invokeAction({ action: "list" }); // працює
// invokeAction({action: "getById", contactId: "05olLMgyVQdWRwgKfg5J6"}); // працює
// invokeAction({ action: "add", name: "Mango", email: "mango@gmail.com", phone: "322-22-22" }); // працює
// invokeAction({action: "deleteById", contactId: "qdggE76Jtbfd9eWJHrssH"}); // працює
const {argv} = yargs(process.argv.slice(2)); // .slice(2) це убираємо лишнє
invokeAction(argv);