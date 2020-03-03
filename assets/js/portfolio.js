window.onload = function () {
    var scrollObservedElements = [
        {
            el: document.getElementById("header"),
            linkId: null
        },
        {
            el: document.getElementById("main1"),
            linkId: "main1"
        },
        {
            el: document.getElementById("main2"),
            linkId: "main2"
        },
        {
            el: document.getElementById("main3"),
            linkId: "main3"
        },
        {
            el: document.getElementById("main4"),
            linkId: "main4"
        },
        {
            el: document.getElementById("main5"),
            linkId: "main5"
        },
        {
            el: document.getElementById("main6"),
            linkId: "main6"
        }
    ];

    var mobileMenuButton = document.querySelector('#mobile-menu-button');
    var mobileMenuButtonIcon = document.querySelector('#mobile-menu-button span');
    var mobileMenu = document.querySelector('#mobile-menu');

    var refreshHeaderMenu = function () {
        var scrollPosition = window.scrollY;

        // switch logo-a u zavisnosti od pozadine header-a
        if (scrollPosition > 200) {
            document.getElementsByClassName("up")[0].classList.add("up-scrolled");
            document.getElementById("logo").src = "./assets/img/logoDark.png";
            mobileMenuButtonIcon.style.color = "#393939";
        } else {
            document.getElementsByClassName("up")[0].classList.remove("up-scrolled");
            document.getElementById("logo").src = "./assets/img/logo.png";
            mobileMenuButtonIcon.style.color = "white";
        }

        // skini sve active klase
        scrollObservedElements.forEach(function (s) {
            var links = document.querySelectorAll('a[href="#' + s.linkId + '"]');
            if (links && links.length && s.linkId) {
                links.forEach(function (l) {
                    l.classList.remove("active");
                });
            }
        });

        // nadji element koji je trenutno vidljiv u viewportu
        var height = 0;
        var currentViewportElement;
        for (var i = 0; i < scrollObservedElements.length; i++) {
            height += scrollObservedElements[i].el.clientHeight;
            if (height > scrollPosition) {
                currentViewportElement = scrollObservedElements[i];
                break;
            }
        }

        // stavi active klasu na trenutni link
        if (currentViewportElement) {
            var activeLinks = document.querySelectorAll('a[href="#' + currentViewportElement.linkId + '"]');
            if (activeLinks && activeLinks.length) {
                activeLinks.forEach(function (l) {
                    l.classList.add('active');
                });
            }
        }
    };

    // inicijalan refresh menija
    refreshHeaderMenu();

    // refresh menija na svaki skrol korisnika
    window.addEventListener("scroll", function (e) {
        refreshHeaderMenu();
    });

    // toggle class za mobile-menu
    var toggleMenu = function () {
        if (mobileMenu.classList.contains('active')) {
            setTimeout(function () {
                mobileMenu.classList.remove('active');
            }, 1100);
            mobileMenu.style['animation'] = 'left-out 1s linear forwards';
            mobileMenuButtonIcon.classList.add('fa-bars');
            mobileMenuButtonIcon.classList.remove('fa-times');
        } else {
            mobileMenu.classList.add('active');
            mobileMenu.style['animation'] = 'left-in 1s linear forwards';
            mobileMenuButtonIcon.classList.remove('fa-bars');
            mobileMenuButtonIcon.classList.add('fa-times');
        }
    }
    // toggle meni na click hamburgera
    mobileMenuButton.addEventListener('click', function (e) {
        toggleMenu();
    });

    // dohvati sve linkove u meniju i na svaki klik sakrij meni
    var mobileMenuItems = document.querySelectorAll('#mobile-menu ul li a');
    mobileMenuItems.forEach(function (i) {
        i.addEventListener('click', function (e) {
            toggleMenu();
        });
    });
};
