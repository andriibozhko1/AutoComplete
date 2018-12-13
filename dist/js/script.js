(function() {
  const listItems = ["Apple", "Lemon", "Lime", "Orange", "Strawberry"];
  const dropDown = document.querySelector(".DropDown");
  const inputText = document.querySelector(".app__input");
  const app = document.querySelector(".app");
  const selectedItems = document.querySelector(".selected");
  let counter;

  const renderItems = function(list) {
    counter = -1;
    const createList = document.createElement("ul");
    createList.classList.add("DropDown__list");
    dropDown.innerHTML = "";
    dropDown.appendChild(createList);

    for (let i = 0; i < list.length; i++) {
      const createListItems = document.createElement("li");
      createListItems.classList.add("DropDown__items");
      createListItems.dataset.value = list[i];
      createListItems.innerHTML = list[i];
      createList.appendChild(createListItems);
    }
  };

  inputText.addEventListener("keydown", function(e) {
    const DropDownItems = document.querySelectorAll(".DropDown__items");
    let tempItems;

    if (e.keyCode === 40) {
        if (counter >= DropDownItems.length - 1) {
          counter = -1;
        }

        tempItems = counter;
        if (tempItems === -1) {
          tempItems = DropDownItems.length - 1;
        }
        counter++;
        DropDownItems[counter].classList.add("test");
        DropDownItems[tempItems].classList.remove("test");
        inputText.value = DropDownItems[counter].dataset.value;
    } else if (e.keyCode === 38) {
        if (counter <= 0) {
          counter = DropDownItems.length;
        }

        tempItems = counter;
        if (tempItems === DropDownItems.length) {
          tempItems = 0;
        }
        counter--;
        DropDownItems[counter].classList.add("test");
        DropDownItems[tempItems].classList.remove("test");
        inputText.value = DropDownItems[counter].dataset.value;
    } else if (e.keyCode === 13) {
      createSelectedBlocks(inputText.value);
    }
  });

  const filterList = function(arr, inputValue) {
    const filteredValue =
      inputValue.charAt(0).toUpperCase() + inputValue.slice(1);
    const filteredItems = [];

    for (let i = 0; i < arr.length; i++) {
      if (arr[i].includes(filteredValue)) {
        filteredItems.push(arr[i]);
      }
    }
    renderItems(filteredItems);
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

  inputText.addEventListener("click", function() {
    renderItems(listItems);
  });

  inputText.addEventListener("keyup", function(e) {
    if (e.keyCode !== 38 && e.keyCode !== 40 && e.keyCode !== 13) {
      filterList(listItems, inputText.value);
    }
  });

  document.body.addEventListener("click", e => {
    if (
      e.target.className !== "app__input" &&
      e.target.className !== "DropDown__items"
    ) {
      dropDown.innerHTML = "";
    } else if (e.target.className === "DropDown__items") {
      createSelectedBlocks(e.target.dataset.value);
    }
  });

  app.addEventListener("click", function(e) {
    if (e.target.classList == "selected__crossIcon") {
      e.target.parentElement.remove();
    }
  });
})();
