(function() {
  const listItems = ["Apple", "Lemon", "Lime", "Orange", "Strawberry"];
  const dropDown = document.querySelector(".DropDown");
  const inputText = document.querySelector(".app__input");
  const app = document.querySelector(".app");
  const selectedItems = document.querySelector(".selected");

  const debounce = function(fn, ms) {
    let timeOut;

    return function() {
      clearTimeout(timeOut);
      timeOut = setTimeout(() => {
        return fn.apply(this, arguments);
      }, ms);
    };
  };

  const renderItems = function(arr) {
    const createList = document.createElement("ul");
    createList.classList.add("DropDown__list");
    dropDown.innerHTML = "";
    dropDown.appendChild(createList);

    for (let items of arr) {
      const createListItems = document.createElement("li");
      createListItems.classList.add("DropDown__items");
      createListItems.dataset.value = items;
      createListItems.innerHTML = items;
      createList.appendChild(createListItems);
    }
  };

  let transformValue = function(inputValue) {
    const transformedValue =
      inputValue.charAt(0).toUpperCase() + inputValue.slice(1);
    filterList(transformedValue);
  };
  const filterList = function(value) {
    const filteredItems = [];
    for (let items of listItems) {
      if (items.includes(value)) {
        filteredItems.push(items);
      }
    }
    renderItems(filteredItems);
  };

  transformValue = debounce(transformValue, 500);
  inputText.addEventListener("keyup", function(e) {
    transformValue(inputText.value);
  });
})();
