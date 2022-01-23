const { Client } = require("pg");
const { loggerConstructor } = require("./logger");
const logger = loggerConstructor("database");

class Database {
  constructor() {
    if (process.env.NODE_ENV == "production") {
    // if ("production") {
      this.dbInstance = process.env.DB_PROD_URI;
      this.sslConfig = {
        ssl: {
          rejectUnauthorized: false,
        },
      };
    } else {
      this.dbInstance = process.env.DB_DEV_URI;
      this.sslConfig = {};
    }

    this.client = new Client({
      connectionString: this.dbInstance,
      ...this.sslConfig,
    });

    this.connect()

    this.client.on('connect', () => {
        logger.info(`Connected to Database in ${process.env.NODE_ENV} env`);
    })

    this.client.on('end', () => {
        logger.info(`Database connection is closed`);
    })
  }

  async connect() {
    await this.client.connect();
  }

  async query(st) {
    try {
      const result = await this.client.query(st);
      logger.info(`Query successful: '${st}'`);
      const rows = result.rows;
      return rows.length == 1 ? rows[0] : rows;
    } catch (error) {
      logger.error(`Query failed because ${error}`)  
      logger.error(`Query: '${st}'`);
    }
  }

  async close() {
    await this.client.end();
  }
}

const dbInstance = new Database();

export const db = dbInstance
