const db = require("../db")

const Course = db.model("Course", {
    courseTitle: {type: String, required: true},
    courseDept: {type: String, required: true},
    courseDesc: {String},
    startDate: {type: Date, default:Date.now}
})

module.exports = Course