<template>
    <nav ref="navbar">
        <div class="menu">
            <p class="symbol" @click="moveToTop">SUNGWOO</p>
            <div class="items" ref="items">
                <p
                    v-for="item in navbarItems"
                    :key="item.id"
                    @click="item.moveToSection"
                    class="navItem"
                    :data-title="item.title"
                >
                    {{ item.title }}
                </p>
            </div>
        </div>
        <svg
            class="toggle"
            @click="toggle(), (toggledata = !toggledata)"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 30 30"
        >
            <path class="toggle1" fill="#746a55" d="M0 22.8h30V30H0z" />
            <path class="toggle2" fill="#746a55" d="M0 11.4h30v7.2H0z" />
            <path class="toggle3" fill="#746a55" d="M0 0h30v7.2H0z" />
        </svg>
        <div class="progress" ref="progressbar" />
    </nav>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { TypeNavbar } from '../types/index.js'
gsap.registerPlugin(ScrollTrigger)

const emit = defineEmits([
  'moveToAboutme',
  'moveToSkills',
  'moveToMyworks',
  'moveToContact'
])

const navbar = ref<null>(null)

// 각 섹션으로 스크롤 이동 함수
const moveToTop = (): void => {
  scrollTo({ top: 0, behavior: 'smooth' })
}
const navbarItems: TypeNavbar = [
  {
    id: 0,
    title: 'About Me',
    moveToSection: () => {
      emit('moveToAboutme')
    }
  },
  {
    id: 1,
    title: 'Skills',
    moveToSection: () => {
      emit('moveToSkills')
    }
  },
  {
    id: 2,
    title: 'Myworks',
    moveToSection: () => {
      emit('moveToMyworks')
    }
  },
  {
    id: 3,
    title: 'Contact',
    moveToSection: () => {
      emit('moveToContact')
    }
  }
]

const toggledata = ref<boolean>(false)
const items = ref<HTMLDivElement>()
const toggleOn: gsap.core.Timeline = gsap.timeline()
const toggleOff: gsap.core.Timeline = gsap.timeline()
const toggle = (): void => {
  if (toggledata.value === false) {
    toggleOn.to('.toggle1', {
      yPercent: -158,
      ease: 'none',
      duration: 0.1
    })
    toggleOn.to(
      '.toggle3',
      {
        yPercent: 158,
        ease: 'none',
        duration: 0.1
      },
      '<'
    )
    toggleOn.to(
      '.toggle2',
      {
        opacity: 0,
        ease: 'none',
        duration: 0.1
      },
      '<'
    )
    toggleOn.to(
      '.toggle3',
      {
        rotate: -45,
        transformOrigin: 'center center',
        ease: 'none',
        duration: 0.1
      },
      '>'
    )
    toggleOn.to(
      '.toggle1',
      {
        rotate: 45,
        transformOrigin: 'center center',
        ease: 'none',
        duration: 0.1
      },
      '<'
    )
        items.value!.style.opacity = '1'
        items.value!.style.pointerEvents = 'auto'
  } else if (toggledata.value === true) {
    toggleOff.to('.toggle1, .toggle3', {
      rotate: 0,
      transformOrigin: 'center center',
      ease: 'none',
      duration: 0.1
    })
    toggleOff.to(
      '.toggle2',
      {
        opacity: 1,
        ease: 'none',
        duration: 0.1
      },
      '>'
    )
    toggleOff.to(
      '.toggle3, .toggle1',
      {
        yPercent: 0,
        ease: 'none',
        duration: 0.1
      },
      '<'
    )
        items.value!.style.opacity = '0'
        items.value!.style.pointerEvents = 'none'
  }
}

const progressbar = ref<HTMLDivElement>()
const scrolled = ref<number>(0)
onMounted(() => {
  // progressbar
  function changeProgressbar (): void {
    const height: number =
            document.documentElement.scrollHeight -
            document.documentElement.clientHeight
    const scrollTop: number =
            document.body.scrollTop || document.documentElement.scrollTop
    scrolled.value = (scrollTop / height) * 100
    if (progressbar.value instanceof HTMLDivElement) {
      progressbar.value.style.width = `${scrolled.value}%`
    }
  }
  addEventListener('scroll', changeProgressbar)

  // 내리면 navBar 색이 변하는 애니메이션
  const navBarColor: gsap.core.Tween = gsap
    .from(navbar.value, {
      background: '#ffffff',
      duration: 0.2,
      ease: 'none'
    })
    .progress(1)
  navBarColor.pause()
  const menuColor: gsap.core.Tween = gsap
    .to('.navItem, .symbol', {
      color: '#ffffff',
      duration: 0.1,
      ease: 'none'
    })
    .progress(1)
  menuColor.pause()
  const toggleColor: gsap.core.Tween = gsap
    .to('.toggle1, .toggle2, .toggle3', {
      fill: '#ffffff',
      duration: 0.1,
      ease: 'none'
    })
    .progress(1)
  toggleColor.pause()
  ScrollTrigger.create({
    trigger: '.aboutme',
    start: '-101px',
    end: '-101px',
    onUpdate: (self) => {
      // eslint-disable-next-line no-unused-expressions
      self.direction === -1
        ? (navBarColor.play(), menuColor.play(), toggleColor.play())
        : (navBarColor.reverse(),
          menuColor.reverse(),
          toggleColor.reverse())
    }
  })
})
</script>

<style lang="scss" scoped>
@import "../style/Mainstyle.scss";

nav {
    position: fixed;
    width: 100%;
    height: 100px;
    top: 0;
    left: 0;
    z-index: 3;
    opacity: 0.9;
    line-height: 100px;
    .menu {
        position: relative;
        transform: translate(-50%);
        left: 50%;
        display: flex;
        justify-content: space-between;
        width: 80%;
        text-align: center;
        letter-spacing: 4px;
        p {
            color: rgb(116, 106, 85);
            cursor: pointer;
            margin: 0;
        }
        .symbol {
            font-size: 1.6em;
        }
        .items {
            pointer-events: auto;
            opacity: 1;
            display: flex;
            transition: 0.3s;
            p {
                margin-left: 24px;
                transition: 0.4s;
            }
        }
    }
    .toggle {
        display: none;
        cursor: pointer;
        height: 30px;
        position: absolute;
        top: 10px;
        right: 4%;
    }
    .progress {
        position: absolute;
        top: 100px;
        width: 0%;
        height: 6px;
        mix-blend-mode: difference;
        will-change: transform;
        background: rgb(35, 35, 35);
        box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.9) inset;
    }
}
@media screen and (min-width: 800px) {
    .items {
        opacity: 1 !important;
        pointer-events: auto !important;
        p {
            &:before {
                position: absolute;
                content: attr(data-title);
                background: rgb(100, 100, 100);
                clip-path: inset(0 100% 0 0);
                height: 3px;
                top: 67px;
                z-index: -1;
                opacity: 1;
                transition: 0.4s;
            }
            &:hover:before {
                clip-path: inset(0 0 0 0);
            }
        }
    }
}
@media screen and (max-width: 800px) {
    nav {
        height: 70px;
        line-height: 70px;
        color: rgb(116, 106, 85);
        .menu {
            width: 100%;
            .symbol {
                position: relative;
                height: 70px;
                transform: translate(-50%);
                left: 50%;
                font-size: 1.6em;
            }
            .items {
                position: absolute;
                width: 90%;
                height: 600px;
                transform: translate(-50%);
                left: 50%;
                display: block;
                clip-path: circle(50% at 50% 0);
                pointer-events: none;
                opacity: 0;
                background: white;
                margin: 70px 0 0 0;
                p {
                    color: rgb(116, 106, 85) !important;
                    line-height: 30px;
                    padding: 15px;
                    margin: 0;
                }
            }
        }
        .toggle {
            margin-top: 8px;
            display: block;
        }
    }
    .progress {
        top: 70px !important;
    }
}
@media screen and (max-width: 480px) {
    .items {
        width: 70% !important;
        padding: 5px;
    }
}
</style>
