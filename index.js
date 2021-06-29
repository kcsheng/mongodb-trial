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
  // eq (equal)
  // ne (not equal to)
  // gt (greater than)
  // gte (greater than or equal to)
  // lt (less than)
  // lte (less than or equal to)
  // in
  // nin (not in)
  const courses = await Course
    // .find({
    //   author: "Mosh",
    //   isPublished: true,
    // })
    // .find({ price: { $gte: 10, $lte: 20 } })
    .find({ price: { $in: [10, 20, 30] } })
    .limit(10)
    .sort({ name: 1 })
    .select({ name: 1, tags: 1 });
  // Property to be returned
  console.log(courses);
}
getCourses();
