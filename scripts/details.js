addEventListener("DOMContentLoaded", async function(){
    //grab the search params from the url after the question mark
    const urlparam = new URLSearchParams(window.location.search)
    const courseID = urlparam.get("id")
    console.log(courseID)

    const response = await fetch("http://localhost:3000/api/courses/" + courseID)
    const course = await response.json()
    console.log(course)

    let heading = ""
    heading += `Welcome to the ${course.courseTitle} page`
    document.querySelector("h1").innerHTML = heading

    let html = ""
    html += `
        <h2>Course Title - ${course.courseTitle} </h2>
        <h2>Department - ${course.courseDept} </h2>
        <h2>Course Description - ${course.courseDesc} </h2>
        <h2>Start Date - ${course.startDate} </h2>
    `
    document.querySelector("div").innerHTML = html
})