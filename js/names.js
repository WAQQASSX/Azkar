// ===================== Asma ul Husna =====================
document.addEventListener('DOMContentLoaded', () => {
  const hamburger = document.getElementById('hamburger');
  const navLinks  = document.getElementById('navLinks');
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => navLinks.classList.toggle('active'));
  }

  const names = [
    { num:1,  ar:'الله',       meaning:'اسم الجلالة' },
    { num:2,  ar:'الرحمن',    meaning:'ذو الرحمة الواسعة' },
    { num:3,  ar:'الرحيم',    meaning:'الرحيم بعباده المؤمنين' },
    { num:4,  ar:'الملك',     meaning:'مالك الملك' },
    { num:5,  ar:'القدوس',    meaning:'المنزّه عن كل نقص' },
    { num:6,  ar:'السلام',    meaning:'ذو السلامة من كل نقص' },
    { num:7,  ar:'المؤمن',    meaning:'الذي آمن عباده من عذابه' },
    { num:8,  ar:'المهيمن',   meaning:'الرقيب الحفيظ على كل شيء' },
    { num:9,  ar:'العزيز',    meaning:'الغالب الذي لا يُغلب' },
    { num:10, ar:'الجبار',    meaning:'الذي جبر المكسور' },
    { num:11, ar:'المتكبر',   meaning:'المتعالي عن صفات الخلق' },
    { num:12, ar:'الخالق',    meaning:'الذي خلق كل شيء' },
    { num:13, ar:'البارئ',    meaning:'المميّز بعضها عن بعض' },
    { num:14, ar:'المصور',    meaning:'واهب الصور لمخلوقاته' },
    { num:15, ar:'الغفار',    meaning:'كثير المغفرة' },
    { num:16, ar:'القهار',    meaning:'الغالب على كل شيء' },
    { num:17, ar:'الوهاب',    meaning:'كثير الهبات والعطايا' },
    { num:18, ar:'الرزاق',    meaning:'المعطي الأرزاق لعباده' },
    { num:19, ar:'الفتاح',    meaning:'فاتح أبواب الرزق والرحمة' },
    { num:20, ar:'العليم',    meaning:'المحيط علمه بكل شيء' },
    { num:21, ar:'القابض',    meaning:'القابض الأرواح والأرزاق' },
    { num:22, ar:'الباسط',    meaning:'الباسط الرزق لمن يشاء' },
    { num:23, ar:'الخافض',    meaning:'خافض الجبابرة والظالمين' },
    { num:24, ar:'الرافع',    meaning:'رافع درجات المؤمنين' },
    { num:25, ar:'المعز',     meaning:'معطي العزة لمن يشاء' },
    { num:26, ar:'المذل',     meaning:'المذل للكافرين والجبابرة' },
    { num:27, ar:'السميع',    meaning:'السامع لكل شيء' },
    { num:28, ar:'البصير',    meaning:'المبصر لكل شيء' },
    { num:29, ar:'الحكم',     meaning:'الحاكم العدل' },
    { num:30, ar:'العدل',     meaning:'العادل في أحكامه' },
    { num:31, ar:'اللطيف',    meaning:'اللطيف بعباده' },
    { num:32, ar:'الخبير',    meaning:'المطلع على خفايا الأمور' },
    { num:33, ar:'الحليم',    meaning:'الصبور على عصيان العباد' },
    { num:34, ar:'العظيم',    meaning:'الجامع لصفات العظمة' },
    { num:35, ar:'الغفور',    meaning:'الساتر لذنوب عباده' },
    { num:36, ar:'الشكور',    meaning:'المثني على أهل الطاعة' },
    { num:37, ar:'العلي',     meaning:'المتعالي فوق خلقه' },
    { num:38, ar:'الكبير',    meaning:'الكبير ذو الجلال' },
    { num:39, ar:'الحفيظ',    meaning:'الحافظ للأشياء' },
    { num:40, ar:'المقيت',    meaning:'موصل الأقوات إلى الخلق' },
    { num:41, ar:'الحسيب',    meaning:'الكافي لمن توكل عليه' },
    { num:42, ar:'الجليل',    meaning:'الجليل في ذاته وصفاته' },
    { num:43, ar:'الكريم',    meaning:'كثير الخير والعطاء' },
    { num:44, ar:'الرقيب',    meaning:'الشاهد على كل شيء' },
    { num:45, ar:'المجيب',    meaning:'مجيب دعوة من دعاه' },
    { num:46, ar:'الواسع',    meaning:'الواسع العلم والقدرة' },
    { num:47, ar:'الحكيم',    meaning:'الحكيم في أقواله وأفعاله' },
    { num:48, ar:'الودود',    meaning:'المحب لعباده المؤمنين' },
    { num:49, ar:'المجيد',    meaning:'ذو المجد والشرف' },
    { num:50, ar:'الباعث',    meaning:'باعث الخلق بعد الموت' },
    { num:51, ar:'الشهيد',    meaning:'الشاهد على أعمال العباد' },
    { num:52, ar:'الحق',      meaning:'الثابت الوجود' },
    { num:53, ar:'الوكيل',    meaning:'المتكفل بأمور عباده' },
    { num:54, ar:'القوي',     meaning:'ذو القوة التامة' },
    { num:55, ar:'المتين',    meaning:'الشديد القوة' },
    { num:56, ar:'الولي',     meaning:'ناصر المؤمنين' },
    { num:57, ar:'الحميد',    meaning:'المحمود في ذاته وصفاته' },
    { num:58, ar:'المحصي',    meaning:'المحصي لأعمال العباد' },
    { num:59, ar:'المبدئ',    meaning:'الذي أبدأ الخلق' },
    { num:60, ar:'المعيد',    meaning:'الذي يعيد الخلق بعد الفناء' },
    { num:61, ar:'المحيي',    meaning:'واهب الحياة' },
    { num:62, ar:'المميت',    meaning:'الذي يميت الأحياء' },
    { num:63, ar:'الحي',      meaning:'الدائم الحياة' },
    { num:64, ar:'القيوم',    meaning:'القائم على كل شيء' },
    { num:65, ar:'الواجد',    meaning:'الغني الذي لا يفتقر' },
    { num:66, ar:'الماجد',    meaning:'الواسع الكرم والشرف' },
    { num:67, ar:'الواحد',    meaning:'المنفرد بالألوهية' },
    { num:68, ar:'الأحد',     meaning:'المتوحد في ذاته' },
    { num:69, ar:'الصمد',     meaning:'السيد الذي تصمد إليه الخلائق' },
    { num:70, ar:'القادر',    meaning:'القادر على كل شيء' },
    { num:71, ar:'المقتدر',   meaning:'الشديد القدرة' },
    { num:72, ar:'المقدم',    meaning:'المقدم لما يشاء من خلقه' },
    { num:73, ar:'المؤخر',    meaning:'المؤخر لما يشاء من خلقه' },
    { num:74, ar:'الأول',     meaning:'الموجود قبل كل شيء' },
    { num:75, ar:'الآخر',     meaning:'الباقي بعد فناء الخلق' },
    { num:76, ar:'الظاهر',    meaning:'الغالب على كل شيء' },
    { num:77, ar:'الباطن',    meaning:'العالم بما أبطنه الخلق' },
    { num:78, ar:'الوالي',    meaning:'المتولي أمور خلقه' },
    { num:79, ar:'المتعالي',  meaning:'المرتفع فوق كل شيء' },
    { num:80, ar:'البر',      meaning:'اللطيف الكريم بعباده' },
    { num:81, ar:'التواب',    meaning:'القابل لتوبة عباده' },
    { num:82, ar:'المنتقم',   meaning:'المنتقم من الظالمين' },
    { num:83, ar:'العفو',     meaning:'كثير العفو والمسامحة' },
    { num:84, ar:'الرءوف',    meaning:'الرفيق بعباده' },
    { num:85, ar:'مالك الملك', meaning:'مالك المُلك وحده' },
    { num:86, ar:'ذو الجلال', meaning:'صاحب العظمة والكبرياء' },
    { num:87, ar:'المقسط',    meaning:'العادل في أقواله وأفعاله' },
    { num:88, ar:'الجامع',    meaning:'الجامع للخلق ليوم الحساب' },
    { num:89, ar:'الغني',     meaning:'الغني عن كل الخلق' },
    { num:90, ar:'المغني',    meaning:'المغني من يشاء من عباده' },
    { num:91, ar:'المانع',    meaning:'المانع ما يشاء' },
    { num:92, ar:'الضار',     meaning:'الضار لمن يستحق الضر' },
    { num:93, ar:'النافع',    meaning:'النافع لمن يستحق النفع' },
    { num:94, ar:'النور',     meaning:'نور السموات والأرض' },
    { num:95, ar:'الهادي',    meaning:'الهادي من يشاء من عباده' },
    { num:96, ar:'البديع',    meaning:'المبدع للأشياء بلا مثال' },
    { num:97, ar:'الباقي',    meaning:'الدائم الذي لا يفنى' },
    { num:98, ar:'الوارث',    meaning:'الوارث لكل شيء' },
    { num:99, ar:'الرشيد',    meaning:'الموصل لخلقه إلى مصالحهم' },
  ];

  const grid   = document.getElementById('namesGrid');
  const search = document.getElementById('namesSearch');

  function render(list) {
    grid.innerHTML = list.map(n => `
      <div class="name-card">
        <div class="name-number">${n.num}</div>
        <div class="name-arabic">${n.ar}</div>
        <div class="name-meaning">${n.meaning}</div>
      </div>`).join('');
  }

  render(names);

  search.addEventListener('input', () => {
    const q = search.value.trim();
    render(names.filter(n => n.ar.includes(q) || n.meaning.includes(q)));
  });
});
