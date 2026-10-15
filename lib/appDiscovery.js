export const APP_EDITIONS = [
  { key: 'app', path: '/app', ar: 'تطبيقات بيت الريف', en: 'Biet Al Reef apps' },
  { key: 'android', path: '/android', ar: 'تطبيق Android', en: 'Android app' },
  { key: 'web-app', path: '/web-app', ar: 'تطبيق المتصفح', en: 'Web app' },
  { key: 'ios', path: '/ios', ar: 'تطبيق iPhone وiPad', en: 'iPhone & iPad app' },
];

export const APP_DISCOVERY_COPY = {
  ar: {
    app: { title: 'بيت الريف على جهازك', description: 'اختر طريقة الوصول المناسبة: تطبيق Android أو تطبيق المتصفح. تعرّف أيضًا على حالة إصدار iPhone وiPad.', intro: 'ابدأ من المتصفح في المكتب، أو افتح تطبيق Android أثناء تنقلك. اختر الإصدار المناسب لجهازك من الخيارات التالية.', steps: ['اختر الإصدار المناسب لجهازك.', 'افتح التطبيق وسجّل الدخول عند الحاجة إلى حسابك.', 'استخدم حساب بيت الريف الحالي وواصل أعمالك.'] },
    android: { title: 'تطبيق بيت الريف لأجهزة Android', description: 'افتح صفحة بيت الريف الرسمية على Google Play، وتحقق من إمكانية تثبيته على جهاز Android الخاص بك.', intro: 'تابع حسابك ونشاطك من الهاتف أثناء التنقل أو وجودك في موقع العمل. استخدم صفحة Google Play الرسمية للحصول على الإصدار المتاح لجهازك وحسابك.', steps: ['افتح صفحة بيت الريف على Google Play.', 'راجع إتاحة التطبيق لجهازك وحسابك ثم ثبّته إذا كان متاحًا.', 'افتح التطبيق واستخدم حساب بيت الريف الحالي.'] },
    'web-app': { title: 'تطبيق بيت الريف من المتصفح', description: 'افتح تطبيق بيت الريف من الكمبيوتر أو الهاتف أو الجهاز اللوحي، واستخدم حسابك الحالي دون الحاجة إلى تنزيل تطبيق من المتجر.', intro: 'خيار مناسب للعمل من الكمبيوتر في المكتب، أو للوصول من هاتفك وجهازك اللوحي. افتح التطبيق من الرابط الرسمي، ثم سجّل الدخول عند الحاجة إلى إدارة حسابك.', steps: ['افتح تطبيق المتصفح من الزر أدناه.', 'سجّل الدخول إلى حسابك الحالي عند الحاجة.', 'للوصول الأسرع، استخدم خيار التثبيت أو الإضافة إلى الشاشة الرئيسية إذا أتاحه متصفحك.'] },
    ios: { title: 'بيت الريف لأجهزة iPhone وiPad', description: 'إصدار iOS غير متاح حاليًا. يمكنك استخدام تطبيق بيت الريف من المتصفح على iPhone أو iPad.', intro: 'لم يُطلق إصدار بيت الريف على App Store حتى الآن، ولا يوجد موعد إطلاق معلن. إلى حين إتاحته، استخدم تطبيق المتصفح من جهازك.', steps: ['افتح تطبيق المتصفح على iPhone أو iPad.', 'استخدم حساب بيت الريف الحالي.', 'إذا أتاح متصفحك الإضافة إلى الشاشة الرئيسية، يمكنك استخدامها للوصول الأسرع.'] },
    choose: 'اختر إصدارك', available: 'خيارات الوصول الحالية', future: 'غير متاح حاليًا', details: 'التفاصيل وطريقة الاستخدام', start: 'كيف أبدأ؟', play: 'افتح Google Play', web: 'افتح تطبيق المتصفح', market: 'تصفح السوق المفتوح', related: 'خيارات بيت الريف الأخرى', note: 'تصفح المنصة والسوق المفتوح لا يتطلب إنشاء حساب. إدارة الحساب والمراسلات تتم عبر التطبيق وفق صلاحيات الحساب.',
    cards: {
      android: ['Android', 'الوصول إلى حسابك وأعمالك من الهاتف. التثبيت حسب إتاحة Google Play لجهازك وحسابك.'],
      'web-app': ['تطبيق المتصفح', 'افتح حسابك من الكمبيوتر أو الهاتف أو التابلت، دون تنزيل من المتجر.'],
      ios: ['iPhone وiPad', 'إصدار iOS لم يُطلق بعد. تطبيق المتصفح هو خيار الوصول الحالي.'],
    },
  },
  en: {
    app: { title: 'Biet Al Reef on your device', description: 'Choose Android or the web app to access Biet Al Reef, and check the current status of the iPhone and iPad edition.', intro: 'Start in your desktop browser at the office or open the Android app on the move. Choose the option that suits your device below.', steps: ['Choose the edition for your device.', 'Open the app and sign in when you need your account.', 'Use your existing Biet Al Reef account to continue your work.'] },
    android: { title: 'Biet Al Reef for Android', description: 'Open the official Biet Al Reef listing on Google Play and check whether installation is available for your Android device.', intro: 'Access your account and business while travelling or working on site. Use the official Google Play listing to find the version available for your device and account.', steps: ['Open the Biet Al Reef listing on Google Play.', 'Check availability for your device and account, then install if available.', 'Open the app and use your existing Biet Al Reef account.'] },
    'web-app': { title: 'Biet Al Reef in your browser', description: 'Open Biet Al Reef on a computer, phone or tablet and use your existing account without downloading an app from a store.', intro: 'Work from your office computer or access your account from a phone or tablet. Open the official web app and sign in when you need to manage your account.', steps: ['Open the web app using the button below.', 'Sign in with your existing account when needed.', 'For quicker access, use the install or add-to-home-screen option if your browser offers it.'] },
    ios: { title: 'Biet Al Reef for iPhone and iPad', description: 'The iOS edition is not currently available. You can use the Biet Al Reef web app on your iPhone or iPad.', intro: 'Biet Al Reef has not launched on the App Store and no launch date has been announced. In the meantime, use the web app on your device.', steps: ['Open the web app on your iPhone or iPad.', 'Use your existing Biet Al Reef account.', 'If your browser offers an add-to-home-screen option, use it for quicker access.'] },
    choose: 'Choose your edition', available: 'Current access options', future: 'Not currently available', details: 'Details and how to use it', start: 'How do I start?', play: 'Open Google Play', web: 'Open the web app', market: 'Browse the open market', related: 'Other Biet Al Reef options', note: 'Browsing the platform and open market does not require an account. Account management and messaging take place in the app according to account permissions.',
    cards: {
      android: ['Android', 'Access your account and business from your phone. Installation depends on Google Play availability for your device and account.'],
      'web-app': ['Web app', 'Open your account on a computer, phone or tablet without a store download.'],
      ios: ['iPhone & iPad', 'The iOS app has not launched. Use the web app as the current access option.'],
    },
  },
};
