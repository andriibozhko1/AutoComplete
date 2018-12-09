(function() {
  const listItems = ["Apple", "Lemon", "Lime", "Orange", "Strawberry"];
  const dropDown = document.querySelector(".DropDown");
  const inputText = document.querySelector(".app__input");
  const app = document.querySelector(".app");
  const selectedItems = document.querySelector('.selected');

  const fillObjItems = function() {
    const list = [];
    for (let i = 0; i < listItems.length; i++) {
      const itemsObj = {
        id: i + 1,
        value: listItems[i],
      };
      list.push(itemsObj);
    }

    inputText.addEventListener("keyup", function() {
      const inputValue = inputText.value;
      filterList(list, inputValue);
    });
    
    inputText.addEventListener('click', function() {
      renderList(list);
    })
  };

  const renderList = function(list) {
    dropDown.innerHTML = "";
    const createList = document.createElement("ul");
    createList.classList.add("DropDown__list");
    dropDown.appendChild(createList);

    for (let i = 0; i < list.length; i++) {
      const createListItems = document.createElement("li");
      createListItems.classList.add("DropDown__items");
      createListItems.dataset.value = list[i].value;
      createListItems.innerHTML = list[i].value;
      createList.appendChild(createListItems);
    }
  };

  const filterList = function(list, inputValue) {
    const findItems = inputValue.charAt(0).toUpperCase() + inputValue.slice(1);
    const filteredList = [];
    for (let i = 0; i < list.length; i++) {
      if (list[i].value.includes(findItems)) {
        filteredList.push(list[i]);
      }
    }
    renderList(filteredList);
  };

  const createSelectedBlocks = function (text) {
    const selectedBlocks = document.createElement('span');
      selectedBlocks.classList.add('selected__items');
      selectedBlocks.innerHTML = text;

      const crossIcon = document.createElement('span');
      crossIcon.classList.add('selected__crossIcon');

      selectedBlocks.appendChild(crossIcon);
      selectedItems.appendChild(selectedBlocks);

      inputText.value = '';
      dropDown.innerHTML = '';
  }


  document.body.addEventListener("click", function(e) {
    if (e.target.className !== "app__input" && e.target.className !== "DropDown__items") {
      dropDown.innerHTML = "";
    }
  });

  app.addEventListener('click', function(e) {
    if(e.target.className === 'DropDown__items') {
      createSelectedBlocks(e.target.dataset.value);
    }
  });

  app.addEventListener('click', function(e) {
    if(e.target.className === 'selected__crossIcon') {
      e.target.parentElement.remove();
    }
  })
  
  inputText.addEventListener('keydown', function(e) {
    if(e.keyCode === 13) {
      if(inputText.value !== '') {
        createSelectedBlocks(inputText.value);
      }
    }
  })

  fillObjItems();
})();
