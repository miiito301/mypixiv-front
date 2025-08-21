import { createRouter, createWebHistory } from 'vue-router';
import Form from '../src/components/Form.vue';
import Search from '../src/components/Search.vue';

const routes = [
  { path: '/', redirect: '/form' }, 
  { path: '/form', component: Form },// /form にアクセスしたら Form.vue を表示
  { path: '/search', component: Search }
];

export default createRouter({
  history: createWebHistory(),
  routes
});