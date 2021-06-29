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
const Course = mongoose.model("Course", courseSchema); // Course blueprint - model(class)
async function createCourse() {
  const course = new Course({
    // A course instance is a document in the db.
    name: "Angular Course",
    author: "Mosh",
    tags: ["Angular", "frontend"],
    isPublished: true,
  });

  const result = await course.save(); // This method returns a promise.
  console.log(result);
}
async function getCourses() {
  // or
  // and
  const courses = await Course
    // .find({
    //   author: "Mosh",
    //   isPublished: true,
    // })
    // Regular expression
    .find({ author: /^KC/i }) //starts with KC
    .find({ author: /Sheng$/i }) // ends with Sheng
    .find({ author: /.*KC.*/ }) // contains the word KC
    .limit(10)
    .sort({ name: 1 })
    .select({ name: 1, tags: 1 })
    .and([{}]);
  console.log(courses);
}
getCourses();
