// ─── Disposable / fake email domain blocklist ─────────────────────────────────
const BLOCKED_DOMAINS = new Set([
  "mailinator.com","guerrillamail.com","tempmail.com","10minutemail.com",
  "throwam.com","yopmail.com","sharklasers.com","guerrillamailblock.com",
  "grr.la","guerrillamail.info","guerrillamail.biz","guerrillamail.de",
  "guerrillamail.net","guerrillamail.org","spam4.me","trashmail.com",
  "trashmail.me","trashmail.net","dispostable.com","fakeinbox.com",
  "mailnull.com","spamgourmet.com","spamgourmet.net","spamgourmet.org",
  "spamgourmet.com","spamgourmet.net","getairmail.com","filzmail.com",
  "discard.email","spamfree24.org","mailnew.com","mailscrap.com",
  "spammotel.com","spam.la","tempr.email","discard.email","cfl.fr",
  "objectmail.com","obobbo.com","oneoffmail.com","opayq.com",
  "ordinaryamerican.net","otherinbox.com","ourklips.com","outlawspam.com",
  "ovpn.to","owlpic.com","pecinan.com","pepbot.com","put2.net",
  "rcpt.at","recode.me","recursor.net","regbypass.com","rklips.com",
  "rmqkr.net","rsvhr.com","s0ny.net","safe-mail.net","safetypost.de",
  "sandelf.de","scatmail.com","selfdestructingmail.com","sendspamhere.com",
  "sharklasers.com","shieldedmail.com","shitmail.me","shitware.nl",
  "shortmail.net","sibmail.com","skeefmail.com","slapsfromlastnight.com",
  "slippery.email","slopsbox.com","slow-recovery.com","smellfear.com",
  "snakemail.com","sneakemail.com","sneakmail.de","snkmail.com",
  "sofimail.com","sogetthis.com","soodonims.com","spam.su","spamavert.com",
  "spambob.com","spambob.net","spambob.org","spambog.com","spambog.de",
  "spambog.ru","spambox.info","spambox.irishspringrealty.com","spambox.us",
  "spamcannon.com","spamcannon.net","spamcero.com","spamcon.org",
  "spamcorptastic.com","spamcowboy.com","spamcowboy.net","spamcowboy.org",
  "spamday.com","spamex.com","spamfree.eu","spamgoes.in","spamherelots.com",
  "spamhereplease.com","spamhole.com","spamify.com","spaminator.de",
  "spamkill.info","spaml.com","spaml.de","spammotel.com","spammy.host",
  "spamnot.com","spamoff.de","spamspot.com","spamstack.net","spamthis.co.uk",
  "spamthisplease.com","spamtroll.net","spamwc.de","spikio.com","superrito.com",
  "supergreatmail.com","superstachel.de","suremail.info","svk.jp","sweetxxx.de",
  "tafmail.com","tagyourself.com","tapchicongnghe.com","teewars.org",
  "teleworm.com","teleworm.us","tempail.com","tempalias.com","tempemail.biz",
  "tempemail.co.za","tempemail.com","tempemail.net","tempemail.org.uk",
  "tempimbox.com","tempinbox.co.uk","tempinbox.com","tempmail.eu",
  "tempmail.it","tempmail2.com","tempmailer.com","tempmailer.de",
  "tempomail.fr","temporarily.de","temporaryemail.net","temporaryforwarding.com",
  "temporaryinbox.com","temporarymail.org","tempthe.net","thankyou2010.com",
  "thecloudindex.com","thisisnotmyrealemail.com","tilien.com","timkassouf.com",
  "tittbit.in","tmail.com","tmail.io","tmailinator.com","toiea.com",
  "trbvm.com","trillianpro.com","tryalert.com","turual.com","twinmail.de",
  "txcct.com","tyldd.com","uggsrock.com","umail.net","uroid.com","us.af",
]);

// ─── Fake / test email name blocklist ─────────────────────────────────────────
const BLOCKED_LOCAL = new Set([
  "test","fake","asdf","qwerty","admin","noreply","no-reply",
  "null","undefined","example","sample","temp","temporary","anonymous",
  "nobody","someone","anyone","user","hello","info","contact",
  "spam","junk","trash","delete","aaa","bbb","ccc","xxx","yyy","zzz",
  "abc","123","1234","12345","abcdef",
]);

// ─── Repeated char pattern (e.g. aaaa@bbbb.com) ───────────────────────────────
const REPEATED_CHARS = /^(.)\1{3,}@/;

// ─── Fake sequential patterns ─────────────────────────────────────────────────
const SEQUENTIAL = /^(abc|123|qwerty|asdf|zxcv)/i;

// ─── Valid email regex (RFC-compliant, practical) ─────────────────────────────
const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*\.[a-zA-Z]{2,}$/;

export type EmailValidationResult = {
  valid: boolean;
  message: string;
};

export function validateEmail(email: string): EmailValidationResult {
  const trimmed = email.trim().toLowerCase();
  if (!trimmed) return { valid: false, message: "Email is required" };

  if (!EMAIL_REGEX.test(trimmed))
    return { valid: false, message: "Please enter a valid email address" };

  const [local, domain] = trimmed.split("@");

  if (BLOCKED_DOMAINS.has(domain))
    return { valid: false, message: "Please use a real email address — temporary emails aren't accepted" };

  if (BLOCKED_LOCAL.has(local))
    return { valid: false, message: "Please enter your real email address" };

  if (REPEATED_CHARS.test(trimmed))
    return { valid: false, message: "Please enter a valid email address" };

  if (SEQUENTIAL.test(local))
    return { valid: false, message: "Please enter your real email address" };

  // Block obviously fake TLDs
  const tld = domain.split(".").pop() || "";
  if (tld.length < 2 || /^\d+$/.test(tld))
    return { valid: false, message: "Please enter a valid email address" };

  return { valid: true, message: "Looks good!" };
}

// ─── Known fake/test phone numbers ────────────────────────────────────────────
const FAKE_NUMBERS = new Set([
  "0000000000","1111111111","2222222222","3333333333","4444444444",
  "5555555555","6666666666","7777777777","8888888888","9999999999",
  "1234567890","0987654321","1231231234","1112223333","0000000001",
  "1234567","0000000","9999999","1111111","1234512345",
]);

export type PhoneValidationResult = {
  valid: boolean;
  message: string;
  digits: string; // only numeric digits
};

export function validatePhone(raw: string): PhoneValidationResult {
  if (!raw.trim()) return { valid: false, message: "Phone number is required", digits: "" };

  // Strip everything except digits
  const digits = raw.replace(/\D/g, "");

  if (digits.length < 6)
    return { valid: false, message: "Phone number is too short", digits };

  if (digits.length > 15)
    return { valid: false, message: "Phone number is too long", digits };

  if (FAKE_NUMBERS.has(digits) || FAKE_NUMBERS.has(digits.slice(-10)))
    return { valid: false, message: "Please enter a real phone number", digits };

  // Check all same digit (e.g. 44444444444)
  if (/^(\d)\1+$/.test(digits))
    return { valid: false, message: "Please enter a real phone number", digits };

  return { valid: true, message: "Looks good!", digits };
}

// ─── Country codes list ────────────────────────────────────────────────────────
export const COUNTRY_CODES = [
  { code: "+1",   flag: "🇺🇸", name: "USA / Canada" },
  { code: "+44",  flag: "🇬🇧", name: "United Kingdom" },
  { code: "+61",  flag: "🇦🇺", name: "Australia" },
  { code: "+64",  flag: "🇳🇿", name: "New Zealand" },
  { code: "+353", flag: "🇮🇪", name: "Ireland" },
  { code: "+27",  flag: "🇿🇦", name: "South Africa" },
  { code: "+91",  flag: "🇮🇳", name: "India" },
  { code: "+92",  flag: "🇵🇰", name: "Pakistan" },
  { code: "+880", flag: "🇧🇩", name: "Bangladesh" },
  { code: "+63",  flag: "🇵🇭", name: "Philippines" },
  { code: "+65",  flag: "🇸🇬", name: "Singapore" },
  { code: "+60",  flag: "🇲🇾", name: "Malaysia" },
  { code: "+971", flag: "🇦🇪", name: "UAE" },
  { code: "+966", flag: "🇸🇦", name: "Saudi Arabia" },
  { code: "+974", flag: "🇶🇦", name: "Qatar" },
  { code: "+968", flag: "🇴🇲", name: "Oman" },
  { code: "+965", flag: "🇰🇼", name: "Kuwait" },
  { code: "+973", flag: "🇧🇭", name: "Bahrain" },
  { code: "+49",  flag: "🇩🇪", name: "Germany" },
  { code: "+33",  flag: "🇫🇷", name: "France" },
  { code: "+34",  flag: "🇪🇸", name: "Spain" },
  { code: "+39",  flag: "🇮🇹", name: "Italy" },
  { code: "+31",  flag: "🇳🇱", name: "Netherlands" },
  { code: "+32",  flag: "🇧🇪", name: "Belgium" },
  { code: "+41",  flag: "🇨🇭", name: "Switzerland" },
  { code: "+43",  flag: "🇦🇹", name: "Austria" },
  { code: "+46",  flag: "🇸🇪", name: "Sweden" },
  { code: "+47",  flag: "🇳🇴", name: "Norway" },
  { code: "+45",  flag: "🇩🇰", name: "Denmark" },
  { code: "+358", flag: "🇫🇮", name: "Finland" },
  { code: "+48",  flag: "🇵🇱", name: "Poland" },
  { code: "+55",  flag: "🇧🇷", name: "Brazil" },
  { code: "+52",  flag: "🇲🇽", name: "Mexico" },
  { code: "+54",  flag: "🇦🇷", name: "Argentina" },
  { code: "+56",  flag: "🇨🇱", name: "Chile" },
  { code: "+57",  flag: "🇨🇴", name: "Colombia" },
  { code: "+81",  flag: "🇯🇵", name: "Japan" },
  { code: "+82",  flag: "🇰🇷", name: "South Korea" },
  { code: "+86",  flag: "🇨🇳", name: "China" },
  { code: "+234", flag: "🇳🇬", name: "Nigeria" },
  { code: "+254", flag: "🇰🇪", name: "Kenya" },
  { code: "+233", flag: "🇬🇭", name: "Ghana" },
  { code: "+20",  flag: "🇪🇬", name: "Egypt" },
  { code: "+212", flag: "🇲🇦", name: "Morocco" },
];
