import { HomePage } from './pages/HomePage';
import { Workspace } from './pages/Workspace';
import { LoginSignup } from './pages/LoginSignup';
import { BoardApp } from './pages/BoardApp';
import { Dashboard } from './pages/Dashboard';

export const routes = [
  {
    path: '/board/:boardId/:groupIdId?/:taskId?',
    component: BoardApp,
  },
  {
    path: '/login',
    component: LoginSignup,
  },
  {
    path: '/signup',
    component: LoginSignup,
  },
  {
    path: '/workspace',
    component: Workspace,
  },
  {
    path: '/dashboard/:boardId',
    component: Dashboard,
  },
  {
    path: '/',
    component: HomePage,
  },
];
