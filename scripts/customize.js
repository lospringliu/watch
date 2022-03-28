const fsp = require("fs/promises")
const fs = require("fs")
const AsyncForEach = require("async-await-foreach")
const chalk = require("chalk")

const customize = {
  "./src/gun-vue/composables/user/usePass.js": [
    [`if \\(pass.show `, `if (pass?.show `], // less strict
    [`"#\\/auth\\/"`, `auth_url`], // history mode
    [`link.substr\\(index \\+ 7\\)`,`link.substr(index + auth_url.length)`], // paramize
    [`function genLink\\(text = ""\\)`,`function genLink(text = "", auth_url="#/auth/")`], // params
    [`function parseLink\\(link\\)`,`function parseLink(link, auth_url="#/auth/")`], // params
  ],
  "./src/gun-vue/components/space/Plane.vue": [
    [`text-2xl.p-8.top-15vh.cursor-pointer`, `text-2xl.p-2.top-3vh.cursor-pointer`],
    [`svg.h-80vh.w-98vw`, `svg.h-95vh.w-98vw`]
  ],
  "./src/gun-vue/components/chat/Input.vue": [
    [`textarea.p-2.rounded-xl.bg-light-200`, `textarea.px-2.rounded-xl.bg-light-200`],
    [`p-4.flex.flex-col.items-center`, `p-2.flex.flex-col.items-center`],
  ],
  "./src/gun-vue/components/chat/Messages.vue": [
    [`flex.flex-col.bg-opacity-80.p-4.gap-2`, `flex.flex-col.bg-opacity-80.p-2.gap-1`],
  ],
  "./src/gun-vue/components/chat/Room.vue": [
    [`flex.relative.h-78vh`, `flex.relative.min-h-88vh`],
  ]
}

Promise.resolve().then(async () => {
  Object.keys(customize).forEach(file => {
    replace(file, customize[file])
  })
})

function log(message="", color = "green") {
  console.log(chalk[color](message))
}

function replace(file, replaces=[]) {
    log(`... processing ${file}`)
    let content = fs.readFileSync(file, "utf8").split("\n")
    replaces.forEach(replacer => {
      content = content.map(line => line.replace(new RegExp(replacer[0], "g"), replacer[1]))
    })
    fs.writeFileSync(file, content.join("\n"), "utf-8")
}
