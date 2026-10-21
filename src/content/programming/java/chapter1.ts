import { ProgChapter } from "../../../types/programming";

export const javaChapter1: ProgChapter = {
  id: "java-ch1",
  lang: "java",
  titleEn: "Java Fundamentals",
  titleFa: "مبانی جاوا",
  lessons: [
    // ============ 1. Introduction ============
    {
      id: "java-intro",
      slug: "introduction",
      lang: "java",
      level: "easy",
      category: "basics",
      titleEn: "Introduction & History",
      titleFa: "معرفی و تاریخچه",
      descEn: "What Java is, where it came from, and why it matters",
      descFa: "جاوا چیست، از کجا اومده، و چرا مهمه",
      duration: 10,
      xp: 20,
      blocks: [
        { type: "heading", en: "What is Java?", fa: "جاوا چیست؟" },
        {
          type: "paragraph",
          en: "Java is a high-level, object-oriented programming language created by James Gosling at Sun Microsystems in 1995. It compiles to bytecode that runs on the JVM (Java Virtual Machine), making the same program work on Windows, Linux, and macOS.",
          fa: "جاوا یک زبان برنامه‌نویسی سطح بالا و شی‌گراست که توسط جیمز گاسلینگ در Sun Microsystems در سال ۱۹۹۵ ساخته شد. به bytecode کامپایل می‌شه که روی JVM اجرا می‌شه و یک برنامه روی ویندوز، لینوکس و مک کار می‌کنه.",
        },
        { type: "heading", en: "A Brief History", fa: "تاریخچه کوتاه" },
        {
          type: "list",
          itemsEn: [
            "1991 — 'Oak' project starts at Sun (renamed to Java in 1995)",
            "1995 — Netscape Navigator adopts Java. Time magazine names it a top product",
            "1996 — JDK 1.0 released",
            "2010 — Oracle acquires Sun",
            "2017 — New release every 6 months",
            "Today — Java 21 is the current LTS (Long-Term Support)",
          ],
          itemsFa: [
            "۱۹۹۱ — پروژه 'Oak' در Sun شروع شد (۱۹۹۵ به Java تغییر نام داد)",
            "۱۹۹۵ — Netscape Navigator از جاوا استفاده کرد. مجله Time آن را محصول برتر نامید",
            "۱۹۹۶ — JDK 1.0 منتشر شد",
            "۲۰۱۰ — Oracle شرکت Sun را خرید",
            "۲۰۱۷ — نسخه جدید هر ۶ ماه",
            "امروز — Java 21 نسخه LTS فعلی است",
          ],
        },
        { type: "heading", en: "Why Learn Java?", fa: "چرا جاوا یاد بگیریم؟" },
        {
          type: "list",
          itemsEn: [
            "Android apps run on the JVM",
            "Enterprise backends (banks, e-commerce) use Spring",
            "Big data: Hadoop, Spark, Kafka",
            "Always in the top 3 most in-demand languages",
          ],
          itemsFa: [
            "اپ‌های اندروید روی JVM اجرا می‌شن",
            "بک‌اندهای enterprise (بانک، فروشگاه) از Spring استفاده می‌کنن",
            "Big data: Hadoop، Spark، Kafka",
            "همیشه جزو ۳ زبان پرتقاضا",
          ],
        },
        {
          type: "callout",
          variant: "info",
          en: "Java and JavaScript are completely different. Similar names were a 1995 marketing decision.",
          fa: "جاوا و جاوااسکریپت کاملاً متفاوت‌اند. اسم مشابه یک تصمیم بازاریابی ۱۹۹۵ بود.",
        },
        {
          type: "quiz",
          questions: [
            {
              questionEn: "In what year was Java first released?",
              questionFa: "جاوا اولین بار در چه سالی منتشر شد؟",
              optionsEn: ["1985", "1995", "2000", "2010"],
              optionsFa: ["۱۹۸۵", "۱۹۹۵", "۲۰۰۰", "۲۰۱۰"],
              correctIndex: 1,
              explanationEn: "Java was released by Sun Microsystems in 1995.",
              explanationFa: "جاوا در سال ۱۹۹۵ توسط Sun Microsystems منتشر شد.",
            },
            {
              questionEn: "What does JVM stand for?",
              questionFa: "JVM مخفف چیست؟",
              optionsEn: ["Java Variable Manager", "Java Virtual Machine", "Just Virtual Memory", "Java Version Manager"],
              optionsFa: ["Java Variable Manager", "Java Virtual Machine", "Just Virtual Memory", "Java Version Manager"],
              correctIndex: 1,
              explanationEn: "JVM = Java Virtual Machine. It runs the compiled bytecode.",
              explanationFa: "JVM = Java Virtual Machine. bytecode کامپایل‌شده را اجرا می‌کند.",
            },
            {
              questionEn: "Which company created Java?",
              questionFa: "کدام شرکت جاوا را ساخت؟",
              optionsEn: ["Microsoft", "Google", "Sun Microsystems", "IBM"],
              optionsFa: ["Microsoft", "Google", "Sun Microsystems", "IBM"],
              correctIndex: 2,
              explanationEn: "Sun Microsystems created Java in 1995. Oracle acquired Sun in 2010.",
              explanationFa: "Sun Microsystems جاوا را در ۱۹۹۵ ساخت. Oracle در ۲۰۱۰ Sun را خرید.",
            },
          ],
        },
      ],
    },

    // ============ 2. Installation with TABS ============
    {
      id: "java-install",
      slug: "installation",
      lang: "java",
      level: "easy",
      category: "basics",
      titleEn: "Installation",
      titleFa: "نصب",
      descEn: "Install JDK on Arch, Ubuntu, Fedora, Windows, or macOS",
      descFa: "نصب JDK روی آرچ، اوبونتو، فدورا، ویندوز یا مک",
      duration: 10,
      xp: 15,
      blocks: [
        { type: "heading", en: "What You Need", fa: "چی لازم داری" },
        {
          type: "paragraph",
          en: "You need the JDK (Java Development Kit), not just the JRE (Java Runtime Environment). The JDK includes javac, the compiler that turns .java files into .class bytecode.",
          fa: "به JDK (کیت توسعه جاوا) نیاز داری، نه فقط JRE. JDK شامل javac است، کامپایلری که فایل‌های .java را به bytecode .class تبدیل می‌کند.",
        },
        { type: "heading", en: "Install by Operating System", fa: "نصب بر اساس سیستم‌عامل" },
        {
          type: "tabs",
          tabs: [
            {
              os: "Arch Linux",
              osFa: "آرچ لینوکس",
              icon: "arch",
              steps: [
                { textEn: "Update the package database", textFa: "به‌روزرسانی پایگاه داده بسته‌ها", code: "sudo pacman -Syu" },
                { textEn: "Install OpenJDK 21 (current LTS)", textFa: "نصب OpenJDK 21 (LTS فعلی)", code: "sudo pacman -S jdk-openjdk" },
                { textEn: "If you need multiple JDKs, manage with archlinux-java", textFa: "اگر چند JDK داری، با archlinux-java مدیریت کن", code: "archlinux-java status\nsudo archlinux-java set java-21-openjdk" },
                { textEn: "Verify", textFa: "تأیید", code: "java -version\njavac -version" },
              ],
            },
            {
              os: "Ubuntu / Debian",
              osFa: "اوبونتو / دبیان",
              icon: "ubuntu",
              steps: [
                { textEn: "Update packages", textFa: "به‌روزرسانی بسته‌ها", code: "sudo apt update" },
                { textEn: "Install OpenJDK 21", textFa: "نصب OpenJDK 21", code: "sudo apt install openjdk-21-jdk" },
                { textEn: "Verify", textFa: "تأیید", code: "java -version\njavac -version" },
              ],
            },
            {
              os: "Fedora",
              osFa: "فدورا",
              icon: "fedora",
              steps: [
                { textEn: "Install OpenJDK 21", textFa: "نصب OpenJDK 21", code: "sudo dnf install java-21-openjdk-devel" },
                { textEn: "Verify", textFa: "تأیید", code: "java -version\njavac -version" },
              ],
            },
            {
              os: "Windows",
              osFa: "ویندوز",
              icon: "windows",
              steps: [
                { textEn: "Download the installer from Adoptium (Eclipse Temurin)", textFa: "نصب‌کننده را از Adoptium (Eclipse Temurin) دانلود کن", code: "https://adoptium.net/" },
                { textEn: "Run the .msi installer. Enable 'Set JAVA_HOME variable'", textFa: "فایل .msi را اجرا کن. گزینه 'Set JAVA_HOME variable' را فعال کن" },
                { textEn: "Open a new Command Prompt and verify", textFa: "یک Command Prompt جدید باز کن و تأیید کن", code: "java -version\njavac -version" },
              ],
            },
            {
              os: "macOS",
              osFa: "مک",
              icon: "macos",
              steps: [
                { textEn: "Install Homebrew (if not already)", textFa: "نصب Homebrew (اگر نداری)", code: '/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"' },
                { textEn: "Install OpenJDK", textFa: "نصب OpenJDK", code: "brew install openjdk@21" },
                { textEn: "Verify", textFa: "تأیید", code: "java -version\njavac -version" },
              ],
            },
          ],
        },
        {
          type: "callout",
          variant: "success",
          en: "After installation, java -version should print something like: openjdk version \"21.0.x\". If it does, you're ready.",
          fa: "بعد از نصب، java -version باید چیزی مثل openjdk version \"21.0.x\" چاپ کند. اگر کرد، آماده‌ای.",
        },
        {
          type: "quiz",
          questions: [
            {
              questionEn: "What's the difference between JDK and JRE?",
              questionFa: "تفاوت JDK و JRE چیست؟",
              optionsEn: [
                "They are the same thing",
                "JDK includes the compiler (javac); JRE only runs programs",
                "JRE is newer than JDK",
                "JDK is for Windows only",
              ],
              optionsFa: [
                "هیچ تفاوتی ندارن",
                "JDK شامل کامپایلر (javac) است؛ JRE فقط برنامه اجرا می‌کند",
                "JRE جدیدتر از JDK است",
                "JDK فقط برای ویندوز است",
              ],
              correctIndex: 1,
              explanationEn: "JDK = compiler + runtime. JRE = runtime only.",
              explanationFa: "JDK = کامپایلر + runtime. JRE = فقط runtime.",
            },
            {
              questionEn: "On Arch Linux, which package installs the JDK?",
              questionFa: "روی Arch Linux، کدام بسته JDK نصب می‌کند؟",
              optionsEn: ["jre-openjdk", "jdk-openjdk", "java-runtime", "openjdk"],
              optionsFa: ["jre-openjdk", "jdk-openjdk", "java-runtime", "openjdk"],
              correctIndex: 1,
              explanationEn: "jdk-openjdk installs the full Development Kit including javac.",
              explanationFa: "jdk-openjdk کیت کامل توسعه شامل javac نصب می‌کند.",
            },
          ],
        },
      ],
    },

    // ============ 3. First Program ============
    {
      id: "java-hello",
      slug: "first-program",
      lang: "java",
      level: "easy",
      category: "basics",
      titleEn: "Your First Program",
      titleFa: "اولین برنامه‌ات",
      descEn: "Write, compile, and run HelloWorld",
      descFa: "نوشتن، کامپایل و اجرای HelloWorld",
      duration: 8,
      xp: 15,
      blocks: [
        { type: "heading", en: "Hello, World!", fa: "سلام دنیا!" },
        {
          type: "paragraph",
          en: "Every Java program lives inside a class. The entry point is always a main method with the exact signature below. Java is case-sensitive, so Main and main are different.",
          fa: "هر برنامه جاوا داخل یک کلاس زندگی می‌کند. نقطه شروع همیشه متد main با امضای دقیق زیر است. جاوا به حروف حساس است، پس Main و main فرق دارند.",
        },
        {
          type: "code",
          lang: "java",
          code: `// File: HelloWorld.java
public class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Hello, CyberDojo!");
    }
}`,
        },
        { type: "heading", en: "Break It Down", fa: "بشکافش" },
        {
          type: "list",
          itemsEn: [
            "public class HelloWorld — filename MUST match: HelloWorld.java",
            "public static void main(String[] args) — the entry point",
            "System.out.println(...) — prints a line to the console",
            "Every statement ends with a semicolon ;",
          ],
          itemsFa: [
            "public class HelloWorld — نام فایل باید دقیقاً یکی باشد: HelloWorld.java",
            "public static void main(String[] args) — نقطه شروع",
            "System.out.println(...) — یک خط روی کنسول چاپ می‌کند",
            "هر دستور با سیمی‌کالن ; تمام می‌شود",
          ],
        },
        {
          type: "code",
          lang: "bash",
          code: `# Compile — creates HelloWorld.class
javac HelloWorld.java

# Run — note: no .class extension
java HelloWorld

# Output: Hello, CyberDojo!`,
        },
        {
          type: "callout",
          variant: "warning",
          en: "Running with 'java HelloWorld' (no extension). The .class extension is only for the compiled file.",
          fa: "با 'java HelloWorld' اجرا کن (بدون پسوند). پسوند .class فقط برای فایل کامپایل‌شده است.",
        },
        {
          type: "quiz",
          questions: [
            {
              questionEn: "What does javac do?",
              questionFa: "javac چه کار می‌کند؟",
              optionsEn: ["Runs the program", "Compiles .java to .class", "Deletes files", "Installs Java"],
              optionsFa: ["برنامه را اجرا می‌کند", ".java را به .class کامپایل می‌کند", "فایل‌ها را پاک می‌کند", "جاوا نصب می‌کند"],
              correctIndex: 1,
              explanationEn: "javac compiles. java runs.",
              explanationFa: "javac کامپایل می‌کند. java اجرا می‌کند.",
            },
          ],
        },
      ],
    },

    // ============ 4. VS Code ============
    {
      id: "java-vscode",
      slug: "vscode-setup",
      lang: "java",
      level: "easy",
      category: "basics",
      titleEn: "VS Code Setup",
      titleFa: "راه‌اندازی VS Code",
      descEn: "Syntax highlighting, autocomplete, debugging",
      descFa: "هایلایت، اتوکامپلیت، دیباگ",
      duration: 6,
      xp: 10,
      blocks: [
        { type: "heading", en: "Why an IDE?", fa: "چرا IDE؟" },
        {
          type: "paragraph",
          en: "You can write Java in any editor, but an IDE gives you autocomplete, error highlighting, a debugger, and project management. VS Code is lightweight and free.",
          fa: "می‌تونی جاوا رو در هر ادیتوری بنویسی، ولی IDE بهت autocomplete، هایلایت خطا، دیباگر و مدیریت پروژه می‌ده. VS Code سبک و رایگانه.",
        },
        {
          type: "tabs",
          tabs: [
            {
              os: "Arch Linux",
              osFa: "آرچ لینوکس",
              icon: "arch",
              steps: [
                { textEn: "Install VS Code (open-source build)", textFa: "نصب VS Code (نسخه open-source)", code: "sudo pacman -S code" },
                { textEn: "Or Microsoft's build via AUR", textFa: "یا نسخه مایکروسافت از AUR", code: "yay -S visual-studio-code-bin" },
              ],
            },
            {
              os: "Ubuntu / Debian",
              osFa: "اوبونتو / دبیان",
              icon: "ubuntu",
              steps: [
                { textEn: "Install via snap", textFa: "نصب با snap", code: "sudo snap install code --classic" },
              ],
            },
            {
              os: "Windows",
              osFa: "ویندوز",
              icon: "windows",
              steps: [
                { textEn: "Download from code.visualstudio.com", textFa: "از code.visualstudio.com دانلود کن" },
                { textEn: "Run the installer", textFa: "نصب‌کننده را اجرا کن" },
              ],
            },
            {
              os: "macOS",
              osFa: "مک",
              icon: "macos",
              steps: [
                { textEn: "Install via Homebrew", textFa: "نصب با Homebrew", code: "brew install --cask visual-studio-code" },
              ],
            },
          ],
        },
        { type: "heading", en: "Install Java Extension Pack", fa: "نصب پک اکستنشن جاوا" },
        {
          type: "list",
          itemsEn: [
            "Open VS Code → Extensions (Ctrl+Shift+X)",
            "Search: 'Extension Pack for Java' by Microsoft",
            "Install — this adds language support, debugger, test runner, Maven, and IntelliCode",
          ],
          itemsFa: [
            "VS Code را باز کن → Extensions (Ctrl+Shift+X)",
            "جستجو: 'Extension Pack for Java' از Microsoft",
            "نصب — شامل پشتیبانی زبان، دیباگر، تست رانر، Maven و IntelliCode",
          ],
        },
        {
          type: "callout",
          variant: "success",
          en: "Press F5 on any .java file to run with debugging.",
          fa: "روی هر فایل .java دکمه F5 بزن تا با دیباگ اجرا شود.",
        },
        {
          type: "quiz",
          questions: [
            {
              questionEn: "Which VS Code extension pack is recommended for Java?",
              questionFa: "کدام پک اکستنشن VS Code برای جاوا توصیه می‌شود؟",
              optionsEn: ["Python Pack", "Extension Pack for Java", "C++ Pack", "Web Pack"],
              optionsFa: ["Python Pack", "Extension Pack for Java", "C++ Pack", "Web Pack"],
              correctIndex: 1,
              explanationEn: "Microsoft's 'Extension Pack for Java' bundles everything you need.",
              explanationFa: "پک 'Extension Pack for Java' مایکروسافت همه چیز لازم را دارد.",
            },
          ],
        },
      ],
    },

    // ============ 5. Variables ============
    {
      id: "java-variables",
      slug: "variables",
      lang: "java",
      level: "easy",
      category: "basics",
      titleEn: "Variables & Data Types",
      titleFa: "متغیرها و انواع داده",
      descEn: "int, double, boolean, char, String — the building blocks",
      descFa: "int، double، boolean، char، String — پایه‌ها",
      duration: 12,
      xp: 20,
      blocks: [
        { type: "heading", en: "What is a Variable?", fa: "متغیر چیست؟" },
        {
          type: "paragraph",
          en: "A variable is a named storage location. In Java, every variable has a type, and the type determines what values it can hold and what operations you can do with it.",
          fa: "متغیر یک محل ذخیره‌سازی نام‌دار است. در جاوا هر متغیر یک نوع دارد و نوع تعیین می‌کند چه مقادیری می‌گیرد و چه عملیاتی می‌شود.",
        },
        { type: "heading", en: "The 8 Primitive Types", fa: "۸ نوع اولیه" },
        {
          type: "list",
          itemsEn: [
            "byte — 8-bit integer (-128 to 127)",
            "short — 16-bit integer (-32k to 32k)",
            "int — 32-bit integer (most common, -2B to 2B)",
            "long — 64-bit integer (for big numbers, end with L)",
            "float — 32-bit decimal (end with f)",
            "double — 64-bit decimal (default for decimals)",
            "boolean — true / false",
            "char — a single character, in single quotes 'A'",
          ],
          itemsFa: [
            "byte — عدد ۸ بیتی (-۱۲۸ تا ۱۲۷)",
            "short — عدد ۱۶ بیتی (-۳۲ هزار تا ۳۲ هزار)",
            "int — عدد ۳۲ بیتی (رایج‌ترین، -۲ میلیارد تا ۲ میلیارد)",
            "long — عدد ۶۴ بیتی (برای اعداد بزرگ، با L)",
            "float — اعشاری ۳۲ بیتی (با f)",
            "double — اعشاری ۶۴ بیتی (پیش‌فرض برای اعشاری)",
            "boolean — true / false",
            "char — یک کاراکتر، در تک‌کوتیشن 'A'",
          ],
        },
        { type: "heading", en: "Example", fa: "مثال" },
        {
          type: "code",
          lang: "java",
          code: `public class Variables {
    public static void main(String[] args) {
        int age = 25;
        double price = 9.99;
        boolean isActive = true;
        char grade = 'A';
        String name = "Alice";   // String is not a primitive

        System.out.println(name + " is " + age + " years old.");
        System.out.println("Price: $" + price);
    }
}`,
        },
        {
          type: "callout",
          variant: "warning",
          en: "String is capitalized and uses double quotes \"like this\". char uses single quotes 'A'. Mixing them causes errors.",
          fa: "String با حرف بزرگ شروع می‌شه و از دابل‌کوتیشن \"استفاده می‌کنه\". char از تک‌کوتیشن 'استفاده می‌کنه'. اشتباه گرفتنشون خطا می‌ده.",
        },
        {
          type: "quiz",
          questions: [
            {
              questionEn: "What is the default type for decimal numbers in Java?",
              questionFa: "نوع پیش‌فرض برای اعداد اعشاری در جاوا چیست؟",
              optionsEn: ["float", "double", "int", "decimal"],
              optionsFa: ["float", "double", "int", "decimal"],
              correctIndex: 1,
              explanationEn: "Java defaults to double for any decimal literal like 3.14.",
              explanationFa: "جاوا برای هر عدد اعشاری مثل 3.14 پیش‌فرض از double استفاده می‌کند.",
            },
            {
              questionEn: "Which is a valid char declaration?",
              questionFa: "کدام تعریف char درست است؟",
              optionsEn: ["char c = \"A\";", "char c = 'A';", "char c = A;", "char c = 65A;"],
              optionsFa: ["char c = \"A\";", "char c = 'A';", "char c = A;", "char c = 65A;"],
              correctIndex: 1,
              explanationEn: "char uses single quotes: 'A'. Double quotes are for String.",
              explanationFa: "char از تک‌کوتیشن استفاده می‌کند: 'A'. دابل‌کوتیشن برای String است.",
            },
            {
              questionEn: "How do you write a long literal?",
              questionFa: "چطور یک عدد long می‌نویسی؟",
              optionsEn: ["123L", "123l", "long 123", "Both A and B"],
              optionsFa: ["123L", "123l", "long 123", "هر دو A و B"],
              correctIndex: 3,
              explanationEn: "Both L and l work, but capital L is recommended (lowercase l looks like 1).",
              explanationFa: "هر دو L و l کار می‌کنند ولی L بزرگ توصیه می‌شود (l کوچک شبیه ۱ است).",
            },
          ],
        },
      ],
    },

    // ============ 6. Operators ============
    {
      id: "java-operators",
      slug: "operators",
      lang: "java",
      level: "easy",
      category: "basics",
      titleEn: "Operators",
      titleFa: "عملگرها",
      descEn: "Arithmetic, comparison, and logical operators",
      descFa: "عملگرهای ریاضی، مقایسه و منطقی",
      duration: 10,
      xp: 15,
      blocks: [
        { type: "heading", en: "Arithmetic", fa: "ریاضی" },
        {
          type: "list",
          itemsEn: ["+ addition", "- subtraction", "* multiplication", "/ division", "% modulo (remainder)"],
          itemsFa: ["+ جمع", "- تفریق", "* ضرب", "/ تقسیم", "% باقیمانده"],
        },
        {
          type: "code",
          lang: "java",
          code: `int a = 10, b = 3;
System.out.println(a + b);   // 13
System.out.println(a - b);   // 7
System.out.println(a * b);   // 30
System.out.println(a / b);   // 3 (integer division!)
System.out.println(a % b);   // 1
System.out.println(a / 3.0); // 3.3333...`,
        },
        {
          type: "callout",
          variant: "warning",
          en: "Integer division truncates. 10 / 3 = 3, not 3.33. To get decimals, use 10.0 / 3.",
          fa: "تقسیم صحیح کوتاه می‌شود. 10 / 3 = 3، نه 3.33. برای اعشاری از 10.0 / 3 استفاده کن.",
        },
        { type: "heading", en: "Comparison", fa: "مقایسه" },
        {
          type: "list",
          itemsEn: ["== equal", "!= not equal", "> greater", "< less", ">= greater or equal", "<= less or equal"],
          itemsFa: ["== برابر", "!= نابرابر", "> بزرگتر", "< کوچکتر", ">= بزرگتر یا مساوی", "<= کوچکتر یا مساوی"],
        },
        {
          type: "callout",
          variant: "danger",
          en: "== compares references for objects (like String). Use .equals() for String comparison!",
          fa: "== برای اشیا (مثل String) مرجع را مقایسه می‌کند. برای مقایسه String از .equals() استفاده کن!",
        },
        {
          type: "quiz",
          questions: [
            {
              questionEn: "What does 7 / 2 evaluate to in Java?",
              questionFa: "در جاوا 7 / 2 چند می‌شود؟",
              optionsEn: ["3.5", "3", "4", "1"],
              optionsFa: ["3.5", "3", "4", "1"],
              correctIndex: 1,
              explanationEn: "Integer division truncates the decimal: 7 / 2 = 3.",
              explanationFa: "تقسیم صحیح قسمت اعشاری را حذف می‌کند: 7 / 2 = 3.",
            },
          ],
        },
      ],
    },

    // ============ 7. I/O ============
    {
      id: "java-io",
      slug: "input-output",
      lang: "java",
      level: "easy",
      category: "basics",
      titleEn: "Input & Output",
      titleFa: "ورودی و خروجی",
      descEn: "System.out and Scanner for interactive programs",
      descFa: "System.out و Scanner برای برنامه‌های تعاملی",
      duration: 10,
      xp: 15,
      blocks: [
        { type: "heading", en: "Output", fa: "خروجی" },
        {
          type: "code",
          lang: "java",
          code: `System.out.println("Hi");       // prints with newline
System.out.print("Hi");         // no newline
System.out.printf("Age: %d%n", 25); // formatted output`,
        },
        { type: "heading", en: "Input with Scanner", fa: "ورودی با Scanner" },
        {
          type: "code",
          lang: "java",
          code: `import java.util.Scanner;

public class Greet {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.print("Name: ");
        String name = sc.nextLine();
        System.out.print("Age: ");
        int age = sc.nextInt();
        System.out.println("Hi " + name + ", you are " + age);
        sc.close();
    }
}`,
        },
        {
          type: "callout",
          variant: "info",
          en: "Scanner methods: nextLine() for full line, next() for one word, nextInt() for integer, nextDouble() for decimal.",
          fa: "متدهای Scanner: nextLine() برای خط کامل، next() برای یک کلمه، nextInt() برای صحیح، nextDouble() برای اعشاری.",
        },
        {
          type: "quiz",
          questions: [
            {
              questionEn: "Which Scanner method reads a whole line?",
              questionFa: "کدام متد Scanner یک خط کامل می‌خواند؟",
              optionsEn: ["next()", "nextLine()", "read()", "nextString()"],
              optionsFa: ["next()", "nextLine()", "read()", "nextString()"],
              correctIndex: 1,
              explanationEn: "nextLine() returns the entire line including spaces.",
              explanationFa: "nextLine() کل خط شامل فاصله‌ها را برمی‌گرداند.",
            },
          ],
        },
      ],
    },

    // ============ 8. Loops ============
    {
      id: "java-loops",
      slug: "loops",
      lang: "java",
      level: "medium",
      category: "basics",
      titleEn: "Loops",
      titleFa: "حلقه‌ها",
      descEn: "for, while, do-while — and when to use each",
      descFa: "for، while، do-while — و کی کدام را استفاده کنیم",
      duration: 12,
      xp: 20,
      blocks: [
        { type: "heading", en: "The for Loop", fa: "حلقه for" },
        {
          type: "code",
          lang: "java",
          code: `for (int i = 1; i <= 5; i++) {
    System.out.println("i = " + i);
}`,
        },
        { type: "heading", en: "The while Loop", fa: "حلقه while" },
        {
          type: "code",
          lang: "java",
          code: `int n = 3;
while (n > 0) {
    System.out.println(n);
    n--;
}`,
        },
        { type: "heading", en: "The do-while Loop", fa: "حلقه do-while" },
        {
          type: "paragraph",
          en: "do-while always runs at least once, then checks the condition.",
          fa: "do-while همیشه حداقل یک بار اجرا می‌شود، بعد شرط را چک می‌کند.",
        },
        {
          type: "code",
          lang: "java",
          code: `int x = 10;
do {
    System.out.println("runs once");
} while (x < 5);`,
        },
        { type: "heading", en: "break and continue", fa: "break و continue" },
        {
          type: "list",
          itemsEn: ["break — exit the loop immediately", "continue — skip to next iteration"],
          itemsFa: ["break — بلافاصله از حلقه خارج شو", "continue — به تکرار بعدی برو"],
        },
        {
          type: "callout",
          variant: "danger",
          en: "Infinite loops happen when the condition never becomes false. Always make sure something changes each iteration.",
          fa: "حلقه بی‌نهایت وقتی اتفاق می‌افتد که شرط هرگز false نشود. همیشه مطمئن شو چیزی در هر تکرار تغییر می‌کند.",
        },
        {
          type: "quiz",
          questions: [
            {
              questionEn: "How many times does this run: for (int i = 0; i < 3; i++)?",
              questionFa: "این حلقه چند بار اجرا می‌شود: for (int i = 0; i < 3; i++)؟",
              optionsEn: ["2", "3", "4", "Infinite"],
              optionsFa: ["۲", "۳", "۴", "بی‌نهایت"],
              correctIndex: 1,
              explanationEn: "i takes values 0, 1, 2 — that's 3 iterations.",
              explanationFa: "i مقادیر ۰، ۱، ۲ را می‌گیرد — یعنی ۳ بار.",
            },
            {
              questionEn: "Which loop always executes at least once?",
              questionFa: "کدام حلقه همیشه حداقل یک بار اجرا می‌شود؟",
              optionsEn: ["for", "while", "do-while", "None"],
              optionsFa: ["for", "while", "do-while", "هیچ‌کدام"],
              correctIndex: 2,
              explanationEn: "do-while checks the condition AFTER the first iteration.",
              explanationFa: "do-while شرط را بعد از تکرار اول چک می‌کند.",
            },
          ],
        },
      ],
    },
  ],
};
