function Cart() {
  let items = [];
  let cost = 0;

  this.calculateCost = function () {
    cost = 0;
    for (let i = 0; i < items.length; i++) {
      cost += items[i].productPrice;
    }
    return cost;
  };
  this.add = function (id, name, price) {
    try {
      if (items.length === 10) {
        throw new Error("Cart is full");
      }
      let obj = {
        productId: id,
        productName: name,
        productPrice: price
      };
      items.push(obj);
      cost += obj.productPrice;
    } catch (ex) {
      console.log(ex);
    }
  };

  this.remove = function (id) {
    try {
      if (items.length === 0) {
        throw new Error("Cart is Empty");
      }
      let index = items.findIndex((p) => p.productId === id);
      cost -= items[index].productPrice;
      items.splice(index, 1);
    } catch (ex) {
      console.log(ex);
    }
  };

  this.checkout = function () {
    let cst = this.calculateCost();
    console.log("Total cost is ", cst);
    console.log("Checking Out...");
    this.empty();
  };

  this.empty = function () {
    items = [];
    cost = 0;
  };
  Object.defineProperties(this, {
    items: {
      configurable: false,
      get: function () {
        return items;
      }
    },
    cost: {
      configurable: false,
      get: function () {
        return cost;
      }
    }
  });
}

//working of the function

let c = new Cart();

c.add(47, "Facewash", 200);
c.add(48, "Facewash", 200);
console.log(c.cost);
c.add(49, "Facewash", 200);
c.add(50, "Facewash", 200);

c.remove(49);
console.log(c.cost);
c.remove(50);
console.log(c.cost);

c.checkout();
c.checkout();
