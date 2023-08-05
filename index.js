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


async function invokeAction({ action, id, name, email, phone }) {
  console.log("action: ", action)
  switch (action) {
    
    case 'list':
    
      try {
        const contacts = await contactsModule.listContacts();
        console.log('\n Result: ', contacts);
      } catch (error) {
        console.error(error.message);
      }
    
       break;


    case 'get':

      try {
        const contact = await contactsModule.getContactById(id);
        console.log('\n Result: ', contact);
      } catch (error) {
        console.error(error.message);
      }

      break;


    case 'add':
      try {
        const contact = await contactsModule.addContact(name, email, phone)
        console.log('\n Result: ', contact);
      } catch (error) {
        console.error(error.message);
      }

         break;

    case 'remove':

      try{
        const contact = await contactsModule.removeContact(id)
        console.log('\n Result: ', contact);
      } catch (error) {
        console.error(error.message);
      }

      break;

    default:
      console.warn('\x1B[31m Unknown action type!');
  }
}

invokeAction(argv);

