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
  const trimmed = tagInput.value.trim();
  if (trimmed && !tags.value.includes(trimmed)) {
    tags.value.push(trimmed);
    tagInput.value = "";
  }
};

const saveWork = async () => {
  // 入力中のタグが残っていれば自動追加
  if (tagInput.value.trim()) addTag();

  await fetch(`${import.meta.env.VITE_API_URL}/api/works`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      userId: 1, 
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
