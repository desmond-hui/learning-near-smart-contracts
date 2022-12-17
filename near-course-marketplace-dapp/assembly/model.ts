import { context, PersistentUnorderedMap, u128 } from "near-sdk-as";

// Serialize it before it is stored in the blockchain
@nearBindgen
export class Course {
  id: string;
  name: string;
  price: u128; // almost positive
  owner: string;

  public static fromPayload(payload: Course): Course {
    const course = new Course();
    course.id = payload.id;
    course.name = payload.name;
    course.price = payload.price;
    course.owner = context.sender;
    return course;
  }
}

export const listedCourses = new PersistentUnorderedMap<string, Course>("LISTED_COURSES");