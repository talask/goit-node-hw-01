import { nanoid } from 'nanoid';
const fs = require('fs').promises;
const path = require('path');

const contactsPath = path.join(__dirname, 'db', 'contacts.json');



// TODO: задокументувати кожну функцію
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
  
  function removeContact(contactId) {
    fs.readFile(contactsPath)
  .then(
    data => {
      const contacts = JSON.parse(data);

      console.log("   Name".padEnd(20, ' '), "   Email".padEnd(50, ' '), "   Phone".padEnd(15, ' '));

      const findContact = contacts.find(({id}) =>  id === contactId );

      console.log(findContact ? `${findContact.name.padEnd(20, ' ')} ${findContact.email.padEnd(50, ' ')} ${findContact.phone.padEnd(15, ' ')}` : null);

      if (findContact) {

        const filterContact = contacts.find(({id}) =>  id !== contactId );

        fs.writeFile(contactsPath, JSON.stringify(filterContact))
        .then( data => {
          console.log("data");
          console.log(data);
        })
        .catch(err => console.log(err.message));

      }
      })
  .catch(err => console.log(err.message));
  }
  
  removeContact("rsKkOQUi80UsgVPCcLZZW1");

  function addContact(name, email, phone) {
    
    const newObj = {
      id: nanoid(),
      name,
      email,
      phone,
    };
    const jsonData = JSON.stringify(newObj);

    fs.appendFile(contactsPath, jsonData)
    .then( data => {
      console.log("data");
      console.log(data);
    })
    .catch(err => console.log(err.message));

  }

  addContact("Rose Rose", "roserose@ukr.net", "(678)657-67-95")