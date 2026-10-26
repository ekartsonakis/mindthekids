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
