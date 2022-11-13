import express from 'express';
import api from '../api';

export default async (app: express.Application) => {
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));

    app.use(api());

    return app;
}