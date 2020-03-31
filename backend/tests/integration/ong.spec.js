const request = require('supertest');
const app = require('../../src/app');
const connection = require('../../src/database/connection');

describe('ONG', () => {
    beforeEach(async () => {
        await connection.migrate.rollback();
        await connection.migrate.latest();
    });

    afterAll(async () => {
        await connection.destroy();
    })

    it('should be able to create a new ONG', async() => {
        const response = await request(app)
        .post('/ongs')
        // quando for chegar o header
        // .set('authorization', iddaong);
        .send({
            name: "VIVA BICHO12",
            email: "vivabicho2@hotmail.com",
            whatsapp: "4799889-9882",
            city: "Camboriú",
            uf: "SC"
        });

        // console.log(response.body)
        expect(response.body).toHaveProperty('id');
        expect(response.body.id).toHaveLength(8);
    })
})