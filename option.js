window.onload = function(){
    restore_options();
    $("#save-button").bind("click", save_options);
};

// Saves options to localStorage.
function save_options() {
  localStorage["profile"] = $("#profile").prop("checked");
  localStorage["rt"] = $("#rt").prop("checked");
  localStorage["refresh"] = $("#refresh").prop("checked");
  localStorage["replyAll"] = $("#replyAll").prop("checked");
  localStorage["dm"] = $("#dm").prop("checked");

  // Update status to let user know options were saved.
  var status = document.getElementById("status");
  status.innerHTML = "保存しました";
  setTimeout(function() {
    status.innerHTML = "";
  }, 1500);
}

// Restores select box state to saved value from localStorage.
function restore_options() {
  if(localStorage["rt"] == undefined){localStorage["rt"] = true;}
  if(localStorage["profile"] == undefined){localStorage["profile"] = false;}
  if(localStorage["refresh"] == undefined){localStorage["refresh"] = false;}
  if(localStorage["replyAll"] == undefined){localStorage["replyAll"] = false;}
  if(localStorage["dm"] == undefined){localStorage["dm"] = false;}
  $("#rt").prop("checked",eval(localStorage["rt"]));
  $("#profile").prop("checked",eval(localStorage["profile"]));
  $("#refresh").prop("checked",eval(localStorage["refresh"]));
  $("#replyAll").prop("checked",eval(localStorage["replyAll"]));
  $("#dm").prop("checked",eval(localStorage["dm"]));
}
