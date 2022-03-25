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
  // "./src/gun-vue/composables/user/usePass.js"
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
