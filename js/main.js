// font
const font = new FontFace(
	"Murs Gothic",
	"url(../fonts/MursGothic-WideDark.woff2)",
	{ style: "normal", weight: "800", }
).load()
	.then((loadedFont) => {
		document.fonts.add(loadedFont);
})

//play video or foto
function get_name_browser() {
    var ua = navigator.userAgent;
    if (ua.search(/Safari/) > 0 && ua.search(/Chrome/) === -1) {
      return true;
    }
    return false;
  }
  
  if (get_name_browser()) {
    document.querySelector(".hero-video").classList.add('safari');
  }

// nav menu items hover effect
document.querySelectorAll(".nav-link").forEach((link) => {
	link.addEventListener("mouseenter", () => {
		gsap.to(link.querySelectorAll(".word-wrap1 .sym.symB"), {
			y: 0,
			duration: 0.4,
			ease: "power2.out",
		});
		gsap.to(link.querySelectorAll(".word-wrap1 .sym.symT"), {
			y: "110%",
			duration: 0.4,
			ease: "power2.out",
		});

		gsap.to(link.querySelectorAll(".word-wrap2 .sym.symT"), {
			y: 0,
			duration: 0.4,
			ease: "power2.out",
		});
		gsap.to(link.querySelectorAll(".word-wrap2 .sym.symB"), {
			y: "-110%",
			duration: 0.4,
			ease: "power2.out",
		});
	});

	link.addEventListener("mouseleave", () => {
		gsap.to(link.querySelectorAll(".word-wrap1 .sym.symB"), {
			y: "110%",
			duration: 0.4,
			ease: "power2.in",
		});
		gsap.to(link.querySelectorAll(".word-wrap1 .sym.symT"), {
			y: "0",
			duration: 0.4,
			ease: "power2.in",
		});

		gsap.to(link.querySelectorAll(".word-wrap2 .sym.symT"), {
			y: "-110%",
			duration: 0.4,
			ease: "power2.in",
		});
		gsap.to(link.querySelectorAll(".word-wrap2 .sym.symB"), {
			y: 0,
			duration: 0.4,
			ease: "power2.in",
		});
	});
});

// faq title
const faqTitles = document.querySelectorAll(".faq-text");
if (faqTitles) {
	faqTitles.forEach((title) => gsap.set(title, { y: "100%" }));

	let currentInd = 0;
	const maxItems = faqTitles.length - 1;

	gsap.set(faqTitles[currentInd], {
		y: 0,
	});

	function animateText(cur) {
		let nextInd;
		if (cur < maxItems) {
			nextInd = cur + 1;
		} else if (cur === maxItems) {
			nextInd = 0;
		}
		gsap.set(faqTitles[nextInd], { y: "100%" });

		const tl = gsap.timeline();

		tl.to(faqTitles[currentInd], {
			y: "-100%",
			duration: 0.8,
			ease: "power3.inOut",
		});
		tl.to(
			faqTitles[nextInd],
			{
				y: 0,
				duration: 0.8,
				ease: "power3.inOut",
			},
			"<"
		);
		currentInd = nextInd;
	}

	setInterval(() => {
		animateText(currentInd);
	}, 2000);
}

// hero btn animation
const heroBtns = document.querySelectorAll(".hero__btn");
if (heroBtns.length) {
	heroBtns.forEach((btn) => {
		const overlay = btn.querySelector(".hero__btn-overlay");
		const span = btn.querySelector("span");

		btn.addEventListener("mouseenter", () => {
			gsap.set(overlay, { left: "100%" });
			gsap.to(overlay, {
				duration: 0.5,
				ease: "power1.inOut",
				left: 0,
			});
			gsap.to(span, {
				color: "#000",
				duration: 0.5,
			});
		});

		btn.addEventListener("mouseleave", () => {
			gsap.to(overlay, {
				duration: 0.5,
				ease: "power1.inOut",
				left: "-100%",
			});
			gsap.to(span, {
				color: "#fff",
				duration: 0.5,
			});
		});
	});
}

// burger
const burger = document.querySelector(".burger");
const mobileMenu = document.querySelector(".mobile-menu");
const closeMenuBtn = document.querySelector(".close-menu__btn");
const mobileMenuItems = document.querySelectorAll(".mobile-menu__nav-link");
burger.addEventListener("click", (e) => {
	mobileMenu.classList.add("active");
	burger.classList.add("active");
});
mobileMenuItems.forEach((i) =>
	i.addEventListener("click", () => {
		mobileMenu.classList.remove("active");
		burger.classList.remove("active");
	})
);
closeMenuBtn.addEventListener("click", () => {
	mobileMenu.classList.remove("active");
	burger.classList.remove("active");
});

// tabs image/video controls
const tabContentPhotos = document.querySelectorAll(".tab-content__photo");
if (tabContentPhotos) {
	tabContentPhotos.forEach((tab) => {
		const video = tab.querySelector("video");
		if (video) {
			video.classList.add("visually-hidden");
		}

		if (tab.classList.contains("hasVideo")) {
			const img = tab.querySelector("img");

			img.classList.add("visually-hidden");
			video.classList.remove("visually-hidden");
		}
	});
}

// services next link
const servicesNextLink = document.querySelector(".services__next-link");
if (servicesNextLink) {
	servicesNextLink.addEventListener("click", () => {
		const targetId = servicesNextLink.getAttribute("href").slice(1);
		const targetElement = document.getElementById(targetId);
		lenis.scrollTo(targetElement, {
			duration: 1.5,
			offset: 0,
		});
	});
}
