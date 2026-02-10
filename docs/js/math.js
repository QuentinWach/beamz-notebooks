// Initialize KaTeX rendering for pymdownx.arithmatex (generic: true)
// This will render LaTeX written as $...$, $$...$$, \\(...\\), and \\[...\\]

function beamzRenderMath() {
  if (typeof renderMathInElement !== "function") {
    return;
  }

  renderMathInElement(document.body, {
    delimiters: [
      { left: "\\(", right: "\\)", display: false },
      { left: "\\[", right: "\\]", display: true },
      { left: "$$", right: "$$", display: true },
      { left: "$", right: "$", display: false },
    ],
    throwOnError: false,
  });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", beamzRenderMath);
} else {
  beamzRenderMath();
}

