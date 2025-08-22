<template>
  <div class="search-form">
    <h3>作品検索フォーム</h3>
    <form @submit.prevent="searchWorks" @keydown.enter.prevent>
      <!-- Type -->
      <div class="form-group">
        <label>作品タイプ</label>
        <select v-model="type">
          <option value="illustration">イラスト</option>
          <option value="novel">小説</option>
        </select>
      </div>

      <!-- Tags -->
      <div class="form-group">
        <label>タグ</label>
        <div class="tag-input">
          <input
            v-model="tagInput"
            placeholder="タグを追加"
            @keyup.enter.prevent="addTag"
          />
          <button type="button" @click="addTag">追加</button>
        </div>
        <div class="tag-list">
          <span v-for="(tag, index) in tags" :key="index" class="tag-item">
            {{ tag }}
            <button type="button" class="remove-btn" @click="removeTag(index)">×</button>
          </span>
        </div>
      </div>

      <!-- Search button -->
      <div class="form-actions">
        <button type="submit">検索</button>
      </div>
    </form>

    <!-- Results -->
    <div class="results" v-if="results.length > 0">
      <h4>検索結果</h4>
      <ul class="work-list">
        <li v-for="(work, index) in results" :key="index" class="work-item">
          <a :href="work.type === 'novel'
              ? `https://www.pixiv.net/novel/show.php?id=${work.pixiv_id}`
              : `https://www.pixiv.net/artworks/${work.pixiv_id}`"
            target="_blank">
            {{ work.title }} ({{ work.type }})
          </a>

          <!-- タグ表示 -->
          <div class="work-tags" v-if="work.tags.length > 0">
            <small>タグ: {{ work.tags.join('　') }}</small>
          </div>

          <!-- 削除ボタン -->
          <button @click="deleteWork(work.id)">削除</button>
        </li>
      </ul>
    </div>

    <div v-else>
      <p>検索結果はありません</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const type = ref("illustration");
const tagInput = ref("");
const tags = ref([]);
const results = ref([]);

// 仮のユーザーID（ログイン機能実装時に変更）
const userId = 1;

const addTag = () => {
  const trimmed = tagInput.value.trim();
  if (trimmed && !tags.value.includes(trimmed)) {
    tags.value.push(trimmed);
    tagInput.value = "";
  }
};

const removeTag = (index) => {
  tags.value.splice(index, 1);
};

const searchWorks = async () => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/api/search`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      type: type.value,
      tags: tags.value,
      userId,
    }),
  });

  results.value = await response.json();
};

// 削除処理
const deleteWork = async (id) => {
  if (!confirm("本当に削除しますか？")) return;

  await fetch(`${import.meta.env.VITE_API_URL}/api/works/${id}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userId }),
  });

  // ローカルで結果を更新
  results.value = results.value.filter(work => work.id !== id);
};
</script>
