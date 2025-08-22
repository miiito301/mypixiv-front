<template>
  <div class="work-form">
    <h3>作品登録フォーム</h3>
    <form @submit.prevent="saveWork" @keydown.enter.prevent>
      <!-- Pixiv ID -->
      <div class="form-group">
        <label>Pixiv作品ID</label>
        <input v-model="pixivId" />
      </div>

      <!-- Title -->
      <div class="form-group">
        <label>自分用タイトル</label>
        <input v-model="title" />
      </div>

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
          <span
            v-for="(tag, index) in tags"
            :key="index"
            class="tag-item"
          >
            {{ tag }}
            <button type="button" class="remove-btn" @click="removeTag(index)">×</button>
          </span>
        </div>
      </div>

      <!-- Submit -->
      <div class="form-actions">
        <button type="submit">保存</button>
      </div>
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
  if (tagInput.value.trim() && !tags.value.includes(tagInput.value.trim())) {
    tags.value.push(tagInput.value.trim());
    tagInput.value = "";
  }
};

const removeTag = (index) => {
  tags.value.splice(index, 1);
};

const saveWork = async () => {
  if (tagInput.value.trim()) addTag(); // 入力中のタグも追加
  if (tags.value.length === 0) {
    alert("タグを1つ以上追加してください");
    return;
  }

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


