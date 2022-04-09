$(document).ready(function () {
  $("#sidebarCollapse").on("click", function () {
    $("#sidebar").toggleClass("active");
  });

  // UNIVERSAL ANALYTICS
  let ua_event_size = 0;

  $("#ua_add_button").on("click", function () {
    ua_event_size++;
    $("#ua_conditions").append(
      "<p id=" +
        ua_event_size +
        "><b>Event " +
        ua_event_size +
        " </b> &nbsp; CSS Selector: <input type='text' class='ua_css_selector'/> &nbsp; Action: <input type='text' class='ua_event_action'/> &nbsp; Category: <input type='text' class='ua_event_category'/> &nbsp;</p>"
    );
  });
  $("#ua_generate_script").on("click", function () {
    let ua_event_actions = $(".ua_event_action");
    let ua_event_categories = $(".ua_event_category");
    let ua_css_selectors = $(".ua_css_selector");
    let result =
      "<span class='grey'>&lt;</span><span class='lightblue2'>script</span><span class='grey'>&gt;</span>";
    result +=
      "<br />  <span class='lightblue1'>window</span>.<span class='yellow'>addEventListener</span>(<span class='red2'>&apos;load&apos;</span>, <span class='lightblue2'>function</span>(<span class='yellow'>event</span>) {";
    for (var i = 0; i < ua_css_selectors.length; i++) {
      result +=
        "<br />    <span class='lightblue1'>document</span>.<span class='yellow'>querySelector</span>(<span class='red2'>&quot;" +
        ua_css_selectors[i].value +
        "&quot;</span>)?.<span class='yellow'>addEventListener</span>(<span class='red2'>&quot;click&quot;</span>, <span class='lightblue2'>function</span>() {<br />";
      result +=
        "      <span class='yellow'>gtag</span>(<span class='red2'>&apos;event&apos;</span>, <span class='red2'>&apos;" +
        ua_event_actions[i].value +
        "&apos;</span>, {<br />";
      result +=
        "        <span class='red2'>&apos;event_category&apos;</span>: <span class='red2'>&apos;" +
        ua_event_categories[i].value +
        "&apos;</span><br />";
      result += "      });<br />";
      result += "    });";
    }
    result += "<br />  });";
    result +=
      "<br /><span class='grey'>&lt;/<span class='lightblue2'>script</span><span class='grey'>&gt;</span>";
    $("#ua_generated_script").html("<pre>" + result + "</pre>");
  });
  $("#ua_reset_events").on("click", function () {
    ua_event_size = 0;
    $("#ua_conditions").empty();
  });
  $("#ua_clear_script").on("click", function () {
    $("#ua_generated_script").empty();
  });
});