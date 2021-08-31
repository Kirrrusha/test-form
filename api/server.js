const express = require('express')
const fileUpload = require('express-fileupload')
const bodyParser = require('body-parser')

const server = express()

server.use(bodyParser.urlencoded({ extended: true }))
server.use(bodyParser.json());
server.use(bodyParser.raw());

server.use(fileUpload({
    createParentPath: true
}))

const fields = ['name', 'female', 'phone', 'sex', 'about', 'advantages', 'radio', 'checkbox', 'nickname']

server.post(`/api/form`, (req, res) => {
    if (req.files && !req.files.image) {
        res.statusCode = 400
        return res.json({result: 'Загрузите файлы'})
    }
    const {body} = req
    if (!fields.every(field => Object.keys(body).includes(field))) {
        return res.json({result: 'Неправильное количество полей'})
    }
    for (let key in body) {
        const option = !fields.includes(key) || (key === 'advantages' || key === 'checkbox' ? !body[key] && !body[key].length : !body[key])
        if (option) {
            return res.json({result: `Ошибка в поле ${key}`})
        }
    }
    res.json({result: 'ok'})
});

server.get('/api/form/:id', (req, res) => {
    return res.json({
        nickname: 'developer',
        name: 'Name',
        female: 'Female',
        phone: '89000000000',
        email: 'test@test.ru',
        sex: 'man',
        about: 'about',
        advantages: ['test1', 'test2'],
        radio: 2,
        checkbox: [4, 10, 2]
    })
})


server.listen(3030, function () {
    console.log("JSON Server is running");
});

module.exports = server
