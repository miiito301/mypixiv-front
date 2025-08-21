<template>
  <div>
    <h3>作品登録フォーム</h3>
    <form @submit.prevent="saveWork">
      <input v-model="pixivId" placeholder="Pixiv作品ID" />
      <input v-model="title" placeholder="自分用タイトル" />
      <select v-model="type">
        <option value="illustration">イラスト</option>
        <option value="novel">小説</option>
      </select>
      <input v-model="tagInput" placeholder="タグを追加" @keyup.enter="addTag" />
      <button type="button" @click="addTag">タグ追加</button>

      <div>
        <span v-for="(tag, index) in tags" :key="index">{{ tag }}</span>
      </div>

      <button type="submit">保存</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from "vue";

const pixivId = ref("");
const title = ref("");
const type = ref("illustration");
const tagInput = ref("");
const tags = ref([]);

const addTag = () => {
  if (tagInput.value && !tags.value.includes(tagInput.value)) {
    tags.value.push(tagInput.value);
    tagInput.value = "";
  }
};

const saveWork = async () => {
  await fetch("http://localhost:3000/api/works", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      userId: 1, // 仮のユーザーID
      pixivId: pixivId.value,
      title: title.value,
      type: type.value,
      tags: tags.value,
    }),
  });

  alert("保存しました！");
  pixivId.value = "";
  title.value = "";
  type.value = "illustration";
  tags.value = [];
};
</script>
