cat > ~/cyberdojo/src/app/router.tsx <<'EOF'
import { createBrowserRouter } from "react-router-dom";
import { AppLayout } from "./AppLayout";
import { HomePage } from "../features/HomePage";
import { LessonListPage } from "../features/lesson/LessonListPage";
import { LessonPage } from "../features/lesson/LessonPage";
import { LinuxPage } from "../features/linux/LinuxPage";
import { CtfPage } from "../features/ctf/CtfPage";
import { ProgressPage } from "../features/progress/ProgressPage";
import { SettingsPage } from "../features/settings/SettingsPage";

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
      { path: "ctf", element: <CtfPage /> },
      { path: "progress", element: <ProgressPage /> },
      { path: "settings", element: <SettingsPage /> },
    ],
  },
]);
EOF
echo "✅ Router updated"
