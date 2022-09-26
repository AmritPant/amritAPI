const path = require('path');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config({ path: path.join(__dirname, 'config.env') });

const app = require('./app');

const connectDatabase = function () {
  const { DATABASE_URI } = process.env;
  const DATABASE_STRING = DATABASE_URI.replace(
    '<PASSWORD>',
    process.env.DATABASE_PASSWORD
  );
  mongoose.connect(DATABASE_STRING).then(e => {
    console.log(`Database has been connected Sucessfully ${e}`);
  });
};

connectDatabase();

app.listen(process.env.PORT, () => {
  console.log(
    `Server has been successfully listening on the PORT ${process.env.PORT}`
  );
});
