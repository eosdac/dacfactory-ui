export default {
  general: {
    and: "and",
    required: "* Required",
    welcome: "Welcome",
    info: "info",
    close: "Close",
    go_to_step: "go to step {step}",
    step: "STEP",
    go_home: "Go home",
    go_back: "go back",
    continue: "continue",
    info_will_be_saved: "Info will be saved. You can finish filing up of the form later.",
    step_of: "Step {active_step} of {max_steps}",
    example: "Example",
    cancel: "Cancel",
    why_and_how: "The Why’s and How"
  },
  ual: {
    close: "Close",
    no_authenticators: "No authenticators are available for your current browser and/or device.",
    input_account: "Input your account name",
    back: "back",
    connecting_to: "Connecting to {name} ...",
    service_unavailable: "Service unavailable"
  },
  home: {
    welcome_to: "Welcome To",
    dac: "DAC",
    factory: "FACTORY",
    line1: "Create a Decentralized Autonomous Community (DAC) to fit the needs of your organization and community.",
    line2: "Get started with these 5 steps.",
    create_my_dac: "create my dac",
    continue_creation: "continue creation",
    help_why: "WHY LAUNCH A DAC?",
    help_line1: "The world of static hierarchies and centralized ownership will be disrupted",
    help_learn_more: "Learn more",
    upload_dac_json: "UPLOAD DAC JSON",
    error_in_json: "ERROR IN JSON",
    file_is_damaged: "FILE IS DAMAGED",
    reset_dac_data: "Reset DAC data",
    all_data_will_be_deleted: "All data will be deleted! You won't be able to revert to the current state."
  },
  how: {
    intro: "Creating a DAC used to be only for the most technically literate.  With DAC Factory from eosDAC it is now as easy as completing a few details and we will create and maintain it for you.",
    intro_title: "Creating your own DAC is now easy!",
    how_start_title: "How to start",
    how_start1: "Once you complete the form, our systems will prepare and build the DAC for you.  Just enter the name of your DAC and the name and amount of tokens you want to issue and then choose a color scheme.",
    how_start2: "Please be careful choosing the token symbol as this cannot be changed later (anything else can be)",
    modifications_title: 'Modifications',
    modifications1: "We understand that the needs of each DAC is different (token economics, voting schemes etc), so have designed our DACs to be customizable.  This will require installing extra contracts if the functionality you require is not available.  Please contact us for more information.",
    modifications2: "The default system already includes the ability to choose different voting schemes and the ability to customize the look-and-feel of your DAC.",
    existing_title: "I already have an existing EOS token",
    existing1: "No problem, the default setup will create a new token on our contract for simplicity.  If you have an existing token then you can contact us for a DAC creation file and you can upload that instead of completing the form",
    what_happens_title: "What happens after the DAC is created?",
    what_happens1: "Once your DAC has been created, the account used originally will be elected as the 'Genesis Custodian'.  This account will be the single elected custodian and will be sent all of the issued tokens and therefore has full control of the DAC.",
    what_happens2: "You should now take some time to familiarize yourself with the DAC interface.  At this point, you can change any settings by proposing them and then approving them.",
    what_happens3: "Once you are ready, you can then start to distribute your DAC tokens (you may want to transfer them to the DAC treasury account first) and then start asking people to register as candidates and start voting!",
    what_happens4: "After voting reaches the required threshold (expressed as a percentage of voting tokens), and the required number of candidates are available the DAC will be ready to be unlocked.  Once it is unlocked, all permissions will be resigned to the elected ",
    footer: ""
  },
  pricing: {
    title: 'Pricing',
    start: 'Start Now!',
    line1:
      "Getting your DAC started includes a setup fee to pay for the RAM needed to create accounts for your DAC and store information for your DAC on chain.",
    line2:
      "The monthly cost for maintaining your DAC includes basic maintainence and support and hosting of the state history node, Client API, and Member Client. For more information, see how it works.",
    line3:
      "The ongoing monthly fees can be paid in either EOS or EOSDAC tokens. If you fall behind in your payment, your member client may be disabled, but all your on chain data is still owned by you."
  },
  errors: {
    only_positive_integers_are_available: "Only positive integers are available.",
    greater_then_null: "Value must be greater than 0.",
    not_less_than: "Value must be not less than {min_value}.",
    step1: {
      can_only_have_letters: "Token symbol can only have letters A-Z.",
      token_already_exists: "Token already exists.",
      token_verification_error: "Token verification error."
    }
  },
  step1: {
    title: "DAC Profile",
    title_right: "Understanding of profile",
    dac_name: "DAC Name",
    dac_name_hint: "Enter a name for your DAC",
    dac_name_rule_length_3: "DAC name must be minimum 3 chars.",
    token_symbol: "Token Symbol",
    token_symbol_hint: "Min 3 / Max 7 chars",
    token_symbol_rule_length_3: "Symbol must have a minimum of 3 chars.",
    description: "Description",
    description_hint: "Info about your DAC",
    website_url: "Website URL",
    dac_id: "DAC ID",
    dac_id_hint: "Min 5 / Max 11 chars",
    dac_id_rule_length_5: "DAC ID must have a minimum of 5 chars.",
    dac_id_rule_length_11: "DAC ID can't have more then 11 chars.",
    info_line1: "Welcome to the first step in creating your own Decentralized Autonomous Community!",
    info_line2: "To start, specify the name of your DAC as you'd like it displayed.",
    info_line3:
      "Your token symbol should contain capital letters only and is limited to 7 characters. Ideally, you’ll want to avoid using a token symbol which might be confused with existing EOS tokens. This token will be your governance token used by your members to elect custodians. If you already have an existing EOS token, please contact us to modify your token contract and use the DAC JSON creation method.",
    info_line4:
      "A DAC is a group of people with a shared goal. Your DAC Description should let people know what your community goal is all about and why they might want to participate."
  },
  step2: {
    title: "Tokenomics",
    title_right: "Understanding of tokenomics",
    issuance: "Tokens",
    issuance_hint: "Number of tokens to create",
    decimals: "Decimals",
    info_line1:
      "Your DAC does not have to distribute all the tokens initially created. The account you are logged in with will become the genesis custodian for your DAC and will initially control all the tokens. You can later transfer them to your DAC treasury account. Most EOS tokens use 4 decimal places so if you’re unsure about this, just leave it as 4.",
    less_than_supply: "Issuance should be less than {max_supply}."
  },
  step3: {
    ///// right part
    title_right: "Understanding the configurations",
    subtitle1: "Custodians are the elected members of your DAC who will control DAC funds via multi-signature permissions and vote on proposals on behalf of the members who elected them. You should increase or decrease the number of custodians based on the amount of value your DAC will contain. For example, if you want a larger group making decisions for the DAC, you could increase this number to 12 so that a 9 of 12 agreement would be needed for any DAC token transfers.",
    number_of_c: "Number of custodians",
    subtitle2: "How many custodians will be elected.",
    number_of_v_per_t: "Number of votes per token",
    subtitle3: "How many custodians will each account be allowed to vote for.",
    length_of_c_term: "Length of custodian term",
    subtitle4: "How long will custodians be elected for until the next election. This also determines how of then the custodians will be paid, if you choose to make this a paid position in your DAC.",
    ///// left part
    title: "Custodian Configuration",
    percent_error: "Value should be between 0 and 100"
  },
  step4: {
    ///// right part
    title_right: "Adding Branding and setting colors",
    website_url: "Website URL",
    subtitle1:
      "Your brand is an important part of your DAC and makes a significant impact on a DAC’s public perception.",
    logo_url: "Logo URL",
    subtitle2: "Your logo is the logo and the word mark.",
    logomark_url: "Logomark URL",
    subtitle3: "Your logomark is only the mark of the logo.",
    subtitle4: "We recommend using imgur.com to host your logos",
    subtitle5:
      "Choose a primary color for your DAC and whether you want a dark theme.  You can change this later.",
    ///// left part
    title: "DAC Brand & URL",
    website_url_alt_hint: "Valid URL is required",
    color_scheme: "Color Scheme",
    primary_color: "Primary Color",
    dark_theme: "Dark Theme",
    link_hint: "External link to a file"
  },
  step5: {
    ///// right part
    title_right: "Summary of DAC information",
    ///// left part
    pay_month: "Pay month to month.",
    creation_of_account: "Creation of Accounts",
    once_you: "Once you purchase, the DAC will be initially under the control of the account which set it up",
    i_agree_with: "I agree with the",
    terms_and_conditions: "terms and conditions",
    /////
    "30_days": "30 days",
    due_on: "due on the 1st of each month",
    pay: "pay",
    login_to_pay: "login to pay",
    pay_in: "pay in",
    title: "Pay & Create DAC",
    info_line1: "TBD: Pay & Create DAC"
  },
  dac_creation: {
    go_to_main_page: "go to main page",
    validate_dac: "validate dac",
    wait_until_dac_created: "Please, wait while your DAC is being created.",
    dac_was_created: "Your DAC was successfully created!",
    ws_error: "WS error has occurred.",
    i_have_read_and_agree: "I've read and agree",
    dac_was_validated: "Your DAC was successfully validated!",
    dac_was_not_validated: "Your DAC wasn't validated. You can try again or contact our support.",
    try_again: "try again",
    constitution_preparation: "Constitution preparation",
    go_to_your_dac: "go to your dac",
    validation_message: "Your DAC setup is now complete, the account {account} has been set as the genesis custodian and you can now approve actions of the DAC using that account.  Please agree to the terms and conditions as the DAC to proceed."
  }
};
