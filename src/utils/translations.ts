/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { SupportedLanguage } from '../types';

export interface LanguageMeta {
  code: SupportedLanguage;
  name: string;
  nativeName: string;
}

export const SUPPORTED_LANGUAGES: LanguageMeta[] = [
  { code: 'en', name: 'English', nativeName: 'English' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिंदी' },
  { code: 'bn', name: 'Bengali', nativeName: 'বাংলা' },
  { code: 'te', name: 'Telugu', nativeName: 'తెలుగు' },
  { code: 'mr', name: 'Marathi', nativeName: 'मराठी' },
  { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்' },
  { code: 'gu', name: 'Gujarati', nativeName: 'ગુજરાતી' },
  { code: 'kn', name: 'Kannada', nativeName: 'ಕನ್ನಡ' },
  { code: 'ml', name: 'Malayalam', nativeName: 'മലയാളം' },
  { code: 'pa', name: 'Punjabi', nativeName: 'ਪੰਜਾਬੀ' },
];

export interface UiTranslations {
  tagline: string;
  postRequirement: string;
  howItWorks: string;
  proofShowcase: string;
  whyNoStars: string;
  faqs: string;
  dataInspector: string;
  customerDashboard: string;
  needSkilledWork: string;
  typeYourProblem: string;
  urgentService: string;
  selectLocation: string;
  verifiedWorkers: string;
  zeroStarsBadge: string;
  photoVerifiedBadge: string;
  categoriesTitle: string;
  categoriesSubtitle: string;
  trades: {
    electrician: string;
    plumber: string;
    mason: string;
    carpenter: string;
    painter: string;
    acTechnician: string;
  };
}

export const TRANSLATIONS: Record<SupportedLanguage, UiTranslations> = {
  en: {
    tagline: 'Kaam Bolega, Stars Nahi.',
    postRequirement: 'Post Requirement',
    howItWorks: 'How It Works',
    proofShowcase: 'Real Proof Showcase',
    whyNoStars: 'Why Zero Stars?',
    faqs: 'FAQs',
    dataInspector: 'Data Inspector',
    customerDashboard: 'Customer Home',
    needSkilledWork: 'What skilled help do you need today?',
    typeYourProblem: 'Describe in Hindi, Hinglish or English (e.g., MCB baar baar gir raha hai)...',
    urgentService: 'Urgent Dispatch Available',
    selectLocation: 'Location',
    verifiedWorkers: 'Verified Local Craftsmen',
    zeroStarsBadge: 'Zero Star Ratings',
    photoVerifiedBadge: '100% Photo Verified',
    categoriesTitle: 'Skilled Trade Categories',
    categoriesSubtitle: 'Evidence-verified craftsmen with transparent market rates',
    trades: {
      electrician: 'Electrician',
      plumber: 'Plumber',
      mason: 'Mason',
      carpenter: 'Carpenter',
      painter: 'Painter',
      acTechnician: 'AC Technician',
    },
  },
  hi: {
    tagline: 'काम बोलेगा, स्टार्स नहीं।',
    postRequirement: 'काम दर्ज करें',
    howItWorks: 'यह कैसे काम करता है',
    proofShowcase: 'असली काम के सबूत',
    whyNoStars: 'स्टार्स क्यों नहीं?',
    faqs: 'सवाल-जवाब',
    dataInspector: 'डेटा इंस्पेक्टर',
    customerDashboard: 'ग्राहक डैशबोर्ड',
    needSkilledWork: 'आज आपको किस कारीगर की जरूरत है?',
    typeYourProblem: 'हिंदी या हिंग्लिश में बताएं (उदा. MCB बार-बार गिर रहा है, आज ही चाहिए)...',
    urgentService: 'तुरंत सेवा उपलब्ध',
    selectLocation: 'इलाका चुनें',
    verifiedWorkers: 'सत्यापित स्थानीय कारीगर',
    zeroStarsBadge: 'ज़ीरो स्टार रेटिंग्स',
    photoVerifiedBadge: '100% फोटो सत्यापित',
    categoriesTitle: 'कारीगरी श्रेणियां',
    categoriesSubtitle: 'काम के फोटो सबूत और उचित बाजार दरों के साथ',
    trades: {
      electrician: 'इलेक्ट्रीशियन',
      plumber: 'प्लंबर',
      mason: 'राजमिस्त्री',
      carpenter: 'बढ़ई',
      painter: 'पेंटर',
      acTechnician: 'एसी टेक्नीशियन',
    },
  },
  bn: {
    tagline: 'কাজ কথা বলবে, স্টার নয়।',
    postRequirement: 'কাজের প্রয়োজন দিন',
    howItWorks: 'কীভাবে কাজ করে',
    proofShowcase: 'কাজের প্রমাণ',
    whyNoStars: 'কেন স্টার নেই?',
    faqs: 'প্রশ্নোত্তর',
    dataInspector: 'ডাটা ইন্সপেক্টর',
    customerDashboard: 'গ্রাহক হোম',
    needSkilledWork: 'আজ আপনার কী দক্ষ কারিগরের প্রয়োজন?',
    typeYourProblem: 'আপনার সমস্যা বাংলায় বা ইংরেজিতে লিখুন...',
    urgentService: 'জরুরি সেবা উপলব্ধ',
    selectLocation: 'স্থান নির্বাচন করুন',
    verifiedWorkers: 'যাচাইকৃত কারিগর',
    zeroStarsBadge: 'কোনো স্টার রেটিং নেই',
    photoVerifiedBadge: '১০০% ছবি যাচাইকৃত',
    categoriesTitle: 'কাজের বিভাগসমূহ',
    categoriesSubtitle: 'স্বচ্ছ বাজার রেট সহ যাচাইকৃত মিস্ত্রি',
    trades: {
      electrician: 'ইলেকট্রিশিয়ান',
      plumber: 'প্লাম্বার',
      mason: 'রাজমিস্ত্রি',
      carpenter: 'ছুতোর',
      painter: 'রংমিস্ত্রি',
      acTechnician: 'এসি টেকনিশিয়ান',
    },
  },
  te: {
    tagline: 'పనే మాట్లాడుతుంది, స్టార్స్ కాదు.',
    postRequirement: 'రిక్వైర్‌మెంట్ పోస్ట్ చేయండి',
    howItWorks: 'ఎలా పనిచేస్తుంది',
    proofShowcase: 'పని సాక్ష్యాలు',
    whyNoStars: 'స్టార్స్ ఎందుకు వద్దు?',
    faqs: 'ప్రశ్నలు-జవాబులు',
    dataInspector: 'డేటా ఇన్‌స్పెక్టర్',
    customerDashboard: 'కస్టమర్ హోమ్',
    needSkilledWork: 'ఈ రోజు మీకు ఏ నిపుణుల సేవలు కావాలి?',
    typeYourProblem: 'మీ సమస్యను తెలుగు లేదా ఇంగ్లీషులో టైప్ చేయండి...',
    urgentService: 'అత్యవసర సర్వీస్ లభ్యం',
    selectLocation: 'ప్రాంతం',
    verifiedWorkers: 'ధృవీకరించబడిన వర్కర్లు',
    zeroStarsBadge: 'జీరో స్టార్ రేటింగ్స్',
    photoVerifiedBadge: '100% ఫోటో ధృవీకరణ',
    categoriesTitle: 'సేవా వర్గాలు',
    categoriesSubtitle: 'నిజమైన ఫోటోలతో ధృవీకరించిన నిపుణులు',
    trades: {
      electrician: 'ఎలక్ట్రీషియన్',
      plumber: 'ప్లంబర్',
      mason: 'మేస్త్రీ',
      carpenter: 'వడ్రంగి',
      painter: 'పెయింటర్',
      acTechnician: 'ఏసీ టెక్నీషియన్',
    },
  },
  mr: {
    tagline: 'काम बोलेल, स्टार्स नाही.',
    postRequirement: 'काम पोस्ट करा',
    howItWorks: 'कसे काम करते',
    proofShowcase: 'कामाचे पुरावे',
    whyNoStars: 'स्टार्स का नाहीत?',
    faqs: 'नेहमीचे प्रश्न',
    dataInspector: 'डेटा इन्स्पेक्टर',
    customerDashboard: 'ग्राहक होम',
    needSkilledWork: 'आज तुम्हाला कोणत्या कारागिराची गरज आहे?',
    typeYourProblem: 'तुमची समस्या मराठी किंवा हिंग्लिशमध्ये लिहा...',
    urgentService: 'तातडीची सेवा उपलब्ध',
    selectLocation: 'ठिकाण',
    verifiedWorkers: 'सत्यापित कारागीर',
    zeroStarsBadge: 'शून्य स्टार रेटिंग्स',
    photoVerifiedBadge: '१००% फोटो पडताळणी',
    categoriesTitle: 'कारागीर श्रेणी',
    categoriesSubtitle: 'कामाचे थेट फोटो पुरावे आणि पारदर्शक दर',
    trades: {
      electrician: 'इलेक्ट्रिशियन',
      plumber: 'प्लंबर',
      mason: 'गवंडी',
      carpenter: 'सुतार',
      painter: 'पेंटर',
      acTechnician: 'एसी मेकॅनिक',
    },
  },
  ta: {
    tagline: 'வேலை பேசும், ஸ்டார்கள் அல்ல.',
    postRequirement: 'வேலையை பதிவிடவும்',
    howItWorks: 'எவ்வாறு செயல்படுகிறது',
    proofShowcase: 'வேலை ஆதாரங்கள்',
    whyNoStars: 'ஸ்டார்கள் ஏன் இல்லை?',
    faqs: 'கேள்வி பதில்கள்',
    dataInspector: 'டேட்டா இன்ஸ்பெக்டர்',
    customerDashboard: 'வாடிக்கையாளர் தளம்',
    needSkilledWork: 'இன்று உங்களுக்கு என்ன கைவினைஞர் தேவை?',
    typeYourProblem: 'உங்கள் தேவையை தமிழில் அல்லது ஆங்கிலத்தில் உள்ளிடவும்...',
    urgentService: 'அவசர சேவை உள்ளது',
    selectLocation: 'இடம்',
    verifiedWorkers: 'சரிபார்க்கப்பட்ட தொழிலாளர்கள்',
    zeroStarsBadge: 'பூஜ்ஜிய ஸ்டார் மதிப்பீடு',
    photoVerifiedBadge: '100% புகைப்பட சரிபார்ப்பு',
    categoriesTitle: 'தொழில் பிரிவுகள்',
    categoriesSubtitle: 'நேரடி புகைப்பட சான்றுகளுடன் தொழிலாளர்கள்',
    trades: {
      electrician: 'எலக்ட்ரீஷியன்',
      plumber: 'பிளம்பர்',
      mason: 'கொத்தனார்',
      carpenter: 'தச்சர்',
      painter: 'பெயிண்டர்',
      acTechnician: 'ஏசி டெக்னீஷியன்',
    },
  },
  gu: {
    tagline: 'કામ બોલશે, સ્ટાર્સ નહીં.',
    postRequirement: 'કામ પોસ્ટ કરો',
    howItWorks: 'કેવી રીતે કામ કરે છે',
    proofShowcase: 'કામના પુરાવા',
    whyNoStars: 'સ્ટાર્સ કેમ નહીં?',
    faqs: 'વારંવાર પૂછાતા પ્રશ્નો',
    dataInspector: 'ડેટા ઇન્સ્પેક્ટર',
    customerDashboard: 'ગ્રાહક હોમ',
    needSkilledWork: 'આજે તમને ક્યા કારીગરની જરૂર છે?',
    typeYourProblem: 'તમારી સમસ્યા ગુજરાતી અથવા અંગ્રેજીમાં લખો...',
    urgentService: 'તાત્કાલિક સેવા ઉપલબ્ધ',
    selectLocation: 'વિસ્તાર',
    verifiedWorkers: 'ચકાસાયેલ કારીગરો',
    zeroStarsBadge: 'ઝીરો સ્ટાર રેટિંગ્સ',
    photoVerifiedBadge: '૧૦૦% ફોટો ચકાસાયેલ',
    categoriesTitle: 'કારીગરી શ્રેણીઓ',
    categoriesSubtitle: 'વાજબી બજાર દર સાથે ચકાસાયેલ કારીગરો',
    trades: {
      electrician: 'ઇલેક્ટ્રિશિયન',
      plumber: 'પ્લમ્બર',
      mason: 'કડિયો',
      carpenter: 'સુથાર',
      painter: 'પેઇન્ટર',
      acTechnician: 'એસી ટેકનિશિયન',
    },
  },
  kn: {
    tagline: 'ಕೆಲಸ ಮಾತನಾಡುತ್ತದೆ, ನಕ್ಷತ್ರಗಳಲ್ಲ.',
    postRequirement: 'ಕೆಲಸವನ್ನು ಪೋಸ್ಟ್ ಮಾಡಿ',
    howItWorks: 'ಇದು ಹೇಗೆ ಕಾರ್ಯನಿರ್ವಹಿಸುತ್ತದೆ',
    proofShowcase: 'ಕೆಲಸದ ಸಾಕ್ಷ್ಯಗಳು',
    whyNoStars: 'ನಕ್ಷತ್ರಗಳು ಏಕೆ ಬೇಡ?',
    faqs: 'ಪ್ರಶ್ನೋತ್ತರ',
    dataInspector: 'ಡೇಟಾ ಇನ್ಸ್‌ಪೆಕ್ಟರ್',
    customerDashboard: 'ಗ್ರಾಹಕರ ಮುಖಪುಟ',
    needSkilledWork: 'ಇಂದು ನಿಮಗೆ ಯಾವ ನುರಿತ ಕೆಲಸಗಾರರ ಅಗತ್ಯವಿದೆ?',
    typeYourProblem: 'ನಿಮ್ಮ ಸಮಸ್ಯೆಯನ್ನು ಕನ್ನಡ ಅಥವಾ ಇಂಗ್ಲಿಷ್‌ನಲ್ಲಿ ಬರೆಯಿರಿ...',
    urgentService: 'ತುರ್ತು ಸೇವೆ ಲಭ್ಯವಿದೆ',
    selectLocation: 'ಸ್ಥಳ',
    verifiedWorkers: 'ಪರಿಶೀಲಿಸಿದ ಕೆಲಸಗಾರರು',
    zeroStarsBadge: 'ಶೂನ್ಯ ಸ್ಟಾರ್ ರೇಟಿಂಗ್',
    photoVerifiedBadge: '100% ಫೋಟೋ ಪರಿಶೀಲಿಸಲಾಗಿದೆ',
    categoriesTitle: 'ಸೇವಾ ವರ್ಗಗಳು',
    categoriesSubtitle: 'ನಿಖರವಾದ ಫೋಟೋ ಸಾಕ್ಷ್ಯದೊಂದಿಗೆ ಪರಿಶೀಲಿಸಿದ ಕುಶಲಕರ್ಮಿಗಳು',
    trades: {
      electrician: 'ಎಲೆಕ್ಟ್ರಿಷಿಯನ್',
      plumber: 'ಪ್ಲಂಬರ್',
      mason: 'ಮೇಸ್ತ್ರಿ',
      carpenter: 'ಬಡಗಿ',
      painter: 'ಪೇಂಟರ್',
      acTechnician: 'ಎಸಿ ತಂತ್ರಜ್ಞ',
    },
  },
  ml: {
    tagline: 'പ്രവൃത്തി സംസാരിക്കും, സ്റ്റാറുകളല്ല.',
    postRequirement: 'ആവശ്യം പോസ്റ്റ് ചെയ്യുക',
    howItWorks: 'എങ്ങനെ പ്രവർത്തിക്കുന്നു',
    proofShowcase: 'ജോലി തെളിവുകൾ',
    whyNoStars: 'എന്തുകൊണ്ട് സ്റ്റാറുകൾ ഇല്ല?',
    faqs: 'ചോദ്യോത്തരങ്ങൾ',
    dataInspector: 'ഡാറ്റ ഇൻസ്പെക്ടർ',
    customerDashboard: 'ഉപഭോക്തൃ ഹോം',
    needSkilledWork: 'ഇന്ന് നിങ്ങൾക്ക് ഏത് വിദഗ്ദ്ധ തൊഴിലാളിയെയാണ് ആവശ്യം?',
    typeYourProblem: 'നിങ്ങളുടെ പ്രശ്നം മലയാളത്തിലോ ഇംഗ്ലീഷിലോ എഴുതുക...',
    urgentService: 'അടിയന്തര സേവനം ലഭ്യമാണ്',
    selectLocation: 'സ്ഥലം',
    verifiedWorkers: 'സ്ഥിരീകരിച്ച തൊഴിലാളികൾ',
    zeroStarsBadge: 'സീറോ സ്റ്റാർ റേറ്റിംഗ്',
    photoVerifiedBadge: '100% ഫോട്ടോ പരിശോധിച്ചു',
    categoriesTitle: 'തൊഴിൽ വിഭാഗങ്ങൾ',
    categoriesSubtitle: 'സുതാര്യമായ നിരക്കുകളിൽ മികച്ച വിദഗ്ദ്ധർ',
    trades: {
      electrician: 'ഇലക്ട്രീഷ്യൻ',
      plumber: 'പ്ലംബർ',
      mason: 'മേസ്തിരി',
      carpenter: 'ആശാരി',
      painter: 'പെയിന്റർ',
      acTechnician: 'എസി ടെക്നീഷ്യൻ',
    },
  },
  pa: {
    tagline: 'ਕੰਮ ਬੋਲੇਗਾ, ਸਟਾਰ ਨਹੀਂ।',
    postRequirement: 'ਕੰਮ ਦਰਜ ਕਰੋ',
    howItWorks: 'ਇਹ ਕਿਵੇਂ ਕੰਮ ਕਰਦਾ ਹੈ',
    proofShowcase: 'ਕੰਮ ਦੇ ਸਬੂਤ',
    whyNoStars: 'ਸਟਾਰ ਕਿਉਂ ਨਹੀਂ?',
    faqs: 'ਸਵਾਲ-ਜਵਾਬ',
    dataInspector: 'ਡਾਟਾ ਇੰਸਪੈਕਟਰ',
    customerDashboard: 'ਗਾਹਕ ਹੋਮ',
    needSkilledWork: 'ਅੱਜ ਤੁਹਾਨੂੰ ਕਿਸ ਕਾਰੀਗਰ ਦੀ ਲੋੜ ਹੈ?',
    typeYourProblem: 'ਆਪਣੀ ਸਮੱਸਿਆ ਪੰਜਾਬੀ ਜਾਂ ਅੰਗਰੇਜ਼ੀ ਵਿੱਚ ਲਿਖੋ...',
    urgentService: 'ਤੁਰੰਤ ਸੇਵਾ ਉਪਲਬਧ',
    selectLocation: 'ਇਲਾਕਾ',
    verifiedWorkers: 'ਪ੍ਰਮਾਣਿਤ ਕਾਰੀਗਰ',
    zeroStarsBadge: 'ਜ਼ੀਰੋ ਸਟਾਰ ਰੇਟਿੰਗ',
    photoVerifiedBadge: '100% ਫੋਟੋ ਪ੍ਰਮਾਣਿਤ',
    categoriesTitle: 'ਕਾਰੀਗਰੀ ਸ਼੍ਰੇਣੀਆਂ',
    categoriesSubtitle: 'ਕੰਮ ਦੀਆਂ ਫੋਟੋਆਂ ਅਤੇ ਸਹੀ ਬਾਜ਼ਾਰ ਦਰਾਂ ਦੇ ਨਾਲ',
    trades: {
      electrician: 'ਇਲੈਕਟ੍ਰੀਸ਼ੀਅਨ',
      plumber: 'ਪਲੰਬਰ',
      mason: 'ਰਾਜ ਮਿਸਤਰੀ',
      carpenter: 'ਤਰਖਾਣ',
      painter: 'ਪੇਂਟਰ',
      acTechnician: 'ਏਸੀ ਟੈਕਨੀਸ਼ੀਅਨ',
    },
  },
};
