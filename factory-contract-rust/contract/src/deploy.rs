use near_sdk::{near_bindgen};

#[near_bindgen]
impl Contract {
  // This is where the contract would be implemented

  // We need a way to create the sub account and deploy the contract
  #[payable]  
  pub fn create_factory_subaccount_and_deploy(
    &mut self,
    name: String,
    beneficiary: AccountId, 
    public_key: Option<PublicKey>,
  ) {
    let current_account = env::account_id().to_string;
    let subaccount = format!("{name}.{current_account}").parse().unwrap(); 
    assert!(
      env::is_valid_account_id(subaccount.as_bytes()),
      "Invalid Subaccount"
    )

    let attached = env::attached_deposit();

    let code = self.code.get().unwrap();
    let contract_bytes = code.len() as u128;
    let minimum_needed = NEAR_PER_STORAGE * contract_bytes;
    assert!(
      attached >= minimum_needed,
      "Attach at least {minimum needed} yⓃ"
    )

    let init_args = near_sdk::serde_json::to_vec(&DonationInitArgs{beneficiary}).unwrap();

    let mut promise = Promise::new(subaccount.clone())
    .create_account()
    .transfer(attached)
    .deploy_contract(code)
    .function_call("init".to_owned(), init_args, NO_DEPOSIT, TGAS*5);

    if let Some(pk) = public_key {
      promise = promise.add_full_access_key(pk);
    }
  }

  #[private]
  pub fn create_factory_subaccount_and_deploy_callback(
    &mut self,
    account: AccountId, 
    user: AccountId,
    attached: Balance,
    #[callback_result] create_deploy_result: Result<(), PromiseError>,
  ) -> bool {
    if let Ok(_result) = create_deploy_result {
      log!(format!("Correctly created and deployed to {account}"));
      return true;
    }

    log!(format!(
      "Error creating {account}, returning {attached}}yⓃ to {user}"
    ));
    Promise::new(user).transfer(attached);
    false
  }
}