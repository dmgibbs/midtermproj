$(document).ready(function() {
  $("#add-button").click(function(e) {
    e.preventDefault();

    $.ajax({
      type: "POST",
      url: "/todo/add",
      data: $(".form-content").serialize()
    }).done((id) => {
      $.ajax({
        type: "GET",
        url: `/todo/list`,
      }).then((response) => {
        console.log("response:::::::::", response);
        for (var i = 0; i < response.length; i++) {
          let result = response[i];
          console.log("response[i]", result);


          let $description = result.description;
          let $duration = result.duration;
          let $status = result.status;
          console.log("result.description" + result.description);
          console.log("result.duration" + result.duration);
          console.log("result.status" + result.status);
          let $todolist = `
      <div class = "col">
      <ul>
      <li>description: ${$description}duration: ${$duration}status: ${$status} <a href="/users/:id/edit">Edit
          </a></li>
      </ul>
      </div>
    `;
    console.log("todolist"+$todolist);
      $(".all-lists-container").append($todolist);
        }


      });
    });



    // console.log($todolist);


  });




















});
