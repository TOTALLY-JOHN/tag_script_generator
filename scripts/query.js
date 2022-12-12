window.addEventListener("load", (e) => {
  const data = [
    [
      "Set Timeout Script (타임아웃) 코드 (gtag용)",
`
&lt;script>
  window.addEventListener('load', function(event) {
    setTimeout(
      () => {
        if (window.location.href.indexOf('example.html') > -1) {
          gtag('event', 'conversion', {
            'send_to': 'AW-1111/AAAA'
          });
        }
      }, 3000
    );
  });
&lt;/script>
`
    ],
    [
      "Interval Script (간격 반복 설정)",
`
&lt;script>
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
  // 이 방법은 SPA웹사이트에서 쓸 수 있는 방법으로, Interval을 활용하여 스크립트를 매 1초마다 함수를 반복하여 실행합니다.
  // 모든 전환 작동이 확인되면 1초마다 반복되서 실행했던 함수를 멈춤으로서 더 이상 반복될 필요 없는 스크립트 작동을 중단합니다. (count1, count2 활용)
  // count1은 페이지뷰 예시, count2는 버튼 클릭일 경우의 예시입니다.
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

    // 모든 전환 발생이 확인된 경우 Interval 종료.
    if (count1 === 1 && count2 === 1) {
      clearInterval(conversion_interval);
    }
  }

  // 1초마다 conversion 함수가 반복되서 실행될 수 있도록 변수 할당.
  let conversion_interval = setInterval(conversions, 1000);
  
&lt;/script>
`
    ],
    [
      "Page Count Script (페이지 카운트)",
      `
&lt;script>
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
}
&lt;/script>
      `
    ],
    [
      "GTM Custom Event (Google Tag Manager 맞춤 이벤트 dataLayer push)",
      `
&lt;script>
  document.querySelector('selector').addEventListener('click', function() {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ 'event': 'custom_event_name' });
  });
&lt;/script>
      `
    ],
    [
      "Cafe24 Variables (카페24 치환변수 모음)",
      `
&lt;script>
  // 카페24 주요 페이지
  var viewItemPage = /category|detail/.test(window.location.pathname);
  var cartPage = /basket/.test(window.location.pathname);
  var checkoutPage = /orderform/.test(window.location.pathname);
  var purchasePage = /order_result/.test(window.location.pathname);

  var signupCompletePage = /join_result/.test(window.location.pathname);

  // 카페24 치환 변수
  var orderProductLenght = EC_FRONT_EXTERNAL_SCRIPT_VARIABLE_DATA.order_product.length;
  var totalPrice = EC_FRONT_EXTERNAL_SCRIPT_VARIABLE_DATA.payed_amount;
  var transactionId = EC_FRONT_EXTERNAL_SCRIPT_VARIABLE_DATA.order_id;
  var quantity = EC_FRONT_EXTERNAL_SCRIPT_VARIABLE_DATA.order_product[i].quantity;
  var price = EC_FRONT_EXTERNAL_SCRIPT_VARIABLE_DATA.order_product[i].product_price;

  // 아래 EC_FRONT 구글 애즈에서 자바스크립트 변수로 향상된 전환에 넣으시면 바로 적용됩니다. 세미콜론은 빼주셔야 합니다.
  var emailAddressForEC = EC_FRONT_EXTERNAL_SCRIPT_VARIABLE_DATA.common_member_email;

  // 카페24 구매 완료 코드 예제
  if (window.location.href.indexOf('order_result') > -1) {
    gtag('event', 'conversion', {
      'send_to': 'AW-1111/AAAA',
      'value': EC_FRONT_EXTERNAL_SCRIPT_VARIABLE_DATA.payed_amount,
      'currency': 'KRW',
      'transaction_id': EC_FRONT_EXTERNAL_SCRIPT_VARIABLE_DATA.order_id
    });
  }
&lt;/script>
      `
    ],
    [
      "Sixshop Variables (식스샵 치환변수 모음)",
      `
&lt;script>
  // 식스샵 결제완료 치환변수 (출처: https://lovelypeter.tistory.com/556)
  var price = '\${customerVar_double_orderTotalPrice}';
  var orderNo = '\${customerVar_string_orderNo}';
  var currency = '\${customerVar_string_orderCurrency}';
  
  // 구매완료일 때 아래 selector로 카드결제, 무통장입금 혹은 가상계좌 둘 다 가능하면 아래로 진행.
  document.querySelector('input[type=hidden]').value.replace(/[^\\d]/g, '');
&lt;/script>
      `
    ],
    [
      "Godomall Variables (고도몰 치환변수 모음)",
      `
&lt;script>
  // 고도몰 치환변수 (출처: https://lovelypeter.tistory.com/554?category=335860)
  var price = '\${=gd_isset(goodsView['goodsPrice'],0)} / {=gd_money_format(..goodsPrice)} ';
  var orderNo = '\${goodsView.goodsNo}';
  var currency = '\${=gd_currency_symbol()}';
&lt;/script>  
      `
    ],
    [
      "Makeshop Variables (메이크샵 치환변수 모음)",
      `
&lt;script>
  // 메이크샵 치환변수
  var price = '&lt;!--/pay_price/-->';
  var orderNo = '&lt;!--/order_num/-->';
&lt;/script>
&lt;script>
  // 반드시 메이크샵 개별 페이지의 주문 완료 부분에 사용해야 합니다. (GA4 전자상거래 Parameter)
  var products = [];
  var brand = "brand_name";
  var affiliation = "affiliation_name";
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
&lt;/script>
      `
    ],
    [
      "Shopify Variables (쇼피파이 치환변수 모음)",
      `
&lt;script>
  // 쇼피파이 치환변수
  {% if first_time_accessed %}
    gtag('event', 'conversion', {
      'send_to': 'AW-123456789/ABCDEFGHIJK',
      'value': {{ checkout.subtotal_price | divided_by: 100.0 }},
      'currency': '{{ currency }}',
      'transaction_id': '{{ order_number }}
    });
  {% endif %}
&lt;/script>
      `
    ],
    [
      "Javascript Validation (자바스크립트 입력값 검증 코드)",
      `
&lt;script>
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
  }
&lt;/script>
      `
    ],
    [
      "Regex (Replace) 코드",
      `
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
      `
    ],
    [
      "Npay Order ID (엔페이, 네이버페이, NaverPay 주문번호)",
      `
document.querySelector(".npay_btn_pay").id.split("NPAY_BUY_LINK_IDNC_ID_")[1];
      `
    ],
    [
      "GTM Javascript Custom Function (맞춤 자바 스크립트)",
      `
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
}
      `
    ],
    [
      "Cafe24 Universal Analytics E-Commerce, UA EEC (카페24 UA 전자상거래)",
      `
아래 UA-XXXX는 고객의 추적 ID로 반드시 교체해서 사용.
&lt;!-- Global site tag (gtag.js) - Google Analytics -->
&lt;script async src="https://www.googletagmanager.com/gtag/js?id=UA-XXXX">&lt;/script>
&lt;script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'UA-XXXX');
&lt;/script>
    
&lt;script>
  window.addEventListener('load', function(event) {
    // UA (Universal Analytics) E-Commerce (전자상거래) 코드 (카페24용)
    // 유니버셜 애널리틱스 추적코드 ID
    const ANALYTICS_TRACKING_ID = "UA-XXXX";

    // 페이지 변수
    var viewItemPage = /category|detail/.test(window.location.pathname);
    var cartPage = /basket/.test(window.location.pathname);
    var checkoutPage = /orderform/.test(window.location.pathname);
    var purchasePage = /order_result/.test(window.location.pathname);

    // 공통 변수 (웹사이트에 따라 적절하게 변경하세요)
    var brand = 'Google';
    var affiliation = 'Google';
    var listName = 'Search Results';
    var currency = 'KRW';

    // 네이버 페이 버튼 변수 (네이버 페이는 클릭으로만 전환 추적 가능하다는 점을 반드시 확인하세요)
    var btnNpay = $('.npay_btn_item')[0];

    // 수량 체크 함수
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
  });
&lt;/script>  
      `
    ],
    [
      "Godomall Universal Analytics E-Commerce, UA EEC (고도몰 UA 전자상거래)",
      `
&lt;!-- 고도몰 UA 전자상거래 코드 (아래 UA-XXXX는 고객의 추적 ID로 반드시 교체해서 사용한다) -->
&lt;!-- Global site tag (gtag.js) - Google Analytics -->
&lt;script async src="https://www.googletagmanager.com/gtag/js?id=UA-XXXX">&lt;/script>
&lt;script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'UA-XXXX');
&lt;/script>
    
&lt;script>
    window.addEventListener('load', function (event) {
      // 고도몰 Universal Analytics 전자상거래 스크립트
      // 유니버셜 애널리틱스 추적 코드 UA-XXXX를 고객 추적 코드로 반드시 변경!
      const ANALYTICS_TRACKING_ID = "UA-XXXX";

      // 페이지 변수
      var viewItemPage = /goods_view/.test(window.location.pathname);
      var cartPage = /cart/.test(window.location.pathname);
      var checkout = /order.php/.test(window.location.pathname);
      var purchasePage = /order_end/.test(window.location.pathname);

      var listName = 'Search Results';

      // Affiliation과 Brand명을 적절하게 바꿔주세요.
      var affiliation = 'Google';
      var brand = 'Google';
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
  });
&lt;/script>
      `
    ],
    [
      "Imweb Universal Analytics E-Commerce, UA EEC (아임웹 UA 전자상거래)",
      `
&lt;script>
  window.addEventListener('load', function(event) {
    // UA (Universal Analytics) E-Commerce (전자상거래) 코드 (아임웹)
    // 아임웹은 자체 설정에서 Google 애널리틱스 전자상거래 옵션을 사용으로 바꿔주면 된다. 아래 코드는 하드 코딩으로 구현하는 경우에 사용하면 된다.
    // 공통변수 (웹사이트에 따라 적절하게 변경하세요) (네이버 페이 아직 미포함했으니 네이버 페이 경우에는 별도로 코드 추가 요함!!! 추후 추가 예정)
    var brand = 'Google';
    var affiliation = 'Google';
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
                    "price": +document.querySelector("#prod_goods_form > header > div.pay_detail.full-width > div.holder.table-row > span > span").innerText.replace(/[^\d]/g, '')
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
                "quantity": +quantityList[i].innerText.replace(/[^\d]/g, ''),
                "price": +priceList[i].innerText.replace(/[^\d]/g, ''),
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
                "quantity": +quantityList[i].innerText.split(" - ")[1].replace(/[^\d]/g, ''),
                "price": +priceList[i].innerText.replace(/[^\d]/g, ''),
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
  });
&lt;/script>
    
      `
    ],
    [
      "Makeshop Universal Analytics E-Commerce, UA EEC (메이크샵 UA 전자상거래)",
      `
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
  var brand = "brand_name";
  var affiliation = "affiliation_name";
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
&lt;/script>

&lt;script>
  window.addEventListener('load', function(event) {
    // UA (Universal Analytics) E-Commerce (전자상거래) 코드 (메이크샵) PC버전 (모바일 버전은 아직 제작중...)
    // 공통변수 (웹사이트에 따라 적절하게 변경하세요) (네이버 페이 미포함 버전이니 네이버 페이 경우에는 별도로 코드 추가 요함!!!)
    var brand = 'Google';
    var affiliation = 'Google';
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
  });
&lt;/script>
      `
    ],
    [
      "Google Analytics 4 EEC Template (구글 애널리틱스4 전자상거래 템플릿 코드)",
      `
&lt;script>
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
  }
&lt;/script>
      `
    ],
    [
      "Cafe24 Google Analytics E-Commerce, GA4 EEC (카페24 GA4 전자상거래)",
      `
&lt;!-- 구글 애널리틱스4 전자상거래 (카페24) 고객의 추적코드로 G-XXXX 부분 반드시 교체 요망! -->
&lt;!-- Global site tag (gtag.js) - Google Analytics -->
&lt;script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXX">&lt;/script>
&lt;script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-XXXX');
&lt;/script>

&lt;script>
  window.addEventListener('load', function (event) { 
    // GA4 (Google Analytics 4) E-Commerce (전자상거래) 코드 (카페24용)

    // GA4 추적코드 ID (고객의 추적코드로 반드시 교체요망)
    const ANALYTICS_4_TRACKING_ID = 'G-XXXX';

    // 페이지 변수
    var viewItemPageForGA4 = /category|detail/.test(window.location.pathname);
    var cartPageForGA4 = /basket/.test(window.location.pathname);
    var checkoutPageForGA4 = /orderform/.test(window.location.pathname);
    var purchasePageForGA4 = /order_result/.test(window.location.pathname);

    // 공통 변수 (웹사이트에 따라 적절하게 변경하세요)
    var brandForGA4 = 'Google';
    var affiliationForGA4 = 'Google';
    var listNameForGA4 = 'Search Results';
    var currencyForGA4 = 'KRW';

    // 네이버 페이 버튼 변수 (네이버 페이는 클릭으로만 전환 추적 가능하다는 점을 반드시 확인하세요)
    var btnNpayForGA4 = $('.npay_btn_item')[0];

    // 수량 체크 함수
    function getQuantityForGA4() {
        var quantity = $('#option_box1_quantity');
        if (quantity.length == 1) {
            return Number(document.getElementById('option_box1_quantity').value);
        }
        else { 
            return 1;
        }
    }

    // 상세페이지 gtag 호출 함수
    function callGtagViewItemForGA4(pageType, items) {
        gtag('event', pageType, {
            send_to: ANALYTICS_4_TRACKING_ID,
            items: items
        });
    }

    // 장바구니 추가 gtag 호출 함수
    function callGtagAddToCartForGA4(pageType, items) {
        gtag('event', pageType, {
            send_to: ANALYTICS_4_TRACKING_ID,
            items: items
        });
    }

    // 장바구니 제거 gtag 호출 함수
    function callGtagRemoveFromCartForGA4(pageType, items) {
        gtag('event', pageType, {
            send_to: ANALYTICS_4_TRACKING_ID,
            items: items
        });
    }

    // 구매완료 gtag 호출 함수
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

    // 상품 추가 함수
    function addItemForGA4(item, id, name, category, quantity, price) {
        item.push({
            item_id: id,
            item_name: name,
            item_list_name: listNameForGA4,
            item_brand: brandForGA4,
            item_category: category,
            quantity: quantity,
            price: price
        });
    }

    // 상세페이지
    if (viewItemPageForGA4) {
        var viewItem = [];
        addItemForGA4(viewItem, iProductNo, product_name, iCategoryNo, getQuantityForGA4(), product_price);
        callGtagViewItemForGA4('view_item', viewItem);

        var addToCartItem = [];
        var send = XMLHttpRequest.prototype.send
        XMLHttpRequest.prototype.send = function () {
            this.addEventListener('load', function () {
                if (this.responseURL.includes('/exec/front/order/basket/')) {
                    addItemForGA4(addToCartItem, iProductNo, product_name, iCategoryNo, getQuantityForGA4(), product_price);
                    callGtagAddToCartForGA4('add_to_cart', addToCartItem);
                }
            })
            return send.apply(this, arguments)
        }
        btnNpayForGA4?.addEventListener('click', function (e) {
            callGtagPurchaseForGA4('purchase', btnNpayForGA4.children[0].id, affiliationForGA4, getQuantityForGA4() * product_price, currencyForGA4, addToCartItem);
        }, false);
    }
    // 장바구니 페이지
    else if (cartPageForGA4) {
        var send = XMLHttpRequest.prototype.send
        XMLHttpRequest.prototype.send = function () {
            this.addEventListener('load', function () {
                if (this.responseURL.includes('/exec/front/order/basket/')) {
                    var removeFromCartItem = [];
                    $('[id^="' + BASKET_CHK_ID_PREFIX + '"]').each(function (i) {
                        if ($(this).is(':checked')) {
                            addItemForGA4(removeFromCartItem, aBasketProductOrderData[i].product_no, aBasketProductOrderData[i].product_name, aBasketProductOrderData[i].main_cate_no, aBasketProductOrderData[i].quantity, aBasketProductOrderData[i].product_sum_price);
                        }
                    });
                    callGtagRemoveFromCartForGA4('remove_from_cart', removeFromCartItem);
                }
            })
            return send.apply(this, arguments)
        }
        var cartItem = [];
        var totalPrice = 0.0;
        jQuery.each(aBasketProductData, function (i) {
            addItemForGA4(cartItem, aBasketProductData[i].product_no, aBasketProductData[i].product_name, aBasketProductData[i].main_cate_no, aBasketProductData[i].quantity, aBasketProductData[i].product_sum_price);
            totalPrice += aBasketProductData[i].quantity * aBasketProductData[i].product_sum_price
        });
        btnNpayForGA4?.addEventListener('click', function (e) {
            callGtagPurchaseForGA4('purchase', btnNpayForGA4.children[0].id, affiliationForGA4, getQuantityForGA4() * product_price, currencyForGA4, addToCartItem);
        }, false);
    }
    // 구매완료 페이지
    else if (purchasePageForGA4) {
        var purchaseItem = [];
        if (EC_FRONT_EXTERNAL_SCRIPT_VARIABLE_DATA.order_product.length > 0) {
            for (var i = 0; i < EC_FRONT_EXTERNAL_SCRIPT_VARIABLE_DATA.order_product.length; i++) {
                var category = '';
                if (typeof EC_FRONT_EXTERNAL_SCRIPT_VARIABLE_DATA.order_product[i].category_no_3 == 'undefined') {
                    category = EC_FRONT_EXTERNAL_SCRIPT_VARIABLE_DATA.order_product[i].category_no_2;
                }
                else {
                    category = EC_FRONT_EXTERNAL_SCRIPT_VARIABLE_DATA.order_product[i].category_no_3;
                }
                addItemForGA4(purchaseItem, EC_FRONT_EXTERNAL_SCRIPT_VARIABLE_DATA.order_product[i].product_no, EC_FRONT_EXTERNAL_SCRIPT_VARIABLE_DATA.order_product[i].product_name, category, EC_FRONT_EXTERNAL_SCRIPT_VARIABLE_DATA.order_product[i].quantity, EC_FRONT_EXTERNAL_SCRIPT_VARIABLE_DATA.order_product[i].product_price);
            }
        }
        callGtagPurchaseForGA4('purchase', EC_FRONT_EXTERNAL_SCRIPT_VARIABLE_DATA.order_id, affiliationForGA4, EC_FRONT_EXTERNAL_SCRIPT_VARIABLE_DATA.payed_amount, currencyForGA4, purchaseItem);
    }
  });
&lt;/script>      
      `
    ],
    [
      "Godomall Google Analytics E-Commerce, GA4 EEC (고도몰 GA4 전자상거래)",
      `
&lt;!-- 고도몰 GA4 전자상거래 코드 (아래 G-XXXX는 고객의 추적 ID로 반드시 교체해서 사용한다) -->
&lt;!-- Global site tag (gtag.js) - Google Analytics -->
&lt;script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXX">&lt;/script>
&lt;script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-XXXX');
&lt;/script>
    
&lt;script>
    window.addEventListener('load', function (event) {
      // 고도몰 Google Analytics 4 전자상거래 스크립트 (UA를 기반으로 한 스크립트)
      // 구글 애널리틱스4 추적 코드 (G-XXXX를 고객의 추적 코드로 반드시 변경!)
      const ANALYTICS_4_TRACKING_ID = "G-XXXX";

      var viewItemPageForGA4 = /goods_view/.test(window.location.pathname);
      var cartPageForGA4 = /cart/.test(window.location.pathname);
      var checkoutForGA4 = /order.php/.test(window.location.pathname);
      var purchasePageForGA4 = /order_end/.test(window.location.pathname);
      
      // Affiliation과 Brand명을 적절하게 바꿔주세요.
      var listNameForGA4 = 'Search Results';
      var affiliationForGA4 = 'Google';
      var brandForGA4 = 'Google';
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
  });
&lt;/script>  
      `
    ],
    [
      "Imweb Google Analytics E-Commerce, GA4 EEC (아임웹 GA4 전자상거래)",
      `
&lt;script>
  window.addEventListener('load', function(event) {
    // GA4 (Google Analytics 4) E-Commerce (전자상거래) 코드 (아임웹)
    // 아임웹은 자체 설정에서 Google 애널리틱스 전자상거래 옵션을 사용으로 바꿔주면 된다. 아래 코드는 하드 코딩으로 구현하는 경우에 사용하면 된다.
    // 공통변수 (웹사이트에 따라 적절하게 변경하세요) (네이버 페이 미포함 버전이니 네이버 페이 경우에는 별도로 코드 추가 요함!!!)
    var brand = 'Google';
    var affiliation = 'Google';
    var listName = 'Search Results';
    var currency = 'KRW';

    // 제품 상세 페이지 조회
    if (window.location.href.indexOf("?idx=") > -1) {
        gtag('event', 'view_item', {
            currency: currency,
            value: +document.querySelector("#prod_goods_form > header > div.pay_detail.full-width > div.holder.table-row > span > span").innerText.replace(/[^\d]/g, ''),
            items: [
                {
                    item_id: window.location.href.split("?idx=")[1] || "",
                    item_name: document.querySelector("#prod_goods_form > header > div.view_tit.no-margin-top.title_font_style").innerText, 
                    item_list_name: listName,
                    item_brand: brand,
                    currency: currency,
                    price: +document.querySelector("#prod_goods_form > header > div.pay_detail.full-width > div.holder.table-row > span > span").innerText.replace(/[^\d]/g, '')
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
            totalPrice += +priceList[i].innerText.replace(/[^\d]/g, '');
            items.push({
                item_id: idList[i].href.split("?idx=")[1],
                item_name: nameList[i].innerText,
                item_list_name: listName,
                currency: currency,
                item_brand: brand,
                quantity: +quantityList[i].innerText.replace(/[^\d]/g, ''),
                price: +priceList[i].innerText.replace(/[^\d]/g, ''),
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
            totalPrice += +priceList[i].innerText.replace(/[^\d]/g, '');
            items.push({
                item_id: idList[i].href.split("?idx=")[1],
                item_name: nameList[i].innerText,
                item_list_name: listName,
                item_brand: brand,
                currency: currency,
                quantity: +quantityList[i].innerText.split(" - ")[1].replace(/[^\d]/g, ''),
                price: +priceList[i].innerText.replace(/[^\d]/g, ''),
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
&lt;/script>    
      `
    ],
    [
      "Makeshop Google Analytics E-Commerce, GA4 EEC (메이크샵 GA4 전자상거래)",
      `
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
  var brand = "brand_name";
  var affiliation = "affiliation_name";
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
&lt;/script>

&lt;script>
// 전체 참고 코드 (구매완료는 반드시 PC,모바일 개별 디자인에 존재하는 주문완료 페이지에 넣어야 한다.)
  window.addEventListener('load', function(event) {
    // GA4 (Google Analytics 4) E-Commerce (전자상거래) 코드 (메이크샵) PC버전 (모바일 버전은 별도로 체크 요함)
    // 공통변수 (웹사이트에 따라 적절하게 변경하세요) (네이버 페이 미포함 버전이니 네이버 페이 경우에는 별도로 코드 추가 요함!!!)
    var brand = 'Google';
    var affiliation = 'Google';
    var listName = 'Search Results';
    var currency = 'KRW';

    // 제품 상세 페이지 조회
    if (window.location.href.indexOf("shopdetail.html") > -1) {
        gtag('event', 'view_item', {
            currency: currency,
            value: +document.querySelector("#form1 > div > table > tbody > tr:nth-child(1) > td > div > strong").innerText.replace(/[^\\d]/g, ''),
            items: [
                {
                    "id": document.querySelector("input[name='branduid']").value,
                    "name": document.title.replace(/[\\[\\]]+/g,''), 
                    item_list_name: listName,
                    item_brand: brand,
                    currency: currency,
                    price: +document.querySelector("#form1 > div > table > tbody > tr:nth-child(1) > td > div > strong").innerText.replace(/[^\\d]/g, '')
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
      var brand = "brand_name";
      var affiliation = "affiliation_name";
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
  });
&lt;/script>
      `
    ],
    [
      "Enhanced Conversion EC Template(향상된 전환 기본 코드)",
      `
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
      `
    ],
    [
      "Enhanced Conversion EC SessionStorage Template(향상된 전환 세션 스토리지 기본 코드)",
      `
&lt;script>
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
  getSessionStorageVariable();
&lt;/script>

      `
    ],
    [
      "Cafe24 Dynamic Remarketing (카페24 동적리마케팅, 동적리마게팅 DR 코드)",
      `
&lt;script>
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
  });
&lt;/script>
      `
    ],
    [
      "Godomall Dynamic Remarketing (고도몰 동적리마케팅, 동적리마게팅 DR 코드)",
      `
&lt;script>
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
  });
&lt;/script>
      `
    ],
    [
      "Makeshop Dynamic Remarketing (메이크샵 동적리마케팅, 동적리마게팅 DR 코드)",
      `
메이크샵 DR 구현시 주의사항은 head 공통상단영역에 넣는 것이 아니라
개별 페이지(상세 페이지, 상품 리스트 페이지, 구매완료 페이지)에 넣어야 하며 
장바구니는 치환 코드 방식이 아니어서 별도 페이지에 넣을 필요가 없다.
아래 코드에 앞서 당연히 gtag 선언부(global site tag)가 들어가 있어야 아래에 있는 gtag 함수를 호출할 수 있으니 반드시 확인한다.
&lt;script>
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
  });
&lt;/script>
      `
    ],
    [
      "Imweb Dynamic Remarketing (아임웹 동적리마케팅, 동적리마게팅 DR 코드)",
      `
&lt;script>
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
  });
&lt;/script>
      `
    ],
    [
      "Shopify Dynamic Remarketing (쇼피파이 동적리마케팅, 동적리마게팅 DR 코드)",
      `
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
{% endif %}
      `
    ],
    [
      "유용한 크롬 단축키 (Shortcut)",
      `
1) 새 탭 열기: Ctrl + T
2) 새 창 열기: Ctrl + N
3) 현재 탭 닫기: Ctrl + W
4) 탭 오른쪽 이동: Ctrl + Tab
5) 탭 왼쪽 이동: Ctrl + Shift + Tab
6) 방금 닫았던 탭 열기: Ctrl + Shift + T
7) 탭 검색: Ctrl + Shift + A
8) 주소창으로 커서 이동: Ctrl + L
9) 북마크에 추가: Ctrl + D
10) 개발자 도구에서 Element 마우스 커서 모드: Ctrl + Shift + C
11) 개발자 도구에서 모바일, 태블릿 화면 모드: Ctrl + Shift + M
12) 시크릿 모드(Incognito) 열기: Ctrl + Shift + N
12) 창 최소화: Ctrl + H
13) 서버에서 데이터를 새로 받아오는 강력 새로고침: Ctrl + Shift + R (또는 Ctrl + F5)
      `
    ]
  ];
  if (!window.location.href.includes("editor_search")) {

    // 검색 결과 컨테이너 선언 및 선택 변수 초기화
    let element = document.createElement("div");
    element.className = "suggestion";
    
    let lastIndex = 0;
    let nextIndex = -1;
    let selectedIndex = 0;

    // body에 append하기
    if (!window.location.href.includes("editor_search"))
    document.querySelector("#searchContainer").appendChild(element);

    // unordered list 선언
    let ulElem = document.createElement("ul");

    // 검색 결과 컨테이너에 append
    element.appendChild(ulElem);
    element.style.display = "none";
    
    // 초점 두기
    document.querySelector("#searchQuery").focus();

    // 검색창에 키를 눌러서 떼는 경우
    document.querySelector("#searchQuery").addEventListener("keyup", (keyEvent) => {
      // 검색값을 받아오고 모두 소문자로 바꿈
      let query = keyEvent.target.value.toLowerCase();

      // 공백인 경우, 검색결과 없는 경우에 검색 결과 컨테이너를 감춤
      if (query.trim() === "" || query === " " || document.querySelector("#searchQuery").value === "") {
        element.style.display = "none"//delete;
        // element.classList.toggle('hide') --jin
        nextIndex = -1;
      } 
      // 공백이 아닌 경우
      else {
        // 기존에 결과값이 있는 경우 모두 지워줌
        while (ulElem.hasChildNodes()) {
          ulElem.removeChild(ulElem.firstChild);
        }

        // 위아래 키 설정
        const navigationKeys = ["ArrowUp", "ArrowDown"];
        let count = -1;

        // 찾으려는 검색값이 있는 경우
        data.forEach((elem, i) => {
          const [title, content] = elem;
          if (title.toLowerCase().indexOf(query) > -1 || content.toLowerCase().indexOf(query) > -1) {
            element.style.display = "block";
            let liElem = document.createElement("li");
            liElem.className = i;
            liElem.innerText = title;
            ulElem.appendChild(liElem);
            lastIndex = document.querySelectorAll(".suggestion li").length - 1;
          }
        });

        // 방향키로 검색 결과 위 아래 컨트롤
        if (navigationKeys.includes(keyEvent.key)) {
          if (keyEvent.key === "ArrowUp") {
            nextIndex = nextIndex <= 0 ? lastIndex : nextIndex - 1;
            selectedIndex = document.querySelectorAll(".suggestion li")[nextIndex].className;
          } else if (keyEvent.key === "ArrowDown") {
            nextIndex = nextIndex === lastIndex ? 0 : nextIndex + 1;
            selectedIndex = document.querySelectorAll(".suggestion li")[nextIndex].className;
          }
          for (let i = 0; i < document.querySelectorAll(".suggestion li").length; i++) {
            if (i === nextIndex)
              document.querySelectorAll(".suggestion li")[i].style.backgroundColor = "#BEE3F8";
            else 
              document.querySelectorAll(".suggestion li")[i].style.backgroundColor = "white";
          }
        } 
        // 엔터 키로 해당 검색 인덱스 결과 조회
        else if (keyEvent.key === "Enter") {
          document.querySelector("#searchQuery").value = "";
          element.style.display = "none";
          nextIndex = -1;
          $("#generated_search_script").html("<pre>" +
          data[selectedIndex][1] + "</pre>");
        }
      }
    });

    document.querySelector("#searchQuery").addEventListener("keydown", (keyDownEvent) => {
      if (element.style.display === "block") {
        if (keyDownEvent.target.value === "" || keyDownEvent.target.value === " " || document.querySelector("#searchQuery").value === "" || document.querySelector("#searchQuery").value === " ") {
          element.style.display = "none";
        }
      }
    });

    document.querySelector("body").addEventListener("click", (clickEvent) => {
      if (element.style.display === "block")
        element.style.display = "none";
    });

    document.querySelector("#searchContainer")?.addEventListener("click", (clickEvent) => {
      const list = clickEvent.target.closest("li");
      if (list) {
        document.querySelector("#searchQuery").value = "";
        element.style.display = "none";
        nextIndex = -1;
        $("#generated_search_script").html("<pre>" + data[list.className][1] + "</pre>");
      }
    });

    function performCopy(value) {
      let textArea = document.createElement("textarea");
      document.body.appendChild(textArea);
      textArea.value = value;
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
    }

    document.querySelector("#search_copy")?.addEventListener("click", () => {
      let value = document.querySelector("#generated_search_script").innerText;
      performCopy(value);
    });

    function removeDisplay() {
      if (element.style.display === "block" && document.querySelector("#searchQuery").value === "") {
        element.style.display = "none";
      }
    }
  
    setInterval(removeDisplay, 1000);
  }
});