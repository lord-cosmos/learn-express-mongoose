Name ; Dinesh Pandikona

# Setup

Run `npm install` to install all dependencies.

From `client/` also run `npm install` to install the React client's dependencies.

## Preparing the database

Follow the instructions in the official [MongoDB documentation](https://www.mongodb.com/docs/manual/administration/install-community/) to install the free community edition. On Windows, you should unselect the option “MongoDB as a Service” to complete the installation. After you install it, follow the instructions to **start MongoDB as a background service**. When you install MongoDB, the Mongo Shell (mongosh) should also have been installed. If it wasn’t then follow the instructions [here](https://www.mongodb.com/docs/mongodb-shell/install/#std-label-mdb-shell-install). The Mongo Shell provides a command line interface that is used to interact with the databases in MongoDB. If mongosh is successfully installed then the command `mongosh` should connect to the local instamonce MongoDB on your machine and open an interpreter where we can type commands to interact with MongoDB. Try the command `show dbs` and you should see a list of existing databases in your local instance. Note that by default, the MongoDB service will run on 127.0.0.1 (localhost), port 27017. It is recommended that you do not change these settings convenience.

## Verifying Mongoose Schema and Test Data

First we need to define schemas for collections in our database. We will do this in class. Once the schemas have been defined, we can populate the collections with test data with the following command:

`$ node insert_sample_data.js "mongodb://127.0.0.1:27017/my_library_db"`

At any point, we can delete all data in the database and start afresh by using the following command:

`$ node remove_db.js "mongodb://127.0.0.1:27017/my_library_db"`.

# References

1. https://mongoosejs.com/docs/index.html
2. https://mongoosejs.com/docs/guides.html
3. https://www.mongodb.com/basics
