rm -fr src/gun/*
cp -av /Users/xcliu/tests/gun-vue/composables/src src/gun/composables
cp -av /Users/xcliu/tests/gun-vue/components/src src/gun/components
sed -ibak 's|import "virtual:windi.css"|// import "virtual:windi.css"|' src/gun/components/index.js

cp -av /Users/xcliu/tests/gun-vue/demo/src/components/*  src/components/
rm -frv src/pages/*
cp -av /Users/xcliu/tests/gun-vue/demo/src/pages/*  src/pages/
cp -v src/videos.vue src/pages

cp -av /Users/xcliu/tests/gun-vue/demo/src/components/* src/components
cp -av /Users/xcliu/tests/gun-vue/demo/src/main.js src/main.ts
cp -av /Users/xcliu/tests/gun-vue/demo/src/app.vue src/App.vue
