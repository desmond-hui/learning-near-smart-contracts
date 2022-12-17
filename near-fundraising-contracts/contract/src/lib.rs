// Find all our documentation at https://docs.near.org
use near_sdk::borsh::{self, BorshDeserialize, BorshSerialize};
use near_sdk::{log, near_bindgen, AccountId, env};
use near_sdk::collections::{UnorderedMap};

const DEFAULT_MESSAGE: &str = "Hello";

#[near_bindgen]
#[derive(BorshDeserialize, BorshSerialize)]
pub struct Contract {
    pub fundraiser: AccountId,
    pub pledges: UnorderedMap<AccountId, u128>
}

impl Default for Contract{
    fn default() -> Self{
        Self {
            fundraiser: "altan.testnet".parse().unwrap(),
            pledges: UnorderedMap::new(b"p")
        }
    }
}

#[near_bindgen]
impl Contract {

    #[init]
    #[private]
    pub fn init(fundraiser_init: AccountId) -> Self {
        assert!(!env::state_exists(), "Contract already made");
        Self {
            fundraiser: fundraiser_init,
            pledges: UnorderedMap::new(b"p")
        }
    }
}


