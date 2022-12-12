import {storage, Context} from "near-sdk-as";

export class Greeting {

  getGreeting(accountId: string): string | null {
    return storage.get<string>(accountId, "NOT AVAILABLE");
  }

  setGreeting(greeting: string): void {
    // Set void for functions that 
    storage.set(Context.sender, greeting);
  }
}