import { LoginPage } from "../container/login";
import { RegisterPage } from "../container/register";
import { CoursePage } from "../container/course";

export const routerConfig = [
  {
    path: "/login",
    component: LoginPage,
    requireAuth: false,
  },
  {
    path: "/register",
    component: RegisterPage,
    requireAuth: false,
  },
  {
    path: "/",
    component: CoursePage,
    requireAuth: true,
  },
];
