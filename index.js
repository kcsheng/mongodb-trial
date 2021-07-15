const mongoose = require("mongoose");
mongoose
  .connect("mongodb://localhost/playground", {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => console.log("Connected to MongoDB..."))
  .catch((error) => console.error("Could not connect to MongoDB...", error));

const courseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
    // match: /pattern/
  },
  category: {
    type: String,
    enum: ["web", "mobile", "network"], //enum validator
    required: true,
  },
  author: String,
  tags: {
    type: Array,
    // custom validator
    validate: {
      validator: function (value) {
        return value && value.length > 0;
      },
      message: "A course should at least have one tag.", // empty or null or absent tag
    },
  },
  date: { type: Date, default: Date.now },
  isPublished: Boolean,
  price: {
    type: Number,
    required: function () {
      return this.isPublished;
    },
    min: 10,
    max: 200,
  },
});
const Course = mongoose.model("Course", courseSchema);
async function createCourse() {
  const course = new Course({
    name: "Angular Course",
    category: "web",
    author: "Mosh",
    tags: null,
    isPublished: true,
    price: 15,
  });
  try {
    // Use try and catch block to catch any validation errors
    const result = await course.save();
    console.log(result);
  } catch (ex) {
    console.log(ex.message);
  }
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

createCourse();
