rm -fr src/gun-vue/*
cp -av /Users/xcliu/tests/gun-vue/composables/src src/gun-vue/composables
cp -av /Users/xcliu/tests/gun-vue/components/src src/gun-vue/components
# sed -ibak 's|import "virtual:windi.css"|// import "virtual:windi.css"|' src/gun/components/index.js
# rm -fv src/gun/components/index.jsback

cp -av /Users/xcliu/tests/gun-vue/demo/src/components/*  src/components/
rm -frv src/pages/*
cp -av /Users/xcliu/tests/gun-vue/demo/src/pages/*  src/pages/
# cp -av /Users/xcliu/tests/gun-vue/demo/public/*  public/
cp -v src/videos.vue src/pages

cp -av /Users/xcliu/tests/gun-vue/demo/src/main.js src/main.ts
# sed -iback 's|virtual:windi.css|./index.css|' src/main.ts
# rm -fv src/main.tsback
cp -av /Users/xcliu/tests/gun-vue/demo/src/app.vue src/App.vue
