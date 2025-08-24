<template>
  <div class="login-form">
    <h3>ログイン</h3>
    <form @submit.prevent="login">
      <div class="form-group">
        <label>ユーザー名</label>
        <input v-model="username" />
      </div>
      <div class="form-group">
        <label>パスワード</label>
        <input type="password" v-model="password" />
      </div>
      <div class="form-actions">
        <button type="submit">ログイン</button>
      </div>
    </form>

    <!-- サインアップ画面へ遷移 -->
    <p>
      アカウントをお持ちでない場合は
      <router-link to="/signup">こちらからサインアップ</router-link>
    </p>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const username = ref("");
const password = ref("");
const router = useRouter();

const login = async () => {
  try {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: username.value, password: password.value }),
    });

    if (!res.ok) throw new Error("ログイン失敗");
    const data = await res.json();
    localStorage.setItem("token", data.token);

    router.push("/form"); // ログイン成功後はフォームへ
  } catch (err) {
    alert(err.message);
  }
};
</script>