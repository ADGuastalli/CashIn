import { API } from "@/helpers/helper";

interface Course {
  title: string;
  description: string;
  topics: string;
  duration: string;
  level: string;
  location: string;
  startDate: string;
}

export const createCourse = async (course: Course) => {
  const response = await fetch(`${API}/course`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(course),
  });
  const data = await response.json();
  return data;
};

export const getAllCourses = async () => {
  const response = await fetch(`${API}/course`, {
    method: "GET",
  });
  const data = await response.json();
  return data;
};

export const deleteCourse = async (id: string) => {
  const response = await fetch(`${API}/course/${id}`, {
    method: "DELETE",
  });
  const data = await response.json();
  return data;
};
