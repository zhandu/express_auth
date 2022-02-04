export default (req, res) => {
    const user = {
        email: undefined,
        password: undefined
    }
    res.render('auth/login', {title: 'Login', error: null, user})
}
