import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '@/views/Layout'
const Search = () => import('@/views/search')
const Home = () => import('@/views/Home')
const Video = () => import('@/views/video')
const Question = () => import('@/views/question')
const My = () => import('@/views/my')
const Login = () => import('@/views/Login')
const Article = () => import('@/views/Article')
const UserInfo = () => import('@/views/UserInfo')

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Layout,
    redirect: '/home',
    children: [
      { path: 'home', component: Home },
      { path: 'video', component: Video },
      { path: 'question', component: Question },
      { path: 'my', component: My }
    ]
  },
  { path: '/login', component: Login },
  { path: '/search', component: Search },
  { path: '/article/:article_id', component: Article, name: 'article', props: true },
  { path: '/user', component: UserInfo }
]

const router = new VueRouter({
  routes
})

export default router
