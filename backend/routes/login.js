router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    console.log('Request Body:', req.body); // Debugging

    try {
        // Find user in the database
        const user = await User.findOne({
            username: { $regex: new RegExp(`^${username}$`, 'i') }, // Case-insensitive
            password
        });

        console.log('User Found:', user); // Debugging

        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Generate JWT
        const token = jwt.sign({ username: user.username }, SECRET_KEY, { expiresIn: '1h' });

        res.json({ token });
    } catch (err) {
        console.error('Error:', err.message);
        res.status(500).json({ error: err.message });
    }
});

