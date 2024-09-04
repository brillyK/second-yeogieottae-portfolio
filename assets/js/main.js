document.addEventListener('DOMContentLoaded', function () {
    var swiper = new Swiper('.slide-intro', {
        // spaceBetween: 30,
        centeredSlides: true,
        loop: true,
        autoplay: {
            delay: 3000,
            disableOnInteraction: false,
        },
        pagination: {
            el: '.swiper-pagination',
            type: 'fraction',
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
    })

    var isPaused = false
    var pauseButton = document.createElement('button')
    pauseButton.className = 'swiper-button-pause'
    pauseButton.textContent = 'Pause'
    document.querySelector('.slide-intro').appendChild(pauseButton)

    pauseButton.addEventListener('click', function () {
        if (isPaused) {
            swiper.autoplay.start()
            pauseButton.textContent = 'Pause'
        } else {
            swiper.autoplay.stop()
            pauseButton.textContent = 'Play'
        }
        isPaused = !isPaused
    })

    var swiper = new Swiper('.slide-eft .swiper', {
        slidesPerView: 1,
        spaceBetween: 20,
        loop: true,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        breakpoints: {
            768: {
                slidesPerView: 2,
                spaceBetween: 30,
            },
            1280: {
                slidesPerView: 4,
                spaceBetween: 24,
            },
        },
    })
})

//sec-type1
document.addEventListener('DOMContentLoaded', () => {
    const counters = document.querySelectorAll('.content')
    const speed = 200 // 애니메이션 속도 조정 (높을수록 느려짐)

    const updateCount = (counter) => {
        const target = +counter.getAttribute('data-target')
        const count = +counter.innerText

        const increment = target / speed

        if (count < target) {
            counter.innerText = Math.ceil(count + increment)
            setTimeout(() => updateCount(counter), 1)
        } else {
            counter.innerText = target
        }
    }

    const resetCounters = () => {
        counters.forEach((counter) => {
            counter.innerText = '0'
        })
    }

    const animateCounters = () => {
        counters.forEach((counter) => {
            updateCount(counter)
        })
    }

    const secEft = document.querySelector('#sec-eft')
    const observerOptions = {
        root: null,
        threshold: 0.5,
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                resetCounters()
                animateCounters()
            }
        })
    }, observerOptions)

    observer.observe(secEft)
})

//sec-type2 비행기 사라지는 애니메이션

document.addEventListener('DOMContentLoaded', function () {
    gsap.registerPlugin(ScrollTrigger)

    // 비행기 이미지 선택
    const airplane = '.obj-airplane img'

    // 비행기 이미지가 sec1에서 아래부터 보이고, 이후 sec3부터 sec6까지 보이게 하며, sec6에서 사라지도록 설정
    gsap.timeline({
        scrollTrigger: {
            trigger: '.sec1',
            start: 'top top',
            endTrigger: '.sec6',
            end: 'top center',
            scrub: true,
            // markers: true, // 디버깅용으로 사용할 수 있습니다.
        },
    })
        .fromTo(
            airplane,
            {
                opacity: 0,
                y: 0,
            },
            {
                opacity: 1,
                y: 0,
                duration: 1,
                scrollTrigger: {
                    trigger: '.sec1',
                    start: 'top center', // 비행기 이미지가 좀 더 아래에서 보이게 설정
                    end: 'bottom top',
                    scrub: true,
                },
            },
        )
        .to(airplane, {
            opacity: 1,
            y: 0,
            duration: 1,
            scrollTrigger: {
                trigger: '.sec2',
                start: 'top top',
                end: 'bottom top',
                scrub: true,
            },
        })
        .to(airplane, {
            opacity: 1,
            y: 0,
            duration: 1,
            scrollTrigger: {
                trigger: '.sec3',
                start: 'top top',
                end: 'bottom top',
                scrub: true,
            },
        })
        .to(airplane, {
            opacity: 1,
            y: 0,
            duration: 1,
            scrollTrigger: {
                trigger: '.sec4',
                start: 'top top',
                end: 'bottom top',
                scrub: true,
            },
        })
        .to(airplane, {
            opacity: 1,
            y: 0,
            duration: 1,
            scrollTrigger: {
                trigger: '.sec5',
                start: 'top top',
                end: 'bottom top',
                scrub: true,
            },
        })
        .to(airplane, {
            opacity: 0,
            y: 0,
            duration: 1,
            scrollTrigger: {
                trigger: '.sec6',
                start: 'top center',
                end: 'bottom top',
                scrub: true,
            },
        })

    // GSAP 기본 설정
    gsap.defaults({ ease: 'power2.inOut' })

    // 페이지 로드 후 실행
    $(document).ready(function () {
        // 비행기 이미지와 각 데이터 아이템에 대한 TweenMax 애니메이션 설정
        gsap.to(airplane, {
            opacity: 1,
            duration: 1,
            scrollTrigger: {
                trigger: '.sec1', // 트리거가 되는 요소
                start: 'top center', // 비행기 이미지가 좀 더 아래에서 보이게 설정
                end: 'bottom center', // 종료 지점
                scrub: true, // 스크롤에 따라 부드럽게 움직임
            },
        })

        // 각 데이터 아이템에 대한 스케일 애니메이션 설정
        gsap.utils.toArray('.data-item').forEach(function (item) {
            gsap.to(item, {
                scale: 1.9,
                duration: 1,
                opacity: 1,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: item,
                    start: 'top 70%',
                    end: 'top 20%',
                    scrub: true,
                    overwrite: 'auto',
                },
                clearProps: 'all',
            })
        })
    })
})

document.addEventListener('DOMContentLoaded', function () {
    $(window).on('scroll', function () {
        var scrollPos = $(window).scrollTop()

        $('.framer').each(function () {
            var $framer = $(this)
            var offsetTop = $framer.offset().top
            var topBoundary = offsetTop - $(window).height() + 200
            var bottomBoundary = offsetTop + $framer.height() - 200

            // 첫 번째 및 마지막 li 요소를 선택
            var $firstLi = $framer.find('li:first')
            var $lastLi = $framer.find('li:last')

            if (scrollPos >= topBoundary && scrollPos <= bottomBoundary) {
                // 첫 번째 li 요소에 move-up 클래스 적용
                $firstLi.addClass('move-up').removeClass('move-down')

                // 마지막 li 요소에 move-down 클래스 적용
                $lastLi.addClass('move-down').removeClass('move-up')
            } else {
                // 요소가 화면에 없을 때는 클래스를 제거합니다.
                $firstLi.removeClass('move-up move-down')
                $lastLi.removeClass('move-up move-down')
            }
        })
    })
})
