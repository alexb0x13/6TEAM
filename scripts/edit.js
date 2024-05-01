addEventListener("DOMContentLoaded", async function(){
    document.querySelector("#updateBtn").addEventListener("click", updateCourse)

    const urlparam = new URLSearchParams(window.location.search)
    const courseID = urlparam.get('id')

    const response = await fetch ("http://localhost:3000/api/courses/" + courseID)
    if(response.ok){
        let course = await response.json()
        document.querySelector("#courseId").value = course._id
        document.querySelector("#courseTitle").value = course.courseTitle
        document.querySelector("#courseDept").value = course.courseDept
        document.querySelector("#courseDesc").value = course.courseDesc
        document.querySelector("#startDate").value = course.startDate.substring(0,10)
    }
    
})

async function updateCourse(){
    //create course object from form fields
    const courseID = document.querySelector("#courseId").value
    const course = {
        _id: document.querySelector("#courseId").value,
        courseTitle: document.querySelector("#courseTitle").value,
        courseDept: document.querySelector("#courseDept").value,
        courseDesc: document.querySelector("#courseDesc").value,
        startDate: document.querySelector("#startDate").value 
    }
    const response = await fetch("http://localhost:3000/api/courses/" + courseID, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
    },
        body: JSON.stringify(course)
})

if(response.ok){
    alert("Updated course")
} else{
    document.querySelector("#error").innerHTML = "Cannot update course"
}
}