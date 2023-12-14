$(document).ready(function () {
  // UA ID
  let ua_id = "UA-XXXX";
  let ua_brand = "Google";

  // GA4 ID
  let ga4_id = "G-XXXX";
  let ga4_brand = "Google";

  // UA KEYUP EVENTS
  document.querySelector("#ua_id")?.addEventListener("keyup", (e) => {
    ua_id = e.target.value;
  });

  document.querySelector("#ua_brand")?.addEventListener("keyup", (e) => {
    ua_brand = e.target.value;
  });

  // GA4 KEYUP EVENTS
  document.querySelector("#ga4_id")?.addEventListener("keyup", (e) => {
    ga4_id = e.target.value;
  });

  document.querySelector("#ga4_brand")?.addEventListener("keyup", (e) => {
    ga4_brand = e.target.value;

  });

  // ADS CONVERSION
  let ads_conversion_size = 0;

  $("#ads_add_button").on("click", function () {
    ads_conversion_size++;
    $("#ads_conditions").append(
      "<table class='table table-borderless'><tbody><tr><td><p id=" +
        ads_conversion_size +
        "><span class='btn btn-warning'>Conversion " +
        ads_conversion_size +
        " </span></p></td><td>Type: <select class='conversion_type'><option value='pageview_equal'>Page View (Equal)</option><option value='pageview_contain'>Page View (Contain)</option><option value='click'>Click</option><option value='all_clicks'>All Clicks</option></select></td><td>URL/Selector: <input type='text' class='ads_page_url_or_selector'/></td><td>Conversion ID: <input type='text' class='ads_cid'/></td><td></tr><tr><td>Conversion Label: <input type='text' class='ads_clabel'/></td><td>Conversion value: <input type='text' class='ads_cvalue'/><br /><br />Including QuerySelector: <input type='checkbox' class='ads_cvalue_querySelector' checked/><br /><br />Appending .value: <input type='checkbox' class='ads_cvalue_append_value'/><br /><br />Appending .innerText: <input type='checkbox' class='ads_cvalue_append_innerText' checked/><br /><br />Including Regex: <input type='checkbox' class='ads_cvalue_regex'/><br /><br />String to Number: <input type='checkbox' class='ads_cvalue_change' checked/></td><td>Transaction ID: <input type='text' class='ads_tid'/><br /><br />Including QuerySelector: <input type='checkbox' class='ads_tid_querySelector' checked/><br /><br />Appending .value: <input type='checkbox' class='ads_tid_append_value'/><br /><br />Appending .innerText: <input type='checkbox' class='ads_tid_append_innerText' checked/><br /><br />Including Regex: <input type='checkbox' class='ads_tid_regex'/></td><td>Currency: <input type='text' class='ads_currency'/><br /><br />Comment: <input type='text' class='ads_comment'/></td></tr></tbody></table>"
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
    result += "<span class='grey'>// Sixshop Purchase Price 보통 2형태가 있는데 아래 방법으로 되면 2번째 방법은 사용할 필요 없습니다.</span><br />";
    result += "function() {<br />";
    result += "  return document.querySelector('input[type=hidden]').value.replace(/[^\\d]/g, '');";
    result += "}<br /><br />";
    result += "function() {<br />";
    result += "  if (window.location.href.indexOf('payment/success/inicisPay') > -1) {<br />";
    result += "    return document.querySelector('#content_div > div.content.designSettingElement.text-body > div:nth-child(4) > input:nth-child(3)').value.replace(/[^\\d]/g, '');<br />";
    result += "  } else if (window.location.href.indexOf('payment/request/withoutBank') > -1) {<br />";
    result += "    return document.querySelector('#content_div > div.content.designSettingElement.text-body > div:nth-child(6) > input:nth-child(3)').value.replace(/[^\\d]/g, '');<br />"
    result += "  }<br />"
    result += "}<br /><br />";
    $("#generated_ads_script").html("<pre>" + result + "</pre>");
  });

  $("#ads_script_for_cafe24_variables").on("click", function () { 
    let result = "<span class='grey'>&lt;</span><span class='lightblue2'>script</span><span class='grey'>&gt;</span><br />";
    result += "  <span class='grey'>// 카페24 주요 페이지</span><br />";
    result += "  var viewItemPage = /category|detail/.test(window.location.pathname);<br />";
    result += "  var cartPage = /basket/.test(window.location.pathname);<br />";
    result += "  var checkoutPage = /orderform/.test(window.location.pathname);<br />";
    result += "  var purchasePage = /order_result/.test(window.location.pathname);<br /><br />";
    result += "  var signupCompletePage = /join_result/.test(window.location.pathname);<br /><br />";
    result += "  <span class='grey'>// 카페24 치환 변수</span><br />";
    result += "  var orderProductLength = EC_FRONT_EXTERNAL_SCRIPT_VARIABLE_DATA.order_product.length;<br />";
    result += "  var totalPrice = EC_FRONT_EXTERNAL_SCRIPT_VARIABLE_DATA.payed_amount;<br />";
    result += "  var transactionId = EC_FRONT_EXTERNAL_SCRIPT_VARIABLE_DATA.order_id;<br />";
    result += "  var quantity = EC_FRONT_EXTERNAL_SCRIPT_VARIABLE_DATA.order_product[i].quantity;<br />";
    result += "  var price = EC_FRONT_EXTERNAL_SCRIPT_VARIABLE_DATA.order_product[i].product_price;<br /><br />";
    result += "  <br /><br />";
    result += "  // 아래 EC_FRONT 구글 애즈에서 자바스크립트 변수로 향상된 전환에 넣으시면 바로 적용됩니다. 세미콜론은 빼주셔야 합니다<br />";
    result += "  var emailAddressForEC = EC_FRONT_EXTERNAL_SCRIPT_VARIABLE_DATA.common_member_email; <br /><br />";
    result += "  <span class='grey'>// 카페24 구매 완료 코드 예제</span><br />";
    result += "  if (window.location.href.indexOf('order_result') > -1) {<br />";
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
    document.querySelector("#ua_id").value = "";
    document.querySelector("#ua_brand").value = "";
    let result = "";
    result += `
아래 UA-XXXX는 고객의 추적 ID로 반드시 교체해서 사용.
&lt;!-- Global site tag (gtag.js) - Google Analytics -->
<span class='grey'>&lt;</span><span class='lightblue2'>script</span><span class='grey'></span> async src="https://www.googletagmanager.com/gtag/js?id=${ua_id}"><span class='grey'>&lt;/</span><span class='lightblue2'>script</span><span class='grey'>&gt;</span>
<span class='grey'>&lt;</span><span class='lightblue2'>script</span><span class='grey'>&gt;</span>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', '${ua_id}');
<span class='grey'>&lt;/</span><span class='lightblue2'>script</span><span class='grey'>&gt;</span>
    <br />`;

    result += "<span class='grey'>&lt;</span><span class='lightblue2'>script</span><span class='grey'>&gt;</span>";
    result += `
  window.addEventListener('load', function(event) {
    <span class='grey'>// UA (Universal Analytics) E-Commerce (전자상거래) 코드 (카페24용)</span>
    <span class='grey'>// 유니버셜 애널리틱스 추적코드 ID</span>
    const ANALYTICS_TRACKING_ID = "${ua_id}";

    <span class='grey'>// 페이지 변수</span>
    var viewItemPage = /category|detail/.test(window.location.pathname);
    var cartPage = /basket/.test(window.location.pathname);
    var checkoutPage = /orderform/.test(window.location.pathname);
    var purchasePage = /order_result/.test(window.location.pathname);

    <span class='grey'>// 공통 변수 (웹사이트에 따라 적절하게 변경하세요)</span>
    var brand = '${ua_brand}';
    var affiliation = '${ua_brand}';
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
            "send_to": ANALYTICS_TRACKING_ID,
            "items": items
        });
    }

    function callGtagPurchase(pageType, transaction_id, affiliation, totalPrice, currency, items){
        gtag('event', pageType, {
            "send_to": ANALYTICS_TRACKING_ID,
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

  $("#godomall_ua_eec").on("click", function () {
    document.querySelector("#ua_id").value = "";
    document.querySelector("#ua_brand").value = "";
    let result = "";
    result += `
&lt;!-- 고도몰 UA 전자상거래 코드 (아래 UA-XXXX는 고객의 추적 ID로 반드시 교체해서 사용한다) -->
&lt;!-- Global site tag (gtag.js) - Google Analytics -->
<span class='grey'>&lt;</span><span class='lightblue2'>script</span><span class='grey'></span> async src="https://www.googletagmanager.com/gtag/js?id=${ua_id}"><span class='grey'>&lt;/</span><span class='lightblue2'>script</span><span class='grey'>&gt;</span>
<span class='grey'>&lt;</span><span class='lightblue2'>script</span><span class='grey'>&gt;</span>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', '${ua_id}');
<span class='grey'>&lt;/</span><span class='lightblue2'>script</span><span class='grey'>&gt;</span>
    <br />`;
 
    result += "<span class='grey'>&lt;</span><span class='lightblue2'>script</span><span class='grey'>&gt;</span>";
    result += `
    window.addEventListener('load', function (event) {
      // 고도몰 Universal Analytics 전자상거래 스크립트
      // 유니버셜 애널리틱스 추적 코드 UA-XXXX를 고객 추적 코드로 반드시 변경!
      const ANALYTICS_TRACKING_ID = "${ua_id}";

      // 페이지 변수
      var viewItemPage = /goods_view/.test(window.location.pathname);
      var cartPage = /cart/.test(window.location.pathname);
      var checkout = /order.php/.test(window.location.pathname);
      var purchasePage = /order_end/.test(window.location.pathname);

      var listName = 'Search Results';

      // Affiliation과 Brand명을 적절하게 바꿔주세요.
      var affiliation = '${ua_brand}';
      var brand = '${ua_brand}';
      var currency = 'KRW';

      var btnAddToCart = document.querySelector("#frmView > div > div > div.btn_choice_box > div > button.btn_add_cart");
      var btnNpay = $('.npay_btn_link.npay_btn_pay');

      function getQuantity() {
          var quantity = $('[name^="goodsCnt"]');
          if (quantity.length == 1) {
              return Number($('[name^="goodsCnt"]').val());
          }
          else {
              return 1;
          }
      }
      function callGtag(pageType, items) {
          gtag('event', pageType, {
              "send_to": ANALYTICS_TRACKING_ID,
              "items": items
          });
      }
      function callGtagPurchase(pageType, transaction_id, affiliation, totalPrice, currency, items) {
          gtag('event', pageType, {
              "send_to": ANALYTICS_TRACKING_ID,
              "transaction_id": transaction_id,
              "affiliation": affiliation,
              "value": totalPrice,
              "currency": currency,
              "tax": 0,
              "shipping": 0,
              "items": items
          });
      }
      function addItem(item, id, name, category, quantity, price) {
          item.push({
              'id': id,
              'name': name,
              'list_name': listName,
              'brand': brand,
              'category': category,
              'quantity': quantity,
              'price': price
          })
      }
      if (viewItemPage) {
          var allItems = [];
          var price = $('input[name=set_goods_price]').val();
          var proId = goodsNo;
          var proName = $('meta[property="og:title"]').attr('content');
          var proCate = $('input[name=cateCd]').val();

          addItem(allItems, proId, proName, proCate, getQuantity(), price);
          callGtag('view_item', allItems);
          btnAddToCart.addEventListener('click', function () {
              var item = [];
              addItem(item, proId, proName, proCate, getQuantity(), price);
              callGtag('add_to_cart', item);
          }, false);
          btnNpay.click(function () {
              var npayProducts = [];
              addItem(npayProducts, proId, proName, proCate, getQuantity(), price);
              callGtag('begin_checkout', npayProducts);
              callGtagPurchase('purchase', btnNpay.attr('id'), affiliation, price * getQuantity(), currency, npayProducts);
          });
      }
      else if (cartPage) {
          jQuery('#frmCart').submit(function (event) {
              var proCnt = document.querySelectorAll('.cart_item_list .form_element').length;
              var products = [];
              for (var i = 0; i < proCnt; i++) {
                  addItem(products, document.querySelectorAll('.cart_item_list .form_element')[i].firstElementChild.dataset['goodsNo'], document.querySelectorAll('.cart_item_list .form_element')[i].firstElementChild.dataset['goodsNm'], '', document.querySelectorAll('.cart_item_list .form_element')[i].firstElementChild.dataset['defaultGoodsCnt'], Number(document.querySelectorAll('.cart_item_list .form_element')[i].firstElementChild.dataset['price']));
              }
              var checked = document.querySelectorAll('.check_s');
              var removedProduct = [];
              var newProductIndex = 0;
              for (var i = 0; i < checked.length - 1; i++) {
                  var getClassName = checked[i + 1].className;
                  if (getClassName.includes('on')) {
                      removedProduct[newProductIndex] = products[i];
                      newProductIndex++;
                  }
              }
              callGtag('remove_from_cart', removedProduct);
          });
          btnNpay.click(function () {
              var proCnt = document.querySelectorAll('.cart_item_list .form_element').length;
              var npayProducts = [];
              var totalPrice = 0;
              for (var i = 0; i < proCnt; i++) {
                  addItem(npayProducts, document.querySelectorAll('.cart_item_list .form_element')[i].firstElementChild.dataset['goodsNo'], document.querySelectorAll('.cart_item_list .form_element')[i].firstElementChild.dataset['goodsNm'], '', document.querySelectorAll('.cart_item_list .form_element')[i].firstElementChild.dataset['defaultGoodsCnt'], Number(document.querySelectorAll('.cart_item_list .form_element')[i].firstElementChild.dataset['price']));
                  totalPrice += Number(document.querySelectorAll('.cart_item_list .form_element')[i].firstElementChild.dataset['price'])
              }
              callGtag('begin_checkout', npayProducts);
              callGtagPurchase('purchase', btnNpay.attr('id'), affiliation, totalPrice, currency, npayProducts);
          });
      }
      else if (checkout) {
          var listOfItems = $('[name^="priceInfo"]');
          var checkoutProducts = [];
          for (var i = 0; i < listOfItems.length; i++) {
              var JsonItems = JSON.parse(listOfItems[i].value);
              addItem(checkoutProducts, listOfItems[i].name.replace('priceInfo[', '').split('][')[0], $('.pick_add_info')[i].children[0].innerText, JsonItems.goodsCnt, JsonItems.baseGoodsPrice);
          }
          callGtag('begin_checkout', checkoutProducts);
          btnNpay.click(function () {
              var npayProducts = [];
              addItem(npayProducts, proId, proName, proCate, getQuantity(), price);
              callGtagPurchase('purchase', btnNpay.attr('id'), affiliation, price * getQuantity(), currency, npayProducts);
          })
      }
      else if (purchasePage) {
          var e = $('input[name=naver-common-inflow-script-order-item]');
          var totalPrice = 0;
          var purchaseProducts = [];
          for (var i = 0; i < e.length; i++) {
              var detail = eval('(' + e[i].value + ')');
              addItem(purchaseProducts, detail.goodsno, detail.goodsnm, detail.sno, detail.ea, detail.price / detail.ea);
              totalPrice += detail.price;
          }
          callGtagPurchase('purchase', eval('(' + e[0].value + ')').ordno, affiliation, totalPrice, currency, purchaseProducts);
      }
  });`;
    result += "<br /><span class='grey'>&lt;/<span class='lightblue2'>script</span><span class='grey'>&gt;</span><br />";
    $("#ua_generated_script").html("<pre>" + result + "</pre>");
  });

  $("#imweb_ua_eec").on("click", function () { 
    document.querySelector("#ua_id").value = "";
    document.querySelector("#ua_brand").value = "";
    let result = "<span class='grey'>&lt;</span><span class='lightblue2'>script</span><span class='grey'>&gt;</span>";
    result += `
  window.addEventListener('load', function(event) {
    // UA (Universal Analytics) E-Commerce (전자상거래) 코드 (아임웹)
    // 아임웹은 자체 설정에서 Google 애널리틱스 전자상거래 옵션을 사용으로 바꿔주면 된다. 아래 코드는 하드 코딩으로 구현하는 경우에 사용하면 된다.
    // 공통변수 (웹사이트에 따라 적절하게 변경하세요) (네이버 페이 아직 미포함했으니 네이버 페이 경우에는 별도로 코드 추가 요함!!! 추후 추가 예정)
    var brand = '${ua_brand}';
    var affiliation = '${ua_brand}';
    var listName = 'Search Results';
    var currency = 'KRW';

    // 제품 상세 페이지 조회
    if (window.location.href.indexOf("?idx=") > -1) {
        gtag('event', 'view_item', {
            "items": [
                {
                    "id": window.location.href.split("?idx=")[1] || "",
                    "name": document.querySelector("#prod_goods_form > header > div.view_tit.no-margin-top.title_font_style").innerText, 
                    "list_name": listName,
                    "brand": brand,
                    "price": +document.querySelector("#prod_goods_form > header > div.pay_detail.full-width > div.holder.table-row > span > span").innerText.replace(/[^\\d]/g, '')
                }
            ]
        });
    }

    // 장바구니 페이지 조회 
    if (window.location.href.indexOf("shop_cart") > -1) {
        var cartList = document.querySelectorAll("table > tbody > tr.content");
        var idList = document.querySelectorAll(".cart-item-wrap");
        var nameList = document.querySelectorAll(".cart-item-title");
        var quantityList = document.querySelectorAll("td.amount.td-blocked");
        var priceList = document.querySelectorAll("td.price.td-blocked");
        var items = [];

        cartList.forEach((value, i) => {
            items.push({
                "id": idList[i].href.split("?idx=")[1],
                "name": nameList[i].innerText,
                "list_name": listName,
                "brand": brand,
                "quantity": +quantityList[i].innerText.replace(/[^\\d]/g, ''),
                "price": +priceList[i].innerText.replace(/[^\\d]/g, ''),
            })
        });

        console.log('add_to_cart', items);
        gtag('event', 'add_to_cart', {
            "items": items
        });
    }

    // Begin Checkout 페이지 조회 (결제 시작 페이지)
    if (window.location.href.indexOf("shop_payment") > -1) {
        var checkoutList = document.querySelectorAll(".shop_item_thumb");
        var idList = document.querySelectorAll(".shop_item_thumb > a");
        var nameList = document.querySelectorAll(".shop_item_title");
        var quantityList = document.querySelectorAll(".shop_item_opt");
        var priceList = document.querySelectorAll(".shop_item_pay > span:nth-child(1)"); 
        var items = [];

        checkoutList.forEach((value, i) => {
            items.push({
                "id": idList[i].href.split("?idx=")[1],
                "name": nameList[i].innerText,
                "list_name": listName,
                "brand": brand,
                "quantity": +quantityList[i].innerText.split(" - ")[1].replace(/[^\\d]/g, ''),
                "price": +priceList[i].innerText.replace(/[^\\d]/g, ''),
            })
        });

        localStorage.removeItem('products');
        localStorage.setItem('products', JSON.stringify(items));
        console.log('begin_checkout', items);
        gtag('event', 'begin_checkout', {
            "items": items
        });
    }

    if (window.location.href.indexOf("shop_payment_complete") > -1) {
        var items = JSON.parse(localStorage.getItem('products'));
        var transaction_id = document.querySelector("#w20210726dfced3bde2579 > div > div > div.table_payment_complete > table > tbody > tr:nth-child(2) > td").innerText;
        var totalPrice = 0;
        items.forEach((item) => totalPrice += item.price);
        gtag('event', 'purchase', {
            "transaction_id": transaction_id,
            "affiliation": affiliation,
            "value": totalPrice,
            "currency": currency,
            "items": items
        });
    }
  });`;
    result += "<br /><span class='grey'>&lt;/<span class='lightblue2'>script</span><span class='grey'>&gt;</span><br />";
    $("#ua_generated_script").html("<pre>" + result + "</pre>");
  });

  $("#makeshop_ua_eec_for_pc").on("click", function () { 
    document.querySelector("#ua_id").value = "";
    document.querySelector("#ua_brand").value = "";
    let result = `
  &lt;!-- 
  구매완료는 치환코드가 있기 때문에 코드 변경 불필요하지만 
  나머지 상세페이지, 장바구니 등은 웹사이트마다 코드가 살짝 다르기 때문에
  개발자 통해서 이 부분 구현하거나 여건이 된다면 코드 수정 지원해줘도 되지만
  구매완료 부분만 코드 제공해도 무방하다. 
  구매완료 코드는 &lt;head></head> 사이가 아니라 디자인 부분 주문완료 코드에 넣어야 작동되니 주의해야 한다.
  글로벌 사이트 태그(gtag)는 &lt;head></head>에 이미 삽입되어 있어야 한다.
  아래 코드는 메이크샵용 구매완료 코드이며 brand, affiliation만 적절하게 바꿔서 코드 제공한다.
  그 아래 코드에는 제품상세페이지, 장바구니용 템플릿 코드도 포함해서 보내니 참고해서 가이드한다. -->

  &lt;script>
    var products = [];
    var brand = "${ua_brand}";
    var affiliation = "${ua_brand}";
    &lt;!--/loop_order_product/-->
    var goods_price = ('&lt;!--/order_product@price/-->').replace(/[^0-9]/g, '');
    products.push({
      'item_name': '&lt;!--/order_product@name/-->',
      'item_id': '&lt;!--/order_product@product_id/-->',
      'price': goods_price,
      'item_brand': brand,
      'quantity': '&lt;!--/order_product@amount/-->'
    });
    &lt;!--/end_loop/-->
    gtag('event', 'purchase', {
      "transaction_id": '&lt;!--/order_num/-->',
      "affiliation": affiliation,
      "value": '&lt;!--/pay_price/-->',
      "currency": "KRW",
      "items": products
    });
  &lt;/script>`;
    result += "<br /><br /><span class='grey'>&lt;</span><span class='lightblue2'>script</span><span class='grey'>&gt;</span>";
    result += `
  window.addEventListener('load', function(event) {
    // UA (Universal Analytics) E-Commerce (전자상거래) 코드 (메이크샵) PC버전 (모바일 버전은 아직 제작중...)
    // 공통변수 (웹사이트에 따라 적절하게 변경하세요) (네이버 페이 미포함 버전이니 네이버 페이 경우에는 별도로 코드 추가 요함!!!)
    var brand = '${ua_brand}';
    var affiliation = '${ua_brand}';
    var listName = 'Search Results';
    var currency = 'KRW';

    // 제품 상세 페이지 조회 (id, name, price가 메이크샵 웹사이트마다 다르기 때문에 반드시 체크 필요함!)
    if (window.location.href.indexOf("shopdetail.html") > -1) {
        gtag('event', 'view_item', {
            "items": [
                {
                    "id": document.querySelector("input[name='branduid']").value,
                    "name": document.title.replace(/[\\[\\]]+/g,''), 
                    "list_name": listName,
                    "brand": brand,
                    "price": +document.querySelector("#form1 > div > table > tbody > tr:nth-child(1) > td > div > strong").innerText.replace(/[^\\d]/g, '')
                }
            ]
        });

        console.log('view_item', items);
        localStorage.removeItem('products');
        localStorage.setItem('products', JSON.stringify(items));
    }

    // 장바구니 페이지 조회
    if (window.location.href.indexOf("shop/basket") > -1) {
        var idList = document.querySelectorAll("tr > td > div > div.thumb > a");
        var nameList = document.querySelectorAll("tr > td > div.tb-left > a");
        var quantityList = document.querySelectorAll(".opt-spin > input");
        var priceList = document.querySelectorAll(".tb-price");
        var items = [];

        for (var i = 0; i < idList.length; i++) {
            items.push({
                "id": idList[i].href.split("branduid=")[1].split("&xcode")[0],
                "name": nameList[i].innerText,
                "list_name": listName,
                "brand": brand,
                "quantity": +quantityList[i].value.replace(/[^\\d]/g, ''),
                "price": +priceList[i].innerText.replace(/[^\\d]/g, ''),
            });
        }

        console.log('add_to_cart', items);
        gtag('event', 'add_to_cart', {
            "items": items
        });

        localStorage.removeItem('products');
        localStorage.setItem('products', JSON.stringify(items));
    }

    // Begin Checkout 페이지 조회 (결제 시작 페이지)
    if (window.location.href.indexOf("shop/order.html") > -1) {
        var items = JSON.parse(localStorage.getItem('products'));
        console.log('begin_checkout', items);
        gtag('event', 'begin_checkout', {
            "items": items
        });
    }

    // 결제 완료 페이지 조회
    if (window.location.href.indexOf("shop/orderend") > -1) {
        var items = JSON.parse(localStorage.getItem('products'));
        var transaction_id = window.location.href.split("ordernum=")[1].split("&pay")[0];
        gtag('event', 'purchase', {
            "transaction_id": transaction_id,
            "affiliation": affiliation,
            "value": +document.querySelector("#mk_totalprice").innerText.replace(/[^\\d]/g, ''),
            "currency": currency,
            "items": items
        });
    }
  });`;
    result += "<br /><span class='grey'>&lt;/<span class='lightblue2'>script</span><span class='grey'>&gt;</span><br />";
    $("#ua_generated_script").html("<pre>" + result + "</pre>");
  });

  $("#sixshop_ua_eec").on("click", function () { 
    document.querySelector("#ua_id").value = "";
    document.querySelector("#ua_brand").value = "";
    let result = "<span class='grey'>&lt;</span><span class='lightblue2'>script</span><span class='grey'>&gt;</span>";
    result += `
  window.addEventListener('load', function(event) {
    // UA (Universal Analytics) E-Commerce (전자상거래) 코드 (식스샵)
    // 공통변수 (웹사이트에 따라 적절하게 변경하세요) (네이버 페이 미포함 버전이니 네이버 페이 경우에는 별도로 코드 추가 요함!!!)
    var brand = '${ua_brand}';
    var affiliation = '${ua_brand}';
    var listName = 'Search Results';
    var currency = 'KRW';

    // 제품 상세 페이지 조회 
    if (window.location.href.indexOf("product") > -1) {
        var price = 
            document.querySelector("#shopProductPrice > span.productDiscountPriceSpan") == null ? 
            +document.querySelector("#shopProductPrice")?.innerText.replace(/[^\\d]/g, '') :
            +document.querySelector("#shopProductPrice > span.productDiscountPriceSpan")?.innerText.replace(/[^\\d]/g, '');

        gtag('event', 'view_item', {
            "items": [
                {
                    "id": document.querySelector("#shopProductImgsDiv").attributes["imgsrc"].value.split("/image_")[1].split(".")[0],
                    "name": document.querySelector("#shopProductName").innerText, 
                    "list_name": listName,
                    "brand": brand,
                    "price": price,
                }
            ]
        });

        console.log('view_item', items);
    }

    // 장바구니 페이지 조회
    if (window.location.href.indexOf("cart") > -1) {
        var idList = document.querySelectorAll("div.product > div.img > a > img"); 
        var nameList = document.querySelectorAll("div.product > div.text > div.name > a");
        var quantityList = document.querySelectorAll("div.QuantityDiv > span > input");
        var priceList = document.querySelectorAll("div.shopCartPrice.price");
        var items = [];

        for (var i = 0; i < idList.length; i++) {
            items.push({
                "id": idList[i].src.split("/image_")[1].split(".")[0],
                "name": nameList[i].innerText,
                "list_name": listName,
                "brand": brand,
                "quantity": +quantityList[i].value.replace(/[^\\d]/g, ''),
                "price": +priceList[i].innerText.replace(/[^\\d]/g, ''),
            });
        }

        console.log('add_to_cart', items);
        gtag('event', 'add_to_cart', {
            "items": items
        });
    }

    // Begin Checkout 페이지 조회 (결제 시작 페이지)
    if (window.location.href.indexOf("/order/") > -1) {
        var idList = document.querySelectorAll(".order-item-thumbnail"); 
        var nameList = document.querySelectorAll(".item-title");
        var quantityList = document.querySelectorAll(".item-qty-and-price-wrapper");
        var priceList = document.querySelectorAll(".item-qty-and-price-wrapper");
        var items = [];

        for (var i = 0; i < idList.length; i++) {
            items.push({
                "id": idList[i].src.split("/image_")[1].split(".")[0],
                "name": nameList[i].innerText,
                "list_name": listName,
                "brand": brand,
                "quantity": +quantityList[i].innerText.split("개")[0].replace(/[^\\d]/g, ''),
                "price": +priceList[i].innerText.split("/")[1].replace(/[^\\d]/g, ''),
            });
        }

        gtag('event', 'begin_checkout', {
            "items": items
        });

        localStorage.removeItem('products');
        localStorage.setItem('products', JSON.stringify(items));
    }

    // Purchase Done
    if (window.location.href.indexOf("/payment/") > -1) {
        var items = JSON.parse(localStorage.getItem('products'));
        var transaction_id = document.querySelector('#content_div > div.content.designSettingElement.text-body > div:nth-child(2) > input').value;
        var totalPrice = 0;
        items.forEach((item) => totalPrice += item.price);
        gtag('event', 'purchase', {
            "transaction_id": transaction_id,
            "affiliation": affiliation,
            "value": totalPrice,
            "currency": currency,
            "items": items
        });
    }
  });`;
    result += "<br /><span class='grey'>&lt;/<span class='lightblue2'>script</span><span class='grey'>&gt;</span><br />";
    $("#ua_generated_script").html("<pre>" + result + "</pre>");
  });

  $("#cafe24_ga4_eec").on("click", function () { 
    document.querySelector("#ga4_id").value = "";
    document.querySelector("#ga4_brand").value = "";
    let result = "";
    result += `
&lt;!-- 구글 애널리틱스4 전자상거래 (카페24) 고객의 추적코드로 G-XXXX 부분 반드시 교체 요망! -->
&lt;!-- Global site tag (gtag.js) - Google Analytics -->
<span class='grey'>&lt;</span><span class='lightblue2'>script</span><span class='grey'></span> async src="https://www.googletagmanager.com/gtag/js?id=${ga4_id}"><span class='grey'>&lt;/</span><span class='lightblue2'>script</span><span class='grey'>&gt;</span>
<span class='grey'>&lt;</span><span class='lightblue2'>script</span><span class='grey'>&gt;</span>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', '${ga4_id}');
<span class='grey'>&lt;/</span><span class='lightblue2'>script</span><span class='grey'>&gt;</span><br /><br />`;
    result += "<span class='grey'>&lt;</span><span class='lightblue2'>script</span><span class='grey'>&gt;</span><br />";
    result +=  "  window.addEventListener('load', function (event) { <br />" +
      "    <span class='grey'>// GA4 (Google Analytics 4) E-Commerce (전자상거래) 코드 (카페24용)</span><br /><br />" +
      "    <span class='grey'>// GA4 추적코드 ID (고객의 추적코드로 반드시 교체요망)</span><br />" +
      "    const ANALYTICS_4_TRACKING_ID = '" + ga4_id + "';<br /><br />" +
      "    <span class='grey'>// 페이지 변수</span><br />" +
      "    var viewItemPageForGA4 = /category|detail/.test(window.location.pathname);<br />" +
      "    var cartPageForGA4 = /basket/.test(window.location.pathname);<br />" +
      "    var checkoutPageForGA4 = /orderform/.test(window.location.pathname);<br />" +
      "    var purchasePageForGA4 = /order_result/.test(window.location.pathname);<br />" +
      "<br />" +
      "    <span class='grey'>// 공통 변수 (웹사이트에 따라 적절하게 변경하세요)</span><br />" +
      "    var brandForGA4 = '" + ga4_brand + "';<br />" +
      "    var affiliationForGA4 = '" + ga4_brand + "';<br />" +
      "    var listNameForGA4 = 'Search Results';<br />" +
      "    var currencyForGA4 = 'KRW';<br />" +
      "<br />" +
      "    <span class='grey'>// 네이버 페이 버튼 변수 (네이버 페이는 클릭으로만 전환 추적 가능하다는 점을 반드시 확인하세요)</span><br />" +
      "    var btnNpayForGA4 = $('.npay_btn_item')[0];<br />" +
      "<br />" +
      "    <span class='grey'>// 수량 체크 함수</span><br />" +
      "    function getQuantityForGA4() {<br />" +
      "        var quantity = $('#option_box1_quantity');<br />" +
      "        if (quantity.length == 1) {<br />" +
      "            return Number(document.getElementById('option_box1_quantity').value);<br />" +
      "        }<br />" +
      "        else { <br />"+
      "            return 1;<br />" +
      "        }<br />" +
      "    }<br /><br />" +
      "    <span class='grey'>// 상세페이지 gtag 호출 함수</span><br />" +
      "    function callGtagViewItemForGA4(pageType, items) {<br />" +
      "        gtag('event', pageType, {<br />" +
      "            send_to: ANALYTICS_4_TRACKING_ID,<br />" +
      "            items: items<br />" +
      "        });<br />" +
      "    }<br />" +
      "<br />" +
      "    <span class='grey'>// 장바구니 추가 gtag 호출 함수</span><br />" +
      "    function callGtagAddToCartForGA4(pageType, items) {<br />" +
      "        gtag('event', pageType, {<br />" +
      "            send_to: ANALYTICS_4_TRACKING_ID,<br />" +
      "            items: items<br />" +
      "        });<br />" +
      "    }<br/ >" +
      "<br />" +
      "    <span class='grey'>// 장바구니 제거 gtag 호출 함수</span><br />" +
      "    function callGtagRemoveFromCartForGA4(pageType, items) {<br/ >" +
      "        gtag('event', pageType, {<br />" +
      "            send_to: ANALYTICS_4_TRACKING_ID,<br />" +
      "            items: items<br />" +
      "        });<br />" +
      "    }<br />" +
      "<br />" +
      "    <span class='grey'>// 구매완료 gtag 호출 함수</span><br />" +
      "    function callGtagPurchaseForGA4(pageType, transaction_id, affiliation, totalPrice, currency, items) {<br />" +
      "        gtag('event', pageType, {<br />" +
      "            send_to: ANALYTICS_4_TRACKING_ID,<br />" +
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
      "    function addItemForGA4(item, id, name, category, quantity, price) {<br />" +
      "        item.push({<br />" +
      "            item_id: id,<br />" +
      "            item_name: name,<br />" +
      "            item_list_name: listNameForGA4,<br />" +
      "            item_brand: brandForGA4,<br />" +
      "            item_category: category,<br />" +
      "            quantity: quantity,<br />" +
      "            price: price<br />" +
      "        });<br />" +
      "    }<br /><br />" +
      "    <span class='grey'>// 상세페이지</span><br />" +
      "    if (viewItemPageForGA4) {<br />" +
      "        var viewItem = [];<br />" +
      "        addItemForGA4(viewItem, iProductNo, product_name, iCategoryNo, getQuantityForGA4(), product_price);<br />" +
      "        callGtagViewItemForGA4('view_item', viewItem);<br />" +
      "<br />" +
      "        var addToCartItem = [];<br />" +
      "        var send = XMLHttpRequest.prototype.send<br />" +
      "        XMLHttpRequest.prototype.send = function () {<br />" +
      "           this.addEventListener('load', function () {<br />" +
      "                if (this.responseURL.includes('/exec/front/order/basket/')) {<br />" +
      "                   addItemForGA4(addToCartItem, iProductNo, product_name, iCategoryNo, getQuantityForGA4(), product_price);<br />" +
      "                    callGtagAddToCartForGA4('add_to_cart', addToCartItem);<br />" +
      "               }<br />" +
      "            })<br />" +
      "            return send.apply(this, arguments)<br />" +
      "        }<br />" +
      "        btnNpayForGA4?.addEventListener('click', function (e) {<br />" +
      "           callGtagPurchaseForGA4('purchase', btnNpayForGA4.children[0].id, affiliationForGA4, getQuantityForGA4() * product_price, currencyForGA4, addToCartItem);<br />" +
      "        }, false);<br />" +
      "    }<br />" +
      "    <span class='grey'>// 장바구니 페이지</span><br />" +
      "    else if (cartPageForGA4) {<br />" +
      "        var send = XMLHttpRequest.prototype.send<br />" +
      "        XMLHttpRequest.prototype.send = function () {<br/ >" +
      "            this.addEventListener('load', function () {<br />" +
      "                if (this.responseURL.includes('/exec/front/order/basket/')) {<br />" +
      "                    var removeFromCartItem = [];<br />" +
      "                    $('[id^=\"' + BASKET_CHK_ID_PREFIX + '\"]').each(function (i) {<br />" +
      "                        if ($(this).is(':checked')) {<br />" +
      "                            addItemForGA4(removeFromCartItem, aBasketProductOrderData[i].product_no, aBasketProductOrderData[i].product_name, aBasketProductOrderData[i].main_cate_no, aBasketProductOrderData[i].quantity, aBasketProductOrderData[i].product_sum_price);<br />" +
      "                        }<br />" +
      "                    });<br />" +
      "                    callGtagRemoveFromCartForGA4('remove_from_cart', removeFromCartItem);<br />" +
      "                }<br />" +
      "            })<br />" +
      "            return send.apply(this, arguments)<br />" +
      "        }<br />" +
      "        var cartItem = [];<br />" +
      "        var totalPrice = 0.0;<br />" +
      "        jQuery.each(aBasketProductData, function (i) {<br />" +
      "            addItemForGA4(cartItem, aBasketProductData[i].product_no, aBasketProductData[i].product_name, aBasketProductData[i].main_cate_no, aBasketProductData[i].quantity, aBasketProductData[i].product_sum_price);<br />" +
      "            totalPrice += aBasketProductData[i].quantity * aBasketProductData[i].product_sum_price<br />" +
      "        });<br />" +
      "        btnNpayForGA4?.addEventListener('click', function (e) {<br />" +
      "           callGtagPurchaseForGA4('purchase', btnNpayForGA4.children[0].id, affiliationForGA4, getQuantityForGA4() * product_price, currencyForGA4, addToCartItem);<br />" +
      "        }, false);<br />" +
      "    }<br />" +
      "    <span class='grey'>// 구매완료 페이지</span><br />" +
      "    else if (purchasePageForGA4) {<br />" +
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
      "                addItemForGA4(purchaseItem, EC_FRONT_EXTERNAL_SCRIPT_VARIABLE_DATA.order_product[i].product_no, EC_FRONT_EXTERNAL_SCRIPT_VARIABLE_DATA.order_product[i].product_name, category, EC_FRONT_EXTERNAL_SCRIPT_VARIABLE_DATA.order_product[i].quantity, EC_FRONT_EXTERNAL_SCRIPT_VARIABLE_DATA.order_product[i].product_price);<br />" + 
      "            }<br />" +
      "        }<br />" +
      "        callGtagPurchaseForGA4('purchase', EC_FRONT_EXTERNAL_SCRIPT_VARIABLE_DATA.order_id, affiliationForGA4, EC_FRONT_EXTERNAL_SCRIPT_VARIABLE_DATA.payed_amount, currencyForGA4, purchaseItem);<br />" +
      "    }<br />" +
      "  });";
      result += "<br /><span class='grey'>&lt;/<span class='lightblue2'>script</span><span class='grey'>&gt;</span><br /><br />";
    $("#generated_ga4_script").html("<pre>" + result + "</pre>");
  });

  $("#cafe24_ga4_eec_gtm").on("click", function () { 
    document.querySelector("#ga4_id").value = "";
    document.querySelector("#ga4_brand").value = "";
    let result = "";
    result += `
&lt;!-- 카페24 GTM 전자상거래 코드 (카페24 쇼핑몰 홈페이지에 따라 수정 필요), 다른 CMS에도 변수만 바꿔서 적용하시면 됩니다. -->
&lt;!-- 한 HTML 태그에 모두 넣어도 되나 그 때에는 if문으로 페이지를 체크해주셔야 하고 각각 트리거를 지정하여 분리해서 맞춤 HTML 태그를 만드는 것을 권장합니다. -->
&lt;!-- 아래는 단순 코드이기 때문에 GTM에서 GA4 이벤트 세팅, 맞춤 이벤트, 변수, 트리거들은 슬라이드 가이드를 따라 각각 생성하시면 됩니다. -->
&lt;!-- 상세페이지 조회 (view_item), 장바구니 클릭인 경우에는 아래 event만 add_to_cart로 바꿔서 바로 사용하면 됩니다. -->
&lt;script>
  dataLayer.push({ ecommerce: null });
  dataLayer.push({
    event: "view_item",
    ecommerce: {
      currency: "KRW",
      value: document.querySelector('meta[property="product:price:amount"]').content,
      items: [
        {
          item_id: document.querySelector('meta[property="product:productId"]').content,
          item_name: document.querySelector("div.detailArea > div > div > h1").innerText,
          price: document.querySelector('meta[property="product:price:amount"]').content,
          quantity: 1
        }
      ]
    }
  });
&lt;/script>

&lt;!-- 장바구니 페이지 조회인 경우 (버튼 클릭인 경우 위의 상세페이지 조회 부분만 add_to_cart로 바꾸시고 버튼 클릭 트리거로 하시면 빠르게 만들 수 있습니다) -->
&lt;script>
  // 모바일 접속인 경우
  if (window.location.href.indexOf("m.홈페이지주소") > -1) {
    var productIdArr = document.querySelectorAll(".prdImg > a");
    var productNameArr = document.querySelectorAll(".prdName");
    var productPriceArr = document.querySelectorAll("span[title='할인판매가']");
    var productQtyArr = document.querySelectorAll(".quantity > input");
    var products = [];

    for (var i = 0; i < productIdArr.length; i++) {
      var product = {
        item_id: productIdArr[i].href.split("product_no=")[1].split("&cate")[0],
        item_name: productNameArr[i].innerText,
        price: productPriceArr[i].innerText.replace(/[^\\d]/g, ''),
        quantity: productQtyArr[i].value
      };
      products.push(product);
    }

    dataLayer.push({
    event: "add_to_cart",
    ecommerce: {
      items: products
    }
    });
  } 
  // PC인 경우
  else {
    var productIdArr = document.querySelectorAll("td.thumb > a");
    var productNameArr = document.querySelectorAll("tr > td.left > a");
    var productPriceArr = document.querySelectorAll("tr > td:nth-child(4) > div:nth-child(2)");
    var productQtyArr = document.querySelectorAll(".ec-base-qty > input");
    var products = [];

    for (var i = 0; i < productIdArr.length; i++) {
      var product = {
        item_id: productIdArr[i].href.split("product_no=")[1].split("&cate")[0],
        item_name: productNameArr[i].innerText,
        price: productPriceArr[i].innerText.replace(/[^\\d]/g, ''),
        quantity: productQtyArr[i].value
      };
      products.push(product);
    }

    dataLayer.push({
      event: "add_to_cart",
      ecommerce: {
        items: products
      }
    });
  }
&lt;script/>

&lt;!-- 결제 시작(begin_checkout) 스크립트. 이 부분이 제일 복잡한 부분이며 해당 사항으로 되지 않는 경우 sessionStorage 이용 방법을 고려해보셔야 합니다. -->
&lt;script>
  dataLayer.push({ ecommerce: null });
  
  // 모바일인 경우 (아래 홈페이지 주소를 바꿔주세요)
  if (window.location.href.indexOf("m.홈페이지주소") > -1) {
    var productIdArr = document.querySelectorAll("div.contents.prdArea > div.orderArea > div.orderSheet > div.xans-order.xans-order-normallist > div.xans-record- > div.description > p.prdImg > a");
    var productNameArr = document.querySelectorAll("div.contents.prdArea > div:nth-child(1) > div > div > div > div > strong");
    var productPriceArr = document.querySelectorAll("div.contents.prdArea > div:nth-child(1) > div > div > div > div > ul > li.price > span:nth-child(2) > strong");
    var productQtyArr = document.querySelectorAll("div.contents.prdArea > div > div > div > div > div > ul > li.price > strong[title='수량']");
    var products = [];

    for (var i = 0; i < productIdArr.length; i++) {
      var product = {
        item_id: productIdArr[i].href.split("product_no=")[1].split("&cate")[0],
        item_name: productNameArr[i].innerText,
        price: productPriceArr[i].innerText.replace(/[^\\d]/g, ''),
        quantity: Number(productQtyArr[i].innerText.replace(/[^\\d]/g, ''))
      };
      products.push(product);
    }

    dataLayer.push({
      event: "begin_checkout",
      ecommerce: {
        items: products
      }
    });
  } 
  // PC인 경우
  else {
    var productIdArr = document.querySelectorAll(".xans-record- > td.thumb.gClearLine > a");
    var productNameArr = document.querySelectorAll(".ec-product-name");
    var productPriceArr = document.querySelectorAll("tr > td:nth-child(4) > div:nth-child(2)");
    var productQtyArr = document.querySelectorAll("tbody.xans-element-.xans-order.xans-order-normallist.center > tr.xans-record- > td:nth-child(5)");
    var products = [];

    for (var i = 0; i < productIdArr.length; i++) {
      var product = {
        item_id: productIdArr[i].href.split("product_no=")[1].split("&cate")[0],
        item_name: productNameArr[i].innerText,
        price: productPriceArr[i].innerText.replace(/[^\\d]/g, ''),
        quantity: Number(productQtyArr[i].innerText)
      };
      products.push(product);
    }

    dataLayer.push({
      event: "begin_checkout",
      ecommerce: {
        items: products
      }
    });
  }
&lt;/script>

&lt;!-- 구매 완료(purchase) 부분. 카페24는 아래 코드로 PC, 모바일 모두 됩니다. -->
&lt;script>
  dataLayer.push({ ecommerce: null });
  var productData = EC_FRONT_EXTERNAL_SCRIPT_VARIABLE_DATA.order_product;
  var products = [];

  for (var i = 0; i < productData.length; i++) {
    var product = {
      item_id: EC_FRONT_EXTERNAL_SCRIPT_VARIABLE_DATA.order_product[i].product_no,
      item_name: EC_FRONT_EXTERNAL_SCRIPT_VARIABLE_DATA.order_product[i].product_name,
      price: EC_FRONT_EXTERNAL_SCRIPT_VARIABLE_DATA.order_product[i].product_price,
      quantity: EC_FRONT_EXTERNAL_SCRIPT_VARIABLE_DATA.order_product[i].quantity,
      currency: "KRW"
    };
    products.push(product);
  }
  
  dataLayer.push({
    event: "purchase",
    ecommerce: {
      value: EC_FRONT_EXTERNAL_SCRIPT_VARIABLE_DATA.payed_amount,
      transaction_id: EC_FRONT_EXTERNAL_SCRIPT_VARIABLE_DATA.order_id,
      currency: "KRW",
      items: products
    }
  });
&lt;/script>

// 몇몇 카페24 쇼핑몰에서는 아래 코드 적용 가능
// 상세페이지
&lt;script>
  dataLayer.push({ ecommerce: null });
  dataLayer.push({
    event: "view_item",
    ecommerce: {
      currency: "KRW",
      value: Number(document.querySelector('meta[property="product:price:amount"]').content),
      items: [
        {
          item_id: document.querySelector('meta[property="product:productId"]').content,
          item_name: document.querySelector("div.custom-layer > div > p").innerText,
          price: Number(document.querySelector('meta[property="product:price:amount"]').content),
          quantity: 1
        }
      ]
    }
  });
&lt;/script>

// 장바구니 담기(버튼 클릭)
&lt;script>
  dataLayer.push({ ecommerce: null });
  dataLayer.push({
    event: "add_to_cart",
    ecommerce: {
      currency: "KRW",
      value: Number(document.querySelector('meta[property="product:price:amount"]').content),
      items: [
        {
          item_id: document.querySelector('meta[property="product:productId"]').content,
          item_name: document.querySelector("div.custom-layer > div > p").innerText,
          price: Number(document.querySelector('meta[property="product:price:amount"]').content),
          quantity: Number(document.querySelector("input[id*=quantity]").value)
        }
      ]
    }
  });
&lt;/script>

// 네이버페이 상세페이지 (상세페이지에서 네이버페이 버튼 클릭)
&lt;script>
  dataLayer.push({ ecommerce: null });
  if (Number(document.querySelector("#totalPrice > span > strong").innerText.replace(/[^\\d]/g, '')) > 0) {
    dataLayer.push({
      event: "purchase",
      ecommerce: {
        currency: "KRW",
        value: Number(document.querySelector("#totalPrice > span > strong").innerText.replace(/[^\\d]/g, '')),
        transaction_id: document.querySelector(".npay_btn_pay").id.split("NPAY_BUY_LINK_IDNC_ID_")[1],
        items: [
          {
            item_id: document.querySelector('meta[property="product:productId"]').content,
            item_name: document.querySelector("div.custom-layer > div > p").innerText,
            price: Number(document.querySelector("#totalPrice > span > strong").innerText.replace(/[^\\d]/g, '')),
            quantity: Number(document.querySelector("input[id*=quantity]").value)
          }
        ]
      }
    });
  }
&lt;/script>

// 네이버페이 장바구니(장바구니 페이지에서 네이버페이 버튼을 클릭한 경우)
&lt;script>
  // 모바일 접속
  if (window.location.href.indexOf("m.홈페이지주소") > -1) {
    var productIdArr = document.querySelectorAll("div.prdBox > div.thumbnail > a")
    var productNameArr = document.querySelectorAll(".prdName");
    var productPriceArr = document.querySelectorAll("span[title='할인판매가']");
    var productQtyArr = document.querySelectorAll("input[id*=quantity]");
    var totalPrice = 0;
    var products = [];

    for (var i = 0; i < productIdArr.length; i++) {
      totalPrice += Number(productPriceArr[i].innerText.replace(/[^\\d]/g, ''));
      var product = {
        item_id: productIdArr[i].href.split("product_no=")[1].split("&cate")[0],
        item_name: productNameArr[i].innerText,
        price: Number(productPriceArr[i].innerText.replace(/[^\\d]/g, '')),
        quantity: Number(productQtyArr[i].value)
      };
      products.push(product);
    }

    dataLayer.push({
      event: "purchase",
      ecommerce: {
        value: totalPrice,
        currency: "KRW",
        transaction_id: document.querySelector(".npay_btn_pay").id.split("NPAY_BUY_LINK_IDNC_ID_")[1],
        items: products
      }
    });
  } 
  // PC
  else {
    var productIdArr = document.querySelectorAll("td.thumb > a");
    var productNameArr = document.querySelectorAll("tr > td.left.gClearLine > strong > a")
    var productPriceArr = document.querySelectorAll("tr > td:nth-child(4) > div:nth-child(2)");
    var productQtyArr = document.querySelectorAll(".ec-base-qty > input");
    var totalPrice = 0;
    var products = [];

    for (var i = 0; i < productIdArr.length; i++) {
      totalPrice += Number(productPriceArr[i].innerText.replace(/[^\\d]/g, ''));
      var product = {
        item_id: productIdArr[i].href.split("product_no=")[1].split("&cate")[0],
        item_name: productNameArr[i].innerText,
        price: Number(productPriceArr[i].innerText.replace(/[^\\d]/g, '')),
        quantity: Number(productQtyArr[i].value)
      };
      products.push(product);
    }

    dataLayer.push({
      event: "purchase",
      ecommerce: {
        value: totalPrice,
        currency: "KRW",
        transaction_id: document.querySelector(".npay_btn_pay").id.split("NPAY_BUY_LINK_IDNC_ID_")[1],
        items: products
      }
    });
  }
&lt;/script>

// 결제시작
&lt;script>
  dataLayer.push({ ecommerce: null });
  
  var productIdArr = document.querySelectorAll("div.contents > div:nth-child(2) > div > div > div > div.thumbnail > a");
  var productNameArr = document.querySelectorAll("div.contents > div:nth-child(2) > div > div > div > div.description > strong > a");
  var productPriceArr = document.querySelectorAll("div.contents > div:nth-child(2) > div > div > div > div.description > div > span:nth-child(1)");
  var productQtyArr = document.querySelectorAll("div.contents > div:nth-child(2) > div > div > div > div.description > ul > li:nth-child(4)");
  var totalPrice = 0;
  var products = [];

  for (var i = 0; i < productIdArr.length; i++) {
    totalPrice += Number(productPriceArr[i].innerText.replace(/[^\\d]/g, ''));
    var product = {
      item_id: productIdArr[i].href.split("product_no=")[1].split("&cate")[0],
      item_name: productNameArr[i].innerText,
      price: Number(productPriceArr[i].innerText.replace(/[^\\d]/g, '')),
      quantity: Number(productQtyArr[i].innerText.replace(/[^\\d]/g, ''))
    };
    products.push(product);
  }

  dataLayer.push({
    event: "begin_checkout",
    ecommerce: {
      value: totalPrice,
      currency: "KRW",
      items: products
    }
  });
&lt;/script>

// 구매완료는 위의 치환코드 버전 사용하면 됩니다.
`;
    $("#generated_ga4_script").html("<pre>" + result + "</pre>");
  });

  $("#godomall_ga4_eec").on("click", function () { 
    document.querySelector("#ga4_id").value = "";
    document.querySelector("#ga4_brand").value = "";
    let result = "";
    result += `
&lt;!-- 고도몰 GA4 전자상거래 코드 (아래 G-XXXX는 고객의 추적 ID로 반드시 교체해서 사용한다) -->
&lt;!-- Global site tag (gtag.js) - Google Analytics -->
<span class='grey'>&lt;</span><span class='lightblue2'>script</span><span class='grey'></span> async src="https://www.googletagmanager.com/gtag/js?id=${ga4_id}"><span class='grey'>&lt;/</span><span class='lightblue2'>script</span><span class='grey'>&gt;</span>
<span class='grey'>&lt;</span><span class='lightblue2'>script</span><span class='grey'>&gt;</span>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', '${ga4_id}');
<span class='grey'>&lt;/</span><span class='lightblue2'>script</span><span class='grey'>&gt;</span>
    <br />`;
    result += "<span class='grey'>&lt;</span><span class='lightblue2'>script</span><span class='grey'>&gt;</span>";
    result += `
    window.addEventListener('load', function (event) {
      // 고도몰 Google Analytics 4 전자상거래 스크립트 (UA를 기반으로 한 스크립트)
      // 구글 애널리틱스4 추적 코드 (G-XXXX를 고객의 추적 코드로 반드시 변경!)
      const ANALYTICS_4_TRACKING_ID = "${ga4_id}";

      var viewItemPageForGA4 = /goods_view/.test(window.location.pathname);
      var cartPageForGA4 = /cart/.test(window.location.pathname);
      var checkoutForGA4 = /order.php/.test(window.location.pathname);
      var purchasePageForGA4 = /order_end/.test(window.location.pathname);
      
      // Affiliation과 Brand명을 적절하게 바꿔주세요.
      var listNameForGA4 = 'Search Results';
      var affiliationForGA4 = '${ga4_brand}';
      var brandForGA4 = '${ga4_brand}';
      var currencyForGA4 = 'KRW';

      var btnAddToCartForGA4 = document.querySelector("#frmView > div > div > div.btn_choice_box > div > button.btn_add_cart");
      var btnNpayForGA4 = $('.npay_btn_link.npay_btn_pay');

      function getQuantityForGA4() {
          var quantity = $('[name^="goodsCnt"]');
          if (quantity.length == 1) {
              return Number($('[name^="goodsCnt"]').val());
          }
          else {
              return 1;
          }
      }
      function callGtagForGA4(pageType, items) {
          gtag('event', pageType, {
              send_to: ANALYTICS_4_TRACKING_ID,
              currency: currencyForGA4,
              items: items
          });
      }
      function callGtagPurchaseForGA4(pageType, transaction_id, affiliation, totalPrice, currency, items) {
          gtag('event', pageType, {
              send_to: ANALYTICS_4_TRACKING_ID,
              transaction_id: transaction_id,
              affiliation: affiliation,
              value: totalPrice,
              currency: currency,
              tax: 0,
              shipping: 0,
              items: items
          });
      }
      function addItemForGA4(item, id, name, category, quantity, price) {
          item.push({
              item_id: id,
              item_name: name,
              item_list_name: listNameForGA4,
              item_brand: brandForGA4,
              item_category: category,
              quantity: quantity,
              price: price
          })
      }
      if (viewItemPageForGA4) {
          var allItems = [];
          var price = $('input[name=set_goods_price]').val();
          var proId = goodsNo;
          var proName = $('meta[property="og:title"]').attr('content');
          var proCate = $('input[name=cateCd]').val();

          addItemForGA4(allItems, proId, proName, proCate, getQuantityForGA4(), price);
          callGtagForGA4('view_item', allItems);
          btnAddToCartForGA4.addEventListener('click', function () {
              var item = [];
              addItemForGA4(item, proId, proName, proCate, getQuantityForGA4(), price);
              callGtagForGA4('add_to_cart', item);
          }, false);
          btnNpayForGA4.click(function () {
              var npayProducts = [];
              addItemForGA4(npayProducts, proId, proName, proCate, getQuantityForGA4(), price);
              callGtagForGA4('begin_checkout', npayProducts);
              callGtagPurchaseForGA4('purchase', btnNpayForGA4.attr('id'), affiliationForGA4, price * getQuantityForGA4(), currencyForGA4, npayProducts);
          });
      }
      else if (cartPageForGA4) {
          jQuery('#frmCart').submit(function (event) {
              var proCnt = document.querySelectorAll('.cart_item_list .form_element').length;
              var products = [];
              for (var i = 0; i < proCnt; i++) {
                  addItemForGA4(products, document.querySelectorAll('.cart_item_list .form_element')[i].firstElementChild.dataset['goodsNo'], document.querySelectorAll('.cart_item_list .form_element')[i].firstElementChild.dataset['goodsNm'], '', document.querySelectorAll('.cart_item_list .form_element')[i].firstElementChild.dataset['defaultGoodsCnt'], Number(document.querySelectorAll('.cart_item_list .form_element')[i].firstElementChild.dataset['price']));
              }
              var checked = document.querySelectorAll('.check_s');
              var removedProduct = [];
              var newProductIndex = 0;
              for (var i = 0; i < checked.length - 1; i++) {
                  var getClassName = checked[i + 1].className;
                  if (getClassName.includes('on')) {
                      removedProduct[newProductIndex] = products[i];
                      newProductIndex++;
                  }
              }
              callGtagForGA4('remove_from_cart', removedProduct);
          });
          btnNpayForGA4.click(function () {
              var proCnt = document.querySelectorAll('.cart_item_list .form_element').length;
              var npayProducts = [];
              var totalPrice = 0;
              for (var i = 0; i < proCnt; i++) {
                  addItemForGA4(npayProducts, document.querySelectorAll('.cart_item_list .form_element')[i].firstElementChild.dataset['goodsNo'], document.querySelectorAll('.cart_item_list .form_element')[i].firstElementChild.dataset['goodsNm'], '', document.querySelectorAll('.cart_item_list .form_element')[i].firstElementChild.dataset['defaultGoodsCnt'], Number(document.querySelectorAll('.cart_item_list .form_element')[i].firstElementChild.dataset['price']));
                  totalPrice += Number(document.querySelectorAll('.cart_item_list .form_element')[i].firstElementChild.dataset['price']);
              }
              callGtagForGA4('begin_checkout', npayProducts);
              callGtagPurchaseForGA4('purchase', btnNpayForGA4.attr('id'), affiliationForGA4, totalPrice, currencyForGA4, npayProducts);
          });
      }
      else if (checkoutForGA4) {
          var listOfItems = $('[name^="priceInfo"]');
          var checkoutProducts = [];
          for (var i = 0; i < listOfItems.length; i++) {
              var JsonItems = JSON.parse(listOfItems[i].value);
              addItemForGA4(checkoutProducts, listOfItems[i].name.replace('priceInfo[', '').split('][')[0], $('.pick_add_info')[i].children[0].innerText, JsonItems.goodsCnt, JsonItems.baseGoodsPrice);
          }
          callGtagForGA4('begin_checkout', checkoutProducts);
          btnNpayForGA4.click(function () {
              var npayProducts = [];
              addItemForGA4(npayProducts, proId, proName, proCate, getQuantity(), price);
              callGtagPurchaseForGA4('purchase', btnNpayForGA4.attr('id'), affiliationForGA4, price * getQuantityForGA4(), currencyForGA4, npayProducts);
          })
      }
      else if (purchasePageForGA4) {
          var e = $('input[name=naver-common-inflow-script-order-item]');
          var totalPrice = 0;
          var purchaseProducts = [];
          for (var i = 0; i < e.length; i++) {
              var detail = eval('(' + e[i].value + ')');
              addItemForGA4(purchaseProducts, detail.goodsno, detail.goodsnm, detail.sno, detail.ea, detail.price / detail.ea);
              totalPrice += detail.price;
          }
          callGtagPurchaseForGA4('purchase', eval('(' + e[0].value + ')').ordno, affiliationForGA4, totalPrice, currencyForGA4, purchaseProducts);
      }
  });`;
    result += "<br /><span class='grey'>&lt;/<span class='lightblue2'>script</span><span class='grey'>&gt;</span><br />";
    $("#generated_ga4_script").html("<pre>" + result + "</pre>");
  });

  $("#godomall_ga4_gtm_eec").on("click", function () { 
    let result = "";
    result += `
&lt;!-- 고도몰 GA4 전자상거래 GTM코드 - 일부 수정해서 사용하면 됩니다. -->
`;
    result += `
// 상세페이지 조회
&lt;script>
  dataLayer.push({ ecommerce: null });
  if (window.location.href.indexOf("m.모바일주소") > -1) {
    dataLayer.push({
      event: "view_item",
      ecommerce: {
        currency: "KRW",
        value: Number(document.querySelector('input[name="set_goods_price"]').value),
        items: [
          {
            item_id: goodsNo,
            item_name: document.querySelector("#contents_wrap > div.goods_view > div.detail_info > form > div.detail_info_top > h3").innerText,
            price: Number(document.querySelector('input[name="set_goods_price"]').value),
            quantity: 1
          }
        ]
      }
    });
  } else {
    dataLayer.push({
      event: "view_item",
      ecommerce: {
        currency: "KRW",
        value: Number(document.querySelector('input[name="set_goods_price"]').value),
        items: [
          {
            item_id: goodsNo,
            item_name: document.querySelector("#frmView > div > div > div.item_detail_tit > h3").innerText,
            price: Number(document.querySelector('input[name="set_goods_price"]').value),
            quantity: 1
          }
        ]
      }
    });
  }
&lt;/script>

// 장바구니 담기
&lt;script>
  dataLayer.push({ ecommerce: null });
  if (window.location.href.indexOf("m.모바일주소") > -1) {
    dataLayer.push({
      event: "add_to_cart",
      ecommerce: {
        currency: "KRW",
        value: Number(document.querySelector(".total_price").innerText.replace(/[^\\d]/g, '')),
        items: [
          {
            item_id: goodsNo,
            item_name: document.querySelector("#contents_wrap > div.goods_view > div.detail_info > form > div.detail_info_top > h3").innerText,
            price: Number(document.querySelector('input[name="set_goods_price"]').value),
            quantity: Number(document.querySelector('input[name="goodsCnt[]"]').value)
          }
        ]
      }
    });
  } else {
    dataLayer.push({
      event: "add_to_cart",
      ecommerce: {
        currency: "KRW",
        value: Number(document.querySelector(".total_price").innerText.replace(/[^\\d]/g, '')),
        items: [
          {
            item_id: goodsNo,
            item_name: document.querySelector("#frmView > div > div > div.item_detail_tit > h3").innerText,
            price: Number(document.querySelector('input[name="set_goods_price"]').value),
            quantity: Number(document.querySelector('input[name="goodsCnt[]"]').value)
          }
        ]
      }
    });
  }
&lt;/script>

// 결제시작
&lt;script>
  dataLayer.push({ ecommerce: null });
  
  if (window.location.href.indexOf("m.모바일주소") > -1) {
    var productIdArr = document.querySelectorAll("#frmOrder > div.pay > ul > li > div > a");
    var productNameArr = document.querySelectorAll("#frmOrder > div.pay > ul > li > div > a > div > div.itembody > p.name");
    var productPriceArr = document.querySelectorAll("#frmOrder > div.pay > ul > li > div > a > div > div.itembody > strong");
    var productQtyArr = document.querySelectorAll("#frmOrder > div.pay > ul > li > div > a > div > div.itembody > p:nth-child(2)");
    var totalPrice = 0;
    var products = [];

    for (var i = 0; i < productIdArr.length; i++) {
      totalPrice += Number(productPriceArr[i].innerText.replace(/[^\\d]/g, ''));
      var product = {
        item_id: productIdArr[i].href.split("goodsNo=")[1],
        item_name: productNameArr[i].innerText,
        price: Number(productPriceArr[i].innerText.replace(/[^\\d]/g, '')),
        quantity: Number(productQtyArr[i].innerText.split(" : ")[1].replace(/[^\\d]/g, ''))
      };
      products.push(product);
    }

    dataLayer.push({
      event: "begin_checkout",
      ecommerce: {
        currency: "KRW",
        value: totalPrice,
        items: products
      }
    });
  } 
  // PC인 경우
  else {
    var productIdArr = document.querySelectorAll("table > tbody > tr > td.td_left > div > span > a");
    var productNameArr = document.querySelectorAll("table > tbody > tr > td.td_left > div > div > em > a");
    var productPriceArr = document.querySelectorAll("table > tbody > tr > td:nth-child(5) > strong");
    var productQtyArr = document.querySelectorAll("table > tbody > tr > td.td_order_amount > div > strong");
    var totalPrice = 0;
    var products = [];

    for (var i = 0; i < productIdArr.length; i++) {
      totalPrice += Number(productPriceArr[i].innerText.replace(/[^\\d]/g, ''));
      var product = {
        item_id: productIdArr[i].href.split("goodsNo=")[1],
        item_name: productNameArr[i].innerText,
        price: Number(productPriceArr[i].innerText.replace(/[^\\d]/g, '')),
        quantity: Number(productQtyArr[i].innerText.replace(/[^\\d]/g, ''))
      };
      products.push(product);
    }

    dataLayer.push({
      event: "begin_checkout",
      ecommerce: {
        currency: "KRW",
        value: totalPrice,
        items: products
      }
    });
  }
&lt;/script>

// 구매완료 (그대로 사용하면 됩니다.)
&lt;script>
  dataLayer.push({ ecommerce: null });
  var productData = document.querySelectorAll('input[name=naver-common-inflow-script-order-item]');
  var products = [];
  var totalPrice = 0;
  var orderNo = "";

  for (var i = 0; i < productData.length; i++) {
    var productDetail = eval('(' + productData[i].value + ')');
    var product = {
      item_id: productDetail.sno,
      item_name: productDetail.goodsnm,
      price: productDetail.price,
      quantity: productDetail.ea,
      currency: "KRW"
    };
    totalPrice += productDetail.price;
    products.push(product);
    if (orderNo == "") {
      orderNo = productDetail.ordno;
    }
  }
  
  dataLayer.push({
    event: "purchase2",
    ecommerce: {
      value: totalPrice,
      transaction_id: orderNo,
      currency: "KRW",
      items: products
    }
  });
&lt;/script>
    `;
    $("#generated_ga4_script").html("<pre>" + result + "</pre>");
  });

  $("#shopify_ga4_eec").on("click", function () { 
    document.querySelector("#ga4_id").value = "";
    document.querySelector("#ga4_brand").value = "";
    let result = "";
    result += `
&lt;!-- 쇼피파이 GA4 전자상거래 코드 (현재는 purchase만, 추후 업데이트 예정) 아래 G-1234를 수정해주세요. -->
&lt;!-- 아래 코드는 쇼피파이 설정 부분 들어가셔서 checkout의 additional script에 넣어주셔야 합니다. -->`;
    result += `
&lt;script async src="https://www.googletagmanager.com/gtag/js?id=G-1234"></script>
&lt;script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-1234');
&lt;/script>
{% if first_time_accessed %}
&lt;script>
    gtag("event", "purchase", {
        transaction_id: '{{ order.name || order.order_number }}',
        value: {{ total_price | money_without_currency | remove: ',' }},
        tax: {{ tax_price | money_without_currency | remove: ',' }},
        shipping: {{ shipping_price | money_without_currency | remove: ',' }},
        currency: '{{ shop.currency }}',
        items: [
            {% for line_item in line_items %}
            {
                item_id: '{{ line_item.sku || line_item.product_id }}',
                item_name: '{{ line_item.product.title }}',
                discount: {{ line_item.line_level_total_discount | money_without_currency }},
                item_variant: '{{ line_item.variant.title }}',
                price: "{{ line_item.final_price | money_without_currency }}".replace(',',''),
                quantity: {{ line_item.quantity }}
            },
            {% endfor %}
        ]
    });
&lt;/script>
{% endif %}
  `;
    $("#generated_ga4_script").html("<pre>" + result + "</pre>");
  });

  $("#imweb_ga4_eec").on("click", function () { 
    document.querySelector("#ga4_id").value = "";
    document.querySelector("#ga4_brand").value = "";
    let result = "<span class='grey'>&lt;</span><span class='lightblue2'>script</span><span class='grey'>&gt;</span>";
    result += `
  window.addEventListener('load', function(event) {
    // GA4 (Google Analytics 4) E-Commerce (전자상거래) 코드 (아임웹)
    // 아임웹은 자체 설정에서 Google 애널리틱스 전자상거래 옵션을 사용으로 바꿔주면 된다. 아래 코드는 하드 코딩으로 구현하는 경우에 사용하면 된다.
    // 공통변수 (웹사이트에 따라 적절하게 변경하세요) (gtag는 네이버 페이 미포함 버전이니 네이버 페이 경우에는 별도로 코드 추가 요함!!!)
    var brand = '${ga4_brand}';
    var affiliation = '${ga4_brand}';
    var listName = 'Search Results';
    var currency = 'KRW';

    // 제품 상세 페이지 조회
    if (window.location.href.indexOf("?idx=") > -1) {
        gtag('event', 'view_item', {
            currency: currency,
            value: +document.querySelector("#prod_goods_form > header > div.pay_detail.full-width > div.holder.table-row > span > span").innerText.replace(/[^\\d]/g, ''),
            items: [
                {
                    item_id: window.location.href.split("?idx=")[1] || "",
                    item_name: document.querySelector("#prod_goods_form > header > div.view_tit.no-margin-top.title_font_style").innerText, 
                    item_list_name: listName,
                    item_brand: brand,
                    currency: currency,
                    price: +document.querySelector("#prod_goods_form > header > div.pay_detail.full-width > div.holder.table-row > span > span").innerText.replace(/[^\\d]/g, '')
                }
            ]
        });
    }

    // 장바구니 페이지 조회 
    if (window.location.href.indexOf("shop_cart") > -1) {
        var cartList = document.querySelectorAll("table > tbody > tr.content");
        var idList = document.querySelectorAll(".cart-item-wrap");
        var nameList = document.querySelectorAll(".cart-item-title");
        var quantityList = document.querySelectorAll("td.amount.td-blocked");
        var priceList = document.querySelectorAll("td.price.td-blocked");
        var items = [];
        var totalPrice = 0;

        cartList.forEach((value, i) => {
            totalPrice += +priceList[i].innerText.replace(/[^\\d]/g, '');
            items.push({
                item_id: idList[i].href.split("?idx=")[1],
                item_name: nameList[i].innerText,
                item_list_name: listName,
                currency: currency,
                item_brand: brand,
                quantity: +quantityList[i].innerText.replace(/[^\\d]/g, ''),
                price: +priceList[i].innerText.replace(/[^\\d]/g, ''),
            })
        });

        console.log('add_to_cart', items);
        gtag('event', 'add_to_cart', {
            currency: currency,
            value: totalPrice,
            items: items
        });
    }

    // Begin Checkout 페이지 조회 (결제 시작 페이지)
    if (window.location.href.indexOf("shop_payment") > -1) {
        var checkoutList = document.querySelectorAll(".shop_item_thumb");
        var idList = document.querySelectorAll(".shop_item_thumb > a");
        var nameList = document.querySelectorAll(".shop_item_title");
        var quantityList = document.querySelectorAll(".shop_item_opt");
        var priceList = document.querySelectorAll(".shop_item_pay > span:nth-child(1)"); 
        var items = [];
        var totalPrice = 0;

        checkoutList.forEach((value, i) => {
            totalPrice += +priceList[i].innerText.replace(/[^\\d]/g, '');
            items.push({
                item_id: idList[i].href.split("?idx=")[1],
                item_name: nameList[i].innerText,
                item_list_name: listName,
                item_brand: brand,
                currency: currency,
                quantity: +quantityList[i].innerText.split(" - ")[1].replace(/[^\\d]/g, ''),
                price: +priceList[i].innerText.replace(/[^\\d]/g, ''),
            })
        });

        localStorage.removeItem('products');
        localStorage.setItem('products', JSON.stringify(items));
        console.log('begin_checkout', items);
        gtag('event', 'begin_checkout', {
            currency: currency,
            value: totalPrice,
            items: items
        });
    }

    if (window.location.href.indexOf("shop_payment_complete") > -1) {
        var items = JSON.parse(localStorage.getItem('products'));
        var transaction_id = document.querySelector("#w20210726dfced3bde2579 > div > div > div.table_payment_complete > table > tbody > tr:nth-child(2) > td").innerText;
        var totalPrice = 0;
        items.forEach((item) => totalPrice += item.price);
        gtag('event', 'purchase', {
            transaction_id: transaction_id,
            affiliation: affiliation,
            value: totalPrice,
            currency: currency,
            items: items
        });
    }
  });
  
  // GTM 용도(dataLayer)
  // 상세 페이지 조회
  &lt;script>
    dataLayer.push({ ecommerce: null });
    dataLayer.push({
      event: "view_item",
      ecommerce: {
        currency: "KRW",
        value: Number(document.querySelector(".real_price").innerText.replace(/[^\\d]/g, '')),
        items: [
          {
            item_id: window.location.href.split("idx=")[1].split("&")[0],
            item_name: document.querySelector("#meta_og_title").content.split(" :")[0],
            price: Number(document.querySelector(".real_price").innerText.replace(/[^\\d]/g, '')),
            quantity: 1
          }
        ]
      }
    });
  &lt;/script>

  // 장바구니 담기(버튼 클릭)
  &lt;script>
    dataLayer.push({ ecommerce: null });
    dataLayer.push({
      event: "add_to_cart",
      ecommerce: {
        currency: "KRW",
        value: Number(document.querySelector(".real_price").innerText.replace(/[^\\d]/g, '')),
        items: [
          {
            item_id: window.location.href.split("idx=")[1].split("&")[0],
            item_name: document.querySelector("#meta_og_title").content.split(" :")[0],
            price: Number(document.querySelector(".real_price").innerText.replace(/[^\\d]/g, '')),
            quantity: Number(document.querySelector("input[class*=count]").value)
          }
        ]
      }
    });
  &lt;/script>

  // 네이버페이 상세페이지(상세페이지에서 네이버페이 버튼을 눌렀을 때)
  &lt;script>
    dataLayer.push({ ecommerce: null });
    dataLayer.push({
      event: "purchase",
      ecommerce: {
        currency: "KRW",
        value: Number(document.querySelector(".real_price").innerText.replace(/[^\\d]/g, '')),
        transaction_id: document.querySelector(".npay_btn_pay").id.split("NPAY_BUY_LINK_IDNC_ID_")[1],
        items: [
          {
            item_id: window.location.href.split("idx=")[1].split("&")[0],
            item_name: document.querySelector("#meta_og_title").content.split(" :")[0],
            price: Number(document.querySelector(".real_price").innerText.replace(/[^\\d]/g, '')),
            quantity: Number(document.querySelector("input[class*=count]").value)
          }
        ]
      }
    });
  &lt;/script>

  // 네이버페이 장바구니(장바구니에서 네이버페이 버튼을 눌렀을 때)
  &lt;script>
    dataLayer.push({ ecommerce: null });
    
    var productIdArr = document.querySelectorAll(".cart-item-wrap");
    var productNameArr = document.querySelectorAll(".cart-item-title")
    var productPriceArr = document.querySelectorAll("td.price > span");
    var productQtyArr = document.querySelectorAll("td.amount.td-blocked.hidden-xs > div.text-13");
    var products = [];
    var totalPrice = 0;

    for (var i = 0; i < productIdArr.length; i++) {
      totalPrice += Number(productPriceArr[i].innerText.replace(/[^\\d]/g, ''));
      products.push({
        item_id: productIdArr[i].href.split("idx=")[1],
        item_name: productNameArr[i].innerText,
        price: Number(productPriceArr[i].innerText.replace(/[^\\d]/g, '')),
        quantity: Number(productQtyArr[i].innerText)
      });
    }
    
    dataLayer.push({
      event: "purchase",
      ecommerce: {
        currency: "KRW",
        value: totalPrice,
        transaction_id: document.querySelector(".npay_btn_pay").id.split("NPAY_BUY_LINK_IDNC_ID_")[1],
        items: products
      }
    });
  &lt;/script>

  // 결제시작(begin_checkout)
  &lt;script>
    dataLayer.push({ ecommerce: null });
    setTimeout(function() {
      var productIdArr = document.querySelectorAll(".shop_item_thumb > a");
      var productNameArr = document.querySelectorAll(".shop_item_title");
      var productPriceArr = document.querySelectorAll(".shop_item_pay");
      var productQtyArr = document.querySelectorAll(".shop_item_opt");
      var products = [];
      var totalPrice = 0;

      // 반복문
      for (var i = 0; i < productIdArr.length; i++) {
        totalPrice += Number(productPriceArr[i].innerText.replace(/[^\\d]/g, ''));
        var quantity = 0;
        if (productQtyArr[i].innerText.indexOf(" - ") > -1) {
          quantity = Number(productQtyArr[i].innerText.split(" - ")[1].replace(/[^\\d]/g, ''));
        } else {
          quantity = Number(productQtyArr[i].innerText.replace(/[^\\d]/g, ''));
        }
        var product = {
          item_id: productIdArr[i].href.split("idx=")[1].split("&")[0],
          item_name: productNameArr[i].innerText,
          price: Number(productPriceArr[i].innerText.replace(/[^\\d]/g, '')),
          quantity: quantity
        };
        products.push(product);
      }

      sessionStorage.setItem("products", JSON.stringify(products));

      dataLayer.push({
        event: "begin_checkout",
        ecommerce: {
          value: totalPrice,
          currency: "KRW",
          items: products
        }
      });
    }, 3000);
  &lt;/script>

  // 구매완료(purchase)
  &lt;script>
    dataLayer.push({ ecommerce: null });
    var products = JSON.parse(sessionStorage.getItem("products"));
    var totalPrice = 0;

    for (var i = 0; i < products.length; i++) {
      totalPrice += Number(products[i].price);
    }

    dataLayer.push({
      event: "purchase",
      ecommerce: {
        value: totalPrice,
        currency: "KRW",
        transaction_id: window.location.href.split("idx=")[1],
        items: products
      }
    });
  &lt;/script>
  `;
    result += "<br /><span class='grey'>&lt;/<span class='lightblue2'>script</span><span class='grey'>&gt;</span><br />";
    $("#generated_ga4_script").html("<pre>" + result + "</pre>");
  });

  $("#makeshop_ga4_eec_for_pc").on("click", function () { 
    document.querySelector("#ga4_id").value = "";
    document.querySelector("#ga4_brand").value = "";
    let result = `
  &lt;!-- 메이크샵 GA4 전자상거래 가이드
  구매완료는 치환코드가 있기 때문에 코드 변경 불필요하지만 
  나머지 상세페이지, 장바구니 등은 웹사이트마다 코드가 살짝 다르기 때문에
  개발자 통해서 이 부분 구현하거나 여건이 된다면 코드 수정 지원해줘도 되지만
  구매완료 부분만 코드 제공해도 무방하다. 
  구매완료 코드는 &lt;head></head> 사이가 아니라 디자인 부분 주문완료 코드에 넣어야 작동되니 주의해야 한다.
  글로벌 사이트 태그(gtag)는 &lt;head></head>에 이미 삽입되어 있어야 한다.
  아래 코드는 메이크샵용 구매완료 코드이며 brand, affiliation만 적절하게 바꿔서 코드 제공한다.
  그 아래 코드에는 제품상세페이지, 장바구니용 템플릿 코드도 포함해서 보내니 참고해서 가이드한다. -->

  &lt;script>
    var products = [];
    var brand = "${ga4_brand}";
    var affiliation = "${ga4_brand}";
    &lt;!--/loop_order_product/-->
    var goods_price = ('&lt;!--/order_product@price/-->').replace(/[^0-9]/g, '');
    products.push({
      'item_name': '&lt;!--/order_product@name/-->',
      'item_id': '&lt;!--/order_product@product_id/-->',
      'price': goods_price,
      'item_brand': brand,
      'quantity': '&lt;!--/order_product@amount/-->'
    });
    &lt;!--/end_loop/-->
    gtag('event', 'purchase', {
      "transaction_id": '&lt;!--/order_num/-->',
      "affiliation": affiliation,
      "value": '&lt;!--/pay_price/-->',
      "currency": "KRW",
      "items": products
    });
  &lt;/script>`;
    result += "<br /><br />";
    result += "<span class='grey'>&lt;</span><span class='lightblue2'>script</span><span class='grey'>&gt;</span>";
    result += `
  // 전체 참고 코드 (구매완료는 반드시 PC,모바일 개별 디자인에 존재하는 주문완료 페이지에 넣어야 한다.)
  window.addEventListener('load', function(event) {
    // GA4 (Google Analytics 4) E-Commerce (전자상거래) 코드 (메이크샵) PC버전 (모바일 버전은 별도로 체크 요함)
    // 공통변수 (웹사이트에 따라 적절하게 변경하세요) (네이버 페이 미포함 버전이니 네이버 페이 경우에는 별도로 코드 추가 요함!!!)
    var brand = '${ga4_brand}';
    var affiliation = '${ga4_brand}';
    var listName = 'Search Results';
    var currency = 'KRW';

    // 제품 상세 페이지 조회
    if (window.location.href.indexOf("shopdetail.html") > -1) {
        gtag('event', 'view_item', {
            currency: currency,
            value: +document.querySelector("#form1 > div > table > tbody > tr:nth-child(1) > td > div > strong").innerText.replace(/[^\\d]/g, ''),
            items: [
                {
                    "item_id": document.querySelector("input[name='branduid']").value,
                    "item_name": document.title.replace(/[\\[\\]]+/g,''), 
                    "item_list_name": listName,
                    "item_brand": brand,
                    "currency": currency,
                    "price": +document.querySelector("#form1 > div > table > tbody > tr:nth-child(1) > td > div > strong").innerText.replace(/[^\\d]/g, '')
                }
            ]
        });

        console.log('view_item', items);
        localStorage.removeItem('products');
        localStorage.setItem('products', JSON.stringify(items));
    }

    // 장바구니 페이지 조회
    if (window.location.href.indexOf("shop/basket") > -1) {
        var idList = document.querySelectorAll("tr > td > div > div.thumb > a");
        var nameList = document.querySelectorAll("tr > td > div.tb-left > a");
        var quantityList = document.querySelectorAll(".opt-spin > input");
        var priceList = document.querySelectorAll(".tb-price");
        var totalPrice = 0;
        var items = [];

        for (var i = 0; i < idList.length; i++) {
            totalPrice += +priceList[i].innerText.replace(/[^\\d]/g, '');
            items.push({
                item_id: idList[i].href.split("branduid=")[1].split("&xcode")[0],
                item_name: nameList[i].innerText,
                item_list_name: listName,
                item_brand: brand,
                currency: currency,
                quantity: +quantityList[i].value.replace(/[^\\d]/g, ''),
                price: +priceList[i].innerText.replace(/[^\\d]/g, ''),
            });
        }

        console.log('add_to_cart', items);
        gtag('event', 'add_to_cart', {
            currency: currency,
            value: totalPrice,
            items: items
        });

        localStorage.removeItem('products');
        localStorage.setItem('products', JSON.stringify(items));
    }

    // Begin Checkout 페이지 조회 (결제 시작 페이지)
    if (window.location.href.indexOf("shop/order.html") > -1) {
        var items = JSON.parse(localStorage.getItem('products'));
        var totalPrice = 0;
        items.forEach((item) => totalPrice += item.price);
        console.log('begin_checkout', items);
        gtag('event', 'begin_checkout', {
            currency: currency,
            value: totalPrice,
            items: items
        });
    }

    // Purchase Done (반드시 개별디자인의 주문완료 페이지에 넣어야 한다. (공통 head에 넣으면 작동X))
    if (window.location.href.indexOf("shop/orderend") > -1) {
      var products = [];
      var brand = "${ga4_brand}";
      var affiliation = "${ga4_brand}";
      &lt;!--/loop_order_product/-->
      var goods_price = ('&lt;!--/order_product@price/-->').replace(/[^0-9]/g, '');
      products.push({
        'item_name': '&lt;!--/order_product@name/-->',
        'item_id': '&lt;!--/order_product@product_id/-->',
        'price': goods_price,
        'item_brand': brand,
        'quantity': '&lt;!--/order_product@amount/-->'
      });
      &lt;!--/end_loop/-->
      gtag('event', 'purchase', {
        "transaction_id": '&lt;!--/order_num/-->',
        "affiliation": affiliation,
        "value": '&lt;!--/pay_price/-->',
        "currency": "KRW",
        "items": products
      });
    }
  });`;
    result += "<br /><span class='grey'>&lt;/<span class='lightblue2'>script</span><span class='grey'>&gt;</span><br />";
    $("#generated_ga4_script").html("<pre>" + result + "</pre>");
  });

  $("#makeshop_ga4_gtm_eec_for_pc").on("click", function () { 
    let result = `
&lt;!-- 메이크샵 GA4 전자상거래 GTM 가이드 
메이크샵은 GTM으로 구현할 때 메이크샵 관리자 페이지에서 코드 삽입이 가능하다면
병행하는 것이 가장 좋습니다. 특히 구매완료 경우에는 넣어주면 간단하게 구현 가능합니다.
그 외 다른 페이지는 수정이 필요할 수 있습니다.
-->

// 상세페이지 조회
&lt;script>
  // 모바일 접속인 경우
  if (window.location.href.indexOf("m/product.html?branduid=") > -1) {
    if (document.querySelector("#pricevalue")) {
      dataLayer.push({
        event: "view_item",
        ecommerce: {
          currency: "KRW",
          value: document.querySelector("#pricevalue").innerText.replace(/[^\\d]/g, ''),
          items: [
            {
              item_id: window.location.href.split("branduid=")[1].split("&")[0],
              item_name: document.querySelector("#contents > div > div.prdDesc > h1").innerText,
              price: document.querySelector("#pricevalue").innerText.replace(/[^\\d]/g, ''),
              quantity: 1
            }
          ]
        }
      });
    } else {
      dataLayer.push({
        event: "view_item",
        ecommerce: {
          currency: "KRW",
          value: document.querySelector("#form1 > div.shopdetailInfoValue > p:nth-child(4) > span.shopdetailInfoCont").innerText.replace(/[^\\d]/g, ''),
          items: [
            {
              item_id: window.location.href.split("branduid=")[1].split("&")[0],
              item_name: document.querySelector("#contents > div > div.prdDesc > h1").innerText,
              price: document.querySelector("#form1 > div.shopdetailInfoValue > p:nth-child(4) > span.shopdetailInfoCont").innerText.replace(/[^\\d]/g, ''),
              quantity: 1
            }
          ]
        }
      });
    }
    
  }
  // PC인 경우
  else {
    if (document.querySelector("#pricevalue")) {
      dataLayer.push({
        event: "view_item",
        ecommerce: {
          currency: "KRW",
          value: document.querySelector("#pricevalue").innerText.replace(/[^\\d]/g, ''),
          items: [
            {
              item_id: window.location.href.split("branduid=")[1].split("&")[0],
              item_name: document.querySelector("#form1 > div > h3").innerText,
              price: document.querySelector("#pricevalue").innerText.replace(/[^\\d]/g, ''),
              quantity: 1
            }
          ]
        }
      });
    } else {
      dataLayer.push({
        event: "view_item",
        ecommerce: {
          currency: "KRW",
          value: document.querySelector("#form1 > div > div > table > tbody > tr:nth-child(3) > td > div").innerText.replace(/[^\\d]/g, ''),
          items: [
            {
              item_id: window.location.href.split("branduid=")[1].split("&")[0],
              item_name: document.querySelector("#form1 > div > h3").innerText,
              price: document.querySelector("#form1 > div > div > table > tbody > tr:nth-child(3) > td > div").innerText.replace(/[^\\d]/g, ''),
              quantity: 1
            }
          ]
        }
      });
    }
  }
&lt;/script>

// 장바구니 담기
&lt;script>
  // 모바일 접속인 경우
  if (window.location.href.indexOf("m/product.html?branduid=") > -1) {
    if (document.querySelector("#pricevalue")) {
      dataLayer.push({
        event: "add_to_cart",
        ecommerce: {
          currency: "KRW",
          value: document.querySelector("#pricevalue").innerText.replace(/[^\\d]/g, ''),
          items: [
            {
              item_id: window.location.href.split("branduid=")[1].split("&")[0],
              item_name: document.querySelector("#contents > div > div.prdDesc > h1").innerText,
              price: document.querySelector("#pricevalue").innerText.replace(/[^\\d]/g, ''),
              quantity: Number(document.querySelector("#MS_amount_basic_0").value)
            }
          ]
        }
      });
    } else {
      dataLayer.push({
        event: "add_to_cart",
        ecommerce: {
          currency: "KRW",
          value: document.querySelector("#form1 > div.shopdetailInfoValue > p:nth-child(4) > span.shopdetailInfoCont").innerText.replace(/[^\\d]/g, ''),
          items: [
            {
              item_id: window.location.href.split("branduid=")[1].split("&")[0],
              item_name: document.querySelector("#contents > div > div.prdDesc > h1").innerText,
              price: document.querySelector("#form1 > div.shopdetailInfoValue > p:nth-child(4) > span.shopdetailInfoCont").innerText.replace(/[^\\d]/g, ''),
              quantity: Number(document.querySelector("#MS_amount_basic_0").value)
            }
          ]
        }
      });
    }
  }
  // PC인 경우
  else {
    if (document.querySelector("#pricevalue")) {
      dataLayer.push({
        event: "add_to_cart",
        ecommerce: {
          currency: "KRW",
          value: document.querySelector("#pricevalue").innerText.replace(/[^\\d]/g, ''),
          items: [
            {
              item_id: window.location.href.split("branduid=")[1].split("&")[0],
              item_name: document.querySelector("#form1 > div > h3").innerText,
              price: document.querySelector("#pricevalue").innerText.replace(/[^\\d]/g, ''),
              quantity: Number(document.querySelector("#MS_amount_basic_0").value)
            }
          ]
        }
      });
    } else {
      dataLayer.push({
        event: "add_to_cart",
        ecommerce: {
          currency: "KRW",
          value: document.querySelector("#form1 > div > div > table > tbody > tr:nth-child(3) > td > div").innerText.replace(/[^\\d]/g, ''),
          items: [
            {
              item_id: window.location.href.split("branduid=")[1].split("&")[0],
              item_name: document.querySelector("#form1 > div > h3").innerText,
              price: document.querySelector("#form1 > div > div > table > tbody > tr:nth-child(3) > td > div").innerText.replace(/[^\\d]/g, ''),
              quantity: Number(document.querySelector("#MS_amount_basic_0").value)
            }
          ]
        }
      });
    }
  }
&lt;/script>

// 결제시작
&lt;script>
  dataLayer.push({ ecommerce: null });
  
  if (window.location.href.indexOf("/m/order.html") > -1) {
    var productIdArr = document.querySelectorAll("#order_form > ul > li > figure > div > a");
    var productNameArr = document.querySelectorAll("#order_form > ul > li > figure > figcaption > p.pname.bold");
    var productPriceArr = document.querySelectorAll("#order_form > ul > li > figure > figcaption > p.pprice > span");
    var productQtyArr = document.querySelectorAll("#order_form > ul > li > figure > figcaption > p.pprice");
    var totalPrice = 0;
    var products = [];

    for (var i = 0; i < productIdArr.length; i++) {
      totalPrice += Number(productPriceArr[i].innerText.replace(/[^\\d]/g, ''));
      var product = {
        item_id: productIdArr[i].href.split("branduid=")[1],
        item_name: productNameArr[i].innerText,
        price: Number(productPriceArr[i].innerText.replace(/[^\\d]/g, '')),
        quantity: Number(productQtyArr[i].innerText.split("/")[1].replace(/[^\\d]/g, ''))
      };
      products.push(product);
    }

    dataLayer.push({
      event: "begin_checkout",
      ecommerce: {
        currency: "KRW",
        value: totalPrice,
        items: products
      }
    });
  } 
  // PC인 경우
  else {
    var productIdArr = document.querySelectorAll(".tb-left > a");
    var productNameArr = document.querySelectorAll(".tb-left > a");
    var productPriceArr = document.querySelectorAll("td:nth-child(4) > div.tb-center")
    var productQtyArr = document.querySelectorAll("td:nth-child(3) > div.tb-center");
    var products = [];
    var totalPrice = 0;

    for (var i = 0; i < productIdArr.length; i++) {
      totalPrice += Number(productPriceArr[i].innerText.replace(/[^\\d]/g, ''));
      var product = {
        item_id: productIdArr[i].href.split("branduid=")[1],
        item_name: productNameArr[i].innerText,
        price: Number(productPriceArr[i].innerText.replace(/[^\\d]/g, '')),
        quantity: Number(productQtyArr[i].innerText.replace(/[^\\d]/g, ''))
      };
      products.push(product);
    }

    dataLayer.push({
      event: "begin_checkout",
      ecommerce: {
        currency: "KRW",
        value: totalPrice,
        items: products
      }
    });
  }
&lt;/script>

// 구매완료 (아래 코드를 먼저 메이크샵 관리자 페이지를 통해서 PC와 모바일 각각 주문완료 쪽에 넣어줍니다.)
/*
var ga4_products = [];
&lt;!--/loop_order_product/-->
var ga4_totalPrice = '&lt;!--/pay_price/-->';
var ga4_transaction_id = '&lt;!--/order_num/-->';
var goods_price = ('&lt;!--/order_product@price/-->').replace(/[^0-9]/g, '');
ga4_products.push({
  'item_name': '&lt;!--/order_product@name/-->',
  'item_id': '&lt;!--/order_product@product_id/-->',
  'price': goods_price,
  'quantity': '&lt;!--/order_product@amount/-->'
});
&lt;!--/end_loop/-->

그리고 아래 코드를 GTM에 구매 완료 페이지 DOM을 트리거로 하여 넣어주면 됩니다.
*/
&lt;script>
  dataLayer.push({ ecommerce: null });
  dataLayer.push({
    event: "purchase2",
    ecommerce: {
      value: Number(ga4_totalPrice),
      transaction_id: ga4_transaction_id,
      currency: "KRW",
      items: ga4_products
    }
  });
&lt;/script>
`;
    $("#generated_ga4_script").html("<pre>" + result + "</pre>");
  });

  $("#sixshop_ga4_eec").on("click", function () { 
    document.querySelector("#ga4_id").value = "";
    document.querySelector("#ga4_brand").value = "";
    let result = "<span class='grey'>&lt;</span><span class='lightblue2'>script</span><span class='grey'>&gt;</span>";
    result += `
  window.addEventListener('load', function(event) {
    // GA4 (Google Analytics 4) E-Commerce (전자상거래) 코드 (식스샵)
    // 공통변수 (웹사이트에 따라 적절하게 변경하세요) (네이버 페이 미포함 버전이니 네이버 페이 경우에는 별도로 코드 추가 요함!!!)
    var brand = '${ga4_brand}';
    var affiliation = '${ga4_brand}';
    var listName = 'Search Results';
    var currency = 'KRW';

    // 제품 상세 페이지 조회 
    if (window.location.href.indexOf("product") > -1) {
        var price = 
            document.querySelector("#shopProductPrice > span.productDiscountPriceSpan") == null ? 
            +document.querySelector("#shopProductPrice")?.innerText.replace(/[^\\d]/g, '') :
            +document.querySelector("#shopProductPrice > span.productDiscountPriceSpan")?.innerText.replace(/[^\\d]/g, '');

        gtag('event', 'view_item', {
            currency: currency,
            value: price,
            items: [
                {
                    item_id: document.querySelector("#shopProductImgsDiv").attributes["imgsrc"].value.split("/image_")[1].split(".")[0],
                    item_name: document.querySelector("#shopProductName").innerText, 
                    tiem_list_name: listName,
                    item_brand: brand,
                    price: price,
                }
            ]
        });

        console.log('view_item', items);
    }

    // 장바구니 페이지 조회
    if (window.location.href.indexOf("cart") > -1) {
        var idList = document.querySelectorAll("div.product > div.img > a > img"); 
        var nameList = document.querySelectorAll("div.product > div.text > div.name > a");
        var quantityList = document.querySelectorAll("div.QuantityDiv > span > input");
        var priceList = document.querySelectorAll("div.shopCartPrice.price");
        var totalPrice = 0;
        var items = [];

        for (var i = 0; i < idList.length; i++) {
            totalPrice += +priceList[i].innerText.replace(/[^\\d]/g, '');
            items.push({
                item_id: idList[i].src.split("/image_")[1].split(".")[0],
                item_name: nameList[i].innerText,
                item_list_name: listName,
                item_brand: brand,
                quantity: +quantityList[i].value.replace(/[^\\d]/g, ''),
                price: +priceList[i].innerText.replace(/[^\\d]/g, ''),
            });
        }

        console.log('add_to_cart', items);
        gtag('event', 'add_to_cart', {
            currency: currency,
            value: totalPrice,
            items: items
        });
    }

    // Begin Checkout 페이지 조회 (결제 시작 페이지)
    if (window.location.href.indexOf("/order/") > -1) {
        var idList = document.querySelectorAll(".order-item-thumbnail"); 
        var nameList = document.querySelectorAll(".item-title");
        var quantityList = document.querySelectorAll(".item-qty-and-price-wrapper");
        var priceList = document.querySelectorAll(".item-qty-and-price-wrapper");
        var totalPrice = 0;
        var items = [];

        for (var i = 0; i < idList.length; i++) {
            totalPrice += +priceList[i].innerText.split("/")[1].replace(/[^\\d]/g, '');
            items.push({
                item_id: idList[i].src.split("/image_")[1].split(".")[0],
                item_name: nameList[i].innerText,
                item_list_name: listName,
                item_brand: brand,
                quantity: +quantityList[i].innerText.split("개")[0].replace(/[^\\d]/g, ''),
                price: +priceList[i].innerText.split("/")[1].replace(/[^\\d]/g, ''),
            });
        }

        gtag('event', 'begin_checkout', {
            currency: currency,
            value: totalPrice,
            items: items
        });

        localStorage.removeItem('products');
        localStorage.setItem('products', JSON.stringify(items));
    }

    // Purchase Done
    if (window.location.href.indexOf("/payment/") > -1) {
        var items = JSON.parse(localStorage.getItem('products'));
        var transaction_id = document.querySelector('#content_div > div.content.designSettingElement.text-body > div:nth-child(2) > input').value;
        var totalPrice = 0;
        items.forEach((item) => totalPrice += item.price);

        gtag('event', 'purchase', {
            transaction_id: transaction_id,
            affiliation: affiliation,
            value: totalPrice,
            currency: currency,
            items: items
        });
    }
  });`;
    result += "<br /><span class='grey'>&lt;/<span class='lightblue2'>script</span><span class='grey'>&gt;</span><br />";
    $("#generated_ga4_script").html("<pre>" + result + "</pre>");
  });

  $("#cafe24_dr").on("click", function () { 
    let result = "<span class='grey'>&lt;</span><span class='lightblue2'>script</span><span class='grey'>&gt;</span>";
    result += `
      window.addEventListener('load', function (event) {
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
      // Interval Script for GTM Custom HTML
      var count1 = 0;
      var conversion_interval;

      function conversions() {
        if (count1 == 0 && window.location.href.indexOf('about') > -1) {
          count1 = 1;
          window.dataLayer = window.dataLayer || [];
          window.dataLayer.push({ 'event': 'event_name' });
        }

        // 전환 발생이 확인된 경우 
        if (count1 == 1) {
          clearInterval(conversion_interval);
        }
      }

      conversion_interval = setInterval(conversions, 3000);
      

      // Basic Interval (set Interval)
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

      setInterval(conversions, 1000);
      
      
      // Interval Script Count Once (NOT FOR GTM)
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
      let conversion_interval = setInterval(conversions, 1000);
      `;
    result += "<br /><span class='grey'>&lt;/<span class='lightblue2'>script</span><span class='grey'>&gt;</span><br />";
    $("#generated_ads_script").html("<pre>" + result + "</pre>");
  });

  $("#ads_script_for_page_count").on("click", function () { 
    let result = "<span class='grey'>&lt;</span><span class='lightblue2'>script</span><span class='grey'>&gt;</span>";
    result += `
  // 페이지 카운트 숫자 기준점 (여기에서는 3 페이지 이상)
  var page_count_number = 3;

  // 페이지 카운트가 시작된 경우
  if (sessionStorage.getItem("pageCount") != null || sessionStorage.getItem("pageCount") != undefined) {
    var count = Number(sessionStorage.getItem("pageCount"));

    // 페이지 카운트가 기준점 이상일 경우
    if (count >= page_count_number - 1) {
      sessionStorage.removeItem("pageCount");

      // 데이터레이어 맞춤 이벤트 트리거
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({ 'event': 'event_name' });
    } 
    // 페이지 카운트가 기준점 미만일 경우
    else {
      count++;
      sessionStorage.setItem("pageCount", count);
    }
  }
  // 페이지 카운트가 최초로 시작되는 경우 
  else {
    sessionStorage.setItem("pageCount", 1);
  }`;
    result += "<br /><span class='grey'>&lt;/<span class='lightblue2'>script</span><span class='grey'>&gt;</span><br />";
    $("#generated_ads_script").html("<pre>" + result + "</pre>");
  });

  $("#ads_script_for_sixshop_variables").on("click", function () { 
    let result = "<span class='grey'>&lt;</span><span class='lightblue2'>script</span><span class='grey'>&gt;</span>";
    result += `
    // 식스샵 결제완료 치환변수 (출처: https://lovelypeter.tistory.com/556)
    var price = '\${customerVar_double_orderTotalPrice}';
    var orderNo = '\${customerVar_string_orderNo}';
    var currency = '\${customerVar_string_orderCurrency}';`;
    result += "<br /><span class='grey'>&lt;/<span class='lightblue2'>script</span><span class='grey'>&gt;</span><br />";
    $("#generated_ads_script").html("<pre>" + result + "</pre>");
  });

  $("#ads_script_for_godomall_variables").on("click", function () { 
    let result = "<span class='grey'>&lt;</span><span class='lightblue2'>script</span><span class='grey'>&gt;</span>";
    result += `
    // 고도몰 치환변수 (출처: https://lovelypeter.tistory.com/554?category=335860)
    var price = '\${=gd_isset(goodsView['goodsPrice'],0)} / {=gd_money_format(..goodsPrice)} ';
    var orderNo = '\${goodsView.goodsNo}';
    var currency = '\${=gd_currency_symbol()}';`;
    result += "<br /><span class='grey'>&lt;/<span class='lightblue2'>script</span><span class='grey'>&gt;</span><br />";
    $("#generated_ads_script").html("<pre>" + result + "</pre>");
  });

  $("#ads_script_for_makeshop_variables").on("click", function () { 
    let result = "<span class='grey'>&lt;</span><span class='lightblue2'>script</span><span class='grey'>&gt;</span>";
    result += `
    // 메이크샵 치환변수
    var price = '&lt;!--/pay_price/-->';
    var orderNo = '&lt;!--/order_num/-->';`;
    result += "<br /><span class='grey'>&lt;/<span class='lightblue2'>script</span><span class='grey'>&gt;</span><br />";
    $("#generated_ads_script").html("<pre>" + result + "</pre>");
  });

  $("#ads_script_for_shopify_variables").on("click", function () { 
    let result = "<span class='grey'>&lt;</span><span class='lightblue2'>script</span><span class='grey'>&gt;</span>";
    result += `
    // 쇼피파이 치환변수
    {% if first_time_accessed %}
      gtag('event', 'conversion', {
        'send_to': 'AW-123456789/ABCDEFGHIJK',
        'value': {{ checkout.subtotal_price | divided_by: 100.0 }},
        'currency': '{{ currency }}',
        'transaction_id': '{{ order_number }}
      });
    {% endif %}`;
    result += "<br /><span class='grey'>&lt;/<span class='lightblue2'>script</span><span class='grey'>&gt;</span><br />";
    $("#generated_ads_script").html("<pre>" + result + "</pre>");
  });

  $("#enhanced_conversion").on("click", function () { 
    let result = "<span class='grey'>&lt;</span><span class='lightblue2'>script</span><span class='grey'>&gt;</span>";
    result += `
      // 3가지 기본 템플릿이니 상황에 맞게 적용한다.

      // 템플릿 1
      // 전역변수로 향상된 데이터 선언한다.
      var enhanced_conversion_data;
      window.addEventListener("load", function(event) {
        if (window.location.href.indexOf("examplePage.html") > -1) {
          enhanced_conversion_data = {
            "email": document.querySelector("#userEmailInput1").innerText;
          };
        }
      });

      // 템플릿 2
      var enhanced_conversion_data;
      window.addEventListener("load", function(event) {
        document.querySelector("selector")?.addEventListener("click", function() {
          // Input인 경우에는 value를 그 경우가 아니라면 아래 이메일 변수에 innerText를 사용한다.
          enhanced_conversion_data = {
            "email": document.querySelector("#userEmailInput1").innerText;
          };
        });
      });

      // 템플릿 3
      window.onload = conversion;
      var enhanced_conversion_data;

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
            enhanced_conversion_data = {
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
      }

      // 템플릿 4 (총 예제)
      &lt;script>
        var enhanced_conversion_data;
        window.addEventListener("load", function(event) {
          document.querySelector("#userEmail")?.addEventListener("change", function() {
            enhanced_conversion_data = {
              "email": document.querySelector("#userEmail").value
            };
          });
        });
      &lt;/script>

      &lt;script async src="https://www.googletagmanager.com/gtag/js?id=AW-1234">&lt;/script>
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());

        gtag('config', 'AW-1234', { 
          'allow_enhanced_conversions': true
        });
      &lt;/script>

      &lt;script>
        window.addEventListener("load", function(event) {
          document.querySelector("#ec_submitButton").addEventListener("click", function() {
            gtag("event", "conversion", {
              send_to: "AW-1234/123456789",
            });
          });
        });
      &lt;/script>
      `;
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
      });
      
      // Input칸이 많은 경우 (GTM Custom Javascript + 반복문 활용)
      // 모든 text입력하는 input를 배열로 저장.
      function() {
        var arr = document.querySelectorAll("input[type='text']");

        // 모든 checkbox 중에 하나라도 선택되어 있는지 체크하는 변수 (checkbox는 하나 이상 체크 가능하며, 체크가 되어 있지 않다면 null값으로 지정됨)
        var checkbox1 = document.querySelector("input[type='checkbox']:checked");

        // 모든 radio button에서 선택되어 있는지 체크하는 변수 (radio button은 하나만 선택 가능하며, 체크가 되어 있지 않다면 null값으로 지정됨) 
        var radioButton1 = document.querySelector("input[type='radio']:checked");
        
        // checkbox1 혹은 radioButton1이 선택되어 있지 않다면 false를 반환한다.
        if (checkbox1 == null || radioButton1 == null) {
          return false;
        }

        for (var i = 0; i < arr.length; i++) {
          // 생략 가능한 입력값인지 체크한다.
          if (arr[i].id != "입력생략해도무방한css_selector_id붙여넣으세요") {
            // 필수입력값이 공백인지 체크하며 공백인 경우 false를 반환한다.
            if (arr[i].value == "") {
              return false;
            }
          }
        }

        // 필수 입력값이 공백이 아닌 경우 true를 반환한다.
        return true;
      }`;
    result += "<br /><span class='grey'>&lt;/<span class='lightblue2'>script</span><span class='grey'>&gt;</span><br />";
    $("#generated_ads_script").html("<pre>" + result + "</pre>");
  });

  $("#regex_for_replace").on("click", function () { 
    let result = `
    1. 숫자 이외 문자열을 공백으로 처리
    .replace(/[^\\d]/g, '')
    
    2. 숫자와 - 이외 문자열을 공백으로 처리
    .replace(/[^\\d-]/g, '')

    3. 달러 같은 경우에 소수점(센트) 표시 (예시 $12.34 => 12.34)
    .replace(/[^\\d.]/g, '')

    4. 이메일만 추출
    .match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\\.[a-zA-Z0-9_-]+)/gi)[0]
    (사용예시)
    document.querySelector("#emailText").innerText.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\\.[a-zA-Z0-9_-]+)/gi)[0];

    5. 네이버 페이 거래 ID 추출
    document.querySelector(".npay_btn_pay").id.split("NPAY_BUY_LINK_IDNC_ID_")[1];
    `;
    $("#generated_ads_script").html("<pre>" + result + "</pre>");
  });

  $("#gtm_js_custom_variable").on("click", function () { 
    let result = `
// Template 1
function() {
  return 
}

// Template 2
function() {
  if (window.location.href.indexOf("example") > -1) {
    return
  } else {
    return
  }
}

// Template 3
function() {
  if (true) {
    if (true) {
      return
    } else {
      return
    }
  } else {
    return
  }
}

// Template 4
function() {
  if (document.querySelector("testInput1").value != "" &&
  document.querySelector("testInput2").value != "" &&
  document.querySelector("testInput3").value != "")
  {
    return true;
  } else {
    return false;
  }
}`;
    $("#generated_ads_script").html("<pre>" + result + "</pre>");
  });

  $("#makeshop_dr").on("click", function () { 
    let result = "<span class='grey'>&lt;</span><span class='lightblue2'>script</span><span class='grey'>&gt;</span>";
    result += `
  메이크샵 DR 구현시 주의사항은 head 공통상단영역에 넣는 것이 아니라
  개별 페이지(상세 페이지, 상품 리스트 페이지, 구매완료 페이지)에 넣어야 하며 
  장바구니는 치환 코드 방식이 아니어서 별도 페이지에 넣을 필요가 없다.
  아래 코드에 앞서 당연히 gtag 선언부(global site tag)가 들어가 있어야 아래에 있는 gtag 함수를 호출할 수 있으니 반드시 확인한다.
  window.addEventListener('DOMContentLoaded', function(event) {
    var google_business_vertical = "retail";

    // VIEW ITEM
    if (window.location.href.indexOf("shopdetail.html") > -1) {
      var ids = [];
      ids.push({ 'id': '&lt;!--/number/-->', 'google_business_vertical': google_business_vertical });
      totalPrice = ('&lt;!--/number/price_sell/-->').replace(/[^0-9]/g, "");
      gtag('event', 'view_item', {
        'value': totalPrice,
        'items': ids
      });
    }
  });

  window.addEventListener('DOMContentLoaded', function(event) {
    var google_business_vertical = "retail";

    // VIEW ITEM LIST
    if (window.location.href.indexOf("shopbrand.html") > -1) {
      var totalPrice = 0;
      var ids = [];
      &lt;!--/loop_product/-->
          ids.push({ 'id': '&lt;!--/product@uid/-->', 'google_business_vertical': google_business_vertical });
          totalPrice += Number('&lt;!--/product@price_sell/-->');
      &lt;!--/end_loop/-->
      gtag('event', 'view_item_list', {
          'value': totalPrice,
          'items': ids
      });
    }
  });

  window.addEventListener('DOMContentLoaded', function(event) {
    var google_business_vertical = "retail";

    // ADD TO CART (장바구니는 치환코드 방식이 아니므로 head 부분 혹은 장바구니 페이지에 적절하게 아래 변수 검증 후에 삽입하면 된다.)
    if (window.location.href.indexOf("basket") > -1) {
      var ids = [];
      var getID = document.getElementsByName('branduid');
      for(var i = 0; i < getID.length; i++){
          ids.push({ 'id': getID[i].value, 'google_business_vertical': google_business_vertical });
      }
      gtag('event', 'add_to_cart', {
          'value': Number($('.MK_chg_none_groupsale_total_price_sell.MK_change_price').text().replace(/[^0-9]/g, '')),
          'items': ids
      });
    }
  });

  window.addEventListener('DOMContentLoaded', function(event) {
    var google_business_vertical = "retail";

    // PURCHASE
    var ids = [];
    var totalPrice = '&lt;!--/pay_price/-->';
    &lt;!--/loop_order_product/-->
        ids.push({ 'id': '&lt;!--/order_product@product_id/-->', 'google_business_vertical': google_business_vertical });
    &lt;!--/end_loop/-->
    gtag('event', 'purchase', {
        'value': totalPrice,
        'items': ids
    });
  });`;
    result += "<br /><span class='grey'>&lt;/<span class='lightblue2'>script</span><span class='grey'>&gt;</span><br />";
    $("#generated_dr_script").html("<pre>" + result + "</pre>");
  });

  $("#godomall_dr").on("click", function () { 
    let result = "<span class='grey'>&lt;</span><span class='lightblue2'>script</span><span class='grey'>&gt;</span>";
    result += `
    window.addEventListener('load', function(event) {
      var viewItemPage = /goods_view/.test(window.location.pathname);
      var cartPage = /cart/.test(window.location.pathname);
      var listPage = /goods_list/.test(window.location.pathname);
      var searchPage = /goods_search/.test(window.location.pathname);
      var purchasePage = /order_end/.test(window.location.pathname);
    
      var ids = [];
      var google_business_vertical = 'retail';
      var totalPrice = 0;
    
      function callGtag(eventPageType, totalPrice, ids){
          gtag('event', eventPageType, {
              'Value': totalPrice,
              'items':ids
          })
      }
      function pushIds(array, google_business_vertical){
          for(var i = 0; i < arrCart.length; i++){
              ids.push({ 'id': arrCart[i].dataset.goodsNo, 'google_business_vertical': google_business_vertical });
              totalPrice += Number(arrCart[i].dataset.price);
          }
      }
    
      if(viewItemPage){
          ids.push({ 'id': goodsNo , 'google_business_vertical': google_business_vertical });
          totalPrice = product_price;
          callGtag('view_item', Number($('input[name=set_total_price]').val()), ids);
      }
      else if(cartPage){
          var arrCart =  $('input[name="cartSno[]"]');
          for(var i = 0; i < arrCart.length; i++){
              ids.push({ 'id': arrCart[i].dataset.goodsNo, 'google_business_vertical': google_business_vertical });
              totalPrice += Number(arrCart[i].dataset.price);
          }
          callGtag('add_to_cart', totalPrice, ids);
      }
      else if(listPage){
          var arrList = $('button[class="btn_basket_get btn_add_wish_"]');
          for(var i = 0; i < arrList.length; i++){
              ids.push({ 'id': arrList[i].dataset.goodsNo, 'google_business_vertical': google_business_vertical });
              totalPrice += Number(arrList[i].dataset.goodsPrice);
          }
          callGtag('view_search_results', totalPrice, ids);
      }
      else if(searchPage){
          pushIds(array);
          var arrSearch = $('.item_photo_box');
          for(var i = 0; i < arrSearch.length; i++){
              ids.push({ 'id': arrSearch[i].children[0].href.replace(/[^0-9]/g,''), 'google_business_vertical': google_business_vertical });
          }
          callGtag('view_item_list', '', ids);
      }
      else if(purchasePage){
          var e = $('input[name=naver-common-inflow-script-order-item]');
          for(var i = 0; i < e.length; i++){
              var detail = eval('(' + e[i].value + ')');
              ids.push({ 'id': detail.goodsno, 'google_business_vertical': google_business_vertical });
              totalPrice += detail.price;
          }
          callGtag('purchase', totalPrice, ids);
      }
    });`;
    result += "<br /><span class='grey'>&lt;/<span class='lightblue2'>script</span><span class='grey'>&gt;</span><br />";
    $("#generated_dr_script").html("<pre>" + result + "</pre>");
  });

  $("#godomall_dr_gtm").on("click", function () { 
    let result = "<span class='grey'>&lt;</span><span class='lightblue2'>script</span><span class='grey'>&gt;</span>";
    result += `
    // 이 전체 코드를 GTM의 CUSTOM HTML에다가 삽입하시고, 트리거는 DOM Ready로 모든 페이지에 집어 넣어주세요.
    // 그리고 Dynamic Remarketing 가이드를 참고하여 Ads Remarketing 태그를 적절하게 수정해주세요.
    (function() {
      view = /goods_view/.test(location.pathname)
      cart = /cart/.test(location.pathname)
      checkout = location.pathname === '/order/order.php'
      purchase = /order_end/.test(location.pathname)
    
      if(view) {
        Id = location.href.split('goodsNo=')[1]
        Items = []
    
        Items.push({
          'id': Id,
          'google_business_vertical': 'retail'
        })
    
        console.log('view', Items)
        //
        dataLayer.push({
          'event': 'view_item',
          'items': Items
          });
        //
      }
    
      if(cart) {
        Id = document.querySelectorAll('[class="pick_add_img"] > a')
        Items = []
    
        for(var a = 0; a < Id.length; a++) {
          Items.push({
            'id': Id[a].href.split('goodsNo=')[1],
            'google_business_vertical': 'retail'
          })
        }
    
        console.log('cart', Items)
        //
        dataLayer.push({
          'event': 'add_to_cart',
          'items': Items
          });
        //
      }
    
      if(checkout) {
        Id = document.querySelectorAll('[class="pick_add_img"] > a')
        Items = []
    
        for(var a = 0; a < Id.length; a++) {
          Items.push({
            'id': Id[a].href.split('goodsNo=')[1],
            'google_business_vertical': 'retail'
          })
        }
    
        console.log('checkout', Items)
        sessionStorage.setItem('items', JSON.stringify(Items))
      }
    
      if(purchase) {
        getItems = JSON.parse(sessionStorage.getItem('items'))
    
        console.log('purchase', getItems)
        //
        dataLayer.push({
          'event': 'purchase',
          'items': getItems
          });
        //
      }
    })()`;
    result += "<br /><span class='grey'>&lt;/<span class='lightblue2'>script</span><span class='grey'>&gt;</span><br />";
    $("#generated_dr_script").html("<pre>" + result + "</pre>");
  });

  $("#imweb_dr").on("click", function () { 
    let result = "<span class='grey'>&lt;</span><span class='lightblue2'>script</span><span class='grey'>&gt;</span>";
    result += `
    window.addEventListener('load', function(event) {
      var viewItemPage = /viewall/.test(window.location.pathname);
      var cartPage = /shop_cart/.test(window.location.pathname);
      var listPage = /list/.test(window.location.pathname);
      var searchPage = /search/.test(window.location.pathname);
      var checkoutPage = /shop_payment/.test(window.location.pathname);
      var purchasePage = /order_result/.test(window.location.pathname);

      var google_business_vertical = 'retail';
      var ids = [];
      var totalPrice = 0;

      function callGtag(eventPageType, ids){
          gtag('event', eventPageType, {
              'items':ids
          })
      }

      if(viewItemPage){
          ids.push({ 'id': $('link[rel="canonical"]')[0].href.replace(/[^0-9]/g,''), 'google_business_vertical': google_business_vertical });
          callGtag('view_item', ids);
      }
      else if(cartPage){
          var e = $('.cart-item-wrap');
          for(var i = 0; i < e.length; i++){
              ids.push({ 'id': e[i].href.replace(/[^0-9]/g,''), 'google_business_vertical': google_business_vertical });
          }
          callGtag('add_to_cart', ids);
      }
      else if(listPage){
          var e = $('._fade_link.shop-item-thumb');
          for(var i = 0; i< e.length; i++){
              ids.push({ 'id': e[i].href.replace(/[^0-9]/g,''), 'google_business_vertical': google_business_vertical });
          }
          callGtag('view_item_list', ids);
      }
      else if(searchPage){
          var e = $('.box_thumb > a');
          for(var i = 0; i< e.length; i++){
              ids.push({ 'id': e[i].href.replace(/[^0-9]/g,''), 'google_business_vertical': google_business_vertical });
          }
          callGtag('view_search_results', ids);
      }
      else if(checkoutPage){
          var e = $('.shop_item_thumb > a');
          var ids = [];
          for(var i = 0; i< e.length; i++){
              ids.push(e[i].href.replace(/[^0-9]/g,''))
          }
          localStorage.removeItem('ids');
          localStorage.setItem('ids', ids);
      }
      else if(purchasePage){
          var e = localStorage.getItem('ids').split(',');
          var ids = [];
          for(var i = 0; i < e.length; i++){
              ids.push({ 'id': e[i], 'google_business_vertical': google_business_vertical });
          }
          callGtag('purchase', ids);
      }
    });`;
    result += "<br /><span class='grey'>&lt;/<span class='lightblue2'>script</span><span class='grey'>&gt;</span><br />";
    $("#generated_dr_script").html("<pre>" + result + "</pre>");
  });

  $("#basic_dr").on("click", function () {
    let result = "<span class='grey'>&lt;</span><span class='lightblue2'>script</span><span class='grey'>&gt;</span>";
    result += `
      window.addEventListener('load', function (event) {
        var google_business_vertical = 'retail';
        var 상세_페이지 = window.location.href.indexOf("view_item.html") > -1;
        var 상품_리스트_페이지 = window.location.href.indexOf("view_item_list") > -1;
        var 장바구니_페이지 = window.location.href.indexOf("basket") > -1;
        var 주문완료_페이지 = window.location.href.indexOf("order_complete") > -1;

        if (상품_리스트_페이지) {
          var 동적_리마케팅_상품배열 = [];
          var 상품_배열 = document.querySelectorAll("td > a");
          상품_배열.forEach(function(상품_아이디) {
              동적_리마케팅_상품배열.push({
                  'id': 상품_아이디.href.split("item_id=")[1],
                  'google_business_vertical': google_business_vertical
              });
          });
          gtag('event', 'view_item_list', {
              'items': 동적_리마케팅_상품배열
          });
        }
        else if (상세_페이지) {
          var 상품_아이디 = window.location.href.split("item_id=")[1];
          gtag('event', "view_item", {
              'items': [
                  {
                      'id': 상품_아이디,
                      'google_business_vertical': google_business_vertical
                  }
              ]
          });
        }
        else if (장바구니_페이지) {
          var 상품_아이디 = window.location.href.split("item_id=")[1];
          gtag('event', "add_to_cart", {
              'items': [
                  {
                      'id': 상품_아이디,
                      'google_business_vertical': google_business_vertical
                  }
              ]
          });
        }
        else if (주문완료_페이지) {
          var 상품_아이디 = window.location.href.split("item_id=")[1].split("&order_no")[0];
          gtag('event', "purchase", {
              'items': [
                  {
                      'id': 상품_아이디,
                      'google_business_vertical': google_business_vertical
                  }
              ]
          });
        }
      });`;
    result += "<br /><span class='grey'>&lt;/<span class='lightblue2'>script</span><span class='grey'>&gt;</span><br />";
    $("#generated_dr_script").html("<pre>" + result + "</pre>");
  });

  $("#shopify_dr").on("click", function () {
    let result = "<span class='grey'>&lt;</span><span class='lightblue2'>script</span><span class='grey'>&gt;</span>";
    result += `
    //////////////////////////////////////////////////////////////////////
    /*
    Refer to https://ratanjhadigital.com/setup-adwords-dynamic-remarketing-shopify/ for further information.
    Login to Shopify and go to Online Store > Themes > Edit HTML/CSS
    Scroll to the bottom to the Snippet section in the left navigation bar
    Click ‘Add a new snippet’ and give it the name – adwords-dynamic-remarketing
    */
    &lt;!-- Global site tag (gtag.js) - Google Ads: 000000 -->
    &lt;script async src="https://www.googletagmanager.com/gtag/js?id=AW-000000">&lt;/script&gt;
    &lt;script&gt;
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      <!-- Event snippet for dynamic remarketing -->
      gtag('config', 'AW-000000');
    &lt;/script&gt;
    {% if template contains 'index' %}
    &lt;script&gt;
    gtag('event', 'page_view', {
      'send_to': 'AW-000000',
      'ecomm_pagetype': 'home'
    });
    &lt;/script&gt;
    {% elsif template contains 'collection' %}
    &lt;script&gt;
    gtag('event', 'view_item_list', {
      'send_to': 'AW-000000',
      'ecomm_pagetype': 'category'
    })
    &lt;/script&gt;
    {% elsif template contains 'product' %}
    &lt;script&gt;
    gtag('event', 'view_item', {
      'send_to': 'AW-000000',
      'ecomm_pagetype': 'product',
      'ecomm_prodid': '{{ product.id }}',
      'ecomm_totalvalue': '{{ product.price | money_without_currency | remove: ',' }}'
    });
    &lt;/script&gt;
    {% elsif template contains 'cart' %}
    &lt;script&gt;
    gtag('event', 'view_cart', {
      'send_to': 'AW-000000',
      'ecomm_pagetype': 'cart',
      'ecomm_prodid': [{% for item in cart.items %}'{{item.product.id}}'{% unless forloop.last %},{% endunless %}{% endfor %}],
      'ecomm_totalvalue': '{{cart.total_price | money_without_currency | remove: ',' }}'
    });
    &lt;/script&gt;
    {% elsif template contains 'search' %}
    &lt;script&gt;
    gtag('event', 'view_search_results', {
      'send_to': 'AW-000000',
      'ecomm_pagetype': 'searchresults'
    });
    &lt;/script&gt;
    {% else %}
    &lt;script&gt;
    gtag('event', 'page_view', {
      'send_to': 'AW-000000',
      'ecomm_pagetype': 'other'
    });
    &lt;/script&gt;
    {% endif %}

    //////////////////////////////////////////////////////////////////////
    Online Store에서 Themes 클릭하고 Actions -> Edit Code 눌러서 <head> 태그 안에 삽입
    &lt;!-- Google AdWords Dynamic Remarketing -->
    {% include 'adwords-dynamic-remarketing' %}
    
    //////////////////////////////////////////////////////////////////////
    마지막으로 Settings > Checkout > Additional Scripts 가서 아래 코드 삽입
    {% if first_time_accessed %}
    &lt;script async src="https://www.googletagmanager.com/gtag/js?id=AW-000000">&lt;/script&gt;
    &lt;script&gt;
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());

      gtag('config', 'AW-000000');
    &lt;/script&gt;
    &lt;script&gt;
    gtag('event', 'purchase', {
      'send_to': 'AW-000000',
      'ecomm_pagetype': 'purchase',
      'ecomm_prodid': [{% for item in checkout.line_items %}'{{line_item.sku}}',{% endfor %}],
      'ecomm_totalvalue': {{ checkout.total_price | money_without_currency | remove:',' }}
    });
    &lt;/script&gt;
    {% endif %}`;
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
      var view_item_price = +document.querySelector("css_selector").innerText.replace(/[^\\d]/g, '')
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
      var cart_price = +document.querySelector("css_selector").innerText.replace(/[^\\d]/g, '')
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
      var begin_checkout_price = +document.querySelector("css_selector").innerText.replace(/[^\\d]/g, '')
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
      var purchase_price = +document.querySelector("css_selector").innerText.replace(/[^\\d]/g, '')
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
    }
    
    // GTM 상세페이지 및 장바구니 (add_to_cart로 변경)
    dataLayer.push({ ecommerce: null });  // Clear the previous ecommerce object.
    dataLayer.push({
      event: "view_item",
      ecommerce: {
        items: [
          {
            item_id: window.location.href.split("item_id=")[1].substring(0, 1),
            item_name: document.querySelector("#itemName").innerText,
            price: document.querySelector("#price").innerText.replace(/[^\d]/g, ''),
            quantity: 1
          }
        ]
      }
    });

    // GTM 구매완료
    dataLayer.push({ ecommerce: null });  // Clear the previous ecommerce object.
    dataLayer.push({
      event: "purchase",
      ecommerce: {
        value: document.querySelector("#totalPrice").innerText.replace(/[^\d]/g, ''),
        transaction_id: new Date().getTime(),
        currency: "KRW", 
        items: [
          {
            item_id: window.location.href.split("item_id=")[1].substring(0, 1),
            item_name: document.querySelector("#product_title").innerText,
            currency: "KRW",
            price: document.querySelector("#total_price").innerText.replace(/[^\d]/g, ''),
            quantity: 1
          }
        ]
      }
    });`;
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
    let ads_cvalue_querySelectors = $(".ads_cvalue_querySelector");
    let ads_cvalue_append_values = $(".ads_cvalue_append_value");
    let ads_cvalue_append_innerTexts = $(".ads_cvalue_append_innerText");
    let ads_transactionId_regexes = $(".ads_tid_regex");
    let ads_transactionId_querySelectors = $(".ads_tid_querySelector");
    let ads_transactionId_append_values = $(".ads_tid_append_value");
    let ads_transactionId_append_innerTexts = $(".ads_tid_append_innerText");
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
          if (ads_cvalue_querySelectors[i].checked) {
            result += "document.querySelector('";
          }
          result += ads_cvalues[i].value;
          if (ads_cvalue_querySelectors[i].checked) {
            result += "')";
          }
          if (ads_cvalue_append_values[i].checked) {
            result += ".value";
          }
          if (ads_cvalue_append_innerTexts[i].checked) {
            result += ".innerText";
          }
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
            "        <span class='red2'>&apos;transaction_id&apos;</span>: <span class='red2'>";
            
          if (ads_transactionId_querySelectors[i].checked) {
            result += "document.querySelector('";
          }
          result += ads_transactionIds[i].value;
          if (ads_transactionId_querySelectors[i].checked) {
            result += "')";
          }
          if (ads_transactionId_append_values[i].checked) {
            result += ".value";
          }
          if (ads_transactionId_append_innerTexts[i].checked) {
            result += ".innerText";
          }
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
            if (ads_cvalue_querySelectors[i].checked) {
              result += "document.querySelector('";
            }
            result += ads_cvalues[i].value;
            if (ads_cvalue_querySelectors[i].checked) {
              result += "')";
            }
            if (ads_cvalue_append_values[i].checked) {
              result += ".value";
            }
            if (ads_cvalue_append_innerTexts[i].checked) {
              result += ".innerText";
            }
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
            "        <span class='red2'>&apos;transaction_id&apos;</span>: <span class='red2'>";
            
          if (ads_transactionId_querySelectors[i].checked) {
            result += "document.querySelector('";
          }
          result += ads_transactionIds[i].value;
          if (ads_transactionId_querySelectors[i].checked) {
            result += "')";
          }
          if (ads_transactionId_append_values[i].checked) {
            result += ".value";
          }
          if (ads_transactionId_append_innerTexts[i].checked) {
            result += ".innerText";
          }
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
            if (ads_cvalue_querySelectors[i].checked) {
              result += "document.querySelector('";
            }
            result += ads_cvalues[i].value;
            if (ads_cvalue_querySelectors[i].checked) {
              result += "')";
            }
            if (ads_cvalue_append_values[i].checked) {
              result += ".value";
            }
            if (ads_cvalue_append_innerTexts[i].checked) {
              result += ".innerText";
            }
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
            "        <span class='red2'>&apos;transaction_id&apos;</span>: <span class='red2'>";
            
          if (ads_transactionId_querySelectors[i].checked) {
            result += "document.querySelector('";
          }
          result += ads_transactionIds[i].value;
          if (ads_transactionId_querySelectors[i].checked) {
            result += "')";
          }
          if (ads_transactionId_append_values[i].checked) {
            result += ".value";
          }
          if (ads_transactionId_append_innerTexts[i].checked) {
            result += ".innerText";
          }
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
              "        <span class='red2'>  &apos;value&apos;</span>: <span class='red2'>";
            if (ads_cvalue_changes[i].checked) {
              result += "+";
            }
            if (ads_cvalue_querySelectors[i].checked) {
              result += "document.querySelector('";
            }
            result += ads_cvalues[i].value;
            if (ads_cvalue_querySelectors[i].checked) {
              result += "')";
            }
            if (ads_cvalue_append_values[i].checked) {
              result += ".value";
            }
            if (ads_cvalue_append_innerTexts[i].checked) {
              result += ".innerText";
            }
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
            "        <span class='red2'>  &apos;transaction_id&apos;</span>: <span class='red2'>";
            
          if (ads_transactionId_querySelectors[i].checked) {
            result += "document.querySelector('";
          }
          result += ads_transactionIds[i].value;
          if (ads_transactionId_querySelectors[i].checked) {
            result += "')";
          }
          if (ads_transactionId_append_values[i].checked) {
            result += ".value";
          }
          if (ads_transactionId_append_innerTexts[i].checked) {
            result += ".innerText";
          }
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
  $("#versionTextInsert").html("Version 4.3 (Updated 2023.12.14)");
});