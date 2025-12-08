const express = require('express');
const jwt = require('jsonwebtoken');
const cors = require('cors');

const app = express();
const PORT = 1488;

app.use(cors());
app.use(express.json());

const JWT_TOKEN = 'gachimuchibillyherringtonmarkwolfdeagleneregaetarystananpatshasy';

const users = [];


app.post('/api/register', (req, res) => {
    try {
        console.log('Register request:', req.body);
        
        if (!req.body || !req.body.email || !req.body.password || !req.body.username) {
            return res.status(400).json({ message: 'Email, парол и username обязательны' });
        }
        const { email, password, username } = req.body;
        if (users.find(u => u.email === email)) {
            return res.status(409).json({ message: 'User uzhe est nashalnika' });
        }
        const newUser = {
            id: users.length + 1,
            email: email,
            password: password,
            username: username
        };
        users.push(newUser);
        
        const token = jwt.sign(
            { id: newUser.id, username: newUser.username, email: newUser.email },
            JWT_TOKEN,
            { expiresIn: '30m' }
        );
        res.status(201).json({
            message: 'User uspeshno sozdan',
            token: token,
            data: {
                id: newUser.id,
                username: newUser.username,
                email: newUser.email
            }
        });
    } catch (error) {
        console.error('E vasya oshipka:', error);
        res.status(500).json({ message: 'Server error: ' + error.message });
    }
});


app.post('/api/auth', (req, res) => {
    try {
        console.log('Login request:', req.body);
        
        if (!req.body || !req.body.email || !req.body.password) {
            return res.status(400).json({ message: 'Email и пароль обязательны' });
        }

        const { email, password } = req.body;

        
        const user = users.find(u => u.email === email && u.password === password);

        if (!user) {
            console.log('Login failed for:', email);
            return res.status(401).json({ message: 'DEBIL!!! Неправильный email или пароль' });
        }

        console.log('User logged in:', { id: user.id, email: user.email });

        
        const token = jwt.sign(
            { id: user.id, username: user.username, email: user.email },
            JWT_TOKEN,
            { expiresIn: '30m' }
        );

        res.json({
            message: 'Successfully',
            token: token,
            data: {
                id: user.id,
                username: user.username,
                email: user.email
            }
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Server error: ' + error.message });
    }
});



app.listen(PORT, () => {
    console.log(`Server http://localhost:${PORT}`);


});