'use strict';

{
  //ホバーしたとき生えてくるmenuリスト
  const menuList = document.querySelector('.accordion-menu ul');
  //menuリストに入ってるmember
  const liMember = menuList.children;
  // ハンバーガーアイコン
  const hoverCatchIcon = document.querySelector('#first-menu .btw-left a.list-icon');

  hoverCatchIcon.addEventListener('mouseover', ()=>{
    menuList.classList.add('appear');
  });

  for(let i = 0; i < liMember.length; i++){
    liMember[i].addEventListener('mouseover', ()=>{
      menuList.classList.add('appear');
    });
  }
  hoverCatchIcon.addEventListener('mouseleave', ()=>{
    menuList.classList.remove('appear');
  });
  for(let i = 0; i < liMember.length; i++){
    liMember[i].addEventListener('mouseleave', ()=>{
      menuList.classList.remove('appear');
    });
  }

  // -------------ここまでheadermenuのScript-------------

  const ul = document.querySelector('.carousel-slides ul.slides');
  const li = ul.children;

  const leftBtn = document.querySelector('.left-button');
  const rightBtn = document.querySelector('.right-button');

  const dotsLists  = document.querySelectorAll('ul.dots li a');
  const dots = [];
  //slide一枚分の横幅の長さ
  let current = 0;
  //leftなら+ rightなら-

  function updateButton(){
    leftBtn.classList.remove('hidden');
    rightBtn.classList.remove('hidden');
    if(current === 0){
      // leftBtnの確認処理
      leftBtn.classList.add('hidden');
      return;
    }

    if(current === li.length - 1){
      // rightBtnの確認処理
      rightBtn.classList.add('hidden');
      return;
    }
  }

  function slideWidthController(){
    const slides = li[0].getBoundingClientRect().width;
    ul.style.transform = `translateX(${ -1 * slides * current}px)`;
  }

  function dotsController(){
    dotsLists.forEach(list =>{
      list.classList.remove('selected');
    })
    for(let i = 0; i < dotsLists.length; i++){
      dotsLists[i].addEventListener('click', (e)=>{
        dotsLists.forEach(list =>{
          list.classList.remove('selected');
        })
        e.preventDefault();
        current = i;
        dotsLists[current].classList.add('selected');
        slideWidthController();
        updateButton();
      })
    }
    dotsLists[current].classList.add('selected');
  }


  dotsController();
  updateButton();
  leftBtn.addEventListener('click',() => {
    current--;
    dotsController();
    updateButton();
    slideWidthController();
  });

  rightBtn.addEventListener('click',() => {
    current++;
    dotsController();
    updateButton();
    slideWidthController();
  });



  



}