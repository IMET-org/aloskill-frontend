import { getItem, setItem, removeItem, getStorage } from "./storage";
import { storageKeys } from "./keys";
import type { CreateCourseData } from '../../app/dashboard/instructor/create-course/page';

export type CourseDraftStorage = Omit<CreateCourseData, "allCategory">;

export const courseDraftStorage = {
  get(courseId: string): CourseDraftStorage | null {
    return getItem<CourseDraftStorage>(storageKeys.courseDraft(courseId));
  },

  getAllCourses(): CourseDraftStorage[] {
    const storage = getStorage();
    if (!storage) return [];

    const courses: CourseDraftStorage[] = [];
    const prefix = storageKeys.courseDraft('');

    for (let i = 0; i < storage.length; i++) {
      const key = storage.key(i);
      if (key && key.startsWith(prefix)) {
        const course = getItem<CourseDraftStorage>(key);
        if (course) {
          courses.push(course);
        }
      }
    }

    return courses;
  },

  save(courseId: string, draft: CourseDraftStorage): void {
    setItem(storageKeys.courseDraft(courseId), draft);
  },

  clear(courseId: string) {
    removeItem(storageKeys.courseDraft(courseId));
  },
};
