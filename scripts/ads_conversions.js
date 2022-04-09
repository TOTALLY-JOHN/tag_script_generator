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

  $("#cafe24_ua_eec").on("click", function () { 
    let result = "<span class='grey'>&lt;</span><span class='lightblue2'>script</span><span class='grey'>&gt;</span>";
    result += `
      window.addEventListener('load', function(event) {
        <span class='grey'>// UA (Universal Analytics) E-Commerce (전자상거래) 코드 (카페24용)</span>

        <span class='grey'>// 페이지 변수</span>
        var viewItemPage = /category|detail/.test(window.location.pathname);
        var cartPage = /basket/.test(window.location.pathname);
        var checkoutPage = /orderform/.test(window.location.pathname);
        var purchasePage = /order_result/.test(window.location.pathname);
 
        <span class='grey'>// 공통 변수 (웹사이트에 따라 적절하게 변경하세요)</span>
        var brand = 'Google';
        var affiliation = 'Google';
        var listName = 'Search Results';
        var currency = 'KRW';
 
        <span class='grey'>// 네이버 페이 버튼 변수 (네이버 페이는 클릭으로만 전환 추적 가능하다는 점을 반드시 확인하세요)</span>
        var btnNpay = $('.npay_btn_item')[0];
 
        <span class='grey'>// 수량 체크 함수</span>
        function getQuantity(){
            var quantity = $('#option_box1_quantity');
            if(quantity.length == 1){
                return Number(document.getElementById('option_box1_quantity').value);
            }
            else {
                return 1;
            }
        }

        function callGtag(pageType, items){
            gtag('event', pageType, {
                "items": items
            });
        }

        function callGtagPurchase(pageType, transaction_id, affiliation, totalPrice, currency, items){
            gtag('event', pageType, {
                "transaction_id":  transaction_id,
                "affiliation": affiliation,
                "value": totalPrice,
                "currency": currency,
                "tax": 0,
                "shipping": 0,
                "items": items
            });
        }

        function addItem(item, id, name, category, quantity, price){
            item.push({
                'id': id,
                'name': name,
                'list_name': listName,
                'brand': brand,
                'category': category,
                'quantity': quantity,
                'price': price
            });
        }
        
        if(viewItemPage){
            var viewItem = [];
            addItem(viewItem, iProductNo, product_name, iCategoryNo, getQuantity(), product_price);
            callGtag('view_item', viewItem);
 
            var addToCartItem = [];
            var send = XMLHttpRequest.prototype.send
            XMLHttpRequest.prototype.send = function() { 
                this.addEventListener('load', function() {
                    if(this.responseURL.includes('/exec/front/order/basket/')){
                        addItem(addToCartItem, iProductNo, product_name, iCategoryNo, getQuantity(), product_price);
                        callGtag('add_to_cart', addToCartItem);
                    }
                })
                return send.apply(this, arguments)
            }
 
            btnNpay?.addEventListener('click', function(e) {
                callGtag('begin_checkout', addToCartItem);
                callGtagPurchase('purchase', btnNpay.children[0].id, affiliation, getQuantity()*product_price, currency, addToCartItem);
            }, false );
        }
        else if(cartPage){
            var send = XMLHttpRequest.prototype.send
            XMLHttpRequest.prototype.send = function() { 
                this.addEventListener('load', function() {
                    if(this.responseURL.includes('/exec/front/order/basket/')){
                        var removeFromCartItem = [];
                        $('[id^="'+ BASKET_CHK_ID_PREFIX +'"]').each(function(i){
                            if ($(this).is(':checked')) {
                                addItem(removeFromCartItem, aBasketProductData[i].product_no, aBasketProductData[i].product_name, aBasketProductData[i].main_cate_no, aBasketProductData[i].quantity, aBasketProductData[i].product_sum_price);
                            }
                        });
                        callGtag('remove_from_cart', removeFromCartItem);
                    }
                })
                return send.apply(this, arguments)
            }
            var cartItem = [];
            var totalPrice = 0;
            jQuery.each( aBasketProductData, function( i ) {
                addItem(cartItem, aBasketProductData[i].product_no, aBasketProductData[i].product_name, aBasketProductData[i].main_cate_no, aBasketProductData[i].quantity, aBasketProductData[i].product_sum_price);
                totalPrice += aBasketProductData[i].quantity*aBasketProductData[i].product_sum_price
            });
            btnNpay?.addEventListener('click', function(e) {
                callGtag('add_to_cart', cartItem);
                callGtag('begin_checkout', cartItem);
                callGtagPurchase('purchase', btnNpay.children[0].id, affiliation, totalPrice, currency, cartItem);
            }, false );
        }
        else if(checkoutPage){
            var checkOutItem = [];
            jQuery.each( aBasketProductData, function( i ) {
                addItem(checkOutItem, aBasketProductData[i].product_no, aBasketProductData[i].product_name, aBasketProductData[i].main_cate_no, aBasketProductData[i].quantity, aBasketProductData[i].product_sum_price);
            });
            callGtag('begin_checkout', checkOutItem);
        }
        else if(purchasePage){
            var purchaseItem = [];
            if(EC_FRONT_EXTERNAL_SCRIPT_VARIABLE_DATA.order_product.length > 0){
                for(var i = 0; i < EC_FRONT_EXTERNAL_SCRIPT_VARIABLE_DATA.order_product.length; i++){
                    var category = '';
                    if(typeof EC_FRONT_EXTERNAL_SCRIPT_VARIABLE_DATA.order_product[i].category_no_3 == 'undefined'){
                        category = EC_FRONT_EXTERNAL_SCRIPT_VARIABLE_DATA.order_product[i].category_no_2;
                    }
                    else{
                        category = EC_FRONT_EXTERNAL_SCRIPT_VARIABLE_DATA.order_product[i].category_no_3;
                    }      
                    addItem(purchaseItem, EC_FRONT_EXTERNAL_SCRIPT_VARIABLE_DATA.order_product[i].product_no, EC_FRONT_EXTERNAL_SCRIPT_VARIABLE_DATA.order_product[i].product_name, category, EC_FRONT_EXTERNAL_SCRIPT_VARIABLE_DATA.order_product[i].quantity, EC_FRONT_EXTERNAL_SCRIPT_VARIABLE_DATA.order_product[i].product_price);
                }
            }
            callGtagPurchase('purchase', EC_FRONT_EXTERNAL_SCRIPT_VARIABLE_DATA.order_id, affiliation, EC_FRONT_EXTERNAL_SCRIPT_VARIABLE_DATA.payed_amount, currency, purchaseItem);
        }
      });`;
    result += "<br /><span class='grey'>&lt;/<span class='lightblue2'>script</span><span class='grey'>&gt;</span><br />";
    $("#ua_generated_script").html("<pre>" + result + "</pre>");
  });

  $("#cafe24_ga4_eec").on("click", function () { 
    let result = "<span class='grey'>&lt;</span><span class='lightblue2'>script</span><span class='grey'>&gt;</span><br />";
    result +=  "  window.addEventListener('load', function (event) { <br />" +
      "    <span class='grey'>// GA4 (Google Analytics 4) E-Commerce (전자상거래) 코드 (카페24용)</span><br /><br />" +
      "    <span class='grey'>// 페이지 변수</span><br />" +
      "    var viewItemPage = /category|detail/.test(window.location.pathname);<br />" +
      "    var cartPage = /basket/.test(window.location.pathname);<br />" +
      "    var checkoutPage = /orderform/.test(window.location.pathname);<br />" +
      "    var purchasePage = /order_result/.test(window.location.pathname);<br />" +
      "<br />" +
      "    <span class='grey'>// 공통 변수 (웹사이트에 따라 적절하게 변경하세요)</span><br />" +
      "    var brand = 'Google';<br />" +
      "    var affiliation = 'Google';<br />" +
      "    var listName = 'Search Results';<br />" +
      "    var currency = 'KRW';<br />" +
      "<br />" +
      "    <span class='grey'>// 네이버 페이 버튼 변수 (네이버 페이는 클릭으로만 전환 추적 가능하다는 점을 반드시 확인하세요)</span><br />" +
      "    var btnNpay = $('.npay_btn_item')[0];<br />" +
      "<br />" +
      "    <span class='grey'>// 수량 체크 함수</span><br />" +
      "    function getQuantity() {<br />" +
      "        var quantity = $('#option_box1_quantity');<br />" +
      "        if (quantity.length == 1) {<br />" +
      "            return Number(document.getElementById('option_box1_quantity').value);<br />" +
      "        }<br />" +
      "        else { <br />"+
      "            return 1;<br />" +
      "        }<br />" +
      "    }<br /><br />" +
      "    <span class='grey'>// 상세페이지 gtag 호출 함수</span><br />" +
      "    function callGtagViewItem(pageType, items) {<br />" +
      "        gtag('event', pageType, {<br />" +
      "            items: items<br />" +
      "        });<br />" +
      "    }<br />" +
      "<br />" +
      "    <span class='grey'>// 장바구니 추가 gtag 호출 함수</span><br />" +
      "    function callGtagAddToCart(pageType, items) {<br />" +
      "        gtag('event', pageType, {<br />" +
      "            items: items<br />" +
      "        });<br />" +
      "    }<br/ >" +
      "<br />" +
      "    <span class='grey'>// 장바구니 제거 gtag 호출 함수</span><br />" +
      "    function callGtagRemoveFromCart(pageType, items) {<br/ >" +
      "        gtag('event', pageType, {<br />" +
      "            items: items<br />" +
      "        });<br />" +
      "    }<br />" +
      "<br />" +
      "    <span class='grey'>// 구매완료 gtag 호출 함수</span><br />" +
      "    function callGtagPurchase(pageType, transaction_id, affiliation, totalPrice, currency, items) {<br />" +
      "        gtag('event', pageType, {<br />" +
      "            transaction_id: transaction_id,<br />" +
      "            affiliation: affiliation,<br />" +
      "            value: totalPrice,<br />" +
      "            currency: currency,<br />" +
      "            tax: 0,<br />" +
      "            shipping: 0,<br />" +
      "            items: items<br />" +
      "        });<br />" +
      "    }<br /><br />" +
      "    <span class='grey'>// 상품 추가 함수</span><br />" +
      "    function addItem(item, id, name, category, quantity, price) {<br />" +
      "        item.push({<br />" +
      "            item_id: id,<br />" +
      "            item_name: name,<br />" +
      "            item_list_name: listName,<br />" +
      "            item_brand: brand,<br />" +
      "            item_category: category,<br />" +
      "            quantity: quantity,<br />" +
      "            price: price<br />" +
      "        });<br />" +
      "    }<br /><br />" +
      "    <span class='grey'>// 상세페이지</span><br />" +
      "    if (viewItemPage) {<br />" +
      "        var viewItem = [];<br />" +
      "        addItem(viewItem, iProductNo, product_name, iCategoryNo, getQuantity(), product_price);<br />" +
      "        callGtagViewItem('view_item', viewItem);<br />" +
      "<br />" +
      "        var addToCartItem = [];<br />" +
      "        var send = XMLHttpRequest.prototype.send<br />" +
      "        XMLHttpRequest.prototype.send = function () {<br />" +
      "           this.addEventListener('load', function () {<br />" +
      "                if (this.responseURL.includes('/exec/front/order/basket/')) {<br />" +
      "                   addItem(addToCartItem, iProductNo, product_name, iCategoryNo, getQuantity(), product_price);<br />" +
      "                    callGtagAddToCart('add_to_cart', addToCartItem);<br />" +
      "               }<br />" +
      "            })<br />" +
      "            return send.apply(this, arguments)<br />" +
      "        }<br />" +
      "        btnNpay?.addEventListener('click', function (e) {<br />" +
      "           callGtagPurchase('purchase', btnNpay.children[0].id, affiliation, getQuantity() * product_price, currency, addToCartItem);<br />" +
      "        }, false);<br />" +
      "    }<br />" +
      "    <span class='grey'>// 장바구니 페이지</span><br />" +
      "    else if (cartPage) {<br />" +
      "        var send = XMLHttpRequest.prototype.send<br />" +
      "        XMLHttpRequest.prototype.send = function () {<br/ >" +
      "            this.addEventListener('load', function () {<br />" +
      "                if (this.responseURL.includes('/exec/front/order/basket/')) {<br />" +
      "                    var removeFromCartItem = [];<br />" +
      "                    $('[id^=\"' + BASKET_CHK_ID_PREFIX + '\"]').each(function (i) {<br />" +
      "                        if ($(this).is(':checked')) {<br />" +
      "                            addItem(removeFromCartItem, aBasketProductOrderData[i].product_no, aBasketProductOrderData[i].product_name, aBasketProductOrderData[i].main_cate_no, aBasketProductOrderData[i].quantity, aBasketProductOrderData[i].product_sum_price);<br />" +
      "                        }<br />" +
      "                    });<br />" +
      "                    callGtagRemoveFromCart('remove_from_cart', removeFromCartItem);<br />" +
      "                }<br />" +
      "            })<br />" +
      "            return send.apply(this, arguments)<br />" +
      "        }<br />" +
      "        var cartItem = [];<br />" +
      "        var totalPrice = 0.0;<br />" +
      "        jQuery.each(aBasketProductData, function (i) {<br />" +
      "            addItem(cartItem, aBasketProductData[i].product_no, aBasketProductData[i].product_name, aBasketProductData[i].main_cate_no, aBasketProductData[i].quantity, aBasketProductData[i].product_sum_price);<br />" +
      "            totalPrice += aBasketProductData[i].quantity * aBasketProductData[i].product_sum_price<br />" +
      "        });<br />" +
      "        btnNpay?.addEventListener('click', function (e) {<br />" +
      "           callGtagPurchase('purchase', btnNpay.children[0].id, affiliation, getQuantity() * product_price, currency, addToCartItem);<br />" +
      "        }, false);<br />" +
      "    }<br />" +
      "    <span class='grey'>// 구매완료 페이지</span><br />" +
      "    else if (purchasePage) {<br />" +
      "        var purchaseItem = [];<br />" +
      "        if (EC_FRONT_EXTERNAL_SCRIPT_VARIABLE_DATA.order_product.length > 0) {<br />" +
      "            for (var i = 0; i < EC_FRONT_EXTERNAL_SCRIPT_VARIABLE_DATA.order_product.length; i++) {<br />" +
      "                var category = '';<br />" +
      "                if (typeof EC_FRONT_EXTERNAL_SCRIPT_VARIABLE_DATA.order_product[i].category_no_3 == 'undefined') {<br />" +
      "                    category = EC_FRONT_EXTERNAL_SCRIPT_VARIABLE_DATA.order_product[i].category_no_2;<br />" +
      "                }<br />" +
      "                else {<br />" +
      "                    category = EC_FRONT_EXTERNAL_SCRIPT_VARIABLE_DATA.order_product[i].category_no_3;<br />" +
      "                }<br />" +
      "                addItem(purchaseItem, EC_FRONT_EXTERNAL_SCRIPT_VARIABLE_DATA.order_product[i].product_no, EC_FRONT_EXTERNAL_SCRIPT_VARIABLE_DATA.order_product[i].product_name, category, EC_FRONT_EXTERNAL_SCRIPT_VARIABLE_DATA.order_product[i].quantity, EC_FRONT_EXTERNAL_SCRIPT_VARIABLE_DATA.order_product[i].product_price);<br />" + 
      "            }<br />" +
      "        }<br />" +
      "        callGtagPurchase('purchase', EC_FRONT_EXTERNAL_SCRIPT_VARIABLE_DATA.order_id, affiliation, EC_FRONT_EXTERNAL_SCRIPT_VARIABLE_DATA.payed_amount, currency, purchaseItem);<br />" +
      "    }<br />" +
      "  });";
      result += "<br /><span class='grey'>&lt;/<span class='lightblue2'>script</span><span class='grey'>&gt;</span><br /><br />";
    $("#generated_ga4_script").html("<pre>" + result + "</pre>");
  });

  $("#cafe24_dr").on("click", function () { 
    let result = "<span class='grey'>&lt;</span><span class='lightblue2'>script</span><span class='grey'>&gt;</span>";
    result += `
      document.addEventListener('DOMContentLoaded', function (event) {
          var viewItemPage = /category|detail/.test(window.location.pathname);
          var cartPage = /basket/.test(window.location.pathname);
          var listPage = /list/.test(window.location.pathname);
          var searchPage = /search/.test(window.location.pathname);
          var purchasePage = /order_result/.test(window.location.pathname);
    
          var google_business_vertical = 'retail';
          var ids = [];
          var totalPrice = 0;
    
          function callGtag(eventPageType, totalPrice, ids) {
              gtag('event', eventPageType, {
                  'value': totalPrice,
                  'items': ids
              })
          }
    
          if (viewItemPage) {
              if (typeof iProductNo == 'undefined') {
                  var e = $("[id^=anchorBoxId_]");
                  for (var i = 0; i < e.length; i++) {
                      ids.push({ 'id': e[i].id.split('_')[1], 'google_business_vertical': google_business_vertical });
                  }
                  callGtag('view_item_list', '', ids);
              }
              else {
                  ids.push({ 'id': iProductNo, 'google_business_vertical': google_business_vertical });
                  callGtag('view_item', product_price, ids);
              }
          }
          else if (cartPage) {
              for (var i = 0; i < aBasketProductData.length; i++) {
                  ids.push({ 'id': aBasketProductData[i].product_no, 'google_business_vertical': google_business_vertical });
                  totalPrice += aBasketProductData[i].product_sum_price * aBasketProductData[i].quantity;
              }
              callGtag('add_to_cart', totalPrice, ids);
          }
          else if (searchPage || listPage) {
              var e = $("[id^=anchorBoxId_]");
              for (var i = 0; i < e.length; i++) {
                  ids.push({ 'id': e[i].id.split('_')[1], 'google_business_vertical': google_business_vertical });
              }
              if (listPage) {
                  callGtag('view_item_list', '', ids);
              }
              else {
                  callGtag('view_search_results', '', ids);
              }
          }
          else if (purchasePage) {
              for (var i = 0; i < EC_FRONT_EXTERNAL_SCRIPT_VARIABLE_DATA.order_product.length; i++) {
                  ids.push({ 'id': EC_FRONT_EXTERNAL_SCRIPT_VARIABLE_DATA.order_product[i].product_no, 'google_business_vertical': google_business_vertical });
              }
              callGtag('purchase', EC_FRONT_EXTERNAL_SCRIPT_VARIABLE_DATA.payed_amount, ids);
          }
      });`;
    result += "<br /><span class='grey'>&lt;/<span class='lightblue2'>script</span><span class='grey'>&gt;</span><br />";
    $("#generated_dr_script").html("<pre>" + result + "</pre>");
  });

  $("#ads_script_for_interval").on("click", function () { 
    let result = "<span class='grey'>&lt;</span><span class='lightblue2'>script</span><span class='grey'>&gt;</span>";
    result += `
      function conversions() {
        if (window.location.href.indexOf('example.html') > -1) {
          gtag('event', 'conversions', {
            'send_to': 'AW-1111/AAAA'
          });
        }

        document.querySelector('css_selector').addEventListener('click', function() {
          gtag('event', 'conversions', {
            'send_to': 'AW-1111/BBBB'
          });
        });
      }

      setInterval(conversions, 1000);`;
    result += "<br /><span class='grey'>&lt;/<span class='lightblue2'>script</span><span class='grey'>&gt;</span><br />";
    $("#generated_ads_script").html("<pre>" + result + "</pre>");
  });

  $("#ads_script_for_interval_once").on("click", function () { 
    let result = "<span class='grey'>&lt;</span><span class='lightblue2'>script</span><span class='grey'>&gt;</span>";
    result += `
      <span class='grey'>// 이 방법은 SPA웹사이트에서 쓸 수 있는 방법으로, Interval을 활용하여 스크립트를 매 1초마다 함수를 반복하여 실행합니다.</span>
      <span class='grey'>// 모든 전환 작동이 확인되면 1초마다 반복되서 실행했던 함수를 멈춤으로서 더 이상 반복될 필요 없는 스크립트 작동을 중단합니다. (count1, count2 활용)</span>
      <span class='grey'>// count1은 페이지뷰 예시, count2는 버튼 클릭일 경우의 예시입니다.</span>
      let count1 = 0;
      let count2 = 0;
      function conversions() {
        if (count1 == 0 && window.location.href.indexOf('example.html') > -1) {
          count1 = 1;
          gtag('event', 'conversions', {
            'send_to': 'AW-1111/AAAA'
          });
        }

        if (count2 == 0) {
          document.querySelector('css_selector')?.addEventListener('click', function() {
            count2 = 1;
            gtag('event', 'conversions', {
              'send_to': 'AW-1111/BBBB'
            });
          });
        }

        <span class='grey'>// 모든 전환 발생이 확인된 경우 Interval 종료.</span>
        if (count1 === 1 && count2 === 1) {
          clearInterval(conversion_interval);
        }
      }

      <span class='grey'>// 1초마다 conversion 함수가 반복되서 실행될 수 있도록 변수 할당.</span>
      let conversion_interval = setInterval(conversions, 1000);`;
    result += "<br /><span class='grey'>&lt;/<span class='lightblue2'>script</span><span class='grey'>&gt;</span><br />";
    $("#generated_ads_script").html("<pre>" + result + "</pre>");
  });

  $("#enhanced_conversion").on("click", function () { 
    let result = "<span class='grey'>&lt;</span><span class='lightblue2'>script</span><span class='grey'>&gt;</span>";
    result += `
      window.onload = conversion;

      function conversion() {
        // 페이지뷰인 경우
        if (window.location.href.indexOf('example.html') > -1) {
          // test123@gmail.com
          // test123
          let a = document.querySelector('email_selector1').value;

          // gmail.com
          let b = document.querySelector('email_selector2').value;

          if (a !== "" && b !== "") {
            let email = a + '@' + b;
            var enhanced_conversion_data = {
              'email': email
            }
          }
        }

        // 버튼 클릭인 경우
        document.querySelector('css_selector').addEventListener('click', function() {
          // test123@gmail.com
          // test123
          let a = document.querySelector('email_selector1').value;

          // gmail.com
          let b = document.querySelector('email_selector2').value;

          if (a !== "" && b !== "") {
            let email = a + '@' + b;
            var enhanced_conversion_data = {
              'email': email
            }
          }
        });
      }`;
    result += "<br /><span class='grey'>&lt;/<span class='lightblue2'>script</span><span class='grey'>&gt;</span><br />";
    $("#generated_ec_script").html("<pre>" + result + "</pre>");
  });

  $("#session_storage").on("click", function () { 
    let result = "<span class='grey'>&lt;</span><span class='lightblue2'>script</span><span class='grey'>&gt;</span>";
    result += `
      function setSessionStorageVariable() {
        let ecArr = [];

        // 페이지뷰
        if (window.location.href.indexOf('example.html') > -1) {
          let ecPhoneNo = document.querySelector('css_selector').value;
          let ecEmail = document.querySelector('css_selector').value;

          ecArr.push({
            'phone_number': ecPhoneNo,
            'email': ecEmail
          });

          sessionStorage.setItem('ecData', JSON.stringify(ecArr));
        }
      }

      function getSessionStorageVariable() {
        // 페이지뷰
        if (window.location.href.indexOf('example.html') > -1) {
          let ecData = JSON.parse(sessionStorage.getItem('ecData'));

          var enhanced_conversion_data = ecData;
        }
      }

      setSessionStorageVariable();
      getSessionStorageVariable();`;
    result += "<br /><span class='grey'>&lt;/<span class='lightblue2'>script</span><span class='grey'>&gt;</span><br />";
    $("#generated_ec_script").html("<pre>" + result + "</pre>");
  });

  $("#javascript_validation").on("click", function () { 
    let result = "<span class='grey'>&lt;</span><span class='lightblue2'>script</span><span class='grey'>&gt;</span>";
    result += `
      // 자바스크립트 기본 Input Validation
      function validate(str) {
        return str == "" || str == null ? false : true;
      }

      // 특정 페이지 조회한 경우
      if (window.location.href.indexOf('example.html') > -1) {
        if (validate(document.querySelector('css_selector1').value) && 
            validate(document.querySelector('css_selector2').value) &&
            validate(document.querySelector('css_selector3').value)) {
              gtag('event', 'conversions', {
                'send_to': 'AW-1111/AAAA'
              });
        }
      }

      // 버튼 클릭한 경우
      document.querySelector('css_selector').addEventListener('click', function() {
        if (validate(document.querySelector('css_selector1').value) && 
            validate(document.querySelector('css_selector2').value) &&
            validate(document.querySelector('css_selector3').value)) {
              gtag('event', 'conversions', {
                'send_to': 'AW-1111/AAAA'
              });
        }
      });`;
    result += "<br /><span class='grey'>&lt;/<span class='lightblue2'>script</span><span class='grey'>&gt;</span><br />";
    $("#generated_ads_script").html("<pre>" + result + "</pre>");
  });

  $("#makeshop_dr").on("click", function () { 
    let result = "<span class='grey'>&lt;</span><span class='lightblue2'>script</span><span class='grey'>&gt;</span>";
    result += `
      // VIEW ITEM
      document.addEventListener('DOMContentLoaded', function(event) {
        var ids = [];
        ids.push({ 'id': '<!--/number/-->', 'google_business_vertical': 'retail' });
        totalPrice = ('<!--/number/price_sell/-->').replace(/[^0-9]/g, "");
        dataLayer.push({
            'EventPageType' : 'view_item',
            'Total_Price' : totalPrice,
            'Items' : ids,
            'event':'dynamic_remarketing'
        });
      });

      // VIEW ITEM LIST
      document.addEventListener('DOMContentLoaded', function(event) {
        var totalPrice = 0;
        var ids = [];
        <!--/loop_product/-->
            ids.push({ 'id': '<!--/product@uid/-->', 'google_business_vertical': 'retail' });
            totalPrice += Number('<!--/product@price_sell/-->');
        <!--/end_loop/-->
        gtag('event', 'view_item_list', {
            'send_to': 'AW-11111111',
            'value': totalPrice,
            'items': ids
        });
      });

      // ADD TO CART
      document.addEventListener('DOMContentLoaded', function(event) {
        var ids = [];
        var getID = document.getElementsByName('branduid');
        for(var i = 0; i < getID.length; i++){
            ids.push({ 'id': getID[i].value, 'google_business_vertical': 'retail' });
        }
        gtag('event', 'add_to_cart', {
            'send_to': 'AW-11111111',
            'value': Number($('.MK_chg_none_groupsale_total_price_sell.MK_change_price').text().replace(/[^0-9]/g, '')),
            'items': ids
        });
      });

      // PURCHASE
      document.addEventListener('DOMContentLoaded', function(event) {
        var ids = [];
        var totalPrice = '<!--/pay_price/-->';
        <!--/loop_order_product/-->
            ids.push({ 'id': '<!--/order_product@product_id/-->', 'google_business_vertical': 'retail'});
        <!--/end_loop/-->
        gtag('event', 'purchase', {
            'send_to': 'AW-11111111',
            'value': totalPrice,
            'items': ids
        });
      });`;
    result += "<br /><span class='grey'>&lt;/<span class='lightblue2'>script</span><span class='grey'>&gt;</span><br />";
    $("#generated_dr_script").html("<pre>" + result + "</pre>");
  });

  $("#ga4_event_template").on("click", function () { 
    let result =
      "<span class='grey'>&lt;</span><span class='lightblue2'>script</span><span class='grey'>&gt;</span>";
    result +=`
    gtag("event", "event_name", {
      "event_parameter1_name": "value_or_variable"
    });`;
    result += "<br /><span class='grey'>&lt;/<span class='lightblue2'>script</span><span class='grey'>&gt;</span><br />";
    $("#generated_ga4_script").html("<pre>" + result + "</pre>");
  });

  $("#ga4_eec_template").on("click", function () { 
    let result =
      "<span class='grey'>&lt;</span><span class='lightblue2'>script</span><span class='grey'>&gt;</span>";
    result +=`
    // 아래 나와 있는 items은 예제이므로 items: 에는 Array(배열) 형태로 넣어주어야 한다 
    // (for 반복문 등을 활용하여 item_id, item_name, currency, price, quantity를 포함한 객체를 배열에 저장하여 할당해준다)
    // 상세페이지 (상품 페이지 조회)
    if (window.location.href.indexOf("view_item_page") > -1) {
      var view_item_price = +document.querySelector("css_selector").innerText.replace(/[^\d]/g, '')
      gtag("event", "view_item", {
        currency: "KRW",
        value: view_item_price,
        items: [
          {
            item_id: "1",
            item_name: "Product Name",
            currency: "KRW",
            price: 123.45
            quantity: 1
          }
        ]
      });
    }

    // 장바구니
    if (window.location.href.indexOf("cart_page") > -1) {
      var cart_price = +document.querySelector("css_selector").innerText.replace(/[^\d]/g, '')
      gtag("event", "add_to_cart", {
        currency: "KRW",
        value: cart_price,
        items: [
          {
            item_id: "1",
            item_name: "Product Name",
            currency: "KRW",
            price: 123.45
            quantity: 1
          }
        ]
      });
    }

    // 결제시작
    if (window.location.href.indexOf("begin_checkout_page") > -1) {
      var begin_checkout_price = +document.querySelector("css_selector").innerText.replace(/[^\d]/g, '')
      gtag("event", "begin_checkout", {
        currency: "KRW",
        value: begin_checkout_price,
        items: [
          {
            item_id: "1",
            item_name: "Product Name",
            currency: "KRW",
            price: 123.45
            quantity: 1
          }
        ]
      });
    }
    
    // 구매완료 
    if (window.location.href.indexOf("purchase_done_page") > -1) {
      var purchase_price = +document.querySelector("css_selector").innerText.replace(/[^\d]/g, '')
      gtag("event", "purchase", {
        currency: "KRW",
        value: purchase_price,
        items: [
          {
            item_id: "1",
            item_name: "Product Name",
            currency: "KRW",
            price: 123.45
            quantity: 1
          }
        ]
      });
    }`;
    result += "<br /><span class='grey'>&lt;/<span class='lightblue2'>script</span><span class='grey'>&gt;</span><br />";
    $("#generated_ga4_script").html("<pre>" + result + "</pre>");
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
  function performCopy(value) {
    let textArea = document.createElement("textarea");
    document.body.appendChild(textArea);
    textArea.value = value;
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);
  }
  $("#ads_copy").on("click", function() {
    let value = document.querySelector("#generated_ads_script").innerText;
    performCopy(value);
  });
  $("#ua_copy").on("click", function() {
    let value = document.querySelector("#ua_generated_script").innerText;
    performCopy(value);
  });
  $("#ga4_copy").on("click", function() {
    let value = document.querySelector("#generated_ga4_script").innerText;
    performCopy(value);
  });
  $("#ec_copy").on("click", function() {
    let value = document.querySelector("#generated_ec_script").innerText;
    performCopy(value);
  });
  $("#dr_copy").on("click", function() {
    let value = document.querySelector("#generated_dr_script").innerText;
    performCopy(value);
  });
  $("#gmc_copy").on("click", function() {
    let value = document.querySelector("#generated_gmc_script").innerText;
    performCopy(value);
  });
  $("#cms_copy").on("click", function() {
    let value = document.querySelector("#generated_cms_script").innerText;
    performCopy(value);
  });
});

