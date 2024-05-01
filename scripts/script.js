addEventListener("DOMContentLoaded", async function() {
    const response = await fetch("http://localhost:3000/api/courses")
    const courses = await response.json()

    let html = ""
    for (let course of courses){
        let courseID = course._id
        html +=`<li>${course.courseTitle} - ${course.courseDept} - <a href="details.html?id=${courseID}">Details</a> - <a href="edit.html?id=${courseID}">Edit Song</a> </li>`
    }

    document.querySelector("#list_of_courses").innerHTML = html

})