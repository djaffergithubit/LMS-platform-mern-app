const User = require("../models/users")
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const registerController = async (req, res) => {
    try {
        const {username, email, password} = req.body
        const userExist = await User.findOne({email})

        if (userExist) {
            return res.status(409).json({ 'message': 'email is already in use' })
        }
        
        hashedPassword = await bcrypt.hash(password, 10)
        const newUser = new User({
            username,
            email,
            password: hashedPassword
        })

        await newUser.save()
        return res.status(200).json({ 'message': 'user registered successfully' })

    } catch (error) {
        return res.status(500).json({ 'message': error.message })
    }
}

const loginController = async (req, res) => {
    try {
        const { email, password } = req.body
        const userExist = await User.findOne({email})

        if (!userExist) {
            return res.status(404).json({ 'message': ' email or password incorrect' })
        }

        const passwordMatch = await bcrypt.compare(password, userExist.password)

        if (!passwordMatch) {
            return res.status(400).json({ 'message': 'password not match' })
        }

        const token = await jwt.sign({ userId: userExist._id, email: userExist.email }, process.env.SECRET_KEY, {expiresIn: '1h'})
        // res.cookies('token', token, {
        //     httpOnly: true,
        //     secure: true
        // })

        return res.status(200).json({ 'message': 'logged in successfully', 'token': token, 'username': userExist.username})

    } catch (error) {
        return res.status(500).json({'message': error.message})
    }
}

function generatePassword(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%&*!';
    let password = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        password += characters[randomIndex];
    }
    return password;
}

const google = async (req, res) => {
    try {
        const { name, email } = req.body        
        const userExist = await User.findOne({email})

        if(userExist){
            const token = jwt.sign({ userId: userExist._id, gmail: email }, process.env.SECRET_KEY)

            return res.status(200).json({ 'message': 'logged in successfully', token: token })
        }else{
            const generatedPassword  = generatePassword(6)
            const hashedPassword = bcrypt.hashSync(generatedPassword, 10)

            const newUser = new User({
                username: name,
                email,
                password: hashedPassword
            })

            await newUser.save()

            const token = jwt.sign({ userId: newUser._id, gmail:email }, process.env.SECRET_KEY)
            return res.status(200).json({ 'message': 'Logged in successfully', token: token })
        }

    } catch (error) {
        return res.status(500).json({ 'message': error.message })
    }
}

const getUserProfile = async(req, res) => {
    try {
        const { userId } = req.user
        const userExist = await User.findById(userId).select('-password')      

        if (!userExist) {
            return res.status(404).json({ 'message': 'User not found' })
        }

        return res.status(200).json(userExist)

    } catch (error) {
        return res.status(500).json({ 'message': error.message })
    }
}

module.exports = { registerController, loginController, google, getUserProfile }