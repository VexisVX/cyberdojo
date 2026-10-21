import { createBrowserRouter } from "react-router-dom";
import { AppLayout } from "./AppLayout";
import { HomePage } from "../features/HomePage";
import { LessonListPage } from "../features/lesson/LessonListPage";
import { LessonPage } from "../features/lesson/LessonPage";
import { LinuxPage } from "../features/linux/LinuxPage";
import { CtfPage } from "../features/ctf/CtfPage";
import { ProgressPage } from "../features/progress/ProgressPage";
import { SettingsPage } from "../features/settings/SettingsPage";
import { ProgrammingPage } from "../features/programming/ProgrammingPage";
import { LangPage } from "../features/programming/LangPage";
import { ProgLessonPage } from "../features/programming/ProgLessonPage";
import { ErrorsPage } from "../features/programming/ErrorsPage";
import { ProjectsPage } from "../features/programming/ProjectsPage";
import { ProjectDetailPage } from "../features/programming/ProjectDetailPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "network", element: <LessonListPage /> },
      { path: "network/:slug", element: <LessonPage /> },
      { path: "linux", element: <LinuxPage /> },
      { path: "linux/lessons", element: <LessonListPage /> },
      { path: "linux/lessons/:slug", element: <LessonPage /> },
      { path: "pro", element: <LessonListPage /> },
      { path: "pro/:slug", element: <LessonPage /> },
      { path: "programming", element: <ProgrammingPage /> },
      { path: "programming/java", element: <LangPage /> },
      { path: "programming/java/errors", element: <ErrorsPage /> },
      { path: "programming/java/projects", element: <ProjectsPage /> },
      { path: "programming/java/projects/:slug", element: <ProjectDetailPage /> },
      { path: "programming/:lang", element: <LangPage /> },
      { path: "programming/:lang/:slug", element: <ProgLessonPage /> },
      { path: "ctf", element: <CtfPage /> },
      { path: "progress", element: <ProgressPage /> },
      { path: "settings", element: <SettingsPage /> },
    ],
  },
]);
