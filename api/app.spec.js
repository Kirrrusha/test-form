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
        checkbox: 4
    };
    it('Send form', (done) => {
        request(app)
            .post('/api/form')
            .send(res)
            .expect(200)
            .end((err, res) => {
                expect(res.body).toEqual({result: 'ok'})
                done();
            })
    })
    it('error form', (done) => {
        request(app)
            .post('/api/form')
            .send({
                name: 'test',
                female: 'number',
                phone: 'email',
                about: 'about',
                advantages: ['test1', 'test2'],
                radio: 2,
                checkbox: 4
            })
            .expect(200)
            .end((err, res) => {
                expect(res.body).toEqual({result: 'Ошибка в поле sex'})
                done();
            })
    })
})