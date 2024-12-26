const windowWidth = window.innerWidth;
const windowHeight = window.innerHeight;

function verticalSort() {
    let scroll = window.scrollY;
    ScrollTrigger.getAll().forEach(t => t._sortY = t.trigger ? scroll + t.trigger.getBoundingClientRect().top : t.start + window.innerHeight);
    ScrollTrigger.sort((a, b) => a._sortY - b._sortY);
    ScrollTrigger.refresh();
}

// lenis smoth scroll
// let lenDuration = 3;
// if (window.windowWidth >= 768) {
//     lenDuration = 3;
// }
// const lenis = new Lenis({
//     duration: lenDuration,
//     easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
//     smooth: true,
//     direction: 'vertical',
//     smoothTouch: false,
//     touchMultiplier: 2,
//   });

// function raf(time) {
//     lenis.raf(time);
//     ScrollTrigger.update();
//     requestAnimationFrame(raf);
// }
// requestAnimationFrame(raf);
// lenis.on('scroll', ScrollTrigger.update);

// hero animations

const heroSvgs = document.querySelectorAll('.hero-svg');
const header = document.querySelector('.header');

function heroTextAppear() {
    const text1 = 'Головне — експертність, яку ми транслюємо та те, що ми можемо дати саме вашому проекту.'.split('');
    const text2 = 'Маркетингова агенція, що заснована спеціалістами з різних сфер маркетинга. Ми не ставимо за мету змусити вас щось купити, важливіше – знайти зв’язок та взаєморозуміння для подальшої співпраці.'.split('');

    const heroTopText = document.querySelector('.hero-top-text');
    const heroBottomText = document.querySelector('.hero__text');

        text1.forEach( char => {
            const el = `<span class="hero-top-char">${char}</span>`;
            heroTopText.insertAdjacentHTML('beforeend', el)
        })

        text2.forEach( char => {
            const el = `<span class="hero-bottom-char">${char}</span>`;
            heroBottomText.insertAdjacentHTML('beforeend', el)
        })
}
heroTextAppear()

const allItems = document.querySelectorAll('.services-list__item');
const paragraphs = document.querySelectorAll('.services__b-wrap p');

let step = 80;
if (windowWidth <= 1650) {
    step = 70;
}
if (windowWidth <= 800) {
    step = 40;
}
if (windowWidth <= 768) {
    step = 80;
}

const animationDuration = 1;

gsap.set(allItems, { opacity: 0, y: step });
gsap.set(paragraphs, { opacity: 0 });

gsap.to(heroSvgs, {y: 0, duration: 0.7, opacity: 1, ease: 'power1.out', delay: 1.2})
gsap.to(header, {y: 0, duration: 0.7, delay: 1.2})
gsap.to(gsap.utils.toArray('.hero-top-char'), {
    color: '#fff',
    stagger: 0.01,
    delay: 1.2
})
gsap.to(gsap.utils.toArray('.hero-bottom-char'), {
    color: '#fff',
    stagger: 0.01,
}, '<')

const mainTL = gsap.timeline({
    scrollTrigger: {
        trigger: '.HAS-wrap',
        start: 'top top',
        end: `+=${windowHeight * 3}`,
        // end: `+=${1000}`,
        pin: true,
        scrub: 1,
    }
})
.to('.white-overlay', {
    y: '0',
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
})
.from('.spiral-image__wrap', {
    zIndex: -2,
})
.to('.hero-s-wrap', {opacity: 0})
.set('.about-s-wrap', {
    opacity: 1,
}, '<')
if (window.innerWidth >= 768) {
    mainTL
        .to('.spiral-text', {
            scale: 1,
            width: '500%',
            height: '500%',
            rotate: 180,
        })
        .to('.spiral-text', {
            opacity: 0,
            delay: 1,
        }, '<');
}
// about tl
let del = 0;
if (windowWidth >= 768) {
    del = 2;
}
mainTL
.from('.about__inner-t', {
    opacity: 0,
    delay: del,
    // scale: 0.8
}, '<')
.from('.about__cards', {
    opacity: 0,
    // scale: 0.8
}, '<')
.call(() => {
    document.querySelectorAll(".about__card-num > span").forEach(function (element) {
      var num = parseFloat(element.getAttribute("data-number"));
      var split = (num + "").split(".");
      var decimals = split.length > 1 ? split[1].length : 0;

      var zero = { val: 0 };
      gsap.to(zero, {
        val: num,
        ease: "power4.out",
        onUpdate: function () {
          element.textContent = zero.val.toFixed(decimals);
        }
      });
    });
  }, null, '<')
//   services tl
  .to('.about__overlay', {
    y: 0,
    opacity: 1,
})
.to('.about__inner', {
    scale: 0.8,
}, '<')
.to('.about-s-wrap', {opacity: 0})
.to('.services-s-wrap', {opacity: 1}, '<')
  allItems.forEach((item, index) => {
    const isLast = index === allItems.length - 1;
    mainTL.to(
        item,
        {
            y: 0,
            scale: 1.5,
            opacity: 1,
            filter: 'blur(0px)',
            duration: animationDuration,
        },
        `step-${index}`
    );
    mainTL.to(
        paragraphs[index],
        {
            opacity: 1,
            duration: animationDuration,
        },
        `step-${index}`
    );
    if (index > 0) {
        mainTL.to(
            allItems[index - 1],
            {
                y: -step,
                scale: 1,
                filter: 'blur(3px)',
                opacity: 0,
                duration: animationDuration,
            },
            `step-${index}`
        );
        mainTL.to(
            paragraphs[index - 1],
            {
                opacity: 0,
                duration: animationDuration,
            },
            `step-${index}`
        );
    }
    if (!isLast) {
        mainTL.to(
            allItems[index + 1],
            {
                opacity: 1,
                duration: animationDuration,
            },
            `step-${index}`
        );
    }
});


// // tabs
// const tabsText = 'Наші кейси — це результат ретельного аналізу, творчого підходу та ефективної реалізації стратегій. Ми перетворюємо ідеї на реальні досягнення, які допомагають брендам розкривати свій потенціал у цифровому просторі. Ознайомтесь із нашими проєктами, щоб побачити, як ми вивели бізнеси на новий рівень.';

// function insertLetters() {
//     const arr = tabsText.split('');
//     const insertContainer = document.querySelector('.tabs-intro .text');

//     arr.forEach( ch => {
//         const el = `<span class="text-char">${ch}</span>`;
//         insertContainer.insertAdjacentHTML('beforeend', el)
//     })
// }
// insertLetters();

// const introTextChars = document.querySelectorAll('.text-char');
// if (introTextChars) {
//     const textCharsTl = gsap.timeline({
//         scrollTrigger: {
//             trigger: '.tabs-intro .text',
//             start: 'top 90%',
//             end: 'top 20%',
//             scrub: true,
//         }
//     })

//     introTextChars.forEach( char => {
//         textCharsTl
//             .to(char, {
//                 color: '#fff',
//                 duration: 1,
//             })
//     })
// }

// const tabs = document.querySelectorAll('.tab');
// if (tabs) {
//     let activeTabIndex = 0;
    
//     tabs.forEach( (tab, ind) => {
//         tab.addEventListener('click', () => {
//             if (ind === activeTabIndex) {
//                 return;
//             } else {
//                 tabs[activeTabIndex].classList.remove('active')
//                 tabs[ind].classList.add('active')
//                 activeTabIndex = ind;
//             }
//         })
//     })

//     gsap.from(Array.from(tabs), {
//         scrollTrigger: {
//           trigger: tabs,
//           start: "top 80%",
//           end: "top 30%",
//           scrub: true,
//         },
//         opacity: 0,
//         duration: 0.8,
//         stagger: 0.3,
//       });
// }

// const tabsIntroTitle = document.querySelector('.tabs-intro__title');
// if (tabsIntroTitle) {
//     gsap.from(tabsIntroTitle, {
//         scrollTrigger: {
//           trigger: tabsIntroTitle,
//           start: "top 80%",
//           end: "top 30%", 
//           scrub: true, 
//         },
//         x: -100, 
//         opacity: 0, 
//         duration: 0.8,
//       });
// }

// const tabsIntroText = document.querySelector('.tabs-intro > .text');
// if (tabsIntroText) {
//     gsap.from(tabsIntroText, {
//         scrollTrigger: {
//           trigger: tabsIntroText,
//           start: "top 80%",
//           end: "top 40%", 
//           scrub: true, 
//         },
//         y: 70, 
//         opacity: 0, 
//         duration: 0.5,
//       });
// }

// // approach
// function initApproachAnimations() {
//     const approachCards = document.querySelectorAll('.approach__card');
//     gsap.set(approachCards, { opacity: 0 });
//     const animationEnd = windowWidth >= 768 ? (approachCards.length - 1) * 1000 
//     : (approachCards.length - 1) * windowHeight;

//     const appTimeline = gsap.timeline({
//         scrollTrigger: {
//             trigger: '.approach__inner',
//             start: 'top top',
//             end: `+=${animationEnd}`,
//             pin: true,
//             scrub: true,
//         },
//     });

//     approachCards.forEach((card, index) => {
//         const img = card.querySelector('.approach__card-num');
//         const cardPreTitle = card.querySelector('.approach__card-pre');
//         const cardTitle = card.querySelector('.approach__card-title-text');
//         const cardList = card.querySelectorAll('.approach__card-list > p');

//         if (index === 0) {
//     const firstTimeline = gsap.timeline({
//         scrollTrigger: {
//             trigger: card,
//             start: 'top 65%',
//             end: 'top 20%',
//             scrub: true,
//             toggleActions: 'play reverse play reverse',
//         },
//     });

//     firstTimeline
//         .to(card, { opacity: 1, duration: 0.1 })
//         .from(img, { 
//             y: 80, 
//             opacity: 0, 
//             duration: 0.7 
//         })
//         .from(cardTitle, { 
//             x: -80, 
//             opacity: 0, 
//             duration: 0.7 
//         }, '<')
//         .from(cardPreTitle, { 
//             x: -80, 
//             opacity: 0, 
//             duration: 0.7 
//         }, '<')
//         .from(cardList, {
//             opacity: 0,
//             duration: 0.5,
//         }, '<');

//     appTimeline
//         .to(cardList, { opacity: 0, duration: 0.5 })
//         .to(cardTitle, { x: 80, opacity: 0, duration: 0.5 }, '<')
//         .to(cardPreTitle, { x: 80, opacity: 0, duration: 0.5 }, '<')
//         .to(img, { y: -80, opacity: 0, duration: 0.5 }, '<')
//         .to(card, { opacity: 0, duration: 0.1 });
// } else {
//     appTimeline
//         .to(card, { opacity: 1, duration: 0.1})
//         .from(img, { y: 80, opacity: 0, duration: 0.7 })
//         .from(cardTitle, { x: -80, opacity: 0, duration: 0.7 }, '<')
//         .from(cardPreTitle, { x: -80, opacity: 0, duration: 0.7 }, '<')
//         .from(cardList, {
//             opacity: 0,
//             duration: 0.5,
//         }, '<');
//     if (index !== approachCards.length - 1) {
//         appTimeline
//             .to(cardList, { opacity: 0, duration: 0.5 })
//             .to(cardTitle, { x: 80, opacity: 0, duration: 0.5 }, '<')
//             .to(cardPreTitle, { x: 80, opacity: 0, duration: 0.5 }, '<')
//             .to(img, { y: -80, opacity: 0, duration: 0.5 }, '<')
//             .to(card, { opacity: 0, duration: 0.1 });
//     }
// }
//     });
// }
// initApproachAnimations()
// // verticalSort();

// // navigation controls
// const initNavigation = (list, target, offset = 0) => {
//     const targetSection = document.getElementById(target)
//     list.forEach(item => {
//         item.addEventListener('click', () => {
//             lenis.scrollTo(targetSection, {
//                 duration: 1.7,
//                 offset: offset,
//             });
//         })
//     })
// }

// const aboutLinks = document.querySelectorAll('.about-link');
// if (aboutLinks) {
//     let offset = -300;
//     if (windowWidth >= 768) {
//         offset = 300;
//     }
//     aboutLinks.forEach(item => {
//         item.addEventListener('click', (e) => {
//             e.preventDefault();
//             lenis.scrollTo(windowHeight * 3, {
//                 duration: 1.7,
//                 offset: offset,
//             });
//         })
//     })
// }
// const servicesLinks = document.querySelectorAll('.services-link');
// if (servicesLinks) {
//     let scrollPosition = windowWidth >= 768 ? windowHeight * 4.8  : windowHeight * 4.3;
//     servicesLinks.forEach(item => {
//         item.addEventListener('click', (e) => {
//             e.preventDefault();
//             lenis.scrollTo(scrollPosition, {
//                 duration: 1.7,
//             });
//         })
//     })
// }

// const tabsLinks = document.querySelectorAll('.tabs-link');
// if (tabsLinks) {
//     initNavigation(tabsLinks, 'tabs',-20)
// }

// const approachLinks = document.querySelectorAll('.approach-link');
// if (approachLinks) {
//     initNavigation(approachLinks, 'approach')
// }

// const faqLinks = document.querySelectorAll('.faq-link');
// if (faqLinks) {
//     initNavigation(faqLinks, 'faq')
// }

// const contactsLinks = document.querySelectorAll('.contacts-link');
// if (contactsLinks) {
//     initNavigation(contactsLinks, 'contacts')
// }