import { JavaError } from "../../../types/programming-extra";

export const javaErrors: JavaError[] = [
  {
    id: "err-semicolon",
    title: "Missing Semicolon",
    titleFa: "فراموشی سیمی‌کالن",
    severity: "common",
    message: "error: ';' expected",
    causeEn: "Every statement in Java must end with a semicolon. Forgetting one is the #1 beginner error.",
    causeFa: "هر دستور در جاوا باید با سیمی‌کالن تمام شود. فراموش کردنش رایج‌ترین خطای مبتدی‌هاست.",
    fixEn: "Add ; at the end of the line the compiler points to.",
    fixFa: "در انتهای خطی که کامپایلر اشاره می‌کند، ; اضافه کن.",
    wrongCode: `int x = 5
System.out.println(x);`,
    rightCode: `int x = 5;
System.out.println(x);`,
  },
  {
    id: "err-main-signature",
    title: "Main Method Not Found",
    titleFa: "متد main پیدا نشد",
    severity: "common",
    message: "Error: Main method not found in class HelloWorld",
    causeEn: "The JVM looks for exactly: public static void main(String[] args). Any typo, wrong case, or wrong type breaks it.",
    causeFa: "JVM دقیقاً دنبال public static void main(String[] args) می‌گردد. هر اشتباه تایپی، حرف بزرگ/کوچک، یا نوع اشتباه آن را می‌شکند.",
    fixEn: "Copy the exact signature: public static void main(String[] args)",
    fixFa: "امضای دقیق را کپی کن: public static void main(String[] args)",
    wrongCode: `public static void Main(String[] args) { }`,
    rightCode: `public static void main(String[] args) { }`,
  },
  {
    id: "err-classname",
    title: "Class Name Mismatch",
    titleFa: "ناهماهنگی نام کلاس",
    severity: "common",
    message: "error: class HelloWorld is public, should be declared in a file named HelloWorld.java",
    causeEn: "A public class MUST be in a file with the exact same name (case-sensitive).",
    causeFa: "کلاس public باید در فایلی با نام دقیقاً یکسان باشد (حساس به حرف بزرگ/کوچک).",
    fixEn: "Rename the file to match the class name exactly.",
    fixFa: "نام فایل را دقیقاً برابر با نام کلاس کن.",
    wrongCode: `// File: hello.java
public class HelloWorld { }`,
    rightCode: `// File: HelloWorld.java
public class HelloWorld { }`,
  },
  {
    id: "err-string-compare",
    title: "String Comparison with ==",
    titleFa: "مقایسه String با ==",
    severity: "tricky",
    message: "Strings compare references, not content — no error, wrong behavior",
    causeEn: "Using == on Strings compares memory references, not the actual text. Two equal strings can be different objects.",
    causeFa: "استفاده از == روی String‌ها مراجع حافظه را مقایسه می‌کند، نه متن. دو String برابر می‌توانند اشیای متفاوت باشند.",
    fixEn: "Use .equals() for content comparison. Use == only for primitive values or explicit reference check.",
    fixFa: "برای مقایسه محتوا از .equals() استفاده کن. == را فقط برای مقادیر اولیه یا بررسی صریح مرجع استفاده کن.",
    wrongCode: `String a = "hi";
String b = new String("hi");
if (a == b) { /* false! */ }`,
    rightCode: `String a = "hi";
String b = new String("hi");
if (a.equals(b)) { /* true */ }`,
  },
  {
    id: "err-null-pointer",
    title: "NullPointerException",
    titleFa: "NullPointerException",
    severity: "tricky",
    message: "java.lang.NullPointerException: Cannot invoke method on null",
    causeEn: "You called a method or accessed a field on an object that is null. Very common with Strings, arrays, and object references.",
    causeFa: "روی شیئی که null است متدی صدا زدی یا فیلدی دسترسی گرفتی. با String، آرایه و مرجع اشیا خیلی رایج است.",
    fixEn: "Check for null before use: if (str != null) { ... }. Or use Optional.",
    fixFa: "قبل از استفاده null را چک کن: if (str != null) { ... }. یا از Optional استفاده کن.",
    wrongCode: `String name = null;
System.out.println(name.length());`,
    rightCode: `String name = null;
if (name != null) {
    System.out.println(name.length());
}`,
  },
  {
    id: "err-array-index",
    title: "ArrayIndexOutOfBoundsException",
    titleFa: "ArrayIndexOutOfBoundsException",
    severity: "tricky",
    message: "java.lang.ArrayIndexOutOfBoundsException: Index 5 out of bounds for length 5",
    causeEn: "Arrays in Java are 0-indexed. A length-5 array has valid indices 0, 1, 2, 3, 4 — index 5 throws.",
    causeFa: "آرایه‌ها در جاوا از صفر ایندکس می‌شوند. آرایه‌ای با طول ۵، ایندکس‌های ۰ تا ۴ را دارد — ایندکس ۵ خطا می‌دهد.",
    fixEn: "Use arr.length - 1 as the last valid index. In loops, use i < arr.length, not i <= arr.length.",
    fixFa: "از arr.length - 1 به‌عنوان آخرین ایندکس معتبر استفاده کن. در حلقه‌ها i < arr.length، نه i <= arr.length.",
    wrongCode: `int[] arr = new int[5];
System.out.println(arr[5]); // OOB`,
    rightCode: `int[] arr = new int[5];
System.out.println(arr[4]); // last element`,
  },
  {
    id: "err-division-zero",
    title: "Division by Zero",
    titleFa: "تقسیم بر صفر",
    severity: "common",
    message: "java.lang.ArithmeticException: / by zero",
    causeEn: "Integer division by zero throws. Floating point (double) division by zero gives Infinity, not an exception.",
    causeFa: "تقسیم صحیح بر صفر خطا می‌دهد. تقسیم اعشاری (double) بر صفر Infinity می‌دهد، نه خطا.",
    fixEn: "Check the divisor before dividing: if (divisor != 0) { ... }",
    fixFa: "قبل از تقسیم مقسوم‌علیه را چک کن: if (divisor != 0) { ... }",
    wrongCode: `int a = 10;
int b = 0;
System.out.println(a / b);`,
    rightCode: `int a = 10;
int b = 0;
if (b != 0) System.out.println(a / b);`,
  },
  {
    id: "err-int-division",
    title: "Integer Division Truncation",
    titleFa: "بریدن تقسیم صحیح",
    severity: "tricky",
    message: "No error — wrong result",
    causeEn: "int / int always returns int, truncating decimals. 5 / 2 = 2, not 2.5.",
    causeFa: "int / int همیشه int می‌دهد و اعشار را حذف می‌کند. 5 / 2 = 2، نه 2.5.",
    fixEn: "Cast to double or use a double literal: 5.0 / 2 or (double) 5 / 2",
    fixFa: "به double cast کن یا از عدد اعشاری استفاده کن: 5.0 / 2 یا (double) 5 / 2",
    wrongCode: `int a = 5, b = 2;
System.out.println(a / b); // 2`,
    rightCode: `int a = 5, b = 2;
System.out.println((double) a / b); // 2.5`,
  },
  {
    id: "err-scanner-newline",
    title: "Scanner Skips Input",
    titleFa: "Scanner ورودی را رد می‌کند",
    severity: "tricky",
    message: "No error — nextLine() returns empty string",
    causeEn: "nextInt() leaves the newline in the buffer. The next nextLine() reads that newline and returns empty.",
    causeFa: "nextInt() خط جدید را در بافر باقی می‌گذارد. nextLine() بعدی آن را می‌خواند و خالی برمی‌گرداند.",
    fixEn: "Add an extra scanner.nextLine() after nextInt() to consume the newline.",
    fixFa: "یک scanner.nextLine() اضافه بعد از nextInt() برای مصرف خط جدید.",
    wrongCode: `Scanner sc = new Scanner(System.in);
int n = sc.nextInt();
String s = sc.nextLine(); // empty!`,
    rightCode: `Scanner sc = new Scanner(System.in);
int n = sc.nextInt();
sc.nextLine(); // consume newline
String s = sc.nextLine();`,
  },
  {
    id: "err-string-quotes",
    title: "Wrong Quotes for char/String",
    titleFa: "کوتیشن اشتباه برای char/String",
    severity: "common",
    message: "error: incompatible types: String cannot be converted to char",
    causeEn: "char uses single quotes 'A'. String uses double quotes \"hello\". Mixing them fails.",
    causeFa: "char از تک‌کوتیشن 'A' استفاده می‌کند. String از دابل‌کوتیشن \"hello\". قاطی کردنشان خطا می‌دهد.",
    fixEn: "Use ' ' for char, \" \" for String.",
    fixFa: "برای char از ' ' و برای String از \" \" استفاده کن.",
    wrongCode: `char c = "A";
String s = 'hello';`,
    rightCode: `char c = 'A';
String s = "hello";`,
  },
  {
    id: "err-brackets",
    title: "Missing Closing Brace",
    titleFa: "فراموشی آکولاد بسته",
    severity: "common",
    message: "error: reached end of file while parsing",
    causeEn: "Every { must have a matching }. An unclosed block usually points to the class declaration line, not the actual missing brace.",
    causeFa: "هر { باید یک } متناظر داشته باشد. بلوک بسته‌نشده معمولاً به خط اعلان کلاس اشاره می‌کند، نه محل واقعی.",
    fixEn: "Use your IDE to find unmatched braces. Every method and class needs its own pair.",
    fixFa: "از IDE برای پیدا کردن آکولادهای جفت‌نشده استفاده کن. هر متد و کلاس جفت خودش را لازم دارد.",
    wrongCode: `public class Test {
    public static void main(String[] args) {
        System.out.println("hi");
    // missing closing brace
}`,
    rightCode: `public class Test {
    public static void main(String[] args) {
        System.out.println("hi");
    }
}`,
  },
  {
    id: "err-compile-vs-run",
    title: "javac vs java Confusion",
    titleFa: "اشتباه javac با java",
    severity: "common",
    message: "Error: Could not find or load main class HelloWorld.class",
    causeEn: "javac compiles (with extension .java). java runs (without extension). Running java HelloWorld.class fails.",
    causeFa: "javac کامپایل می‌کند (با پسوند .java). java اجرا می‌کند (بدون پسوند). اجرای java HelloWorld.class خطا می‌دهد.",
    fixEn: "Compile: javac HelloWorld.java — Run: java HelloWorld (no extension)",
    fixFa: "کامپایل: javac HelloWorld.java — اجرا: java HelloWorld (بدون پسوند)",
    wrongCode: `javac HelloWorld.java
java HelloWorld.class`,
    rightCode: `javac HelloWorld.java
java HelloWorld`,
  },
];
