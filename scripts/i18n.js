const fsp = require("fs/promises")
const fs = require("fs")
const AsyncForEach = require("async-await-foreach")
const chalk = require("chalk")
const yaml = require("js-yaml")

const files = [
  "src/gun/components/user/Icon.vue",
  "src/gun/components/user/Login.vue",
  "src/gun/components/user/Auth.vue",
  "src/gun/components/user/Create.vue",
  "src/gun/components/user/Credentials.vue",
  "src/gun/components/user/Pass.vue",
  "src/gun/components/user/Home.vue",
  "src/gun/components/user/Profile.vue",
  "src/gun/components/user/Rooms.vue",
  "src/gun/components/account/mate/List.vue",
  "src/gun/components/account/Reactions.vue",
  "src/gun/components/account/Stars.vue",
  "src/gun/components/chat/Input.vue",
  "src/gun/components/chat/Room.vue",
  "src/gun/components/room/Features.vue",
  "src/gun/components/room/Form.vue",
  "src/gun/components/room/Icon.vue",
  "src/gun/components/room/Page.vue",
  "src/gun/components/room/Profile.vue",
  "src/gun/components/space/Plane.vue",
  "src/gun/components/util/Share.vue",
  "src/gun/components/post/Form.vue",
  "src/gun/components/post/List.vue",
  "src/gun/components/post/Page.vue",
  "src/gun/components/post/feed/List.vue",
]
const REPLACES = { // key: [flag_context, flag_binding,  en, zh, pre_regex, pre_replace, post_regex, post_replace]
  cred_saved: [false, false, `I've stored my key securely`, "我已经安全保存好了"],
  features: [false, false, "Features", "特性", "", "", ":"],
  post_feed_search: [false, true, "Search for a feed", "搜索反馈", `placeholder="`],
  create_profile_field: [false, true, "New profile field", "新建属性", `placeholder="`],
  go_homepage: [false, false, "Go to my page", "去个人页面"],
  login_for_message: [false, false, "Log in to post messages", "登录后发送信息"],
  or: [false, false, "or", "或者", `generate"\\) `, `generate") `],
  share: [false, false, "Share", "分享", `p `],
  add: [false, false, "Add", "新增", `text-sm `],
  add2: [false, false, "Add", "新增", `mr-1 `],
  upload: [false, false, "Upload", "上传", `mr-1 `],
  download: [false, false, "Download", "下载", `mr-1 `],
  download2: [false, false, "Download", "下载", `ml-2 `],
  visibility: [false, false, "Show hidden", "可见", `ml-2 `],
  view: [false, false, "View", "查看", `ml-2 `],
  send: [false, false, "Send", "发送", `ml-2 `],
  enter: [false, false, "Enter", "进入", `ml-2 `],
  renew: [false, false, "Renew", "更新", `ml-2 `],
  leave: [false, false, "Leave", "离开", `ml-2 `],
  submit: [false, false, "Submit", "提交", `ml-2 `],
  reset: [false, false, "Reset", "重置", `\\) `, `) `],
  post_title: [false, true, "Title", "题目", `placeholder="`],
  post_title_add: [false, true, "Add a heading", "添加标题", `title="`],
  post_statement: [false, true, "Short text statement", "声明", `placeholder="`],
  chat_chats: [false, false, "Chats", "交谈", `p-2 `],
  chat_new: [false, true, "New chat", "新交谈", `placeholder="`],
  space_enter: [false, false, "Click here to join the space", "点触加入空间"],
  room_room: [false, false, "ROOM", "空间"],
  room_add: [false, false, "Add room", "添加空间", `\\) `, `) `],
  room_generate: [false, false, "Generate a new room", "生成新空间"],
  room_browse: [false, false, "Browse rooms", "浏览空间"],
  room_hosts: [false, false, "Hosts", "主人", "", "", ":"],
  room_tools: [false, false, "Tools", "工具", "", "", ":"],
  util_copy: [false, false, "Copy", "复制", `\\) `, `) `],
  util_copied: [false, false, "Copied", "已复制", `\\) `, `) `],
  reactions: [false, false, "Reactions", "回应"],
  my_rooms: [false, false, "My rooms", "我的空间"],
  save_keys: [false, false, "Please make sure to safely store your cryptographic keypair to be able to use it again later", "请确保安全存储你的密钥供以后使用"],
  already_account: [false, false, "I already have an account", "我已经有账号了"],
  login_saved_key: [false, false, "Login with a saved key", "用保存的密钥登录"],
  your_message: [false, true, "Your message", "你的信息", `placeholder="`],
  paste_keys: [false, true, "Paste your key pair here", "粘贴密钥", `placeholder="`],
  login_paste: [false, false, "Paste", "粘贴", "font-bold "],
  stars: [false, false, "Stars", "红星", `font-bold `],
  cred_keypair: [false, false, "Key Pair", "密钥对", "text-m "],
  cred_qr: [false, false, "QR", "二维码", "px-2 "],
  cred_share: [false, false, "Share", "分享", "px-1 "],
  cred_link: [false, false, "Link", "连接", "px-2 "],
  cred_text: [false, false, "Text", "文本", "px-2 "],
  cred_json: [false, false, "JSON", "文件", "px-2 "],
  login_qr: [false, false, "QR", "二维码", "font-bold "],
  login_json: [false, false, "JSON", "文件", "font-bold "],
  create_account: [false, false, "Create a new account", "创建新账号"],
  refresh_keys: [false, false, "Tap the circle to generate a new key", "点触图案更新密钥"],
  enter_alias: [false, true, "Enter your name or nickname", "输入姓名或者昵称", `placeholder="`],
  authenticate: [false, false, "Authenticate", "认证登录"],
  enter_enc_pass: [false, false, "Enter a passphrase to encrypt your key with", "输入加密密码"],
  enter_password: [false, true, "Enter the password", "输入密码", `placeholder="`],
  set_enc_pass: [false, false, "Set", "设置", "ml-2 "],
  show_enc_pass: [false, false, "Show", "显示", "ml-2 "],
  mates: [true, false, `"Mates"`, "好友", ": "],
  my_mates: [true, false, `'My mates'`, "我的好友", "","", " :"],
  encrypted: [true, false, `'Encrypted'`, "密文", "", "", " :"],
  plaintext: [true, false, `'Plain Text'`, "明文", ": "],
}

Promise.resolve().then(async () => {
  await update_locales()
  await replace_files()
})

async function update_locales() {
  const en_ori = yaml.load(fs.readFileSync(`./locales/en.yml`, "utf8"))
  const zh_ori = yaml.load(fs.readFileSync(`./locales/zh-CN.yml`, "utf8"))
  const en = JSON.parse(JSON.stringify(en_ori))
  const zh = JSON.parse(JSON.stringify(zh_ori))
  en.gunvue = {}
  zh.gunvue = {}
  Object.keys(REPLACES).forEach(k => {
    let v = REPLACES[k]
    en.gunvue[k] = v[2].replace(/'|"/g, "").replace(/Mates/,"Friends").replace(/mates/, "friends")
    zh.gunvue[k] = v[3]
  })
  if (JSON.stringify(en) !== JSON.stringify(en_ori)) {
    log(`... update en locale`)
    fs.writeFileSync(`./locales/en.yml`, yaml.dump(en, {lineWidth: 120}), "utf8")
  }
  if (JSON.stringify(zh) !== JSON.stringify(zh_ori)) {
    log(`... update zh locale`)
    fs.writeFileSync(`./locales/zh-CN.yml`, yaml.dump(zh, {lineWidth: 120}), "utf8")
  }
}

async function replace_files() {
  await AsyncForEach(files, async (file) => {
    log(`... replacing file ${file}`)
    try {
      await replace_file(file)
    } catch (e) {
      console.log(e)
    }
  })
}

function log(message="", color = "green") {
  console.log(chalk[color](message))
}

async function replace_file(path, replaces=REPLACES) {
  if (!/\.js$|\.vue$|\.ts$/.test(path)) {
    log(`.!. ${path} bypass`, "red")
  } else {
    let content_ori = fs.readFileSync(path, "utf8").split("\n")
    let content = JSON.parse(JSON.stringify(content_ori))
    await AsyncForEach(Object.keys(replaces), async (k) => {
      const v = replaces[k]
      const context = v[0]
      const binding = v[1]
      if (v.length === 4) { // exact 
        content = content.map(line => line.replace(new RegExp(v[2], "g"), `{{ t('gunvue.${k}') }}`))
      } else if (v.length === 5) { // pre
        if (binding) {
          content = content.map(line => line.replace(new RegExp(`${v[4]}${v[2]}`, "g"), `:${v[4]}t('gunvue.${k}')`))
        } else if (context){
          content = content.map(line => line.replace(new RegExp(`${v[4]}${v[2]}`, "g"), `${v[4]}t('gunvue.${k}')`))
        } else {
          content = content.map(line => line.replace(new RegExp(`${v[4]}${v[2]}`, "g"), `${v[4]}{{ t('gunvue.${k}') }}`))
        }
      } else if (v.length === 6) { // regexp and replacer
        const binding = v[0]
        if (binding) {
          content = content.map(line => line.replace(new RegExp(`${v[4]}${v[2]}`, "g"), `:${v[5]}t('gunvue.${k}')`))
        } else if (context){
          content = content.map(line => line.replace(new RegExp(`${v[4]}${v[2]}`, "g"), `${v[5]}t('gunvue.${k}')`))
        } else {
          content = content.map(line => line.replace(new RegExp(`${v[4]}${v[2]}`, "g"), `${v[5]}{{ t('gunvue.${k}') }}`))
        }
      } else { // post
        if (context) {
          content = content.map(line => line.replace(new RegExp(`${v[2]}${v[6]}`, "g"), `t('gunvue.${k}')${v[6]}`))
        } else {
          content = content.map(line => line.replace(new RegExp(`${v[2]}${v[6]}`, "g"), `{{ t('gunvue.${k}') }}${v[6]}`))
        }
      }
    })
    if (JSON.stringify(content_ori) !== JSON.stringify(content)) {
      log(`... ... replaced ${path}`)
      const index = content.findIndex(line => line === `</script>`)
      if (index !== -1) {
        content.splice(index, 0, `const { t } = useI18n()`)
      } else {
        content.unshift(`</script>`)
        content.unshift(`const { t } = useI18n`)
        content.unshift(`<script setup>`)
      }
      fs.writeFileSync(path, content.join("\n"), "utf-8")
    }
  }
}
