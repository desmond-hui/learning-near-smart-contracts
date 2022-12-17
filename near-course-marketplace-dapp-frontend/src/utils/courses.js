export function getCourse(id) {
  return window.contract.getCourse(id);
}

export function addCourse(course) {
  return window.contract.addCourse(course);
}

export function getCourses() {
  return window.contract.getCourses();
}

export async function purchaseCourse(course) {
  const GAS = 100000000000000; // TERAGAS
  await window.contract.purchaseCourse(course, GAS, parseInt(course.price));
}
