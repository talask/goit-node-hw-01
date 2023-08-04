require('colors');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs').promises;
const path = require('path');
const HEAD_TABLE = `${"   Name".padEnd(20, ' ')}${"   Email".padEnd(50, ' ')}${"   Phone".padEnd(15, ' ')}\n`

const contactsPath = path.join(__dirname, 'db', 'contacts.json');

global.result = HEAD_TABLE;

// Функція зчитує дані файлу contacts.json і виводить їх у консоль
// Повертає масив об'єктів
async function listContacts() {
 
  const data = await fs.readFile(contactsPath);
  const contacts = JSON.parse(data);

  result += contacts.map(({name, email, phone}) => {
    return `${name.padEnd(20, ' ')}${email.padEnd(50, ' ')}${phone.padEnd(15, ' ')}\n`;  
      }).join("");

      console.log(result)

      return contacts;
  }
 
 
 // Функція здійснює пошук контакту за id в файлі contacts.json і виводить результат пошуку у консоль
 // Приймає id контакту, тип string
 // Повертає об'єкт знайденого контакту, або null

 async function getContactById(contactId) {
  try {
    console.log("get by id");
    const data = await fs.readFile(contactsPath);
    const contacts = JSON.parse(data);

    const findContact = contacts.find(({ id }) => id === contactId);

    result += findContact
      ? `${findContact.name.padEnd(20, ' ')} ${findContact.email.padEnd(50, ' ')} ${findContact.phone.padEnd(15, ' ')}`
      : null;

    console.log(result);
    return findContact ? findContact : null;
  } catch (err) {
    console.log(err.message);
    throw err; 
  }
}
    
  // Функція здійснює видалення контакту за id в файлі contacts.json і виводить результат видалення у консоль
  async function removeContact(contactId) {
    console.log("remove")
    const data = await fs.readFile(contactsPath);
    const contacts = JSON.parse(data);

    const findContact = contacts.find(({id}) =>  id === contactId );

    result += findContact ? `${findContact.name.padEnd(20, ' ')} ${findContact.email.padEnd(50, ' ')} ${findContact.phone.padEnd(15, ' ')}` : null;
      
    console.log(result)
     
    if (findContact) {

      const filterContact = contacts.filter(({id}) =>  id !== contactId );
      
      await fs.writeFile(contactsPath, JSON.stringify(filterContact))          
          console.log("The contact has been removed from the contact list".green);
          
      return findContact;

    }else {
        console.log("Contact not found to the contact list".red)
        return null;
      }

  }
 
  // Функція додає контакт за name, email, phone в файл contacts.json і виводить результат  у консоль
  async function addContact(name, email, phone) {
    console.log("add")
    const id =   uuidv4();

    const newObj = {
      id,
      name,
      email,
      phone,
    };
    

    const data = await fs.readFile(contactsPath);
    const contacts = JSON.parse(data);
      
    const findContact = contacts.find(contact =>  contact.name === name && contact.email === email && contact.phone === phone );

      result += `${name.padEnd(20, ' ')} ${email.padEnd(50, ' ')} ${phone.padEnd(15, ' ')}`;

      console.log(result)

      if(findContact) { 
        
        console.log("The contact is in the contact list".yellow);
        return;
      }

      contacts.push(newObj);
      await fs.writeFile(contactsPath, JSON.stringify(contacts))
        
      console.log("Contact added to the contact list".green);
     
      return newObj;
  }

  //addContact("Lulu Lulu", "luluLulu2@ukr.net", "(608)677-60-95")

  module.exports = {
    listContacts,
    getContactById,
    addContact,
    removeContact,
  };
  