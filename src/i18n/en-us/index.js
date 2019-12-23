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
    cancel: "Cancel"
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
    line1:
      "Maintaining the infrastructure for a Decentralized Autonomous Community is no easy task. There are multiple technical pieces involved which require ongoing maintenance and support. Though all of the components used for your DAC are <a href='https://github.com/eosdac' target='_blank'>open source</a> and can be deployed and maintained yourself without any involvement from the eosDAC team, the DAC Factory offers a solution for non-technical users while still providing decentralized security for your DAC. All the information for you DAC is owned by your authority account and stored in tables within contracts secured and maintained by the elected 12-member eosDAC custodian board which requires a 10 of 12 multisignature agreement to change anything. The EOSDAC token holders who join eosDAC and vote for custodians help secure your DAC, so please join us also.",
    line2: "Read on for a more technical understanding of all the pieces in making your DAC work.",
    line3:
      "The eosDAC technical team maintains the following contracts for you secured by the <a href='https://bloks.io/account/dacauthority#keys' target='_blank'>dacauthority</a> multisig account:",
    line4:
      "<strong>daccustodian</strong>: This is where your community votes, custodian election information, and other data is stored.",
    line5:
      "<strong>eosdactokens</strong>: Unless you are using your own custom token contract, this is where your token symbol and balance information is maintained.",
    line6:
      "<strong>eosdacmulti</strong>: This is where information about your multisignature proposals (title, description, voting status, etc) are maintained.",
    line7:
      "When creating your DAC, an authority account will be created for you which your elected custodians will control via multisig which controls all the data for your DAC. The treasury / owner account will also be owned and controlled by your DAC.",
    line8:
      "In addition, an API filler will take information from a state history node and store it in MongoDB. RabbitMQ is used along with an API processor to format that data and put it back into MongoDB so it can be used by the Client API. The <a href='https://github.com/eosdac/eosdac-client' target='_blank'>client</a> is the front end your members will interact with which is also hosted by eosDAC and can be customized by you via the <a href='https://github.com/eosdac/eosdac-client-extension' target='_blank'>eosdac-client-extension</a> which you can fork and update your DAC configuration to use. You can also host this yourself and point it to the Client API or run your own <a href='https://github.com/eosdac/eosdac-api' target='_blank'>Client API</a> as well.",
    line9:
      "The eosDAC team will work to ensure reliable uptime and ongoing support for the various components which keep your DAC running. Your monthly fees will go towards server infrastructure, technical team worker proposals to maintain the software, and to benefit the eosDAC community. Our goal is to keep the costs to you lower than if you had to maintain the infrastructure yourself. In order to keep your member client active, please make your monthly payments promptly.",
    line10:
      "Please read the terms carefully when creating your DAC. They are between you and Dacoco, the current service provider company for eosDAC. After your DAC is created, you'll have another set of terms to agree to as the DAC itself which will then transfer ownership of the DAC to you.",
    line11:
      "If you have any questions, please reach out to us in the #5-tech-and-development, dac-factory or support channels in the <a href='https://discord.io/eosdac' target='_blank'>eosDAC Discord</a>."
  },
  pricing: {
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
      "Your token symbol should contain capital letters only and is limited to 7 characters. Ideally, you’ll want to avoid using a token symbol which might be confused with existing EOS tokens. This token will be your governance token used by your members to elect custodians.",
    info_line4:
      "A DAC is a group of people with a shared goal. Your DAC Description should let people know what your community goal is all about and why they might want to participate.",
    info_line5:
      "The DAC ID is a unique identifier for your DAC used by the system to keep your data organized together and will be generated from your DAC Name."
  },
  step2: {
    title: "Tokenomics",
    issuance: "Issuance {token_symbol}",
    issuance_hint: "Issuance for your token",
    decimals: "Decimals",
    info_line1: "Your DAC does not have to issue all the tokens initially created.",
    info_line2: "Most EOS tokens use 4 decimal places so if you’re unsure about this, just leave it as 4.",
    less_than_supply: "Issuance should be less than {max_supply}."
  },
  step3: {
    ///// right part
    hint1: "The Why’s and How",
    title_right: "Understanding the configurations",
    subtitle1: "You’re configurations bacon ipsum dolor amet leberkas doner kevin pork belly spare ribs biltong.",
    subtitle_dolor_amet:
      "Dolor amet strip steak sirloin beef t-bone brisket, drumstick bacon kevin kielbasa pork loin. Beef ribs rump landjaeger.",
    number_of_c: "Number of custodians",
    subtitle2: "How many custodians will be elected.",
    number_of_v_per_t: "Number of votes per token",
    subtitle3: "How many custodians will each account be allowed to vote for.",
    length_of_c_term: "Length of custodian term",
    subtitle4: "How long will custodians be elected for until the next election.",
    ///// left part
    title: "Custodian Configuration",
    percent_error: "Value should be between 0 and 100"
  },
  step4: {
    ///// right part
    hint1: "The Why’s and How",
    title_right: "Adding Branding and setting colors",
    website_url: "Website URL",
    subtitle1:
      "Your brand is an important part of your DAC, and makes a significant impact on a DAC’s public perception.",
    logo_url: "Logo URL",
    subtitle2: "Your logo is the logo and the word mark.",
    logomark_url: "Logomark URL",
    subtitle3: "Your logomark is only the mark of the logo.",
    subtitle4: "We recommend using imgur.com to host your logos",
    subtitle5:
      "If you are having trouble picking out a good color pallete we recommend view coolors.co to find a color pallete to match your brand.",
    ///// left part
    title: "DAC Brand & URL",
    website_url_alt_hint: "Valid URL is required",
    colors_scheme: "Colors Scheme",
    link_hint: "External link to a file"
  },
  step5: {
    ///// right part
    title_right: "Summary of DAC information",
    ///// left part
    pay_month: "Pay month to month.",
    creation_of_account: "Creation of Accounts",
    once_you: "Once you purchase, the DAC will be initially under the control of the account which set it up",
    i_agree_with: "I agree with",
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
    wait_until_dac_created: "Please, wait until your DAC will be created.",
    dac_was_created: "Your DAC was successfully created!",
    ws_error: "WS error has occurred.",
    i_have_read_and_agree: "I've read and agree",
    dac_was_validated: "Your dac was successfully validated!",
    dac_was_not_validated: "Your dac wasn't validated. You can try again or contact our support.",
    try_again: "try again",
    constitution_preparation: "Constitution preparation"
  },
};
