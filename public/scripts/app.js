$(document).ready(function() {

      $.ajax({
        type: "GET",
        url: `/todo/list`,
      }).then((response) => {
        console.log("response:::::::::", response);
        for (var i = 0; i < response.length; i++) {
          let result = response[i];
          //console.log("response[i]", result);

          let $description = result.description;
          let $duration = result.duration;
          let $status = result.status;

          let $todoId = result.id;

          //console.log("result.Id",result.id);

          //console.log("result.description" + result.description);
          //console.log("result.duration" + result.duration);
          //console.log("result.status" + result.status);
          let $todolist = `

          <label class="todo">
    <input class="todo__state" type="checkbox" />

    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 200 25" class="todo__icon">
      <use xlink:href="#todo__line" class="todo__line"></use>
      <use xlink:href="#todo__box" class="todo__box"></use>
      <use xlink:href="#todo__check" class="todo__check"></use>
      <use xlink:href="#todo__circle" class="todo__circle"></use>
    </svg>

    <div class="todo__text">
      <li class="list-li">Description: ${$description}</li>
      <li class="list-li">Duration: ${$duration} minutes</li>
      <li class="list-li">Status: ${$status}</li>
      <li class="list-li"><a href="/todo/edit/${$todoId}">Edit</a></li>
       </div>

  </label>
    `;

     if (result.cat_id === 1 ){
      $("#movie").append($todolist);
    } else if (result.cat_id === 2) {
      $("#book").append($todolist);
    } else if (result.cat_id === 3) {
      $("#restaurant").append($todolist);
    } else if (result.cat_id === 4) {
      $("#product").append($todolist);
    }


        }
      });

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
        $(".todo").remove();
        //console.log("response:::::::::", response);
        for (var i = 0; i < response.length; i++) {
          let result = response[i];
          console.log("response[i]", result);
          let $todoId=result.id;
          let $description = result.description;
          let $duration = result.duration;
          let $status = result.status;
          //console.log("result.description" + result.description);
          //console.log("result.duration" + result.duration);
          //console.log("result.status" + result.status);
          let $todolist = `

    <label class="todo">
    <input class="todo__state" type="checkbox" />

    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 200 25" class="todo__icon">
      <use xlink:href="#todo__line" class="todo__line"></use>
      <use xlink:href="#todo__box" class="todo__box"></use>
      <use xlink:href="#todo__check" class="todo__check"></use>
      <use xlink:href="#todo__circle" class="todo__circle"></use>
    </svg>

    <div class="todo__text">
      <li class="list-li">Description: ${$description}</li>
      <li class="list-li">Duration: ${$duration} minutes</li>
      <li class="list-li">Status: ${$status}</li>
      <li class="list-li"><a href="/todo/edit/${$todoId}">Edit
           </a></li>
       </div>

  </label>
    `;
     if (result.cat_id === 1 ){
      $("#movie").append($todolist);
    } else if (result.cat_id === 2) {
      $("#book").append($todolist);
    } else if (result.cat_id === 3) {
      $("#restaurant").append($todolist);
    } else if (result.cat_id === 4) {
      $("#product").append($todolist);
    }


        }


      });
    });


  });

$("#edit-button").on("click",function(){
  let todo_id = $(this).data("todo_id");
  console.log(`todo_id,`,todo_id);
  $.ajax({
        type: "POST",
        url: `/todo/edit/${todo_id}`,
        data: {'todo_id':`${todo_id}`},
        success: function(response) {
            console.log(response);
        },
        error: function(response) {
            console.log(response);
        }
});

});
});
