
      const amountLabel = document.querySelector("#amountLabel");
      const sumOfItemsLabel = document.querySelector("#sumOfItemsLabel");
      const grandTotalLabel = document.querySelector("#grandTotalLabel");
      const addButton = document.querySelector("#add");
      const removeButton = document.querySelector("#remove");
      const name = document.querySelector("#itemName").textContent;
      const price = parseInt(document.querySelector("#itemPrice").textContent);
      const sku = document.querySelector("#itemSku").textContent;
      let sumOfRow = "";
      let sumOfItems = "";
      let grandTotal = "";

      window.load=listItems();
      addButton.onclick = addOrRemoveItem;
      removeButton.onclick = addOrRemoveItem;

      // Items inventory
      function listItems() {
        sumOfItems = 0;
        grandTotal = 0;
        // Set amount label
        if (sessionStorage.getItem(name) !=null) {
          amountLabel.textContent = JSON.parse(sessionStorage.getItem(name))[0];
          removeButton.disabled = false;
        } else {
          amountLabel.textContent = "0";
          removeButton.disabled = true;
        }
        // Count and set items and grand total
        for (i = 0; i <= sessionStorage.length-1; i++) {
          key = sessionStorage.key(i);
          sumOfItems+= parseInt(JSON.parse(sessionStorage.getItem(key))[0]);
          grandTotal+= parseInt(JSON.parse(sessionStorage.getItem(key))[2]);
        }
        sumOfItemsLabel.textContent = sumOfItems;
        grandTotalLabel.textContent = grandTotal;
      }

      // Add or remove an item
      function addOrRemoveItem(e) {
        let amount = amountLabel.textContent;
        if (e.target.id === "add" && amount < 5) {
          amount++;
        }
        if (e.target.id === "remove" && amount > 0) {
          amount--;
          addButton.disabled = false;
        }
        if (amount > 4) {
          addButton.disabled = true;
        }
        if (amount < 1) {
          sessionStorage.removeItem(name);
        } else {
          sumOfRow = amount*price;
          sessionStorage.setItem(name, JSON.stringify([amount, price, sumOfRow, sku]));
        }
        listItems();
      }
