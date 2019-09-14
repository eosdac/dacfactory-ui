export function isValidAccountName(v) {
  const re = /^[a-z1-5.]{1,12}$/;
  if (re.test(v)) {
    return true;
  } else {
    return "Account name can only have chars a-z, 1-5 and .";
  }
}

export async function isAvailableAccountName(v) {
  if (v.length < 12) return true;
  await new Promise(resolve => {
    setTimeout(resolve, 1000);
  });
  return "Account name already taken.";
}
