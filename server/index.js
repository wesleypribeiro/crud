const express = require('express');
const users = require('./controllers/users');
const cors = require('cors');


const app = express();
app.use(express.json())
app.use(cors())

app.get('/users', users.getAll);
app.post('/users', users.createUser);
app.delete('/users/:id', users.deleteUser);
app.put('/users/:id', users.editUser);
app.get('/users/sort', users.sortUser)

app.use((error, req, res, next) => {
    res.send(error);
})

const PORT = 3001;

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));