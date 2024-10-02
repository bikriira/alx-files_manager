import express from 'express';

/**
 * Attaches middlewares to the provided express application.
 * @param {express.Express} api The express application instance.
 */
const injectMiddlewares = (api) => {
  api.use(express.json({ limit: '200mb' }));
};

export default injectMiddlewares;
