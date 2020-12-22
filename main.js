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



function scrollIntoView(selector) {
  const section = document.querySelector(selector);
  section.scrollIntoView({behavior: "smooth"});
  selectNavItem(navItems[sectionIds.indexOf(selector)]);
}



// 1. 모든 섹션 요소들과 메뉴 아이템을 가지고 온다.
// 2. IntersectionObserver를 이용해서 모든 섹션들을 관찰한다.
// 3. 보여지는 섹션에 해당하는 메뉴 아이템을 활성화 시킨다

const sectionIds = [
  '#home',
  '#about',
  '#skills',
  '#work',
  '#testimonials',
  '#contact'
]

const sections = sectionIds.map(id => document.querySelector(id));
const navItems = sectionIds.map(id => document.querySelector(`[data-link="${id}"]`));

const observerOptions = {
  root: null,
  rootMargin: '0px',
  threshold: 0.3
};

let selectedNavIndex;
let selectedNavItem = navItems[0]
function selectNavItem(selected) {
  selectedNavItem.classList.remove('active');
  selectedNavItem = selected  // navItems[selectedNavIndex]
  selectedNavItem.classList.add('active');
}


const observerCallback = (entries, observer) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting && entry.intersectionRatio > 0) {
      const index = sectionIds.indexOf(`#${entry.target.id}`)
      if(entry.boundingClientRect.y < 0) {
        selectedNavIndex = index + 1;
      } else {
        selectedNavIndex = index - 1;
      }
      console.log(navItems[selectedNavIndex].classList);
      // selectNavItem(navItems[selectedNavIndex]);
    };
  });
};

const observer = new IntersectionObserver(observerCallback, observerOptions);
sections.forEach(section => observer.observe(section));

window.addEventListener('wheel', () => {
  if (window.scrollY === 0) {
    selectedNavIndex = 0;
  } else if (Math.round(window.scrollY + window.innerHeight) >= document.body.clientHeight) {
    selectedNavIndex = navItems.length - 1;
  }
  selectNavItem(navItems[selectedNavIndex])
})
