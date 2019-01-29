const bcrypt = require('bcryptjs')

const hash = (password) => {
    return bcrypt.hash(password, 1)
}
const compare = (password, hash) => {
    return bcrypt.compare(password, hash)
}

module.exports = { hash, compare }