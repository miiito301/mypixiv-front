<template>
<!--App.vue-->
  <div>
    <nav>
      <router-link to="/form">作品登録</router-link> <!--router-link は「aタグのようにURLを切り替える専用タグ」-->
      <router-link to="/search">作品検索</router-link>
    </nav>
    <router-view /><!--router-view は「画面切り替えの表示場所」-->
  </div>
</template>

<script setup>

</script>
