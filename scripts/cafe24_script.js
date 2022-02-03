// $(document).ready(function () {
//   // CAFE24 SCRIPT
//   $("#cafe24_ua_add_button").on("click", function () {
//     let result =
//       "<span class='grey'>&lt;</span><span class='lightblue2'>script</span><span class='grey'>&gt;</span>";
//     result +=
//       "<br />  <span class='lightblue1'>window</span>.<span class='yellow'>addEventListener</span>(<span class='red2'>&apos;load&apos;</span>, <span class='lightblue2'>function</span>(<span class='yellow'>event</span>) {";
//     result += 
//     "<script><br />";
//     "  window.addEventListener('load', function(event) {<br />" +
//     "    var viewItemPage = /category|detail/.test(window.location.pathname); <br />" +
//     "    var cartPage = /basket/.test(window.location.pathname); <br />" +
//     "    var checkoutPage = /orderform/.test(window.location.pathname); <br />" +
//     "    var purchasePage = /order_result/.test(window.location.pathname); <br />" +
//     "    var brand = 'BRAND_NAME'; <br />" +
//     "    var affiliation = 'AFFILIATION_NAME'; <br />" +
//     "    var listName = 'Search Results'; <br />" +
//     "    var currency = 'KRW'; <br />" +
//     "<br />" +
//     "    function getQuantity() { <br />" +
//     "      var quantity = $('#option_box1_quantity'); <br />" +
//     "      if (quantity.length == 1) { <br />" +
//     "        return Number(document.getElementById('option_box1_quantity').value);<br />" +
//     "      } <br />" +
//     "      else {<br />" +
//     "        return 1;<br />" +
//     "      }<br />" +        
//     "    }<br />" +
//     "<br />" +
//     "    function callGtag(pageType, items){<br />" +
//     "      gtag('event', pageType, {<br />" +
//     "        'items': items<br />" +
//     "      });<br />" +        
//     "    }<br />" +
//     "<br />"
//     "    function callGtagPurchase(pageType, transaction_id, affiliation, totalPrice, currency, items) {<br />" +
//     "      gtag('event', pageType, {<br />" +
//     "        'transaction_id':  transaction_id,<br />" +
//     "        'affiliation': affiliation,<br />" +
//     "        'value': totalPrice,<br />" +
//     "        'currency': currency,<br />" +
//     "        'tax': 0,<br />" +
//     "        'shipping': 0,<br />" +
//     "        'items': items<br />" +
//     "      });<br />" +
//     "    }<br />" +
      
//         function addItem(item, id, name, category, quantity, price){
//             item.push({
//                 'id': id,
//                 'name': name,
//                 'list_name': listName,
//                 'brand': brand,
//                 'category': category,
//                 'quantity': quantity,
//                 'price': price
//             })        
//         }

//         if(viewItemPage) {
//           var viewItem = [];
//           addItem(viewItem, iProductNo, product_name, iCategoryNo, getQuantity(), product_price);
//           callGtag('view_item', viewItem);
//           var addToCartItem = [];
//           var send = XMLHttpRequest.prototype.send 
//           XMLHttpRequest.prototype.send = function() {
//             this.addEventListener('load', function() {
//               if(this.responseURL.includes('/exec/front/order/basket/')){
//                 addItem(addToCartItem, iProductNo, product_name, iCategoryNo, getQuantity(), product_price);
//                 callGtag('add_to_cart', addToCartItem);
//               }
//             });
//             return send.apply(this, arguments);
//           }
//         }
//         else if(cartPage) {
//           var send = XMLHttpRequest.prototype.send
//           XMLHttpRequest.prototype.send = function() {
//             this.addEventListener('load', function() {
//               if(this.responseURL.includes('/exec/front/order/basket/')){
//                 var removeFromCartItem = [];
//                 $('[id^="'+ BASKET_CHK_ID_PREFIX +'"]').each(function(i){
//                   if ($(this).is(':checked')) {
//                     addItem(removeFromCartItem, aBasketProductData[i].product_no, aBasketProductData[i].product_name, aBasketProductData[i].main_cate_no, aBasketProductData[i].quantity, aBasketProductData[i].product_sum_price);
//                   }
//                 });
//                 callGtag('remove_from_cart', removeFromCartItem);
//               }
//             })
//             return send.apply(this, arguments);
//           }            
//           var cartItem = [];
//           var totalPrice = 0;
//           jQuery.each( aBasketProductData, function( i ) {
//             addItem(cartItem, aBasketProductData[i].product_no, aBasketProductData[i].product_name, aBasketProductData[i].main_cate_no, aBasketProductData[i].quantity, aBasketProductData[i].product_sum_price);
//             totalPrice += aBasketProductData[i].quantity*aBasketProductData[i].product_sum_price
//           });
//         }
//         else if(checkoutPage) {
//           var checkOutItem = [];
//           jQuery.each( aBasketProductOrderData, function( i ) {
//           addItem(checkOutItem, aBasketProductOrderData[i].product_no, aBasketProductOrderData[i].product_name, aBasketProductOrderData[i].main_cate_no, aBasketProductOrderData[i].quantity,
//           aBasketProductOrderData[i].product_sum_price);
//           });            
//           callGtag('begin_checkout', checkOutItem);
//         }
//         else if(purchasePage){
//           var purchaseItem = [];
//           if (EC_FRONT_EXTERNAL_SCRIPT_VARIABLE_DATA.order_product.length > 0) {
//             for(var i = 0; i < EC_FRONT_EXTERNAL_SCRIPT_VARIABLE_DATA.order_product.length; i++) {
//               var category = '';
//               if(typeof EC_FRONT_EXTERNAL_SCRIPT_VARIABLE_DATA.order_product[i].category_no_3 == 'undefined') {
//                 category = EC_FRONT_EXTERNAL_SCRIPT_VARIABLE_DATA.order_product[i].category_no_2;
//               }
//               else {
//                 category = EC_FRONT_EXTERNAL_SCRIPT_VARIABLE_DATA.order_product[i].category_no_3;
//               }
//               addItem(purchaseItem, EC_FRONT_EXTERNAL_SCRIPT_VARIABLE_DATA.order_product[i].product_no, EC_FRONT_EXTERNAL_SCRIPT_VARIABLE_DATA.order_product[i].product_name, category, EC_FRONT_EXTERNAL_SCRIPT_VARIABLE_DATA.order_product[i].quantity, EC_FRONT_EXTERNAL_SCRIPT_VARIABLE_DATA.order_product[i].product_price);
//             }
//           }
//           callGtagPurchase('purchase', EC_FRONT_EXTERNAL_SCRIPT_VARIABLE_DATA.order_id, affiliation, EC_FRONT_EXTERNAL_SCRIPT_VARIABLE_DATA.payed_amount, currency, purchaseItem);
//         }
//       });
//     </script>
//     `;
//     result += "<br />  });";
//     result +=
//       "<br /><span class='grey'>&lt;/<span class='lightblue2'>script</span><span class='grey'>&gt;</span>";
//     $("#generated_cafe24_script").html("<pre>" + result + "</pre>");
//   });
//   $("#ads_reset_events").on("click", function () {
//     ads_conversion_size = 0;
//     $("#ads_conditions").empty();
//   });
//   $("#ads_clear_script").on("click", function () {
//     $("#generated_cafe24_script").empty();
//   });
// });

