import User from '../models/User'
import {validationResult} from 'express-validator'
import bcrypt from 'bcryptjs'

export default async(req, res) => {
    const user = req.body
    const {errors} = validationResult(req)
    if (errors.length > 0) {
        res.render('auth/login', { title: 'Login',  error: errors[0], user })
    } else {
        const {email, password} = req.body

        const candidate = await User.findOne({email})
        if (!candidate) {
            res.render('auth/login', { title: 'Login', error: {param: 'User credentials', msg: "L'utilisateur n'existe pas ou le mot de passe est incorrect"}, user })
        } else {
            const areSame = await bcrypt.compare(password, candidate.password)

            if (areSame) {
                req.session.isAuthenticated = true
                req.session.save(err => {
                    if (err) {
                        throw err
                    } else {
                        res.redirect('/dashboard')
                    }
                })
            } else {
                res.render('auth/login', { title: 'Login', error: {param: 'User credentials', msg: "L'utilisateur n'existe pas ou le mot de passe est incorrect"}, user })
            }
        }
    }
};