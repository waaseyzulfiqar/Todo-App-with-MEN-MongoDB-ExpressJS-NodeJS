import mongoose from "mongoose";

const URI = `mongodb+srv://waasey:waasey123@user-manager.rxyr7.mongodb.net/?retryWrites=true&w=majority&appName=User-Manager`;

export const dbConnection = async () => {
  try {
    await mongoose.connect(URI);
    console.log("DB Connected Successfully!😊");
  } catch (error) {
    console.log(error.message);
  }
};
