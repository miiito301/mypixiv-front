<template>
  <div>
    <h3>検索フォーム</h3>
    <select v-model="type">
      <option value="illustration">イラスト</option>
      <option value="novel">小説</option>
    </select>
    <input v-model="tagInput" placeholder="タグを追加" @keyup.enter="addTag" />
    <button @click="addTag">タグ追加</button>

    <div>
      <span v-for="(tag, index) in tags" :key="index">{{ tag }}</span>
    </div>

    <button @click="searchWorks">検索</button>

    <ul>
      <li v-for="(work, index) in results" :key="index">
        <a :href="work.type === 'novel'
            ? `https://www.pixiv.net/novel/show.php?id=${work.pixiv_id}`
            : `https://www.pixiv.net/artworks/${work.pixiv_id}`"
           target="_blank">
          {{ work.title }} ({{ work.type }})
        </a>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref } from "vue";

const type = ref("illustration");
const tagInput = ref("");
const tags = ref([]);
const results = ref([]);

const addTag = () => {
  if (tagInput.value && !tags.value.includes(tagInput.value)) {
    tags.value.push(tagInput.value);
    tagInput.value = "";
  }
};

const searchWorks = async () => {
  const response = await fetch(`${VITE_API_URL}/api/search`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      type: type.value,
      tags: tags.value,
    }),
  });

  results.value = await response.json();
};
</script>
