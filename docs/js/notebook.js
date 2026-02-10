document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll(".jp-RenderedText pre").forEach(function (pre) {
    if (pre.textContent.trim() === "Output()") {
      var outputChild = pre.closest(".jp-OutputArea-child");
      if (outputChild) outputChild.remove();
    }
  });
});
