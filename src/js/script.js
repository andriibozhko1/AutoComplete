(function() {
    const test2 = document.querySelector('.app__label');
    const test3 = document.querySelector('.app__input');
  
    
    test3.addEventListener('click', function() {
      test2.classList.add('LabelAnimation');    
    })
    document.body.addEventListener('click',function(e) {
      if(e.target !== test3) {
        test2.classList.remove('LabelAnimation');
      }
    })
})();
