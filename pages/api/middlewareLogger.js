export class MiddlewareLogger {
  constructor() {
    this.date = new Date();
  }

  info(msg) {
    const timestamp = this.date.toLocaleString();
    console.info(`${timestamp} [Middleware] info: ${msg}`);
  }

  error(msg) {
    const timestamp = this.date.toLocaleString();
    console.error(`${timestamp} [Middleware] error: ${msg}`);
  }
}
