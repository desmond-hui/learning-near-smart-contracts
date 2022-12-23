import { NearBindgen, near, call, view, LookupMap, initialize, assert} from 'near-sdk-js';

// 
class Token {
  token_id: any;
  owner_id: any;

  constructor(token_id: any, owner_id: string) { 
    this.token_id = token_id;
    this.owner_id = owner_id;
  }
}

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

  @call({})
  mint_nft({token_id,token_owner_id}){
    // Sender must be the same as the token_owner_id
    assert(near.predecessorAccountId() === this.owner_id, "Unauthorized to mint");

    // Token should not exist
    assert(this.owner_by_id.get(token_id) === null, "Token already exists");
    
    this.owner_by_id.set(token_id, token_owner_id);
    return new Token(token_id, token_owner_id);
  }
}