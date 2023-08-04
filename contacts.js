require('colors');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs').promises;
const path = require('path');
const HEAD_TABLE = `${"   Name".padEnd(20, ' ')}${"   Email".padEnd(50, ' ')}${"   Phone".padEnd(15, ' ')}\n`

const contactsPath = path.join(__dirname, 'db', 'contacts.json');

global.result = HEAD_TABLE;

// Функція зчитує дані файлу contacts.json і виводить їх у консоль
function listContacts() {
 
  fs.readFile(contactsPath)
    .then(
      data => {
        const contacts = JSON.parse(data);

        result += contacts.map(({name, email, phone}) => {
          return `${name.padEnd(20, ' ')}${email.padEnd(50, ' ')}${phone.padEnd(15, ' ')}\n`;  
      }).join("");
      console.log(result)
      
    })
  .catch(err => console.log(err.message.red));
  }
 // listContacts();
 
 // Функція здійснює пошук контакту за id в файлі contacts.json і виводить результат пошуку у консоль
  function getContactById(contactId) {
    console.log("get by id")
    fs.readFile(contactsPath)
  .then(
    data => {
      const contacts = JSON.parse(data);
     
      const findContact = contacts.find(({id}) =>  id === contactId );
      //console.log(findContact)
      result += findContact ? `${findContact.name.padEnd(20, ' ')} ${findContact.email.padEnd(50, ' ')} ${findContact.phone.padEnd(15, ' ')}` : null;

      console.log(result)
    }
    )
  .catch(err => console.log(err.message));
  }
  //getContactById("rsKkOQUi80UsgVPCcLZZW");
  
  // Функція здійснює видалення контакту за id в файлі contacts.json і виводить результат видалення у консоль
  function removeContact(contactId) {
    console.log("remove")
    fs.readFile(contactsPath)
  .then(
    data => {
      const contacts = JSON.parse(data);

      const findContact = contacts.find(({id}) =>  id === contactId );

      result += findContact ? `${findContact.name.padEnd(20, ' ')} ${findContact.email.padEnd(50, ' ')} ${findContact.phone.padEnd(15, ' ')}` : null;
      
      console.log(result)

      if (findContact) {

        const filterContact = contacts.filter(({id}) =>  id !== contactId );
      
        fs.writeFile(contactsPath, JSON.stringify(filterContact))
        .then( data => {
          
          console.log("The contact has been removed from the contact list".green);
        })
        .catch(err => console.log(err.message));

      }else {
        console.log("Contact not found to the contact list".red)
      }

      })
  .catch(err => console.log(err.message));
  }
  
 //removeContact("3f9abc10-c572-47b4-8f81-7d20b0badc13");

  // Функція додає контакт за name, email, phone в файл contacts.json і виводить результат  у консоль
  function addContact(name, email, phone) {
    console.log("add")
    const id =   uuidv4();

    const newObj = {
      id,
      name,
      email,
      phone,
    };
    

    fs.readFile(contactsPath)
    .then( data => {
      const contacts = JSON.parse(data);
      
      const findContact = contacts.find(contact =>  contact.name === name && contact.email === email && contact.phone === phone );

      result += `${name.padEnd(20, ' ')} ${email.padEnd(50, ' ')} ${phone.padEnd(15, ' ')}`;

      console.log(result)

      if(findContact) { 
        
        console.log("The contact is in the contact list".red);
        return;
      }

      contacts.push(newObj);
      fs.writeFile(contactsPath, JSON.stringify(contacts))
        .then( data => {
          
          console.log("Contact added to the contact list".green);
        })
        .catch(err => console.log(err.message));
      
    })
    .catch(err => console.log(err.message));

  }

  //addContact("Lulu Lulu", "luluLulu2@ukr.net", "(608)677-60-95")

  module.exports = {
    listContacts,
    getContactById,
    addContact,
    removeContact,
  };
  