
      // Publishable key from API keys in the Stripe Dashboard
      const PUBLISHABLE_KEY = "pk_live_QAeLzztCGto6VeIqPuUCGcF100c8v0Efqb";
      // Replace with the domain you want your users to be redirected back to after payment
      const DOMAIN = location.href.replace(/[^/]*$/, "");
      const stripe = Stripe(PUBLISHABLE_KEY);
      const clearButton = document.querySelector("#clear");
      const buyButton = document.querySelector("#buy");
      // Array for Stripe checkout
      let itemsArray = [];

      // Call functions to list items
      window.load=listItems(), showGrandTotal(), createItemsArray();
      clearButton.onclick = ClearAll;
      buyButton.onclick = buyItems;

      // Items inventory
      function listItems() {
        let list = "";
        if (sessionStorage.length === 0) {
          list = "Korgen är tom";
          buyButton.disabled = true;
          clearButton.disabled = true;
        } else {
          buyButton.disabled = false;
          clearButton.disabled = false;
          let key = "";
          list =
            "<tr>\
              <th></th>\
              <th>Antal</th>\
              <th>Styckpris</th>\
              <th>Radsumma</th>\
            </tr>";
          let i = 0;
          for (i = 0; i <= sessionStorage.length-1; i++) {
            key = sessionStorage.key(i);
            link = '<a href="' + key + '">' + key + '</a>';
            list += "<tr><td>" + link + "</td>\n<td>"
            + JSON.parse(sessionStorage.getItem(key))[0] + "</td><td>"
            + JSON.parse(sessionStorage.getItem(key))[1] + "</td><td>"
            + JSON.parse(sessionStorage.getItem(key))[2] + "</td></tr>";
          }
        }
        // Bind list to HTML table.
        document.getElementById('list').innerHTML = list;
      }

      // Clear the session storage,
      function ClearAll() {
        sessionStorage.clear();
        listItems();
        showGrandTotal();
        createItemsArray();
      }

      // Populate buyButton
      function showGrandTotal() {
        grandTotal = 0;
        //populate label with amount
        if (sessionStorage.length === 0) {
          document.getElementById("total").textContent = "0";
        } else {
          for (i = 0; i <= sessionStorage.length-1; i++) {
            key = sessionStorage.key(i);
            grandTotal+= parseInt(JSON.parse(sessionStorage.getItem(key))[2]);
          }
          document.getElementById("total").textContent = grandTotal;
        }
      }

      // Create items array for Stripe checkout
      function createItemsArray() {
        var i = 0;
        for (i = 0; i <= sessionStorage.length-1; i++) {
          key = sessionStorage.key(i);
          itemsArray.push(
            { sku: JSON.parse(sessionStorage.getItem(key))[3],
              quantity: JSON.parse(sessionStorage.getItem(key))[0]
            }
          );
        }
      }

      // Handle any errors from Checkout
      const handleResult = function(result) {
        if (result.error) {
          const displayError = document.getElementById("error-message");
          displayError.textContent = result.error.message;
        }
      }

      // Make the call to Stripe.js to redirect to the checkout page
      function buyItems() {
        stripe.redirectToCheckout({
          items: itemsArray,
          successUrl: DOMAIN + "/success.html?session_id={CHECKOUT_SESSION_ID}",
          cancelUrl: DOMAIN + "/canceled.html",
          shippingAddressCollection: {allowedCountries: ['SE']}
        }).then(handleResult);
      }
