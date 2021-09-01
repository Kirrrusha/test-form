const request = require('supertest');
const app = require('./server');

describe('Api testing', () => {

    const res =  {
        nickname: 'nickname',
        name: 'Name',
        female: 'Female',
        phone: '89000000000',
        email: 'test@test.ru',
        sex: 'man',
        about: 'about',
        advantages: ['test1', 'test2'],
        radio: 2,
        checkbox: [4]
    };
    it('Send form', async () => {
        await request(app)
            .post('/api/form')
            .send(res)
            .expect(200)
            .then((res) => {
                expect(res.body).toEqual({result: 'ok'})
            })
    })
    it('error form without field', async () => {
        await request(app)
            .post('/api/form')
            .send({
                name: 'test',
                female: 'number',
                phone: 'email',
                about: 'about',
                advantages: ['test1', 'test2'],
                radio: 2,
                checkbox: [4]
            })
            .expect(400)
            .then((res) => {
                expect(res.body).toEqual({result: 'Неправильное количество полей'})
            })
    })
    it('error form with null', async () => {
        await request(app)
            .post('/api/form')
            .send({
                name: null,
                female: 'number',
                phone: 'phone',
                email: 'email',
                sex: 'email',
                about: 'about',
                advantages: ['test1', 'test2'],
                radio: 2,
                checkbox: [4],
                nickname: 'nickname'
            })
            .expect(400)
            .then((res) => {
                expect(res.body).toEqual({result: 'Ошибка в поле name'})
            })
    })
    it('error form with empty array', async () => {
        await request(app)
            .post('/api/form')
            .send({
                name: 'name',
                female: 'number',
                phone: 'phone',
                email: 'email',
                sex: 'email',
                about: 'about',
                advantages: [],
                radio: 2,
                checkbox: 4,
                nickname: 'nickname'
            })
            .expect(400)
            .then((res) => {
                expect(res.body).toEqual({result: 'Ошибка в поле advantages'})
            })
    })
    it('get data', async () => {
        await request(app)
            .get('/api/form/3')
            .expect(200)
            .then((res) => {
                expect(res.body).toEqual({
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
    })
})