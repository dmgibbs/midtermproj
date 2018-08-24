$(() => {
  $.ajax({
    method: "GET",
    url: "/api/users"
  }).done((users) => {
    for(user of users) {
      $("<div>").text(user.name).appendTo($("body"));
    }
  });;
});


 function postNewList() {
    $.ajax({
      type: "POST",
      url: "/",
      data: $("#description-content").serialize()
    }).done(() => {
      $("article").remove();
      loadTweets();
    });
  };



$(document).ready(function() {

  $("#add-button").click(function(e) {
    e.preventDefault();

    let duration = $("#duration-content").val();
    if (duration == "") {
      console.log("something should be filled in.");
      $("#duration-content").focus();
      return false;
    }

    let description = $("#description-content").val()
     if (description == "") {
      console.log("something should be filled in.");
      $("#description-content").focus();
      return false;
    }

    var dataString = 'description=' +description + 'duration='

    if(descrip.length === 0 || dura.length === 0){
       console.log("you should input something here.");
    }

    postNewList();


  });


















});