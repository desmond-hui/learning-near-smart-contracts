import { NearBindgen, near, call, view, LookupMap, initialize} from 'near-sdk-js';

@NearBindgen({})
class AltanNFTContract {
  owner_id: string;
  owner_by_id: LookupMap;

  constructor() {
    this.owner_id = "";
    this.owner_by_id = new LookupMap("o");
  }

  @initialize({})
  init({owner_id, owner_by_id_prefix}) {
    // Call type
    this.owner_id = owner_id;
    this.owner_by_id = new LookupMap(owner_by_id_prefix);
  }
}