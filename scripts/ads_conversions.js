$(document).ready(function () {
  // ADS CONVERSION
  let ads_conversion_size = 0;

  $("#ads_add_button").on("click", function () {
    ads_conversion_size++;
    $("#ads_conditions").append(
      "<table class='table table-borderless'><tbody><tr><td><p id=" +
        ads_conversion_size +
        "><b>Conversion " +
        ads_conversion_size +
        " </b></p></td><td>Type: <select class='conversion_type'><option value='pageview_equal'>Page View (Equal)</option><option value='pageview_contain'>Page View (Contain)</option><option value='click'>Click</option><option value='all_clicks'>All Clicks</option></select></td><td>URL/Selector: <input type='text' class='ads_page_url_or_selector'/></td><td>Conversion ID: <input type='text' class='ads_cid'/></td><td></tr><tr><td>Conversion Label: <input type='text' class='ads_clabel'/></td><td>Conversion value: <input type='text' class='ads_cvalue'/><br /><br />Including Regex: <input type='checkbox' class='ads_cvalue_regex'/><br /><br />String to Number: <input type='checkbox' class='ads_cvalue_change' checked/></td><td>Transaction ID: <input type='text' class='ads_tid'/><br /><br />Including Regex: <input type='checkbox' class='ads_tid_regex'/></td><td>Currency: <input type='text' class='ads_currency'/><br /><br />Comment: <input type='text' class='ads_comment'/></td></tr></tbody></table>"
    );
  });
  
  $("#ads_script_for_timeout").on("click", function () { 
    let result =
      "<span class='grey'>&lt;</span><span class='lightblue2'>script</span><span class='grey'>&gt;</span>";
    result +=
      "<br />  window.addEventListener(&apos;load&apos;, function(event) {";
    result += "<br />    setTimeout(<br />";
    result += "      () => {<br />";
    result += "        if (window.location.href.indexOf('example.html') > -1) {<br />";
    result += "          gtag('event', 'conversion', {<br />";
    result += "            'send_to': 'AW-1111/AAAA'<br />";
    result += "          });<br />";
    result += "        }<br />";
    result += "      }, 3000<br />";
    result += "    );<br />";
    result += "  });";
    result += "<br /><span class='grey'>&lt;/<span class='lightblue2'>script</span><span class='grey'>&gt;</span><br />";
    $("#generated_ads_script").html("<pre>" + result + "</pre>");
  });

  $("#ads_script_for_gtm_custom_event").on("click", function () { 
    let result = "<span class='grey'>&lt;</span><span class='lightblue2'>script</span><span class='grey'>&gt;</span><br />";
    result += "  document.querySelector('selector').addEventListener('click', function() {<br />";
    result += "    window.dataLayer = window.dataLayer || [];<br />";
    result += "    window.dataLayer.push({ 'event': 'custom_event_name' });<br />";
    result += "  });";
    result += "<br /><span class='grey'>&lt;/<span class='lightblue2'>script</span><span class='grey'>&gt;</span><br />";
    $("#generated_ads_script").html("<pre>" + result + "</pre>");
  });
  $("#ads_script_for_gtm_sixshop_purchase_variables").on("click", function () { 
    let result = "<span class='grey'>// Sixshop Transaction ID</span><br />";
    result += "function() {<br />";
    result += "  if (window.location.href.indexOf('payment/success/inicisPay') > -1 || window.location.href.indexOf('payment/request/withoutBank') > -1) {<br />";
    result += "    return document.querySelector('#content_div > div.content.designSettingElement.text-body > div:nth-child(2) > input').value;<br />";
    result += "  } <br />";
    result += "}<br /><br />";
    result += "<span class='grey'>// Sixshop Purchase Price</span><br />";
    result += "function() {<br />";
    result += "  if (window.location.href.indexOf('payment/success/inicisPay') > -1) {<br />";
    result += "    return document.querySelector('#content_div > div.content.designSettingElement.text-body > div:nth-child(4) > input:nth-child(3)').value.replace(/[^\d]/g, '');<br />";
    result += "  } else if (window.location.href.indexOf('payment/request/withoutBank') > -1) {<br />";
    result += "    return document.querySelector('#content_div > div.content.designSettingElement.text-body > div:nth-child(6) > input:nth-child(3)').value.replace(/[^\d]/g, '');<br />"
    result += "  }<br />"
    result += "}<br /><br />";
    $("#generated_ads_script").html("<pre>" + result + "</pre>");
  });

  $("#ads_script_for_cafe24_variables").on("click", function () { 
    let result = "<span class='grey'>&lt;</span><span class='lightblue2'>script</span><span class='grey'>&gt;</span><br />";
    result += "  <span class='grey'>// 카페24 전자상거래 페이지</span><br />";
    result += "  var viewItemPage = /category|detail/.test(window.location.pathname);<br />";
    result += "  var cartPage = /basket/.test(window.location.pathname);<br />";
    result += "  var checkoutPage = /orderform/.test(window.location.pathname);<br />";
    result += "  var purchasePage = /order_result/.test(window.location.pathname);<br /><br />";
    result += "  <span class='grey'>// 카페24 치환 변수</span><br />";
    result += "  var orderProductLenght = EC_FRONT_EXTERNAL_SCRIPT_VARIABLE_DATA.order_product.length;<br />";
    result += "  var totalPrice = EC_FRONT_EXTERNAL_SCRIPT_VARIABLE_DATA.payed_amount;<br />";
    result += "  var transactionId = EC_FRONT_EXTERNAL_SCRIPT_VARIABLE_DATA.order_id;<br />";
    result += "  var quantity = EC_FRONT_EXTERNAL_SCRIPT_VARIABLE_DATA.order_product[i].quantity;<br />";
    result += "  var price = EC_FRONT_EXTERNAL_SCRIPT_VARIABLE_DATA.order_product[i].product_price;<br /><br />";
    result += "  <span class='grey'>// 카페24 구매 완료 코드 예제</span><br />";
    result += "  if (window.location.href.indexOf('order_complete') > -1) {<br />";
    result += "    gtag('event', 'conversion', {<br />";
    result += "      'send_to': 'AW-1111/AAAA',<br />";
    result += "      'value': EC_FRONT_EXTERNAL_SCRIPT_VARIABLE_DATA.payed_amount,<br />";
    result += "      'currency': 'KRW',<br />";
    result += "      'transaction_id': EC_FRONT_EXTERNAL_SCRIPT_VARIABLE_DATA.order_id<br />";
    result += "    });<br />";
    result += "  }<br />";
    result += "<br /><span class='grey'>&lt;/<span class='lightblue2'>script</span><span class='grey'>&gt;</span><br /><br />";
    $("#generated_ads_script").html("<pre>" + result + "</pre>");
  });

  $("#generate_ads_script").on("click", function () {
    let conversion_types = $(".conversion_type");
    let ads_page_urls_or_selectors = $(".ads_page_url_or_selector");
    let ads_cids = $(".ads_cid");
    let ads_clabels = $(".ads_clabel");
    let ads_cvalues = $(".ads_cvalue");
    let ads_transactionIds = $(".ads_tid");
    let ads_currencies = $(".ads_currency");
    let ads_cvalue_regexes = $(".ads_cvalue_regex");
    let ads_transactionId_regexes = $(".ads_tid_regex");
    let ads_cvalue_changes = $(".ads_cvalue_change");
    let ads_comments = $(".ads_comment");

    let result =
      "<span class='grey'>&lt;</span><span class='lightblue2'>script</span><span class='grey'>&gt;</span>";
    result +=
      "<br />  <span class='lightblue1'>window</span>.<span class='yellow'>addEventListener</span>(<span class='red2'>&apos;load&apos;</span>, <span class='lightblue2'>function</span>(<span class='yellow'>event</span>) {";
    for (var i = 0; i < ads_page_urls_or_selectors.length; i++) {
      if (ads_comments[i].value != "") {
        if (i == 0)
          result += "<span class='grey'><br />    // " + ads_comments[i].value + "</span>";
        else 
          result += "<span class='grey'><br /><br />    // " + ads_comments[i].value + "</span>";
      }
      // ADS CONVERSION PAGEVIEW
      if (conversion_types[i].value == "pageview_equal") {
        result +=
          "<br />    <span class='lightblue1'>if</span> (window.location.href == <span class='red2'>'" +
          ads_page_urls_or_selectors[i].value +
          "'</span>) {<br />";
        result +=
          "      <span class='yellow'>gtag</span>(<span class='red2'>&apos;event&apos;</span>, <span class='red2'>&apos;" +
          "conversion" +
          "&apos;</span>, {<br />";
        result +=
          "        <span class='red2'>&apos;send_to&apos;</span>: <span class='red2'>&apos;" +
          "AW-" +
          ads_cids[i].value +
          "/" +
          ads_clabels[i].value +
          "&apos;</span>";
        if (ads_cvalues[i].value != "") {
          result +=
            ",<br />" +
            "        <span class='red2'>&apos;value&apos;</span>: <span class='red2'>";
          if (ads_cvalue_changes[i].checked) {
            result += "+";
          }
          result += ads_cvalues[i].value;
          if (ads_cvalue_regexes[i].checked) {
            result += ".replace(/[^\\d]/g, '')";
          }
          result += "</span>";
        }
        if (ads_currencies[i].value != "") {
          result +=
            ",<br />" +
            "        <span class='red2'>&apos;currency&apos;</span>: <span class='red2'>&apos;" +
            ads_currencies[i].value +
            "&apos;</span>";
        }
        if (ads_transactionIds[i].value != "") {
          result +=
            ",<br />" +
            "        <span class='red2'>&apos;transaction_id&apos;</span>: <span class='red2'>" +
            ads_transactionIds[i].value;
          if (ads_transactionId_regexes[i].checked) {
            result += ".replace(/[^\\d-]/g, '')";
          }
          result += "</span>";
        }
        result += "<br />      });<br />";
        result += "    }";
      }
      // ADS_PAGEVIEW_CONTAIN
      else if (conversion_types[i].value == "pageview_contain") {
        result +=
          "<br />    <span class='lightblue1'>if</span> (window.location.href.indexOf(<span class='red2'>'" +
          ads_page_urls_or_selectors[i].value +
          "'</span>) &gt; -1) {<br />";
        result +=
          "      <span class='yellow'>gtag</span>(<span class='red2'>&apos;event&apos;</span>, <span class='red2'>&apos;" +
          "conversion" +
          "&apos;</span>, {<br />";
        result +=
          "        <span class='red2'>&apos;send_to&apos;</span>: <span class='red2'>&apos;" +
          "AW-" +
          ads_cids[i].value +
          "/" +
          ads_clabels[i].value +
          "&apos;</span>";
        if (ads_cvalues[i].value != "") {
          result +=
            ",<br />" +
            "        <span class='red2'>&apos;value&apos;</span>: <span class='red2'>";
          if (ads_cvalue_changes[i].checked) {
            result += "+";
          }
          result += ads_cvalues[i].value;
          if (ads_cvalue_regexes[i].checked) {
            result += ".replace(/[^\\d]/g, '')";
          }
          result += "</span>";
        }
        if (ads_currencies[i].value != "") {
          result +=
            ",<br />" +
            "        <span class='red2'>&apos;currency&apos;</span>: <span class='red2'>&apos;" +
            ads_currencies[i].value +
            "&apos;</span>";
        }
        if (ads_transactionIds[i].value != "") {
          result +=
            ",<br />" +
            "        <span class='red2'>&apos;transaction_id&apos;</span>: <span class='red2'>" +
            ads_transactionIds[i].value;
          if (ads_transactionId_regexes[i].checked) {
            result += ".replace(/[^\\d-]/g, '')";
          }
          result += "</span>";
        }
        result += "<br />      });<br />";
        result += "    }";
      }

      // ADS CONVERSION CLICK ONE
      else if (conversion_types[i].value == "click") {
        result +=
          "<br />    <span class='lightblue1'>document</span>.<span class='yellow'>querySelector</span>(<span class='red2'>&quot;" +
          ads_page_urls_or_selectors[i].value +
          "&quot;</span>)?.<span class='yellow'>addEventListener</span>(<span class='red2'>&quot;click&quot;</span>, <span class='lightblue2'>function</span>() {<br />";
        result +=
          "      <span class='yellow'>gtag</span>(<span class='red2'>&apos;event&apos;</span>, <span class='red2'>&apos;" +
          "conversion" +
          "&apos;</span>, {<br />";
        result +=
          "        <span class='red2'>&apos;send_to&apos;</span>: <span class='red2'>&apos;" +
          "AW-" +
          ads_cids[i].value +
          "/" +
          ads_clabels[i].value +
          "&apos;</span>";
        if (ads_cvalues[i].value != "") {
          result +=
            ",<br />" +
            "        <span class='red2'>&apos;value&apos;</span>: <span class='red2'>";
          if (ads_cvalue_changes[i].checked) {
            result += "+";
          }
          result += ads_cvalues[i].value;
          if (ads_cvalue_regexes[i].checked) {
            result += ".replace(/[^\\d]/g, '')";
          }
          result += "</span>";
        }
        if (ads_currencies[i].value != "") {
          result +=
            ",<br />" +
            "        <span class='red2'>&apos;currency&apos;</span>: <span class='red2'>&apos;" +
            ads_currencies[i].value +
            "&apos;</span>";
        }
        if (ads_transactionIds[i].value != "") {
          result +=
            ",<br />" +
            "        <span class='red2'>&apos;transaction_id&apos;</span>: <span class='red2'>" +
            ads_transactionIds[i].value;
          if (ads_transactionId_regexes[i].checked) {
            result += ".replace(/[^\\d-]/g, '')";
          }
          result += "</span>";
        }
        result += "<br />      });<br />";
        result += "    });";
      }

      // ADS CONVERSION ALL CLICKS
      else if (conversion_types[i].value == "all_clicks") {
        result +=
          "<br />    <span class='lightblue1'>document</span>.<span class='yellow'>querySelectorAll</span>(<span class='red2'>&quot;" +
          ads_page_urls_or_selectors[i].value +
          "&quot;</span>)?.<span class='yellow'>forEach</span>(button => <br />" +
          "      button?." + "<span class='yellow'>addEventListener</span>(<span class='red2'>&quot;click&quot;</span>, <span class='lightblue2'>function</span>() {<br />";
        result +=
          "        <span class='yellow'>gtag</span>(<span class='red2'>&apos;event&apos;</span>, <span class='red2'>&apos;" +
          "conversion" +
          "&apos;</span>, {<br />";
        result +=
          "          <span class='red2'>&apos;send_to&apos;</span>: <span class='red2'>&apos;" +
          "AW-" +
          ads_cids[i].value +
          "/" +
          ads_clabels[i].value +
          "&apos;</span>";
        if (ads_cvalues[i].value != "") {
          result +=
            ",<br />" +
            "          <span class='red2'>&apos;value&apos;</span>: <span class='red2'>";
          if (ads_cvalue_changes[i].checked) {
            result += "+";
          }
          result += ads_cvalues[i].value;
          if (ads_cvalue_regexes[i].checked) {
            result += ".replace(/[^\\d]/g, '')";
          }
          result += "</span>";
        }
        if (ads_currencies[i].value != "") {
          result +=
            ",<br />" +
            "          <span class='red2'>&apos;currency&apos;</span>: <span class='red2'>&apos;" +
            ads_currencies[i].value +
            "&apos;</span>";
        }
        if (ads_transactionIds[i].value != "") {
          result +=
            ",<br />" +
            "          <span class='red2'>&apos;transaction_id&apos;</span>: <span class='red2'>" +
            ads_transactionIds[i].value;
          if (ads_transactionId_regexes[i].checked) {
            result += ".replace(/[^\\d-]/g, '')";
          }
          result += "</span>";
        }
        result += "<br />        });<br />";
        result += "      })<br />";
        result += "    );";
      }
    }

    
    result += "<br />  });";
    result +=
      "<br /><span class='grey'>&lt;/<span class='lightblue2'>script</span><span class='grey'>&gt;</span><br /><br />";
    $("#generated_ads_script").html("<pre>" + result + "</pre>");
  });
  $("#ads_reset_events").on("click", function () {
    ads_conversion_size = 0;
    $("#ads_conditions").empty();
  });
  $("#ads_clear_script").on("click", function () {
    $("#generated_ads_script").empty();
  });
  $("#ads_copy").on("click", function() {
    let value = document.querySelector("#generated_ads_script").innerText;
    let textArea = document.createElement("textarea");
    document.body.appendChild(textArea);
    textArea.value = value;
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);
  });
});