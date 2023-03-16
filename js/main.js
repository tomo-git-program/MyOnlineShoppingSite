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

  const ul = document.querySelector('.carousel-slides ul');
  const li = ul.children;

  



}