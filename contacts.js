//const { nanoid } = require('nanoid');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs').promises;
const path = require('path');

const contactsPath = path.join(__dirname, 'db', 'contacts.json');



// Функція зчитує дані файлу contacts.json і виводить їх у консоль
function listContacts() {
    fs.readFile(contactsPath)
    .then(
      data => {
        const contacts = JSON.parse(data);

        console.log("   Name".padEnd(20, ' '), "   Email".padEnd(50, ' '), "   Phone".padEnd(15, ' '));

        contacts.forEach(({name, email, phone}) => {
          console.log(name.padEnd(20, ' '), email.padEnd(50, ' ') , phone.padEnd(15, ' ') );  
      });
    })
  .catch(err => console.log(err.message));
  }
 // listContacts();
 
 // Функція здійснює пошук контакту за id в файлі contacts.json і виводить результат пошуку у консоль
  function getContactById(contactId) {
    fs.readFile(contactsPath)
  .then(
    data => {
      const contacts = JSON.parse(data);

      console.log("   Name".padEnd(20, ' '), "   Email".padEnd(50, ' '), "   Phone".padEnd(15, ' '));

      const findContact = contacts.find(({id}) =>  id === contactId );
      console.log(findContact ? `${findContact.name.padEnd(20, ' ')} ${findContact.email.padEnd(50, ' ')} ${findContact.phone.padEnd(15, ' ')}` : null);
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

      console.log("   Name".padEnd(20, ' '), "   Email".padEnd(50, ' '), "   Phone".padEnd(15, ' '));

      const findContact = contacts.find(({id}) =>  id === contactId );

      console.log(findContact ? `${findContact.name.padEnd(20, ' ')} ${findContact.email.padEnd(50, ' ')} ${findContact.phone.padEnd(15, ' ')}` : null);
      

      if (findContact) {

        const filterContact = contacts.filter(({id}) =>  id !== contactId );
      
        fs.writeFile(contactsPath, JSON.stringify(filterContact))
        .then( data => {
          
          console.log("The contact has been removed from the contact list");
        })
        .catch(err => console.log(err.message));

      }else {
        console.log("Contact not found to the contact list")
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


      console.log("   Name".padEnd(20, ' '), "   Email".padEnd(50, ' '), "   Phone".padEnd(15, ' '));
        console.log( `${name.padEnd(20, ' ')} ${email.padEnd(50, ' ')} ${phone.padEnd(15, ' ')}` );


      if(findContact) { 
        
        console.log("The contact is in the contact list");
        return;
      }

      contacts.push(newObj);
      fs.writeFile(contactsPath, JSON.stringify(contacts))
        .then( data => {
          
          console.log("Contact added to the contact list");
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
  