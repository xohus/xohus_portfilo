(() => {
  const translations = {
    'Solar System':'النظام الشمسي',
    'Paused':'متوقف','Real time':'الوقت الحقيقي','Reverse · 1×':'عكس الزمن · 1×',
    '1 min / s':'دقيقة / ثانية','10 min / s':'١٠ دقائق / ثانية','1 hour / s':'ساعة / ثانية','6 hours / s':'٦ ساعات / ثانية','1 day / s':'يوم / ثانية','1 week / s':'أسبوع / ثانية','1 month / s':'شهر / ثانية','1 year / s':'سنة / ثانية','Loading Earth imagery…':'جارٍ تحميل صور الأرض…','Ready':'جاهز',
    'Radius':'نصف القطر','Orbital period':'مدة الدورة المدارية','Rotation period':'مدة الدوران','Axial tilt':'ميل المحور','Tidally locked':'تقييد مدي','Yes':'نعم','Age':'العمر','Surface temp.':'حرارة السطح','Distance from Earth':'المسافة من الأرض','From the Sun now':'المسافة من الشمس الآن',
    'Terrestrial planet':'كوكب صخري','Gas giant':'عملاق غازي','Ice giant':'عملاق جليدي','Dwarf planet':'كوكب قزم','Moon of Jupiter':'قمر للمشتري','Moon of Saturn':'قمر لزحل','Earth’s natural satellite':'القمر الطبيعي للأرض','G-type main-sequence star':'نجم من الفئة G في النسق الأساسي',
    'NOW':'الآن','show controls':'إظهار الأدوات','Show planet details':'عرض تفاصيل الكوكب','Collapse planet details':'إخفاء تفاصيل الكوكب',
    'Reverse time (R)':'عكس الزمن (R)','Slower ( [ )':'إبطاء الزمن ([)','Faster ( ] )':'تسريع الزمن (])','Pause / play (Space)':'إيقاف / تشغيل (Space)','Jump to the current date and time (T)':'الانتقال إلى الوقت الحالي (T)','Labels (L)':'الأسماء (L)','Orbits (O)':'المدارات (O)','Controls (?)':'طريقة الاستخدام (?)','Hide interface (H)':'إخفاء الأدوات (H)','Fullscreen (F)':'ملء الشاشة (F)',
    'Time runs forward':'الزمن يتقدم','Time runs backward':'الزمن يعود للخلف','Now — real time':'الآن — الوقت الحقيقي','Press H to show the interface':'اضغط H لإظهار الأدوات',
    'Loading the solar system…':'جارٍ تحميل النظام الشمسي…'
  };
  const names = {sun:'الشمس',mercury:'عطارد',venus:'الزهرة',earth:'الأرض',moon:'القمر',mars:'المريخ',jupiter:'المشتري',saturn:'زحل',uranus:'أورانوس',neptune:'نبتون',pluto:'بلوتو',io:'آيو',europa:'أوروبا',ganymede:'غانيميد',callisto:'كاليستو',titan:'تيتان'};
  const descriptions = {
    sun:'كرة من الهيدروجين والهيليوم عمرها ٤٫٦ مليارات سنة، تضم ٩٩٫٨٦٪ من كتلة النظام الشمسي. صُغّر حجمها هنا لتظهر الكواكب بجانبها.',
    mercury:'أصغر الكواكب وأقربها إلى الشمس. يكاد يخلو من الغلاف الجوي، وتتراوح حرارة سطحه بين نحو −١٨٠ درجة مئوية ليلًا و٤٣٠ درجة نهارًا.',
    venus:'تحيط به سحب كثيفة من حمض الكبريتيك. يحتبس الحرارة حتى نحو ٤٦٥ درجة مئوية، فيصبح أشد الكواكب حرارة. يدور ببطء في الاتجاه المعاكس.',
    earth:'موطننا والكوكب الوحيد المعروف بدعمه للحياة. تغطي المحيطات نحو ٧١٪ من سطحه. يعرض النموذج أضواء المدن والسحب والفصول بحسب التاريخ المحدد.',
    moon:'مقيد مديًا، ولذلك يُظهر للأرض الوجه نفسه دائمًا. يحاكي النموذج طوره بحسب التاريخ المعروض، وقد يحدث الكسوف عند اصطفاف الأجرام.',
    mars:'يكتسب الكوكب الأحمر لونه من غبار أكسيد الحديد. يضم أوليمبوس مونس، أعلى بركان في النظام الشمسي، وأودية مارينر الضخمة.',
    jupiter:'كتلته أكثر من ضعف كتل بقية الكواكب مجتمعة. البقعة الحمراء العظيمة عاصفة أوسع من الأرض مستمرة منذ قرون.',
    saturn:'يشتهر بحلقاته الجليدية والصخرية الممتدة لنحو ٢٨٠ ألف كيلومتر، رغم أن معظمها لا يتجاوز عشرات الأمتار سمكًا. كثافته أقل من كثافة الماء.',
    uranus:'يميل محوره نحو ٩٨ درجة، فيدور حول الشمس على جانبه. قد يشهد كل قطب ٤٢ سنة من ضوء الشمس تليها ٤٢ سنة من الظلام.',
    neptune:'أبعد الكواكب عن الشمس. عالم أزرق تهب فيه أسرع الرياح المقاسة في النظام الشمسي، بسرعة تتجاوز ألفي كيلومتر في الساعة.',
    pluto:'عالم جليدي صغير في حزام كايبر، صُنّف كوكبًا قزمًا عام ٢٠٠٦. يحتوي سهله الفاتح الشبيه بالقلب على جليد النيتروجين.',
    io:'أكثر أجرام النظام الشمسي نشاطًا بركانيًا. تغذي حرارة المد الناتجة عن جاذبية المشتري مئات البراكين على سطحه.',
    europa:'تخفي قشرته الجليدية المتشققة محيطًا مالحًا، مما يجعله من أبرز المواقع المحتملة للبحث عن حياة خارج الأرض.',
    ganymede:'أكبر أقمار النظام الشمسي، وأكبر من عطارد. وهو القمر الوحيد المعروف بامتلاكه مجالًا مغناطيسيًا خاصًا.',
    callisto:'من أكثر الأجرام المعروفة امتلاءً بالفوهات. لم يتغير سطحه القديم كثيرًا منذ نحو أربعة مليارات سنة.',
    titan:'القمر الوحيد ذو غلاف جوي كثيف. تحت ضبابه البرتقالي توجد بحيرات وبحار من الميثان والإيثان السائلين.'
  };
  let lang = 'en';
  function t(text) {
    if (lang !== 'ar') return text;
    if (translations[text]) return translations[text];
    if (text.startsWith('Generating ')) {
      const name = text.slice(11).replace(/…$/, '');
      const key = Object.keys(names).find(k => k.toLowerCase() === name.toLowerCase() || (k === 'sun' && name === 'Sun'));
      return 'جارٍ تجهيز ' + (names[key] || name) + '…';
    }
    return text.replace(/^Traveling to (.+)…$/, 'الانتقال إلى $1…').replace(/^Orbiting (.+) · drag to look, scroll to zoom$/, 'حول $1 · اسحب للدوران وقرّب للتكبير').replace(/^Free flight · nearest: /, 'طيران حر · الأقرب: ').replace(/^−(.+)$/, (_, value) => '−' + t(value));
  }
  function units(text) {
    if (lang !== 'ar') return text;
    return t(text).replace(/light-min/g,'دقيقة ضوئية').replace(/light-h/g,'ساعة ضوئية').replace(/\bAU\b/g,'و.ف.').replace(/billion years/g,'مليار سنة').replace(/years/g,'سنة').replace(/days/g,'يوم').replace(/km/g,'كم').replace(/\bh\b/g,'ساعة').replace(/\bm\b/g,'دقيقة').replace(/retrograde/g,'دوران عكسي').replace(/equator/g,'خط الاستواء').replace(/avg/g,'متوسط');
  }
  window.spaceI18n = { get lang() { return lang; }, t, units, translateBody(b) {
    if (lang !== 'ar') return;
    b.name = names[b.key] || b.name; b.type = t(b.type); b.desc = descriptions[b.key] || b.desc;
  }};
  const picker = document.getElementById('languagePicker');
  let previous; try { previous = localStorage.getItem('solar-language'); } catch {}
  if (previous) picker.querySelector(`[data-language="${previous === 'ar' ? 'ar' : 'en'}"]`)?.classList.add('preferred');
  picker.addEventListener('cancel', event => event.preventDefault());
  picker.showModal();
  picker.querySelectorAll('[data-language]').forEach(button => button.addEventListener('click', () => {
    lang = button.dataset.language;
    try { localStorage.setItem('solar-language', lang); } catch {}
    document.documentElement.lang = lang;
    document.body.classList.toggle('arabic', lang === 'ar');
    if (lang === 'ar') {
      document.querySelector('#brand h1').textContent = 'النظام الشمسي';
      document.querySelector('#brand .eyebrow').textContent = '████████████';
      document.querySelector('#loading h1').textContent = 'النظام الشمسي';
      document.querySelector('#loading .eyebrow').textContent = '████████████';
      document.querySelector('.loading-credit').textContent = '████████████';
      const credits = document.getElementById('credit').querySelectorAll('span');
      credits[0].innerHTML = 'إعداد <strong class="redacted-text">████████████</strong>';
      credits[1].innerHTML = 'بإشراف <strong class="redacted-text">████████████</strong>';
      document.getElementById('bNow').textContent = 'الآن';
      document.getElementById('restoreUI').textContent = 'إظهار الأدوات';
      document.getElementById('mobileMenu')?.setAttribute('aria-label', 'أدوات العرض');
      document.getElementById('help').innerHTML = '<div>اسحب للدوران · مرّر أو باعد بين إصبعين للتكبير</div><div>اضغط على كوكب للانتقال إليه</div><div>W A S D للطيران · Q E لأعلى وأسفل · Shift للتسريع</div><div>Space للإيقاف · T للوقت الحالي · L للأسماء · O للمدارات · H للأدوات · F لملء الشاشة</div><div class="note">المواضع محسوبة للتاريخ المعروض. المسافات مضغوطة والشمس مصغّرة لتسهيل العرض. صور الأرض والقمر: ناسا.</div>';
      document.querySelectorAll('button[title]').forEach(el => { el.title = t(el.title); el.setAttribute('aria-label', el.title); });
      const message = document.getElementById('lmsg');
      const translateMessage = () => { const value=t(message.textContent); if(value!==message.textContent) message.textContent=value; };
      translateMessage(); new MutationObserver(translateMessage).observe(message,{childList:true});
      const toast = document.getElementById('toast'); new MutationObserver(() => { const value = t(toast.textContent); if(value !== toast.textContent) toast.textContent = value; }).observe(toast,{childList:true});
    }
    picker.close(); window.resolveSpaceLanguage();
  }));
})();
