//Paku Modal
//Get modal Element
let paku_pakuModal = document.getElementById("pakuModal");
//get open modal button
let pakuBtn = document.getElementById("paku-pakuBtn");
//Get Close button
let closeBtnPaku = document.getElementsByClassName("pakucloseBtn")[0];

//Listen for open click
pakuBtn.addEventListener("click", openPakuModal);
//Listen for  close click
closeBtnPaku.addEventListener("click", closePakuModal);

//function to open checkout modal
function openPakuModal() {
  paku_pakuModal.style.display = "block";
}

//function to close modal
function closePakuModal() {
  paku_pakuModal.style.display = "none";
}

//Paku Controls
$(function() {
  let ARROW_RIGHT = 39;
  $("html").keydown(function(event) {
    if (event.which == ARROW_RIGHT) {
      $("#pakuImage")
        .stop()
        .css({ transform: "rotate(" + 360 + "deg)" })
        .animate({ marginLeft: "+=5px" }, 60);
    }
  });

  let ARROW_LEFT = 37;
  $("html").keydown(function(event) {
    if (event.which == ARROW_LEFT) {
      $("#pakuImage")
        .stop()
        .css({ transform: "scaleX(-1)" })
        .animate({ marginLeft: "-=5px" }, 60);
    }
  });

  let ARROW_DOWN = 40;
  $("html").keydown(function(event) {
    if (event.which == ARROW_DOWN) {
      $("#pakuImage")
        .stop()
        .css({ transform: "rotate(" + 90 + "deg)" })
        .animate({ marginTop: "+=5px" }, 60);
    }
  });
  let ARROW_UP = 38;
  $("html").keydown(function(event) {
    if (event.which == ARROW_UP) {
      $("#pakuImage")
        .stop()
        .css({ transform: "rotate(" + -90 + "deg)" })
        .animate({ marginTop: "-=8px" }, 60);
    }
  });
});
