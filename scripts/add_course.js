addEventListener("DOMContentLoaded", function(){
    document.querySelector("#addBtn").addEventListener("click", addCourse)
})

//add the course to the database... it has to be async function because we are calling data outside our server

async function addCourse(){
    //create song object based on the form that user fills out... this will make life easier when we send data to the backend
    const course = {
        courseTitle: document.querySelector("#courseTitle").value,
        courseDept: document.querySelector("#courseDept").value,
        courseDesc: document.querySelector("#courseDesc").value,
        startDate: document.querySelector("#startDate").value 
    }

    const response = await fetch("http://localhost:3000/api/courses", {
        method: "POST",
        headers: {
            "Content-Type" : "application/json"
        },
        body: JSON.stringify(course)
    })

    if (response.ok) {
        const results = await response.json()
        alert("Add course with ID of " + results._id)

        //reset form
        document.querySelector("form").reset()
    }
    else{
        document.querySelector("#error").innerHTML = "Cannot add course"
    }
}