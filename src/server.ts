import mongoose from 'mongoose';
import app from './app';
import config from './app/config';

async function main() {
  try {
    await mongoose.connect(config.database_url as string);
    app.listen(config.port, () => {
      console.log(`App is listening on Port ${config.port}`);
    });
  } catch (err) {
    console.error('Failed to connect to the database:', err);
  }
}

main();
