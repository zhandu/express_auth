import User from '../models/User'
import {validationResult} from 'express-validator'
import bcrypt from 'bcryptjs'

export default async(req, res) => {
    const user = req.body
    const {errors} = validationResult(req)
    if (errors.length > 0) {
        res.render('auth/register', { title: 'Register', error: errors[0], user })
    } else {
        const {firstName, lastName, email, password} = req.body

        const candidate = await User.findOne({email})
        if (candidate) {
            res.render('auth/register', { title: 'Register', error: {param: 'Already exists', msg: 'This user already exists'}, user })
        } else {
            const hashPassword = await bcrypt.hash(password, 10)
            const newUser = new User({
                firstName,
                lastName,
                email,
                password: hashPassword,
            })
            await newUser.save()
            res.redirect('login')
        }
    }
};