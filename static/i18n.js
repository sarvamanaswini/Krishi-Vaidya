const UI = {
en: {
nav_home:"Home", nav_how:"How it works", nav_diag:"Diagnose", nav_dash:"Officials' dashboard",
hero_h:"Catch crop disease before it spreads", hero_p:"Upload a leaf photo. Get the diagnosis, the 5-day weather risk and what to do next, in Telugu, Hindi or English.", hero_cta:"Diagnose a leaf", hero_cta2:"How it works",
how_h:"How Krishi Vaidya works", s1:"Upload a leaf photo", s2:"AI finds the disease or pest", s3:"Local weather is checked", s4:"Spread risk is predicted", s5:"You get an action plan", s6:"Ask questions by voice or text",
diag_h:"Diagnose your crop", crop_l:"Crop", any:"Not sure", c_tomato:"Tomato", c_potato:"Potato", c_wheat:"Wheat", c_rice:"Rice", loc_ph:"Village / district", up:"Tap to upload or take a leaf photo", busy:"Analysing…",
sensor:"Field sensor reading (optional)", temp:"Temp °C", hum:"Humidity %", st:"Photo,Diagnosis,Weather,Risk,Action,Ask",
r_diag:"Diagnosis", r_risk:"Spread risk, next 5 days", r_act:"What to do", r_ask:"Ask Krishi Vaidya", conf:"confidence",
sev_none:"no disease", "sev_early-stage":"early stage", sev_moderate:"moderate", sev_severe:"severe", risk_low:"Low", risk_medium:"Medium", risk_high:"High",
riskline:"{l} risk ({s}%): {h} of {n} days favour spread",
urg_high:"Act within 24–48 hours, weather favours fast spread.", urg_mid:"Act within the week and check daily.", urg_none:"No action needed.",
ref_low:"Confidence is low. Show this photo to your nearest KVK / extension officer before spraying.", ref_high:"High risk. Inform your extension officer so nearby fields are checked.",
dose:"Dose", org:"Organic option", flag:"Flag for expert review", flagged:"Sent for expert review.",
chat_ph:"Ask about dose, organic option, weather…", send:"Send", greet:"Ask me about the dose, organic option, steps or weather risk.", fb:"I can help with steps, dose, organic options and weather risk.", healthy_msg:"No disease found. Keep checking after rain.",
disc:"Prototype demo: read the product label and confirm with your extension officer before spraying.", foot:"Krishi Vaidya · SIH26131 · Prototype",
dash_t:"Officials' dashboard", back:"Farmer site", d_total:"Reports", d_pending:"Pending review", d_types:"Issue types", d_map:"Hotspot map", d_by:"By disease", d_recent:"Recent reports", none_yet:"No reports yet. Diagnose a photo first."},
hi: {
nav_home:"होम", nav_how:"कैसे काम करता है", nav_diag:"जाँच करें", nav_dash:"अधिकारी डैशबोर्ड",
hero_h:"फसल का रोग फैलने से पहले पकड़ें", hero_p:"पत्ते की फोटो डालें। रोग की पहचान, अगले 5 दिनों का मौसम-जोखिम और आगे क्या करना है, तेलुगु, हिंदी या अंग्रेज़ी में।", hero_cta:"पत्ते की जाँच करें", hero_cta2:"कैसे काम करता है",
how_h:"कृषि वैद्य कैसे काम करता है", s1:"पत्ते की फोटो डालें", s2:"AI रोग या कीट पहचानता है", s3:"स्थानीय मौसम देखा जाता है", s4:"फैलने का जोखिम आँका जाता है", s5:"आपको कार्य-योजना मिलती है", s6:"आवाज़ या टेक्स्ट से सवाल पूछें",
diag_h:"अपनी फसल की जाँच करें", crop_l:"फसल", any:"पता नहीं", c_tomato:"टमाटर", c_potato:"आलू", c_wheat:"गेहूँ", c_rice:"धान", c_maize:"मक्का", c_chilli:"मिर्च", c_mango:"आम", c_groundnut:"मूंगफली", c_onion:"प्याज", loc_ph:"गाँव / ज़िला", up:"पत्ते की फोटो लें या अपलोड करें", busy:"विश्लेषण हो रहा है…",
sensor:"खेत का सेंसर रीडिंग (वैकल्पिक)", temp:"तापमान °C", hum:"नमी %", st:"फोटो,पहचान,मौसम,जोखिम,उपाय,सवाल",
r_diag:"पहचान", r_risk:"फैलने का जोखिम, अगले 5 दिन", r_act:"क्या करें", r_ask:"कृषि वैद्य से पूछें", conf:"विश्वास",
sev_none:"कोई रोग नहीं", "sev_early-stage":"शुरुआती", sev_moderate:"मध्यम", sev_severe:"गंभीर", risk_low:"कम", risk_medium:"मध्यम", risk_high:"अधिक",
riskline:"{l} जोखिम ({s}%): {n} में से {h} दिन रोग फैलने के अनुकूल",
urg_high:"24–48 घंटे में कार्रवाई करें, मौसम तेज़ फैलाव के अनुकूल है।", urg_mid:"इस हफ्ते कार्रवाई करें और रोज़ जाँच करें।", urg_none:"किसी कार्रवाई की ज़रूरत नहीं।",
ref_low:"विश्वास कम है। छिड़काव से पहले यह फोटो नज़दीकी KVK / विस्तार अधिकारी को दिखाएँ।", ref_high:"जोखिम अधिक है। विस्तार अधिकारी को बताएँ ताकि आसपास के खेत भी जाँचे जाएँ।",
dose:"मात्रा", org:"जैविक विकल्प", flag:"विशेषज्ञ समीक्षा के लिए भेजें", flagged:"विशेषज्ञ समीक्षा के लिए भेजा गया।",
chat_ph:"मात्रा, जैविक विकल्प, मौसम पूछें…", send:"भेजें", greet:"मात्रा, जैविक विकल्प, उपाय या मौसम-जोखिम के बारे में पूछें।", fb:"मैं उपाय, मात्रा, जैविक विकल्प और मौसम-जोखिम बता सकता हूँ।", healthy_msg:"कोई रोग नहीं मिला। बारिश के बाद जाँचते रहें।",
disc:"प्रोटोटाइप डेमो: छिड़काव से पहले उत्पाद का लेबल पढ़ें और विस्तार अधिकारी से पुष्टि करें।", foot:"कृषि वैद्य · SIH26131 · प्रोटोटाइप",
dash_t:"अधिकारी डैशबोर्ड", back:"किसान साइट", d_total:"रिपोर्ट", d_pending:"समीक्षा बाकी", d_types:"समस्या के प्रकार", d_map:"हॉटस्पॉट नक्शा", d_by:"रोग के अनुसार", d_recent:"हाल की रिपोर्ट", none_yet:"अभी कोई रिपोर्ट नहीं। पहले फोटो की जाँच करें।"},
te: {
nav_home:"హోమ్", nav_how:"ఎలా పనిచేస్తుంది", nav_diag:"పరీక్షించండి", nav_dash:"అధికారుల డాష్‌బోర్డ్",
hero_h:"పంట వ్యాధి వ్యాపించకముందే గుర్తించండి", hero_p:"ఆకు ఫోటో అప్‌లోడ్ చేయండి. వ్యాధి గుర్తింపు, రాబోయే 5 రోజుల వాతావరణ ప్రమాదం, తర్వాత ఏం చేయాలో తెలుగు, హిందీ లేదా ఇంగ్లీష్‌లో.", hero_cta:"ఆకును పరీక్షించండి", hero_cta2:"ఎలా పనిచేస్తుంది",
how_h:"కృషి వైద్య ఎలా పనిచేస్తుంది", s1:"ఆకు ఫోటో అప్‌లోడ్ చేయండి", s2:"AI వ్యాధి లేదా పురుగును గుర్తిస్తుంది", s3:"స్థానిక వాతావరణం చూస్తుంది", s4:"వ్యాప్తి ప్రమాదాన్ని అంచనా వేస్తుంది", s5:"మీకు చర్యల ప్రణాళిక వస్తుంది", s6:"వాయిస్ లేదా టెక్స్ట్‌తో ప్రశ్నలు అడగండి",
diag_h:"మీ పంటను పరీక్షించండి", crop_l:"పంట", any:"తెలియదు", c_tomato:"టమాటా", c_potato:"బంగాళాదుంప", c_wheat:"గోధుమ", c_rice:"వరి", c_maize:"మొక్కజొన్న", c_chilli:"మిరప", c_mango:"మామిడి", c_groundnut:"వేరుశెనగ", c_onion:"ఉల్లి", loc_ph:"గ్రామం / జిల్లా", up:"ఆకు ఫోటో తీయండి లేదా అప్‌లోడ్ చేయండి", busy:"విశ్లేషిస్తోంది…",
sensor:"పొలం సెన్సార్ రీడింగ్ (ఐచ్ఛికం)", temp:"ఉష్ణోగ్రత °C", hum:"తేమ %", st:"ఫోటో,గుర్తింపు,వాతావరణం,ప్రమాదం,చర్య,ప్రశ్న",
r_diag:"గుర్తింపు", r_risk:"వ్యాప్తి ప్రమాదం, రాబోయే 5 రోజులు", r_act:"ఏం చేయాలి", r_ask:"కృషి వైద్యను అడగండి", conf:"నమ్మకం",
sev_none:"వ్యాధి లేదు", "sev_early-stage":"ప్రారంభ దశ", sev_moderate:"మధ్యస్థం", sev_severe:"తీవ్రం", risk_low:"తక్కువ", risk_medium:"మధ్యస్థ", risk_high:"ఎక్కువ",
riskline:"{l} ప్రమాదం ({s}%): {n} రోజుల్లో {h} రోజులు వ్యాప్తికి అనుకూలం",
urg_high:"24–48 గంటల్లో చర్య తీసుకోండి, వాతావరణం వేగంగా వ్యాపించడానికి అనుకూలం.", urg_mid:"ఈ వారంలో చర్య తీసుకోండి, రోజూ గమనించండి.", urg_none:"ఏ చర్యా అవసరం లేదు.",
ref_low:"నమ్మకం తక్కువ. మందు కొట్టే ముందు ఈ ఫోటోను దగ్గరి KVK / విస్తరణ అధికారికి చూపించండి.", ref_high:"ప్రమాదం ఎక్కువ. పక్క పొలాలూ చూడడానికి విస్తరణ అధికారికి తెలియజేయండి.",
dose:"మోతాదు", org:"సేంద్రీయ ప్రత్యామ్నాయం", flag:"నిపుణుల సమీక్షకు పంపండి", flagged:"నిపుణుల సమీక్షకు పంపబడింది.",
chat_ph:"మోతాదు, సేంద్రీయ ఎంపిక, వాతావరణం అడగండి…", send:"పంపండి", greet:"మోతాదు, సేంద్రీయ ఎంపిక, చర్యలు లేదా వాతావరణ ప్రమాదం గురించి అడగండి.", fb:"నేను చర్యలు, మోతాదు, సేంద్రీయ ఎంపికలు, వాతావరణ ప్రమాదం చెప్పగలను.", healthy_msg:"వ్యాధి కనబడలేదు. వర్షం తర్వాత గమనిస్తూ ఉండండి.",
disc:"ప్రోటోటైప్ డెమో: మందు కొట్టే ముందు లేబుల్ చదవండి, విస్తరణ అధికారితో నిర్ధారించుకోండి.", foot:"కృషి వైద్య · SIH26131 · ప్రోటోటైప్",
dash_t:"అధికారుల డాష్‌బోర్డ్", back:"రైతు సైట్", d_total:"నివేదికలు", d_pending:"సమీక్ష పెండింగ్", d_types:"సమస్య రకాలు", d_map:"హాట్‌స్పాట్ మ్యాప్", d_by:"వ్యాధి వారీగా", d_recent:"ఇటీవలి నివేదికలు", none_yet:"ఇంకా నివేదికలు లేవు. ముందు ఫోటో పరీక్షించండి."}
};

Object.assign(UI.en, {btn_again:"Diagnose another leaf", need_diag:"Diagnose a leaf first.", mic_unsupported:"Voice input needs Chrome or Edge.", mic_denied:"Microphone is blocked. Click the lock icon in the address bar and allow the microphone.", mic_net:"Voice input needs an internet connection. Try Chrome.", mic_nospeech:"I did not hear anything. Tap the mic and speak again.", mic_lang:"This language is not supported for voice input on this browser.", mic_none:"No microphone found."});
Object.assign(UI.hi, {btn_again:"दूसरे पत्ते की जाँच करें", need_diag:"पहले पत्ते की जाँच करें।", mic_unsupported:"आवाज़ के लिए Chrome या Edge चाहिए।", mic_denied:"माइक्रोफ़ोन बंद है। एड्रेस बार में लॉक आइकन पर क्लिक करके माइक्रोफ़ोन की अनुमति दें।", mic_net:"आवाज़ के लिए इंटरनेट चाहिए। Chrome आज़माएँ।", mic_nospeech:"कुछ सुनाई नहीं दिया। माइक दबाकर फिर बोलें।", mic_lang:"इस ब्राउज़र में इस भाषा में आवाज़ समर्थित नहीं है।", mic_none:"माइक्रोफ़ोन नहीं मिला।"});
Object.assign(UI.te, {btn_again:"మరో ఆకును పరీక్షించండి", need_diag:"ముందు ఆకును పరీక్షించండి.", mic_unsupported:"వాయిస్ కోసం Chrome లేదా Edge కావాలి.", mic_denied:"మైక్రోఫోన్ బ్లాక్ చేయబడింది. అడ్రస్ బార్‌లో లాక్ ఐకాన్ నొక్కి మైక్రోఫోన్‌కు అనుమతి ఇవ్వండి.", mic_net:"వాయిస్ కోసం ఇంటర్నెట్ కావాలి. Chrome ప్రయత్నించండి.", mic_nospeech:"ఏమీ వినబడలేదు. మైక్ నొక్కి మళ్లీ మాట్లాడండి.", mic_lang:"ఈ బ్రౌజర్‌లో ఈ భాషకు వాయిస్ మద్దతు లేదు.", mic_none:"మైక్రోఫోన్ కనబడలేదు."});

const NAMES = {
tomato_early_blight:{en:"Tomato — Early Blight",hi:"टमाटर — अगेती झुलसा",te:"టమాటా — ఎర్లీ బ్లైట్"},
tomato_late_blight:{en:"Tomato — Late Blight",hi:"टमाटर — पछेती झुलसा",te:"టమాటా — లేట్ బ్లైట్"},
potato_late_blight:{en:"Potato — Late Blight",hi:"आलू — पछेती झुलसा",te:"బంగాళాదుంప — లేట్ బ్లైట్"},
wheat_leaf_rust:{en:"Wheat — Leaf Rust",hi:"गेहूँ — पत्ती रतुआ",te:"గోధుమ — ఆకు తుప్పు"},
wheat_powdery_mildew:{en:"Wheat — Powdery Mildew",hi:"गेहूँ — चूर्णिल आसिता",te:"గోధుమ — బూడిద తెగులు"},
rice_blast:{en:"Rice — Blast",hi:"धान — झोंका रोग",te:"వరి — అగ్గి తెగులు"},
pest_aphid:{en:"Pest — Aphids / Whitefly",hi:"कीट — माहू / सफ़ेद मक्खी",te:"పురుగు — పేనుబంక / తెల్ల దోమ"},
tomato_bacterial_spot:{en:"Tomato — Bacterial Spot",hi:"टमाटर — जीवाणु धब्बा",te:"టమాటా — బ్యాక్టీరియల్ స్పాట్"},
tomato_septoria_leaf_spot:{en:"Tomato — Septoria Leaf Spot",hi:"टमाटर — सेप्टोरिया पत्ती धब्बा",te:"టమాటా — సెప్టోరియా ఆకు మచ్చ"},
potato_early_blight:{en:"Potato — Early Blight",hi:"आलू — अगेती झुलसा",te:"బంగాళాదుంప — ఎర్లీ బ్లైట్"},
wheat_yellow_rust:{en:"Wheat — Yellow/Stripe Rust",hi:"गेहूँ — पीला/धारीदार रतुआ",te:"గోధుమ — పసుపు/చార తుప్పు"},
rice_bacterial_leaf_blight:{en:"Rice — Bacterial Leaf Blight",hi:"धान — जीवाणु झुलसा",te:"వరి — బ్యాక్టీరియల్ ఆకు ఎండు తెగులు"},
rice_brown_spot:{en:"Rice — Brown Spot",hi:"धान — भूरा धब्बा",te:"వరి — బ్రౌన్ స్పాట్"},
maize_fall_armyworm:{en:"Maize — Fall Armyworm",hi:"मक्का — फॉल आर्मीवर्म",te:"మొక్కజొన్న — ఫాల్ ఆర్మీవార్మ్"},
maize_northern_leaf_blight:{en:"Maize — Northern Leaf Blight",hi:"मक्का — उत्तरी पत्ती झुलसा",te:"మొక్కజొన్న — నార్తర్న్ లీఫ్ బ్లైట్"},
chilli_leaf_curl:{en:"Chilli — Leaf Curl",hi:"मिर्च — लीफ कर्ल",te:"మిరప — లీఫ్ కర్ల్"},
chilli_anthracnose:{en:"Chilli — Anthracnose",hi:"मिर्च — एन्थ्रेक्नोज",te:"మిరప — ఆంత్రాక్నోస్"},
mango_powdery_mildew:{en:"Mango — Powdery Mildew",hi:"आम — चूर्णिल आसिता",te:"మామిడి — బూడిద తెగులు"},
mango_anthracnose:{en:"Mango — Anthracnose",hi:"आम — एन्थ्रेक्नोज",te:"మామిడి — ఆంత్రాక్నోస్"},
groundnut_leaf_spot:{en:"Groundnut — Tikka / Leaf Spot",hi:"मूंगफली — टिक्का / पत्ती धब्बा",te:"వేరుశెనగ — టిక్కా / ఆకు మచ్చ"},
onion_purple_blotch:{en:"Onion — Purple Blotch",hi:"प्याज — बैंगनी धब्बा",te:"ఉల్లి — పర్పుల్ బ్లాచ్"},
healthy:{en:"Healthy — no disease found",hi:"स्वस्थ — कोई रोग नहीं",te:"ఆరోగ్యంగా ఉంది — వ్యాధి లేదు"}
};

const ADVMAP = {tomato_early_blight:"A1", tomato_late_blight:"A2", potato_late_blight:"A2", wheat_leaf_rust:"A3", wheat_powdery_mildew:"A4", rice_blast:"A5", pest_aphid:"A6", tomato_bacterial_spot:"A7", tomato_septoria_leaf_spot:"A8", potato_early_blight:"A9", wheat_yellow_rust:"A10", rice_bacterial_leaf_blight:"A11", rice_brown_spot:"A12", maize_fall_armyworm:"A13", maize_northern_leaf_blight:"A14", chilli_leaf_curl:"A15", chilli_anthracnose:"A16", mango_powdery_mildew:"A17", mango_anthracnose:"A18", groundnut_leaf_spot:"A19", onion_purple_blotch:"A20"};
const ADV = {
A1:{en:{s:["Remove and destroy affected lower leaves","Spray mancozeb every 7–10 days; water at the base"],d:"Mancozeb 75% WP, 2.5 g per litre",o:"Neem oil 2% spray"},
 hi:{s:["प्रभावित निचले पत्ते तोड़कर नष्ट करें","हर 7–10 दिन में मैन्कोज़ेब छिड़कें; जड़ के पास पानी दें"],d:"मैन्कोज़ेब 75% WP, 2.5 ग्राम प्रति लीटर",o:"नीम तेल 2% का छिड़काव"},
 te:{s:["ప్రభావిత కింది ఆకులను తీసి నాశనం చేయండి","7–10 రోజులకు ఒకసారి మాంకోజెబ్ పిచికారీ చేయండి; మొక్క మొదట్లో నీరు పెట్టండి"],d:"మాంకోజెబ్ 75% WP, లీటరుకు 2.5 గ్రా",o:"వేప నూనె 2% పిచికారీ"}},
A2:{en:{s:["Isolate affected plants; improve drainage and spacing","Spray copper oxychloride within 24–48 hours"],d:"Copper oxychloride 50% WP, 3 g per litre",o:"Bordeaux mixture"},
 hi:{s:["प्रभावित पौधे अलग करें; जल-निकास और दूरी सुधारें","24–48 घंटे में कॉपर ऑक्सीक्लोराइड छिड़कें"],d:"कॉपर ऑक्सीक्लोराइड 50% WP, 3 ग्राम प्रति लीटर",o:"बोर्डो मिश्रण"},
 te:{s:["ప్రభావిత మొక్కలను వేరు చేయండి; నీరు పోయే సౌకర్యం, మొక్కల మధ్య దూరం మెరుగుపరచండి","24–48 గంటల్లో కాపర్ ఆక్సీక్లోరైడ్ పిచికారీ చేయండి"],d:"కాపర్ ఆక్సీక్లోరైడ్ 50% WP, లీటరుకు 3 గ్రా",o:"బోర్డో మిశ్రమం"}},
A3:{en:{s:["Spray propiconazole at first sign","Check nearby fields; avoid excess nitrogen"],d:"Propiconazole 25% EC, 1 ml per litre",o:"Sulphur dust in early stage"},
 hi:{s:["पहले लक्षण पर प्रोपिकोनाज़ोल छिड़कें","आसपास के खेत जाँचें; ज़्यादा नाइट्रोजन न दें"],d:"प्रोपिकोनाज़ोल 25% EC, 1 मिली प्रति लीटर",o:"शुरुआती अवस्था में गंधक चूर्ण"},
 te:{s:["మొదటి లక్షణం కనబడగానే ప్రొపికోనజోల్ పిచికారీ చేయండి","పక్క పొలాలు చూడండి; ఎక్కువ నత్రజని వేయవద్దు"],d:"ప్రొపికోనజోల్ 25% EC, లీటరుకు 1 మి.లీ",o:"ప్రారంభ దశలో గంధకం పొడి"}},
A4:{en:{s:["Spray wettable sulphur or hexaconazole","Improve air flow; avoid dense sowing"],d:"Wettable sulphur 80% WP, 2.5 g per litre",o:"Diluted buttermilk spray"},
 hi:{s:["घुलनशील गंधक या हेक्साकोनाज़ोल छिड़कें","हवा का प्रवाह बढ़ाएँ; घनी बुवाई न करें"],d:"घुलनशील गंधक 80% WP, 2.5 ग्राम प्रति लीटर",o:"पतली छाछ का छिड़काव"},
 te:{s:["నీటిలో కరిగే గంధకం లేదా హెక్సాకోనజోల్ పిచికారీ చేయండి","గాలి ఆడేలా చూడండి; దగ్గర దగ్గరగా విత్తవద్దు"],d:"కరిగే గంధకం 80% WP, లీటరుకు 2.5 గ్రా",o:"పలుచని మజ్జిగ పిచికారీ"}},
A5:{en:{s:["Drain standing water briefly; split nitrogen doses","Spray tricyclazole when lesions appear"],d:"Tricyclazole 75% WP, 0.6 g per litre",o:"Pseudomonas fluorescens spray"},
 hi:{s:["खड़ा पानी कुछ समय के लिए निकालें; नाइट्रोजन बाँटकर दें","धब्बे दिखते ही ट्राइसाइक्लाज़ोल छिड़कें"],d:"ट्राइसाइक्लाज़ोल 75% WP, 0.6 ग्राम प्रति लीटर",o:"स्यूडोमोनास फ्लोरेसेंस का छिड़काव"},
 te:{s:["నిలిచిన నీటిని కొంతసేపు తీసివేయండి; నత్రజనిని విడతలుగా వేయండి","మచ్చలు కనబడగానే ట్రైసైక్లజోల్ పిచికారీ చేయండి"],d:"ట్రైసైక్లజోల్ 75% WP, లీటరుకు 0.6 గ్రా",o:"సూడోమోనాస్ ఫ్లోరోసెన్స్ పిచికారీ"}},
A6:{en:{s:["Spray neem oil; use yellow sticky traps","If severe, spray imidacloprid as per label"],d:"Neem oil, 5 ml per litre",o:"Yellow sticky traps"},
 hi:{s:["नीम तेल छिड़कें; पीले चिपचिपे ट्रैप लगाएँ","ज़्यादा हो तो लेबल के अनुसार इमिडाक्लोप्रिड छिड़कें"],d:"नीम तेल, 5 मिली प्रति लीटर",o:"पीले चिपचिपे ट्रैप"},
 te:{s:["వేప నూనె పిచికారీ చేయండి; పసుపు జిగురు ఉచ్చులు పెట్టండి","ఎక్కువగా ఉంటే లేబుల్ ప్రకారం ఇమిడాక్లోప్రిడ్ పిచికారీ చేయండి"],d:"వేప నూనె, లీటరుకు 5 మి.లీ",o:"పసుపు జిగురు ఉచ్చులు"}},
A7:{en:{s:["Remove badly affected leaves and avoid handling wet foliage","Avoid overhead irrigation; use only locally registered bactericides after extension confirmation"],d:"No fixed dosage — follow the locally registered product label",o:"Sanitation and approved biological products"},hi:{s:["अधिक प्रभावित पत्तियाँ हटाएँ और गीली फसल न छुएँ","ऊपर से सिंचाई से बचें; रसायन केवल स्थानीय पंजीकृत लेबल/सलाह के अनुसार"],d:"निश्चित मात्रा नहीं — स्थानीय पंजीकृत लेबल का पालन करें",o:"सफाई और अनुमोदित जैविक उत्पाद"},te:{s:["తీవ్రంగా ప్రభావితమైన ఆకులను తొలగించండి; తడి ఆకులను తాకడం తగ్గించండి","పై నుంచి నీరు పోయవద్దు; రసాయనాలు స్థానిక లేబుల్/వ్యవసాయ సలహా ప్రకారం మాత్రమే"],d:"స్థిర మోతాదు లేదు — స్థానిక లేబుల్‌ను అనుసరించండి",o:"పరిశుభ్రత మరియు ఆమోదిత జీవ ఉత్పత్తులు"}},
A8:{en:{s:["Remove infected lower leaves and crop debris","Improve airflow and avoid overhead irrigation"],d:"No fixed dosage — use a locally registered fungicide only as labelled",o:"Sanitation and approved bio-fungicide options"},hi:{s:["संक्रमित निचली पत्तियाँ और अवशेष हटाएँ","हवा का प्रवाह बढ़ाएँ और ऊपर से सिंचाई से बचें"],d:"निश्चित मात्रा नहीं — लेबल के अनुसार स्थानीय पंजीकृत फफूंदनाशी",o:"सफाई और अनुमोदित जैव-फफूंदनाशी"},te:{s:["సోకిన కింది ఆకులు, అవశేషాలను తొలగించండి","గాలి ప్రసరణ మెరుగుపరచండి; పై నుంచి నీరు పోయవద్దు"],d:"స్థిర మోతాదు లేదు — స్థానిక లేబుల్ ప్రకారం ఫంగిసైడ్",o:"పరిశుభ్రత మరియు ఆమోదిత బయో-ఫంగిసైడ్"}},
A9:{en:{s:["Remove heavily affected foliage and manage crop residue","Maintain balanced nutrition and use a registered fungicide only when advised"],d:"No fixed dosage — follow local label and extension advice",o:"Field sanitation and approved bio-fungicide"},hi:{s:["बहुत प्रभावित पत्तियाँ हटाएँ और अवशेष प्रबंधन करें","संतुलित पोषण रखें; सलाह पर ही पंजीकृत फफूंदनाशी उपयोग करें"],d:"निश्चित मात्रा नहीं — स्थानीय लेबल/सलाह का पालन करें",o:"खेत की सफाई और अनुमोदित जैव-फफूंदनाशी"},te:{s:["తీవ్రంగా ప్రభావితమైన ఆకులను తొలగించి అవశేషాలను నిర్వహించండి","సమతుల్య పోషణ ఇవ్వండి; సలహా మేరకే పంజీకృత ఫంగిసైడ్ వాడండి"],d:"స్థిర మోతాదు లేదు — స్థానిక లేబుల్/సలహా",o:"పొలం పరిశుభ్రత మరియు ఆమోదిత బయో-ఫంగిసైడ్"}},
A10:{en:{s:["Scout nearby wheat fields for yellow stripe symptoms","Use a registered rust fungicide only when extension guidance indicates treatment"],d:"No fixed dosage — follow local label and extension advice",o:"Resistant varieties and clean seed"},hi:{s:["पास के गेहूँ खेतों में पीली धारियाँ देखें","सलाह मिलने पर ही पंजीकृत रतुआ-नाशी का उपयोग करें"],d:"निश्चित मात्रा नहीं — स्थानीय लेबल/सलाह",o:"प्रतिरोधी किस्म और स्वच्छ बीज"},te:{s:["పక్క గోధుమ పొలాల్లో పసుపు చారలను గమనించండి","వ్యవసాయ సలహా ఉన్నప్పుడు మాత్రమే పంజీకృత రస్ట్ ఫంగిసైడ్ వాడండి"],d:"స్థిర మోతాదు లేదు — స్థానిక లేబుల్/సలహా",o:"తట్టుకునే రకాలు మరియు శుభ్రమైన విత్తనం"}},
A11:{en:{s:["Avoid excess nitrogen and unnecessary leaf wetness","Seek extension confirmation before chemical control"],d:"No fixed dosage — confirm locally registered options",o:"Resistant varieties and approved biological measures"},hi:{s:["अधिक नाइट्रोजन और अनावश्यक पत्तियों की नमी से बचें","रासायनिक नियंत्रण से पहले विस्तार अधिकारी से पुष्टि करें"],d:"निश्चित मात्रा नहीं — स्थानीय पंजीकृत विकल्प की पुष्टि करें",o:"प्रतिरोधी किस्में और अनुमोदित जैविक उपाय"},te:{s:["అధిక నత్రజని, అనవసర ఆకుల తడిని తగ్గించండి","రసాయన నియంత్రణకు ముందు వ్యవసాయ అధికారిని సంప్రదించండి"],d:"స్థిర మోతాదు లేదు — స్థానికంగా పంజీకృత ఎంపికను నిర్ధారించండి",o:"తట్టుకునే రకాలు మరియు ఆమోదిత జీవ పద్ధతులు"}},
A12:{en:{s:["Maintain balanced nutrition, especially potassium","Manage crop residue and use a registered fungicide only when advised"],d:"No fixed dosage — follow local label and extension advice",o:"Approved bio-fungicide and sanitation"},hi:{s:["संतुलित पोषण रखें, खासकर पोटाश","अवशेष प्रबंधन करें; सलाह पर ही पंजीकृत फफूंदनाशी उपयोग करें"],d:"निश्चित मात्रा नहीं — स्थानीय लेबल/सलाह",o:"अनुमोदित जैव-फफूंदनाशी और सफाई"},te:{s:["సమతుల్య పోషణ, ముఖ్యంగా పొటాషియం ఇవ్వండి","అవశేషాలను నిర్వహించండి; సలహా మేరకే పంజీకృత ఫంగిసైడ్ వాడండి"],d:"స్థిర మోతాదు లేదు — స్థానిక లేబుల్/సలహా",o:"ఆమోదిత బయో-ఫంగిసైడ్ మరియు పరిశుభ్రత"}},
A13:{en:{s:["Inspect maize whorls for larvae and fresh feeding damage","Use pheromone monitoring and locally registered control options when treatment is justified"],d:"No fixed dosage — follow the registered product label",o:"Pheromone monitoring and approved biological controls"},hi:{s:["मक्का के भोंगे में लार्वा और ताजा नुकसान देखें","फेरोमोन निगरानी करें; जरूरत पर पंजीकृत नियंत्रण विकल्प लें"],d:"निश्चित मात्रा नहीं — पंजीकृत उत्पाद का लेबल देखें",o:"फेरोमोन निगरानी और अनुमोदित जैविक नियंत्रण"},te:{s:["మొక్కజొన్న మొగ్గల్లో పురుగుల లార్వా, తాజా నష్టాన్ని గమనించండి","ఫెరోమోన్ పర్యవేక్షణ చేయండి; అవసరమైతే పంజీకృత నియంత్రణ ఎంపికలు వాడండి"],d:"స్థిర మోతాదు లేదు — పంజీకృత ఉత్పత్తి లేబుల్‌ను అనుసరించండి",o:"ఫెరోమోన్ పర్యవేక్షణ మరియు ఆమోదిత జీవ నియంత్రణ"}},
A14:{en:{s:["Manage infected crop residue and scout after humid weather","Use resistant hybrids and a registered fungicide when advised"],d:"No fixed dosage — follow local label and extension advice",o:"Resistant hybrids and residue management"},hi:{s:["संक्रमित अवशेषों का प्रबंधन करें और नमी वाले मौसम के बाद निगरानी करें","सलाह पर प्रतिरोधी संकर और पंजीकृत फफूंदनाशी उपयोग करें"],d:"निश्चित मात्रा नहीं — स्थानीय लेबल/सलाह",o:"प्रतिरोधी संकर और अवशेष प्रबंधन"},te:{s:["సోకిన అవశేషాలను నిర్వహించి తేమ ఉన్న వాతావరణం తర్వాత గమనించండి","సలహా మేరకు తట్టుకునే హైబ్రిడ్, పంజీకృత ఫంగిసైడ్ వాడండి"],d:"స్థిర మోతాదు లేదు — స్థానిక లేబుల్/సలహా",o:"తట్టుకునే హైబ్రిడ్లు మరియు అవశేష నిర్వహణ"}},
A15:{en:{s:["Check the underside of chilli leaves for whiteflies","Remove severely affected plants and use yellow sticky traps"],d:"No fixed dosage — confirm any chemical option locally",o:"Yellow sticky traps and approved biological controls"},hi:{s:["मिर्च की पत्तियों के नीचे सफेद मक्खी देखें","बहुत प्रभावित पौधे हटाएँ और पीले चिपचिपे ट्रैप लगाएँ"],d:"निश्चित मात्रा नहीं — रासायनिक विकल्प की स्थानीय पुष्टि करें",o:"पीले चिपचिपे ट्रैप और अनुमोदित जैविक नियंत्रण"},te:{s:["మిరప ఆకుల కింద తెల్ల దోమను చూడండి","తీవ్రంగా ప్రభావితమైన మొక్కలను తొలగించి పసుపు జిగురు ఉచ్చులు పెట్టండి"],d:"స్థిర మోతాదు లేదు — రసాయన ఎంపికను స్థానికంగా నిర్ధారించండి",o:"పసుపు జిగురు ఉచ్చులు, ఆమోదిత జీవ నియంత్రణ"}},
A16:{en:{s:["Remove affected fruits and plant debris","Avoid overhead irrigation and improve field ventilation"],d:"No fixed dosage — use a locally registered fungicide as labelled",o:"Sanitation and approved bio-fungicide"},hi:{s:["प्रभावित फल और पौध अवशेष हटाएँ","ऊपर से सिंचाई से बचें और खेत में हवा का प्रवाह बढ़ाएँ"],d:"निश्चित मात्रा नहीं — स्थानीय पंजीकृत फफूंदनाशी लेबल अनुसार",o:"सफाई और अनुमोदित जैव-फफूंदनाशी"},te:{s:["ప్రభావిత కాయలు, మొక్క అవశేషాలను తొలగించండి","పై నుంచి నీరు పోయవద్దు; గాలి ప్రసరణ మెరుగుపరచండి"],d:"స్థిర మోతాదు లేదు — స్థానిక పంజీకృత ఫంగిసైడ్ లేబుల్ ప్రకారం",o:"పరిశుభ్రత మరియు ఆమోదిత బయో-ఫంగిసైడ్"}},
A17:{en:{s:["Improve mango canopy airflow through appropriate pruning","Scout flowers and young shoots during cool humid weather"],d:"No fixed dosage — use a locally registered fungicide as labelled",o:"Canopy sanitation and approved biological options"},hi:{s:["उचित छंटाई से आम के पेड़ में हवा का प्रवाह बढ़ाएँ","ठंडे नम मौसम में फूलों और नई टहनियों की निगरानी करें"],d:"निश्चित मात्रा नहीं — स्थानीय पंजीकृत फफूंदनाशी लेबल अनुसार",o:"कैनोपी सफाई और अनुमोदित जैविक विकल्प"},te:{s:["సరైన కొమ్మల కత్తిరింపుతో గాలి ప్రసరణ పెంచండి","చల్లని తేమ వాతావరణంలో పువ్వులు, కొత్త కొమ్మలను గమనించండి"],d:"స్థిర మోతాదు లేదు — స్థానిక పంజీకృత ఫంగిసైడ్ లేబుల్ ప్రకారం",o:"కేనపీ పరిశుభ్రత మరియు ఆమోదిత జీవ ఎంపికలు"}},
A18:{en:{s:["Remove infected plant material and fallen fruit","Improve canopy airflow and reduce prolonged wetness"],d:"No fixed dosage — use a locally registered fungicide as labelled",o:"Sanitation and approved bio-fungicide"},hi:{s:["संक्रमित भाग और गिरे फल हटाएँ","कैनोपी में हवा बढ़ाएँ और लंबे समय की नमी घटाएँ"],d:"निश्चित मात्रा नहीं — स्थानीय पंजीकृत फफूंदनाशी लेबल अनुसार",o:"सफाई और अनुमोदित जैव-फफूंदनाशी"},te:{s:["సోకిన భాగాలు, పడిపోయిన పండ్లను తొలగించండి","కేనపీ గాలి ప్రసరణ పెంచి ఎక్కువసేపు తడిని తగ్గించండి"],d:"స్థిర మోతాదు లేదు — స్థానిక పంజీకృత ఫంగిసైడ్ లేబుల్ ప్రకారం",o:"పరిశుభ్రత మరియు ఆమోదిత బయో-ఫంగిసైడ్"}},
A19:{en:{s:["Scout lower groundnut leaves for expanding spots","Maintain balanced nutrition and manage crop residue"],d:"No fixed dosage — follow local label and extension advice",o:"Crop rotation, resistant varieties and approved biological products"},hi:{s:["मूंगफली की निचली पत्तियों में बढ़ते धब्बे देखें","संतुलित पोषण रखें और अवशेष प्रबंधन करें"],d:"निश्चित मात्रा नहीं — स्थानीय लेबल/सलाह",o:"फसल चक्र, प्रतिरोधी किस्में और अनुमोदित जैविक उत्पाद"},te:{s:["వేరుశెనగ కింది ఆకుల్లో పెరుగుతున్న మచ్చలను గమనించండి","సమతుల్య పోషణ, అవశేష నిర్వహణ పాటించండి"],d:"స్థిర మోతాదు లేదు — స్థానిక లేబుల్/సలహా",o:"పంట మార్పిడి, తట్టుకునే రకాలు, ఆమోదిత జీవ ఉత్పత్తులు"}},
A20:{en:{s:["Remove badly infected onion leaves and crop debris","Avoid overhead irrigation and improve field ventilation"],d:"No fixed dosage — use a locally registered fungicide as labelled",o:"Sanitation and approved bio-fungicide"},hi:{s:["बहुत संक्रमित प्याज की पत्तियाँ और अवशेष हटाएँ","ऊपर से सिंचाई से बचें और खेत में हवा बढ़ाएँ"],d:"निश्चित मात्रा नहीं — स्थानीय पंजीकृत फफूंदनाशी लेबल अनुसार",o:"सफाई और अनुमोदित जैव-फफूंदनाशी"},te:{s:["తీవ్రంగా సోకిన ఉల్లి ఆకులు, అవశేషాలను తొలగించండి","పై నుంచి నీరు పోయవద్దు; గాలి ప్రసరణ మెరుగుపరచండి"],d:"స్థిర మోతాదు లేదు — స్థానిక పంజీకృత ఫంగిసైడ్ లేబుల్ ప్రకారం",o:"పరిశుభ్రత మరియు ఆమోదిత బయో-ఫంగిసైడ్"}}
};

let LANG = localStorage.getItem('kv_lang') || 'en';
const t = (k, v) => { let s = (UI[LANG] && UI[LANG][k]) || UI.en[k] || k; for (const x in (v || {})) s = s.replace('{' + x + '}', v[x]); return s; };
const diseaseName = id => (NAMES[id] || {})[LANG] || id;
const advice = id => (ADV[ADVMAP[id]] || {})[LANG];

function applyI18n() {
  document.documentElement.lang = LANG;
  document.querySelectorAll('[data-i18n]').forEach(e => e.textContent = t(e.dataset.i18n));
  document.querySelectorAll('[data-i18n-ph]').forEach(e => e.placeholder = t(e.dataset.i18nPh));
  document.querySelectorAll('.lang-btn').forEach(b => b.classList.toggle('active', b.dataset.lang === LANG));
  const st = t('st').split(',');
  document.querySelectorAll('#pipeline li').forEach((li, i) => li.textContent = st[i]);
}
function setLang(l) { LANG = l; localStorage.setItem('kv_lang', l); applyI18n(); if (window.onLangChange) window.onLangChange(); }
document.addEventListener('click', e => { const b = e.target.closest('.lang-btn'); if (b) setLang(b.dataset.lang); });
