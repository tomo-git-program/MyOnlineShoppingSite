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


  function arrivalItemsGenerator(count){
    for(let i = 0; i < count; i++){
      //合体元の親ノード
      const motherUl = document.querySelector("div.arrow-pos-container").children[0];
      const arrival_li = document.createElement('li');
      //↑ul + 生成した(li)の連結ノード

      // 自動でcreateしたいエレメント
  
      const arrival_sold_out = document.createElement('div');
      const sold_out_text = document.createElement('p');
      const arrival_buy_cards = document.createElement('div');
      const arrival_buy_cards_text = document.createElement('p');
      const arrival_a =  document.createElement('a');
      let arrival_img = document.createElement('img');
      //カードのイメージ画像も調整できるように
      let cardName_p = document.createElement('p');
      //カード名は調整できるように
      let inventory_p = document.createElement('p');
      //在庫数は調整できるように
      let price_p = document.createElement('p');
      //値段は調整できるように
  
  
      //下準備系
      arrival_sold_out.classList.add("soldout");
      // div class="soldout"
      arrival_buy_cards.classList.add("buy");
      //div class="buy"
      arrival_buy_cards_text.textContent = "詳細を見る"
      arrival_buy_cards.appendChild(arrival_buy_cards_text);
      //div (class="buy") > p(arrival_buy_cards_text)
      sold_out_text.textContent = "sold out"
      //pテキスト(sold out)
      arrival_sold_out.appendChild(sold_out_text);
      // div > p
      arrival_a.appendChild(arrival_img);
      //a > img
      arrival_a.appendChild(arrival_buy_cards);
      cardName_p.classList.add("cardname");
      //p class="cardname"
      inventory_p.classList.add("inventory");
      //p class="inventory"
      price_p.classList.add("price");
      //<p class="price">
  
      //大元にドッキングする系
      arrival_li.appendChild(arrival_sold_out);
      // ul > li > div(p入ってる)
      //divをbaseliにアペンド
      arrival_li.appendChild(arrival_a);
      // ul > li > a(img入ってる)
      arrival_li.appendChild(cardName_p);
      //ul > li > p(カード名【名前はまだない】)
      arrival_li.appendChild(inventory_p);
      //ul > li > p(在庫数【在庫数はまだない】)
      arrival_li.appendChild(price_p);
      //ul > li > p(値段【値段はまだない】)
      motherUl.appendChild(arrival_li);
    }
  }
  function arrivalItemsSetup(number,href, imgSrc, cardName, inventory,price){
    const lists = document.querySelector('ul.arrivalsLists').children;
    document.querySelector('ul.arrivalsLists').removeChild;
    lists[number].querySelector('a').setAttribute(`href`, href);
    lists[number].querySelector('img').src = imgSrc;
    lists[number].querySelector('p.cardname').textContent = `${cardName}`;
    lists[number].querySelector('p.inventory').textContent = `【在庫数:】${inventory}枚`;
    lists[number].querySelector('p.price').textContent = `【値段:】${price}円`;

    if(inventory <= 0){
      const soldout = lists[number].querySelector('div.soldout');
      soldout.classList.add("appear");
      const buy_cards = lists[number].querySelector('div.buy');
      buy_cards.style.opacity = "0";
    }else{
      return
    }
  }


  arrivalItemsGenerator(8);
  arrivalItemsSetup(0, "#","imgs/arrival-cards.jpg","船砕きの怪物", 0, 1000);
  arrivalItemsSetup(1, "#","imgs/arrival-cards.jpg","ドミナリアの英雄、テフェリー", 5, 1000);
  arrivalItemsSetup(2, "#","imgs/arrival-cards.jpg","黙示録、シェオルドレッド", 0, 1000);
  arrivalItemsSetup(3, "#","imgs/arrival-cards.jpg","時を解すもの、テフェリー", 12, 1000);
  arrivalItemsSetup(4, "#","imgs/arrival-cards.jpg","冥途明かりの行進", 8, 600);
  arrivalItemsSetup(5, "#","imgs/arrival-cards.jpg","黙示録、シェオルドレッド", 0, 1000);
  arrivalItemsSetup(6, "#","imgs/arrival-cards.jpg","時を解すもの、テフェリー", 12, 1000);
  arrivalItemsSetup(7, "#","imgs/arrival-cards.jpg","冥途明かりの行進", 8, 600);

  //ここまでJSで最新入荷アイテム表示用Script

  const arrivalLeftButton = document.querySelector("button.arrival-left-button");
  const arrivalRightButton = document.querySelector("button.arrival-right-button");

  const arrivalsLists = document.querySelector("ul.arrivalsLists");

  let arrivalCurrent = 0;
  function arrivalButtonsController(){
    arrivalLeftButton.classList.remove('hidden');
    arrivalRightButton.classList.remove('hidden');

    if(arrivalCurrent === arrivalsLists.children.length - 1){
      arrivalRightButton.classList.add('hidden');
      return;
    }else{
      arrivalRightButton.classList.remove('hidden');
    }

    if(arrivalCurrent === 0){
      arrivalLeftButton.classList.add('hidden');
      return;
    }else{
      arrivalLeftButton.classList.remove('hidden');
    }

  }

  function arrivalslideMover(){
    const arrivalslide = arrivalsLists.children[0].getBoundingClientRect().width + 12;
    arrivalsLists.style.transform = `translateX(${ -1 * arrivalslide * arrivalCurrent}px)`;
  }

  arrivalButtonsController();
  arrivalLeftButton.addEventListener('click', ()=>{
    // +12はgapの分
    console.log(arrivalsLists.children.length - 2);
    console.log(arrivalCurrent);
    arrivalCurrent--;
    arrivalButtonsController();
    arrivalslideMover();

  });
  arrivalRightButton.addEventListener('click', ()=>{
    const arrivalslide = arrivalsLists.children[0].getBoundingClientRect().width + 12;
    // +12はgapの分
    arrivalCurrent++;
    arrivalButtonsController();
    arrivalslideMover();
  });

  window.addEventListener('resize',()=>{
    arrivalslideMover();
  })

  //ここまで最新入荷アイテム手動クリックスライド用script



}