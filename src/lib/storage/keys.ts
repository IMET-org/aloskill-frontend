const PREFIX = "lms";

export const storageKeys = {
  theme: `${PREFIX}:theme`,
  sidebarState: `${PREFIX}:sidebar`,
  courseDraft: (courseId: string) => `${PREFIX}:course:draft:${courseId}`,
  editorLayout: `${PREFIX}:editor:layout`,
} as const;
