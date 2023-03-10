<template>
    <Head>
        <Title>{{ title }}</Title>
        <Meta name="description" :content="title" />
    </Head>
    <div>
        <Navbar
            class="navbar"
            ref="progressbar"
            @moveToAboutme="moveToAboutme"
            @moveToSkills="moveToSkills"
            @moveToMyworks="moveToMyworks"
            @moveToContact="moveToContact"
        />
        <div class="background" />
        <div class="main">
            <SpaceBackground class="space" />
            <div class="wrapper">
                <p ref="mainText">
                    끝없이 배움을 추구하는 프론트엔드
                    <span
                        v-for="star in 4"
                        :key="star"
                        class="twinkle"
                        :ref="twinkle"
                        >★</span
                    >
                    <b @click="moveToAboutme">최성우</b>입니다
                </p>
            </div>
        </div>
        <div
            v-for="section in sections"
            :key="section.id"
            :class="section.title"
            :ref="sectionRef"
        >
            <component
                :is="section.component"
                :style="{ background: section.background }"
            />
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import SpaceBackground from '@/components/backgrounds/SpaceBackground.vue'
import Aboutme from '@/components/Aboutme.vue'
import Myworks from '@/components/Myworks.vue'
import Skills from '@/components/Skills.vue'
import Contact from '@/components/Contact.vue'
import gsap from 'gsap'
import { TypeSections } from './types/index.js'

const title: string = '최성우 프론트엔드 포트폴리오'
// eslint-disable-next-line no-undef
useHead({
  meta: [{
    name: '최성우 프론트엔드 포트폴리오' as string,
    content: '최성우 프론트엔드 포트폴리오' as string
  },
  {
    name: 'og:title',
    content: '최성우 프론트엔드 포트폴리오' as string
  },
  {
    name: 'og:image' as string,
    content: 'public/favicon.ico' as string
  },
  {
    name: 'og:author' as string,
    content: '최성우' as string
  },
  {
    name: 'google-site-verification' as string,
    content: 'QqW6OK_y3kl9fCz4UUOarTsHCwoyl_CYiZ23Eg9Osvc' as string
  }
  ]
})
const progressbar = ref<null>()
const mainText = ref<null>(null)
const array = ref<HTMLDivElement[]>([])
const twinkle: any = (el: HTMLDivElement) => array.value.push(el)
const sectionArray = ref<HTMLDivElement[]>([])
// pick 적용해서 필요한 요소만 넣어보기
const sectionRef: any = (el: HTMLDivElement) => sectionArray.value.push(el)
const sections: TypeSections = [
  {
    id: 0,
    title: 'aboutme',
    component: Aboutme
  },
  {
    id: 1,
    title: 'skills',
    component: Skills
  },
  {
    id: 2,
    title: 'myworks',
    component: Myworks
  },
  {
    id: 3,
    title: 'contact',
    component: Contact,
    background: '#212121'
  }
]

const moveToAboutme = (): void => {
  const aboutmeLocation = (sectionArray.value[0] as HTMLDivElement)!.offsetTop
  const menuHeight = (document.querySelector('.navbar') as HTMLDivElement)!.offsetHeight
  scrollTo({ top: aboutmeLocation - menuHeight, behavior: 'smooth' })
}
const moveToSkills = (): void => {
  const skillsLocation = (sectionArray.value[1] as HTMLDivElement)!.offsetTop
  const menuHeight = (document.querySelector('.navbar') as HTMLDivElement)!.offsetHeight
  scrollTo({ top: skillsLocation - menuHeight, behavior: 'smooth' })
}
const moveToMyworks = (): void => {
  const myworksLocation = (sectionArray.value[2] as HTMLDivElement)!.offsetTop
  const menuHeight = (document.querySelector('.navbar') as HTMLDivElement)!.offsetHeight
  scrollTo({ top: myworksLocation - menuHeight, behavior: 'smooth' })
}
const moveToContact = (): void => {
  const contactLocation = (sectionArray.value[3] as HTMLDivElement)!.offsetTop
  const menuHeight = (document.querySelector('.navbar') as HTMLDivElement)!.offsetHeight
  scrollTo({ top: contactLocation - menuHeight, behavior: 'smooth' })
}

const setRandomPosition = (): void => {
  for (let i = 0; i < 4; i++) {
    gsap.set(array.value[i], {
      xPercent: gsap.utils.random(0, 830),
      yPercent: gsap.utils.random(0, 250)
    })
  }
}
onMounted(() => {
  gsap.from(mainText.value, {
    opacity: 0,
    yPercent: -100,
    pointerEvents: 'none',
    duration: 1,
    ease: 'ease-out',
    delay: 1
  })
  for (let i = 0; i < 4; i++) {
    gsap.to(array.value[i], {
      opacity: 0,
      scale: 3,
      duration: 0.5,
      onComplete () {
        gsap.delayedCall(gsap.utils.random(2, 5, 0.1), () => {
          setRandomPosition()
          this.restart()
        })
      }
    })
  }
})
</script>

<style lang="scss" scoped>
$titleColor: rgb(255, 255, 175);
$titleFont: "KOTRALEAP";
$titleFontSize: 1.8em;

.main {
    width: 100%;
    height: 100vh;
    .space {
        position: absolute;
        width: 100%;
        height: 100%;
    }
    .wrapper {
        position: relative;
        width: 100%;
        height: 100%;
        pointer-events: none;
        font-family: $titleFont;
        display: flex;
        flex-direction: column;
        justify-content: center;
        text-align: center;
        p {
            pointer-events: auto;
            margin: 0 4% 0 4%;
            font-size: $titleFontSize;
            font-weight: 400;
            color: white;
            word-break: keep-all;
            b {
                color: $titleColor;
                transform-origin: center center;
                cursor: pointer;
                transition: 0.5s;
                &:hover {
                    color: rgb(255, 200, 80);
                }
            }
            .twinkle {
                position: absolute;
                overflow: hidden;
                pointer-events: none;
                font-size: 0.3em;
            }
        }
    }
}
.skills,
.myworks {
    position: relative;
}
.contact {
    background: #212121;
}
@media screen and (max-width: 768px) {
    .main {
        .wrapper {
            p {
                font-size: 1.5em;
            }
        }
    }
}
@media screen and (max-width: 480px) {
    .main {
        pointer-events: none;
        .wrapper {
            p {
                font-size: 1.6em;
            }
        }
    }
}
</style>
