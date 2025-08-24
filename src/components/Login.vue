<template>
  <div class="auth-form">
    <h3>ログイン</h3>
    <form @submit.prevent="login">
      <div class="form-group">
        <label>ユーザー名</label>
        <input v-model="username" required />
      </div>
      <div class="form-group">
        <label>パスワード</label>
        <input type="password" v-model="password" required />
      </div>
      <button type="submit">ログイン</button>
    </form>
    <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const username = ref("");
const password = ref("");
const errorMessage = ref("");

const router = useRouter();

const login = async () => {
  errorMessage.value = "";
  try {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: username.value, password: password.value }),
    });
    if (!res.ok) {
      const data = await res.json();
      throw new Error(data.error || "ログイン失敗");
    }
    const data = await res.json();
    localStorage.setItem("token", data.token); // JWT を保存
    router.push("/form"); // ログイン後に Form ページへ
  } catch (err) {
    errorMessage.value = err.message;
  }
};
</script>