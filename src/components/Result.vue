<template>
  <div class="result-container">
    <h3>登録済み作品一覧</h3>

    <ul class="work-list">
      <li v-for="work in works" :key="work.id" class="work-item">
        <!-- サムネイル表示（イラストのみ） -->
        <div class="thumbnail" v-if="work.type === 'illustration'">
          <img :src="`https://i.pximg.net/img-original/img/${work.pixiv_id}.jpg`" alt="イラスト" />
        </div>

        <div class="work-info">
          <a
            :href="work.type === 'novel'
              ? `https://www.pixiv.net/novel/show.php?id=${work.pixiv_id}`
              : `https://www.pixiv.net/artworks/${work.pixiv_id}`"
            target="_blank"
            class="work-title"
          >
            {{ work.title }} ({{ work.type }})
          </a>

          <div class="work-tags">
            <small>タグ: {{ work.tags.join('　') }}</small>
          </div>

          <button class="delete-btn" @click="deleteWork(work.id)">削除</button>
        </div>
      </li>
    </ul>

    <div v-if="works.length === 0" class="no-works">
      登録済み作品はありません。
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

const works = ref([]);

const fetchWorks = async () => {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/api/works`);
  works.value = await res.json();
};

onMounted(() => {
  fetchWorks();
});

// 削除処理
const deleteWork = async (id) => {
  if (!confirm("本当に削除しますか？")) return;

  await fetch(`${import.meta.env.VITE_API_URL}/api/works/${id}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userId: 1 }) // 仮のユーザーID
  });

  works.value = works.value.filter(work => work.id !== id);
};
</script>


