import { Application } from 'express';
import request from "supertest";
import { newDb } from 'pg-mem';
import { Connection } from 'typeorm';
import { Server } from '../../../../server';
// import routerBooks from '../../../../routes/v1/books.route';
import { Book } from "../../../../models/book.entity";


let express: Application = new Server().express;
let connection: Connection;


beforeAll(async() => {
    connection = await newDb().adapters.createTypeormConnection({
        type: 'postgres',
        entities: [Book],
        synchronize: true
    })
});

afterAll(() => {
    connection.close();
});


describe('/api/v1/books', () => {

    describe('POST', () => {

        test('should respond with 200 status code if name, price & summary are correctly given', async () => {

            const response = await request(express).post('/api/v1/books').send({ name: 'The Diary Of a Young Girl', price: 666, summary: 'summary1' });

            console.log(response.body);

            expect(response.statusCode).toBe(200);
            expect(response.headers['content-type']).toEqual(expect.stringContaining('json'));
            expect(response.body.name).toBeDefined();
            expect(response.body.name).toBe('The Diary Of a Young Girl');
            expect(response.body.summary).toBeDefined();
            expect(response.body.summary).toBe('summary1');
        });

        test('should respond with 400 status code if invalid data is given', async () => {

            const response = await request(express).post('/api/v1/books').send({ name: 'The Diary Of a Young Girl', price2: 666, summary: 'summary1' });

            expect(response.statusCode).toBe(400);
        });

    });

    describe('GET', () => {

        test('should respond with 200 status code if name, price & summary are correctly fetched', async () => {

            const response = await request(express).get('/api/v1/books').send();
            console.log(response.body);
            expect(response.statusCode).toBe(200);
            expect(response.headers['content-type']).toEqual(expect.stringContaining('json'));
            
        });

        test('should respond with 200 status code if name, price & summary are correctly fetched with id', async () => {

            const response = await request(express).get('/api/v1/books').send();

            expect(response.statusCode).toBe(200);
            expect(response.headers['content-type']).toEqual(expect.stringContaining('json'));
        });
    });

    describe('PATCH', () => {

        test('should respond with 404 status code if id not given', async () => {

            const response = await request(express).patch('/api/v1/books').send({ name: 'The world as I see it', price: 799, summary: 'summary...' });

            expect(response.statusCode).toBe(404);
        });

        test('should respond with 200 status code if name & price updated', async () => {

            const response = await request(express).patch('/api/v1/books/1').send({ name: 'Fear not be strong', price: 899, summary: 'summary...' });
            console.log(response.body);
            expect(response.statusCode).toBe(200);
            expect(response.body.price).toBeDefined();
        });

        test('should respond with 200 status code if name is updated', async () => {

            const response = await request(express).patch('/api/v1/books/1').send({ name: 'Wings of Fire' });

            expect(response.statusCode).toBe(200);
            expect(response.body.name).toBeDefined();
        });

        test('should respond with 200 status code if price is updated', async () => {

            const response = await request(express).patch('/api/v1/books/1').send({ price: 1500 });

            expect(response.statusCode).toBe(200);
            expect(response.body.price).toBeDefined();
        });
    });

    describe('DELETE', () => {

        test('should respond with 404 status code if id not given', async () => {

            const response = await request(express).delete('/api/v1/books').send();
            console.log(response.body);
            expect(response.statusCode).toBe(404);
        });

        test('should respond with 200 status code if book with id:1 is deleted', async () => {

            const response = await request(express).delete('/api/v1/books/1').send();
            console.log(response.body);
            expect(response.statusCode).toBe(200);
        });
    });

});
