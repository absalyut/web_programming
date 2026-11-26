/* Shared Arrakis navigation, footer, and reveal animation. */
(function () {
  "use strict";

  var script = document.currentScript || document.querySelector("script[data-dune-root]");
  var root = (script && script.getAttribute("data-root")) || "../";
  var week = (script && script.getAttribute("data-week")) || "";
  var noTopbar = script && script.hasAttribute("data-no-topbar");
  var body = document.body;

  if (!body) return;

  body.classList.add("dune-page");

  /* The reference pages ship their own header. Replace it with the shared bar. */
  var oldHeader = document.querySelector("body > header");
  if (oldHeader && oldHeader.querySelector(":scope > strong") && !oldHeader.querySelector("h1")) {
    oldHeader.classList.add("dune-old-header");
  }

  if (!noTopbar && !body.classList.contains("course-index") && !document.querySelector(".dune-topbar")) {
    var nav = document.createElement("nav");
    nav.className = "dune-topbar";
    nav.setAttribute("aria-label", "Course navigation");
    nav.innerHTML =
      '<a class="dune-brand" href="' + root + 'index.html">ELBEK <span>· WEB PROGRAMMING</span></a>' +
      '<div class="dune-topbar-links">' +
      '<a href="' + root + 'index.html#weeks">Weeks</a>' +
      '<a href="https://github.com/absalyut/web_programming" target="_blank" rel="noopener">GitHub</a>' +
      '<span class="dune-crumb">' + (week || "") + "</span>" +
      "</div>";
    body.insertBefore(nav, body.firstChild);
  }

  if (!body.classList.contains("course-index") && !document.querySelector("footer")) {
    var footer = document.createElement("footer");
    footer.className = "dune-footer";
    footer.innerHTML =
      "<p>Mansurov Elbek · 202537363 · Web Programming</p>" +
      '<p><a href="' + root + 'index.html">Back to all weeks</a></p>';
    body.appendChild(footer);
  }

  function show(el) {
    el.classList.add("in");
  }

  var items = Array.prototype.slice.call(document.querySelectorAll(".reveal"));
  if (!items.length) return;

  if (!("IntersectionObserver" in window)) {
    items.forEach(show);
    return;
  }

  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          show(entry.target);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
  );

  items.forEach(function (item) {
    observer.observe(item);
  });
})();
