

export interface CourseInstructor {
  name: string;
  avatar: string;
}

export interface Course {
  id: string | number;
  image: string;
  category: string;
  categoryColor: string; // Tailwind class
  rating: number;
  reviewCount: string;
  price: number;

  originalPrice?: number; // optional
  discount?: number; // optional

  title: string;
  lessons: number;
  duration: string; // e.g. "19h 30m"
  students: string; // e.g. "20+"
  level: string; // Beginner | Intermediate | Advanced
  language: string; // e.g. "English"
  certificate: boolean;

  instructor: CourseInstructor;
}
