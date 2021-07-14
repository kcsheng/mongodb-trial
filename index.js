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
  const pageNumber = 2;
  const pageSize = 10;
  // /api/courses?pageNumber=2&pageSize=10
  const courses = await Course.find({
    author: "Mosh",
    isPublished: true,
  })
    .skip((pageNumber - 1) * pageSize) // We need to skip all the documents in the previous page
    .limit(pageSize) // skip method goes hand in hand with limit for pagination
    .sort({ name: 1 })
    .select({ name: 1, tags: 1 });
  console.log(courses);
}

async function updateCourse(id) {
  // approach one:
  // query first - then findById, then modify properties, save
  const course = await Course.findById(id);
  if (!course) return;
  // course.isPublished = true;
  // course.author = "Another Author";
  course.set({
    isPublished: true,
    author: "Another Author",
  });
  const result = await course.save();
  console.log(result);
  // approach two:
  // update first - instead of retrieving the document, update directly in the db
  // optionally - get the document
}
updateCourse("60da6cead2b0a97911c67d81");
