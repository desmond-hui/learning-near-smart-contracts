import { MapEntry, PersistentUnorderedMap } from "near-sdk-as";
import {Course, listedCourses} from "./model";

export function addCourse(course: Course): void {
  if (listedCourses.get(course.id) === null) {
    listedCourses.set(course.id, Course.fromPayload(course));
  } else {
    throw new Error("Course already exists at id " + course.id);
  }
}

export function getCourse(course: Course): Course | null {
  return listedCourses.get(course.id);
}

export function getCourses(): Course[] {
  return listedCourses.values();
}