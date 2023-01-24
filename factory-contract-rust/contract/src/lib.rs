// Find all our documentation at https://docs.near.org
use near_sdl::collections::LazyOption;
use near_sdk::borsh::{self, BorshDeserialize, BorshSerialize};
use near_sdk::{log, near_bindgen};

// Convert 
const CONTRACT_ADDRESS: &[u8] = include_bytes!("./guest-book-contract/contract.wasm");

// Define the contract structure
#[near_bindgen]
#[derive(BorshDeserialize, BorshSerialize)]
pub struct Contract {
    // Since deserialization happens almost in every network call, we need to use
    // the lazy option to store the code
    code: LazyOption<Vec<u8>>,
}

// Define the default, which automatically initializes the contract
impl Default for Contract{
    fn default() -> Self {
        Self {
            code: LazyOption::new("code".as_bytes(), Some(&CONTRACT_ADDRESS.to_vec())),
        }
    }
}
