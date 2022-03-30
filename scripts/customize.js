const fsp = require("fs/promises")
const fs = require("fs")
const AsyncForEach = require("async-await-foreach")
const chalk = require("chalk")

const customize = {
  "./src/gun-vue/composables/user/usePass.js": { replaces: [
    [`if \\(pass.show `, `if (pass?.show `], // less strict
    [`"#\\/auth\\/"`, `auth_url`], // history mode
    [`link.substr\\(index \\+ 7\\)`,`link.substr(index + auth_url.length)`], // paramize
    [`function genLink\\(text = ""\\)`,`function genLink(text = "", auth_url="#/auth/")`], // params
    [`function parseLink\\(link\\)`,`function parseLink(link, auth_url="#/auth/")`], // params
  ]},
  "./src/gun-vue/components/space/Plane.vue": { replaces: [
    [`text-2xl.p-8.top-15vh.cursor-pointer.absolute.rounded-3xl.shadow-xl.border-4`, `text-2xl.p-2.top-3vh.cursor-pointer.absolute.rounded-3xl.shadow-xl.border-2`],
    [`svg.h-80vh.w-98vw`, `svg.h-95vh.w-98vw`]
  ]},
  "./src/gun-vue/components/chat/Input.vue": { replaces: [
    [`textarea.p-2.rounded-xl.bg-light-200`, `textarea.px-2.rounded-xl.bg-light-200`],
    [`p-4.flex.flex-col.items-center`, `p-2.flex.flex-col.items-center`],
  ]},
  "./src/gun-vue/components/chat/Messages.vue": { replaces: [
    [`flex.flex-col.bg-opacity-80.p-4.gap-2`, `flex.flex-col.bg-opacity-80.p-2.gap-1`],
  ]},
  "./src/gun-vue/components/chat/Room.vue": { replaces: [
    [`flex.relative.h-78vh`, `flex.relative.min-h-88vh`],
  ]},
  "./src/gun-vue/components/post/List.vue": { replaces: [
    [`\\(title="Upload feed"`, `(v-if="1 > 2" title="Upload feed"`],
    [`v-if="countPosts > 0"`, `v-if="countPosts < -1"`],
  ]},
  "./src/gun-vue/components/post/Page.vue": { replaces: [
    [`button.button.flex.items-center\\(@click`, `button.button.flex.items-center(v-if="false" @click`],
  ]},
  "./src/gun-vue/components/user/Avatar.vue": { replaces: [
    [`form-picture.absolute\\(`, `form-picture.absolute(\n    v-if="false"`],
  ]},
  "./src/gun-vue/components/room/Page.vue": { replaces: [
    [`pt-42.pb-2.px-2`, `pt-12.pb-2.px-2`],
    [`flex.flex-wrap`, `flex.flex-wrap.justify-between`],
  ]},
  "./src/pages/chats.vue": { i18n: true, replaces: [
    [`chat-private-list\\(@chat`, `chat-private-list(:title="t('customize.chat_title')" @chat`],
  ]}
}

Promise.resolve().then(async () => {
  Object.keys(customize).forEach(file => {
    replace(file, customize[file])
  })
})

function log(message="", color = "green") {
  console.log(chalk[color](message))
}

function replace(file, config=[]) {
  log(`... processing ${file}`)
  let content = fs.readFileSync(file, "utf8").split("\n")
  config.replaces.forEach(replacer => {
    content = content.map(line => line.replace(new RegExp(replacer[0], "g"), replacer[1]))
  })
  if (config.i18n) {
    log(`... ... replace i18n ${file}`)
    const index = content.findIndex(line => line === `</script>`)
    if (index !== -1) { // has script section in sfc
      const exists = content.findIndex(line => /useI18n/.test(line))
      if (exists === -1) content.splice(index, 0, `const { t } = useI18n()`)
    } else {
      content.unshift(`</script>`)
      content.unshift(`const { t } = useI18n`)
      content.unshift(`<script setup>`)
    }
  }
  fs.writeFileSync(file, content.join("\n"), "utf8")
}

function i18n(file, i18n=false) {

}
