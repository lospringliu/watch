const fsp = require("fs/promises")
const fs = require("fs")
const AsyncForEach = require("async-await-foreach")
const chalk = require("chalk")
const { htmlTags } = require("vite-plugin-windicss")

const customize = {
  "./src/gun-vue/composables/user/usePass.js": { replaces: [
    [`if \\(pass.show `, `if (pass?.show `], // less strict
    [` "#\\/auth\\/" `, ` auth_url `], // history mode
    [`indexOf\\("#\\/auth\\/"`, `indexOf(auth_url`], // history mode
    [`link.substr\\(index \\+ 7\\)`,`link.substr(index + auth_url.length)`], // paramize
    [`function genLink\\(text = ""\\)`,`function genLink(text = "", auth_url="#/auth/")`], // params
    [`function parseLink\\(link\\)`,`function parseLink(link, auth_url="#/auth/")`], // params
  ]},
  "./src/gun-vue/components/space/Plane.vue": { replaces: [
    [`svg.max-h-78vh.w-98vw`, `svg.h-96vh.w-98vw`]
  ]},
  "./src/gun-vue/components/chat/Input.vue": { replaces: [
    [`textarea.p-2.rounded-xl.bg-light-200`, `textarea.px-2.rounded-xl.bg-light-200`],
    [`p-4.flex.flex-col.items-center`, `p-2.flex.flex-col.items-center`],
  ]},
  "./src/gun-vue/components/chat/Messages.vue": { replaces: [
    [`flex.flex-col.bg-opacity-80.p-4.gap-2`, `flex.flex-col.bg-opacity-80.p-2.gap-1`],
  ]},
  "./src/gun-vue/components/chat/Room.vue": { replaces: [
    [`backdrop-blur-xl.shadow-md.mx-auto.w-full`, `backdrop-blur-xl.shadow-md.mx-auto.w-full.h-full`],
    [`flex.relative.items-stretch.max-h-78vh`, `flex.relative.items-stretch.h-full`],
    [`import { useChat, useUser, useBackground, currentRoom }`, `import { useChat, useUser, useBackground, currentRoom, rootRoom }`],
    [`cursor-pointer.self-center.text-2xl.p-2\\(@click`, `cursor-pointer.self-center.text-2xl.p-2(v-if="currentRoom.pub !== rootRoom.pub || user.wallets.jingtum?.activated" @click`]
  ]},
  "./src/gun-vue/components/post/List.vue": { replaces: [
    [`\\(title="Upload feed"`, `(v-if="1 > 2" title="Upload feed"`],
    [`v-if="countPosts > 0"`, `v-if="countPosts < -1"`],
    [`{{ tag }}`, "{{ t(`tags.${tag}`) }}"]
  ]},
  "./src/gun-vue/components/post/Page.vue": { replaces: [
    [`button.button.flex.items-center\\(@click`, `button.button.flex.items-center(v-if="false" @click`],
  ]},
  "./src/gun-vue/components/user/Avatar.vue": { replaces: [
    // [`form-picture.absolute\\(\n    :options`, `form-picture.absolute(\n    v-if="false"\n    :options`],
    [`form-picture.absolute\\(`, `form-picture.absolute(\n    v-if="user.wallets.jingtum?.activated"`],
  ]},
  "./src/gun-vue/components/room/Page.vue": { replaces: [
    [`pt-32.px-2`, `pt-12.px-2`],
  ]},
  "./src/gun-vue/components/user/auth.vue": { replaces: [
    [`  console.log\\(p\\)`, `// console.log(p)`],
  ]},
  "./src/gun-vue/composables/user/useAccount.js": { replaces: [
    [`db: gun.user`, `wallets: {jingtum: {chain: "jingtum"}, moac: {chain: "moac"}, ethereum: {chain: "ethereum"}},\n      db: gun.user`],
    [`return obj;`, `gun.user(pub.value)\n      .get("wallets")\n      .get("defaults")\n      .map()\n      .on((d, k) => {\n        delete d._\n        delete d["#"]\n        delete d[">"]\n        obj.wallets[k] = d;\n      });\n    return obj;`]
  ]},
  "./src/gun-vue/composables/user/useUser.js": { replaces: [
    [`gun.user\\(\\).leave\\(\\);`, `user.wallets = {jingtum: {chain: "jingtum"}, moac: {chain: "moac"}, ethereum: {chain: "ethereum"}};\n  gun.user().leave();`],
    [`pair\\(\\) {`, `wallets: {jingtum: {chain: "jingtum"}, moac: {chain: "moac"}, ethereum: {chain: "ethereum"}},\n  pair() {`],
    [`user.pulser = setInterval`, `gun.user()\n    .get("wallets")\n    .get("defaults")\n    .map()\n    .on((d, k) => {\n      if (d) {\n        delete d._\n        delete d["#"]\n        delete d[">"]\n        user.wallets[k] = d;\n      }\n    });\n  user.pulser = setInterval`]
  ]},
  "./src/pages/space.vue": { replaces: [
    [`:key="currentRoom.pub" @enter=`, `:key="currentRoom.pub" :pad="20" @enter=`],
  ]},
  "./src/gun-vue/components/user/home.vue": { i18n: true, replaces: [
    [`chat-private-list\\(@chat`, `chat-private-list(:title="t('customize.chat_title')" @chat`],
  ]},
  "./src/pages/chats.vue": { i18n: true, replaces: [
    [`chat-private-list\\(@chat`, `chat-private-list(:title="t('customize.chat_title')" @chat`],
  ]},
  "./src/pages/my/chat/index.vue": { i18n: true, replaces: [
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
