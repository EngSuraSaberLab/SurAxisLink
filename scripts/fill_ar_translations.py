from __future__ import annotations

import ast
from pathlib import Path


PO_PATH = Path("project/locale/ar/LC_MESSAGES/django.po")


TRANSLATIONS = {
    "404 - Page Not Found | SurAxis": "404 - الصفحة غير موجودة | SurAxis",
    "Page Not Found": "الصفحة غير موجودة",
    "This route does not exist in our current orbit.": "هذا المسار غير موجود في نطاقنا الحالي.",
    "Requested path:": "المسار المطلوب:",
    "Return Home": "العودة للرئيسية",
    "Contact SurAxis": "تواصل مع SurAxis",
    "Quick Navigation": "تنقل سريع",
    "Homepage": "الصفحة الرئيسية",
    "Go back to the main experience": "العودة إلى التجربة الرئيسية",
    "Services": "الخدمات",
    "Explore what SurAxis builds": "اكتشف ما تبنيه SurAxis",
    "About SurAxis": "عن SurAxis",
    "See how we approach solutions": "اطلع على منهجية بناء الحلول",
    "Contact": "تواصل",
    "Reach us for direct support": "تواصل معنا للحصول على دعم مباشر",
    "Page loading": "تحميل الصفحة",
    "Tailored digital solutions": "حلول رقمية مصممة خصيصًا",
    "Preparing your experience": "نجهز تجربتك الآن",
    "Loading services, visuals, and interface assets...": "جارٍ تحميل الخدمات والعناصر البصرية وواجهات الاستخدام...",
    "Cookies Policy | SurAxisTech": "سياسة ملفات تعريف الارتباط | SurAxisTech",
    "Legal": "قانوني",
    "Cookies Policy": "سياسة ملفات تعريف الارتباط",
    "Last updated: March 25, 2026": "آخر تحديث: 25 مارس 2026",
    "What Are Cookies": "ما هي ملفات تعريف الارتباط",
    "How We Use Cookies": "كيف نستخدم ملفات تعريف الارتباط",
    "Types of Cookies": "أنواع ملفات تعريف الارتباط",
    "Managing Cookies": "إدارة ملفات تعريف الارتباط",
    "Updates": "التحديثات",
    "Keep essential website functions working reliably": "الحفاظ على عمل وظائف الموقع الأساسية بشكل موثوق",
    "Measure traffic and understand how visitors use pages and forms": "قياس الزيارات وفهم كيفية استخدام الزوار للصفحات والنماذج",
    "Improve speed, usability, and overall website quality": "تحسين السرعة وسهولة الاستخدام وجودة الموقع بشكل عام",
    "Support security and anti-abuse measures": "دعم إجراءات الأمان ومكافحة إساءة الاستخدام",
    "Essential Cookies": "ملفات تعريف الارتباط الأساسية",
    "Required for core site functionality such as navigation, forms, and security features.": "مطلوبة لعمل وظائف الموقع الأساسية مثل التنقل والنماذج وميزات الأمان.",
    "Analytics Cookies": "ملفات تعريف ارتباط التحليلات",
    "Help us understand visitor behavior so we can improve content, performance, and user experience.": "تساعدنا على فهم سلوك الزوار حتى نتمكن من تحسين المحتوى والأداء وتجربة المستخدم.",
    "Preference Cookies": "ملفات تعريف ارتباط التفضيلات",
    "Remember selected settings to provide a more consistent experience across visits.": "تتذكر الإعدادات المختارة لتقديم تجربة أكثر اتساقًا عبر الزيارات.",
    "Most browsers let you delete stored cookies, block future cookies, or notify you before a cookie is set.": "تسمح لك معظم المتصفحات بحذف ملفات تعريف الارتباط المخزنة أو حظر المستقبلية أو تنبيهك قبل تعيين أي ملف.",
    "Privacy Policy | SurAxisTech": "سياسة الخصوصية | SurAxisTech",
    "Privacy Policy": "سياسة الخصوصية",
    "Introduction": "مقدمة",
    "Information We Collect": "المعلومات التي نجمعها",
    "How We Use Information": "كيف نستخدم المعلومات",
    "Data Protection": "حماية البيانات",
    "Third-Party Services": "خدمات الطرف الثالث",
    "User Rights": "حقوق المستخدم",
    "Contact Information": "معلومات التواصل",
    "When you submit our project inquiry form, we may collect:": "عند إرسال نموذج طلب المشروع، قد نجمع:",
    "Your full name": "اسمك الكامل",
    "Email address": "البريد الإلكتروني",
    "Phone or WhatsApp number": "رقم الهاتف أو واتساب",
    "Project details, goals, budget range, and timeline information": "تفاصيل المشروع والأهداف ونطاق الميزانية والمخطط الزمني",
    "We use your information to:": "نستخدم معلوماتك من أجل:",
    "Review and respond to project inquiries": "مراجعة طلبات المشاريع والرد عليها",
    "Contact you through email or WhatsApp when relevant to your request": "التواصل معك عبر البريد الإلكتروني أو واتساب عند ارتباط ذلك بطلبك",
    "Prepare suitable proposals and technical recommendations": "إعداد مقترحات مناسبة وتوصيات تقنية",
    "Improve website experience, service quality, and operational performance": "تحسين تجربة الموقع وجودة الخدمة وكفاءة التشغيل",
    "We do not sell your personal data. We only use it for legitimate business and communication purposes.": "لا نبيع بياناتك الشخصية. نستخدمها فقط لأغراض عمل وتواصل مشروعة.",
    "You may request to:": "يمكنك طلب:",
    "Access the personal data you shared with us": "الوصول إلى بياناتك الشخصية التي شاركتها معنا",
    "Correct inaccurate information": "تصحيح المعلومات غير الدقيقة",
    "Request deletion of your inquiry data where applicable": "طلب حذف بيانات طلبك عند انطباق ذلك",
    "Withdraw communication consent for future follow-up messages": "سحب موافقة التواصل للمتابعات المستقبلية",
    "Terms of Service | SurAxisTech": "شروط الخدمة | SurAxisTech",
    "Terms of Service": "شروط الخدمة",
    "Jump to:": "انتقال سريع:",
    "Services Description": "وصف الخدمات",
    "User Responsibilities": "مسؤوليات المستخدم",
    "Payments & Pricing": "المدفوعات والتسعير",
    "Limitation of Liability": "تحديد المسؤولية",
    "Intellectual Property": "الملكية الفكرية",
    "Termination": "إنهاء الخدمة",
    "Custom Pricing Model": "نموذج تسعير مخصص",
    "Every project is scoped individually to ensure fair cost and realistic implementation planning.": "يتم تحديد نطاق كل مشروع بشكل منفصل لضمان تكلفة عادلة وخطة تنفيذ واقعية.",
    "For legal or service-related questions, contact us through:": "للأسئلة القانونية أو المتعلقة بالخدمات، تواصل معنا عبر:",
    "Home - SurAxisTech": "الرئيسية - SurAxisTech",
    "How We Build Solutions at SurAxis?": "كيف نبني الحلول في SurAxis؟",
    "We Discover the Problem": "نكتشف المشكلة",
    "We Analyze Its Roots": "نحلل جذور المشكلة",
    "We Build the Right Solution": "نبني الحل المناسب",
    "Start Your Project": "ابدأ مشروعك",
    "Explore What We Do": "اكتشف ما نقدمه",
    "Why Choose SurAxis?": "لماذا تختار SurAxis؟",
    "Deep Problem Understanding": "فهم عميق للمشكلة",
    "Custom-Built Solutions": "حلول مخصصة بالكامل",
    "Ongoing Support & Follow-Up": "دعم ومتابعة مستمرة",
    "24/7 Technical Support": "دعم تقني 24/7",
    "Our Services": "خدماتنا",
    "Service": "خدمة",
    "Flip card to service summary": "اقلب البطاقة لعرض ملخص الخدمة",
    "View service summary": "عرض ملخص الخدمة",
    "Back to service front": "العودة لواجهة البطاقة",
    "Back": "رجوع",
    "Service Description:": "وصف الخدمة:",
    "Tailored solution designed to fit your exact business requirements with high reliability and scalability.": "حل مخصص مصمم ليلائم متطلبات عملك بدقة مع اعتمادية وقابلية توسع عالية.",
    "Estimated Price:": "السعر التقريبي:",
    "Custom Pricing": "تسعير مخصص",
    "Services will appear here soon.": "ستظهر الخدمات هنا قريبًا.",
    "Tell Us About Your Project": "أخبرنا عن مشروعك",
    "Fill out the form below and our team will review your request and get back to you with the right solution for your needs.": "املأ النموذج أدناه وسيقوم فريقنا بمراجعة طلبك والعودة إليك بالحل المناسب لاحتياجاتك.",
    "Project Information": "معلومات المشروع",
    "Complete the steps below so we can better understand your project.": "أكمل الخطوات التالية لنفهم مشروعك بشكل أفضل.",
    "Step": "الخطوة",
    "of": "من",
    "Contact Information": "معلومات التواصل",
    "Full Name": "الاسم الكامل",
    "Enter your full name": "أدخل اسمك الكامل",
    "Email Address": "البريد الإلكتروني",
    "Phone / WhatsApp": "الهاتف / واتساب",
    "+9647XXXXXXXX or 07XXXXXXXXX": "+9647XXXXXXXX أو 07XXXXXXXXX",
    "Company / Project Name": "اسم الشركة / المشروع",
    "Optional": "اختياري",
    "Service & Request Type": "الخدمة ونوع الطلب",
    "Service Needed": "الخدمة المطلوبة",
    "Select a service": "اختر خدمة",
    "Web Development": "تطوير مواقع الويب",
    "Custom System Development": "تطوير أنظمة مخصصة",
    "Digital Process Automation": "أتمتة العمليات الرقمية",
    "AI Integration": "دمج الذكاء الاصطناعي",
    "Odoo Customization & Development": "تخصيص وتطوير Odoo",
    "Payment Gateway Integration": "دمج بوابات الدفع",
    "Maintenance & Security": "الصيانة والأمان",
    "Other": "أخرى",
    "Project Type": "نوع المشروع",
    "New Project": "مشروع جديد",
    "Existing Project": "مشروع قائم",
    "Consultation Only": "استشارة فقط",
    "Do you already have an existing website or system?": "هل لديك موقع أو نظام قائم بالفعل؟",
    "Select one": "اختر واحدًا",
    "Yes": "نعم",
    "No": "لا",
    "Project Details": "تفاصيل المشروع",
    "Describe Your Project": "صف مشروعك",
    "Tell us what you want to build...": "أخبرنا ماذا تريد أن نبني...",
    "What problem are you trying to solve?": "ما المشكلة التي تحاول حلها؟",
    "What is the main goal of this project?": "ما الهدف الرئيسي من هذا المشروع؟",
    "Reference Links / Examples": "روابط مرجعية / أمثلة",
    "Timeline & Budget": "الجدول الزمني والميزانية",
    "Expected Budget Range": "نطاق الميزانية المتوقع",
    "Select range": "اختر النطاق",
    "Under $500": "أقل من 500$",
    "$500 - $1,000": "500$ - 1,000$",
    "$1,000 - $3,000": "1,000$ - 3,000$",
    "$3,000+": "3,000$+",
    "Not Sure Yet": "غير متأكد بعد",
    "Expected Start Date": "موعد البدء المتوقع",
    "Select timeline": "اختر المدة",
    "As Soon As Possible": "في أقرب وقت ممكن",
    "Within 1 Week": "خلال أسبوع",
    "Within 1 Month": "خلال شهر",
    "Later / Still Planning": "لاحقًا / ما زال التخطيط جاريًا",
    "Is this project urgent?": "هل هذا المشروع عاجل؟",
    "Final Details": "التفاصيل النهائية",
    "Preferred Contact Method": "وسيلة التواصل المفضلة",
    "Select method": "اختر الوسيلة",
    "Email": "البريد الإلكتروني",
    "WhatsApp": "واتساب",
    "Phone Call": "اتصال هاتفي",
    "Additional Notes": "ملاحظات إضافية",
    "I have read and agree to the": "لقد قرأت وأوافق على",
    "and": "و",
    "Your information is used only to review and respond to your project inquiry.": "نستخدم معلوماتك فقط لمراجعة طلب مشروعك والرد عليك.",
    "Loading": "جارٍ التحميل",
    "Your project request has been sent. Thank you!": "تم إرسال طلب مشروعك بنجاح. شكرًا لك!",
    "Previous": "السابق",
    "Next": "التالي",
    "Submit Project Request": "إرسال طلب المشروع",
    "Your data is encrypted and secure": "بياناتك مشفرة وآمنة",
    "Toggle navigation": "تبديل القائمة",
    "Language switch": "تبديل اللغة",
    "Switch language": "تبديل اللغة",
    "SurAxisTech home": "الصفحة الرئيسية لـ SurAxisTech",
    "Home": "الرئيسية",
    "About": "من نحن",
    "Copyright": "حقوق النشر",
    "All Rights Reserved.": "جميع الحقوق محفوظة.",
    "Email Support": "الدعم عبر البريد الإلكتروني",
    "Web & Digital Platform Development": "تطوير منصات الويب والمنصات الرقمية",
    "Custom System Development": "تطوير أنظمة مخصصة",
    "Digital Process Automation": "أتمتة العمليات الرقمية",
    "AI Integration Solutions": "حلول دمج الذكاء الاصطناعي",
    "Odoo Customization & Development": "تخصيص وتطوير Odoo",
    "Payment Gateway Integration": "تكامل بوابات الدفع",
    "System Maintenance & Security": "صيانة الأنظمة وأمنها",
    "Scalable websites and digital platforms crafted around your business flow.": "مواقع ومنصات رقمية قابلة للتوسع مصممة حول سير عملك.",
    "Purpose-built systems designed to solve your exact operational needs.": "أنظمة مصممة خصيصًا لحل احتياجاتك التشغيلية بدقة.",
    "Automate repetitive workflows and reduce manual effort with smart integrations.": "أتمتة سير العمل المتكرر وتقليل الجهد اليدوي عبر تكاملات ذكية.",
    "Add practical AI features to improve decisions, speed, and customer experience.": "إضافة ميزات ذكاء اصطناعي عملية لتحسين القرار والسرعة وتجربة العميل.",
    "Tailored Odoo modules and enhancements aligned with your business model.": "وحدات Odoo مخصصة وتحسينات متوافقة مع نموذج عملك.",
    "Secure payment setup with smooth checkout and reliable transaction flow.": "إعداد دفع آمن مع تجربة إتمام شراء سلسة وتدفق معاملات موثوق.",
    "Continuous technical support, updates, monitoring, and security hardening.": "دعم تقني مستمر وتحديثات ومراقبة وتعزيز للأمان.",
    "Based on project scope": "بحسب نطاق المشروع",
    "Starts from $300": "تبدأ من 300$",
    "Based on required modules": "بحسب الوحدات المطلوبة",
    "Starts from $250": "تبدأ من 250$",
    "Monthly plans available": "خطط شهرية متاحة",
}


def decode_po_string(parts: list[str]) -> str:
    return "".join(ast.literal_eval(part) for part in parts)


def encode_po_string(value: str) -> str:
    value = value.replace("\\", "\\\\").replace('"', '\\"').replace("\n", "\\n")
    return f'"{value}"'


def update_entry(entry: str) -> str:
    lines = entry.splitlines()
    msgid_index = next((i for i, line in enumerate(lines) if line.startswith("msgid ")), None)
    msgstr_index = next((i for i, line in enumerate(lines) if line.startswith("msgstr ")), None)
    if msgid_index is None or msgstr_index is None:
        return entry

    msgid_parts = [lines[msgid_index][6:]]
    i = msgid_index + 1
    while i < len(lines) and lines[i].startswith('"'):
        msgid_parts.append(lines[i])
        i += 1
    msgid_value = decode_po_string(msgid_parts)
    if not msgid_value:
        return entry

    translated = TRANSLATIONS.get(msgid_value)
    if translated is None:
        return entry

    updated: list[str] = []
    i = 0
    while i < len(lines):
        if i == msgstr_index:
            updated.append("msgstr " + encode_po_string(translated))
            i += 1
            while i < len(lines) and lines[i].startswith('"'):
                i += 1
            continue
        updated.append(lines[i])
        i += 1
    return "\n".join(updated)


def main() -> None:
    content = PO_PATH.read_text(encoding="utf-8")
    entries = content.split("\n\n")
    updated_entries = [update_entry(entry) for entry in entries]
    updated_content = "\n\n".join(updated_entries)
    updated_content = updated_content.replace('"Language: \\n"', '"Language: ar\\n"')
    updated_content = updated_content.replace("#, fuzzy\n", "")
    PO_PATH.write_text(updated_content, encoding="utf-8")
    print("Arabic translations applied.")


if __name__ == "__main__":
    main()
