import { context, MapEntry, PersistentUnorderedMap } from "near-sdk-as";
import {Course, listedCourses} from "./model";

import { ContractPromiseBatch } from "near-sdk-as";

export function purchaseCourse(courseId: string): void {
  // It needs to take some money 
  const course = getCourse(courseId);
  if (course == null) {
    throw new Error("Course not found at id " + courseId);
  }

  if (course.price.toString() != context.attachedDeposit.toString()){
    throw new Error("The deposit did not equal the course price of " + course.price.toString());
  }

  // Transfer this much of money from the user's account to the contract account
  ContractPromiseBatch.create(course.owner).transfer(context.attachedDeposit);

  // Change the owner of the course
  course.owner = context.sender;
  listedCourses.set(course.id, course);
}

export function addCourse(course: Course): void {
  if (listedCourses.get(course.id) === null) {
    listedCourses.set(course.id, Course.fromPayload(course));
  } else {
    throw new Error("Course already exists at id " + course.id);
  }
}

export function getCourse(id: string): Course | null {
  return listedCourses.get(id);
}

export function getCourses(): Course[] {
  return listedCourses.values();
}