import mongoose from "mongoose";

const connectToDb = () => {
  mongoose.connect(process.env.MONGO_DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }, () => {
      console.log("connected to MongoDb");
    }
  );
};

export default connectToDb;
