const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const Chat = require('./models/chat.js');
const methodOverride = require('method-override')

// set 
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended : true}));
app.use(express.json());
app.use(methodOverride('_method'));


let port = 8080;

// connection ban rha function call kr k
main()
.then(() => {
    console.log("connection successful");
}).catch(err => console.log(err));
async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp')
};

app.listen(port, () => {
    console.log('request recieved every thing is okay');
});


// Index Route
app.get('/chats', async (req, res) => {
    let chats = await Chat.find();
    console.log(chats);
    res.render('index.ejs', {chats})
});

// Delete Route
app.delete("/chats/:id", async(req, res) => {
    const id = req.params.id;
    try {
    let deletedChat = await Chat.findByIdAndDelete(id);
    if (deletedChat) {
        res.redirect("/chats"); // Redirect if deletion was successful
    } else {
        res.status(404).send("Chat not found"); // Handle case where chat was not found
    }
 } catch (err) {
    res.status(500).send("Server error"); // Handle server errors
}
});


// New chat Route
app.get('/chats/new', (req, res) => {
    res.render('new.ejs')
});

// Edit Route 
app.get("/chats/:id/edits", async (req,res) => {
    const {id} = req.params;
    const chat = await Chat.findById(id);
    res.render("edit.ejs", {chat})
});

// Update Route 
app.put("/chats/:id", async (req, res) => {
    const {id} = req.params;
    const {msg: newMsg} = req.body;
    let updatedChat = await Chat.findByIdAndUpdate(id, {msg: newMsg}, { new: true, runValidators: true})
    res.redirect("/chats")
});

app.post('/chats', (req,res) => {
    const {from, to, msg} = req.body;
    const newChat = new Chat({
        from: from,
        to: to,
        msg: msg,
        created_at: new Date()
});

newChat.save()
.then((res) => {
    console.log(res)
}).catch((err) => {
    console.log(err);
});
res.redirect('/chats');
});
