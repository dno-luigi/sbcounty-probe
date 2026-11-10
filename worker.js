var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });

// src/worker.js
var CALL_TYPES = {
  "459": { desc: "Burglary", category: "Property Crime", severity: "high", penal: "PC 459" },
  "459A": { desc: "Burglary Alarm", category: "Alarm", severity: "medium", penal: "PC 459" },
  "594": { desc: "Vandalism / Malicious Mischief", category: "Property Crime", severity: "medium", penal: "PC 594" },
  "602": { desc: "Trespassing", category: "Property Crime", severity: "low", penal: "PC 602" },
  "647B": { desc: "Prostitution", category: "Vice", severity: "medium", penal: "PC 647(b)" },
  "415M": { desc: "Disturbance (Music/Noise)", category: "Disturbance", severity: "low", penal: "PC 415" },
  "415UNK": { desc: "Disturbance (Unknown)", category: "Disturbance", severity: "medium", penal: "PC 415" },
  "415": { desc: "Disturbing the Peace", category: "Disturbance", severity: "medium", penal: "PC 415" },
  "23103": { desc: "Reckless Driving", category: "Traffic", severity: "high", penal: "VC 23103" },
  "23110": { desc: "Throwing Objects at Vehicle", category: "Traffic", severity: "high", penal: "VC 23110" },
  "12500A": { desc: "Unlicensed Driver", category: "Traffic", severity: "low", penal: "VC 12500(a)" },
  "1181": { desc: "Traffic Collision (Injury)", category: "Traffic", severity: "high", penal: "Vehicle" },
  "SUSPER": { desc: "Suspicious Person", category: "Suspicious", severity: "medium" },
  "SS": { desc: "Subject Stop", category: "Officer Initiated", severity: "low" },
  "AREACK": { desc: "Area Check", category: "Patrol", severity: "low" },
  "BSCK": { desc: "Business Check", category: "Patrol", severity: "low" },
  "AOD": { desc: "Assist Other Department", category: "Assist", severity: "low" },
  "WELCK": { desc: "Welfare Check", category: "Wellness", severity: "medium" },
  "W911": { desc: "911 Wireless Call", category: "Emergency", severity: "high" },
  "FU": { desc: "Follow Up", category: "Administrative", severity: "low" },
  "T": { desc: "Traffic Stop", category: "Traffic", severity: "low" },
  "INFO": { desc: "Information", category: "Administrative", severity: "low" },
  "XPAT": { desc: "Ex-Parte", category: "Administrative", severity: "medium" },
  "INC": { desc: "Incident", category: "Other", severity: "medium" },
  "COUNTR": { desc: "Counter Report", category: "Administrative", severity: "low" },
  "VEHCK": { desc: "Vehicle Check", category: "Patrol", severity: "low" },
  "SV": { desc: "Suspicious Vehicle", category: "Suspicious", severity: "medium" },
  "415D": { desc: "Disturbance (Domestic)", category: "Disturbance", severity: "high" },
  "PEDCK": { desc: "Pedestrian Check", category: "Patrol", severity: "low" },
  "WARARR": { desc: "Warrant Arrest", category: "Administrative", severity: "high" },
  "PATINF": { desc: "Patrol Information", category: "Administrative", severity: "low" },
  "CIVIL": { desc: "Civil Matter", category: "Civil", severity: "low" },
  "SUBCK": { desc: "Subject Check", category: "Patrol", severity: "low" },
  "SECCK": { desc: "Security Check", category: "Patrol", severity: "low" },
  "RXPAT": { desc: "Repeat Ex-Parte", category: "Administrative", severity: "medium" },
  "CPSFU": { desc: "CPS Follow Up", category: "Administrative", severity: "medium" },
  "10851": { desc: "Stolen Vehicle", category: "Property Crime", severity: "high" },
  "911FU": { desc: "911 Follow Up", category: "Emergency", severity: "low" },
  "TRAN": { desc: "Transfer", category: "Administrative", severity: "low" },
  "MANDOW": { desc: "Man Down", category: "Medical", severity: "high" },
  "1125": { desc: "Hit and Run", category: "Traffic", severity: "high" },
  "APSFU": { desc: "APC Follow Up", category: "Administrative", severity: "low" },
  "166.4": { desc: "Drug Paraphernalia", category: "Vice", severity: "medium" },
  "DB": { desc: "Disturbance (Beat)", category: "Disturbance", severity: "medium" },
  "HOMER": { desc: "Home Rule", category: "Administrative", severity: "low" },
  "242": { desc: "Battery", category: "Violent Crime", severity: "high" },
  "PRITOW": { desc: "Priority Tow", category: "Traffic", severity: "low" },
  "490.5": { desc: "Illegal Dumping", category: "Property Crime", severity: "low" },
  "PUBSER": { desc: "Public Service", category: "Assist", severity: "low" },
  "20002": { desc: "Hit and Run (Injury)", category: "Traffic", severity: "high" },
  "REPO": { desc: "Repo/Repossession", category: "Civil", severity: "low" },
  "UNWANT": { desc: "Unwanted Person", category: "Disturbance", severity: "medium" },
  "488": { desc: "Trespassing", category: "Property Crime", severity: "low" },
  "415S": { desc: "Disturbance (Subject)", category: "Disturbance", severity: "medium" },
  "UNKPRO": { desc: "Unknown Problem", category: "Investigation", severity: "medium" },
  "647F": { desc: "Public Intoxication", category: "Disturbance", severity: "low" },
  "496": { desc: "Receiving Stolen Property", category: "Property Crime", severity: "high" },
  "166.4R": { desc: "Drug Paraphernalia (Repeat)", category: "Vice", severity: "medium" },
  "T911": { desc: "911 Transfer", category: "Emergency", severity: "low" },
  "SUSCON": { desc: "Suspicious Conduct", category: "Suspicious", severity: "medium" },
  "FD": { desc: "Fire Department", category: "Fire", severity: "medium" },
  "653M": { desc: "Annoying Phone Call", category: "Disturbance", severity: "low" },
  "498": { desc: "Stolen Property", category: "Property Crime", severity: "high" },
  "484R": { desc: "Shoplifting (Report)", category: "Property Crime", severity: "medium" },
  "22669": { desc: "DUI (Alcohol)", category: "Traffic", severity: "high" },
  "530.5": { desc: "Identity Theft", category: "Property Crime", severity: "medium" },
  "FOUNDN": { desc: "Found (Person/Narcotics)", category: "Other", severity: "low" },
  "14601": { desc: "Driving on Suspended License", category: "Traffic", severity: "low" },
  "211S": { desc: "Robbery (Strong-Arm)", category: "Violent Crime", severity: "high" },
  "SWATTNG": { desc: "Swatting", category: "Emergency", severity: "high" },
  "1183": { desc: "Traffic Collision (Property)", category: "Traffic", severity: "medium" },
  "417": { desc: "Brandishing Weapon", category: "Violent Crime", severity: "high" },
  "FOUNDP": { desc: "Found Property", category: "Property", severity: "low" },
  "415F": { desc: "Disturbance (Family)", category: "Disturbance", severity: "high" },
  "MISPER": { desc: "Missing Person", category: "Wellness", severity: "high" },
  "415J": { desc: "Disturbance (Juvenile)", category: "Disturbance", severity: "low" },
  "KTP": { desc: "Keep The Peace", category: "Civil", severity: "low" },
  "415N": { desc: "Disturbance (Noise)", category: "Disturbance", severity: "low" },
  "290FU": { desc: "Sex Offender Registration FU", category: "Administrative", severity: "medium" },
  "905": { desc: "Mental Health", category: "Wellness", severity: "high" },
  "SOREQ": { desc: "Sound Request", category: "Disturbance", severity: "low" },
  "BUSCK": { desc: "Business Check", category: "Patrol", severity: "low" },
  "THEFT": { desc: "Theft", category: "Property Crime", severity: "medium" },
  "WARSER": { desc: "Warrant Service", category: "Administrative", severity: "high" },
  "TOW": { desc: "Tow", category: "Traffic", severity: "low" },
  "WEAPON": { desc: "Weapon", category: "Violent Crime", severity: "high" },
  "TRO": { desc: "Temporary Restraining Order", category: "Civil", severity: "medium" },
  "PTRANS": { desc: "Phone Transfer", category: "Administrative", severity: "low" },
  "11377A": { desc: "Narcotics Possession", category: "Vice", severity: "medium" },
  "245": { desc: "Assault w/ Deadly Weapon", category: "Violent Crime", severity: "high" },
  "415CIV": { desc: "Disturbance (Civil)", category: "Disturbance", severity: "low" },
  "243D": { desc: "Battery on Peace Officer", category: "Violent Crime", severity: "high" },
  "10851R": { desc: "Stolen Vehicle (Repeat)", category: "Property Crime", severity: "high" },
  "COR1": { desc: "Coroner", category: "Other", severity: "medium" },
  "11377": { desc: "Narcotics", category: "Vice", severity: "medium" },
  "PANIC": { desc: "Panic", category: "Emergency", severity: "high" },
  "VEHREL": { desc: "Vehicle Release", category: "Traffic", severity: "low" },
  "MEDAID": { desc: "Medical Aid", category: "Medical", severity: "high" },
  "COURTESY": { desc: "Courtesy", category: "Assist", severity: "low" },
  "603": { desc: "Trespassing", category: "Property Crime", severity: "low" },
  "242R": { desc: "Battery (Report)", category: "Violent Crime", severity: "medium" },
  "AWOL": { desc: "AWOL", category: "Administrative", severity: "medium" },
  "487": { desc: "Grand Theft", category: "Property Crime", severity: "medium" },
  "FOUNDA": { desc: "Found", category: "Property", severity: "low" },
  "23152B": { desc: "DUI (Blood Alcohol)", category: "Traffic", severity: "high" },
  "RETPER": { desc: "Repeat Person", category: "Patrol", severity: "low" },
  "415BG": { desc: "Disturbance (Business/Guest)", category: "Disturbance", severity: "medium" },
  "647E": { desc: "Drug Activity", category: "Vice", severity: "medium" },
  "476": { desc: "Uttering Forged Check", category: "Property Crime", severity: "medium" },
  "CCODES": { desc: "Community Codes", category: "Patrol", severity: "low" },
  "23152": { desc: "DUI", category: "Traffic", severity: "high" },
  "602.5": { desc: "Trespassing (Vehicle)", category: "Property Crime", severity: "low" },
  "415NO": { desc: "Disturbance (No Offense)", category: "Disturbance", severity: "low" },
  "530.5E": { desc: "Identity Theft (E)", category: "Property Crime", severity: "medium" },
  "EVENT": { desc: "Event", category: "Administrative", severity: "low" },
  "BPAT": { desc: "Bike Patrol", category: "Patrol", severity: "low" },
  "532": { desc: "Theft from Person", category: "Property Crime", severity: "medium" },
  "INV": { desc: "Investigation", category: "Investigation", severity: "medium" },
  "SUSCIR": { desc: "Suspicious Circumstances", category: "Suspicious", severity: "medium" },
  "648": { desc: "Lewd Conduct", category: "Vice", severity: "medium" },
  "484G": { desc: "Theft (Govt Property)", category: "Property Crime", severity: "medium" },
  "PKGVIO": { desc: "Parking Violation", category: "Traffic", severity: "low" },
  "LOSTP": { desc: "Lost Property", category: "Property", severity: "low" },
  "1126": { desc: "Tow", category: "Traffic", severity: "low" },
  "597": { desc: "Animal Cruelty", category: "Animal", severity: "medium" },
  "11395": { desc: "Drug Violation", category: "Vice", severity: "medium" },
  "GTAREC": { desc: "Grand Theft Auto Recovery", category: "Property Crime", severity: "medium" },
  "640.6": { desc: "Stalking", category: "Violent Crime", severity: "high" },
  "369I": { desc: "Narcotics Investigator", category: "Investigation", severity: "medium" },
  "KNOCK": { desc: "Knock and Talk", category: "Investigation", severity: "low" },
  "374B": { desc: "Illegal Dumping", category: "Property Crime", severity: "low" },
  "FIRE": { desc: "Fire", category: "Fire", severity: "high" },
  "11364": { desc: "Drug Paraphernalia", category: "Vice", severity: "medium" },
  "415LT": { desc: "Disturbance (Landlord/Tenant)", category: "Disturbance", severity: "low" },
  "FPAT": { desc: "Foot Patrol", category: "Patrol", severity: "low" }
};
var RC_CALL_TYPES = {
  "ABANDONED VEHICLE": { desc: "Abandoned Vehicle", category: "Property", severity: "low" },
  "ALARM CALL": { desc: "Alarm Call", category: "Alarm", severity: "medium" },
  "ANIMAL PROBLEM": { desc: "Animal Problem", category: "Animal", severity: "low" },
  "ANIMAL ABUSE": { desc: "Animal Abuse", category: "Animal", severity: "medium" },
  "AREA CHECK": { desc: "Area Check", category: "Patrol", severity: "low" },
  "ARSON": { desc: "Arson", category: "Property Crime", severity: "high" },
  "ASSAULT W/ DEADLY WEAPON": { desc: "Assault with Deadly Weapon", category: "Violent Crime", severity: "high" },
  "ASSIST OTHER DEPARTMENT": { desc: "Assist Other Department", category: "Assist", severity: "low" },
  "ASSIST PUBLIC": { desc: "Assist Public", category: "Assist", severity: "low" },
  "ATTEMPT WARRANT SERVICE": { desc: "Attempt Warrant Service", category: "Administrative", severity: "medium" },
  "BATTERY": { desc: "Battery", category: "Violent Crime", severity: "high" },
  "BRANDISHING A WEAPON": { desc: "Brandishing a Weapon", category: "Violent Crime", severity: "high" },
  "BURGLARY": { desc: "Burglary", category: "Property Crime", severity: "high" },
  "CHECK THE WELFARE": { desc: "Welfare Check", category: "Wellness", severity: "medium" },
  "CHILD NEGLECT": { desc: "Child Neglect", category: "Violent Crime", severity: "high" },
  "CIVIL DISPUTE": { desc: "Civil Dispute", category: "Civil", severity: "low" },
  "DANGER TO SELF/OTHER": { desc: "Danger to Self/Other", category: "Wellness", severity: "high" },
  "DISABLED VEHICLE": { desc: "Disabled Vehicle", category: "Traffic", severity: "low" },
  "DISORIENTED SUBJECT": { desc: "Disoriented Subject", category: "Wellness", severity: "medium" },
  "DISTURBANCE": { desc: "Disturbance", category: "Disturbance", severity: "medium" },
  "DOMESTIC": { desc: "Domestic Disturbance", category: "Disturbance", severity: "high" },
  "DRIVING UNDER INFLUENCE": { desc: "Driving Under Influence", category: "Traffic", severity: "high" },
  "EMERGENCY NOTIFICATION": { desc: "Emergency Notification", category: "Emergency", severity: "high" },
  "FAMILY DISTURBANCE": { desc: "Family Disturbance", category: "Disturbance", severity: "medium" },
  "FIGHT": { desc: "Fight", category: "Disturbance", severity: "high" },
  "FIX-IT TICKET": { desc: "Fix-It Ticket", category: "Traffic", severity: "low" },
  "FOOT PATROL": { desc: "Foot Patrol", category: "Patrol", severity: "low" },
  "FOUND CHILD": { desc: "Found Child", category: "Wellness", severity: "medium" },
  "FOUND PROPERTY": { desc: "Found Property", category: "Property", severity: "low" },
  "FOLLOW-UP": { desc: "Follow Up", category: "Administrative", severity: "low" },
  "FRAUD": { desc: "Fraud", category: "Property Crime", severity: "medium" },
  "GRAND THEFT": { desc: "Grand Theft", category: "Property Crime", severity: "medium" },
  "HARRASSING PHONE CALLS": { desc: "Harassing Phone Calls", category: "Disturbance", severity: "low" },
  "HAZARD": { desc: "Hazard", category: "Traffic", severity: "medium" },
  "HIT & RUN": { desc: "Hit and Run", category: "Traffic", severity: "high" },
  "HIT & RUN - NON-INJURY": { desc: "Hit and Run (No Injury)", category: "Traffic", severity: "medium" },
  "HIT & RUN - NO/UNK INJURIES": { desc: "Hit and Run (Unknown Injuries)", category: "Traffic", severity: "high" },
  "HIT & RUN W/ INJURIES": { desc: "Hit and Run w/ Injuries", category: "Traffic", severity: "high" },
  "ILLEGAL DUMPING": { desc: "Illegal Dumping", category: "Property", severity: "low" },
  "ILLEGAL LODGING": { desc: "Illegal Lodging", category: "Property", severity: "low" },
  "INCORRIGABLE MINOR": { desc: "Incorrigible Minor", category: "Disturbance", severity: "low" },
  "LOST PERSON": { desc: "Lost Person", category: "Wellness", severity: "medium" },
  "LOST PROPERTY": { desc: "Lost Property", category: "Property", severity: "low" },
  "MAN DOWN": { desc: "Man Down", category: "Medical", severity: "high" },
  "MISCELLANEOUS CRIMINAL": { desc: "Miscellaneous Criminal", category: "Other", severity: "medium" },
  "MISSING CHILD": { desc: "Missing Child", category: "Wellness", severity: "high" },
  "MISSING PERSON": { desc: "Missing Person", category: "Wellness", severity: "high" },
  "NARCOTICS": { desc: "Narcotics", category: "Vice", severity: "medium" },
  "NOISE COMPLAINT": { desc: "Noise Complaint", category: "Disturbance", severity: "low" },
  "OPEN DOOR": { desc: "Open Door", category: "Patrol", severity: "low" },
  "PARKING VIOLATION": { desc: "Parking Violation", category: "Traffic", severity: "low" },
  "PETTY THEFT": { desc: "Petty Theft", category: "Property Crime", severity: "medium" },
  "PROWLER": { desc: "Prowler", category: "Suspicious", severity: "medium" },
  "PUBLIC ASSIST": { desc: "Public Assist", category: "Assist", severity: "low" },
  "PUBLIC DISTURBANCE": { desc: "Public Disturbance", category: "Disturbance", severity: "medium" },
  "PUBLIC INTOXICATION": { desc: "Public Intoxication", category: "Disturbance", severity: "low" },
  "RECKLESS DRIVING": { desc: "Reckless Driving", category: "Traffic", severity: "high" },
  "RECOVERY OF STOLEN VEHICLE": { desc: "Recovery of Stolen Vehicle", category: "Property Crime", severity: "medium" },
  "RESIST ARREST": { desc: "Resist Arrest", category: "Violent Crime", severity: "high" },
  "ROBBERY": { desc: "Robbery", category: "Violent Crime", severity: "high" },
  "RUNAWAY CHILD": { desc: "Runaway Child", category: "Wellness", severity: "medium" },
  "SEX REGISTRANT": { desc: "Sex Registrant", category: "Administrative", severity: "medium" },
  "SHOOTING AT OCCUPIED DWELLING": { desc: "Shooting at Occupied Dwelling", category: "Violent Crime", severity: "high" },
  "SILENT ALARM": { desc: "Silent Alarm", category: "Alarm", severity: "high" },
  "SOLICIT PROSTITUTION": { desc: "Solicitation for Prostitution", category: "Vice", severity: "medium" },
  "SUSPECT INFO": { desc: "Suspect Info", category: "Investigation", severity: "low" },
  "SUSPECTED DUI": { desc: "Suspected DUI", category: "Traffic", severity: "high" },
  "SUSPICIOUS CIRCUMSTANCE": { desc: "Suspicious Circumstances", category: "Suspicious", severity: "medium" },
  "SUSPICIOUS PERSON": { desc: "Suspicious Person", category: "Suspicious", severity: "medium" },
  "SUSPICIOUS VEHICLE": { desc: "Suspicious Vehicle", category: "Suspicious", severity: "medium" },
  "SUICIDE THREAT": { desc: "Suicide Threat", category: "Wellness", severity: "high" },
  "THEFT": { desc: "Theft", category: "Property Crime", severity: "medium" },
  "THROW SUBSTANCE AT VEHICLE": { desc: "Throw Substance at Vehicle", category: "Traffic", severity: "high" },
  "TRAFFIC": { desc: "Traffic", category: "Traffic", severity: "low" },
  "TRAFFIC COLLISION": { desc: "Traffic Collision", category: "Traffic", severity: "high" },
  "TRAFFIC COLLISION - MINOR INJURY": { desc: "Traffic Collision (Minor Injury)", category: "Traffic", severity: "high" },
  "TRAFFIC COLLISION - NON-INJURY": { desc: "Traffic Collision (No Injury)", category: "Traffic", severity: "medium" },
  "TRAFFIC COLLISION - NON INJ W/ BLOCK": { desc: "Traffic Collision (Block)", category: "Traffic", severity: "high" },
  "TRAFFIC COLLISION - NO DETAILS": { desc: "Traffic Collision (No Details)", category: "Traffic", severity: "medium" },
  "TRAFFIC HAZARD": { desc: "Traffic Hazard", category: "Traffic", severity: "medium" },
  "TRAFFIC STOP": { desc: "Traffic Stop", category: "Traffic", severity: "low" },
  "TRESPASSING": { desc: "Trespassing", category: "Property Crime", severity: "medium" },
  "UNKNOWN TROUBLE": { desc: "Unknown Trouble", category: "Investigation", severity: "medium" },
  "UNLAWFUL ENTRY": { desc: "Unlawful Entry", category: "Property Crime", severity: "high" },
  "UNATTENDED DEATH": { desc: "Unattended Death", category: "Other", severity: "medium" },
  "VANDALISM": { desc: "Vandalism", category: "Property Crime", severity: "medium" },
  "VEHICLE CHECK": { desc: "Vehicle Check", category: "Patrol", severity: "low" },
  "VEHICLE CODE VIOLATION": { desc: "Vehicle Code Violation", category: "Traffic", severity: "low" },
  "VEHICLE STOP": { desc: "Vehicle Stop", category: "Traffic", severity: "low" },
  "VEHICLE THEFT": { desc: "Vehicle Theft", category: "Property Crime", severity: "high" },
  "WELFARE CHECK": { desc: "Welfare Check", category: "Wellness", severity: "medium" },
  "911 HANGUP FROM CELLPHONE": { desc: "911 Hangup from Cellphone", category: "Emergency", severity: "low" },
  "911 CALL FROM BUSINESS": { desc: "911 Call from Business", category: "Emergency", severity: "medium" }
};
var DISPOSITIONS = {
  "*": { desc: "No Disposition Entered", meaning: "Call closed without formal disposition \u2014 may indicate no action taken or deputy oversight" },
  "NAT": { desc: "Necessary Action Taken", meaning: "Routine clearance \u2014 deputies responded, appropriate action taken, no arrest or report" },
  "RTF": { desc: "Report To Follow", meaning: "Significant incident \u2014 formal report will be filed. Evidence found or crime confirmed." },
  "CAN": { desc: "Canceled", meaning: "Call canceled before or during response \u2014 situation resolved or dispatch error" },
  "CIT": { desc: "Crisis Intervention Team", meaning: "Mental health / behavioral crisis \u2014 CIT-trained officers used de-escalation" },
  "CIV": { desc: "Civil Matter", meaning: "Not criminal \u2014 landlord/tenant, property dispute, contract issue" },
  "GOA": { desc: "Gone on Arrival", meaning: "Subjects or evidence no longer present when officers arrived" },
  "UNF": { desc: "Unfounded", meaning: "Investigation determined call was not based on a real incident" },
  "ARR": { desc: "Arrest Made", meaning: "Arrest occurred at scene" },
  "K": { desc: "No Report Required", meaning: "Call handled without a formal written report" }
};
var RC_DISPOSITIONS = {
  "PENDING DISPO": { desc: "Pending Disposition", meaning: "Call still active or disposition not yet entered" },
  "DISPATCHED": { desc: "Dispatched", meaning: "Units dispatched to scene" },
  "ON SCENE": { desc: "On Scene", meaning: "Units on scene" },
  "REPORT TAKEN": { desc: "Report Taken", meaning: "Formal report filed" },
  "ARREST": { desc: "Arrest Made", meaning: "Arrest occurred at scene" },
  "CITATION": { desc: "Citation Issued", meaning: "Citation issued to subject" },
  "GONE ON ARRIVAL": { desc: "Gone on Arrival", meaning: "Subjects or evidence gone on arrival" },
  "UNFOUNDED": { desc: "Unfounded", meaning: "Call determined to be unfounded" },
  "CANCELED": { desc: "Canceled", meaning: "Call canceled before or during response" },
  "CIVIL MATTER": { desc: "Civil Matter", meaning: "Not criminal \u2014 civil issue" },
  "VERBAL ADVISED": { desc: "Verbally Advised", meaning: "Party verbally advised of laws/rights" },
  "NO REPORT REQ": { desc: "No Report Required", meaning: "Call handled without a formal report" }
};
var AGENCY_NAMES = {
  AD: "Adelanto City",
  AL: "Arrow Line",
  AP: "Apple Valley City",
  AV: "Aviation County",
  BA: "Barstow County",
  BB: "Big Bear County",
  BL: "Big Bear Lake City",
  CB: "Colorado Boats County",
  CH: "Chino Hills City",
  CR: "Colorado River County",
  FN: "Fontana County",
  GT: "Grand Terrace City",
  HE: "Hesperia City",
  HI: "Highland City",
  LL: "Loma Linda City",
  MB: "Morongo Basin County",
  NE: "Needles City",
  RC: "Rancho Cucamonga City",
  SB: "San Bernardino County",
  SM: "San Manuel Indian",
  TP: "Twin Peaks County",
  TR: "Trona County",
  TW: "Twentynine Palms City",
  VC: "Victorville City",
  VT: "Victor Valley Transit",
  VV: "Victor Valley County",
  WE: "West End County",
  YC: "Yucaipa City",
  YU: "Yucaipa County",
  YV: "Yucca Valley",
  // Riverside County divisions
  "RC-A": "Blythe",
  "RC-B": "Beaumont/Banning",
  "RC-C": "Coachella",
  "RC-CM": "Calimesa",
  "RC-D": "Desert Hot Springs",
  "RC-E": "Eastvale",
  "RC-EV": "Eastvale",
  "RC-F": "Foothill",
  "RC-G": "Garner Valley",
  "RC-I": "Indio",
  "RC-J": "Jurupa",
  "RC-JV": "Jurupa Valley",
  "RC-L": "Lake Elsinore",
  "RC-LA": "La Quinta",
  "RC-MM": "Mid-Valley",
  "RC-MV": "Moreno Valley",
  "RC-O": "Oak Valley",
  "RC-PC": "Palm Canyon",
  "RC-PE": "Perris",
  "RC-S": "San Jacinto",
  "RC-SW": "Southwest",
  "RC-T": "Temecula",
  "RC-TE": "Temecula",
  "RC-WI": "Wilson Valley",
  "RC-Y": "Coachella Valley"
};
var AGENCY_COLORS = {
  AP: "#22c55e",
  VC: "#3b82f6",
  HE: "#f97316",
  VV: "#8b5cf6",
  SB: "#ef4444",
  BA: "#06b6d4",
  FN: "#ec4899",
  CH: "#eab308",
  BB: "#14b8a6",
  BL: "#14b8a6",
  HI: "#a855f7",
  LL: "#6366f1",
  RC: "#f43f5e",
  YC: "#84cc16",
  YU: "#84cc16",
  CR: "#0ea5e9",
  NE: "#d946ef",
  MB: "#78716c",
  WE: "#78716c",
  TR: "#78716c",
  TW: "#78716c",
  TP: "#78716c",
  AV: "#78716c",
  SM: "#78716c",
  AD: "#a3a3a3",
  AL: "#a3a3a3",
  CB: "#a3a3a3",
  GT: "#a3a3a3",
  VT: "#a3a3a3",
  YV: "#a3a3a3",
  // Riverside County
  "RC-PE": "#f59e0b",
  "RC-MV": "#06b6d4",
  "RC-TE": "#8b5cf6",
  "RC-JV": "#ec4899",
  "RC-Y": "#22c55e",
  "RC-HE": "#f97316",
  "RC-BE": "#6366f1",
  "RC-LE": "#14b8a6",
  "RC-CM": "#a855f7"
};
var AGENCY_GEO = {
  AP: "Apple Valley, CA",
  VC: "Victorville, CA",
  HE: "Hesperia, CA",
  VV: "Victor Valley, CA",
  SB: "San Bernardino, CA",
  BA: "Barstow, CA",
  FN: "Fontana, CA",
  CH: "Chino Hills, CA",
  BB: "Big Bear, CA",
  BL: "Big Bear Lake, CA",
  HI: "Highland, CA",
  LL: "Loma Linda, CA",
  RC: "Rancho Cucamonga, CA",
  YC: "Yucaipa, CA",
  YU: "Yucaipa, CA",
  CR: "Needles, CA",
  NE: "Needles, CA",
  MB: "Yucca Valley, CA",
  WE: "Needles, CA",
  TR: "Trona, CA",
  TW: "Twentynine Palms, CA",
  TP: "Twin Peaks, CA",
  AV: "Adelanto, CA",
  SM: "San Manuel, CA",
  AD: "Adelanto, CA",
  AL: "Arrowhead, CA",
  CB: "Colorado River, CA",
  GT: "Grand Terrace, CA",
  VT: "Victorville, CA",
  YV: "Yucca Valley, CA",
  // Riverside County
  "RC-PE": "Perris, CA",
  "RC-MV": "Moreno Valley, CA",
  "RC-TE": "Temecula, CA",
  "RC-JV": "Jurupa Valley, CA",
  "RC-Y": "Palm Desert, CA",
  "RC-HE": "Hemet, CA",
  "RC-BE": "Banning, CA",
  "RC-LE": "Lake Elsinore, CA",
  "RC-CM": "Calimesa, CA"
};
// The health denominator: `total_agencies` is this array's length and `degraded`
// is (total - reporting) > 3, so a code that never returns rows keeps the flag
// pinned on. AL, CB, RC-HE, RC-BE and RC-LE produced no rows across the whole
// eight-day retention window; with them the ceiling was 34 of 39, which made
// `degraded: true` structural. Dropped 2026-11-09 by the owner's decision.
// This list also drives the ASP.NET city query, so those five are no longer
// polled there; rows for them from another source would still be stored, just
// not counted here.
var ALL_AGENCY_CODES = [
  "AD",
  "AP",
  "AV",
  "BA",
  "BB",
  "BL",
  "CH",
  "CR",
  "FN",
  "GT",
  "HE",
  "HI",
  "LL",
  "MB",
  "NE",
  "RC",
  "SB",
  "SM",
  "TP",
  "TR",
  "TW",
  "VC",
  "VT",
  "VV",
  "WE",
  "YC",
  "YU",
  "YV",
  // Riverside County divisions
  "RC-PE",
  "RC-MV",
  "RC-TE",
  "RC-JV",
  "RC-Y",
  "RC-CM"
];
var AGENCY_CENTERS = {
  AP: [34.5011, -117.1859],
  VC: [34.5362, -117.2928],
  HE: [34.4264, -117.3008],
  VV: [34.484, -117.341],
  SB: [34.1083, -117.2898],
  BA: [34.8958, -117.0173],
  FN: [34.0922, -117.435],
  CH: [33.9925, -117.6982],
  BB: [34.2439, -116.8625],
  BL: [34.2439, -116.8625],
  HI: [34.1267, -117.207],
  LL: [34.0484, -117.2513],
  RC: [34.1222, -117.5695],
  YC: [34.0111, -117.0481],
  YU: [34.0111, -117.0481],
  CR: [34.484, -114.3225],
  NE: [34.848, -114.6144],
  MB: [34.0633, -116.3481],
  WE: [34.4, -114.5],
  TR: [35.7688, -117.3731],
  TW: [34.1364, -116.3481],
  TP: [34.1364, -116.3481],
  AV: [34.5, -117.1859],
  SM: [34.1364, -117.16],
  AD: [34.5828, -117.4092],
  AL: [34.5, -117.1859],
  CB: [34.484, -114.3225],
  GT: [34.0167, -117.3831],
  VT: [34.484, -117.341],
  YV: [34.0556, -116.4192],
  "RC-A": [33.6103, -114.5964],
  "RC-B": [33.9295, -116.977],
  "RC-BE": [33.9256, -116.8765],
  "RC-C": [33.6803, -116.1739],
  "RC-CM": [33.9922, -117.0647],
  "RC-D": [33.9611, -116.5447],
  "RC-E": [33.9525, -117.5425],
  "RC-EV": [33.9525, -117.5425],
  "RC-F": [33.8595, -117.5648],
  "RC-G": [33.6636, -116.6819],
  "RC-HE": [33.7475, -116.9719],
  "RC-I": [33.7206, -116.2156],
  "RC-J": [34.0086, -117.4912],
  "RC-JV": [34.0086, -117.4912],
  "RC-L": [33.6681, -117.3273],
  "RC-LA": [33.6542, -116.2901],
  "RC-LE": [33.6681, -117.3273],
  "RC-MM": [33.9375, -117.2305],
  "RC-MV": [33.9375, -117.2305],
  "RC-O": [33.9319, -116.9189],
  "RC-PC": [33.8303, -116.5453],
  "RC-PE": [33.7825, -117.2287],
  "RC-S": [33.7953, -116.9586],
  "RC-SW": [33.5539, -117.2139],
  "RC-T": [33.5033, -117.1238],
  "RC-TE": [33.5033, -117.1238],
  "RC-WI": [33.64, -116.86],
  "RC-Y": [33.7206, -116.2156]
};
var AGENCY_LABELS = Object.fromEntries(
  Object.entries(AGENCY_NAMES).map(([code, name]) => [
    code,
    name.replace(/ (City|County|Indian|Transit)$/, "").trim()
  ])
);
var SEVERITY_MAP = {};
for (const [code, ct] of Object.entries(CALL_TYPES)) {
  SEVERITY_MAP[code.toUpperCase()] = ct.severity || "low";
}
for (const [code, ct] of Object.entries(RC_CALL_TYPES)) {
  SEVERITY_MAP[code.toUpperCase()] = ct.severity || "low";
}
var WEB_DATA = {
  colors: AGENCY_COLORS,
  centers: AGENCY_CENTERS,
  labels: AGENCY_LABELS,
  severity: SEVERITY_MAP,
  callTypeDescs: Object.fromEntries([
    ...Object.entries(CALL_TYPES).map(([code, ct]) => [code.toUpperCase(), ct.desc]),
    ...Object.entries(RC_CALL_TYPES).map(([code, ct]) => [code.toUpperCase(), ct.desc])
  ]),
  sevColors: { high: "#ef4444", medium: "#f59e0b", low: "#22c55e" },
  sevIcons: { high: "\u26A0", medium: "\u25CF", low: "\u25CB" }
};
function lookupCallType(code) {
  if (!code) return null;
  const normalized = code.toUpperCase().trim();
  return CALL_TYPES[normalized] || null;
}
__name(lookupCallType, "lookupCallType");
function lookupRcCallType(desc) {
  if (!desc) return null;
  const normalized = desc.toUpperCase().trim();
  return RC_CALL_TYPES[normalized] || null;
}
__name(lookupRcCallType, "lookupRcCallType");
function lookupDispo(code) {
  if (!code) return null;
  const normalized = code.toUpperCase().trim();
  return DISPOSITIONS[normalized] || RC_DISPOSITIONS[normalized] || null;
}
__name(lookupDispo, "lookupDispo");
var FREE_LIMITS = {
  workers_requests: { limit: 1e5, period: "day", unit: "requests" },
  workers_cpu_ms: { limit: 10, period: "invocation", unit: "ms" },
  workers_subrequests: { limit: 50, period: "invocation", unit: "subrequests" },
  kv_reads: { limit: 1e5, period: "day", unit: "reads" },
  kv_writes: { limit: 1e3, period: "day", unit: "writes" },
  kv_storage_bytes: { limit: 1073741824, period: "static", unit: "bytes" },
  d1_rows_read: { limit: 5e6, period: "day", unit: "rows" },
  d1_rows_written: { limit: 1e5, period: "day", unit: "rows" },
  d1_storage_bytes: { limit: 536870912, period: "static", unit: "bytes" },
  r2_storage_bytes: { limit: 10737418240, period: "month", unit: "bytes" },
  r2_class_a_ops: { limit: 1e6, period: "month", unit: "ops" },
  r2_class_b_ops: { limit: 1e7, period: "month", unit: "ops" }
};
var PAID_LIMITS = {
  workers_requests: { limit: 1e7, period: "month", unit: "requests", overage: 0.3, overage_unit: "million" },
  workers_cpu_ms: { limit: 3e7, period: "month", unit: "ms", overage: 0.02, overage_unit: "million" },
  workers_subrequests: { limit: 1e4, period: "invocation", unit: "subrequests" },
  kv_reads: { limit: 1e7, period: "month", unit: "reads", overage: 0.5, overage_unit: "million" },
  kv_writes: { limit: 1e6, period: "month", unit: "writes", overage: 5, overage_unit: "million" },
  kv_storage_bytes: { limit: 1073741824, period: "static", unit: "bytes" },
  d1_rows_read: { limit: 25e9, period: "month", unit: "rows", overage: 1e-3, overage_unit: "million" },
  d1_rows_written: { limit: 5e7, period: "month", unit: "rows", overage: 1, overage_unit: "million" },
  d1_storage_bytes: { limit: 107374182400, period: "static", unit: "bytes" },
  r2_storage_bytes: { limit: Infinity, period: "static", unit: "bytes" },
  r2_class_a_ops: { limit: Infinity, period: "month", unit: "ops" },
  r2_class_b_ops: { limit: Infinity, period: "month", unit: "ops" }
};
function todayKey() {
  return (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
}
__name(todayKey, "todayKey");
function monthKey() {
  return (/* @__PURE__ */ new Date()).toISOString().slice(0, 7);
}
__name(monthKey, "monthKey");
function getMetricsLimits(plan = "paid") {
  return plan === "paid" ? { ...PAID_LIMITS } : { ...FREE_LIMITS };
}
__name(getMetricsLimits, "getMetricsLimits");
async function getMetricsSnapshot(env) {
  const limits = getMetricsLimits("paid");
  const result = {};
  for (const [metricName, info] of Object.entries(limits)) {
    let key;
    if (info.period === "day") key = `m:${todayKey()}:${metricName}`;
    else if (info.period === "month") key = `mm:${monthKey()}:${metricName}`;
    else continue;
    const data = await env.DISPATCH_KV.get(key, "json");
    const used = data?.count || 0;
    const limit = info.limit;
    const pct = limit === Infinity ? 0 : Math.min(100, used / limit * 100);
    const remaining = limit === Infinity ? Infinity : Math.max(0, limit - used);
    let estimatedCost = 0;
    if (info.overage && used > limit) {
      const overUnits = (used - limit) / 1e6;
      estimatedCost = Math.ceil(overUnits) * info.overage;
    }
    result[metricName] = {
      used,
      limit,
      limit_display: limit === Infinity ? "unlimited" : limit,
      period: info.period,
      unit: info.unit,
      percentage: Math.round(pct * 100) / 100,
      remaining,
      estimatedCost: Math.round(estimatedCost * 100) / 100,
      warning: pct > 80,
      critical: pct > 95
    };
  }
  return result;
}
__name(getMetricsSnapshot, "getMetricsSnapshot");
var ASPNET_URL = "https://mediasummary.shr.sbcounty.gov/";
var WP_BASE = "https://wp.sbcounty.gov/sheriff/wp-json/wp/v2";
var RC_API_URL = "https://publicaccess.riversidesheriff.org/api/publicaccess/incidents";
function extractToken(html, name) {
  const inputRe = new RegExp(`<input[^>]*name="${name}"[^>]*>`, "i");
  const inputMatch = html.match(inputRe);
  if (!inputMatch) return "";
  const valRe = /value="([^"]+)"/i;
  const valMatch = inputMatch[0].match(valRe);
  return valMatch ? valMatch[1] : "";
}
__name(extractToken, "extractToken");
function parseHtmlTable(html) {
  const rows = [];
  const tableMatch = html.match(/<table[^>]*id="GridView1"[^>]*>([\s\S]*?)<\/table>/i);
  if (!tableMatch) return rows;
  const tableHtml = tableMatch[1];
  const trRegex = /<tr[^>]*>([\s\S]*?)<\/tr>/gi;
  let trMatch;
  let isHeader = true;
  while ((trMatch = trRegex.exec(tableHtml)) !== null) {
    if (isHeader) {
      isHeader = false;
      continue;
    }
    const cells = [];
    const tdRegex = /<td[^>]*>([\s\S]*?)<\/td>/gi;
    let tdMatch;
    while ((tdMatch = tdRegex.exec(trMatch[1])) !== null) {
      let val = tdMatch[1].replace(/<[^>]+>/g, "").replace(/&nbsp;/g, "").replace(/&amp;/g, "&").trim();
      cells.push(val);
    }
    if (cells.length >= 7) {
      rows.push({
        call_date_raw: cells[0],
        agency: cells[1],
        call_no: cells[2],
        report_no: cells[3],
        call_type: cells[4],
        dispo: cells[5],
        location: cells[6]
      });
    }
  }
  return rows;
}
__name(parseHtmlTable, "parseHtmlTable");
async function scrapeAspNet(env) {
  const results = {};
  const errors = [];
  const initResp = await fetch(ASPNET_URL, {
    headers: { "User-Agent": "Mozilla/5.0 (compatible; SBCountyScraper/1.0)" },
    signal: AbortSignal.timeout(1e4)
  });
  if (initResp.status === 429) { await env.DISPATCH_KV.put('meta:rate_limited', JSON.stringify(Date.now())); return { results: {}, errors: [{ agency: 'ALL', error: 'Rate limited (429) by source site' }] }; }
  const setCookies = initResp.headers.getSetCookie?.() || [];
  const antiXsrf = (setCookies.find((c) => c.startsWith("__AntiXsrfToken=")) || "").split(";")[0];
  const initHtml = await initResp.text();
  let viewState = extractToken(initHtml, "__VIEWSTATE");
  let viewStateGen = extractToken(initHtml, "__VIEWSTATEGENERATOR");
  let eventValidation = extractToken(initHtml, "__EVENTVALIDATION");
  for (const code of ALL_AGENCY_CODES) {
    try {
      const body = new URLSearchParams({
        "__VIEWSTATE": viewState,
        "__VIEWSTATEGENERATOR": viewStateGen,
        "__EVENTVALIDATION": eventValidation,
        "ctl00$MainContent$ddCity": code
      });
      const resp = await fetch(ASPNET_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "User-Agent": "Mozilla/5.0 (compatible; SBCountyScraper/1.0)",
          ...antiXsrf ? { "Cookie": antiXsrf } : {}
        },
        body: body.toString(),
        signal: AbortSignal.timeout(1e4)
      });
      const html = await resp.text();
      const newVS = extractToken(html, "__VIEWSTATE");
      const newEV = extractToken(html, "__EVENTVALIDATION");
      if (newVS) viewState = newVS;
      if (newEV) eventValidation = newEV;
      const rows = parseHtmlTable(html);
      results[code] = rows;
    } catch (err) {
      errors.push({ code, error: err.message });
      results[code] = [];
    }
  }
  return { results, errors };
}
__name(scrapeAspNet, "scrapeAspNet");
async function scrapeWordPress(env) {
  const results = [];
  let page = 1;
  let hasMore = true;
  while (hasMore && page <= 20) {
    try {
      const resp = await fetch(`${WP_BASE}/pages?per_page=100&page=${page}&_fields=id,title,content`, {
        headers: { "User-Agent": "Mozilla/5.0 (compatible; SBCountyScraper/1.0)" }
      });
      if (!resp.ok) break;
      const data = await resp.json();
      if (!data || data.length === 0) {
        hasMore = false;
        break;
      }
      for (const post of data) {
        const content = post.content?.rendered || "";
        if (!/<table/i.test(content)) continue;
        if (!/call\s*(no|type|date)/i.test(content) && !/dispatch/i.test(content)) continue;
        const tableMatch = content.match(/<table[^>]*>([\s\S]*?)<\/table>/i);
        if (!tableMatch) continue;
        const rows = parseHtmlTable(tableMatch[0]);
        for (const row of rows) {
          results.push({ ...row, source: "wordpress", wp_id: post.id });
        }
      }
      page++;
    } catch {
      break;
    }
  }
  return results;
}
__name(scrapeWordPress, "scrapeWordPress");
async function scrapeRiversideCounty(env) {
  const results = [];
  const stations = ["desert", "southwest", "moreno", "central", "jurupa"];
  const errors = [];
  for (const station of stations) {
    try {
      let page = 1;
      let hasMore = true;
      let stationRows = 0;
      while (hasMore && page <= 5) {
        const url = `${RC_API_URL}?PageNumber=${page}&PageSize=50&Cd_Station=${station}`;
        const resp = await fetch(url, {
          headers: {
            "Accept": "application/json, text/plain, */*",
            "Referer": "https://publicaccess.riversidesheriff.org/",
            "Origin": "https://publicaccess.riversidesheriff.org",
            "User-Agent": "Mozilla/5.0 (compatible; SBCountyScraper/1.0)"
          },
          signal: AbortSignal.timeout(15e3)
        });
        if (!resp.ok) {
          errors.push({ station, error: `HTTP ${resp.status}` });
          break;
        }
        const data = await resp.json();
        const pagination = JSON.parse(resp.headers.get("x-pagination") || "{}");
        for (const row of data) {
          results.push({
            call_date_raw: row.cd_Received || "",
            agency: `RC-${row.cd_Div || station.charAt(0).toUpperCase()}`,
            call_no: row.cd_Inc_ID || "",
            report_no: "",
            call_type: row.cd_Call_Type || "",
            dispo: row.cd_Disposition || "",
            location: row.cd_Address || "",
            county: "RC",
            station,
            area: row.cd_Area || ""
          });
          stationRows++;
        }
        hasMore = page < (pagination.TotalPages || 1);
        page++;
      }
    } catch (err) {
      errors.push({ station, error: err.message });
    }
  }
  return { results, errors };
}
__name(scrapeRiversideCounty, "scrapeRiversideCounty");
async function runScraper(env) {
  const startTime = Date.now();
  const { results: aspNetResults, errors: aspNetErrors } = await scrapeAspNet(env);
  const wpResults = await scrapeWordPress(env);
  const { results: rcResults, errors: rcErrors } = await scrapeRiversideCounty(env);
  let totalRows = 0;
  for (const rows of Object.values(aspNetResults)) totalRows += rows.length;
  totalRows += wpResults.length;
  totalRows += rcResults.length;
  return {
    aspNet: aspNetResults,
    aspNetErrors,
    wordpress: wpResults,
    riverside: rcResults,
    riversideErrors: rcErrors,
    stats: {
      agencies_scraped: Object.keys(aspNetResults).length,
      total_rows: totalRows,
      aspNet_errors: aspNetErrors.length,
      wp_rows: wpResults.length,
      rc_rows: rcResults.length,
      rc_errors: rcErrors.length,
      duration_ms: Date.now() - startTime,
      scraped_at: (/* @__PURE__ */ new Date()).toISOString()
    }
  };
}
__name(runScraper, "runScraper");
function contentHash(record) {
  const str = `${record.call_no}|${record.call_date}|${record.agency}|${record.call_type}|${record.location}`;
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const chr = str.charCodeAt(i);
    hash = (hash << 5) - hash + chr;
    hash |= 0;
  }
  return "h" + Math.abs(hash).toString(36) + str.length.toString(36);
}
__name(contentHash, "contentHash");
function normalizeRecord(raw) {
  const callDate = raw.call_date_raw || raw.call_date || "";
  const isRc = raw.county === "RC" || raw.agency && raw.agency.startsWith("RC-");
  const ct = isRc ? lookupRcCallType(raw.call_type) : lookupCallType(raw.call_type);
  const dp = lookupDispo(raw.dispo);
  const cleaned = (raw.location || "").replace(/&amp;/g, "&").replace(/,\s*[A-Z]{2,4}$/, "").trim();
  return {
    call_date: callDate,
    call_type: raw.call_type || "",
    call_type_desc: ct?.desc || "Unknown",
    location: raw.location || "",
    location_clean: cleaned,
    agency: raw.agency || "",
    agency_name: AGENCY_NAMES[raw.agency] || raw.agency,
    call_no: raw.call_no || "",
    report_no: raw.report_no || "",
    dispo: raw.dispo || "",
    dispo_desc: dp?.desc || "Unknown",
    severity: ct?.severity || "unknown",
    category: ct?.category || "Unknown",
    source: raw.source || (isRc ? "riverside_api" : "aspnet"),
    county: raw.county || "SB"
  };
}
__name(normalizeRecord, "normalizeRecord");
async function storeSnapshot(env, agencyCode, records, timestamp) {
  const ts = timestamp || (/* @__PURE__ */ new Date()).toISOString();
  const datePath = ts.slice(0, 10).replace(/-/g, "/");
  const timePath = ts.slice(11, 19).replace(/:/g, "");
  const key = `snapshots/${datePath}/${timePath}/${agencyCode}.json`;
  await env.DISPATCH_R2.put(key, JSON.stringify(records, null, 2), {
    httpMetadata: { contentType: "application/json" }
  });
  return key;
}
__name(storeSnapshot, "storeSnapshot");
async function storeFullSnapshot(env, allResults, timestamp) {
  const ts = timestamp || (/* @__PURE__ */ new Date()).toISOString();
  const datePath = ts.slice(0, 10).replace(/-/g, "/");
  const timePath = ts.slice(11, 19).replace(/:/g, "");
  const key = `snapshots/${datePath}/${timePath}/all.json`;
  const allRecords = [];
  for (const [code, rows] of Object.entries(allResults)) {
    allRecords.push(...rows.map((r) => ({ ...r, agency: code })));
  }
  await env.DISPATCH_R2.put(key, JSON.stringify({
    timestamp: ts,
    total_records: allRecords.length,
    agencies: Object.keys(allResults),
    records: allRecords
  }, null, 2), {
    httpMetadata: { contentType: "application/json" }
  });
  return key;
}
__name(storeFullSnapshot, "storeFullSnapshot");
async function processScrapeResults(env, scrapeResults) {
  const startTime = Date.now();
  const allRecords = [];
  for (const [code, rows] of Object.entries(scrapeResults.aspNet)) {
    for (const row of rows) {
      allRecords.push({ ...row, agency: code, source: "aspnet", county: "SB" });
    }
  }
  for (const row of scrapeResults.wordpress) {
    allRecords.push({ ...row, county: "SB" });
  }
  for (const row of scrapeResults.riverside || []) {
    allRecords.push(row);
  }
  let stored = 0, skipped = 0;
  const latestByAgency = {};
  const pendingGeo = [];
  const BATCH_SIZE = 25;
  for (let i = 0; i < allRecords.length; i += BATCH_SIZE) {
    const batch = allRecords.slice(i, i + BATCH_SIZE);
    const items = batch.map((record) => {
      const normalized = normalizeRecord(record);
      const hash = contentHash(normalized);
      const enriched = { ...normalized, hash, geocoded: null, scraped_at: scrapeResults.stats.scraped_at || (/* @__PURE__ */ new Date()).toISOString() };
      latestByAgency[record.agency] = enriched;
      return { normalized, hash, enriched };
    });
    const stmts = items.map(
      ({ normalized, hash, enriched }) => env.DISPATCH_D1.prepare(
        `INSERT OR IGNORE INTO dispatch_calls
         (hash, call_date, call_type, call_type_desc, location, location_clean,
          agency, call_no, report_no, dispo, dispo_desc, severity, category, raw_json, scraped_at, county,
          lat, lng, geo_source, geocoded_at)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
      ).bind(
        hash,
        normalized.call_date,
        normalized.call_type,
        normalized.call_type_desc,
        normalized.location,
        normalized.location_clean,
        normalized.agency,
        normalized.call_no,
        normalized.report_no,
        normalized.dispo,
        normalized.dispo_desc,
        normalized.severity,
        normalized.category,
        JSON.stringify(enriched),
        enriched.scraped_at,
        normalized.county || "SB",
        null,
        null,
        null,
        null
      )
    );
    try {
      const results = await env.DISPATCH_D1.batch(stmts);
      for (let j = 0; j < results.length; j++) {
        if (results[j].meta?.changes > 0) {
          stored++;
          pendingGeo.push({
            hash: items[j].hash,
            agency: items[j].normalized.agency,
            location_clean: items[j].normalized.location_clean
          });
        } else {
          skipped++;
        }
      }
    } catch (err) {
      skipped += batch.length;
      console.error(`Batch ${i / BATCH_SIZE} failed:`, err.message, `(${batch.length} records skipped)`);
      if (err.message?.includes("429")) {
        await new Promise((r) => setTimeout(r, 2e3));
      }
    }
  }
  const latestKeys = Object.keys(latestByAgency);
  for (let i = 0; i < latestKeys.length; i += 5) {
    const chunk = latestKeys.slice(i, i + 5);
    await Promise.all(chunk.map(async (agency) => {
      try {
        await env.DISPATCH_KV.put(`latest:${agency}`, JSON.stringify(latestByAgency[agency]));
      } catch {
      }
    }));
  }
  for (const [code, rows] of Object.entries(scrapeResults.aspNet)) {
    if (rows.length > 0) {
      try {
        await storeSnapshot(env, code, rows, scrapeResults.stats.scraped_at);
      } catch {
      }
    }
  }
  try {
    await storeFullSnapshot(env, scrapeResults.aspNet, scrapeResults.stats.scraped_at);
  } catch {
  }
  await env.DISPATCH_KV.put("meta:last_run", JSON.stringify({
    timestamp: scrapeResults.stats.scraped_at,
    stored,
    skipped,
    total: allRecords.length,
    agencies: Object.keys(scrapeResults.aspNet).length,
    rc_rows: scrapeResults.stats.rc_rows || 0,
    duration_ms: Date.now() - startTime
  }));
  return { stored, skipped, total: allRecords.length, duration_ms: Date.now() - startTime, pending_geo: pendingGeo };
}
__name(processScrapeResults, "processScrapeResults");
var NOMINATIM_URL = "https://nominatim.openstreetmap.org/search";
var RATE_LIMIT_MS = 1100;
var CACHE_TTL = 86400 * 90;
var MISS_TTL = 86400;
var BBOX = {
  minLat: 32.5,
  maxLat: 36.3,
  minLng: -118.6,
  maxLng: -113.5
};
var lastRequestTime = 0;
function stripAgencyCode(location) {
  return location.replace(/&amp;/g, "&").replace(/,\s*[A-Z]{2,4}$/, "").trim();
}
__name(stripAgencyCode, "stripAgencyCode");
function formatForGeocoding(cleanedLocation, agencyCode) {
  const city = AGENCY_GEO[agencyCode] || "San Bernardino County, CA";
  let loc = cleanedLocation.replace(/\s+/g, " ").replace(/&/g, " & ").trim();
  return `${loc}, ${city}`;
}
__name(formatForGeocoding, "formatForGeocoding");
function inBBox(lat, lng) {
  return lat >= BBOX.minLat && lat <= BBOX.maxLat && lng >= BBOX.minLng && lng <= BBOX.maxLng;
}
__name(inBBox, "inBBox");
async function rateLimitWait() {
  const now = Date.now();
  const elapsed = now - lastRequestTime;
  if (elapsed < RATE_LIMIT_MS) {
    await new Promise((r) => setTimeout(r, RATE_LIMIT_MS - elapsed));
  }
  lastRequestTime = Date.now();
}
__name(rateLimitWait, "rateLimitWait");
async function geocodeWithNominatim(query) {
  await rateLimitWait();
  const params = new URLSearchParams({
    q: query,
    format: "json",
    limit: "1",
    countrycodes: "us",
    viewbox: `${BBOX.minLng},${BBOX.maxLat},${BBOX.maxLng},${BBOX.minLat}`,
    bounded: "1"
  });
  const resp = await fetch(`${NOMINATIM_URL}?${params}`, {
    headers: { "User-Agent": "SBCountyDispatchScraper/1.0 (research)" }
  });
  if (!resp.ok) return null;
  const data = await resp.json();
  if (!data || data.length === 0) return null;
  const lat = parseFloat(data[0].lat);
  const lon = parseFloat(data[0].lon);
  if (!Number.isFinite(lat) || !Number.isFinite(lon) || !inBBox(lat, lon)) return null;
  return { lat, lon, display_name: data[0].display_name };
}
__name(geocodeWithNominatim, "geocodeWithNominatim");
async function kvGet(env, key) {
  try {
    return await env.DISPATCH_KV.get(key, "json");
  } catch {
    return null;
  }
}
__name(kvGet, "kvGet");
async function kvPut(env, key, value, ttl) {
  try {
    await env.DISPATCH_KV.put(key, JSON.stringify(value), { expirationTtl: ttl });
  } catch {
  }
}
__name(kvPut, "kvPut");
function cleanLocation(rawLocation) {
  return stripAgencyCode(rawLocation || "");
}
__name(cleanLocation, "cleanLocation");
async function lookupCached(env, agencyCode, cleaned) {
  const cached = await kvGet(env, `g:${agencyCode}:${cleaned}`);
  if (!cached) return { hit: false };
  if (cached.miss) return { hit: true, geo: null };
  if (Number.isFinite(cached.lat) && Number.isFinite(cached.lon)) {
    return { hit: true, geo: cached };
  }
  return { hit: false };
}
__name(lookupCached, "lookupCached");
async function geocodeFresh(env, agencyCode, cleaned) {
  const query = formatForGeocoding(cleaned, agencyCode);
  try {
    const result = await geocodeWithNominatim(query);
    if (result) {
      await kvPut(env, `g:${agencyCode}:${cleaned}`, result, CACHE_TTL);
      return result;
    }
    await kvPut(env, `g:${agencyCode}:${cleaned}`, { miss: true, at: Date.now() }, MISS_TTL);
    return null;
  } catch {
    return null;
  }
}
__name(geocodeFresh, "geocodeFresh");
async function updateRows(env, hashes, geo) {
  for (let i = 0; i < hashes.length; i += 50) {
    const chunk = hashes.slice(i, i + 50);
    const placeholders = chunk.map(() => "?").join(",");
    try {
      await env.DISPATCH_D1.prepare(
        `UPDATE dispatch_calls
         SET lat = ?, lng = ?, geo_source = 'geocoded', geocoded_at = ?
         WHERE hash IN (${placeholders})`
      ).bind(geo.lat, geo.lon, (/* @__PURE__ */ new Date()).toISOString(), ...chunk).run();
    } catch {
    }
  }
}
__name(updateRows, "updateRows");
async function geocodePendingRecords(env, pendingGeo, budget = 40) {
  const started = Date.now();
  const byPair = /* @__PURE__ */ new Map();
  for (const item of pendingGeo || []) {
    const clean = cleanLocation(item.location_clean);
    if (!clean || clean === "*") continue;
    const key = `${item.agency}|${clean}`;
    if (!byPair.has(key)) byPair.set(key, []);
    byPair.get(key).push(item.hash);
  }
  let updated = 0, unresolved = 0, apiCalls = 0, deferred = 0;
  for (const [key, hashes] of byPair) {
    const [agency, clean] = key.split("|");
    let cached = null;
    try {
      cached = await lookupCached(env, agency, clean);
    } catch {
    }
    let geo = null;
    if (cached.hit) {
      geo = cached.geo;
    } else if (apiCalls < budget) {
      apiCalls++;
      geo = await geocodeFresh(env, agency, clean);
    } else {
      deferred += hashes.length;
      continue;
    }
    if (geo && Number.isFinite(geo.lat)) {
      await updateRows(env, hashes, geo);
      updated += hashes.length;
    } else {
      unresolved += hashes.length;
    }
  }
  return {
    pairs: byPair.size,
    updated,
    unresolved,
    api_calls: apiCalls,
    deferred,
    duration_ms: Date.now() - started
  };
}
__name(geocodePendingRecords, "geocodePendingRecords");
function json(data, status = 200, extraHeaders = {}) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*", ...extraHeaders }
  });
}
__name(json, "json");
/**
 * How many agencies actually reported this cycle.
 *
 * runScraper() returns { aspNet, wordpress, riverside, stats, errors } — there is no
 * `results` property. Reading one made every health record claim 0 of 39 agencies
 * reporting, and `degraded` is computed as (total - reporting) > 3, so it was pinned
 * to true no matter what the pipeline did. An agency counts when it returned rows.
 */
function countReportingAgencies(scrapeResults, configured = ALL_AGENCY_CODES) {
  const allowed = new Set(configured || []);
  const reported = /* @__PURE__ */ new Set();
  const buckets = scrapeResults?.aspNet || {};
  for (const [code, rows] of Object.entries(buckets)) {
    if ((rows || []).length > 0) reported.add(code);
  }
  for (const row of scrapeResults?.riverside || []) {
    if (row && row.agency) reported.add(row.agency);
  }
  for (const row of scrapeResults?.wordpress || []) {
    if (row && row.agency) reported.add(row.agency);
  }
  let count = 0;
  for (const code of reported) {
    if (allowed.has(code)) count++;
  }
  return count;
}
__name(countReportingAgencies, "countReportingAgencies");

/**
 * When the next run should start, measured from when this one finished.
 *
 * Scheduling from the start time (now + interval) meant that a run lasting longer
 * than its interval — 185s against a 180s fast-mode interval — wrote `next_scrape`
 * in the past, so the very next minute's tick started a fresh scrape with no idle
 * gap. Measure from the finish instead.
 *
 * Deliberately not called nextScrapeAt: scheduled() already binds a local
 * `nextScrapeAt` (the KV lock deadline), so a module-level function of that name
 * is shadowed there and the call resolves to a number.
 */
function computeNextScrapeAt(finishedAt, intervalMs) {
  return finishedAt + intervalMs;
}
__name(computeNextScrapeAt, "computeNextScrapeAt");

/**
 * The quiet-cycle interval: double the previous gap, held between the fast
 * interval and the fifteen-minute cap.
 *
 * The old code clamped `prevInterval * 2` to 15 min and then clamped _that_ up to
 * 15 min, so the result was 15 minutes whatever the input: one quiet cycle dropped
 * straight to the slowest pace and the backoff was dead code. The floor is the
 * fast interval, which makes the ramp real: 3 -> 6 -> 12 -> 15.
 */
function computeSlowInterval(prevIntervalMs, fastMs = 3 * 60 * 1e3, capMs = 15 * 60 * 1e3) {
  const doubled = (Number(prevIntervalMs) || 0) * 2;
  return Math.min(Math.max(doubled, fastMs), capMs);
}
__name(computeSlowInterval, "computeSlowInterval");
async function handleHealth(env) {
  const health = await env.DISPATCH_KV.get('meta:source_health', 'json');
  const lastRun = await env.DISPATCH_KV.get('meta:last_run', 'json');
  const rateLimited = await env.DISPATCH_KV.get('meta:rate_limited', 'json');
  const lastBackup = await env.DISPATCH_KV.get('meta:last_backup', 'json');
  const now = Date.now();
  return json({
    source: {
      reporting_agencies: health?.reporting || 0,
      total_agencies: health?.total || 0,
      errors: health?.errors || 0,
      error_details: health?.errorDetails || [],
      last_check: health?.timestamp || null,
      degraded: (health?.total || 0) - (health?.reporting || 0) > 3,
    },
    rate_limited: rateLimited ? { since: rateLimited, active: now - rateLimited < 5 * 60 * 1e3 } : null,
    last_run: lastRun,
    last_backup: lastBackup ? { timestamp: lastBackup, age_hours: Math.round((now - lastBackup) / 3.6e6) } : null,
  });
}
__name(handleHealth, "handleHealth");

async function handleQuality(env) {
  const total = await env.DISPATCH_D1.prepare('SELECT COUNT(*) as cnt FROM dispatch_calls').first();
  const withGeo = await env.DISPATCH_D1.prepare('SELECT COUNT(*) as cnt FROM dispatch_calls WHERE lat IS NOT NULL AND lng IS NOT NULL').first();
  const withDispo = await env.DISPATCH_D1.prepare('SELECT COUNT(*) as cnt FROM dispatch_calls WHERE dispo IS NOT NULL AND dispo != ""').first();
  const withLoc = await env.DISPATCH_D1.prepare('SELECT COUNT(*) as cnt FROM dispatch_calls WHERE location IS NOT NULL AND location != ""').first();
  const byAgency = await env.DISPATCH_D1.prepare('SELECT agency, COUNT(*) as cnt, SUM(CASE WHEN lat IS NOT NULL THEN 1 ELSE 0 END) as geocoded FROM dispatch_calls GROUP BY agency ORDER BY cnt DESC').all();
  const totalRows = total?.cnt || 0;
  return json({
    total_records: totalRows,
    completeness: {
      location_pct: totalRows ? Math.round((withLoc?.cnt || 0) / totalRows * 100) : 0,
      geocode_pct: totalRows ? Math.round((withGeo?.cnt || 0) / totalRows * 100) : 0,
      disposition_pct: totalRows ? Math.round((withDispo?.cnt || 0) / totalRows * 100) : 0,
    },
    by_agency: (byAgency.results || []).map(function(a) { return { agency: a.agency, count: a.cnt, geocode_pct: a.cnt ? Math.round(a.geocoded / a.cnt * 100) : 0 }; }),
  });
}
__name(handleQuality, "handleQuality");

async function handleBackupTrigger(env) {
  const now = Date.now();
  const result = await env.DISPATCH_D1.prepare('SELECT * FROM dispatch_calls').all();
  const backupKey = 'backups/' + new Date().toISOString().slice(0, 10) + '/dispatch_calls_manual.json';
  await env.DISPATCH_R2.put(backupKey, JSON.stringify(result.results || []), { httpMetadata: { contentType: 'application/json' } });
  await env.DISPATCH_KV.put('meta:last_backup', JSON.stringify(now));
  return json({ success: true, key: backupKey, rows: (result.results || []).length });
}
__name(handleBackupTrigger, "handleBackupTrigger");

async function handleListBackups(env) {
  const list = await env.DISPATCH_R2.list({ prefix: 'backups/' });
  return json({ backups: (list.objects || []).map(function(o) { return { key: o.key, size: o.size, uploaded: o.uploaded }; }) });
}
__name(handleListBackups, "handleListBackups");

async function handleDuplicateAnalysis(env) {
  const rows = await env.DISPATCH_D1.prepare(
    "SELECT hash, call_date, agency, location, call_type, call_type_desc FROM dispatch_calls ORDER BY call_date DESC LIMIT 5000"
  ).all();
  const records = rows.results || [];
  const byLocation = {};
  for (const r of records) {
    if (!r.location) continue;
    const key = r.location.toLowerCase().trim();
    if (!byLocation[key]) byLocation[key] = { location: r.location, count: 0, agencies: new Set(), call_types: new Set(), hashes: [], call_dates: [] };
    byLocation[key].count++;
    byLocation[key].agencies.add(r.agency);
    byLocation[key].call_types.add(r.call_type_desc || r.call_type);
    byLocation[key].hashes.push(r.hash);
    byLocation[key].call_dates.push(r.call_date);
  }
  const duplicates = Object.values(byLocation).filter(function(g) { return g.count >= 2 && g.agencies.size >= 2; }).map(function(g) { return { location: g.location, count: g.count, agencies: [...g.agencies], call_types: [...g.call_types], first_call: g.call_dates[g.call_dates.length - 1], last_call: g.call_dates[0] }; }).sort(function(a, b) { return b.count - a.count; }).slice(0, 50);
  return json({ duplicates, total_locations: Object.keys(byLocation).length, multi_agency_incidents: duplicates.length });
}
__name(handleDuplicateAnalysis, "handleDuplicateAnalysis");

async function handleSeverityTrend(env) {
  const rows = await env.DISPATCH_D1.prepare(
    "SELECT DATE(scraped_at) as day, severity, COUNT(*) as cnt FROM dispatch_calls WHERE severity IS NOT NULL AND severity != '' AND scraped_at > datetime('now', '-8 days') GROUP BY DATE(scraped_at), severity ORDER BY day DESC"
  ).all();
  const byDay = {};
  for (const r of rows.results || []) {
    if (!byDay[r.day]) byDay[r.day] = { date: r.day, high: 0, medium: 0, low: 0, total: 0 };
    byDay[r.day][r.severity || 'low'] = (byDay[r.day][r.severity || 'low'] || 0) + r.cnt;
    byDay[r.day].total += r.cnt;
  }
  return json({ trend: Object.values(byDay).sort(function(a, b) { return a.date.localeCompare(b.date); }) });
}
__name(handleSeverityTrend, "handleSeverityTrend");

async function handleDayOfWeek(env) {
  const rows = await env.DISPATCH_D1.prepare(
    "SELECT CAST(strftime('%w', scraped_at) AS INTEGER) as dow, category, COUNT(*) as cnt FROM dispatch_calls WHERE scraped_at > datetime('now', '-8 days') GROUP BY dow, category ORDER BY dow, cnt DESC"
  ).all();
  const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const byDay = {};
  for (const r of rows.results || []) {
    const day = dayNames[r.dow] || 'Unknown';
    if (!byDay[day]) byDay[day] = { day, total: 0, categories: {} };
    byDay[day].total += r.cnt;
    byDay[day].categories[r.category || 'Other'] = (byDay[day].categories[r.category || 'Other'] || 0) + r.cnt;
  }
  const days = dayNames.map(function(d) { return byDay[d] || { day: d, total: 0, categories: {} }; });
  const peak = days.reduce(function(a, b) { return b.total > a.total ? b : a; }, days[0]);
  return json({ days, peak_day: peak.day, peak_count: peak.total, insight: peak.day + ' sees the most calls (' + peak.total + ')' });
}
__name(handleDayOfWeek, "handleDayOfWeek");

async function handleResponseTimes(env) {
  const rows = await env.DISPATCH_D1.prepare(
    "SELECT agency, COUNT(*) as total, AVG(CASE WHEN dispo IS NOT NULL AND dispo != '' THEN 1 ELSE 0 END) as resolved_pct, COUNT(CASE WHEN severity = 'high' THEN 1 END) as high_sev FROM dispatch_calls GROUP BY agency ORDER BY total DESC"
  ).all();
  const leaderboard = (rows.results || []).map(function(r) { return { agency: r.agency, total_calls: r.total, resolution_rate_pct: Math.round((r.resolved_pct || 0) * 100), high_severity_calls: r.high_sev || 0 }; });
  return json({ leaderboard });
}
__name(handleResponseTimes, "handleResponseTimes");

async function handleZipDensity(env) {
  const rows = await env.DISPATCH_D1.prepare(
    "SELECT county, agency, COUNT(*) as calls, COUNT(CASE WHEN lat IS NOT NULL THEN 1 END) as geocoded, COUNT(DISTINCT location) as unique_locations FROM dispatch_calls GROUP BY county, agency ORDER BY calls DESC"
  ).all();
  return json({ density: rows.results || [] });
}
__name(handleZipDensity, "handleZipDensity");

async function handleRouteAlerts(request, env) {
  const body = await request.json();
  const startLat = parseFloat(body.start_lat), startLng = parseFloat(body.start_lng);
  const endLat = parseFloat(body.end_lat), endLng = parseFloat(body.end_lng);
  if (isNaN(startLat) || isNaN(startLng) || isNaN(endLat) || isNaN(endLng)) return json({ error: 'Invalid coordinates' }, 400);
  const radiusMi = parseFloat(body.radius_mi) || 2;
  const radiusDeg = radiusMi / 69;
  const rows = await env.DISPATCH_D1.prepare(
    "SELECT hash, call_date, call_type, call_type_desc, location, agency, lat, lng, severity, category FROM dispatch_calls WHERE lat IS NOT NULL AND lng IS NOT NULL AND lat BETWEEN ? AND ? AND lng BETWEEN ? AND ? ORDER BY scraped_at DESC LIMIT 100"
  ).bind(
    Math.min(startLat, endLat) - radiusDeg, Math.max(startLat, endLat) + radiusDeg,
    Math.min(startLng, endLng) - radiusDeg, Math.max(startLng, endLng) + radiusDeg
  ).all();
  const alerts = (rows.results || []).filter(function(r) {
    var latMin = Math.min(startLat, endLat) - radiusDeg, latMax = Math.max(startLat, endLat) + radiusDeg;
    var lngMin = Math.min(startLng, endLng) - radiusDeg, lngMax = Math.max(startLng, endLng) + radiusDeg;
    return r.lat >= latMin && r.lat <= latMax && r.lng >= lngMin && r.lng <= lngMax;
  });
  return json({ route: { start: { lat: startLat, lng: startLng }, end: { lat: endLat, lng: endLng }, radius_mi: radiusMi }, alerts, count: alerts.length });
}
__name(handleRouteAlerts, "handleRouteAlerts");

async function handleApi(request, env, ctx) {
  const url = new URL(request.url);
  const path = url.pathname;
  if (path === "/api/dispatch") return handleDispatchQuery(request, env);
  if (path === "/api/dispatch/latest") return handleLatest(request, env);
  if (path === "/api/dispatch/agencies") return handleAgencies(env);
  if (path === "/api/dispatch/stats") return handleStats(env);
  if (path === "/api/dispatch/geo") return handleGeo(request, env);
  if (path === "/api/geo/backfill" && request.method === "POST") return handleGeoBackfill(request, env);
  if (path === "/api/admin/cleanup" && request.method === "POST") return handleAdminCleanup(env);
  if (path === "/api/admin/migrate" && request.method === "POST") return handleAdminMigrate(env);
  if (path === "/api/admin/scrape" && request.method === "POST") return handleAdminScrape(env);
  if (path === "/api/admin/diag") return handleAdminDiag(env);
  if (path === "/api/geo/status") return handleGeoStatus(env);
  if (path === "/api/freshness") return handleFreshness(env);
  if (path === "/api/health") return handleHealth(env);
  if (path === "/api/quality") return handleQuality(env);
  if (path === "/api/backup" && request.method === "POST") return handleBackupTrigger(env);
  if (path === "/api/backups") return handleListBackups(env);
  if (path === "/api/analytics/duplicates") return handleDuplicateAnalysis(env);
  if (path === "/api/analytics/severity-trend") return handleSeverityTrend(env);
  if (path === "/api/analytics/day-of-week") return handleDayOfWeek(env);
  if (path === "/api/analytics/response-times") return handleResponseTimes(env);
  if (path === "/api/analytics/zip-density") return handleZipDensity(env);
  if (path === "/api/analytics/route-alerts" && request.method === "POST") return handleRouteAlerts(request, env);
  if (path.startsWith("/api/reports/") && request.method === "POST") return handleReportAction(request, env, path);
  if (path === "/api/reports" && request.method === "GET") return handleListReports(request, env);
  if (path === "/api/reports" && request.method === "POST") return handleCreateReport(request, env);
  if (path === "/api/codes") return handleCodes();
  if (path === "/api/metrics") return handleMetrics(env);
  if (path === "/api/scrape" && request.method === "POST") return handleScrapeTrigger(env, ctx);
  if (path === "/api/discover") return handleDiscover(env);
  return json({ error: "Not found" }, 404);
}
__name(handleApi, "handleApi");
async function handleDispatchQuery(request, env) {
  const url = new URL(request.url);
  const from = url.searchParams.get("from");
  const to = url.searchParams.get("to");
  const agency = url.searchParams.get("agency");
  const county = url.searchParams.get("county");
  const limit = Math.min(parseInt(url.searchParams.get("limit") || "100"), 1e3);
  const offset = parseInt(url.searchParams.get("offset") || "0");
  let where = [];
  let params = [];
  if (from) {
    where.push("call_date >= ?");
    params.push(from);
  }
  if (to) {
    where.push("call_date <= ?");
    params.push(to);
  }
  if (agency) {
    where.push("agency = ?");
    params.push(agency.toUpperCase());
  }
  if (county) {
    where.push("county = ?");
    params.push(county.toUpperCase());
  }
  const whereClause = where.length > 0 ? `WHERE ${where.join(" AND ")}` : "";
  const query = `SELECT hash, call_date, call_type, call_type_desc, location, location_clean, agency, call_no, report_no, dispo, dispo_desc, severity, category, scraped_at, lat, lng, geo_source, geocoded_at, county FROM dispatch_calls ${whereClause} ORDER BY scraped_at DESC LIMIT ? OFFSET ?`;
  params.push(limit, offset);
  const result = await env.DISPATCH_D1.prepare(query).bind(...params).all();
  const countQuery = `SELECT COUNT(*) as total FROM dispatch_calls ${whereClause}`;
  const countResult = await env.DISPATCH_D1.prepare(countQuery).bind(...params.slice(0, -2)).first();
  return json({
    records: result.results || [],
    total: countResult?.total || 0,
    limit,
    offset
  });
}
__name(handleDispatchQuery, "handleDispatchQuery");
async function handleLatest(request, env) {
  const url = new URL(request.url);
  const limit = Math.min(parseInt(url.searchParams.get("limit") || "500"), 500);
  const county = url.searchParams.get("county");
  let query = "SELECT hash, call_date, call_type, call_type_desc, location, location_clean, agency, call_no, report_no, dispo, dispo_desc, severity, category, scraped_at, lat, lng, geo_source, geocoded_at, county FROM dispatch_calls";
  let params = [];
  if (county) {
    query += " WHERE county = ?";
    params.push(county.toUpperCase());
  }
  query += " ORDER BY scraped_at DESC LIMIT ?";
  params.push(limit);
  const result = await env.DISPATCH_D1.prepare(query).bind(...params).all();
  return json({ records: result.results || [] }, 200, { "Cache-Control": "public, max-age=120" });
}
__name(handleLatest, "handleLatest");
async function handleAgencies(env) {
  const result = await env.DISPATCH_D1.prepare(
    "SELECT agency, COUNT(*) as count FROM dispatch_calls GROUP BY agency ORDER BY count DESC"
  ).all();
  const agencies = (result.results || []).map((r) => ({
    code: r.agency,
    name: AGENCY_NAMES[r.agency] || r.agency,
    color: AGENCY_COLORS[r.agency] || "#888",
    count: r.count
  }));
  return json({ agencies });
}
__name(handleAgencies, "handleAgencies");
async function handleStats(env) {
  const [totalResult, lastRun, agencyCounts, countyCounts] = await Promise.all([
    env.DISPATCH_D1.prepare("SELECT COUNT(*) as total FROM dispatch_calls").first(),
    env.DISPATCH_KV.get("meta:last_run", "json"),
    env.DISPATCH_D1.prepare(
      "SELECT agency, COUNT(*) as count FROM dispatch_calls GROUP BY agency"
    ).all(),
    env.DISPATCH_D1.prepare(
      "SELECT county, COUNT(*) as count FROM dispatch_calls GROUP BY county"
    ).all()
  ]);
  const byAgency = {};
  for (const r of agencyCounts.results || []) {
    byAgency[r.agency] = r.count;
  }
  const byCounty = {};
  for (const r of countyCounts.results || []) {
    byCounty[r.county] = r.count;
  }
  return json({
    total_records: totalResult?.total || 0,
    last_run: lastRun,
    by_agency: byAgency,
    by_county: byCounty
  });
}
__name(handleStats, "handleStats");
async function handleGeo(request, env) {
  const url = new URL(request.url);
  const limit = Math.min(parseInt(url.searchParams.get("limit") || "200"), 1e3);
  const agency = url.searchParams.get("agency");
  let where = "WHERE location_clean != '' AND location_clean != '*'";
  let params = [];
  if (agency) {
    where += " AND agency = ?";
    params.push(agency.toUpperCase());
  }
  params.push(limit);
  const result = await env.DISPATCH_D1.prepare(
    `SELECT hash, call_date, call_type, call_type_desc, location, location_clean, agency, call_no, report_no, dispo, dispo_desc, severity, category, scraped_at, lat, lng, geo_source, geocoded_at, county FROM dispatch_calls ${where} ORDER BY scraped_at DESC LIMIT ?`
  ).bind(...params).all();
  return json({ records: result.results || [] });
}
__name(handleGeo, "handleGeo");
var REPORT_CATEGORIES = ["police", "fire", "medical", "traffic", "other"];
var REPORT_TTL_MS = 6 * 60 * 60 * 1e3;
var REPORT_RATE_MS = 3 * 60 * 1e3;
var REPORT_NOTE_MAX = 280;

/** Only these categories are accepted, so the badge on the map means something. */
function isReportCategory(value) {
  return typeof value === "string" && REPORT_CATEGORIES.indexOf(value) !== -1;
}

/** Reports must land inside the same county box the geocoder is bounded by. */
function isReportInBBox(lat, lng) {
  const la = Number(lat);
  const ln = Number(lng);
  if (!Number.isFinite(la) || !Number.isFinite(ln)) return false;
  return la >= BBOX.minLat && la <= BBOX.maxLat && ln >= BBOX.minLng && ln <= BBOX.maxLng;
}

/** Notes are plain text only: no control characters, collapsed, trimmed, capped. */
function cleanReportNote(value) {
  if (typeof value !== "string") return "";
  return value
    .replace(/[\u0000-\u001f\u007f]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, REPORT_NOTE_MAX);
}

/** A short non-reversible fingerprint of the caller, used only for rate limiting. */
async function reportClientKey(request) {
  const raw = request.headers.get("CF-Connecting-IP") || request.headers.get("X-Forwarded-For") || "";
  const ip = raw.split(",")[0].trim();
  if (!ip) return null;
  const bytes = new TextEncoder().encode("sbcd-report:" + ip);
  const digest = await crypto.subtle.digest("SHA-256", bytes);
  return Array.from(new Uint8Array(digest)).slice(0, 12).map((b) => b.toString(16).padStart(2, "0")).join("");
}

var REPORT_MATCH_MILES = 0.6;
var REPORT_MATCH_WINDOW_MS = 30 * 60 * 1e3;
var REPORT_ABUSE_HIDE_AT = 3;
var OWNER_KEY_HEADER = "x-owner-key";
var REPORT_OWNER_TTL_SEC = 24 * 60 * 60;

/** Compare two secrets without leaking length or position through timing. */
export async function secretEqual(a, b) {
  const left = String(a == null ? "" : a);
  const right = String(b == null ? "" : b);
  if (!left || !right) return false;
  const enc = new TextEncoder();
  const pair = await Promise.all([
    crypto.subtle.digest("SHA-256", enc.encode(left)),
    crypto.subtle.digest("SHA-256", enc.encode(right))
  ]);
  const va = new Uint8Array(pair[0]);
  const vb = new Uint8Array(pair[1]);
  let diff = 0;
  for (let i = 0; i < va.length; i++) diff |= va[i] ^ vb[i];
  return diff === 0;
}

/**
 * Owner moderation is gated on the OWNER_REPORT_KEY secret binding. With no
 * secret set nothing is authorised, so a fresh environment cannot be moderated
 * by accident or by an empty header.
 */
export async function ownerKeyMatches(request, env) {
  const expected = env && env.OWNER_REPORT_KEY ? String(env.OWNER_REPORT_KEY) : "";
  if (!expected) return false;
  const supplied = request && request.headers && request.headers.get
    ? request.headers.get(OWNER_KEY_HEADER)
    : "";
  if (!supplied) return false;
  return secretEqual(supplied, expected);
}

async function loadOwnerHiddenIds(env) {
  try {
    const listed = await env.DISPATCH_KV.list({ prefix: "report_owner_hidden:" });
    return new Set((listed.keys || []).map((k) => k.name.slice("report_owner_hidden:".length)));
  } catch (err) {
    console.error("Owner hidden lookup failed:", err.message);
    return new Set();
  }
}

/** A report is public unless the crowd or the owner hid it. */
export function isReportPubliclyVisible(id, crowdHidden, ownerHidden) {
  return !crowdHidden.has(id) && !ownerHidden.has(id);
}

function toRadians(deg) {
  return deg * Math.PI / 180;
}

/** Great-circle distance in miles between two points. */
function distanceMiles(aLat, aLng, bLat, bLng) {
  const R = 3958.7613;
  const dLat = toRadians(bLat - aLat);
  const dLng = toRadians(bLng - aLng);
  const h = Math.sin(dLat / 2) ** 2 +
    Math.cos(toRadians(aLat)) * Math.cos(toRadians(bLat)) * Math.sin(dLng / 2) ** 2;
  return 2 * R * Math.asin(Math.min(1, Math.sqrt(h)));
}

/** How far Pacific time is from UTC at a given instant, in ms (negative in PST/PDT). */
function pacificOffsetMs(utcMs) {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/Los_Angeles",
    hour12: false,
    year: "numeric", month: "2-digit", day: "2-digit",
    hour: "2-digit", minute: "2-digit", second: "2-digit"
  }).formatToParts(new Date(utcMs));
  const get = (type) => parseInt(parts.find((p) => p.type === type).value, 10);
  const asUtc = Date.UTC(get("year"), get("month") - 1, get("day"), get("hour") % 24, get("minute"), get("second"));
  return asUtc - utcMs;
}

/**
 * The county feeds publish local wall-clock text like "11/1/2026 8:35:37 PM".
 * Returns epoch ms, or null when the string is not in that shape.
 */
function parseDispatchTime(value) {
  if (typeof value !== "string") return null;
  const m = /^(\d{1,2})\/(\d{1,2})\/(\d{4})\s+(\d{1,2}):(\d{2})(?::(\d{2}))?\s*([AP]M)?$/i.exec(value.trim());
  if (!m) return null;
  const month = parseInt(m[1], 10);
  const day = parseInt(m[2], 10);
  const year = parseInt(m[3], 10);
  let hour = parseInt(m[4], 10);
  const minute = parseInt(m[5], 10);
  const second = m[6] ? parseInt(m[6], 10) : 0;
  const ampm = m[7] ? m[7].toUpperCase() : "";
  if (ampm === "PM" && hour < 12) hour += 12;
  if (ampm === "AM" && hour === 12) hour = 0;
  if (month < 1 || month > 12 || day < 1 || day > 31 || hour > 23 || minute > 59 || second > 59) return null;
  const guess = Date.UTC(year, month - 1, day, hour, minute, second);
  return guess - pacificOffsetMs(guess);
}

/** The closest scraped call near the report in both space and time, if any. */
function findCountyMatch(report, candidates) {
  const reportTime = Number(report && report.created_at);
  const lat = Number(report && report.lat);
  const lng = Number(report && report.lng);
  if (!Number.isFinite(reportTime) || !Number.isFinite(lat) || !Number.isFinite(lng)) return null;
  let best = null;
  for (const c of candidates || []) {
    if (!Number.isFinite(c.lat) || !Number.isFinite(c.lng) || c.ts == null) continue;
    const gap = Math.abs(c.ts - reportTime);
    if (gap > REPORT_MATCH_WINDOW_MS) continue;
    const miles = distanceMiles(lat, lng, c.lat, c.lng);
    if (miles > REPORT_MATCH_MILES) continue;
    if (!best || miles < best.distance_miles) {
      best = {
        hash: c.hash,
        agency: c.agency,
        call_type: c.call_type,
        location: c.location || "",
        call_date: c.call_date,
        distance_miles: Math.round(miles * 100) / 100,
        minutes_apart: Math.round(gap / 60000)
      };
    }
  }
  return best;
}

/** Recent geocoded calls, newest first, with their dispatch time pre-parsed. */
async function loadCountyCandidates(env) {
  const res = await env.DISPATCH_D1.prepare(
    "SELECT hash, agency, call_type, call_date, location_clean, lat, lng FROM dispatch_calls WHERE lat IS NOT NULL AND lng IS NOT NULL ORDER BY rowid DESC LIMIT 3000"
  ).all();
  return (res.results || []).map((r) => ({
    hash: r.hash,
    agency: r.agency,
    call_type: r.call_type,
    call_date: r.call_date,
    location: r.location_clean || "",
    lat: Number(r.lat),
    lng: Number(r.lng),
    ts: parseDispatchTime(r.call_date)
  })).filter((c) => c.ts != null);
}

/** Reports the crowd flagged enough times to be hidden. */
async function loadHiddenReportIds(env) {
  try {
    const listed = await env.DISPATCH_KV.list({ prefix: "report_hidden:" });
    return new Set((listed.keys || []).map((k) => k.name.slice("report_hidden:".length)));
  } catch (err) {
    return new Set();
  }
}

async function handleListReports(request, env) {
  const now = Date.now();
  const owner = await ownerKeyMatches(request, env);
  const rows = await env.DISPATCH_D1.prepare(
    "SELECT id, created_at, category, note, lat, lng, confirmations FROM user_reports WHERE expires_at > ? ORDER BY created_at DESC LIMIT 200"
  ).bind(now).all();
  const crowdHidden = await loadHiddenReportIds(env);
  const ownerHidden = await loadOwnerHiddenIds(env);
  const all = rows.results || [];
  const active = owner
    ? all
    : all.filter((r) => isReportPubliclyVisible(r.id, crowdHidden, ownerHidden));
  let candidates = [];
  if (active.length) {
    try {
      candidates = await loadCountyCandidates(env);
    } catch (err) {
      console.error("County match lookup failed:", err.message);
    }
  }
  const reports = active.map((r) => {
    const match = findCountyMatch(r, candidates);
    const out = match ? Object.assign({}, r, { county_match: match }) : Object.assign({}, r);
    if (owner) {
      out.owner_hidden = ownerHidden.has(r.id);
      out.crowd_hidden = crowdHidden.has(r.id);
    }
    return out;
  });
  return json({
    reports,
    unverified: true,
    ttl_hours: REPORT_TTL_MS / 36e5,
    owner: owner || undefined
  }, 200, owner ? { "Cache-Control": "no-store" } : {});
}

async function handleReportAction(request, env, path) {
  const m = /^\/api\/reports\/([A-Za-z0-9-]{8,64})\/(abuse|confirm|hide|restore)$/.exec(path);
  if (!m) return json({ error: "Not found" }, 404);
  const id = m[1];
  const action = m[2];
  const exists = await env.DISPATCH_D1.prepare(
    "SELECT id, confirmations FROM user_reports WHERE id = ? AND expires_at > ?"
  ).bind(id, Date.now()).first();
  if (!exists) return json({ error: "Report not found" }, 404);

  if (action === "hide" || action === "restore") {
    if (!(env && env.OWNER_REPORT_KEY)) {
      return json({ error: "Owner access is not configured on this Worker" }, 401);
    }
    if (!(await ownerKeyMatches(request, env))) {
      return json({ error: "Wrong owner key" }, 403, { "Cache-Control": "no-store" });
    }
    if (action === "hide") {
      await env.DISPATCH_KV.put("report_owner_hidden:" + id, "1", { expirationTtl: REPORT_OWNER_TTL_SEC });
      return json({ ok: true, id, owner_hidden: true }, 200, { "Cache-Control": "no-store" });
    }
    await env.DISPATCH_KV.delete("report_owner_hidden:" + id);
    await env.DISPATCH_KV.delete("report_hidden:" + id);
    await env.DISPATCH_KV.delete("report_abuse:" + id);
    return json({ ok: true, id, owner_hidden: false }, 200, { "Cache-Control": "no-store" });
  }

  const caller = await reportClientKey(request);
  if (!caller) return json({ error: "Cannot identify caller" }, 400);

  if (action === "confirm") {
    const rlKey = "report_confirm_rl:" + id + ":" + caller;
    if (await env.DISPATCH_KV.get(rlKey)) {
      return json({ error: "You already confirmed this report" }, 429);
    }
    await env.DISPATCH_KV.put(rlKey, "1", { expirationTtl: 86400 });
    await env.DISPATCH_D1.prepare(
      "UPDATE user_reports SET confirmations = confirmations + 1 WHERE id = ?"
    ).bind(id).run();
    const after = await env.DISPATCH_D1.prepare(
      "SELECT confirmations FROM user_reports WHERE id = ?"
    ).bind(id).first();
    const count = after && Number.isFinite(Number(after.confirmations))
      ? Number(after.confirmations)
      : Number(exists.confirmations || 0) + 1;
    return json({ ok: true, confirmations: count });
  }

  const rlKey = "report_abuse_rl:" + id + ":" + caller;
  if (await env.DISPATCH_KV.get(rlKey)) {
    return json({ error: "You already flagged this report" }, 429);
  }
  await env.DISPATCH_KV.put(rlKey, "1", { expirationTtl: 3600 });
  const current = Number(await env.DISPATCH_KV.get("report_abuse:" + id)) || 0;
  const next = current + 1;
  await env.DISPATCH_KV.put("report_abuse:" + id, String(next), { expirationTtl: 12 * 60 * 60 });
  const hidden = next >= REPORT_ABUSE_HIDE_AT;
  if (hidden) {
    await env.DISPATCH_KV.put("report_hidden:" + id, "1", { expirationTtl: 12 * 60 * 60 });
  }
  return json({ ok: true, flags: next, hidden });
}

async function handleCreateReport(request, env) {
  let body;
  try {
    body = await request.json();
  } catch (err) {
    return json({ error: "Invalid JSON body" }, 400);
  }
  if (!isReportCategory(body?.category)) {
    return json({ error: "Unknown category" }, 400);
  }
  const lat = Number(body?.lat);
  const lng = Number(body?.lng);
  if (!Number.isFinite(lat) || !Number.isFinite(lng)) {
    return json({ error: "lat and lng are required" }, 400);
  }
  if (!isReportInBBox(lat, lng)) {
    return json({ error: "That location is outside San Bernardino County" }, 400);
  }
  const note = cleanReportNote(body?.note);
  const accuracyRaw = Number(body?.accuracy_m);
  const accuracy = Number.isFinite(accuracyRaw) ? Math.max(0, Math.round(accuracyRaw)) : null;

  const key = await reportClientKey(request);
  if (key) {
    const last = await env.DISPATCH_KV.get("report_rl:" + key, "json");
    if (last && Date.now() - last < REPORT_RATE_MS) {
      return json({ error: "Please wait a few minutes before reporting again" }, 429);
    }
    await env.DISPATCH_KV.put("report_rl:" + key, JSON.stringify(Date.now()), { expirationTtl: 180 });
  }

  const now = Date.now();
  const id = crypto.randomUUID();
  const expiresAt = now + REPORT_TTL_MS;
  await env.DISPATCH_D1.prepare(
    "INSERT INTO user_reports (id, created_at, category, note, lat, lng, accuracy_m, confirmations, expires_at) VALUES (?, ?, ?, ?, ?, ?, ?, 0, ?)"
  ).bind(id, now, body.category, note, lat, lng, accuracy, expiresAt).run();
  return json({
    ok: true,
    report: { id, created_at: now, category: body.category, note, lat, lng, confirmations: 0 },
    expires_at: expiresAt
  }, 201);
}

/** Reports are short-lived; sweep the expired ones on every cron run. */
async function purgeExpiredReports(env) {
  try {
    await env.DISPATCH_D1.prepare("DELETE FROM user_reports WHERE expires_at <= ?").bind(Date.now()).run();
  } catch (err) {
    console.error("Report purge failed:", err.message);
  }
}

function handleCodes() {
  return json({ call_types: CALL_TYPES, dispositions: DISPOSITIONS, agencies: AGENCY_NAMES });
}
__name(handleCodes, "handleCodes");
async function handleMetrics(env) {
  const snapshot = await getMetricsSnapshot(env);
  return json({ metrics: snapshot, timestamp: (/* @__PURE__ */ new Date()).toISOString() });
}
__name(handleMetrics, "handleMetrics");
async function purgeOldRecords(env, maxDays = 8) {
  const cutoff = new Date(Date.now() - maxDays * 24 * 60 * 60 * 1e3).toISOString();
  const result = await env.DISPATCH_D1.prepare("DELETE FROM dispatch_calls WHERE scraped_at < ?").bind(cutoff).run();
  const purged = result.meta?.changes || 0;
  if (purged > 0) console.log(`Purged ${purged} records older than ${maxDays} days (cutoff: ${cutoff})`);
  return { purged, cutoff };
}
__name(purgeOldRecords, "purgeOldRecords");
async function validateFreshness(env, currentRowCount) {
  const latestDb = await env.DISPATCH_D1.prepare(
    "SELECT call_date, scraped_at FROM dispatch_calls ORDER BY scraped_at DESC LIMIT 1"
  ).first();
  const dbLatest = latestDb?.call_date ? new Date(latestDb.call_date).toISOString() : null;
  const dbScrapedAt = latestDb?.scraped_at ? new Date(latestDb.scraped_at).toISOString() : null;
  const scrapedAtTime = dbScrapedAt ? new Date(dbScrapedAt).getTime() : 0;
  const dbTime = scrapedAtTime || (dbLatest ? new Date(dbLatest).getTime() : 0);
  const ageMin = dbTime ? Math.round((Date.now() - dbTime) / 6e4) : null;
  const scrapedAgeMin = scrapedAtTime ? Math.round((Date.now() - scrapedAtTime) / 6e4) : null;
  const prevCount = await env.DISPATCH_KV.get("meta:last_scrape_row_count", "json");
  const countChanged = prevCount !== null && prevCount !== currentRowCount;
  const fresh = ageMin !== null && ageMin <= 45;
  return {
    db_latest: dbLatest,
    db_scraped_at: dbScrapedAt,
    age_min: ageMin,
    scraped_age_min: scrapedAgeMin,
    current_row_count: currentRowCount,
    prev_row_count: prevCount,
    count_changed: countChanged,
    fresh,
    stale: ageMin !== null && ageMin > 45
  };
}
__name(validateFreshness, "validateFreshness");
async function handleScrapeTrigger(env, ctx) {
  const startTime = Date.now();
  const scrapePromise = (async () => {
    try {
      const results = await runScraper(env);
      const storage = await processScrapeResults(env, results);
      let geo = null;
      if (storage.pending_geo?.length > 0) {
        geo = await geocodePendingRecords(env, storage.pending_geo);
      }
      const freshness = await validateFreshness(env, results.stats.total_rows);
      await env.DISPATCH_KV.put("meta:last_scrape_row_count", JSON.stringify(results.stats.total_rows));
      await env.DISPATCH_KV.put("meta:last_run", JSON.stringify({ timestamp: (/* @__PURE__ */ new Date()).toISOString() }));
      await env.DISPATCH_KV.put("meta:last_scrape_result", JSON.stringify({
        stats: results.stats,
        storage: { ...storage, pending_geo: void 0 },
        geo,
        freshness,
        timestamp: (/* @__PURE__ */ new Date()).toISOString()
      }));
      await env.DISPATCH_KV.put("meta:next_scrape_at", JSON.stringify(0));
      await env.DISPATCH_KV.put("meta:last_scrape_at", JSON.stringify(Date.now()));
    } catch (err) {
      console.error("Scrape failed:", err.message);
      await env.DISPATCH_KV.put("meta:last_run", JSON.stringify({
        timestamp: (/* @__PURE__ */ new Date()).toISOString(),
        error: err.message
      })).catch(() => {
      });
    }
  })();
  ctx.waitUntil(scrapePromise);
  return json({ status: "scrape_triggered", duration_ms: Date.now() - startTime });
}
__name(handleScrapeTrigger, "handleScrapeTrigger");
async function handleGeoBackfill(request, env) {
  const url = new URL(request.url);
  const limit = Math.min(parseInt(url.searchParams.get("limit") || "200"), 500);
  let rows;
  try {
    const result = await env.DISPATCH_D1.prepare(
      `SELECT hash, agency, location_clean FROM dispatch_calls
       WHERE lat IS NULL AND location_clean IS NOT NULL
         AND location_clean != '' AND location_clean != '*'
       ORDER BY call_date DESC LIMIT ?`
    ).bind(limit).all();
    rows = result.results || [];
  } catch (err) {
    return json({ error: err.message }, 500);
  }
  const geo = await geocodePendingRecords(env, rows);
  return json({ ...geo, candidates: rows.length });
}
__name(handleGeoBackfill, "handleGeoBackfill");
async function handleAdminScrape(env) {
  const startTime = Date.now();
  try {
    const results = await runScraper(env);
    const storage = await processScrapeResults(env, results);
    let geo = null;
    if (storage.pending_geo?.length > 0) {
      geo = await geocodePendingRecords(env, storage.pending_geo);
    }
    return json({
      status: "complete",
      stored: storage.stored,
      skipped: storage.skipped,
      total: storage.total,
      agencies: results.stats.agencies_scraped,
      rc_rows: results.stats.rc_rows,
      geo,
      duration_ms: Date.now() - startTime
    });
  } catch (err) {
    return json({ status: "error", error: err.message, stack: err.stack, duration_ms: Date.now() - startTime }, 500);
  }
}
__name(handleAdminScrape, "handleAdminScrape");
async function handleAdminCleanup(env) {
  try {
    const before = await env.DISPATCH_D1.prepare("SELECT COUNT(*) AS total FROM dispatch_calls").first();
    await env.DISPATCH_D1.prepare("DELETE FROM dispatch_calls WHERE lat IS NULL").run();
    const after = await env.DISPATCH_D1.prepare("SELECT COUNT(*) AS total FROM dispatch_calls").first();
    return json({ deleted: (before?.total || 0) - (after?.total || 0), remaining: after?.total || 0 });
  } catch (err) {
    return json({ error: err.message }, 500);
  }
}
__name(handleAdminCleanup, "handleAdminCleanup");
async function handleAdminMigrate(env) {
  const results = [];
  try {
    await env.DISPATCH_D1.prepare("ALTER TABLE dispatch_calls ADD COLUMN county TEXT DEFAULT 'SB'").run();
    results.push("Added county column");
  } catch (err) {
    results.push(`county: ${err.message}`);
  }
  try {
    await env.DISPATCH_D1.prepare("CREATE INDEX IF NOT EXISTS idx_dc_county ON dispatch_calls(county)").run();
    results.push("Created county index");
  } catch (err) {
    results.push(`idx: ${err.message}`);
  }
  return json({ results });
}
__name(handleAdminMigrate, "handleAdminMigrate");
async function handleAdminDiag(env) {
  const results = {};
  const testHash = "hdiag_test_" + Date.now();
  try {
    const r = await env.DISPATCH_D1.prepare(
      `INSERT OR IGNORE INTO dispatch_calls (hash, call_date, call_type, agency, call_no, county) VALUES (?, ?, ?, ?, ?, ?)`
    ).bind(testHash, (/* @__PURE__ */ new Date()).toISOString(), "TEST", "DIAG", "TEST001", "SB").run();
    results.insert_test = { success: true, changes: r.meta?.changes };
    await env.DISPATCH_D1.prepare(`DELETE FROM dispatch_calls WHERE hash = ?`).bind(testHash).run();
  } catch (err) {
    results.insert_test = { success: false, error: err.message };
  }
  try {
    const latest = await env.DISPATCH_D1.prepare(
      `SELECT call_date, agency, call_no, hash FROM dispatch_calls ORDER BY call_date DESC LIMIT 5`
    ).all();
    results.latest_records = latest.results;
  } catch (err) {
    results.latest_records_error = err.message;
  }
  try {
    const rcSample = await env.DISPATCH_D1.prepare(
      `SELECT hash, agency, call_no, call_date, location FROM dispatch_calls WHERE agency LIKE 'RC%' LIMIT 5`
    ).all();
    results.rc_records = rcSample.results;
  } catch (err) {
    results.rc_error = err.message;
  }
  const lastRun = await env.DISPATCH_KV.get("meta:last_run", "json");
  results.last_run = lastRun;
  const nextScrape = await env.DISPATCH_KV.get("meta:next_scrape_at", "json");
  results.next_scrape = nextScrape ? new Date(nextScrape).toISOString() : null;
  return json(results);
}
__name(handleAdminDiag, "handleAdminDiag");
async function handleGeoStatus(env) {
  const [counts, lastRun, nextScrape] = await Promise.all([
    env.DISPATCH_D1.prepare(
      `SELECT
         COUNT(*) AS total,
         SUM(CASE WHEN lat IS NOT NULL THEN 1 ELSE 0 END) AS geocoded,
         SUM(CASE WHEN geo_source IS NULL AND location_clean IS NOT NULL
                   AND location_clean != '' AND location_clean != '*' THEN 1 ELSE 0 END) AS pending
       FROM dispatch_calls`
    ).first(),
    env.DISPATCH_KV.get("meta:last_run", "json"),
    env.DISPATCH_KV.get("meta:next_scrape_at", "json")
  ]);
  const now = Date.now();
  return json({
    total: counts?.total || 0,
    geocoded: Number(counts?.geocoded) || 0,
    pending: Number(counts?.pending) || 0,
    pct: counts?.total ? (Number(counts.geocoded) / counts.total * 100).toFixed(1) + "%" : "0%",
    mode: lastRun?.mode || "unknown",
    next_scrape: nextScrape ? new Date(nextScrape).toISOString() : null,
    next_in_s: nextScrape ? Math.max(0, Math.round((nextScrape - now) / 1e3)) : null,
    last_run: lastRun
  });
}
__name(handleGeoStatus, "handleGeoStatus");
async function handleFreshness(env) {
  const [counts, lastRun, nextScrape] = await Promise.all([
    env.DISPATCH_D1.prepare("SELECT COUNT(*) AS total FROM dispatch_calls").first(),
    env.DISPATCH_KV.get("meta:last_run", "json"),
    env.DISPATCH_KV.get("meta:next_scrape_at", "json")
  ]);
  const now = Date.now();
  const latestScrape = await env.DISPATCH_D1.prepare(
    "SELECT scraped_at FROM dispatch_calls ORDER BY scraped_at DESC LIMIT 1"
  ).first();
  const dbScrapedAt = latestScrape?.scraped_at ? new Date(latestScrape.scraped_at).toISOString() : null;
  const ageMin = dbScrapedAt ? Math.round((now - new Date(dbScrapedAt).getTime()) / 6e4) : null;
  return json({
    freshness_window_min: 45,
    db_scraped_at: dbScrapedAt,
    age_min: ageMin,
    fresh: ageMin !== null && ageMin <= 45,
    stale: ageMin !== null && ageMin > 45,
    total_records: counts?.total || 0,
    last_run: lastRun,
    next_scrape: nextScrape ? new Date(nextScrape).toISOString() : null,
    next_in_s: nextScrape ? Math.max(0, Math.round((nextScrape - now) / 1e3)) : null
  });
}
__name(handleFreshness, "handleFreshness");
async function handleDiscover(env) {
  const results = {};
  const testCodes = ALL_AGENCY_CODES.slice(0, 5);
  for (const code of testCodes) {
    try {
      const resp = await fetch("https://mediasummary.shr.sbcounty.gov/", {
        headers: { "User-Agent": "Mozilla/5.0 (compatible; SBCountyScraper/1.0)" }
      });
      const html = await resp.text();
      const vsMatch = html.match(/__VIEWSTATE[^"]*?value="([^"]+)"/i);
      const evMatch = html.match(/__EVENTVALIDATION[^"]*?value="([^"]+)"/i);
      const vsgMatch = html.match(/__VIEWSTATEGENERATOR[^"]*?value="([^"]+)"/i);
      const body = new URLSearchParams({
        "__VIEWSTATE": vsMatch ? vsMatch[1] : "",
        "__VIEWSTATEGENERATOR": vsgMatch ? vsgMatch[1] : "",
        "__EVENTVALIDATION": evMatch ? evMatch[1] : "",
        "ctl00$MainContent$ddCity": code
      });
      const postResp = await fetch("https://mediasummary.shr.sbcounty.gov/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded", "User-Agent": "Mozilla/5.0" },
        body: body.toString()
      });
      const postHtml = await postResp.text();
      const tableMatch = postHtml.match(/<table[^>]*id="GridView1"[^>]*>([\s\S]*?)<\/table>/i);
      const rowCount = tableMatch ? (tableMatch[1].match(/<tr/gi) || []).length - 1 : 0;
      results[code] = { name: AGENCY_NAMES[code], rows: rowCount, available: rowCount > 0 };
    } catch (err) {
      results[code] = { name: AGENCY_NAMES[code], rows: 0, error: err.message };
    }
  }
  return json({ discovered: results, note: "Tested first 5 agencies. All 25 available." });
}
__name(handleDiscover, "handleDiscover");
var STATIC_ASSETS = {
  "/icon.svg": { content: "\"<svg xmlns=\\\"http://www.w3.org/2000/svg\\\" width=\\\"512\\\" height=\\\"512\\\" viewBox=\\\"0 0 512 512\\\"><rect width=\\\"512\\\" height=\\\"512\\\" rx=\\\"80\\\" fill=\\\"#1a1a2e\\\"/><text x=\\\"256\\\" y=\\\"340\\\" font-size=\\\"280\\\" text-anchor=\\\"middle\\\" fill=\\\"#e94560\\\" font-family=\\\"sans-serif\\\" font-weight=\\\"bold\\\">S</text></svg>\"", contentType: "image/svg+xml" },
  "/sw.js": { content: "const CACHE = 'sb-dispatch-v3';\nconst STATIC = ['/','/index.html','/css/dashboard.css','/js/app.js','/js/cards.js','/js/map.js','/js/deepdive.js','/js/app-data.js','/manifest.json'];\nself.addEventListener('install', e => { self.skipWaiting(); e.waitUntil(caches.open(CACHE).then(c => c.addAll(STATIC).catch(() => {}))); });\nself.addEventListener('activate', e => e.waitUntil(caches.keys().then(function(ks){return Promise.all(ks.filter(function(k){return k !== CACHE;}).map(function(k){return caches.delete(k);}));}).then(function(){return self.clients.claim();})));\nself.addEventListener('fetch', e => {\n  const url = new URL(e.request.url);\n  if (url.pathname.startsWith('/api/')) {\n    e.respondWith(fetch(e.request).then(r => { const c = r.clone(); caches.open(CACHE).then(c2 => c2.put(e.request, c)); return r; }).catch(() => caches.match(e.request)));\n  } else {\n    e.respondWith(caches.match(e.request).then(r => r || fetch(e.request).then(res => { const c = res.clone(); caches.open(CACHE).then(c2 => c2.put(e.request, c)); return res; }).catch(() => caches.match('/'))));\n  }\n});", contentType: "application/javascript" },
  "/manifest.json": { content: "{\"id\":\"/\",\"name\":\"SB County Dispatch\",\"short_name\":\"SB Dispatch\",\"description\":\"Real-time San Bernardino County dispatch calls\",\"start_url\":\"/\",\"display\":\"standalone\",\"background_color\":\"#1a1a2e\",\"theme_color\":\"#1a1a2e\",\"icons\":[{\"src\":\"/icon.svg\",\"sizes\":\"any\",\"type\":\"image/svg+xml\",\"purpose\":\"any\"},{\"src\":\"/icon.svg\",\"sizes\":\"512x512\",\"type\":\"image/svg+xml\",\"purpose\":\"maskable\"}],\"screenshots\":[{\"src\":\"/icon.svg\",\"sizes\":\"1280x720\",\"type\":\"image/svg+xml\",\"form_factor\":\"wide\",\"label\":\"SB County Dispatch Dashboard\"},{\"src\":\"/icon.svg\",\"sizes\":\"512x1024\",\"type\":\"image/svg+xml\",\"label\":\"SB County Dispatch Mobile\"}]}", contentType: "application/manifest+json" },
  "/js/app-data.js": { content: `export const APP_DATA = ${JSON.stringify(WEB_DATA)};
`, type: "application/javascript" },
  "/": { content: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>SB County Dispatch</title>
  <link rel="manifest" href="/manifest.json">
  <meta name="theme-color" content="#1a1a2e">
  <link rel="stylesheet" href="/css/dashboard.css">
  <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css">
</head>
<body>
  <div id="report-pick-hint" class="report-pick-hint hidden">
    <span>Tap the map to place your pin</span>
    <button class="btn btn-ghost" onclick="window.cancelReportPick()">Cancel</button>
  </div>
  <div id="stale-banner" class="stale-banner hidden">Data may be stale — source site may be down</div>
  <header>
    <div class="header-left">
      <h1>SB County Dispatch</h1>
      <span id="stats-bar" class="stats-text"></span>
    </div>
    <div class="header-right">
      <input type="text" id="search" placeholder="Search...">
      <div id="agency-filters" class="filter-scroll"></div>
      <div id="nearby-bar" class="nearby-bar hidden">
        <span class="nearby-label">NEARBY</span>
        <input type="range" id="radius-slider" min="1" max="25" value="5" step="1">
        <span id="radius-val">5mi</span>
        <button id="nearby-close" class="nearby-close" title="Exit nearby">&times;</button>
      </div>
      <button id="btn-nearby" class="btn btn-ghost" onclick="toggleNearby()">Nearby</button>
      <button id="btn-scrape" class="btn btn-primary" onclick="triggerScrape()">Scrape</button>
      <button id="btn-bookmarks" class="btn btn-ghost" onclick="toggleBookmarkMode()">☆</button>
      <button id="btn-metrics" class="btn btn-ghost" onclick="showMetrics()">Analytics</button>
      <button id="btn-report" class="btn btn-primary" onclick="window.openReport()">Report</button>
    </div>
  </header>
  <main>
    <div id="map"></div>
    <div id="card-panel">
      <div class="panel-header">
        <div class="panel-controls">
          <span class="panel-title">Dispatch Calls</span>
          <select id="sort-select" class="ctrl-select">
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
            <option value="agency">Agency A-Z</option>
            <option value="type">Call Type</option>
            <option value="severity">Severity</option>
            <option value="dispo">Disposition</option>
          </select>
          <button id="sort-dir" class="ctrl-btn" title="Sort direction">&#x2193;</button>
          <select id="group-select" class="ctrl-select">
            <option value="">No Grouping</option>
            <option value="agency">Group by Agency</option>
            <option value="type">Group by Type</option>
            <option value="severity">Group by Severity</option>
          </select>
        </div>
        <div id="time-scrubber" class="time-scrubber"><button class="ts-btn active" data-min="0">All</button><button class="ts-btn" data-min="15">15m</button><button class="ts-btn" data-min="60">1h</button><button class="ts-btn" data-min="360">6h</button><button class="ts-btn" data-min="1440">24h</button></div>
        
        <span id="card-count"></span>
      </div>
      <div id="report-list" class="report-list hidden">
        <div class="rlist-head">
          <span class="rlist-title">Community reports</span>
          <span id="report-list-count" class="rlist-count"></span>
          <button id="report-owner-btn" class="rlist-owner" type="button" onclick="window.toggleOwnerMode()" title="Owner moderation">&#128274;</button>
        </div>
        <div id="report-rows" class="rlist-rows"></div>
      </div>
      <div id="card-grid"></div>
    </div>
  </main>
  <div id="report-modal" class="modal hidden">
    <div class="modal-content">
      <button class="modal-close" onclick="window.closeReport()">&times;</button>
      <h2>Report what you can see</h2>
      <p class="report-hint">Anonymous. Shown to everyone as an unverified community report for six hours. This is not a way to call for help - dial 911.</p>
      <div class="report-row">
        <select id="report-category">
          <option value="police">Police activity</option>
          <option value="fire">Fire</option>
          <option value="medical">Medical</option>
          <option value="traffic">Traffic or crash</option>
          <option value="other">Something else</option>
        </select>
      </div>
      <div class="report-row">
        <input id="report-note" type="text" maxlength="280" placeholder="What are you seeing? (optional)">
      </div>
      <p class="report-fine">Approximate is fine - a cross street or landmark helps.</p>
      <div class="report-row report-loc">
        <span id="report-loc-label">Using the map centre</span>
      </div>
      <div class="report-row report-actions">
        <button id="report-pick" class="btn btn-ghost" onclick="window.pickReportOnMap()">Pick on map</button>
        <button id="report-use-location" class="btn btn-ghost" onclick="window.useMyLocationForReport()">Use my location</button>
      </div>
      <div class="report-row">
        <button id="report-submit" class="btn btn-primary" onclick="window.submitReport()">Submit report</button>
      </div>
      <div id="report-status" class="report-status"></div>
    </div>
  </div>
  <div id="deepdive-modal" class="modal hidden">
    <div class="modal-content">
      <button class="modal-close" onclick="closeModal()">&times;</button>
      <div id="deepdive-body"></div>
    </div>
  </div>
  <div id="metrics-modal" class="modal hidden">
    <div class="modal-content">
      <button class="modal-close" onclick="closeMetricsModal()">&times;</button>
      <div id="metrics-body"></div>
    </div>
  </div>
  <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"><\/script>
  <script src="/js/map.js" type="module"><\/script>
  <script src="/js/cards.js" type="module"><\/script>
  <script src="/js/deepdive.js" type="module"><\/script>
  <script src="/js/app.js" type="module"><\/script>
</body>
</html>
`, type: "text/html" },
  "/css/dashboard.css": { content: `/* ============================================================
   SB County Dispatch \u2014 Minimal Dark Utilitarian
   ============================================================ */

:root {
  --bg:        #0a0e14;
  --bg-card:   #11161d;
  --bg-raised: #161c25;
  --border:    #1c222b;
  --border-hi: #2a323d;
  --text:      #e6e6e6;
  --text-2:    #7a828e;
  --text-3:    #4a5060;
  --accent:    #3b82f6;
  --red:       #ef4444;
  --amber:     #f59e0b;
  --green:     #22c55e;
  --mono:      'SF Mono', 'Cascadia Code', 'Fira Code', 'Consolas', monospace;
  --sans:      -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif;
}

*, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }

html, body { height: 100%; overflow: hidden; }

body {
  font-family: var(--sans);
  font-size: 13px;
  line-height: 1.5;
  background: var(--bg);
  color: var(--text);
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: hidden;
}

/* ---- Scrollbar ---- */
::-webkit-scrollbar { width: 6px; }
::-webkit-scrollbar-track { background: transparent; }
::-webkit-scrollbar-thumb { background: var(--border-hi); border-radius: 3px; }
::-webkit-scrollbar-thumb:hover { background: var(--text-3); }

/* ============================================================
   Header
   ============================================================ */

header {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  padding: 0.6rem 1rem;
  background: var(--bg-card);
  border-bottom: 1px solid var(--border);
  position: sticky;
  top: 0;
  height: 48px;
  z-index: 100;
  flex-shrink: 0;
}

.header-left {
  display: flex;
  align-items: baseline;
  gap: 0.75rem;
  flex-shrink: 0;
}

.header-left h1 {
  font-size: 14px;
  font-weight: 600;
  letter-spacing: -0.01em;
  white-space: nowrap;
}

.stats-text {
  font-size: 11px;
  color: var(--text-2);
  white-space: nowrap;
  font-family: var(--mono);
}

.stats-text .val { color: var(--text); font-weight: 500; }

.header-right {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-left: auto;
  min-width: 0;
}

.time-scrubber { display: flex; gap: 0.2rem; padding: 0.2rem 0; }
.ts-btn { padding: 0.1rem 0.4rem; border-radius: 8px; font-size: 0.7rem; border: 1px solid var(--border); background: var(--bg); color: var(--text); cursor: pointer; }
.ts-btn.active { background: var(--accent); color: #fff; border-color: var(--accent); }

.stale-banner {
  background: #ff9800;
  color: #1a1a1a;
  text-align: center;
  padding: 0.4rem;
  font-size: 0.85rem;
  font-weight: 600;
  z-index: 1000;
}
.stale-banner.hidden { display: none; }

#search {
  width: 180px;
  padding: 0.3rem 0.6rem;
  background: var(--bg);
  border: 1px solid var(--border);
  border-radius: 4px;
  color: var(--text);
  font-size: 12px;
  font-family: var(--mono);
  outline: none;
  transition: border-color 0.15s;
  flex-shrink: 0;
}
#search:focus { border-color: var(--accent); }
#search::placeholder { color: var(--text-3); }

.report-hint { font-size: 11px; color: var(--text-3); margin: 0 0 0.75rem; line-height: 1.45; }
.report-row { display: flex; gap: 0.5rem; align-items: center; margin-bottom: 0.6rem; }
.report-row select, .report-row input { flex: 1; min-width: 0; background: var(--bg); border: 1px solid var(--border); border-radius: 4px; color: var(--text); font-family: var(--mono); font-size: 12px; padding: 0.4rem 0.6rem; }
.report-loc { justify-content: space-between; font-size: 11px; color: var(--text-2); }
.report-status { min-height: 1em; font-family: var(--mono); font-size: 11px; color: var(--text-2); }
.report-status.error { color: #e94560; }
.report-popup .rp-tag { font-family: var(--mono); font-size: 9px; letter-spacing: 0.04em; color: #f59e0b; font-weight: 600; }
.report-popup .rp-cat { font-size: 11px; color: var(--text-2); margin: 2px 0 4px; text-transform: capitalize; }
.report-popup .rp-note { font-size: 12px; color: var(--text); }
.report-fine { font-size: 10px; color: var(--text-3); margin: -0.3rem 0 0.6rem; }
.report-actions { justify-content: flex-end; }
.report-pick-hint { position: fixed; left: 50%; transform: translateX(-50%); top: 64px; z-index: 1200; display: flex; align-items: center; gap: 0.6rem; background: var(--bg-raised); border: 1px solid #f59e0b; border-radius: 6px; padding: 0.45rem 0.6rem 0.45rem 0.8rem; font-family: var(--mono); font-size: 11px; color: var(--text); box-shadow: 0 4px 16px rgba(0, 0, 0, 0.4); }
.report-pick-hint.hidden { display: none; }
.report-pin { background: transparent; border: none; }
.report-pin span { display: block; width: 14px; height: 14px; border-radius: 50%; background: #f59e0b; border: 2px solid #fff; box-shadow: 0 0 0 3px rgba(245, 158, 11, 0.35); }
.rp-confirmed { font-family: var(--mono); font-size: 9px; letter-spacing: 0.04em; color: #22c55e; font-weight: 600; }
.rp-count { font-size: 11px; color: var(--text-2); margin-top: 4px; }
.rp-actions { display: flex; gap: 0.4rem; margin-top: 6px; }
.rp-actions button { background: var(--bg-raised); border: 1px solid var(--border); color: var(--text-2); border-radius: 3px; font-family: var(--mono); font-size: 10px; padding: 0.2rem 0.4rem; cursor: pointer; }
.rp-actions button:hover { color: var(--text); border-color: var(--text-3); }
.report-legend { background: var(--bg-raised); border: 1px solid var(--border); border-radius: 6px; padding: 0.45rem 0.55rem; font-family: var(--mono); font-size: 10px; color: var(--text-2); box-shadow: 0 2px 10px rgba(0, 0, 0, 0.35); }
.report-legend .rl-title { color: var(--text); font-size: 9px; margin-bottom: 0.25rem; letter-spacing: 0.05em; text-transform: uppercase; }
.report-legend .rl-row { display: flex; align-items: center; gap: 0.35rem; margin-bottom: 0.15rem; }
.report-legend .rl-dot { width: 8px; height: 8px; border-radius: 50%; display: inline-block; }
.report-legend .rl-dot.amber { background: #f59e0b; }
.report-legend .rl-dot.green { background: #22c55e; }
.report-legend .rl-buttons { display: flex; gap: 0.25rem; margin-top: 0.35rem; }
.report-legend .rl-buttons button { background: var(--bg); border: 1px solid var(--border); color: var(--text-2); border-radius: 3px; font-family: var(--mono); font-size: 9px; padding: 0.15rem 0.32rem; cursor: pointer; }
.report-legend .rl-buttons button.active { color: var(--text); border-color: #f59e0b; }
.report-list { flex-shrink: 0; display: flex; flex-direction: column; border-bottom: 1px solid var(--border); background: var(--bg-card); max-height: 32vh; }
.report-list.hidden { display: none; }
.rlist-head { display: flex; align-items: center; gap: 0.4rem; padding: 0.35rem 0.75rem; font-family: var(--mono); font-size: 10px; color: var(--text-3); text-transform: uppercase; letter-spacing: 0.05em; }
.rlist-title { color: var(--text-2); font-weight: 600; }
.rlist-count { color: var(--text-3); }
.rlist-owner { margin-left: auto; background: transparent; border: 1px solid transparent; border-radius: 3px; color: var(--text-3); font-size: 11px; line-height: 1; padding: 0.2rem 0.3rem; cursor: pointer; }
.rlist-owner:hover { color: var(--text-2); border-color: var(--border); }
.rlist-owner.active { color: #f59e0b; border-color: #f59e0b; }
.rlist-rows { display: flex; flex-direction: column; gap: 2px; overflow-y: auto; padding: 0 0.5rem 0.4rem; }
.rlist-row { display: flex; align-items: center; gap: 0.4rem; padding: 0.25rem 0.35rem; border: 1px solid transparent; border-radius: 4px; cursor: pointer; font-family: var(--mono); font-size: 11px; color: var(--text-2); }
.rlist-row:hover { background: var(--bg-raised); border-color: var(--border); }
.rlist-row.hidden-report { opacity: 0.55; }
.rlist-dot { width: 7px; height: 7px; border-radius: 50%; flex-shrink: 0; background: #f59e0b; }
.rlist-dot.confirmed { background: #22c55e; }
.rlist-cat { color: var(--text); text-transform: capitalize; flex-shrink: 0; }
.rlist-text { flex: 1; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.rlist-meta { flex-shrink: 0; color: var(--text-3); font-size: 10px; }
.rlist-meta.confirmed { color: #22c55e; }
.rlist-act { flex-shrink: 0; background: var(--bg); border: 1px solid var(--border); border-radius: 3px; color: var(--text-2); font-family: var(--mono); font-size: 9px; padding: 0.1rem 0.3rem; cursor: pointer; }
.rlist-act:hover { color: var(--text); border-color: var(--text-3); }

.filter-scroll {
  display: flex;
  gap: 4px;
  overflow-x: auto;
  max-width: 340px;
  scrollbar-width: none;
  flex-shrink: 1;
  min-width: 0;
}
.filter-scroll::-webkit-scrollbar { display: none; }

.agency-btn {
  padding: 2px 8px;
  border-radius: 3px;
  border: 1px solid var(--border);
  background: transparent;
  color: var(--text-3);
  font-size: 10px;
  font-family: var(--mono);
  font-weight: 600;
  cursor: pointer;
  white-space: nowrap;
  transition: all 0.12s;
  flex-shrink: 0;
}
.agency-btn:hover { color: var(--text-2); border-color: var(--border-hi); }
.agency-btn.active {
  color: var(--text);
  background: var(--bg-raised);
  border-color: var(--border-hi);
}
.agency-btn.excluded {
  opacity: 0.35;
  text-decoration: line-through;
  border-style: dashed;
}
.agency-btn.excluded:hover {
  opacity: 0.7;
  text-decoration: none;
}

.btn {
  padding: 0.3rem 0.65rem;
  border-radius: 4px;
  border: 1px solid var(--border);
  font-size: 11px;
  font-weight: 500;
  cursor: pointer;
  white-space: nowrap;
  transition: all 0.12s;
  flex-shrink: 0;
}
.btn-primary {
  background: var(--accent);
  color: #fff;
  border-color: var(--accent);
}
.btn-primary:hover { background: #2563eb; }
.btn-primary:disabled { opacity: 0.5; cursor: default; }
.btn-ghost {
  background: transparent;
  color: var(--text-2);
}
.btn-ghost:hover { color: var(--text); background: var(--bg-raised); }
.btn-ghost.active {
  color: var(--accent);
  border-color: var(--accent);
  background: rgba(59, 130, 246, 0.1);
}

.nearby-bar {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 0 8px;
  background: var(--bg-card);
  border: 1px solid var(--accent);
  border-radius: 4px;
  height: 28px;
  opacity: 0;
  transform: scaleX(0.8);
  transform-origin: right center;
  transition: opacity 0.2s ease, transform 0.2s ease;
  overflow: hidden;
  white-space: nowrap;
}
.nearby-bar.hidden { display: none; }
.nearby-bar.visible {
  opacity: 1;
  transform: scaleX(1);
}
.nearby-label {
  font-family: var(--mono);
  font-size: 9px;
  font-weight: 700;
  color: var(--accent);
  letter-spacing: 0.5px;
}
.nearby-bar input[type="range"] {
  width: 80px;
  height: 3px;
  accent-color: var(--accent);
  cursor: pointer;
}
.nearby-bar #radius-val {
  font-family: var(--mono);
  font-size: 10px;
  font-weight: 600;
  color: var(--accent);
  min-width: 24px;
}
.nearby-close {
  background: none;
  border: none;
  color: var(--text-3);
  font-size: 14px;
  cursor: pointer;
  padding: 0 2px;
  line-height: 1;
  transition: color 0.12s;
}
.nearby-close:hover { color: var(--text); }

/* ============================================================
   Main layout
   ============================================================ */

main {
  display: flex;
  flex: 1;
  min-height: 0;
}

#map {
  flex: 0 0 62%;
  height: 100%;
  background: var(--bg);
  position: relative;
}

.dark-tiles {
  filter: invert(100%) hue-rotate(180deg) brightness(1.2) contrast(1.1) saturate(0.3);
}

#card-panel {
  flex: 1;
  display: flex;
  flex-direction: column;
  border-left: 1px solid var(--border);
  min-width: 0;
  min-height: 0;
  height: 100%;
}

.panel-header {
  padding: 0.4rem 0.75rem;
  border-bottom: 1px solid var(--border);
  font-family: var(--mono);
  flex-shrink: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.5rem;
}

.panel-controls {
  display: flex;
  align-items: center;
  gap: 4px;
  min-width: 0;
}

.panel-title {
  font-size: 10px;
  color: var(--text-3);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  font-weight: 600;
  margin-right: 4px;
  white-space: nowrap;
}

.ctrl-select {
  padding: 2px 4px;
  background: var(--bg);
  border: 1px solid var(--border);
  border-radius: 3px;
  color: var(--text-2);
  font-size: 10px;
  font-family: var(--mono);
  cursor: pointer;
  outline: none;
}
.ctrl-select:focus { border-color: var(--accent); }
.ctrl-select option { background: var(--bg-card); color: var(--text); }

.ctrl-btn {
  padding: 2px 6px;
  background: var(--bg);
  border: 1px solid var(--border);
  border-radius: 3px;
  color: var(--text-2);
  font-size: 12px;
  cursor: pointer;
  line-height: 1;
  font-family: var(--mono);
}
.ctrl-btn:hover { color: var(--text); border-color: var(--border-hi); }

#card-count {
  font-size: 10px;
  color: var(--text-3);
  font-family: var(--mono);
  white-space: nowrap;
  flex-shrink: 0;
}

#card-grid {
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 0.5rem;
  min-height: 0;
}

/* ============================================================
   Group headers
   ============================================================ */

.group-header {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 0.45rem 0.5rem;
  margin: 0.4rem 0 2px;
  background: var(--bg);
  border: 1px solid var(--border);
  border-radius: 3px;
  cursor: pointer;
  position: sticky;
  top: 0;
  z-index: 2;
  transition: background 0.12s, border-color 0.12s;
  user-select: none;
}
.group-header:hover {
  background: var(--bg-raised);
  border-color: var(--border-hi);
}
.group-header.active {
  border-color: var(--accent);
  background: var(--bg-raised);
}
.group-header.active .group-label {
  color: var(--text);
}

.group-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  flex-shrink: 0;
}

.group-label {
  font-family: var(--mono);
  font-size: 10px;
  font-weight: 600;
  color: var(--text-2);
  text-transform: uppercase;
  letter-spacing: 0.04em;
}

.group-count {
  margin-left: auto;
  font-family: var(--mono);
  font-size: 10px;
  color: var(--text-3);
}

.group-isolate-hint {
  font-family: var(--mono);
  font-size: 9px;
  color: var(--accent);
  opacity: 0;
  transition: opacity 0.15s;
}
.group-header:hover .group-isolate-hint { opacity: 1; }
.group-header.active .group-isolate-hint { opacity: 1; }

/* ============================================================
   Dispatch cards
   ============================================================ */

.dispatch-card {
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 0.55rem 0.65rem;
  margin-bottom: 2px;
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-left: 3px solid var(--border);
  border-radius: 3px;
  cursor: pointer;
  transition: background 0.1s, border-color 0.1s;
}
.dispatch-card:hover {
  background: var(--bg-raised);
  border-color: var(--border-hi);
}
.dispatch-card.highlight {
  border-left-color: var(--accent);
  background: var(--bg-raised);
}

@keyframes cardEnter {
  from { opacity: 0; transform: translateY(6px); }
  to { opacity: 1; transform: translateY(0); }
}
.card-enter {
  animation: cardEnter 0.25s ease-out both;
}
.dispatch-card[data-severity="high"]   { border-left-color: var(--red); }
.dispatch-card[data-severity="medium"] { border-left-color: var(--amber); }
.dispatch-card[data-severity="low"]    { border-left-color: var(--green); }

.card-top {
  display: flex;
  align-items: center;
  gap: 6px;
}

.agency-badge {
  font-family: var(--mono);
  font-size: 10px;
  font-weight: 700;
  padding: 1px 5px;
  border-radius: 2px;
  background: var(--bg-raised);
  color: var(--text-2);
  flex-shrink: 0;
  letter-spacing: 0.02em;
}

.call-type {
  font-weight: 600;
  font-size: 13px;
  color: var(--text);
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.card-time {
  margin-left: auto;
  font-family: var(--mono);
  font-size: 10px;
  color: var(--text-3);
  flex-shrink: 0;
  white-space: nowrap;
}

.card-dist {
  font-family: var(--mono);
  font-size: 10px;
  color: var(--accent);
  flex-shrink: 0;
  white-space: nowrap;
}

.card-send {
  margin-left: auto;
  width: 20px;
  height: 20px;
  border-radius: 3px;
  border: 1px solid var(--border);
  background: transparent;
  color: var(--text-3);
  font-size: 13px;
  line-height: 1;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.15s;
  flex-shrink: 0;
  padding: 0;
}
.card-send:hover {
  color: var(--accent);
  border-color: var(--accent);
  background: rgba(59, 130, 246, 0.1);
}
.card-send.sent {
  color: var(--green);
  border-color: var(--green);
}
.card-send.error {
  color: var(--red);
  border-color: var(--red);
}

.card-loc {
  font-size: 12px;
  color: var(--text-2);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  padding-left: 0;
}

.card-bottom {
  display: flex;
  align-items: center;
  gap: 8px;
  font-family: var(--mono);
  font-size: 10px;
}

.call-no {
  color: var(--text-3);
}

.dispo-text {
  color: var(--text-3);
  text-transform: uppercase;
  letter-spacing: 0.04em;
  font-weight: 600;
}
.dispo-text.nat  { color: var(--green); }
.dispo-text.rtf  { color: var(--amber); }
.dispo-text.can  { color: var(--text-3); }
.dispo-text.cit  { color: #a78bfa; }
.dispo-text.arr  { color: var(--red); }
.dispo-text.civ  { color: var(--text-3); }

/* ============================================================
   Modals
   ============================================================ */

.modal {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(2px);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
}
.modal.hidden { display: none; }
.modal:not(.hidden) {
  opacity: 0;
  transition: opacity 0.2s ease;
}
.modal:not(.hidden).open {
  opacity: 1;
}

.modal-content {
  background: var(--bg-card);
  border: 1px solid var(--border-hi);
  border-radius: 6px;
  padding: 1.25rem;
  max-width: 620px;
  width: 92%;
  max-height: 85vh;
  overflow-y: auto;
  position: relative;
  transform: scale(0.95);
  transition: transform 0.2s ease;
}
.modal.open .modal-content {
  transform: scale(1);
}

.modal-close {
  position: absolute;
  top: 0.6rem;
  right: 0.6rem;
  background: none;
  border: none;
  color: var(--text-3);
  font-size: 18px;
  cursor: pointer;
  line-height: 1;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 3px;
}
.modal-close:hover { color: var(--text); background: var(--bg-raised); }

.modal-content h2 {
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 0.75rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid var(--border);
  display: flex;
  align-items: center;
  gap: 8px;
}

.analysis-section {
  margin-bottom: 0.75rem;
  padding-bottom: 0.75rem;
  border-bottom: 1px solid var(--border);
}
.analysis-section:last-child { border-bottom: none; margin-bottom: 0; }

.analysis-section h3 {
  font-size: 10px;
  font-weight: 600;
  color: var(--text-3);
  text-transform: uppercase;
  letter-spacing: 0.06em;
  margin-bottom: 0.4rem;
}

.analysis-section .row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4px 1rem;
  font-size: 12px;
}
.analysis-section .row .label { color: var(--text-3); }
.analysis-section .row .value { color: var(--text); font-family: var(--mono); font-size: 11px; }

.severity-bar {
  height: 3px;
  border-radius: 2px;
  background: var(--border);
  margin-top: 4px;
}
.severity-bar-fill {
  height: 100%;
  border-radius: 2px;
}

.analysis-text {
  font-size: 12px;
  color: var(--text-2);
  line-height: 1.6;
}
.analysis-text strong { color: var(--text); }

/* ============================================================
   Deepdive mini-map
   ============================================================ */

.deepdive-map {
  width: 100%;
  height: 140px;
  border-radius: 4px;
  border: 1px solid var(--border);
  margin-top: 4px;
}

/* ============================================================
   Metrics modal
   ============================================================ */

.metrics-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.5rem;
}

.metric-card {
  background: var(--bg);
  border: 1px solid var(--border);
  border-radius: 4px;
  padding: 0.6rem;
}
.metric-card .label {
  font-size: 10px;
  color: var(--text-3);
  text-transform: uppercase;
  letter-spacing: 0.04em;
}
.metric-card .value {
  font-family: var(--mono);
  font-size: 15px;
  font-weight: 600;
  margin-top: 2px;
}
.metric-card .sub {
  font-size: 10px;
  color: var(--text-3);
  margin-top: 2px;
}
.metric-card .bar {
  height: 3px;
  background: var(--border);
  border-radius: 2px;
  margin-top: 6px;
}
.metric-card .bar-fill {
  height: 100%;
  border-radius: 2px;
  background: var(--accent);
}
.metric-card.warning .bar-fill { background: var(--amber); }
.metric-card.critical .bar-fill { background: var(--red); }

/* ============================================================
   Map legend
   ============================================================ */

.map-legend {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: 4px;
  padding: 6px 8px;
  font-family: var(--mono);
  font-size: 10px;
  line-height: 1.6;
  color: var(--text-2);
  max-height: 200px;
  overflow-y: auto;
}
.map-legend .title {
  font-weight: 600;
  color: var(--text-3);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 2px;
  font-size: 9px;
}
.map-legend .item {
  display: flex;
  align-items: center;
  gap: 5px;
}
.map-legend .dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  flex-shrink: 0;
}

/* ============================================================
   Anime-style map effects
   ============================================================ */

@keyframes pulse-ring {
  0%   { transform: scale(1); opacity: 0.6; }
  100% { transform: scale(3); opacity: 0; }
}

@keyframes scan-line {
  0%   { top: -2px; opacity: 0.8; }
  100% { top: 100%; opacity: 0; }
}

.map-scan-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
  z-index: 500;
  overflow: hidden;
}

.map-scan-line {
  position: absolute;
  left: 0;
  right: 0;
  height: 2px;
  background: linear-gradient(90deg, transparent, var(--accent), transparent);
  opacity: 0;
  animation: scan-line 4s ease-in-out infinite;
  box-shadow: 0 0 12px 2px var(--accent);
}

.map-vignette {
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  pointer-events: none;
  z-index: 499;
  background: radial-gradient(ellipse at center, transparent 50%, rgba(10,14,20,0.4) 100%);
}

/* Pulse marker CSS layer */
.pulse-marker {
  position: absolute;
  border-radius: 50%;
  pointer-events: none;
  animation: pulse-ring 2s ease-out infinite;
}

/* ============================================================
   Leaflet overrides
   ============================================================ */

.leaflet-popup-content-wrapper {
  background: var(--bg-card) !important;
  border: 1px solid var(--border-hi) !important;
  border-radius: 4px !important;
  box-shadow: 0 4px 12px rgba(0,0,0,0.4), 0 0 20px rgba(59,130,246,0.08) !important;
  color: var(--text) !important;
  font-family: var(--sans) !important;
  font-size: 12px !important;
  padding: 0 !important;
}
.leaflet-popup-content {
  margin: 8px 10px !important;
  line-height: 1.5 !important;
}
.leaflet-popup-tip {
  background: var(--bg-card) !important;
  border: 1px solid var(--border-hi) !important;
  border-top: none !important;
  border-left: none !important;
  box-shadow: none !important;
}
.leaflet-popup-close-button {
  color: var(--text-3) !important;
  font-size: 16px !important;
  width: 20px !important;
  height: 20px !important;
  top: 4px !important;
  right: 4px !important;
}
.leaflet-popup-close-button:hover { color: var(--text) !important; }

.popup-agency {
  font-family: var(--mono);
  font-size: 10px;
  font-weight: 700;
  padding: 1px 5px;
  border-radius: 2px;
  color: #fff;
  display: inline-block;
  margin-bottom: 3px;
}
.popup-type { font-weight: 600; }
.popup-loc { color: var(--text-2); font-size: 11px; margin: 2px 0; }
.popup-meta { font-family: var(--mono); font-size: 10px; color: var(--text-3); }
.popup-time { font-family: var(--mono); font-size: 10px; color: var(--text-3); margin-top: 2px; }
.popup-action {
  display: inline-block;
  margin-top: 4px;
  padding: 2px 8px;
  background: var(--accent);
  color: #fff;
  border-radius: 3px;
  font-size: 10px;
  font-family: var(--mono);
  font-weight: 600;
  cursor: pointer;
  border: none;
}
.popup-action:hover { background: #2563eb; }

/* ============================================================
   Empty state
   ============================================================ */

.empty-state {
  text-align: center;
  padding: 3rem 1rem;
  color: var(--text-3);
  font-size: 13px;
  font-family: var(--mono);
}

/* ============================================================
   Card highlight (when clicking map marker)
   ============================================================ */

.dispatch-card.highlight {
  background: var(--accent) !important;
  border-color: var(--accent) !important;
  box-shadow: 0 0 12px rgba(59,130,246,0.3);
}

/* ============================================================
   Mini Modal (map edge panel)
   ============================================================ */

.mini-modal {
  background: var(--bg-card);
  border: 1px solid var(--border-hi);
  border-left: 3px solid var(--accent);
  border-radius: 4px;
  width: 280px;
  max-height: 200px;
  overflow-y: auto;
  font-family: var(--mono);
  font-size: 11px;
  color: var(--text);
  box-shadow: 0 4px 16px rgba(0,0,0,0.5);
  transition: opacity 0.2s ease, transform 0.2s ease;
  margin-left: 10px;
  margin-top: 50px;
  z-index: 1000;
}
.mini-modal.hidden {
  display: none;
}
.mini-modal.visible {
  animation: mmSlideIn 0.2s ease-out;
}
@keyframes mmSlideIn {
  from { opacity: 0; transform: translateX(-10px); }
  to { opacity: 1; transform: translateX(0); }
}
.mm-header {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 8px 4px;
  flex-wrap: wrap;
}
.mm-agency {
  font-size: 10px;
  font-weight: 700;
  padding: 1px 5px;
  border-radius: 2px;
  color: #fff;
}
.mm-type {
  font-weight: 600;
  font-size: 11px;
}
.mm-severity {
  font-size: 9px;
  font-weight: 600;
  text-transform: uppercase;
  margin-left: auto;
}
.mm-body {
  padding: 0 8px 4px;
}
.mm-loc {
  color: var(--text-2);
  font-size: 10px;
  margin-bottom: 3px;
  word-break: break-word;
}
.mm-row {
  font-size: 10px;
  color: var(--text-3);
  margin-top: 2px;
}
.mm-label {
  color: var(--text-3);
  text-transform: uppercase;
  font-size: 9px;
  letter-spacing: 0.03em;
}
.mm-sep {
  margin: 0 4px;
  opacity: 0.4;
}
.mm-time {
  color: var(--text-3);
  font-size: 10px;
}
.mm-footer {
  padding: 4px 8px 6px;
  border-top: 1px solid var(--border);
}
.mm-details {
  background: var(--accent);
  color: #fff;
  border: none;
  border-radius: 3px;
  padding: 3px 8px;
  font-size: 10px;
  font-family: var(--mono);
  font-weight: 600;
  cursor: pointer;
  width: 100%;
  text-align: center;
}
.mm-details:hover { background: #2563eb; }
.mm-empty {
  padding: 8px;
  color: var(--text-3);
  text-align: center;
  font-size: 10px;
}

/* ============================================================
   Loading Skeletons
   ============================================================ */

@keyframes shimmer {
  0% { background-position: -200px 0; }
  100% { background-position: 200px 0; }
}

.dispatch-card.skeleton {
  pointer-events: none;
  height: 70px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 8px;
  padding: 10px;
}
.skeleton-line {
  height: 10px;
  border-radius: 3px;
  background: linear-gradient(90deg, var(--border) 25%, var(--border-hi) 50%, var(--border) 75%);
  background-size: 400px 100%;
  animation: shimmer 1.5s ease-in-out infinite;
}
.skeleton-line-short { width: 40%; }
.skeleton-line-long { width: 80%; }
.skeleton-line-medium { width: 55%; }

/* ============================================================
   Card Hover Pulse (desktop only)
   ============================================================ */

@media (hover: hover) {
  .dispatch-card:not(.skeleton):hover {
    border-color: var(--accent);
  }
}

/* ============================================================
   Locate Me button
   ============================================================ */

.locate-btn {
  width: 32px;
  height: 32px;
  background: var(--bg-card);
  border: 1px solid var(--border-hi);
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: var(--text-2);
  font-size: 18px;
  line-height: 1;
  transition: background 0.15s, color 0.15s;
}
.locate-btn:hover,
.locate-btn.active {
  background: var(--bg-raised);
  color: var(--accent);
  border-color: var(--accent);
}

.radius-ui {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: 4px;
  padding: 6px 10px;
  font-size: 10px;
  color: var(--text-2);
  min-width: 160px;
}
.radius-label {
  font-family: var(--mono);
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: var(--text-3);
  margin-bottom: 4px;
}
.radius-row {
  display: flex;
  align-items: center;
  gap: 6px;
}
.radius-row input[type="range"] {
  flex: 1;
  height: 3px;
  accent-color: var(--accent);
  cursor: pointer;
}
#radius-val {
  font-family: var(--mono);
  font-weight: 600;
  color: var(--accent);
  min-width: 28px;
  text-align: right;
}

/* ============================================================
   Responsive
   ============================================================ */

@media (max-width: 900px) {
  header {
    flex-direction: column;
    height: auto;
    padding: 0.5rem 0.75rem;
    gap: 0.4rem;
  }
  .header-left { width: 100%; }
  .header-right {
    width: 100%;
    flex-wrap: wrap;
    gap: 0.35rem;
  }
  #search { width: 100%; min-width: 0; }
  .filter-scroll { max-width: 100%; width: 100%; }
  main { flex-direction: column; flex: 1; min-height: 0; }
  #map { flex: 0 0 40vh; min-height: 0; }
  #card-panel { border-left: none; border-top: 1px solid var(--border); min-height: 0; }
  .panel-controls { flex-wrap: wrap; }
  .modal-content { width: 96%; max-height: 90vh; padding: 1rem; }
  .metrics-grid { grid-template-columns: 1fr; }
  .analysis-section .row { grid-template-columns: 1fr; }
  .mini-modal {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100%;
    max-height: 40vh;
    border-radius: 8px 8px 0 0;
    border-left: none;
    margin: 0;
    z-index: 1100;
  }
}
`, type: "text/css" },
  "/js/map.js": { content: `import { APP_DATA } from './app-data.js';

let map = null;
let markers = [];
let markerGroup = null;
let legendControl = null;
let allMapRecords = [];
let miniModalControl = null;
let currentMiniHash = null;
let pulseTimeouts = {};
let locateControl = null;
let userMarker = null;
let userPulse = null;
let userWatchId = null;
let viewPinned = false;
const LOCK_KEY = 'sb-map-lock';
let reportGroup = null;
let lastReports = [];
let reportLegendControl = null;
let reportFilter = 'all';
let reportSearch = '';
try {
  const savedFilter = localStorage.getItem('sb-report-filter');
  if (savedFilter === 'confirmed' || savedFilter === 'off') reportFilter = savedFilter;
} catch (e) {
  reportFilter = 'all';
}

const DEFAULT_CENTER = [34.85, -117.2];
const DEFAULT_ZOOM = 10;

const AGENCY_COLORS = APP_DATA.colors;
const AGENCY_CENTERS = APP_DATA.centers;
const SEVERITY = APP_DATA.severity;
const CALL_TYPE_DESCS = APP_DATA.callTypeDescs;
const SEV_COLORS = APP_DATA.sevColors;
const SEV_ICONS = APP_DATA.sevIcons;

function timeAgo(dateStr) {
  if (!dateStr) return '';
  let d;
  try { d = new Date(dateStr); } catch { return ''; }
  if (isNaN(d.getTime())) return '';
  const diff = Math.floor((Date.now() - d.getTime()) / 1000);
  if (diff < 60) return \`\${diff}s ago\`;
  if (diff < 3600) return \`\${Math.floor(diff / 60)}m ago\`;
  if (diff < 86400) return \`\${Math.floor(diff / 3600)}h ago\`;
  return \`\${Math.floor(diff / 86400)}d ago\`;
}

function formatFullTime(dateStr) {
  if (!dateStr) return '';
  try {
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return dateStr;
    return d.toLocaleString('en-US', { month:'short', day:'numeric', hour:'numeric', minute:'2-digit', hour12:true });
  } catch { return dateStr; }
}

function getSeverity(r) {
  return SEVERITY[r.call_type?.toUpperCase()] || 'low';
}

function jitter(center, spread) {
  return center + (Math.random() - 0.5) * spread;
}

function hasCoords(r) {
  return (Number.isFinite(r.lat) && Number.isFinite(r.lng)) ||
         (r.geocoded && Number.isFinite(r.geocoded.lat) && Number.isFinite(r.geocoded.lon));
}

function isApproximate(r) {
  return !hasCoords(r);
}

function getMarkerPosition(r) {
  if (Number.isFinite(r.lat) && Number.isFinite(r.lng)) {
    return [r.lat, r.lng];
  }
  if (r.geocoded && Number.isFinite(r.geocoded.lat) && Number.isFinite(r.geocoded.lon)) {
    return [r.geocoded.lat, r.geocoded.lon];
  }
  const center = AGENCY_CENTERS[r.agency];
  if (center) {
    return [jitter(center[0], 0.04), jitter(center[1], 0.04)];
  }
  return [jitter(34.85, 0.3), jitter(-117.2, 0.3)];
}

function buildPopup(r) {
  const color = AGENCY_COLORS[r.agency] || '#555';
  const sev = getSeverity(r);
  const sevColor = SEV_COLORS[sev] || '#555';
  const approxNote = isApproximate(r)
    ? '<div class="popup-meta" style="color:var(--amber)">&#9888; approximate location</div>'
    : '';
  return \`
    <div>
      <div style="display:flex;align-items:center;gap:6px;margin-bottom:4px">
        <span class="popup-agency" style="background:\${color}">\${r.agency || '?'}</span>
        <span class="popup-type">\${r.call_type || ''}</span>
        <span style="font-size:9px;font-family:var(--mono);color:\${sevColor};font-weight:600;text-transform:uppercase">\${sev}</span>
      </div>
      <div class="popup-loc">\${r.location || ''}</div>
      \${approxNote}
      <div class="popup-meta">\${r.call_no || ''} &middot; \${r.dispo || ''}</div>
      <div class="popup-time">\${formatFullTime(r.call_date)} (\${timeAgo(r.call_date)})</div>
      <button class="popup-action" onclick="window.openDeepDive('\${(r.hash || '').replace(/'/g, "\\\\'")}')">Details &rarr;</button>
    </div>\`;
}

function addMarker(r) {
  if (!r.call_date) return null;
  const sev = getSeverity(r);
  const sevColor = SEV_COLORS[sev] || '#555';
  const [lat, lon] = getMarkerPosition(r);

  const isHigh = sev === 'high';
  const approx = isApproximate(r);
  const targetRadius = isHigh ? 7 : 5;
  const marker = L.circleMarker([lat, lon], {
    radius: 0,
    fillColor: sevColor,
    color: '#fff',
    weight: isHigh ? 1.2 : 0.8,
    opacity: approx ? (isHigh ? 0.7 : 0.4) : (isHigh ? 1 : 0.7),
    fillOpacity: approx ? (isHigh ? 0.45 : 0.3) : (isHigh ? 0.9 : 0.65),
    dashArray: approx ? '2 2' : null,
  });

  let scale = 0;
  const growMarker = () => {
    scale += 0.08;
    if (scale >= 1) {
      marker.setRadius(targetRadius);
      return;
    }
    marker.setRadius(targetRadius * scale);
    requestAnimationFrame(growMarker);
  };
  requestAnimationFrame(growMarker);

  marker.bindPopup(buildPopup(r), { maxWidth: 240, minWidth: 200 });
  marker._recordHash = r.hash;
  marker._recordAgency = r.agency;
  marker._recordSeverity = sev;
  marker._approximate = approx;
  marker.on('click', () => {
    if (window.highlightCard) window.highlightCard(r.hash);
  });

  return marker;
}

function buildLegend(records) {
  const counts = {};
  for (const r of records) {
    counts[r.agency] = (counts[r.agency] || 0) + 1;
  }
  const sorted = Object.entries(counts).sort((a, b) => b[1] - a[1]).slice(0, 12);

  let html = '<div class="title">Agencies</div>';
  for (const [code, count] of sorted) {
    const color = AGENCY_COLORS[code] || '#555';
    html += \`<div class="item"><span class="dot" style="background:\${color}"></span>\${code} \${count}</div>\`;
  }
  return html;
}

function buildMiniModalContent(r) {
  const color = AGENCY_COLORS[r.agency] || '#555';
  const sev = getSeverity(r);
  const sevColor = SEV_COLORS[sev] || '#555';
  const sevIcon = SEV_ICONS[sev] || '';
  const desc = CALL_TYPE_DESCS[r.call_type?.toUpperCase()] || '';
  const safeHash = (r.hash || '').replace(/'/g, "\\\\'");
  return \`
    <div class="mm-header">
      <span class="mm-agency" style="background:\${color}">\${r.agency || '?'}</span>
      <span class="mm-type">\${r.call_type || ''}\${desc ? ' \\u00b7 ' + desc : ''}</span>
      <span class="mm-severity" style="color:\${sevColor}">\${sevIcon} \${sev}</span>
    </div>
    <div class="mm-body">
      <div class="mm-loc">\${r.location || 'No location'}</div>
      \${isApproximate(r) ? '<div class="mm-row" style="color:var(--amber)">&#9888; approximate location</div>' : ''}
      <div class="mm-row">
        <span class="mm-label">Call#</span> \${r.call_no || 'N/A'}
        <span class="mm-sep">&middot;</span>
        <span class="mm-label">Dispo</span> \${r.dispo || 'N/A'}
      </div>
      <div class="mm-row">
        <span class="mm-time">\${formatFullTime(r.call_date)} (\${timeAgo(r.call_date)})</span>
      </div>
    </div>
    <div class="mm-footer">
      <button class="mm-details" onclick="event.stopPropagation();window.openDeepDive('\${safeHash}')">View Details \\u2192</button>
    </div>\`;
}

function findMarkerByHash(hash) {
  for (const m of markers) {
    if (m._recordHash === hash) return m;
  }
  return null;
}

function findRecordByHash(hash) {
  return allMapRecords.find(r => r.hash === hash) || null;
}

function flashMarker(marker) {
  const pos = marker.getLatLng();

  const ring1 = L.circleMarker(pos, {
    radius: 20, fillColor: 'transparent', color: '#3b82f6',
    weight: 3, opacity: 1, fillOpacity: 0, interactive: false,
  }).addTo(markerGroup);
  let s1 = 1;
  const anim1 = () => {
    s1 += 0.05;
    const o1 = Math.max(0, 1 - (s1 - 1) * 0.35);
    ring1.setStyle({ opacity: o1 });
    ring1.setRadius(20 * s1);
    if (o1 > 0) requestAnimationFrame(anim1);
    else markerGroup.removeLayer(ring1);
  };
  requestAnimationFrame(anim1);

  setTimeout(() => {
    const ring2 = L.circleMarker(pos, {
      radius: 12, fillColor: 'transparent', color: '#60a5fa',
      weight: 2, opacity: 0.8, fillOpacity: 0, interactive: false,
    }).addTo(markerGroup);
    let s2 = 1;
    const anim2 = () => {
      s2 += 0.06;
      const o2 = Math.max(0, 0.8 - (s2 - 1) * 0.4);
      ring2.setStyle({ opacity: o2 });
      ring2.setRadius(12 * s2);
      if (o2 > 0) requestAnimationFrame(anim2);
      else markerGroup.removeLayer(ring2);
    };
    requestAnimationFrame(anim2);
  }, 200);

  const glow = L.circleMarker(pos, {
    radius: marker.getRadius() + 4, fillColor: '#3b82f6',
    color: '#3b82f6', weight: 0, opacity: 0.3, fillOpacity: 0.3,
    interactive: false,
  }).addTo(markerGroup);
  let go = 0.3;
  const fadeGlow = () => {
    go -= 0.015;
    if (go > 0) {
      glow.setStyle({ opacity: go * 0.3, fillOpacity: go * 0.3 });
      requestAnimationFrame(fadeGlow);
    } else {
      markerGroup.removeLayer(glow);
    }
  };
  setTimeout(fadeGlow, 300);
}

function pulseMarker(marker) {
  const hash = marker._recordHash;
  if (pulseTimeouts[hash]) return;

  const pulse = L.circleMarker(marker.getLatLng(), {
    radius: marker.getRadius() + 2,
    fillColor: 'transparent',
    color: '#3b82f6',
    weight: 1.5,
    opacity: 0.7,
    fillOpacity: 0,
    interactive: false,
  }).addTo(markerGroup);
  let scale = 1;
  const animate = () => {
    scale += 0.04;
    const opacity = Math.max(0, 0.7 - (scale - 1) * 0.5);
    pulse.setStyle({ opacity });
    pulse.setRadius((marker.getRadius() + 2) * scale);
    if (opacity > 0) requestAnimationFrame(animate);
    else markerGroup.removeLayer(pulse);
  };
  requestAnimationFrame(animate);
  pulseTimeouts[hash] = true;
  setTimeout(() => { delete pulseTimeouts[hash]; }, 1500);
}

export function initMap() {
  let savedView = null;
  try { savedView = JSON.parse(localStorage.getItem('sb-map-view') || 'null'); } catch (e) { savedView = null; }
  if (!savedView || !Number.isFinite(savedView.lat) || !Number.isFinite(savedView.lng) || !Number.isFinite(savedView.zoom)) {
    savedView = null;
  }
  let savedLock = null;
  try { savedLock = localStorage.getItem(LOCK_KEY); } catch (e) { savedLock = null; }
  viewPinned = savedLock === '1' || !!savedView;
  map = L.map('map', {
    zoomControl: true,
    attributionControl: false,
  }).setView(
    savedView ? [savedView.lat, savedView.lng] : DEFAULT_CENTER,
    savedView ? savedView.zoom : DEFAULT_ZOOM
  );

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    className: 'dark-tiles',
  }).addTo(map);

  markerGroup = L.layerGroup().addTo(map);

  // Once the user pans, zooms or picks a record, that view is theirs: the refresh
  // used to fit the whole county every sixty seconds and yank them out of it.
  const pinView = () => {
    if (viewPinned) return;
    viewPinned = true;
    try { localStorage.setItem(LOCK_KEY, '1'); } catch (e) {}
    updateLockButton();
  };
  map.getContainer().addEventListener('mousedown', pinView);
  map.getContainer().addEventListener('touchstart', pinView, { passive: true });
  map.getContainer().addEventListener('wheel', pinView, { passive: true });
  map.on('moveend', () => {
    if (!viewPinned) return;
    const c = map.getCenter();
    try {
      localStorage.setItem('sb-map-view', JSON.stringify({ lat: c.lat, lng: c.lng, zoom: map.getZoom() }));
    } catch (e) {}
  });

  legendControl = L.control({ position: 'bottomright' });
  legendControl.onAdd = function () {
    const div = L.DomUtil.create('div', 'map-legend');
    div.innerHTML = '<div class="title">No data</div>';
    return div;
  };
  legendControl.addTo(map);

  miniModalControl = L.control({ position: 'topleft' });
  miniModalControl.onAdd = function () {
    const div = L.DomUtil.create('div', 'mini-modal hidden');
    div.id = 'mini-modal';
    div.innerHTML = '<div class="mm-empty">Select a record</div>';
    L.DomEvent.disableClickPropagation(div);
    L.DomEvent.disableScrollPropagation(div);
    return div;
  };
  miniModalControl.addTo(map);

  locateControl = L.control({ position: 'bottomleft' });
  locateControl.onAdd = function () {
    const btn = L.DomUtil.create('div', 'locate-btn');
    btn.id = 'locate-btn';
    btn.innerHTML = '\\u2316';
    btn.title = 'Find me';
    L.DomEvent.disableClickPropagation(btn);
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleLocate();
    });
    return btn;
  };
  locateControl.addTo(map);

  const lockControl = L.control({ position: 'topright' });
  lockControl.onAdd = function () {
    const btn = L.DomUtil.create('div', 'locate-btn');
    btn.id = 'lock-btn';
    L.DomEvent.disableClickPropagation(btn);
    btn.addEventListener('click', (e) => { e.stopPropagation(); toggleViewLock(); });
    return btn;
  };
  lockControl.addTo(map);
  updateLockButton();

  const scanDiv = document.createElement('div');
  scanDiv.className = 'map-scan-overlay';
  scanDiv.innerHTML = '<div class="map-scan-line"></div>';
  document.getElementById('map').appendChild(scanDiv);

  const vignette = document.createElement('div');
  vignette.className = 'map-vignette';
  document.getElementById('map').appendChild(vignette);

  return map;
}

export function updateMap(records) {
  markerGroup.clearLayers();
  markers = [];
  allMapRecords = records;
  const bounds = [];
  hideMiniModal();

  for (const r of records) {
    const m = addMarker(r);
    if (m) {
      m.addTo(markerGroup);
      markers.push(m);
      bounds.push(m.getLatLng());
    }
  }

  if (bounds.length > 0 && !viewPinned) {
    map.fitBounds(bounds, { padding: [30, 30], maxZoom: 13, animate: true, duration: 0.8 });
  }

  if (legendControl) {
    const div = legendControl.getContainer();
    div.innerHTML = buildLegend(records);
  }
}

export function focusMarker(hash) {
  const m = findMarkerByHash(hash);
  const r = findRecordByHash(hash);
  if (!m || !r) return;

  map.closePopup();
  hideMiniModal();

  map.flyTo(m.getLatLng(), 17, { animate: true, duration: 1.4, easeLinearity: 0.25 });

  flashMarker(m);

  setTimeout(() => {
    const pulse1 = L.circleMarker(m.getLatLng(), {
      radius: 22, fillColor: 'transparent', color: '#3b82f6',
      weight: 2, opacity: 0.8, fillOpacity: 0, interactive: false,
    }).addTo(markerGroup);
    let s1 = 1;
    const anim1 = () => {
      s1 += 0.06;
      const o1 = Math.max(0, 0.8 - (s1 - 1) * 0.4);
      pulse1.setStyle({ opacity: o1 });
      pulse1.setRadius(22 * s1);
      if (o1 > 0) requestAnimationFrame(anim1);
      else markerGroup.removeLayer(pulse1);
    };
    requestAnimationFrame(anim1);
  }, 400);

  setTimeout(() => {
    const pulse2 = L.circleMarker(m.getLatLng(), {
      radius: 14, fillColor: 'transparent', color: '#60a5fa',
      weight: 1.5, opacity: 0.6, fillOpacity: 0, interactive: false,
    }).addTo(markerGroup);
    let s2 = 1;
    const anim2 = () => {
      s2 += 0.05;
      const o2 = Math.max(0, 0.6 - (s2 - 1) * 0.35);
      pulse2.setStyle({ opacity: o2 });
      pulse2.setRadius(14 * s2);
      if (o2 > 0) requestAnimationFrame(anim2);
      else markerGroup.removeLayer(pulse2);
    };
    requestAnimationFrame(anim2);
  }, 700);

  setTimeout(() => showMiniModal(r), 1200);
}

export function showMiniModal(record) {
  const el = document.getElementById('mini-modal');
  if (!el) return;
  currentMiniHash = record.hash;
  el.innerHTML = buildMiniModalContent(record);
  el.classList.remove('hidden');
  el.classList.add('visible');
}

export function hideMiniModal() {
  const el = document.getElementById('mini-modal');
  if (!el) return;
  el.classList.add('hidden');
  el.classList.remove('visible');
  currentMiniHash = null;
}

export function pulseMarkerByHash(hash) {
  const m = findMarkerByHash(hash);
  if (m) pulseMarker(m);
}

function searchHit(r, q) {
  if (!r) return false;
  const fields = [r.location, r.call_type, r.call_no, r.dispo, r.agency];
  for (const f of fields) {
    if (f && String(f).toLowerCase().indexOf(q) !== -1) return true;
  }
  return false;
}

/** Hide markers that do not match the same five fields the card list searches. */
export function applySearchFilter(term) {
  const q = (term || '').trim().toLowerCase();
  for (const m of markers) {
    const r = findRecordByHash(m._recordHash);
    const visible = !q || searchHit(r, q);
    if (visible) {
      if (!markerGroup.hasLayer(m)) markerGroup.addLayer(m);
    } else if (markerGroup.hasLayer(m)) {
      markerGroup.removeLayer(m);
    }
  }
}

function escapeReportHtml(value) {
  return String(value == null ? '' : value).replace(/[&<>"']/g, function (c) {
    if (c === '&') return '&amp;';
    if (c === '<') return '&lt;';
    if (c === '>') return '&gt;';
    if (c === '"') return '&quot;';
    return '&#39;';
  });
}

/** The map centre, used as the default location for a new report. */
export function currentMapCenter() {
  if (!map) return null;
  const c = map.getCenter();
  return { lat: c.lat, lng: c.lng, zoom: map.getZoom() };
}

/** Community reports live in their own layer so agency filters never hide them. */
export function initReportLayer() {
  if (!reportGroup) reportGroup = L.layerGroup().addTo(map);
}

function reportIdArg(r) {
  return String(r.id == null ? '' : r.id).replace(/[^A-Za-z0-9-]/g, '');
}

function buildReportPopup(r) {
  const when = timeAgo(new Date(r.created_at).toISOString());
  const note = r.note ? '<div class="rp-note">' + escapeReportHtml(r.note) + '</div>' : '';
  let status;
  if (r.county_match) {
    const m = r.county_match;
    const place = String(m.location || '').replace(/[^A-Za-z0-9]/g, '');
    const placeHtml = place.length >= 3
      ? ' &middot; ' + escapeReportHtml(String(m.location).trim())
      : '';
    status = '<div class="rp-confirmed">CONFIRMED BY DISPATCH &middot; ' +
      escapeReportHtml(String(m.call_type || '')) + placeHtml + ' &middot; ' +
      m.distance_miles + ' mi, ' + m.minutes_apart + ' min apart</div>';
  } else {
    status = '<div class="rp-tag">COMMUNITY REPORT &middot; UNVERIFIED</div>';
  }
  const confirms = Number(r.confirmations) || 0;
  const counts = confirms
    ? '<div class="rp-count">' + confirms + (confirms === 1 ? ' neighbour confirmed this' : ' neighbours confirmed this') + '</div>'
    : '';
  const id = reportIdArg(r);
  return '<div class="report-popup">' + status +
    '<div class="rp-cat">' + escapeReportHtml(r.category) + ' &middot; ' + when + '</div>' +
    note + counts +
    '<div class="rp-actions">' +
    '<button type="button" data-id="' + id + '" onclick="window.confirmReport(this.dataset.id)">Confirm</button>' +
    '<button type="button" data-id="' + id + '" onclick="window.reportAbuse(this.dataset.id)">Report abuse</button>' +
    '<button type="button" data-id="' + id + '" onclick="window.hideReportLocally(this.dataset.id)">Hide for me</button>' +
    '</div></div>';
}

const HIDDEN_REPORTS_KEY = 'sb-hidden-reports';

function locallyHiddenReports() {
  try {
    return new Set(JSON.parse(localStorage.getItem(HIDDEN_REPORTS_KEY) || '[]'));
  } catch (e) {
    return new Set();
  }
}

export function renderReports(reports) {
  lastReports = reports || [];
  if (!reportGroup) reportGroup = L.layerGroup().addTo(map);
  reportGroup.clearLayers();
  const hidden = locallyHiddenReports();
  for (const r of lastReports) {
    if (!Number.isFinite(r.lat) || !Number.isFinite(r.lng)) continue;
    if (hidden.has(r.id)) continue;
    if (reportFilter === 'off') continue;
    if (reportFilter === 'confirmed' && !r.county_match) continue;
    if (reportSearch && !reportMatchesSearch(r, reportSearch)) continue;
    const colour = r.county_match ? '#22c55e' : '#f59e0b';
    const m = L.circleMarker([r.lat, r.lng], {
      radius: r.county_match ? 9 : 8,
      color: colour,
      weight: 2,
      dashArray: r.county_match ? null : '3 3',
      fillColor: colour,
      fillOpacity: r.county_match ? 0.45 : 0.3,
      opacity: 0.95,
    }).addTo(reportGroup);
    m.bindPopup(buildReportPopup(r));
    m.reportId = r.id;
  }
  renderReportList(lastReports);
}

const OWNER_KEY_STORAGE = 'sb-owner-key';
let ownerMode = false;

function ownerKey() {
  try {
    return localStorage.getItem(OWNER_KEY_STORAGE) || '';
  } catch (e) {
    return '';
  }
}

function forgetOwnerKey() {
  ownerMode = false;
  try { localStorage.removeItem(OWNER_KEY_STORAGE); } catch (e) {}
}

function reportCoords(r) {
  const lat = Number(r.lat);
  const lng = Number(r.lng);
  if (!Number.isFinite(lat) || !Number.isFinite(lng)) return '';
  return lat.toFixed(3) + ', ' + lng.toFixed(3);
}

/** Jump from a list row to the same pin the map draws. */
export function focusReport(id) {
  if (!map || !reportGroup) return;
  const layers = reportGroup.getLayers();
  for (let i = 0; i < layers.length; i++) {
    if (layers[i].reportId === id) {
      map.setView(layers[i].getLatLng(), 15, { animate: true });
      layers[i].openPopup();
      return;
    }
  }
}

function reportListRow(r) {
  const id = reportIdArg(r);
  const confirmed = !!r.county_match;
  const row = document.createElement('div');
  row.className = 'rlist-row' + ((r.owner_hidden || r.crowd_hidden) ? ' hidden-report' : '');
  row.setAttribute('data-id', id);

  const dot = document.createElement('span');
  dot.className = 'rlist-dot' + (confirmed ? ' confirmed' : '');
  row.appendChild(dot);

  const cat = document.createElement('span');
  cat.className = 'rlist-cat';
  cat.textContent = r.category || 'other';
  row.appendChild(cat);

  const text = document.createElement('span');
  text.className = 'rlist-text';
  text.textContent = r.note ? r.note : reportCoords(r);
  row.appendChild(text);

  const bits = [timeAgo(new Date(r.created_at).toISOString())];
  const confirms = Number(r.confirmations) || 0;
  if (confirms) bits.push(confirms + (confirms === 1 ? ' confirm' : ' confirms'));
  if (r.crowd_hidden) bits.push('hidden by flags');
  else if (r.owner_hidden) bits.push('hidden by owner');
  else if (confirmed) bits.push('CONFIRMED');
  const meta = document.createElement('span');
  meta.className = 'rlist-meta' + ((confirmed && !r.owner_hidden && !r.crowd_hidden) ? ' confirmed' : '');
  meta.textContent = bits.join(' \u00b7 ');
  row.appendChild(meta);

  if (ownerMode) {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'rlist-act';
    btn.textContent = r.owner_hidden ? 'Restore' : 'Hide';
    btn.addEventListener('click', function (e) {
      e.stopPropagation();
      if (r.owner_hidden) window.ownerRestoreReport(id);
      else window.ownerHideReport(id);
    });
    row.appendChild(btn);
  } else {
    row.addEventListener('click', function () { focusReport(id); });
  }
  return row;
}

/** The list beside the dispatch cards, honouring the same report filter. */
export function renderReportList(reports) {
  const wrap = document.getElementById('report-list');
  const host = document.getElementById('report-rows');
  const countEl = document.getElementById('report-list-count');
  const ownerBtn = document.getElementById('report-owner-btn');
  if (!wrap || !host) return;
  if (ownerBtn) ownerBtn.classList.toggle('active', ownerMode);

  const localHidden = locallyHiddenReports();
  let rows = (reports || []).filter(function (r) { return !localHidden.has(r.id); });
  if (reportSearch) rows = rows.filter(function (r) { return reportMatchesSearch(r, reportSearch); });
  if (reportFilter === 'confirmed') rows = rows.filter(function (r) { return !!r.county_match; });
  if (reportFilter === 'off') rows = [];

  host.innerHTML = '';
  if (!rows.length) {
    wrap.classList.add('hidden');
    if (countEl) countEl.textContent = '';
    return;
  }
  wrap.classList.remove('hidden');
  if (countEl) countEl.textContent = String(rows.length);
  for (let i = 0; i < rows.length; i++) host.appendChild(reportListRow(rows[i]));
}

/**
 * A report matches when the term appears in what a person can actually read
 * about it: its category (fire, traffic...), its note, or the dispatch call it
 * was confirmed against. That is the report-side counterpart of searchHit(),
 * which covers location, call type, call number, disposition and agency.
 */
export function reportMatchesSearch(r, term) {
  const q = String(term || '').trim().toLowerCase();
  if (!q) return true;
  const fields = [r.category, r.note];
  if (r.county_match) fields.push(r.county_match.call_type, r.county_match.location);
  for (let i = 0; i < fields.length; i++) {
    const v = fields[i];
    if (v && String(v).toLowerCase().indexOf(q) !== -1) return true;
  }
  return false;
}

/** The search box drives the report list and pins as well as the dispatch cards. */
export function setReportSearch(term) {
  const next = String(term || '').trim().toLowerCase();
  if (next === reportSearch) return;
  reportSearch = next;
  renderReports(lastReports);
}

/** One report fetch for the map, the list and the owner view alike. */
export async function refreshReportFeed() {
  const key = ownerKey();
  let resp;
  try {
    resp = await fetch('/api/reports', key ? { headers: { 'X-Owner-Key': key } } : undefined);
  } catch (err) {
    throw err;
  }
  if (!resp.ok) {
    if (key && (resp.status === 401 || resp.status === 403)) forgetOwnerKey();
    return null;
  }
  const data = await resp.json().catch(function () { return {}; });
  if (key && data && data.owner) ownerMode = true;
  if (data && data.reports) renderReports(data.reports);
  return data;
}

window.refreshReports = refreshReportFeed;

window.toggleOwnerMode = async function () {
  if (ownerMode) {
    forgetOwnerKey();
    renderReportList(lastReports);
    await refreshReportFeed();
    return;
  }
  const entered = window.prompt('Owner key');
  if (!entered) return;
  try {
    const resp = await fetch('/api/reports', { headers: { 'X-Owner-Key': entered } });
    const data = await resp.json().catch(function () { return {}; });
    if (!resp.ok || !data.owner) {
      window.alert((data && data.error) || 'That key was not accepted');
      return;
    }
    try { localStorage.setItem(OWNER_KEY_STORAGE, entered); } catch (e) {}
    ownerMode = true;
    renderReportList(data.reports || []);
    await refreshReportFeed();
  } catch (err) {
    window.alert('Could not check the key: ' + err.message);
  }
};

async function ownerAction(id, action) {
  const key = ownerKey();
  if (!key) {
    window.alert('Enter the owner key first');
    return;
  }
  try {
    const resp = await fetch('/api/reports/' + encodeURIComponent(id) + '/' + action, {
      method: 'POST',
      headers: { 'X-Owner-Key': key }
    });
    const data = await resp.json().catch(function () { return {}; });
    if (!resp.ok) {
      if (resp.status === 401 || resp.status === 403) forgetOwnerKey();
      window.alert((data && data.error) || ('Owner action failed (' + resp.status + ')'));
      return;
    }
    await refreshReportFeed();
  } catch (err) {
    window.alert('Owner action failed: ' + err.message);
  }
}

window.ownerHideReport = function (id) { return ownerAction(id, 'hide'); };
window.ownerRestoreReport = function (id) { return ownerAction(id, 'restore'); };

let reportPreview = null;
let reportPickHandler = null;

function reportPinIcon() {
  return L.divIcon({
    className: 'report-pin',
    html: '<span></span>',
    iconSize: [14, 14],
    iconAnchor: [7, 7],
  });
}

/** A draggable pin showing where the report will land, before it is sent. */
export function setReportPreview(lat, lng, onMove) {
  if (!map) return;
  if (!reportPreview) {
    reportPreview = L.marker([lat, lng], { draggable: true, icon: reportPinIcon() }).addTo(map);
    reportPreview.on('dragend', function () {
      const p = reportPreview.getLatLng();
      const cb = reportPreview._sbOnMove;
      if (cb) cb(p.lat, p.lng);
    });
  } else {
    reportPreview.setLatLng([lat, lng]);
  }
  reportPreview._sbOnMove = onMove || null;
}

export function clearReportPreview() {
  if (reportPreview && map) map.removeLayer(reportPreview);
  reportPreview = null;
}

/** One-shot: the next tap on the map chooses the report location. */
export function startReportPick(onPick) {
  if (!map) return;
  stopReportPick();
  reportPickHandler = function (e) {
    stopReportPick();
    onPick(e.latlng.lat, e.latlng.lng);
  };
  map.on('click', reportPickHandler);
  const el = map.getContainer();
  if (el) el.style.cursor = 'crosshair';
}

export function stopReportPick() {
  if (map && reportPickHandler) map.off('click', reportPickHandler);
  reportPickHandler = null;
  if (map) {
    const el = map.getContainer();
    if (el) el.style.cursor = '';
  }
}

function updateLegendState() {
  const buttons = document.querySelectorAll('.report-legend .rl-buttons button');
  for (let i = 0; i < buttons.length; i++) {
    const btn = buttons[i];
    if (btn.getAttribute('data-mode') === reportFilter) btn.classList.add('active');
    else btn.classList.remove('active');
  }
}

export function setReportFilter(mode) {
  reportFilter = (mode === 'confirmed' || mode === 'off') ? mode : 'all';
  try {
    localStorage.setItem('sb-report-filter', reportFilter);
  } catch (e) {
    /* storage may be blocked */
  }
  updateLegendState();
  renderReports(lastReports);
}

/** Legend plus an all / confirmed / off filter for the crowd layer. */
export function initReportLegend() {
  if (!map || reportLegendControl) return;
  reportLegendControl = L.control({ position: 'bottomright' });
  reportLegendControl.onAdd = function () {
    const div = L.DomUtil.create('div', 'report-legend');
    div.innerHTML =
      '<div class="rl-title">Community reports</div>' +
      '<div class="rl-row"><span class="rl-dot amber"></span>Unverified</div>' +
      '<div class="rl-row"><span class="rl-dot green"></span>Confirmed by dispatch</div>' +
      '<div class="rl-buttons">' +
      '<button type="button" data-mode="all">All</button>' +
      '<button type="button" data-mode="confirmed">Confirmed</button>' +
      '<button type="button" data-mode="off">Off</button>' +
      '</div>';
    L.DomEvent.disableClickPropagation(div);
    const btns = div.querySelectorAll('button');
    for (let i = 0; i < btns.length; i++) {
      btns[i].addEventListener('click', function () {
        setReportFilter(this.getAttribute('data-mode'));
      });
    }
    return div;
  };
  reportLegendControl.addTo(map);
  updateLegendState();
}

/** Reflect the lock state on the map control. */
function updateLockButton() {
  const btn = document.getElementById('lock-btn');
  if (!btn) return;
  btn.textContent = viewPinned ? '\uD83D\uDD12' : '\uD83D\uDD13';
  btn.title = viewPinned
    ? 'View locked \u2014 the refresh will not move the map. Click to unlock.'
    : 'View unlocked \u2014 click to lock the map where it is.';
  btn.classList.toggle('active', viewPinned);
}

/** Lock or release the view explicitly, independently of any gesture. */
export function toggleViewLock() {
  viewPinned = !viewPinned;
  try {
    localStorage.setItem(LOCK_KEY, viewPinned ? '1' : '0');
    if (!viewPinned) localStorage.removeItem('sb-map-view');
  } catch (e) {}
  updateLockButton();
  if (!viewPinned && markers.length > 0) {
    const bounds = markers.map(m => m.getLatLng());
    map.fitBounds(bounds, { padding: [30, 30], maxZoom: 13, animate: true, duration: 0.6 });
  }
}

/** Release the pinned view so the next filter pass can refit the county. */
export function unpinMapView() {
  viewPinned = false;
  try { localStorage.setItem(LOCK_KEY, '0'); localStorage.removeItem('sb-map-view'); } catch (e) {}
  updateLockButton();
}

export function filterByAgency(agencyCode) {
  markerGroup.clearLayers();
  markers = [];
  hideMiniModal();
  for (const r of allMapRecords) {
    if (!agencyCode || r.agency === agencyCode) {
      const m = addMarker(r);
      if (m) {
        m.addTo(markerGroup);
        markers.push(m);
      }
    }
  }
  if (markers.length > 0 && !viewPinned) {
    const bounds = markers.map(m => m.getLatLng());
    map.fitBounds(bounds, { padding: [30, 30], maxZoom: 14, animate: true, duration: 0.6 });
  }
}

export function filterByExclude(excludedSet) {
  markerGroup.clearLayers();
  markers = [];
  hideMiniModal();
  for (const r of allMapRecords) {
    if (!excludedSet || !excludedSet.has(r.agency)) {
      const m = addMarker(r);
      if (m) {
        m.addTo(markerGroup);
        markers.push(m);
      }
    }
  }
  if (markers.length > 0 && !viewPinned) {
    const bounds = markers.map(m => m.getLatLng());
    map.fitBounds(bounds, { padding: [30, 30], maxZoom: 14, animate: true, duration: 0.6 });
  }
}

function haversineMi(lat1, lon1, lat2, lon2) {
  const R = 3958.8;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = Math.sin(dLat / 2) ** 2 + Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * Math.sin(dLon / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

export function filterNearby(lat, lng, radiusMi) {
  markerGroup.clearLayers();
  markers = [];
  hideMiniModal();
  for (const r of allMapRecords) {
    if (!Number.isFinite(r.lat) || !Number.isFinite(r.lng)) continue;
    if (haversineMi(lat, lng, r.lat, r.lng) <= radiusMi) {
      const m = addMarker(r);
      if (m) {
        m.addTo(markerGroup);
        markers.push(m);
      }
    }
  }
}

let radiusCircle = null;

function updateRadiusCircle(lat, lng, radiusMi) {
  if (!radiusCircle) {
    radiusCircle = L.circle([lat, lng], {
      radius: radiusMi * 1609.34,
      color: '#3b82f6',
      fillColor: '#3b82f6',
      fillOpacity: 0.06,
      weight: 1,
      dashArray: '6 4',
      interactive: false,
    }).addTo(map);
  } else {
    radiusCircle.setLatLng([lat, lng]);
    radiusCircle.setRadius(radiusMi * 1609.34);
  }
}

function removeRadiusCircle() {
  if (radiusCircle) { map.removeLayer(radiusCircle); radiusCircle = null; }
}

window._updateRadiusCircleImmediate = function (lat, lng, radiusMi) {
  updateRadiusCircle(lat, lng, radiusMi);
};

function updateUserMarker(lat, lng) {
  if (!userMarker) {
    userMarker = L.circleMarker([lat, lng], {
      radius: 7,
      fillColor: '#3b82f6',
      color: '#fff',
      weight: 2,
      opacity: 1,
      fillOpacity: 0.9,
      zIndexOffset: 1000,
    }).addTo(map);

    userPulse = L.circleMarker([lat, lng], {
      radius: 7,
      fillColor: '#3b82f6',
      color: '#3b82f6',
      weight: 0,
      opacity: 0.35,
      fillOpacity: 0.35,
      interactive: false,
      zIndexOffset: 999,
    }).addTo(map);

    let expanding = true;
    let pr = 7;
    const pulseAnim = () => {
      if (!userPulse) return;
      pr += expanding ? 0.3 : -0.3;
      if (pr >= 22) expanding = false;
      if (pr <= 7) expanding = true;
      userPulse.setRadius(pr);
      requestAnimationFrame(pulseAnim);
    };
    requestAnimationFrame(pulseAnim);
  } else {
    userMarker.setLatLng([lat, lng]);
    userPulse.setLatLng([lat, lng]);
  }
}

function removeUserMarker() {
  if (userMarker) { map.removeLayer(userMarker); userMarker = null; }
  if (userPulse) { map.removeLayer(userPulse); userPulse = null; }
}

function showLocateStatus(text) {
  const btn = document.getElementById('locate-btn');
  if (btn) btn.title = text;
}

export function setMapUserLocation(lat, lng) {
  updateUserMarker(lat, lng);
  updateRadiusCircle(lat, lng, window._nearbyRadiusMi || 5);
  map.flyTo([lat, lng], 13, { animate: true, duration: 1 });

  if (!userWatchId) {
    userWatchId = navigator.geolocation.watchPosition(
      (p) => updateUserMarker(p.coords.latitude, p.coords.longitude),
      () => {},
      { enableHighAccuracy: true, maximumAge: 5000 }
    );
  }
  showLocateStatus('Tracking \\u2014 click to stop');
  const btn = document.getElementById('locate-btn');
  if (btn) btn.classList.add('active');
}

export function removeMapUserLocation() {
  if (userWatchId) {
    navigator.geolocation.clearWatch(userWatchId);
    userWatchId = null;
  }
  removeUserMarker();
  removeRadiusCircle();
  showLocateStatus('Find me');
  const btn = document.getElementById('locate-btn');
  if (btn) btn.classList.remove('active');
}

function toggleLocate() {
  if (userWatchId) {
    if (window._exitNearby) window._exitNearby();
    return;
  }

  if (!navigator.geolocation) {
    showLocateStatus('Geolocation not supported');
    return;
  }

  showLocateStatus('Locating...');
  navigator.geolocation.getCurrentPosition(
    (pos) => {
      const { latitude: lat, longitude: lng } = pos.coords;
      if (window._exitNearby && !window._nearbyMode) {
        window._exitNearby();
      }
      if (!window._nearbyMode) {
        window.toggleNearby();
      } else {
        setMapUserLocation(lat, lng);
      }
    },
    (err) => {
      showLocateStatus('Location denied');
      setTimeout(() => showLocateStatus('Find me'), 2000);
    },
    { enableHighAccuracy: true, timeout: 10000 }
  );
}

window.openDeepDive = function(hash) {
  hideMiniModal();
  const record = findRecordByHash(hash);
  if (record && window.showDeepDive) {
    window.showDeepDive(record);
  }
};

window.focusMarker = focusMarker;
window.hideMiniModal = hideMiniModal;
window.pulseMarkerByHash = pulseMarkerByHash;
`, type: "application/javascript" },
  "/js/cards.js": { content: `import { APP_DATA } from './app-data.js';

let allRecords = [];
let activeCategory = null;
let timeFilterMin = 0;
var bookmarks = new Set(JSON.parse(localStorage.getItem('sb-bookmarks') || '[]'));
var bookmarkMode = false;
function saveBookmarks() { localStorage.setItem('sb-bookmarks', JSON.stringify([...bookmarks])); }
function getBookmarkIcon(hash) { return bookmarks.has(hash) ? '\u2605' : '\u2606'; }
function toggleBookmark(hash) { if (bookmarks.has(hash)) bookmarks.delete(hash); else bookmarks.add(hash); saveBookmarks(); }
export function setBookmarkMode(on) { bookmarkMode = on; filterCards(window._currentSearch || '', window._currentAgency || '', window._excludedAgencies || new Set(), null); }
let allCards = [];
let currentSort = 'newest';
let sortAsc = false;
let currentGroup = '';
let isolatedGroup = null;
let _nearby = null;

const AGENCY_COLORS = APP_DATA.colors;
const SEVERITY = APP_DATA.severity;
const AGENCY_LABELS = APP_DATA.labels;
const TYPE_LABELS = APP_DATA.callTypeDescs;

const SEV_ORDER = { high: 0, medium: 1, low: 2 };

function timeAgo(dateStr) {
  if (!dateStr) return '';
  let d;
  try { d = new Date(dateStr); } catch { return ''; }
  if (isNaN(d.getTime())) return '';
  const diff = Math.floor((Date.now() - d.getTime()) / 1000);
  if (diff < 60) return \`\${diff}s\`;
  if (diff < 3600) return \`\${Math.floor(diff / 60)}m\`;
  if (diff < 86400) return \`\${Math.floor(diff / 3600)}h\`;
  return \`\${Math.floor(diff / 86400)}d\`;
}

function parseDate(dateStr) {
  if (!dateStr) return 0;
  try { return new Date(dateStr).getTime() || 0; } catch { return 0; }
}

function haversineMi(lat1, lon1, lat2, lon2) {
  const R = 3958.8;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = Math.sin(dLat / 2) ** 2 + Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * Math.sin(dLon / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

function getSeverity(r) {
  return SEVERITY[r.call_type?.toUpperCase()] || 'low';
}

function sortRecords(records, sortKey, asc) {
  const sorted = [...records];
  sorted.sort((a, b) => {
    let cmp = 0;
    switch (sortKey) {
      case 'newest':
      case 'oldest':
        cmp = parseDate(a.call_date) - parseDate(b.call_date);
        break;
      case 'agency':
        cmp = (a.agency || '').localeCompare(b.agency || '');
        break;
      case 'type':
        cmp = (a.call_type || '').localeCompare(b.call_type || '');
        break;
      case 'severity': {
        const sa = SEV_ORDER[getSeverity(a)] ?? 3;
        const sb = SEV_ORDER[getSeverity(b)] ?? 3;
        cmp = sa - sb;
        break;
      }
      case 'dispo':
        cmp = (a.dispo || '').localeCompare(b.dispo || '');
        break;
    }
    return asc ? cmp : -cmp;
  });
  return sorted;
}

function groupRecords(records, groupKey) {
  const groups = {};
  for (const r of records) {
    let key;
    switch (groupKey) {
      case 'agency': key = r.agency || 'Unknown'; break;
      case 'type': key = r.call_type || 'Unknown'; break;
      case 'severity': key = getSeverity(r); break;
      default: key = null;
    }
    if (key === null) return null;
    if (!groups[key]) groups[key] = [];
    groups[key].push(r);
  }
  return groups;
}

const TRUTH_ENGINE_URL = 'https://truth-engine-workspace.ai-n.workers.dev/api/cards';

async function sendToTruthEngine(r, btn) {
  btn.disabled = true;
  btn.innerHTML = '&#8987;';
  try {
    const sev = getSeverity(r);
    const content = [
      \`# SB County Dispatch Call\`,
      '',
      \`| Field | Value |\`,
      \`|-------|-------|\`,
      \`| **Agency** | \${r.agency || 'Unknown'} |\`,
      \`| **Call #** | \${r.call_no || 'N/A'} |\`,
      \`| **Type** | \${r.call_type || 'Unknown'} |\`,
      \`| **Location** | \${r.location || 'No location'} |\`,
      \`| **Disposition** | \${r.dispo || 'N/A'} |\`,
      \`| **Time** | \${r.call_date || 'Unknown'} |\`,
      \`| **Severity** | \${sev.toUpperCase()} |\`,
      r.lat && r.lng ? \`| **Coordinates** | \${r.lat.toFixed(4)}, \${r.lng.toFixed(4)} |\` : '',
      '',
      '---',
      '',
      '*Forwarded from SB County Dispatch Monitor*',
    ].filter(Boolean).join('\\n');

    const resp = await fetch(TRUTH_ENGINE_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        type: 'Document',
        title: \`\${r.agency || '?'} \u2014 \${r.call_no || r.call_type || 'Dispatch Call'}\`,
        content,
        domains: ['dispatch', 'public-safety', (r.agency || '').toLowerCase()],
      }),
    });

    if (resp.ok) {
      btn.innerHTML = '&#10003;';
      btn.classList.add('sent');
      setTimeout(() => {
        btn.innerHTML = '&#x2b;';
        btn.classList.remove('sent');
        btn.disabled = false;
      }, 2000);
    } else {
      throw new Error(\`HTTP \${resp.status}\`);
    }
  } catch (err) {
    btn.innerHTML = '&#10007;';
    btn.classList.add('error');
    setTimeout(() => {
      btn.innerHTML = '&#x2b;';
      btn.classList.remove('error');
      btn.disabled = false;
    }, 2000);
  }
}

function createCard(r) {
  const sev = getSeverity(r);
  const color = AGENCY_COLORS[r.agency] || '#555';
  const dispoClass = (r.dispo || '').toLowerCase();

  let distHtml = '';
  if (_nearby && Number.isFinite(r.lat) && Number.isFinite(r.lng)) {
    const d = haversineMi(_nearby.lat, _nearby.lng, r.lat, r.lng);
    distHtml = \`<span class="card-dist">\${d < 1 ? \`\${Math.round(d * 5280)}ft\` : \`\${d.toFixed(1)}mi\`}</span>\`;
  }

  const el = document.createElement('div');
  el.className = 'dispatch-card';
  el.dataset.hash = r.hash || '';
  el.dataset.agency = r.agency || '';
  el.dataset.severity = sev;
  el.dataset.callType = r.call_type || '';
  el.dataset.dispo = r.dispo || '';
  el.dataset.callDate = r.call_date || '';

  el.innerHTML = \`
    <div class="card-top">
      <span class="agency-badge" style="color:\${color}">\${r.agency || '?'}</span>
      <span class="call-type">\${r.call_type || ''}</span>
      \${distHtml}
      <span class="card-time">\${timeAgo(r.call_date)}</span>
    </div>
    <div class="card-loc">\${r.location || ''}</div>
    <div class="card-bottom">
      <span class="call-no">\${r.call_no || ''}</span>
      <span class="dispo-text \${dispoClass}">\${r.dispo || ''}</span>
      <button class="card-send" title="Send to Truth Engine" data-hash="\${r.hash || ''}">&#x2b;</button>
    </div>\`;

  el.addEventListener('click', (e) => {
    if (e.target.closest('.card-send')) return;
    e.stopPropagation();
    if (window.focusMarker) window.focusMarker(r.hash);
  });

  el.addEventListener('mouseenter', () => {
    if (window.pulseMarkerByHash) window.pulseMarkerByHash(r.hash);
  });

  const sendBtn = el.querySelector('.card-send');
  if (sendBtn) {
    sendBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      sendToTruthEngine(r, sendBtn);
    });
  }

  return el;
}

function createGroupHeader(key, label, count, color) {
  const el = document.createElement('div');
  el.className = 'group-header' + (isolatedGroup === key ? ' active' : '');
  el.dataset.groupKey = key;
  const dotHtml = color ? \`<span class="group-dot" style="background:\${color}"></span>\` : '';
  el.innerHTML = \`\${dotHtml}<span class="group-label">\${label}</span><span class="group-count">\${count}</span><span class="group-isolate-hint">click to isolate</span>\`;
  el.addEventListener('click', () => {
    if (isolatedGroup === key) {
      isolatedGroup = null;
    } else {
      isolatedGroup = key;
    }
    filterCards(window._currentSearch || '', window._currentAgency || '', window._excludedAgencies, window._nearbyMode ? { lat: window._userLat, lng: window._userLng, radiusMi: 5 } : null);
  });
  return el;
}

function renderCards(records, nearby) {
  const container = document.getElementById('card-grid');
  if (!container) return;
  container.innerHTML = '';
  allCards = [];
  _nearby = nearby || null;
  let cardIndex = 0;

  if (records.length === 0) {
    const empty = document.createElement('div');
    empty.className = 'empty-state card-enter';
    empty.textContent = 'No matching records';
    container.appendChild(empty);
    return 0;
  }

  const sorted = sortRecords(records, currentSort, sortAsc);

  function appendCard(r) {
    const card = createCard(r);
    card.classList.add('card-enter');
    card.style.animationDelay = \`\${Math.min(cardIndex * 18, 400)}ms\`;
    container.appendChild(card);
    allCards.push(card);
    cardIndex++;
  }

  if (currentGroup) {
    const groups = groupRecords(sorted, currentGroup);
    if (groups) {
      const groupKeys = Object.keys(groups).sort();
      for (const key of groupKeys) {
        const groupRecs = groups[key];
        let label = key;
        let color = null;
        if (currentGroup === 'agency') {
          label = \`\${key} \\u2014 \${AGENCY_LABELS[key] || key}\`;
          color = AGENCY_COLORS[key] || '#555';
        } else if (currentGroup === 'type') {
          label = \`\${key} \\u2014 \${TYPE_LABELS[key] || key}\`;
        } else if (currentGroup === 'severity') {
          label = key.charAt(0).toUpperCase() + key.slice(1);
          color = { high: '#ef4444', medium: '#f59e0b', low: '#22c55e' }[key] || '#555';
        }
        const header = createGroupHeader(key, label, groupRecs.length, color);
        header.classList.add('card-enter');
        container.appendChild(header);
        if (isolatedGroup && key !== isolatedGroup) continue;
        for (const r of groupRecs) {
          appendCard(r);
        }
      }
      return allCards.length;
    }
  }

  for (const r of sorted) {
    appendCard(r);
  }
  return sorted.length;
}

export function updateCards(records) {
  allRecords = records;
  isolatedGroup = null;
  const count = renderCards(records);
  const countEl = document.getElementById('card-count');
  if (countEl) countEl.textContent = \`\${records.length} shown\`;
}

export function filterCards(searchTerm, agencyCode, excludedSet, nearby) {
  let filtered = allRecords;
  if (agencyCode) {
    filtered = filtered.filter(r => r.agency === agencyCode);
  }
  if (excludedSet && excludedSet.size > 0) {
    filtered = filtered.filter(r => !excludedSet.has(r.agency));
  }
  if (nearby) {
    filtered = filtered.filter(r => {
      if (!Number.isFinite(r.lat) || !Number.isFinite(r.lng)) return false;
      return haversineMi(nearby.lat, nearby.lng, r.lat, r.lng) <= nearby.radiusMi;
    });
    filtered.sort((a, b) => haversineMi(nearby.lat, nearby.lng, a.lat, a.lng) - haversineMi(nearby.lat, nearby.lng, b.lat, b.lng));
  }
  if (timeFilterMin > 0) {
    var cutoff = Date.now() - timeFilterMin * 60000;
    filtered = filtered.filter(function(r) { var t = new Date(r.scraped_at || r.call_date || 0).getTime(); return t >= cutoff; });
  }
  if (activeCategory) {
    filtered = filtered.filter(r => (r.category || '') === activeCategory);
  }
  if (bookmarkMode) {
    filtered = filtered.filter(r => bookmarks.has(r.hash));
  }
  if (searchTerm) {
    const q = searchTerm.toLowerCase();
    filtered = filtered.filter(r =>
      (r.location || '').toLowerCase().includes(q) ||
      (r.call_type || '').toLowerCase().includes(q) ||
      (r.call_no || '').toLowerCase().includes(q) ||
      (r.dispo || '').toLowerCase().includes(q) ||
      (r.agency || '').toLowerCase().includes(q)
    );
  }
  const count = renderCards(filtered, nearby);
  const countEl = document.getElementById('card-count');
  if (countEl) countEl.textContent = \`\${count || 0} shown\`;
}

export function setSort(sortKey) {
  if (sortKey === currentSort) {
    sortAsc = !sortAsc;
  } else {
    currentSort = sortKey;
    sortAsc = sortKey === 'agency' || sortKey === 'type' || sortKey === 'dispo';
  }
  updateSortDirIcon();
  filterCards(window._currentSearch || '', window._currentAgency || '', window._excludedAgencies, window._nearbyMode ? { lat: window._userLat, lng: window._userLng, radiusMi: 5 } : null);
}

export function setGroup(groupKey) {
  currentGroup = groupKey;
  isolatedGroup = null;
  filterCards(window._currentSearch || '', window._currentAgency || '', window._excludedAgencies, window._nearbyMode ? { lat: window._userLat, lng: window._userLng, radiusMi: 5 } : null);
}

export function setCategory(cat) {
  activeCategory = activeCategory === cat ? null : cat;
  filterCards(window._currentSearch || '', window._currentAgency || '', window._excludedAgencies || new Set(), window._nearbyMode ? { lat: window._userLat, lng: window._userLng, radiusMi: 5 } : null);
}

function updateSortDirIcon() {
  const btn = document.getElementById('sort-dir');
  if (btn) btn.textContent = sortAsc ? '\\u2191' : '\\u2193';
}

export function highlightCard(hash) {
  for (const card of allCards) {
    card.classList.remove('highlight');
    if (card.dataset.hash === hash) {
      card.classList.add('highlight');
      card.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      setTimeout(() => card.classList.remove('highlight'), 3000);
      return;
    }
  }
}

export function renderSkeletons(count) {
  const container = document.getElementById('card-grid');
  if (!container) return;
  container.innerHTML = '';
  allCards = [];
  for (let i = 0; i < count; i++) {
    const el = document.createElement('div');
    el.className = 'dispatch-card skeleton';
    el.innerHTML = \`
      <div class="skeleton-line skeleton-line-short"></div>
      <div class="skeleton-line skeleton-line-long"></div>
      <div class="skeleton-line skeleton-line-medium"></div>\`;
    container.appendChild(el);
  }
}

window.highlightCard = highlightCard;
`, type: "application/javascript" },
  "/js/deepdive.js": { content: `const CALL_TYPES = {
  '459':  { desc:'Burglary', cat:'Property Crime', sev:'high', penal:'PC 459', notes:'Breaking and entering with intent to commit theft or felony.' },
  '459A': { desc:'Burglary Alarm', cat:'Alarm', sev:'medium', penal:'PC 459', notes:'Alarm triggered; may be false or attempted break-in.' },
  '594':  { desc:'Vandalism', cat:'Property Crime', sev:'medium', penal:'PC 594', notes:'Willful destruction or defacement of property.' },
  '602':  { desc:'Trespassing', cat:'Property Crime', sev:'low', penal:'PC 602', notes:'Entering or remaining on property without permission.' },
  '647B': { desc:'Prostitution', cat:'Vice', sev:'medium', penal:'PC 647(b)', notes:'Engaging in or soliciting sexual conduct for money.' },
  '415M': { desc:'Disturbance (Music)', cat:'Disturbance', sev:'low', penal:'PC 415', notes:'Noise complaint, typically loud music.' },
  '415UNK':{ desc:'Disturbance (Unknown)', cat:'Disturbance', sev:'medium', penal:'PC 415', notes:'Disturbance with unspecified nature; requires investigation.' },
  '23103':{ desc:'Reckless Driving', cat:'Traffic', sev:'high', penal:'VC 23103', notes:'Driving with willful disregard for safety of persons or property.' },
  '23110':{ desc:'Throwing Objects at Vehicle', cat:'Traffic', sev:'high', penal:'VC 23110', notes:'Throwing objects at vehicles; potentially deadly.' },
  '12500A':{ desc:'Unlicensed Driver', cat:'Traffic', sev:'low', penal:'VC 12500(a)', notes:'Operating vehicle without valid driver license.' },
  '1181': { desc:'Traffic Collision (Injury)', cat:'Traffic', sev:'high', penal:'Vehicle', notes:'Vehicle collision resulting in injuries; potential fatalities.' },
  'SUSPER':{ desc:'Suspicious Person', cat:'Suspicious', sev:'medium', notes:'Person exhibiting behavior indicating possible criminal intent.' },
  'SS':   { desc:'Subject Stop', cat:'Officer Initiated', sev:'low', notes:'Officer-initiated stop of a subject for investigation.' },
  'AREACK':{ desc:'Area Check', cat:'Patrol', sev:'low', notes:'Patrol unit checking designated area for suspicious activity.' },
  'BSCK': { desc:'Business Check', cat:'Patrol', sev:'low', notes:'Routine check of business premises during patrol.' },
  'AOD':  { desc:'Assist Other Dept', cat:'Assist', sev:'low', notes:'Providing mutual aid to another department.' },
  'WELCK':{ desc:'Welfare Check', cat:'Wellness', sev:'medium', notes:'Checking on wellbeing of a person at request of third party.' },
  'W911': { desc:'911 Wireless', cat:'Emergency', sev:'high', notes:'Emergency call from mobile device; high priority response.' },
  'FU':   { desc:'Follow Up', cat:'Administrative', sev:'low', notes:'Follow-up investigation on previously reported incident.' },
  'T':    { desc:'Traffic Stop', cat:'Traffic', sev:'low', notes:'Routine traffic stop for violation or equipment issue.' },
  'INFO': { desc:'Information', cat:'Administrative', sev:'low', notes:'Information call; no enforcement action needed.' },
};

const DISPOS = {
  '*':  { desc:'No Disposition', meaning:'Call closed without formal disposition.', detail:'The call was logged but no formal conclusion was recorded. This may indicate an administrative closure or a data entry gap.' },
  'NAT':{ desc:'Necessary Action Taken', meaning:'Routine clearance. Deputies responded, appropriate action taken.', detail:'Officers responded and handled the situation. No arrest, report, or follow-up needed. Standard resolution for most calls.' },
  'RTF':{ desc:'Report To Follow', meaning:'Significant incident. Formal report will be filed.', detail:'The incident was serious enough to warrant formal documentation. A report number will be assigned and the case may be investigated further.' },
  'CAN':{ desc:'Canceled', meaning:'Call canceled before or during response.', detail:'The call was canceled by the caller or dispatch. Officers may have been en route but the situation resolved itself.' },
  'CIT':{ desc:'Crisis Intervention', meaning:'Mental health crisis. CIT-trained officers used de-escalation.', detail:'Specialized Crisis Intervention Team responded. Focus on de-escalation and connection to mental health resources rather than arrest.' },
  'CIV':{ desc:'Civil Matter', meaning:'Not criminal. Law enforcement cannot intervene.', detail:'Dispute is civil in nature (tenant, neighbor, family). Law enforcement has no authority to enforce civil matters.' },
  'GOA':{ desc:'Gone on Arrival', meaning:'Subjects or evidence no longer present.', detail:'Officers arrived but the subject of the call (suspect, victim, or evidence) was no longer at the scene.' },
  'UNF':{ desc:'Unfounded', meaning:'No real incident occurred.', detail:'Investigation determined the reported incident did not occur. May be false report, mistaken observation, or hoax.' },
  'ARR':{ desc:'Arrest Made', meaning:'Arrest occurred at scene.', detail:'Subject was taken into custody. Charges will be filed and processed through the justice system.' },
};

const SEV_COLORS = { high: '#ef4444', medium: '#f59e0b', low: '#22c55e' };
const SEV_ICONS = { high: '\\u26A0', medium: '\\u25B2', low: '\\u25CB' };

function formatFullTimestamp(dateStr) {
  if (!dateStr) return 'Unknown';
  try {
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return dateStr;
    return d.toLocaleString('en-US', {
      weekday:'short', month:'short', day:'numeric',
      hour:'numeric', minute:'2-digit', second:'2-digit', hour12:true
    });
  } catch { return dateStr; }
}

function buildAnalysis(ct, dp) {
  if (!ct && !dp) return '<span style="color:var(--text-3)">Insufficient data for analysis.</span>';
  let parts = [];
  if (ct) {
    parts.push(\`<div style="margin-bottom:6px"><strong>\${SEV_ICONS[ct.sev] || ''} \${ct.desc}</strong> <span style="color:var(--text-3)">\${ct.penal || ''}</span></div>\`);
    parts.push(\`<div style="color:var(--text-3);font-size:11px;margin-bottom:2px">Category: <span style="color:var(--text)">\${ct.cat}</span></div>\`);
    parts.push(\`<div class="severity-bar"><div class="severity-bar-fill" style="width:\${ct.sev === 'high' ? 100 : ct.sev === 'medium' ? 60 : 30}%;background:\${SEV_COLORS[ct.sev]}"></div></div>\`);
    parts.push(\`<div style="color:\${SEV_COLORS[ct.sev]};font-size:11px;margin-top:2px">\${ct.sev.toUpperCase()} SEVERITY</div>\`);
    if (ct.notes) parts.push(\`<div style="color:var(--text-3);font-size:11px;margin-top:4px;font-style:italic">\${ct.notes}</div>\`);
  }
  if (dp) {
    parts.push(\`<div style="margin-top:8px"><strong>Disposition:</strong> \${dp.desc}</div>\`);
    parts.push(\`<div style="color:var(--text-3);font-size:11px;margin-top:2px">\${dp.meaning}</div>\`);
    if (dp.detail) parts.push(\`<div style="color:var(--text-3);font-size:11px;margin-top:4px;font-style:italic">\${dp.detail}</div>\`);
  }
  if (ct && dp) {
    parts.push('<div style="margin-top:8px;padding-top:6px;border-top:1px solid var(--border)">');
    parts.push('<strong style="font-size:11px;color:var(--text-3)">COMBINED ASSESSMENT</strong><div style="margin-top:4px">');
    if (dp.desc === 'Report To Follow') parts.push(\`This \${ct.desc.toLowerCase()} has been confirmed. A formal report will be filed and may be investigated further. \${ct.sev === 'high' ? 'Given the high severity, this case will receive priority attention.' : 'Standard follow-up procedures apply.'}\`);
    else if (dp.desc === 'Necessary Action Taken') parts.push(\`Deputies responded to this \${ct.desc.toLowerCase()} and took appropriate action. The situation has been resolved without need for arrest or formal report.\`);
    else if (dp.desc === 'Canceled') parts.push(\`This \${ct.desc.toLowerCase()} call was canceled. The situation appears to have resolved before officers arrived on scene.\`);
    else if (dp.desc === 'Crisis Intervention') parts.push(\`This \${ct.desc.toLowerCase()} was handled by a Crisis Intervention Team. De-escalation techniques were used, and the individual may be connected to mental health resources.\`);
    else if (dp.desc === 'Civil Matter') parts.push(\`This \${ct.desc.toLowerCase()} was determined to be a civil matter. Law enforcement cannot intervene in civil disputes; parties may need to pursue legal remedies.\`);
    else if (dp.desc === 'Arrest Made') parts.push(\`This \${ct.desc.toLowerCase()} resulted in an arrest. The subject is in custody and charges will be processed through the county justice system.\`);
    else if (dp.desc === 'Gone on Arrival') parts.push(\`When deputies arrived for this \${ct.desc.toLowerCase()}, the subject or evidence was no longer present at the scene.\`);
    else if (dp.desc === 'Unfounded') parts.push(\`Investigation determined this \${ct.desc.toLowerCase()} report was unfounded. No incident occurred.\`);
    else parts.push(dp.meaning);
    parts.push('</div></div>');
  }
  return parts.join('');
}

export function showDeepDive(record) {
  const modal = document.getElementById('deepdive-modal');
  const body = document.getElementById('deepdive-body');
  const ct = CALL_TYPES[record.call_type?.toUpperCase()];
  const dp = DISPOS[record.dispo?.toUpperCase()];
  const analysis = buildAnalysis(ct, dp);
  const sev = ct?.sev || 'low';
  const sevColor = SEV_COLORS[sev];
  const agencyColor = { AP:'#22c55e', VC:'#3b82f6', HE:'#f97316', VV:'#8b5cf6', SB:'#ef4444', BA:'#06b6d4', FN:'#ec4899', CH:'#eab308', HI:'#a855f7', LL:'#6366f1', RC:'#f43f5e', YC:'#84cc16', BB:'#14b8a6', CR:'#0ea5e9', NE:'#d946ef', MB:'#78716c', WE:'#78716c', TR:'#78716c', TW:'#78716c', TP:'#78716c', AD:'#a3a3a3', YV:'#a3a3a3', GT:'#a3a3a3', BL:'#14b8a6', SM:'#78716c', VT:'#a3a3a3', AV:'#78716c', AL:'#a3a3a3', CB:'#a3a3a3' }[record.agency] || '#555';

  body.innerHTML = \`
    <h2>
      <span class="popup-agency" style="background:\${agencyColor}">\${record.agency || '?'}</span>
      \${record.call_type || 'Unknown'}
      <span style="font-size:10px;font-family:var(--mono);color:\${sevColor};font-weight:600;margin-left:auto">\${SEV_ICONS[sev] || ''} \${sev.toUpperCase()}</span>
    </h2>
    <div class="analysis-section">
      <h3>Record Details</h3>
      <div class="row">
        <div><span class="label">Call #</span><br><span class="value">\${record.call_no || 'N/A'}</span></div>
        <div><span class="label">Report #</span><br><span class="value">\${record.report_no || 'N/A'}</span></div>
        <div><span class="label">Timestamp</span><br><span class="value">\${formatFullTimestamp(record.call_date)}</span></div>
        <div><span class="label">Disposition</span><br><span class="value" style="color:\${record.dispo === 'RTF' ? 'var(--amber)' : record.dispo === 'ARR' ? 'var(--red)' : record.dispo === 'NAT' ? 'var(--green)' : 'var(--text)'}">\${record.dispo || '*'}</span></div>
      </div>
    </div>
    <div class="analysis-section">
      <h3>Location</h3>
      <div style="font-size:12px;color:var(--text-2)">\${record.location || 'Unknown location'}</div>
    </div>
    <div class="analysis-section">
      <h3>Analysis</h3>
      <div class="analysis-text">\${analysis}</div>
    </div>
    <div class="analysis-section">
      <h3>Source</h3>
      <div style="font-size:11px;color:var(--text-3)">
        Scraped: <span style="color:var(--text-2)">\${record.scraped_at ? formatFullTimestamp(record.scraped_at) : 'N/A'}</span>
        &middot; Hash: <span style="color:var(--text-2);font-family:var(--mono)">\${record.hash || 'N/A'}</span>
      </div>
    </div>
    <div class="analysis-section">
      <h3>Raw Data</h3>
      <pre style="background:var(--bg);padding:0.5rem;border-radius:3px;font-size:10px;font-family:var(--mono);overflow-x:auto;color:var(--text-3);max-height:140px">\${JSON.stringify(record, null, 2)}</pre>
    </div>\`;

  modal.classList.remove('hidden');
  requestAnimationFrame(() => modal.classList.add('open'));
}

window.showDeepDive = showDeepDive;
`, type: "application/javascript" },
  "/js/app.js": { content: `import { initMap, updateMap, filterByAgency, filterByExclude, filterNearby, setMapUserLocation, removeMapUserLocation, applySearchFilter, unpinMapView, initReportLayer, initReportLegend, refreshReportFeed, setReportSearch, currentMapCenter, setReportPreview, clearReportPreview, startReportPick, stopReportPick } from './map.js';
import { updateCards, filterCards, highlightCard, setSort, setGroup, setCategory, setBookmarkMode, renderSkeletons } from './cards.js';
window.toggleBookmarkMode = function() { var btn = document.getElementById('btn-bookmarks'); var active = btn.classList.toggle('active'); setBookmarkMode(active); btn.textContent = active ? '\u2605' : '\u2606'; };
import { showDeepDive } from './deepdive.js';

let currentAgency = null;
let currentSearch = '';
let refreshInterval = null;
let lastRefreshTime = null;
let excludedAgencies = new Set();
let nearbyMode = false;
let nearbyRadiusMi = 5;
let radiusDebounceTimer = null;

window._currentSearch = '';
window._currentAgency = '';
window._excludedAgencies = excludedAgencies;
window._nearbyRadiusMi = nearbyRadiusMi;

var reportLat = null;
var reportLng = null;
var reportAccuracyM = null;

async function loadReports() {
  try {
    await refreshReportFeed();
  } catch (err) {
    console.error('Reports failed:', err);
  }
}

window.openReport = function () {
  var modal = document.getElementById('report-modal');
  if (!modal) return;
  if (reportLat == null) {
    var c = currentMapCenter();
    if (c) {
      reportLat = c.lat;
      reportLng = c.lng;
      document.getElementById('report-loc-label').textContent =
        'Using map centre (' + c.lat.toFixed(4) + ', ' + c.lng.toFixed(4) + ')';
      reportAccuracyM = null;
    }
  }
  var status = document.getElementById('report-status');
  status.textContent = '';
  status.classList.remove('error');
  document.getElementById('report-note').value = '';
  modal.classList.remove('hidden');
  requestAnimationFrame(function () { modal.classList.add('open'); });
};

window.closeReport = function () {
  var modal = document.getElementById('report-modal');
  if (!modal) return;
  modal.classList.remove('open');
  modal.classList.add('hidden');
};

function setReportLocation(lat, lng, label) {
  reportLat = lat;
  reportLng = lng;
  reportAccuracyM = null;
  setReportPreview(lat, lng, function (la, ln) {
    reportLat = la;
    reportLng = ln;
    document.getElementById('report-loc-label').textContent =
      'Pinned on map (' + la.toFixed(4) + ', ' + ln.toFixed(4) + ') - drag to adjust';
  });
  var el = document.getElementById('report-loc-label');
  if (el) {
    el.textContent = label + ' (' + lat.toFixed(4) + ', ' + lng.toFixed(4) + ') - drag the pin to adjust';
  }
}

window.pickReportOnMap = function () {
  var modal = document.getElementById('report-modal');
  if (modal) {
    modal.classList.remove('open');
    modal.classList.add('hidden');
  }
  var hint = document.getElementById('report-pick-hint');
  if (hint) hint.classList.remove('hidden');
  startReportPick(function (lat, lng) {
    if (hint) hint.classList.add('hidden');
    setReportLocation(lat, lng, 'Pinned on map');
    window.openReport();
  });
};

window.cancelReportPick = function () {
  stopReportPick();
  var hint = document.getElementById('report-pick-hint');
  if (hint) hint.classList.add('hidden');
  window.openReport();
};

window.useMyLocationForReport = function () {
  var label = document.getElementById('report-loc-label');
  if (!navigator.geolocation) {
    label.textContent = 'Location is not supported here';
    return;
  }
  label.textContent = 'Locating...';
  navigator.geolocation.getCurrentPosition(function (pos) {
    setReportLocation(pos.coords.latitude, pos.coords.longitude, 'Using my location');
    reportAccuracyM = Math.round(pos.coords.accuracy || 0);
    label.textContent = 'Using my location (' + reportLat.toFixed(4) + ', ' + reportLng.toFixed(4) +
      ', ~' + reportAccuracyM + 'm) - drag the pin to adjust';
  }, function () {
    label.textContent = 'No location - using the map centre';
  }, { enableHighAccuracy: true, maximumAge: 5000, timeout: 10000 });
};

window.submitReport = async function () {
  var status = document.getElementById('report-status');
  var btn = document.getElementById('report-submit');
  if (reportLat == null || reportLng == null) {
    status.textContent = 'Pick a location first';
    status.classList.add('error');
    return;
  }
  btn.disabled = true;
  status.textContent = 'Sending...';
  status.classList.remove('error');
  try {
    var resp = await fetch('/api/reports', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        category: document.getElementById('report-category').value,
        note: document.getElementById('report-note').value,
        lat: reportLat,
        lng: reportLng,
        accuracy_m: reportAccuracyM,
      }),
    });
    var data = await resp.json().catch(function () { return {}; });
    if (!resp.ok) {
      status.textContent = data.error || ('Could not send (' + resp.status + ')');
      status.classList.add('error');
      return;
    }
    window.closeReport();
    reportLat = null;
    reportLng = null;
    reportAccuracyM = null;
    clearReportPreview();
    await loadReports();
  } catch (err) {
    status.textContent = 'Could not send: ' + err.message;
    status.classList.add('error');
  } finally {
    btn.disabled = false;
  }
};

async function reportAction(id, action) {
  var resp = await fetch('/api/reports/' + encodeURIComponent(id) + '/' + action, { method: 'POST' });
  var data = await resp.json().catch(function () { return {}; });
  return { ok: resp.ok, status: resp.status, data: data };
}

window.confirmReport = async function (id) {
  var res = await reportAction(id, 'confirm');
  if (!res.ok) {
    alert(res.data.error || 'Could not confirm this report');
  }
  await loadReports();
};

window.reportAbuse = async function (id) {
  if (!window.confirm('Flag this report as false or abusive? Enough flags and it is hidden for everyone.')) return;
  var res = await reportAction(id, 'abuse');
  if (!res.ok) {
    alert(res.data.error || 'Could not flag this report');
  } else if (res.data && res.data.hidden) {
    alert('Thanks - this report is now hidden for everyone.');
  }
  await loadReports();
};

window.hideReportLocally = function (id) {
  var key = 'sb-hidden-reports';
  var list;
  try {
    list = JSON.parse(localStorage.getItem(key) || '[]');
  } catch (e) {
    list = [];
  }
  if (list.indexOf(id) === -1) list.push(id);
  localStorage.setItem(key, JSON.stringify(list.slice(-200)));
  loadReports();
};

async function fetchLatest(limit = 500) {
  const resp = await fetch(\`/api/dispatch/latest?limit=\${limit}\`);
  if (!resp.ok) throw new Error(\`API error: \${resp.status}\`);
  return resp.json();
}

async function fetchStats() {
  const resp = await fetch('/api/dispatch/stats');
  if (!resp.ok) return null;
  return resp.json();
}

async function fetchAgencies() {
  const resp = await fetch('/api/dispatch/agencies');
  if (!resp.ok) return null;
  return resp.json();
}

function timeAgoShort(ts) {
  if (!ts) return 'Never';
  const diff = Math.floor((Date.now() - ts) / 1000);
  if (diff < 60) return 'just now';
  if (diff < 3600) return \`\${Math.floor(diff / 60)}m ago\`;
  if (diff < 86400) return \`\${Math.floor(diff / 3600)}h ago\`;
  return \`\${Math.floor(diff / 86400)}d ago\`;
}

function updateStatsBar(stats) {
  const el = document.getElementById('stats-bar');
  if (!el || !stats) return;
  const agencies = Object.keys(stats.by_agency || {}).length;
  const refreshed = timeAgoShort(lastRefreshTime);
  const lastScrape = stats.last_run?.timestamp;
  const scrapeAgo = lastScrape ? timeAgoShort(new Date(lastScrape).getTime()) : 'unknown';
el.innerHTML = \`<span class="val">\${(stats.total_records || 0).toLocaleString()}</span> records &middot; <span class="val">\${agencies}</span> agencies &middot; scraped <span class="val">\${scrapeAgo}</span> &middot; refreshed <span class="val">\${refreshed}</span>\`;
  const banner = document.getElementById('stale-banner');
  if (banner) {
    const ageMin = lastScrape ? (Date.now() - new Date(lastScrape).getTime()) / 60000 : 999;
    banner.classList.toggle('hidden', ageMin < 10);
  }
}

function renderAgencyFilters(agencies) {
  const container = document.getElementById('agency-filters');
  if (!container || !agencies?.agencies) return;
  container.innerHTML = '';
  const allBtn = document.createElement('button');
  allBtn.className = 'agency-btn active';
  allBtn.dataset.agency = '';
  allBtn.textContent = 'ALL';
  allBtn.addEventListener('click', () => selectAgency(''));
  container.appendChild(allBtn);

  for (const a of agencies.agencies) {
    const btn = document.createElement('button');
    btn.className = 'agency-btn';
    btn.dataset.agency = a.code;
    if (excludedAgencies.has(a.code)) btn.classList.add('excluded');
    btn.innerHTML = \`\${a.code} <span style="opacity:0.4">\${a.count}</span>\`;
    btn.addEventListener('click', () => selectAgency(a.code));
    btn.addEventListener('contextmenu', (e) => {
      e.preventDefault();
      toggleExclude(a.code);
    });
    container.appendChild(btn);
  }
}

function selectAgency(code) {
  if (!code) unpinMapView();
  currentAgency = code || null;
  window._currentAgency = currentAgency || '';
  document.querySelectorAll('.agency-btn').forEach(btn => {
    const bCode = btn.dataset.agency;
    if (code) {
      btn.classList.toggle('active', bCode === code);
    } else {
      btn.classList.toggle('active', bCode === '');
    }
  });
  applyFilters();
}

function toggleExclude(code) {
  if (excludedAgencies.has(code)) {
    excludedAgencies.delete(code);
  } else {
    excludedAgencies.add(code);
    if (currentAgency === code) {
      currentAgency = null;
      window._currentAgency = '';
      document.querySelectorAll('.agency-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.agency === '');
      });
    }
  }
  window._excludedAgencies = excludedAgencies;
  document.querySelectorAll('.agency-btn').forEach(btn => {
    if (btn.dataset.agency) {
      btn.classList.toggle('excluded', excludedAgencies.has(btn.dataset.agency));
    }
  });
  applyFilters();
}

function syncUrlParams() {
  var params = new URLSearchParams();
  if (window._currentSearch) params.set('q', window._currentSearch);
  if (window._currentAgency) params.set('agency', window._currentAgency);
  if (window._activeCategory) params.set('cat', window._activeCategory);
  var sortSel = document.getElementById('sort-select');
  if (sortSel && sortSel.value && sortSel.value !== 'time') params.set('sort', sortSel.value);
  var groupSel = document.getElementById('group-select');
  if (groupSel && groupSel.value) params.set('group', groupSel.value);
  var qs = params.toString();
  history.replaceState(null, '', qs ? '?' + qs : window.location.pathname);
}

function applyFilters() {
  const nearby = nearbyMode && window._userLat != null
    ? { lat: window._userLat, lng: window._userLng, radiusMi: nearbyRadiusMi }
    : null;
  filterCards(currentSearch, currentAgency, excludedAgencies, nearby);
  if (nearbyMode && window._userLat != null) {
    filterNearby(window._userLat, window._userLng, nearbyRadiusMi);
  } else if (currentAgency) {
    filterByAgency(currentAgency);
  } else {
    filterByExclude(excludedAgencies);
  }
  applySearchFilter(currentSearch);
  setReportSearch(currentSearch);
  syncUrlParams();
}

window.triggerScrape = async function () {
  const btn = document.getElementById('btn-scrape');
  btn.textContent = 'Scraping...';
  btn.disabled = true;
  try {
    await fetch('/api/scrape', { method: 'POST' });
    let elapsed = 0;
    const pollInterval = setInterval(async () => {
      elapsed += 10;
      btn.textContent = 'Scraping... ' + Math.floor(elapsed) + 's';
      try {
        const resp = await fetch('/api/dispatch/stats');
        const stats = await resp.json();
        if (stats?.last_run?.timestamp) {
          const runAge = Date.now() - new Date(stats.last_run.timestamp).getTime();
          if (runAge < elapsed * 1000 + 5000) {
            clearInterval(pollInterval);
            await refresh();
            btn.textContent = 'Scrape';
            btn.disabled = false;
          }
        }
      } catch {}
      if (elapsed >= 240) {
        clearInterval(pollInterval);
        await refresh();
        btn.textContent = 'Scrape';
        btn.disabled = false;
      }
    }, 10000);
  } catch {
    btn.textContent = 'Scrape';
    btn.disabled = false;
  }
};

window.toggleNearby = function () {
  if (nearbyMode) {
    exitNearby();
  } else {
    enterNearby();
  }
};

function enterNearby() {
  if (!navigator.geolocation) {
    alert('Geolocation not supported by your browser');
    return;
  }
  navigator.geolocation.getCurrentPosition(
    (pos) => {
      const { latitude: lat, longitude: lng } = pos.coords;
      nearbyMode = true;
      window._nearbyMode = true;
      window._userLat = lat;
      window._userLng = lng;
      document.getElementById('btn-nearby').classList.add('active');
      document.getElementById('nearby-bar').classList.remove('hidden');
      document.getElementById('nearby-bar').classList.add('visible');
      setMapUserLocation(lat, lng);
      applyFilters();
    },
    () => {
      alert('Location access denied. Enable location permissions to use Nearby mode.');
    },
    { enableHighAccuracy: true, timeout: 10000 }
  );
}

function exitNearby() {
  nearbyMode = false;
  window._nearbyMode = false;
  document.getElementById('btn-nearby').classList.remove('active');
  document.getElementById('nearby-bar').classList.remove('visible');
  document.getElementById('nearby-bar').classList.add('hidden');
  removeMapUserLocation();
  applyFilters();
}

window._exitNearby = exitNearby;

window.showMetrics = async function () {
  const modal = document.getElementById('metrics-modal');
  const body = document.getElementById('metrics-body');
  try {
    const [geoResp, statsResp] = await Promise.all([
      fetch('/api/geo/status'),
      fetch('/api/dispatch/stats'),
    ]);
    const geo = await geoResp.json();
    const stats = await statsResp.json();

    const modeClass = geo.mode === 'fast' ? 'color:var(--sev-high)' : 'color:var(--sev-low)';
    const nextIn = geo.next_in_s != null ? (geo.next_in_s > 3600 ? \`\${Math.round(geo.next_in_s/3600)}h\` : \`\${Math.round(geo.next_in_s/60)}m\`) : '--';
    const lastDur = geo.last_run?.duration_ms ? \`\${(geo.last_run.duration_ms/1000).toFixed(1)}s\` : '--';

    let html = \`
      <h2>Dispatch Analytics</h2>
      <div class="metrics-grid">
        <div class="metric-card">
          <div class="label">Records</div>
          <div class="value">\${(geo.total || 0).toLocaleString()}</div>
          <div class="sub">\${Object.keys(stats?.by_agency || {}).length} agencies</div>
        </div>
        <div class="metric-card">
          <div class="label">Geocoded</div>
          <div class="value">\${(geo.geocoded || 0).toLocaleString()} <span style="font-size:10px;color:var(--text-3)">/ \${geo.total || 0}</span></div>
          <div class="sub">\${geo.pct || '0%'}</div>
          <div class="bar"><div class="bar-fill" style="width:\${parseFloat(geo.pct)||0}%"></div></div>
        </div>
        <div class="metric-card">
          <div class="label">Scrape Mode</div>
          <div class="value" style="\${modeClass}">\${geo.mode || 'unknown'}</div>
          <div class="sub">next in \${nextIn}</div>
        </div>
        <div class="metric-card">
          <div class="label">Last Scrape</div>
          <div class="value">\${geo.last_run?.stored ?? '--'} new</div>
          <div class="sub">\${geo.last_run?.skipped ?? '--'} dups &middot; \${lastDur}</div>
        </div>
      </div>
      <h3 style="margin-top:1rem;font-size:12px;color:var(--text-2)">Top Agencies</h3>
      <div class="metrics-grid" style="margin-top:0.5rem">\`;

    const agencies = Object.entries(stats?.by_agency || {}).sort((a,b) => b[1] - a[1]).slice(0, 8);
    for (const [code, count] of agencies) {
      html += \`<div class="metric-card" style="padding:0.4rem 0.6rem">
        <div style="display:flex;justify-content:space-between;align-items:center">
          <span class="label" style="margin:0">\${code}</span>
          <span style="color:var(--text-2);font-size:11px">\${count}</span>
        </div>
      </div>\`;
    }
    html += '</div>';
    body.innerHTML = html;
    modal.classList.remove('hidden');
    requestAnimationFrame(() => modal.classList.add('open'));
  } catch {
    body.innerHTML = '<p style="color:var(--text-3)">Failed to load analytics.</p>';
    modal.classList.remove('hidden');
    requestAnimationFrame(() => modal.classList.add('open'));
  }
};

window.closeMetricsModal = function () {
  const modal = document.getElementById('metrics-modal');
  modal.classList.remove('open');
  setTimeout(() => modal.classList.add('hidden'), 200);
};

window.closeModal = function () {
  const modal = document.getElementById('deepdive-modal');
  modal.classList.remove('open');
  setTimeout(() => modal.classList.add('hidden'), 200);
};

window.setNearbyRadius = function (mi) {
  nearbyRadiusMi = mi;
  window._nearbyRadiusMi = mi;
  document.getElementById('radius-val').textContent = \`\${mi}mi\`;
  if (nearbyMode && window._userLat != null) {
    clearTimeout(radiusDebounceTimer);
    radiusDebounceTimer = setTimeout(() => {
      applyFilters();
    }, 150);
  }
};

window.setNearbyRadiusImmediate = function (mi) {
  nearbyRadiusMi = mi;
  window._nearbyRadiusMi = mi;
  document.getElementById('radius-val').textContent = \`\${mi}mi\`;
};

async function refresh() {
  try {
    const [data, stats, agencies] = await Promise.all([
      fetchLatest(),
      fetchStats(),
      fetchAgencies(),
    ]);
    lastRefreshTime = Date.now();
    if (data?.records) {
      updateCards(data.records);
      updateMap(data.records);
    }
    updateStatsBar(stats);
    renderAgencyFilters(agencies);
    await loadReports();
    if (currentAgency || currentSearch || excludedAgencies.size || nearbyMode) {
      applyFilters();
    }
  } catch (err) {
    console.error('Refresh failed:', err);
  }
}

document.addEventListener('DOMContentLoaded', async () => {
  if ('serviceWorker' in navigator) navigator.serviceWorker.register('/sw.js').catch(() => {});
  initMap();
  initReportLayer();
  initReportLegend();

  document.getElementById('search').addEventListener('input', (e) => {
    currentSearch = e.target.value;
    window._currentSearch = currentSearch;
    localStorage.setItem('sb-search', currentSearch);
    applyFilters();
  });

  document.getElementById('sort-select').addEventListener('change', (e) => {
    localStorage.setItem('sb-sort', e.target.value);
    setSort(e.target.value);
  });

  document.getElementById('sort-dir').addEventListener('click', () => {
    const sel = document.getElementById('sort-select');
    setSort(sel.value);
  });

  document.getElementById('group-select').addEventListener('change', (e) => {
    localStorage.setItem('sb-group', e.target.value);
    setGroup(e.target.value);
  });

  document.getElementById('nearby-close').addEventListener('click', () => {
    exitNearby();
  });

  document.getElementById('radius-slider').addEventListener('input', (e) => {
    const mi = parseInt(e.target.value);
    document.getElementById('radius-val').textContent = \`\${mi}mi\`;
    window.setNearbyRadiusImmediate(mi);
    if (window._updateRadiusCircleImmediate) window._updateRadiusCircleImmediate(window._userLat, window._userLng, mi);
  });

  document.getElementById('radius-slider').addEventListener('change', (e) => {
    const mi = parseInt(e.target.value);
    window.setNearbyRadius(mi);
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      const dd = document.getElementById('deepdive-modal');
      const mm = document.getElementById('metrics-modal');
      if (!dd.classList.contains('hidden')) { window.closeModal(); }
      if (!mm.classList.contains('hidden')) { window.closeMetricsModal(); }
    }
  });

  var urlParams = new URLSearchParams(window.location.search);
  if (urlParams.get('q')) { currentSearch = urlParams.get('q'); window._currentSearch = currentSearch; document.getElementById('search').value = currentSearch; }
  if (urlParams.get('agency')) { currentAgency = urlParams.get('agency'); window._currentAgency = currentAgency; }
  if (urlParams.get('cat')) { setCategory(urlParams.get('cat')); var chips = document.querySelectorAll('.cat-chip'); chips.forEach(function(c) { if (c.dataset.cat === urlParams.get('cat')) c.classList.add('active'); }); }
  if (urlParams.get('sort')) { document.getElementById('sort-select').value = urlParams.get('sort'); setSort(urlParams.get('sort')); }
  if (urlParams.get('group')) { document.getElementById('group-select').value = urlParams.get('group'); setGroup(urlParams.get('group')); }
  const savedSort = localStorage.getItem('sb-sort');
  if (savedSort) { document.getElementById('sort-select').value = savedSort; setSort(savedSort); }
  const savedGroup = localStorage.getItem('sb-group');
  if (savedGroup) { document.getElementById('group-select').value = savedGroup; setGroup(savedGroup); }
  const savedSearch = localStorage.getItem('sb-search');
  if (savedSearch) { document.getElementById('search').value = savedSearch; currentSearch = savedSearch; window._currentSearch = savedSearch; }
  var tsEl = document.getElementById('time-scrubber');
  if (tsEl) tsEl.addEventListener('click', function(e) {
    var btn = e.target.closest('.ts-btn');
    if (!btn) return;
    document.querySelectorAll('.ts-btn').forEach(function(b) { b.classList.remove('active'); });
    btn.classList.add('active');
    timeFilterMin = parseInt(btn.dataset.min);
    applyFilters();
  });
  renderSkeletons(12);
  await refresh();
  refreshInterval = setInterval(refresh, 60000);
  setInterval(() => {
    const el = document.getElementById('stats-bar');
    if (el && lastRefreshTime) {
      const stats = el.innerHTML;
      const refreshed = timeAgoShort(lastRefreshTime);
      el.innerHTML = stats.replace(/refreshed <span class="val">[^<]*<\\/span>/, \`refreshed <span class="val">\${refreshed}</span>\`);
    }
  }, 30000);
});
`, type: "application/javascript" }
};
function serveStatic(pathname) {
  return STATIC_ASSETS[pathname] || null;
}
__name(serveStatic, "serveStatic");
var index_default = {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    if (url.pathname === "/favicon.ico") return new Response(null, { status: 204 });
    if (url.pathname.startsWith("/api/")) {
      return handleApi(request, env, ctx);
    }
    const asset = serveStatic(url.pathname);
    if (asset) {
      return new Response(asset.content, {
        headers: { "Content-Type": asset.contentType || asset.type || "text/plain", "Cache-Control": "no-cache" }
      });
    }
    const index = serveStatic("/index.html");
    return new Response(index.content, {
      headers: { "Content-Type": "text/html", "Cache-Control": "no-cache" }
    });
  },
  async scheduled(event, env, ctx) {
    ctx.waitUntil((async () => {
      const now = Date.now();
      const nextScrapeAt = await env.DISPATCH_KV.get("meta:next_scrape_at", "json");
      if (nextScrapeAt && now < nextScrapeAt) {
        console.log(`Skipping: next scrape at ${new Date(nextScrapeAt).toISOString()} (${Math.round((nextScrapeAt - now) / 1e3)}s away)`);
        return;
      }
      const rateLimitedAt = await env.DISPATCH_KV.get("meta:rate_limited", "json");
      if (rateLimitedAt && now - rateLimitedAt < 5 * 60 * 1e3) {
        console.log("Skipping scrape: rate limited");
        await env.DISPATCH_KV.put("meta:next_scrape_at", JSON.stringify(now + 5 * 60 * 1e3));
        return;
      }
      const lockAt = now + 10 * 60 * 1e3;
      await env.DISPATCH_KV.put("meta:next_scrape_at", JSON.stringify(lockAt));
      const startTime = Date.now();
      try {
        const scrapeResults = await runScraper(env);
        const storageResults = await processScrapeResults(env, scrapeResults);
        const purgeResults = await purgeOldRecords(env, 8);
        await purgeExpiredReports(env);
        const agencyErrors = scrapeResults.errors || [];
        const reportingAgencies = countReportingAgencies(scrapeResults);
        const totalAgencies = (ALL_AGENCY_CODES || []).length;
        await env.DISPATCH_KV.put('meta:source_health', JSON.stringify({ timestamp: now, reporting: reportingAgencies, total: totalAgencies, errors: agencyErrors.length, errorDetails: agencyErrors.slice(0, 10) }));
        const lastBackup = await env.DISPATCH_KV.get('meta:last_backup', 'json');
        if (!lastBackup || now - lastBackup > 24 * 60 * 60 * 1e3) {
          const backupResult = await env.DISPATCH_D1.prepare('SELECT * FROM dispatch_calls').all();
          const backupKey = 'backups/' + new Date().toISOString().slice(0, 10) + '/dispatch_calls.json';
          await env.DISPATCH_R2.put(backupKey, JSON.stringify(backupResult.results || []), { httpMetadata: { contentType: 'application/json' } });
          await env.DISPATCH_KV.put('meta:last_backup', JSON.stringify(now));
          console.log('Daily backup saved: ' + backupKey);
        }
        let geoStats = null;
        if (storageResults.pending_geo?.length > 0) {
          geoStats = await geocodePendingRecords(env, storageResults.pending_geo);
        }
        let intervalMs;
        let mode;
        let chpFreshness = null;
        if (storageResults.stored > 0) {
          intervalMs = 3 * 60 * 1e3;
          mode = "fast";
        } else {
          const freshness = await validateFreshness(env, storageResults.total);
          chpFreshness = freshness;
          const lastScrapeAt = await env.DISPATCH_KV.get("meta:last_scrape_at", "json");
          const prevInterval = lastScrapeAt && nextScrapeAt ? nextScrapeAt - lastScrapeAt : 15 * 60 * 1e3;
          if (freshness.stale || freshness.count_changed) {
            intervalMs = 3 * 60 * 1e3;
            mode = freshness.stale ? "fast (stale)" : "fast (count-changed)";
          } else {
            intervalMs = computeSlowInterval(prevInterval);
            mode = "slow";
          }
        }
        const nextAt = computeNextScrapeAt(Date.now(), intervalMs);
        const result = {
          timestamp: (/* @__PURE__ */ new Date()).toISOString(),
          mode,
          next_scrape: new Date(nextAt).toISOString(),
          interval_min: Math.round(intervalMs / 6e4),
          stored: storageResults.stored,
          skipped: storageResults.skipped,
          total: storageResults.total,
          agencies: scrapeResults.stats.agencies_scraped,
          rc_rows: scrapeResults.stats.rc_rows,
          geo: geoStats,
          freshness: chpFreshness,
          purged: purgeResults.purged,
          duration_ms: Date.now() - startTime
        };
        await Promise.all([
          env.DISPATCH_KV.put("meta:last_run", JSON.stringify(result)),
          env.DISPATCH_KV.put("meta:last_scrape_at", JSON.stringify(now)),
          env.DISPATCH_KV.put("meta:next_scrape_at", JSON.stringify(nextAt)),
          env.DISPATCH_KV.put("meta:last_scrape_row_count", JSON.stringify(storageResults.total))
        ]);
        console.log(`Cron [${mode}] ${result.stored} new, ${result.skipped} dups` + (geoStats ? `, geo ${geoStats.updated}/${geoStats.pairs} (${geoStats.deferred} deferred)` : "") + `, next in ${result.interval_min}m`);
      } catch (err) {
        console.error("Cron failed:", err.message);
        // Measured from the failure, not from `now` (the run's start): a run that
        // outlives the retry window would otherwise write next_scrape into the past
        // and the next minute's tick would start another scrape immediately.
        const nextAt = computeNextScrapeAt(Date.now(), 15 * 60 * 1e3);
        await Promise.all([
          env.DISPATCH_KV.put("meta:last_run", JSON.stringify({
            timestamp: (/* @__PURE__ */ new Date()).toISOString(),
            error: err.message,
            duration_ms: Date.now() - startTime
          })),
          env.DISPATCH_KV.put("meta:next_scrape_at", JSON.stringify(nextAt))
        ]);
      }
    })());
  }
};
export {
  index_default as default,
  countReportingAgencies,
  computeNextScrapeAt,
  computeSlowInterval,
  isReportCategory,
  isReportInBBox,
  cleanReportNote,
  distanceMiles,
  parseDispatchTime,
  findCountyMatch
};
//# sourceMappingURL=worker.js.map

