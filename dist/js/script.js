(function() {
  const listItems = ["Apple","Lemon", "Lime", "Orange", "Strawberry"];
  const dropDown = document.querySelector('.DropDown');
  const inputText = document.querySelector('.app__input');

  const fillObjItems = function() {
    const list = [];
    for (let i = 0; i < listItems.length; i++) {
      const itemsObj = {
        id: i + 1,
        value: listItems[i],
        similarity: false,
        selected: false
      };
      list.push(itemsObj);
    }
    inputText.addEventListener('keyup', function() {
      const inputValue = inputText.value;
      filterList(list,inputValue);
    })
    inputText.addEventListener('click', function() {
      
      filterList(list,inputValue);
    })
    document.body.addEventListener('click', function(e) {
      if(e.target.className !== 'app__input') {
        dropDown.innerHTML = '';
      }
    })
  };
  
  const renderList = function(list) {
    dropDown.innerHTML = '';
    const createList = document.createElement('ul');
    createList.classList.add('DropDown__list');
    dropDown.appendChild(createList);
    
    for(let i = 0; i < list.length; i++) {
      const createListItems = document.createElement('li');
      createListItems.classList.add('DropDown__items');
      createListItems.dataset.value = list[i].value;
      createListItems.innerHTML = list[i].value;

      createList.appendChild(createListItems);
    }
  }
  const filterList = function(list,inputValue) {
    const findItems = inputValue.charAt(0).toUpperCase() + inputValue.slice(1);
    const test = [];
    for(let i = 0; i < list.length; i++) {
      if(list[i].value.includes(findItems)) {
        test.push(list[i]);
      }
    }
    renderList(test);
  }
  fillObjItems();
})();
