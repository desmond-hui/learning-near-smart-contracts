use near_sdk::{near_bindgen};

#[near_bindgen]
impl Contract {
  // This is where the contract would be implemented

  // We need a way to create the sub account and deploy the contract
  #[payable]  
  pub fn create_factory_subaccount_and_deploy(
    &mut self,
    name: String,
  ) {
    let current_account = env::account_id().to_string;
    let subaccount = format!("{name}.{current_account}").parse().unwrap(); 

    let attached = env::attached_deposit();

    let code = self.code.get()

  }
}