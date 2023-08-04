const contactsModule = require('./contacts');

const { Command } = require('commander');
const program = new Command();
program
  .option('-a, --action <type>', 'choose action')
  .option('-i, --id <type>', 'user id')
  .option('-n, --name <type>', 'user name')
  .option('-e, --email <type>', 'user email')
  .option('-p, --phone <type>', 'user phone');

program.parse(process.argv);

const argv = program.opts();

// TODO: рефакторити
 function invokeAction({ action, id, name, email, phone }) {
  console.log("action: ", action)
  switch (action) {
    case 'list':
      contactsModule.listContacts();
       break;

    case 'get':
      contactsModule.getContactById(id)
      break;

    case 'add':
        contactsModule.addContact(name, email, phone)
         break;

    case 'remove':
      contactsModule.removeContact(id)
      break;

    default:
      console.warn('\x1B[31m Unknown action type!');
  }
}

//invokeAction({ action: 'list' });
invokeAction({ action: 'get', id: argv.id});

//  invokeAction({ 
//   action: 'add', 
//   name: argv.name,  
//   email: argv.email,
//   phone: argv.phone,
// });

//invokeAction({ action: 'remove', id: argv.id });
