# Airport Geo Search with Typesense + Next.js

This demo showcases Typesense's Geo Search features in a Next.js project.

## Pre-requisistes

1. Node.js 20.x and npm
2. Typesense server
3. sqlite3

## Local Setup

1. Clone the project.
2. Install dependencies at the root of the project using npm
   ```bash
   npm install
   ```
3. Copy `.env.example` file and create a `.env` file at the root of the project.
4. Set the values of required environment variables in the `.env` file that was created.
5. Download the airports dataset from [https://ourairports.com/data/](https://ourairports.com/data/) in CSV format.
   Following CSV files are required:
   - airports.csv
   - runways.csv
   - countries.csv
   - regions.csv
     All of these files must be placed under `dataset/source` directory.
6. Seed the Typesense database with the airports data by running the following command at the root of the project.
   ```bash
   npm run data:seed
   ```
   This command may take a while depending on the size of the data.
7. Once the Typesense database has been seeded, Next.js application can be started.
   - For production:
     ```bash
     npm run build
     npm start
     ```
   - For development:
     ```bash
     npm run dev
     ```
8. Access the application at `localhost:3000`

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Typesense](https://typesense.org) - learn about Typesense.
- [Next.js](https://nextjs.org/docs) - learn about Next.js.
