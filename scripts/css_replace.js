const fsp = require("fs/promises")
const fs = require("fs")
const AsyncForEach = require("async-await-foreach")
const chalk = require("chalk")

const REPLACES = [
  ["md_", "md:"],
  ["sm_", "sm:"],
  ["lg_", "lg:"],
  ["xl_", "xl:"],
  ["dark_", "dark:"],
  ["hover_", "hover:"],
  ["disabled_", "disabled:"]
]

Promise.resolve().then(async () => {
  await read_dir("./src")
})

async function read_dir(path, level=0) {
  const contents = await fsp.readdir(path, {withFileTypes: true})
  level += 1
  contents.forEach(content => {
    if (content.isFile()) {
      content.type = 1
    } else if (content.isDirectory()) {
      content.type = 2
    } else {
      content.type = 3
    }
  })
  await AsyncForEach(contents.sort((x,y) => y.type - x.type), async (content) => {
    if (content.isFile()) {
      log(level, `${content.name}`)
      await replace_file(`${path}/${content.name}`, level)
    } else if (content.isDirectory()) {
      log(level, `${content.name}`, "blue")
      await read_dir(`${path}/${content.name}`, level)
    } else {
      log(level, `${content.name}`, "red")
    }
  })
}

function log_level(message, level=1) {
  const a = []
  a[level] = ""
  return `${a.join("    ")}${message}`
}
function log(level, message="", color = "green") {
  console.log(chalk[color](log_level(message, level)))
}
async function replace_file(path, level=1, replaces=REPLACES) {
  if (!/\.vue$|\.ts$/.test(path)) {
    log(level, `${path} bypass`, "red")
  } else if (/vuegridlayout|useZip/.test(path)) {
    log(level, `${path} bypass`, "cyan")
  } else {
    let content = fs.readFileSync(path, "utf8").split("\n")
    await AsyncForEach(replaces, async (replacer) => {
      content = content.map(line => line.replace(new RegExp(replacer[1], "g"), replacer[0]))
    })
    fs.writeFileSync(path, content.join("\n"), "utf-8")
  }
}
