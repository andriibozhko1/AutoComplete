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

  const createSelectedBlocks = function(text) {
    const selectedBlocks = document.createElement("span");
    selectedBlocks.classList.add("selected__items");
    selectedBlocks.innerHTML = text;

    const crossIcon = document.createElement("span");
    crossIcon.classList.add("selected__crossIcon");

    selectedBlocks.appendChild(crossIcon);
    selectedItems.appendChild(selectedBlocks);

    inputText.value = "";
    dropDown.innerHTML = "";
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

  const MakeCounter = function() {
    this.count = 0;
    this.tempCount;
    this.up = () => this.count++;
    this.down = () => this.count--;
  };
  let counter = new MakeCounter();

  inputText.addEventListener("keydown", function(e) {
    let regForValue = /^([a-zа-яё]+|\d+)$/i;
    if (e.keyCode !== 13 && e.keyCode !== 40 && e.keyCode !== 38) {
      transformValue(inputText.value);
    }
    if (e.keyCode === 13) {
      if (regForValue.test(inputText.value)) {
        createSelectedBlocks(inputText.value);
      }
    }
    moveItems(e);
  });

  inputText.addEventListener("keyup", function(e) {
    let regForValue = /^([a-zа-яё]+|\d+)$/i;
    if (e.keyCode !== 13 && e.keyCode !== 40 && e.keyCode !== 38) {
      transformValue(inputText.value);
    }
    if (e.keyCode === 13) {
      if (regForValue.test(inputText.value)) {
        createSelectedBlocks(inputText.value);
      }
    }
  });

  app.addEventListener("click", function(e) {
    if (e.target.classList.contains("DropDown__items")) {
      createSelectedBlocks(e.target.dataset.value);
    }
    if (e.target.classList.contains("selected__crossIcon")) {
      e.target.parentElement.remove();
    }
  });
})();
