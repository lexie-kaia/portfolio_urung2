'use strict';

// Make navbar transparent when it is on the top
const navbar = document.querySelector('#navbar');
const navbarHeight = navbar.getBoundingClientRect().height;

document.addEventListener('scroll', () => {
  if (window.scrollY > navbarHeight) {
    navbar.classList.add('navbar--dark');
  } else {
    navbar.classList.remove('navbar--dark');
  }
  navbarMenu.classList.remove('open');
});


// Handle scrolling when tapping on the navbar menu
navbar.addEventListener('click', (event) => {
  const link = event.target.dataset.link;
  if (link == null) {
    return;
  }
  scrollIntoView(link)
});

function scrollIntoView(selector) {
  const section = document.querySelector(selector);
  section.scrollIntoView({behavior: "smooth"});
}


// Navbar toggle button for small screen
  // make toggleBtn in HTML
  // default toggleBtn display: none, position: absolute;
  // below 768px toggleBtn display: block;/ navbar display: none;
  // addEventListener -> click, add .navbar class .open(display:block)
  // in handle scrolling above, link == null -> return;
  // remove class .open when scrolling down
const navbarToggleBtn = document.querySelector('.navbar__toggle-btn');
const navbarMenu = document.querySelector('.navbar__menu');

navbarToggleBtn.addEventListener('click', () => {
  navbarMenu.classList.toggle('open');
});


// Handle click on 'contact me' button on home
  // get contact me button, add eventlistner
  // handle scrolling to contact section
const homeContactBtn = document.querySelector('.home__contact');

homeContactBtn.addEventListener('click', () => {
  scrollIntoView('#contact');
});


// Make home slowly fade to transparent as the window scrolls down
  // 1 - scroll value / home height * 2 -> home__container opacity
const home = document.querySelector('#home');
const homeHeight = home.getBoundingClientRect().height;
const homeContainer = document.querySelector('.home__container');

document.addEventListener('scroll', () => {
  homeContainer.style.opacity = 1 - window.scrollY / homeHeight * 2;
});


// show 'arrow up' button when scrolling down
  // make arrow up button in HTML
  // make class .visible with opactiy and pointer events
    // display: none(X) -> can't handle animation
  // scroll down -> add class .visible
const arrowUpBtn = document.querySelector('.arrow-up');

document.addEventListener('scroll', () => {
  if (window.scrollY > homeHeight / 2) {
    arrowUpBtn.classList.add('visible');
  } else {
    arrowUpBtn.classList.remove('visible');
  }
});


// Handle click on the 'arrow up' button
arrowUpBtn.addEventListener('click', () => {
  scrollIntoView('#home');
})



// Project
  // add category__btn -> data-filter/ project -> data-type in html
  // when 'data-filter' clicked -> display:none !'data-filter' === 'data-type' 

const projectBtnContainer = document.querySelector('.work__categories');
const projectContainer = document.querySelector('.work__projects')
const projects = document.querySelectorAll('.project')

projectBtnContainer.addEventListener('click', (event) => {
  const filter = event.target.dataset.filter || event.target.parentNode.dataset.filter;
  if(filter == null) {
    return;
  }

  const active = document.querySelector('.category__btn.selected')
  active.classList.remove('selected');
  const target = event.target.nodeName === 'BUTTON' ? event.target : event.target.parentNode;
  target.classList.add('selected');

  projectContainer.classList.add('anim-out');
  setTimeout(() => {
    projects.forEach((project) => {
      if(filter === '*' || filter === project.dataset.type) {
        project.classList.remove('invisible');
      } else {
        project.classList.add('invisible');
      }
    })
    projectContainer.classList.remove('anim-out');
  }, 300)
});