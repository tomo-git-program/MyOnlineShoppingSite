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
  //↑スライドの数
  const leftBtn = document.querySelector('.left-button');
  const rightBtn = document.querySelector('.right-button');

  const dotsLists  = document.querySelectorAll('ul.dots li a');
  //↑ドットタブの数

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

  let setTimeId;
  function play(){
    setTimeId = setTimeout(() =>{
      // console.log("move!");
      // console.log(`${current}`)
      if(current === li.length - 1){
        current = 0;
      }else{
        current++;
      }
      dotsController();
      updateButton();
      slideWidthController();
      play();
    }, 10000)
  }

  function slidesDotsEqualer(){
    try {
      if(!(li.length === dotsLists.length)){
        //もし、slideの数とドットの数が一致しないならコンソール出して
        //処理終了
        clearTimeout(setTimeId);
        throw new Error('slideとDotの数が違います。終了します。');;
      }
    } catch (e) {
      console.log(e.message);
      //ここにはthrow new errorの内容が出てくる
    }
  }
  play();
  slidesDotsEqualer();
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

  window.addEventListener('resize',()=>{
    slideWidthController();
  })

  // ここまでカールセルとカールセルアニメーションのScript

  const arrivalLeftButton = document.querySelector("button.arrival-left-button");
  const arrivalRightButton = document.querySelector("button.arrival-right-button");

  const arrivalsLists = document.querySelector("ul.arrivalsLists");

  let arrivalCurrent = 0;

  arrivalLeftButton.addEventListener('click', ()=>{
    console.log("clicked!");
    const arrivalslide = arrivalsLists.children[0].getBoundingClientRect().width + 12;
    console.log(arrivalslide);
    // +12はgapの分

    arrivalCurrent++;
    arrivalsLists.style.transform = `translateX(${ -1 * arrivalslide * arrivalCurrent}px)`;

  });
  arrivalRightButton.addEventListener('click', ()=>{
    console.log("clicked!");
    const arrivalslide = arrivalsLists.children[0].getBoundingClientRect().width + 12;
    console.log(arrivalslide);
    // +12はgapの分

    arrivalCurrent--;
    arrivalsLists.style.transform = `translateX(${ -1 * arrivalslide * arrivalCurrent}px)`;

  });


  



}