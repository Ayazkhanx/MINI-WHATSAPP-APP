const mongoose = require('mongoose');
const Chat = require('./models/chat.js');


main()
.then(() => {
    console.log("connection successful");
}).catch(err => console.log(err));
async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp')
};

let allChats = [
    {
    from: 'ayaz',
    to: 'ali',
    msg: 'hello',
    created_at: new Date()
   },
   {
    from: 'ali',
    to: 'ayaz',
    msg: 'hello2',
    created_at: new Date()
   },
   {
    from: 'ayaz',
    to: 'saad',
    msg: 'hello',
    created_at: new Date()
   },
   {
    from: 'saad',
    to: 'ayaz',
    msg: 'hello2',
    created_at: new Date()
   }
];

Chat.insertMany(allChats);