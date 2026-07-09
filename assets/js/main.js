
  function toggleScrolled() {
    const selectBody = document.querySelector('body');
    const selectHeader = document.querySelector('#header');
    if (!selectHeader.classList.contains('scroll-up-sticky') && !selectHeader.classList.contains('sticky-top') && !selectHeader.classList.contains('fixed-top')) return;
    window.scrollY > 100 ? selectBody.classList.add('scrolled') : selectBody.classList.remove('scrolled');
  }

  document.addEventListener('scroll', toggleScrolled);
  window.addEventListener('load', toggleScrolled);

  /**
   * Mobile nav toggle
   */
  const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');

  function mobileNavToogle() {
    document.querySelector('body').classList.toggle('mobile-nav-active');
    mobileNavToggleBtn.classList.toggle('bi-list');
    mobileNavToggleBtn.classList.toggle('bi-x');
  }
  mobileNavToggleBtn.addEventListener('click', mobileNavToogle);

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.mobile-nav-active')) {
        mobileNavToogle();
      }
    });

  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function(e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

  document.querySelectorAll('.faq-item h3, .faq-item .faq-toggle').forEach((faqItem) => {
    faqItem.addEventListener('click', () => {
      faqItem.parentNode.classList.toggle('faq-active');
    });
  });

// auto select destinations
const params = new URLSearchParams(window.location.search);
const destination = params.get("destination");

const destinationSelect = document.getElementById("destinationSelect");

if (destination && destinationSelect) {
    destinationSelect.value = destination;
}

// submit msg 
const bookingForm = document.getElementById("bookingForm");
if (bookingForm) {
    bookingForm.addEventListener("submit", function(e){
        e.preventDefault();
        const successMessage = document.getElementById("successMessage");
        successMessage.classList.remove("d-none");
        bookingForm.reset();
        setTimeout(() => {
            successMessage.classList.add("d-none");
        },4000);
    });
}

const currentPage = window.location.pathname.split("/").pop() || "index.html";

// Remove previous active class
document.querySelectorAll("#navmenu a").forEach(link => {
    link.classList.remove("active");
});

// home 
if (currentPage === "index.html" || currentPage === "") {
    const sections = document.querySelectorAll("section[id]");
    function activeSection() {
        let scrollPos = window.scrollY + 150;
        sections.forEach(section => {
            const top = section.offsetTop;
            const height = section.offsetHeight;
            const id = section.getAttribute("id");
            if (scrollPos >= top && scrollPos < top + height) {
                document.querySelectorAll("#navmenu a").forEach(link => {
                    link.classList.remove("active");
                    if (link.getAttribute("href") === "#" + id) {
                        link.classList.add("active");
                    }
                });
            }
        });
    }
    window.addEventListener("scroll", activeSection);
    activeSection();
}

const pageMap = {
    "about.html": "index.html#about",
    "tours.html": "index.html#services",
    "pricing.html": "index.html#pricing",
    "contact.html": "contact.html",
    "booking.html": "booking.html"
};
if (pageMap[currentPage]) {
    document.querySelectorAll("#navmenu a").forEach(link => {
        if (link.getAttribute("href") === pageMap[currentPage]) {
            link.classList.add("active");
        }
    });
}

// past date disable
const dateInput = document.querySelector('input[type="date"]');
if(dateInput){
    dateInput.min = new Date().toISOString().split("T")[0];
}