export const FLAGS_DATA = [
  // ================= TIER 1 (12 Countries — Easy) =================
  {
    code: 'GR',
    en: 'Greece',
    el: 'Ελλάδα',
    tier: 1,
    svg: `<svg viewBox="0 0 27 18">
      <rect width="27" height="18" fill="#0D5EAF"/>
      <path d="M0,3h27M0,7h27M0,11h27M0,15h27" stroke="#FFF" stroke-width="2"/>
      <rect width="10" height="10" fill="#0D5EAF"/>
      <path d="M5,0v10M0,5h10" stroke="#FFF" stroke-width="2"/>
    </svg>`,
  },
  {
    code: 'CY',
    en: 'Cyprus',
    el: 'Κύπρος',
    tier: 1,
    svg: `<svg viewBox="0 0 30 20">
      <rect width="30" height="20" fill="#FFF"/>
      <path d="M9,11 C11,8 16,8 19,9 C21,7 23,6 24,6 C22,8 20,10 19,12 C15,13 11,13 9,11 Z" fill="#D57800"/>
      <path d="M11,15 Q15,17 19,15" fill="none" stroke="#4E5B31" stroke-width="1.4" stroke-linecap="round"/>
    </svg>`,
  },
  {
    code: 'IT',
    en: 'Italy',
    el: 'Ιταλία',
    tier: 1,
    svg: `<svg viewBox="0 0 3 2">
      <rect width="1" height="2" x="0" fill="#009246"/>
      <rect width="1" height="2" x="1" fill="#FFF"/>
      <rect width="1" height="2" x="2" fill="#CE2B37"/>
    </svg>`,
  },
  {
    code: 'FR',
    en: 'France',
    el: 'Γαλλία',
    tier: 1,
    svg: `<svg viewBox="0 0 3 2">
      <rect width="1" height="2" x="0" fill="#002395"/>
      <rect width="1" height="2" x="1" fill="#FFF"/>
      <rect width="1" height="2" x="2" fill="#ED2939"/>
    </svg>`,
  },
  {
    code: 'DE',
    en: 'Germany',
    el: 'Γερμανία',
    tier: 1,
    svg: `<svg viewBox="0 0 5 3">
      <rect width="5" height="1" y="0" fill="#000"/>
      <rect width="5" height="1" y="1" fill="#D00"/>
      <rect width="5" height="1" y="2" fill="#FFCE00"/>
    </svg>`,
  },
  {
    code: 'JP',
    en: 'Japan',
    el: 'Ιαπωνία',
    tier: 1,
    svg: `<svg viewBox="0 0 30 20">
      <rect width="30" height="20" fill="#FFF"/>
      <circle cx="15" cy="10" r="6" fill="#BC002D"/>
    </svg>`,
  },
  {
    code: 'GB',
    en: 'United Kingdom',
    el: 'Ηνωμένο Βασίλειο',
    tier: 1,
    svg: `<svg viewBox="0 0 60 40">
      <rect width="60" height="40" fill="#012169"/>
      <path d="M0,0 L60,40 M60,0 L0,40" stroke="#FFF" stroke-width="7"/>
      <path d="M0,0 L60,40 M60,0 L0,40" stroke="#C8102E" stroke-width="3"/>
      <path d="M30,0 V40 M0,20 H60" stroke="#FFF" stroke-width="11"/>
      <path d="M30,0 V40 M0,20 H60" stroke="#C8102E" stroke-width="6"/>
    </svg>`,
  },
  {
    code: 'US',
    en: 'United States',
    el: 'Αμερική',
    tier: 1,
    svg: `<svg viewBox="0 0 39 26">
      <rect width="39" height="26" fill="#B22234"/>
      <path d="M0,3h39M0,7h39M0,11h39M0,15h39M0,19h39M0,23h39" stroke="#FFF" stroke-width="2"/>
      <rect width="16" height="14" fill="#3C3B6E"/>
      <circle cx="4" cy="4" r="1.1" fill="#FFF"/><circle cx="8" cy="4" r="1.1" fill="#FFF"/><circle cx="12" cy="4" r="1.1" fill="#FFF"/>
      <circle cx="6" cy="7" r="1.1" fill="#FFF"/><circle cx="10" cy="7" r="1.1" fill="#FFF"/>
      <circle cx="4" cy="10" r="1.1" fill="#FFF"/><circle cx="8" cy="10" r="1.1" fill="#FFF"/><circle cx="12" cy="10" r="1.1" fill="#FFF"/>
    </svg>`,
  },
  {
    code: 'BR',
    en: 'Brazil',
    el: 'Βραζιλία',
    tier: 1,
    svg: `<svg viewBox="0 0 30 20">
      <rect width="30" height="20" fill="#009C3B"/>
      <polygon points="15,2 27,10 15,18 3,10" fill="#FFDF00"/>
      <circle cx="15" cy="10" r="4.5" fill="#002776"/>
      <path d="M11,9 Q15,7 19,11" fill="none" stroke="#FFF" stroke-width="1.2"/>
    </svg>`,
  },
  {
    code: 'ES',
    en: 'Spain',
    el: 'Ισπανία',
    tier: 1,
    svg: `<svg viewBox="0 0 30 20">
      <rect width="30" height="20" fill="#AA151B"/>
      <rect width="30" height="10" y="5" fill="#F1BF00"/>
      <rect x="7" y="7.5" width="3.5" height="5" rx="1" fill="#AA151B"/>
    </svg>`,
  },
  {
    code: 'CH',
    en: 'Switzerland',
    el: 'Ελβετία',
    tier: 1,
    svg: `<svg viewBox="0 0 30 20">
      <rect width="30" height="20" fill="#DA291C"/>
      <rect x="13" y="4" width="4" height="12" fill="#FFF"/>
      <rect x="9" y="8" width="12" height="4" fill="#FFF"/>
    </svg>`,
  },
  {
    code: 'SE',
    en: 'Sweden',
    el: 'Σουηδία',
    tier: 1,
    svg: `<svg viewBox="0 0 16 10">
      <rect width="16" height="10" fill="#006AA7"/>
      <rect x="5" width="2" height="10" fill="#FECC00"/>
      <rect y="4" width="16" height="2" fill="#FECC00"/>
    </svg>`,
  },

  // ================= TIER 2 (12 Countries — Medium, Total 24) =================
  {
    code: 'CA',
    en: 'Canada',
    el: 'Καναδάς',
    tier: 2,
    svg: `<svg viewBox="0 0 30 20">
      <rect width="30" height="20" fill="#FF0000"/>
      <rect x="7.5" width="15" height="20" fill="#FFF"/>
      <polygon points="15,4 17,9 21,9 18,12 19,16 15,13 11,16 12,12 9,9 13,9" fill="#FF0000"/>
    </svg>`,
  },
  {
    code: 'UA',
    en: 'Ukraine',
    el: 'Ουκρανία',
    tier: 2,
    svg: `<svg viewBox="0 0 3 2">
      <rect width="3" height="1" y="0" fill="#0057B7"/>
      <rect width="3" height="1" y="1" fill="#FFD700"/>
    </svg>`,
  },
  {
    code: 'FI',
    en: 'Finland',
    el: 'Φινλανδία',
    tier: 2,
    svg: `<svg viewBox="0 0 18 11">
      <rect width="18" height="11" fill="#FFF"/>
      <rect x="5" width="3" height="11" fill="#003580"/>
      <rect y="4" width="18" height="3" fill="#003580"/>
    </svg>`,
  },
  {
    code: 'DK',
    en: 'Denmark',
    el: 'Δανία',
    tier: 2,
    svg: `<svg viewBox="0 0 18 12">
      <rect width="18" height="12" fill="#C8102E"/>
      <rect x="5" width="2" height="12" fill="#FFF"/>
      <rect y="5" width="18" height="2" fill="#FFF"/>
    </svg>`,
  },
  {
    code: 'NL',
    en: 'Netherlands',
    el: 'Ολλανδία',
    tier: 2,
    svg: `<svg viewBox="0 0 9 6">
      <rect width="9" height="2" y="0" fill="#AE1C28"/>
      <rect width="9" height="2" y="2" fill="#FFF"/>
      <rect width="9" height="2" y="4" fill="#21468B"/>
    </svg>`,
  },
  {
    code: 'BE',
    en: 'Belgium',
    el: 'Βέλγιο',
    tier: 2,
    svg: `<svg viewBox="0 0 3 2">
      <rect width="1" height="2" x="0" fill="#000"/>
      <rect width="1" height="2" x="1" fill="#FDDA24"/>
      <rect width="1" height="2" x="2" fill="#EF3340"/>
    </svg>`,
  },
  {
    code: 'AR',
    en: 'Argentina',
    el: 'Αργεντινή',
    tier: 2,
    svg: `<svg viewBox="0 0 30 18">
      <rect width="30" height="6" y="0" fill="#74ACDF"/>
      <rect width="30" height="6" y="6" fill="#FFF"/>
      <rect width="30" height="6" y="12" fill="#74ACDF"/>
      <circle cx="15" cy="9" r="2.2" fill="#F6B40E"/>
    </svg>`,
  },
  {
    code: 'CN',
    en: 'China',
    el: 'Κίνα',
    tier: 2,
    svg: `<svg viewBox="0 0 30 20">
      <rect width="30" height="20" fill="#EE1C25"/>
      <polygon points="5,3 6,6 9,6 6.5,8 7.5,11 5,9 2.5,11 3.5,8 1,6 4,6" fill="#FFFF00"/>
      <circle cx="11" cy="3" r="1" fill="#FFFF00"/>
      <circle cx="13" cy="5" r="1" fill="#FFFF00"/>
      <circle cx="13" cy="8" r="1" fill="#FFFF00"/>
      <circle cx="11" cy="10" r="1" fill="#FFFF00"/>
    </svg>`,
  },
  {
    code: 'IN',
    en: 'India',
    el: 'Ινδία',
    tier: 2,
    svg: `<svg viewBox="0 0 30 18">
      <rect width="30" height="6" y="0" fill="#FF9933"/>
      <rect width="30" height="6" y="6" fill="#FFF"/>
      <rect width="30" height="6" y="12" fill="#138808"/>
      <circle cx="15" cy="9" r="2.3" fill="none" stroke="#000080" stroke-width="0.8"/>
      <circle cx="15" cy="9" r="0.7" fill="#000080"/>
    </svg>`,
  },
  {
    code: 'AU',
    en: 'Australia',
    el: 'Αυστραλία',
    tier: 2,
    svg: `<svg viewBox="0 0 30 20">
      <rect width="30" height="20" fill="#00008B"/>
      <rect width="14" height="10" fill="#012169"/>
      <path d="M0,0 L14,10 M14,0 L0,10" stroke="#FFF" stroke-width="2"/>
      <path d="M7,0 V10 M0,5 H14" stroke="#FFF" stroke-width="3"/>
      <path d="M7,0 V10 M0,5 H14" stroke="#C8102E" stroke-width="1.6"/>
      <circle cx="7" cy="15" r="1.8" fill="#FFF"/>
      <circle cx="23" cy="5" r="1.1" fill="#FFF"/>
      <circle cx="20" cy="9" r="1.1" fill="#FFF"/>
      <circle cx="26" cy="8" r="1.1" fill="#FFF"/>
      <circle cx="23" cy="15" r="1.2" fill="#FFF"/>
    </svg>`,
  },
  {
    code: 'AT',
    en: 'Austria',
    el: 'Αυστρία',
    tier: 2,
    svg: `<svg viewBox="0 0 3 2">
      <rect width="3" height="2" fill="#ED2939"/>
      <rect width="3" height="0.66" y="0.67" fill="#FFF"/>
    </svg>`,
  },
  {
    code: 'IE',
    en: 'Ireland',
    el: 'Ιρλανδία',
    tier: 2,
    svg: `<svg viewBox="0 0 3 2">
      <rect width="1" height="2" x="0" fill="#169B62"/>
      <rect width="1" height="2" x="1" fill="#FFF"/>
      <rect width="1" height="2" x="2" fill="#FF883E"/>
    </svg>`,
  },

  // ================= TIER 3 (12 Countries — Hard, Total 36) =================
  {
    code: 'PT',
    en: 'Portugal',
    el: 'Πορτογαλία',
    tier: 3,
    svg: `<svg viewBox="0 0 30 20">
      <rect width="12" height="20" x="0" fill="#006600"/>
      <rect width="18" height="20" x="12" fill="#FF0000"/>
      <circle cx="12" cy="10" r="4" fill="#FFCC00"/>
      <rect x="10.2" y="8" width="3.6" height="4" rx="1" fill="#FFF" stroke="#FF0000" stroke-width="0.8"/>
    </svg>`,
  },
  {
    code: 'NO',
    en: 'Norway',
    el: 'Νορβηγία',
    tier: 3,
    svg: `<svg viewBox="0 0 22 16">
      <rect width="22" height="16" fill="#BA0C2F"/>
      <rect x="6" width="4" height="16" fill="#FFF"/>
      <rect y="6" width="22" height="4" fill="#FFF"/>
      <rect x="7" width="2" height="16" fill="#00205B"/>
      <rect y="7" width="22" height="2" fill="#00205B"/>
    </svg>`,
  },
  {
    code: 'PL',
    en: 'Poland',
    el: 'Πολωνία',
    tier: 3,
    svg: `<svg viewBox="0 0 8 5">
      <rect width="8" height="2.5" y="0" fill="#FFF"/>
      <rect width="8" height="2.5" y="2.5" fill="#DC143C"/>
    </svg>`,
  },
  {
    code: 'RO',
    en: 'Romania',
    el: 'Ρουμανία',
    tier: 3,
    svg: `<svg viewBox="0 0 3 2">
      <rect width="1" height="2" x="0" fill="#002B7F"/>
      <rect width="1" height="2" x="1" fill="#FCD116"/>
      <rect width="1" height="2" x="2" fill="#CE1126"/>
    </svg>`,
  },
  {
    code: 'BG',
    en: 'Bulgaria',
    el: 'Βουλγαρία',
    tier: 3,
    svg: `<svg viewBox="0 0 5 3">
      <rect width="5" height="1" y="0" fill="#FFF"/>
      <rect width="5" height="1" y="1" fill="#00966E"/>
      <rect width="5" height="1" y="2" fill="#D62612"/>
    </svg>`,
  },
  {
    code: 'TR',
    en: 'Turkey',
    el: 'Τουρκία',
    tier: 3,
    svg: `<svg viewBox="0 0 30 20">
      <rect width="30" height="20" fill="#E30A17"/>
      <circle cx="11" cy="10" r="5" fill="#FFF"/>
      <circle cx="12.5" cy="10" r="4" fill="#E30A17"/>
      <polygon points="17,10 20.5,11.2 18.3,8.2 18.3,11.8 20.5,8.8" fill="#FFF"/>
    </svg>`,
  },
  {
    code: 'EG',
    en: 'Egypt',
    el: 'Αίγυπτος',
    tier: 3,
    svg: `<svg viewBox="0 0 30 20">
      <rect width="30" height="6.66" y="0" fill="#CE1126"/>
      <rect width="30" height="6.67" y="6.66" fill="#FFF"/>
      <rect width="30" height="6.67" y="13.33" fill="#000"/>
      <polygon points="15,7.5 16.5,12 13.5,12" fill="#C09300"/>
    </svg>`,
  },
  {
    code: 'ZA',
    en: 'South Africa',
    el: 'Νότια Αφρική',
    tier: 3,
    svg: `<svg viewBox="0 0 30 20">
      <rect width="30" height="10" y="0" fill="#E03C31"/>
      <rect width="30" height="10" y="10" fill="#001489"/>
      <path d="M0,0 L14,10 L0,20 M12,10 H30" fill="none" stroke="#FFF" stroke-width="6"/>
      <path d="M0,0 L14,10 L0,20 M12,10 H30" fill="none" stroke="#007749" stroke-width="3.8"/>
      <polygon points="0,3 9,10 0,17" fill="#000" stroke="#FFB81C" stroke-width="1.2"/>
    </svg>`,
  },
  {
    code: 'MX',
    en: 'Mexico',
    el: 'Μεξικό',
    tier: 3,
    svg: `<svg viewBox="0 0 30 20">
      <rect width="10" height="20" x="0" fill="#006847"/>
      <rect width="10" height="20" x="10" fill="#FFF"/>
      <rect width="10" height="20" x="20" fill="#CE1126"/>
      <circle cx="15" cy="10" r="2.5" fill="#8B5A2B"/>
    </svg>`,
  },
  {
    code: 'KR',
    en: 'South Korea',
    el: 'Νότια Κορέα',
    tier: 3,
    svg: `<svg viewBox="0 0 30 20">
      <rect width="30" height="20" fill="#FFF"/>
      <circle cx="15" cy="10" r="5" fill="#CD2E3A"/>
      <path d="M10,10 A5,5 0 0,0 20,10 A2.5,2.5 0 0,0 15,10 A2.5,2.5 0 0,1 10,10 Z" fill="#0047A0"/>
      <path d="M6,4 L9,7 M21,4 L24,7 M6,16 L9,13 M21,16 L24,13" stroke="#000" stroke-width="1.5"/>
    </svg>`,
  },
  {
    code: 'IL',
    en: 'Israel',
    el: 'Ισραήλ',
    tier: 3,
    svg: `<svg viewBox="0 0 30 20">
      <rect width="30" height="20" fill="#FFF"/>
      <rect width="30" height="3" y="2" fill="#0038B8"/>
      <rect width="30" height="3" y="15" fill="#0038B8"/>
      <polygon points="15,6.2 18.2,11.8 11.8,11.8" fill="none" stroke="#0038B8" stroke-width="1.1"/>
      <polygon points="15,13.8 18.2,8.2 11.8,8.2" fill="none" stroke="#0038B8" stroke-width="1.1"/>
    </svg>`,
  },
  {
    code: 'NZ',
    en: 'New Zealand',
    el: 'Νέα Ζηλανδία',
    tier: 3,
    svg: `<svg viewBox="0 0 30 20">
      <rect width="30" height="20" fill="#00247D"/>
      <rect width="14" height="10" fill="#012169"/>
      <path d="M0,0 L14,10 M14,0 L0,10" stroke="#FFF" stroke-width="2"/>
      <path d="M7,0 V10 M0,5 H14" stroke="#FFF" stroke-width="3"/>
      <path d="M7,0 V10 M0,5 H14" stroke="#CC142B" stroke-width="1.6"/>
      <circle cx="23" cy="5" r="1.2" fill="#CC142B" stroke="#FFF" stroke-width="0.4"/>
      <circle cx="20" cy="9" r="1.2" fill="#CC142B" stroke="#FFF" stroke-width="0.4"/>
      <circle cx="26" cy="8" r="1.2" fill="#CC142B" stroke="#FFF" stroke-width="0.4"/>
      <circle cx="23" cy="15" r="1.3" fill="#CC142B" stroke="#FFF" stroke-width="0.4"/>
    </svg>`,
  },

  // ================= TIER 4 (12 Countries — World Explorer, Total 48) =================
  {
    code: 'KE',
    en: 'Kenya',
    el: 'Κένυα',
    tier: 4,
    svg: `<svg viewBox="0 0 30 20">
      <rect width="30" height="6" y="0" fill="#000"/>
      <rect width="30" height="8" y="6" fill="#BB0000" stroke="#FFF" stroke-width="1.2"/>
      <rect width="30" height="6" y="14" fill="#006600"/>
      <ellipse cx="15" cy="10" rx="2.6" ry="5" fill="#BB0000" stroke="#FFF" stroke-width="0.8"/>
    </svg>`,
  },
  {
    code: 'NG',
    en: 'Nigeria',
    el: 'Νιγηρία',
    tier: 4,
    svg: `<svg viewBox="0 0 3 2">
      <rect width="1" height="2" x="0" fill="#008751"/>
      <rect width="1" height="2" x="1" fill="#FFF"/>
      <rect width="1" height="2" x="2" fill="#008751"/>
    </svg>`,
  },
  {
    code: 'MA',
    en: 'Morocco',
    el: 'Μαρόκο',
    tier: 4,
    svg: `<svg viewBox="0 0 30 20">
      <rect width="30" height="20" fill="#C1272D"/>
      <polygon points="15,6 16.8,12 11.8,8.3 18.2,8.3 13.2,12" fill="none" stroke="#006233" stroke-width="1.1"/>
    </svg>`,
  },
  {
    code: 'CU',
    en: 'Cuba',
    el: 'Κούβα',
    tier: 4,
    svg: `<svg viewBox="0 0 30 20">
      <rect width="30" height="20" fill="#002A8F"/>
      <rect width="30" height="4" y="4" fill="#FFF"/>
      <rect width="30" height="4" y="12" fill="#FFF"/>
      <polygon points="0,0 14,10 0,20" fill="#CF142B"/>
      <circle cx="5" cy="10" r="2" fill="#FFF"/>
    </svg>`,
  },
  {
    code: 'JM',
    en: 'Jamaica',
    el: 'Τζαμάικα',
    tier: 4,
    svg: `<svg viewBox="0 0 30 20">
      <rect width="30" height="20" fill="#009B3A"/>
      <polygon points="0,0 15,10 0,20" fill="#000"/>
      <polygon points="30,0 15,10 30,20" fill="#000"/>
      <path d="M0,0 L30,20 M30,0 L0,20" stroke="#FED100" stroke-width="3.2"/>
    </svg>`,
  },
  {
    code: 'CL',
    en: 'Chile',
    el: 'Χιλή',
    tier: 4,
    svg: `<svg viewBox="0 0 30 20">
      <rect width="30" height="10" y="0" fill="#FFF"/>
      <rect width="30" height="10" y="10" fill="#D52B1E"/>
      <rect width="10" height="10" x="0" y="0" fill="#0039A6"/>
      <polygon points="5,2.5 5.8,5 8.2,5 6.3,6.4 7,8.8 5,7.3 3,8.8 3.7,6.4 1.8,5 4.2,5" fill="#FFF"/>
    </svg>`,
  },
  {
    code: 'CO',
    en: 'Colombia',
    el: 'Κολομβία',
    tier: 4,
    svg: `<svg viewBox="0 0 30 20">
      <rect width="30" height="10" y="0" fill="#FCD116"/>
      <rect width="30" height="5" y="10" fill="#003893"/>
      <rect width="30" height="5" y="15" fill="#CE1126"/>
    </svg>`,
  },
  {
    code: 'PE',
    en: 'Peru',
    el: 'Περού',
    tier: 4,
    svg: `<svg viewBox="0 0 3 2">
      <rect width="1" height="2" x="0" fill="#D91023"/>
      <rect width="1" height="2" x="1" fill="#FFF"/>
      <rect width="1" height="2" x="2" fill="#D91023"/>
    </svg>`,
  },
  {
    code: 'UY',
    en: 'Uruguay',
    el: 'Ουρουγουάη',
    tier: 4,
    svg: `<svg viewBox="0 0 27 18">
      <rect width="27" height="18" fill="#FFF"/>
      <path d="M0,3h27M0,7h27M0,11h27M0,15h27" stroke="#0038A8" stroke-width="2"/>
      <rect width="10" height="10" fill="#FFF"/>
      <circle cx="5" cy="5" r="2.6" fill="#FCD116"/>
    </svg>`,
  },
  {
    code: 'TH',
    en: 'Thailand',
    el: 'Ταϊλάνδη',
    tier: 4,
    svg: `<svg viewBox="0 0 30 18">
      <rect width="30" height="18" fill="#A51931"/>
      <rect width="30" height="12" y="3" fill="#F4F5F8"/>
      <rect width="30" height="6" y="6" fill="#2D2A4A"/>
    </svg>`,
  },
  {
    code: 'VN',
    en: 'Vietnam',
    el: 'Βιετνάμ',
    tier: 4,
    svg: `<svg viewBox="0 0 30 20">
      <rect width="30" height="20" fill="#DA251D"/>
      <polygon points="15,4.5 16.5,9 21.2,9 17.4,11.8 18.8,16.2 15,13.5 11.2,16.2 12.6,11.8 8.8,9 13.5,9" fill="#FFFF00"/>
    </svg>`,
  },
  {
    code: 'ID',
    en: 'Indonesia',
    el: 'Ινδονησία',
    tier: 4,
    svg: `<svg viewBox="0 0 3 2">
      <rect width="3" height="1" y="0" fill="#FF0000"/>
      <rect width="3" height="1" y="1" fill="#FFF"/>
    </svg>`,
  },
];

// ============================================================================
// TIER 5: Remaining 145 UN Member States (Total = 193 UN Member States!)
// Compact procedural vector SVG flag generator for 100% offline accuracy
// ============================================================================
function makeUnFlagSvg(p, colors, emblem = '') {
  const [c1, c2, c3, c4, c5] = colors;
  let body = '';
  if (p === 'H3') {
    body = `<rect width="30" height="6.67" y="0" fill="${c1}"/><rect width="30" height="6.67" y="6.66" fill="${c2}"/><rect width="30" height="6.67" y="13.33" fill="${c3}"/>`;
  } else if (p === 'V3') {
    body = `<rect width="10" height="20" x="0" fill="${c1}"/><rect width="10" height="20" x="10" fill="${c2}"/><rect width="10" height="20" x="20" fill="${c3}"/>`;
  } else if (p === 'H2') {
    body = `<rect width="30" height="10" y="0" fill="${c1}"/><rect width="30" height="10" y="10" fill="${c2}"/>`;
  } else if (p === 'V2') {
    body = `<rect width="15" height="20" x="0" fill="${c1}"/><rect width="15" height="20" x="15" fill="${c2}"/>`;
  } else if (p === 'H3T') {
    // Tricolor with thicker middle band (e.g. Laos, Latvia, Lebanon, Cambodia, etc.)
    body = `<rect width="30" height="20" fill="${c1}"/><rect width="30" height="10" y="5" fill="${c2}"/>`;
  } else if (p === 'H3F') {
    // Fimbriated horizontal (e.g. Botswana, Gambia, Uzbekistan, Eswatini, DPRK, Costa Rica, Suriname)
    body = `<rect width="30" height="20" fill="${c1}"/><rect width="30" height="9.2" y="5.4" fill="${c3 || '#FFF'}"/><rect width="30" height="6.4" y="6.8" fill="${c2}"/>`;
  } else if (p === 'TRI') {
    // Hoist triangle over 3 horizontal bands (Jordan, Sudan, Palestine-style, Bahamas, Equatorial Guinea, Mozambique, Zimbabwe, South Sudan, Comoros)
    body = `<rect width="30" height="6.67" y="0" fill="${c1}"/><rect width="30" height="6.67" y="6.66" fill="${c2}"/><rect width="30" height="6.67" y="13.33" fill="${c3}"/><polygon points="0,0 13.5,10 0,20" fill="${c4}"/>`;
  } else if (p === 'TRI2') {
    // Hoist triangle over 2 horizontal bands (Czechia, Philippines, Djibouti, Sao Tome, Timor-Leste)
    body = `<rect width="30" height="10" y="0" fill="${c1}"/><rect width="30" height="10" y="10" fill="${c2}"/><polygon points="0,0 14,10 0,20" fill="${c3}"/>`;
  } else if (p === 'DIAG') {
    // Diagonal band from bottom-left to top-right (Tanzania, DR Congo, Namibia, Saint Kitts, Brunei, Trinidad, Congo, Solomon Islands)
    body = `<rect width="30" height="20" fill="${c1}"/><polygon points="0,20 30,20 30,0" fill="${c2}"/><path d="M0,20 L30,0" stroke="${c4 || '#FFF'}" stroke-width="5.2"/><path d="M0,20 L30,0" stroke="${c3}" stroke-width="3.2"/>`;
  } else if (p === 'NORD') {
    // Nordic cross (Iceland, etc.)
    body = `<rect width="30" height="20" fill="${c1}"/><rect x="8" width="4.4" height="20" fill="${c2}"/><rect y="7.8" width="30" height="4.4" fill="${c2}"/><rect x="9" width="2.4" height="20" fill="${c3 || c2}"/><rect y="8.8" width="30" height="2.4" fill="${c3 || c2}"/>`;
  } else if (p === 'CANT') {
    // Solid or striped with top-left canton (Liberia, Malaysia, Togo, Samoa, Taiwan/Myanmar/Fiji/Tuvalu)
    body = `<rect width="30" height="20" fill="${c1}"/>${
      c3 ? `<path d="M0,3.3h30M0,9.9h30M0,16.5h30" stroke="${c3}" stroke-width="2.4"/>` : ''
    }<rect width="13" height="10.5" fill="${c2}"/>`;
  } else if (p === 'H4') {
    // 4 horizontal stripes (Mauritius, Central African Rep)
    body = `<rect width="30" height="5" y="0" fill="${c1}"/><rect width="30" height="5" y="5" fill="${c2}"/><rect width="30" height="5" y="10" fill="${c3}"/><rect width="30" height="5" y="15" fill="${c4}"/>`;
  } else {
    // Solid field ('S')
    body = `<rect width="30" height="20" fill="${c1}"/>`;
  }

  let emb = '';
  if (emblem === 'STAR') {
    emb = `<polygon points="15,5.5 16.3,9 20,9 17,11.2 18.1,14.8 15,12.6 11.9,14.8 13,11.2 10,9 13.7,9" fill="${c5 || c4 || c2 || '#FFF'}"/>`;
  } else if (emblem === 'LSTAR') {
    emb = `<polygon points="5,7.2 5.7,9.2 7.8,9.2 6.1,10.4 6.7,12.4 5,11.2 3.3,12.4 3.9,10.4 2.2,9.2 4.3,9.2" fill="${c5 || '#FFF'}"/>`;
  } else if (emblem === 'DISC') {
    emb = `<circle cx="15" cy="10" r="4.2" fill="${c5 || c4 || c2 || '#FFF'}"/>`;
  } else if (emblem === 'CRES') {
    emb = `<circle cx="14.2" cy="10" r="4.3" fill="${c5 || c2 || '#FFF'}"/><circle cx="15.5" cy="10" r="3.4" fill="${c2 && p === 'H3' ? c2 : c1}"/><circle cx="17.8" cy="10" r="1.4" fill="${c5 || c2 || '#FFF'}"/>`;
  } else if (emblem === 'COAT') {
    emb = `<rect x="13" y="7.2" width="4" height="5.6" rx="1.2" fill="${c5 || c4 || '#FCD116'}" stroke="#FFF" stroke-width="0.6"/>`;
  } else if (emblem === 'CROSS') {
    emb = `<rect x="13.5" y="4" width="3" height="12" fill="${c2 || '#FFF'}"/><rect x="9" y="8.5" width="12" height="3" fill="${c2 || '#FFF'}"/>`;
  }

  return `<svg viewBox="0 0 30 20">${body}${emb}</svg>`;
}

const TIER5_UN_RAW = [
  // Europe (23)
  ['AL', 'Albania', 'Αλβανία', 'S', ['#E41E20', '#000'], 'COAT'],
  ['AD', 'Andorra', 'Ανδόρα', 'V3', ['#10069F', '#FEDD00', '#D50032'], 'COAT'],
  ['BY', 'Belarus', 'Λευκορωσία', 'H2', ['#D22730', '#009739'], ''],
  ['BA', 'Bosnia and Herzegovina', 'Βοσνία και Ερζεγοβίνη', 'S', ['#002395', '#FECB00'], 'STAR'],
  ['HR', 'Croatia', 'Κροατία', 'H3', ['#FF0000', '#FFF', '#171796'], 'COAT'],
  ['CZ', 'Czechia', 'Τσεχία', 'TRI2', ['#FFF', '#D7141A', '#11457E'], ''],
  ['EE', 'Estonia', 'Εσθονία', 'H3', ['#0072CE', '#000', '#FFF'], ''],
  ['HU', 'Hungary', 'Ουγγαρία', 'H3', ['#CE2939', '#FFF', '#477050'], ''],
  ['IS', 'Iceland', 'Ισλανδία', 'NORD', ['#02529C', '#FFF', '#DC1E35'], ''],
  ['LV', 'Latvia', 'Λετονία', 'H3T', ['#9E3039', '#FFF'], ''],
  ['LI', 'Liechtenstein', 'Λιχτενστάιν', 'H2', ['#002B7F', '#CE1126'], ''],
  ['LT', 'Lithuania', 'Λιθουανία', 'H3', ['#FDB913', '#006A44', '#C1272D'], ''],
  ['LU', 'Luxembourg', 'Λουξεμβούργο', 'H3', ['#EA141D', '#FFF', '#51ADDA'], ''],
  ['MT', 'Malta', 'Μάλτα', 'V2', ['#FFF', '#CF142B'], ''],
  ['MD', 'Moldova', 'Μολδαβία', 'V3', ['#0046AE', '#FFD200', '#CC092F'], 'COAT'],
  ['MC', 'Monaco', 'Μονακό', 'H2', ['#CE1126', '#FFF'], ''],
  ['ME', 'Montenegro', 'Μαυροβούνιο', 'S', ['#C40308', '#D3AE3B'], 'COAT'],
  ['MK', 'North Macedonia', 'Βόρεια Μακεδονία', 'S', ['#D20000', '#FFE600'], 'DISC'],
  ['RU', 'Russia', 'Ρωσία', 'H3', ['#FFF', '#0039A6', '#D52B1E'], ''],
  ['SM', 'San Marino', 'Άγιος Μαρίνος', 'H2', ['#FFF', '#5EB6E4'], 'COAT'],
  ['RS', 'Serbia', 'Σερβία', 'H3', ['#C6363C', '#0C4076', '#FFF'], 'COAT'],
  ['SK', 'Slovakia', 'Σλοβακία', 'H3', ['#FFF', '#0B4EA2', '#EE1C25'], 'COAT'],
  ['SI', 'Slovenia', 'Σλοβενία', 'H3', ['#FFF', '#005DA4', '#ED1C24'], 'COAT'],

  // Americas (24)
  ['AG', 'Antigua and Barbuda', 'Αντίγκουα και Μπαρμπούντα', 'TRI', ['#000', '#0072C6', '#FFF', '#CE1126', '#FCD116'], 'DISC'],
  ['BS', 'Bahamas', 'Μπαχάμες', 'TRI', ['#00778B', '#FFC72C', '#00778B', '#000'], ''],
  ['BB', 'Barbados', 'Μπαρμπάντος', 'V3', ['#00267F', '#FFC726', '#00267F'], 'COAT'],
  ['BZ', 'Belize', 'Μπελίζ', 'H3T', ['#D90F19', '#003F87', '#D90F19', '#FFF'], 'DISC'],
  ['BO', 'Bolivia', 'Βολιβία', 'H3', ['#D52B1E', '#F9E300', '#007934'], ''],
  ['CR', 'Costa Rica', 'Κόστα Ρίκα', 'H3F', ['#002B7F', '#CE1126', '#FFF'], ''],
  ['DM', 'Dominica', 'Δομινίκα', 'S', ['#006B3F', '#FCD116', '#D41C30'], 'DISC'],
  ['DO', 'Dominican Republic', 'Δομινικανή Δημοκρατία', 'NORD', ['#002D62', '#FFF', '#CE1126'], 'COAT'],
  ['EC', 'Ecuador', 'Ισημερινός', 'H3', ['#FFD100', '#0072CE', '#EF3340'], 'COAT'],
  ['SV', 'El Salvador', 'Ελ Σαλβαδόρ', 'H3', ['#0F47AF', '#FFF', '#0F47AF'], 'COAT'],
  ['GD', 'Grenada', 'Γρενάδα', 'S', ['#CE1126', '#FCD116', '#007A5E'], 'STAR'],
  ['GT', 'Guatemala', 'Γουατεμάλα', 'V3', ['#4997D0', '#FFF', '#4997D0'], 'COAT'],
  ['GY', 'Guyana', 'Γουιάνα', 'TRI2', ['#009E49', '#009E49', '#FCD116', '#CE1126'], ''],
  ['HT', 'Haiti', 'Αϊτή', 'H2', ['#00209F', '#D21034'], 'COAT'],
  ['HN', 'Honduras', 'Ονδούρα', 'H3', ['#00BCE4', '#FFF', '#00BCE4', '#00BCE4'], 'STAR'],
  ['NI', 'Nicaragua', 'Νικαράγουα', 'H3', ['#0067C6', '#FFF', '#0067C6'], 'COAT'],
  ['PA', 'Panama', 'Παναμάς', 'V2', ['#FFF', '#DA121A', '#072357'], 'STAR'],
  ['PY', 'Paraguay', 'Παραγουάη', 'H3', ['#D52B1E', '#FFF', '#0038A8'], 'COAT'],
  ['KN', 'Saint Kitts and Nevis', 'Άγιος Χριστόφορος και Νέβις', 'DIAG', ['#009E49', '#CE1126', '#000', '#FCD116'], 'STAR'],
  ['LC', 'Saint Lucia', 'Αγία Λουκία', 'S', ['#66CCFF', '#FCD116'], 'STAR'],
  ['VC', 'Saint Vincent and the Grenadines', 'Άγιος Βικέντιος και Γρεναδίνες', 'V3', ['#002674', '#FCD116', '#007C2E'], ''],
  ['SR', 'Suriname', 'Σουρινάμ', 'H3F', ['#377E3F', '#B40A2D', '#FFF', '#ECC81D'], 'STAR'],
  ['TT', 'Trinidad and Tobago', 'Τρινιντάντ και Τομπάγκο', 'DIAG', ['#CE1126', '#CE1126', '#000', '#FFF'], ''],
  ['VE', 'Venezuela', 'Βενεζουέλα', 'H3', ['#FCE300', '#00247D', '#CF142B', '#FFF'], 'STAR'],

  // Asia & Middle East (37)
  ['AF', 'Afghanistan', 'Αφγανιστάν', 'V3', ['#000', '#D32011', '#007A36'], 'COAT'],
  ['AM', 'Armenia', 'Αρμενία', 'H3', ['#D90012', '#0033A0', '#F2A800'], ''],
  ['AZ', 'Azerbaijan', 'Αζερμπαϊτζάν', 'H3', ['#00B5E2', '#EF3340', '#509E2F', '#FFF'], 'CRES'],
  ['BH', 'Bahrain', 'Μπαχρέιν', 'V2', ['#FFF', '#CE1126'], ''],
  ['BD', 'Bangladesh', 'Μπανγκλαντές', 'S', ['#006A4E', '#F42A41'], 'DISC'],
  ['BT', 'Bhutan', 'Μπουτάν', 'DIAG', ['#FFD520', '#FF4E12', '#FFF', '#FF4E12'], ''],
  ['BN', 'Brunei', 'Μπρουνέι', 'DIAG', ['#F7E017', '#F7E017', '#000', '#FFF', '#CF1126'], 'COAT'],
  ['KH', 'Cambodia', 'Καμπότζη', 'H3T', ['#032EA1', '#E00025', '#032EA1', '#FFF'], 'COAT'],
  ['GE', 'Georgia', 'Γεωργία', 'NORD', ['#FFF', '#FF0000', '#FF0000'], ''],
  ['IR', 'Iran', 'Ιράν', 'H3', ['#239F40', '#FFF', '#DA0000', '#DA0000'], 'COAT'],
  ['IQ', 'Iraq', 'Ιράκ', 'H3', ['#CE1126', '#FFF', '#000', '#007A3D'], 'COAT'],
  ['JO', 'Jordan', 'Ιορδανία', 'TRI', ['#000', '#FFF', '#007A3D', '#CE1126'], 'LSTAR'],
  ['KZ', 'Kazakhstan', 'Καζακστάν', 'S', ['#00AFCA', '#FEC50C'], 'DISC'],
  ['KW', 'Kuwait', 'Κουβέιτ', 'TRI', ['#007A3D', '#FFF', '#CE1126', '#000'], ''],
  ['KG', 'Kyrgyzstan', 'Κιργιζία', 'S', ['#E8112D', '#FFEF00'], 'DISC'],
  ['LA', 'Laos', 'Λάος', 'H3T', ['#CE1126', '#002868', '#CE1126', '#FFF'], 'DISC'],
  ['LB', 'Lebanon', 'Λίβανος', 'H3T', ['#ED1C24', '#FFF', '#ED1C24', '#00A651'], 'COAT'],
  ['MY', 'Malaysia', 'Μαλαισία', 'CANT', ['#CC0001', '#010066', '#FFF', '#FFCC00'], ''],
  ['MV', 'Maldives', 'Μαλδίβες', 'S', ['#D21034', '#007E3A', '#FFF', '#FFF', '#FFF'], 'CRES'],
  ['MN', 'Mongolia', 'Μογγολία', 'V3', ['#DA2032', '#0066B3', '#DA2032', '#FFD900'], ''],
  ['MM', 'Myanmar', 'Μιανμάρ', 'H3', ['#FECB00', '#34B233', '#EA2839', '#FFF'], 'STAR'],
  ['NP', 'Nepal', 'Νεπάλ', 'TRI2', ['#DC143C', '#DC143C', '#003893', '#FFF'], 'STAR'],
  ['KP', 'North Korea', 'Βόρεια Κορέα', 'H3F', ['#024FA2', '#ED1C27', '#FFF', '#FFF'], 'STAR'],
  ['OM', 'Oman', 'Ομάν', 'TRI', ['#FFF', '#DB161B', '#008000', '#DB161B'], ''],
  ['PK', 'Pakistan', 'Πακιστάν', 'S', ['#01411C', '#FFF'], 'CRES'],
  ['PH', 'Philippines', 'Φιλιππίνες', 'TRI2', ['#0038A8', '#CE1126', '#FFF', '#FCD116'], 'LSTAR'],
  ['QA', 'Qatar', 'Κατάρ', 'V2', ['#FFF', '#8A1538'], ''],
  ['SA', 'Saudi Arabia', 'Σαουδική Αραβία', 'S', ['#006C35', '#FFF'], 'COAT'],
  ['SG', 'Singapore', 'Σιγκαπούρη', 'H2', ['#EF3340', '#FFF'], ''],
  ['LK', 'Sri Lanka', 'Σρι Λάνκα', 'V2', ['#FFBE29', '#8D153A', '#00534E'], 'COAT'],
  ['SY', 'Syria', 'Συρία', 'H3', ['#CE1126', '#FFF', '#000', '#007A3D'], 'STAR'],
  ['TJ', 'Tajikistan', 'Τατζικιστάν', 'H3', ['#CC0000', '#FFF', '#006600', '#F8C300'], 'COAT'],
  ['TL', 'Timor-Leste', 'Ανατολικό Τιμόρ', 'TRI2', ['#DA291C', '#DA291C', '#000', '#FFC72C'], 'LSTAR'],
  ['TM', 'Turkmenistan', 'Τουρκμενιστάν', 'S', ['#00843D', '#FFF'], 'CRES'],
  ['AE', 'United Arab Emirates', 'Ηνωμένα Αραβικά Εμιράτα', 'TRI', ['#00732F', '#FFF', '#000', '#FF0000'], ''],
  ['UZ', 'Uzbekistan', 'Ουζμπεκιστάν', 'H3', ['#0099B5', '#FFF', '#1EB53A'], ''],
  ['YE', 'Yemen', 'Υεμένη', 'H3', ['#CE1126', '#FFF', '#000'], ''],

  // Africa (49)
  ['DZ', 'Algeria', 'Αλγερία', 'V2', ['#006233', '#FFF', '#D21034', '#D21034', '#D21034'], 'CRES'],
  ['AO', 'Angola', 'Αγκόλα', 'H2', ['#CE1126', '#000', '#FFEC00', '#FFEC00'], 'STAR'],
  ['BJ', 'Benin', 'Μπενίν', 'TRI2', ['#FCD116', '#E8112D', '#008751'], ''],
  ['BW', 'Botswana', 'Μποτσουάνα', 'H3F', ['#6DA9D2', '#000', '#FFF'], ''],
  ['BF', 'Burkina Faso', 'Μπουρκίνα Φάσο', 'H2', ['#EF2B2D', '#009E49', '#FCD116', '#FCD116'], 'STAR'],
  ['BI', 'Burundi', 'Μπουρούντι', 'DIAG', ['#CE1126', '#1EB53A', '#FFF', '#FFF'], 'DISC'],
  ['CV', 'Cabo Verde', 'Πράσινο Ακρωτήριο', 'H3F', ['#003893', '#CF2027', '#FFF', '#F7D116'], 'STAR'],
  ['CM', 'Cameroon', 'Καμερούν', 'V3', ['#007A5E', '#CE1126', '#FCD116', '#FCD116'], 'STAR'],
  ['CF', 'Central African Republic', 'Κεντροαφρικανική Δημοκρατία', 'H4', ['#003082', '#FFF', '#289728', '#FFCE00'], 'STAR'],
  ['TD', 'Chad', 'Τσαντ', 'V3', ['#002664', '#FECB00', '#C60C30'], ''],
  ['KM', 'Comoros', 'Κομόρες', 'TRI', ['#FFC61E', '#FFF', '#CE1126', '#3D8E33'], 'LSTAR'],
  ['CG', 'Republic of the Congo', 'Δημοκρατία του Κονγκό', 'DIAG', ['#009543', '#DC241F', '#FBDE4A', '#FBDE4A'], ''],
  ['CD', 'DR Congo', 'Λαϊκή Δημοκρατία του Κονγκό', 'DIAG', ['#007FFF', '#007FFF', '#CE1021', '#F7D618'], 'LSTAR'],
  ['CI', 'Ivory Coast', 'Ακτή Ελεφαντοστού', 'V3', ['#F77F00', '#FFF', '#009E60'], ''],
  ['DJ', 'Djibouti', 'Τζιμπουτί', 'TRI2', ['#6AB2E7', '#12AD2B', '#FFF', '#D7141A'], 'LSTAR'],
  ['GQ', 'Equatorial Guinea', 'Ισημερινή Γουινέα', 'TRI', ['#3E9A00', '#FFF', '#E32118', '#0073CE'], 'COAT'],
  ['ER', 'Eritrea', 'Ερυθραία', 'TRI2', ['#4189DD', '#12AD2B', '#EA0437', '#FFC726'], 'LSTAR'],
  ['SZ', 'Eswatini', 'Εσουατίνι', 'H3F', ['#3E5EB9', '#B10C0C', '#FFD900'], 'COAT'],
  ['ET', 'Ethiopia', 'Αιθιοπία', 'H3', ['#078930', '#FCDD09', '#DA121A', '#0F47AF'], 'DISC'],
  ['GA', 'Gabon', 'Γκαμπόν', 'H3', ['#009E60', '#FCD116', '#3A75C4'], ''],
  ['GM', 'Gambia', 'Γκάμπια', 'H3F', ['#CE1126', '#0C1C8C', '#FFF'], ''],
  ['GH', 'Ghana', 'Γκάνα', 'H3', ['#CE1126', '#FCD116', '#006B3F', '#000'], 'STAR'],
  ['GN', 'Guinea', 'Γουινέα', 'V3', ['#CE1126', '#FCD116', '#009460'], ''],
  ['GW', 'Guinea-Bissau', 'Γουινέα-Μπισάου', 'TRI2', ['#FCD116', '#009E49', '#CE1126', '#000'], 'LSTAR'],
  ['LS', 'Lesotho', 'Λεσότο', 'H3', ['#00209F', '#FFF', '#009543', '#000'], 'COAT'],
  ['LR', 'Liberia', 'Λιβερία', 'CANT', ['#BF0A30', '#002868', '#FFF'], 'LSTAR'],
  ['LY', 'Libya', 'Λιβύη', 'H3T', ['#E70013', '#000', '#239E46', '#FFF', '#FFF'], 'CRES'],
  ['MG', 'Madagascar', 'Μαδαγασκάρη', 'TRI2', ['#FC3D32', '#007E3A', '#FFF'], ''],
  ['MW', 'Malawi', 'Μαλάουι', 'H3', ['#000', '#CE1126', '#339E35', '#CE1126'], 'DISC'],
  ['ML', 'Mali', 'Μάλι', 'V3', ['#14B53A', '#FCD116', '#CE1126'], ''],
  ['MR', 'Mauritania', 'Μαυριτανία', 'H3T', ['#D01C1F', '#00A95C', '#D01C1F', '#FFD700', '#FFD700'], 'CRES'],
  ['MU', 'Mauritius', 'Μαυρίκιος', 'H4', ['#EA2839', '#1A206D', '#FFD500', '#00A551'], ''],
  ['MZ', 'Mozambique', 'Μοζαμβίκη', 'TRI', ['#007168', '#000', '#FCE100', '#D21034'], 'LSTAR'],
  ['NA', 'Namibia', 'Ναμίμπια', 'DIAG', ['#003580', '#009543', '#D21034', '#FFF'], ''],
  ['NE', 'Niger', 'Νίγηρας', 'H3', ['#E05206', '#FFF', '#0DB02B', '#E05206'], 'DISC'],
  ['RW', 'Rwanda', 'Ρουάντα', 'H3', ['#00A1DE', '#FAD201', '#20603D'], ''],
  ['ST', 'Sao Tome and Principe', 'Σάο Τομέ και Πρίνσιπε', 'TRI', ['#12AD2B', '#FFCE00', '#12AD2B', '#D21034', '#000'], 'STAR'],
  ['SN', 'Senegal', 'Σενεγάλη', 'V3', ['#00853F', '#FDEF42', '#E31B23', '#00853F'], 'STAR'],
  ['SC', 'Seychelles', 'Σεϋχέλλες', 'DIAG', ['#003F87', '#007A3D', '#D62828', '#FCD856'], ''],
  ['SL', 'Sierra Leone', 'Σιέρα Λεόνε', 'H3', ['#1EB53A', '#FFF', '#0072C6'], ''],
  ['SO', 'Somalia', 'Σομαλία', 'S', ['#4189DD', '#FFF'], 'STAR'],
  ['SS', 'South Sudan', 'Νότιο Σουδάν', 'TRI', ['#000', '#DA121A', '#078930', '#0F47AF', '#FCDD09'], 'LSTAR'],
  ['SD', 'Sudan', 'Σουδάν', 'TRI', ['#D21034', '#FFF', '#000', '#007229'], ''],
  ['TZ', 'Tanzania', 'Τανζανία', 'DIAG', ['#1EB53A', '#00A3DD', '#000', '#FCD116'], ''],
  ['TG', 'Togo', 'Τόγκο', 'CANT', ['#006A4E', '#D21034', '#FFCE00'], 'LSTAR'],
  ['TN', 'Tunisia', 'Τυνησία', 'S', ['#E70013', '#FFF'], 'DISC'],
  ['UG', 'Uganda', 'Ουγκάντα', 'H3', ['#000', '#FCDC04', '#D90000', '#FFF'], 'DISC'],
  ['ZM', 'Zambia', 'Ζάμπια', 'S', ['#198A00', '#EF7D00'], 'COAT'],
  ['ZW', 'Zimbabwe', 'Ζιμπάμπουε', 'TRI', ['#319208', '#FFD200', '#DE2010', '#FFF', '#DE2010'], 'LSTAR'],

  // Oceania (12)
  ['FJ', 'Fiji', 'Φίτζι', 'CANT', ['#68BFE5', '#012169'], 'COAT'],
  ['KI', 'Kiribati', 'Κιριμπάτι', 'H2', ['#CE1126', '#003F87', '#FCD116', '#FCD116'], 'DISC'],
  ['MH', 'Marshall Islands', 'Νήσοι Μάρσαλ', 'DIAG', ['#003893', '#003893', '#DD7500', '#FFF'], 'LSTAR'],
  ['FM', 'Micronesia', 'Μικρονησία', 'S', ['#75B2DD', '#FFF'], 'STAR'],
  ['NR', 'Nauru', 'Ναουρού', 'H3F', ['#002B7F', '#FFC61E', '#002B7F', '#FFF'], 'LSTAR'],
  ['PW', 'Palau', 'Παλάου', 'S', ['#4AADD6', '#FFDE00'], 'DISC'],
  ['PG', 'Papua New Guinea', 'Παπούα Νέα Γουινέα', 'DIAG', ['#CE1126', '#000', '#000', '#FCD116'], 'STAR'],
  ['WS', 'Samoa', 'Σαμόα', 'CANT', ['#CE1126', '#002B7F'], 'LSTAR'],
  ['SB', 'Solomon Islands', 'Νήσοι Σολομώντα', 'DIAG', ['#0051BA', '#215B33', '#FCD116', '#FCD116'], 'LSTAR'],
  ['TO', 'Tonga', 'Τόνγκα', 'CANT', ['#C10000', '#FFF'], 'CROSS'],
  ['TV', 'Tuvalu', 'Τουβαλού', 'CANT', ['#5B97B1', '#012169', null, '#FFCE00'], 'STAR'],
  ['VU', 'Vanuatu', 'Βανουάτου', 'TRI2', ['#D21034', '#009543', '#000', '#FDCE12'], ''],
];

for (const [code, en, el, pattern, colors, emblem] of TIER5_UN_RAW) {
  FLAGS_DATA.push({
    code,
    en,
    el,
    tier: 5,
    svg: makeUnFlagSvg(pattern, colors, emblem),
  });
}
