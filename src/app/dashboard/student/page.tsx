// app/dashboard/student/page.tsx (Example protected page)
"use client";

import { UserRole } from "@/app/api/auth/[...nextauth]/route.js";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { useAuth } from "@/hooks/useAuth";

export default function StudentDashboard() {
  const { user } = useAuth(UserRole.STUDENT);

  return (
    <ProtectedRoute allowedRoles={[UserRole.STUDENT]}>
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, {user?.firstName}!
          </h1>
          <p className="text-gray-600 mb-8">Continue your learning journey</p>

          {/* Dashboard content */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="text-lg font-semibold mb-2">Enrolled Courses</h3>
              <p className="text-3xl font-bold text-blue-600">12</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="text-lg font-semibold mb-2">Completed</h3>
              <p className="text-3xl font-bold text-green-600">8</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="text-lg font-semibold mb-2">Learning Streak</h3>
              {/* <p className="text-3xl font-bold text-purple-600">
                {user?.learningStreak || 0} days
              </p> */}
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
