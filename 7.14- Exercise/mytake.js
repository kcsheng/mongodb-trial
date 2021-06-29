const mongoose = require("mongoose");
mongoose
  .connect("mongodb://localhost/mongo-exercises", {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => console.log("Connected to mongoDB..."))
  .catch((err) => {
    console.error("Could not connect to MongoDB...", err);
  });

const courseSchema = new mongoose.Schema({
  name: String,
  author: String,
  tags: [String],
  date: { type: Date, default: Date.now },
  isPublished: Boolean,
  price: Number,
});

const Course = mongoose.model("Course", courseSchema);
async function createCourse() {
  const course = new Course({
    name: "Some Course",
    author: "Someone",
    tags: ["a", "b"],
    isPublushed: true,
    price: 10,
  });
  const result = course.save();
  console.log(result);
}

async function getCourses() {
  return (courses = await Course.find({ isPublished: true, tags: "backend" })
    .sort({ name: 1 })
    .select({ name: 1, author: 1 }));
}

async function run() {
  const courses = await getCourses();
  console.log(courses);
}

run();
