export default {
    mode: "universal",
    build: {
        ssr: true,
        transpile: ['swiper', 'gsap']
    },
    target: 'static',
    buildModules: ["@pinia/nuxt"],
    css: ["@/style/Mainstyle.scss"],
    head: {
        link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
    },
};
