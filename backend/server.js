const express = require('express')
const jwt=require('jsonwebtoken')

const app = express()
const PORT = 1488;

app.use(express.json())

const JWT_TOKEN = 'gachimuchibillyherringtonmarkwolfdeagleneregaetarystananpatshasy'

const users = [{
    id: 1,
    username: "NurBruh",
    password: "QZ1488",
}]

app.post('/api/signup', async (req, res) => {
    try{
        const { username, password } = req.body;
        if(users.find(u => u.username === username)) {
            return res.status(409).json({ message: 'User uzhe est nashalnika' });
        }
        const newUser={
            id:users.length+1,
            username:username,
            password:password
        };

        users.push(newUser)
        res.status(201).json({
             message: 'User uspeshno sozdan',
             user: { id: newUser.id, username: newUser.username } 
            });
    }catch(error){
        console.error('E vasya oshipka:', error);
    }

})

app.post('/api/login', (req, res) => {
    const { username, password } = req.body;

    const user = users.find(u => u.username === username && u.password === password);

    if(!user) {
        return res.status(401).json({ message: 'DEBIL!!!' });
    }

    const token = jwt.sign({
        id: user.id, username: user.username
    }, JWT_TOKEN,{ 
        expiresIn: '30m' }
    );
    res.json({
        message: 'Successfully',
        token:token
    });
})

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})