<template>
  <div>
    <h3>登録済み作品一覧</h3>
    <ul>
      <li v-for="work in works" :key="work.id">
        <a :href="work.type === 'novel'
            ? `https://www.pixiv.net/novel/show.php?id=${work.pixiv_id}`
            : `https://www.pixiv.net/artworks/${work.pixiv_id}`"
           target="_blank">
          {{ work.title }} ({{ work.type }})
        </a>
        <small>タグ: {{ work.tags.join(' ') }}</small>
        <button @click="deleteWork(work.id)">削除</button>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

const works = ref([]);

const fetchWorks = async () => {
  const res = await fetch("http://localhost:3000/api/works");
  works.value = await res.json();
};

onMounted(() => {
  fetchWorks();
});

// 削除処理
const deleteWork = async (id) => {
  if (!confirm("本当に削除しますか？")) return;

  await fetch(`http://localhost:3000/api/works/${id}`, {
    method: "DELETE",
  });

  // ローカルのworksを更新
  works.value = works.value.filter(work => work.id !== id);
};
</script>

