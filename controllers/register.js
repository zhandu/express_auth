export default (req, res) => {
  const user = {
    firstName: undefined,
    lastName: undefined,
    email: undefined,
    password: undefined,
    passwordConfirm: undefined
  }
  res.render('auth/register', { title: 'Register', error: null, user });
};
