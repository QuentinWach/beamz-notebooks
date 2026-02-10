document.addEventListener("DOMContentLoaded", function () {
  /* Remove "Output()" placeholder output */
  document.querySelectorAll(".jp-RenderedText pre").forEach(function (pre) {
    if (pre.textContent.trim() === "Output()") {
      var outputChild = pre.closest(".jp-OutputArea-child");
      if (outputChild) outputChild.remove();
    }
  });

  /* Hide empty pre blocks (empty code cells or empty output) */
  document.querySelectorAll(".jupyter-wrapper pre").forEach(function (pre) {
    if (pre.textContent.trim() === "") {
      var container = pre.closest(".highlight-ipynb") || pre.closest(".jp-OutputArea-child") || pre.parentElement;
      if (container) container.style.display = "none";
    }
  });
});
