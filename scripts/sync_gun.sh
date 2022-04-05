rm -fr src/gun-vue/*
cp -av /Users/xcliu/tests/gun-vue/composables/src src/gun-vue/composables
git checkout src/gun-vue/composables/room/rootRoom.js
cp -av /Users/xcliu/tests/gun-vue/components/src src/gun-vue/components
# sed -ibak 's|import "virtual:windi.css"|// import "virtual:windi.css"|' src/gun/components/index.js
# rm -fv src/gun/components/index.jsback

cp -av /Users/xcliu/tests/gun-vue/app/src/components/*  src/components/
rm -frv src/pages/*
cp -av /Users/xcliu/tests/gun-vue/app/src/pages/*  src/pages/
# cp -av /Users/xcliu/tests/gun-vue/app/public/*  public/
cp -v src/videos.vue src/wallets.vue src/upload.vue src/pages

cp -av /Users/xcliu/tests/gun-vue/app/src/main.js src/main.ts
cp -av /Users/xcliu/tests/gun-vue/app/src/app.vue src/App.vue
# sed -iback 's|virtual:windi.css|./index.css|' src/main.ts
# rm -fv src/main.tsback
