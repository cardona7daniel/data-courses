import { LoginPage } from "../container/login";
import { RegisterPage } from "../container/register";
import { CoursePage } from "../container/course";
import { TeacherPage } from '../container/teacher';
import { ContentPage } from '../container/content';

export const routerConfig = [
  {
    path: "/login",
    component: LoginPage,
    requireAuth: false,
    exact: false,
  },
  {
    path: "/register",
    component: RegisterPage,
    requireAuth: false,
    exact: false
  },
  {
    path: "/course",
    component: CoursePage,
    requireAuth: true,
    exact: false
  },
  {
    path: "/content",
    component: ContentPage,
    requireAuth: true,
    exact: false
  },
  {
    path: "/",
    component: TeacherPage,
    requireAuth: true,
    exact: true
  },
];
