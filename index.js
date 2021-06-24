const mongoose = require("mongoose");
mongoose
  .connect("mongodb://localhost/playground", {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => console.log("Connected to MongoDB..."))
  .catch((error) => console.error("Could not connect to MongoDB...", error));

const courseSchema = new mongoose.Schema({
  name: String,
  author: String,
  tags: [String],
  date: { type: Date, default: Date.now },
  isPublished: Boolean,
});

async function createCourse() {
  const Course = mongoose.model("Course", courseSchema); // Course blueprint - model(class)
  const course = new Course({
    // A course instance is a document in the db.
    name: "Angular Course",
    author: "Mosh",
    tags: ["angular", "frontend"],
  });

  const result = await course.save(); // This method returns a promise.
  console.log(result);
}
createCourse();
