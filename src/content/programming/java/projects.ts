import { JavaProject } from "../../../types/programming-extra";

export const javaProjects: JavaProject[] = [
  // ============ 1. Calculator ============
  {
    id: "proj-calculator",
    slug: "calculator",
    level: "easy",
    titleEn: "Simple Calculator",
    titleFa: "ماشین‌حساب ساده",
    descEn: "Read two numbers and an operator, then print the result",
    descFa: "دو عدد و یک عملگر بخوان و نتیجه را چاپ کن",
    xp: 50,
    duration: 20,
    conceptsEn: ["Scanner", "switch statement", "Arithmetic operators", "if/else"],
    conceptsFa: ["Scanner", "دستور switch", "عملگرهای ریاضی", "if/else"],
    steps: [
      {
        stepEn: "Create a new file Calculator.java with a public class Calculator and a main method.",
        stepFa: "یک فایل جدید Calculator.java با کلاس public Calculator و متد main بساز.",
        hintEn: "Don't forget the exact main signature: public static void main(String[] args)",
        hintFa: "امضای دقیق main را فراموش نکن: public static void main(String[] args)",
      },
      {
        stepEn: "Import java.util.Scanner and create a Scanner reading from System.in.",
        stepFa: "java.util.Scanner را import کن و یک Scanner برای System.in بساز.",
        hintEn: "import java.util.Scanner;  then  Scanner sc = new Scanner(System.in);",
        hintFa: "import java.util.Scanner;  سپس  Scanner sc = new Scanner(System.in);",
      },
      {
        stepEn: "Ask the user for two numbers using sc.nextDouble().",
        stepFa: "دو عدد از کاربر با sc.nextDouble() بگیر.",
        code: `System.out.print("First number: ");
double a = sc.nextDouble();
System.out.print("Second number: ");
double b = sc.nextDouble();`,
      },
      {
        stepEn: "Ask for an operator (+, -, *, /) using sc.next().",
        stepFa: "یک عملگر (+, -, *, /) با sc.next() بگیر.",
        code: `System.out.print("Operator (+ - * /): ");
String op = sc.next();`,
      },
      {
        stepEn: "Use a switch statement on the operator to compute the result and print it.",
        stepFa: "از switch روی عملگر استفاده کن تا نتیجه را حساب کنی و چاپ کنی.",
        hintEn: "Handle division carefully — check if b is 0 first.",
        hintFa: "تقسیم را با احتیاط انجام بده — اول چک کن b صفر نباشد.",
        code: `switch (op) {
    case "+": System.out.println(a + b); break;
    case "-": System.out.println(a - b); break;
    case "*": System.out.println(a * b); break;
    case "/":
        if (b == 0) System.out.println("Cannot divide by zero");
        else System.out.println(a / b);
        break;
    default: System.out.println("Unknown operator");
}`,
      },
    ],
    solution: [
      {
        name: "Calculator.java",
        content: `import java.util.Scanner;

public class Calculator {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);

        System.out.print("First number: ");
        double a = sc.nextDouble();

        System.out.print("Second number: ");
        double b = sc.nextDouble();

        System.out.print("Operator (+ - * /): ");
        String op = sc.next();

        switch (op) {
            case "+": System.out.println("Result: " + (a + b)); break;
            case "-": System.out.println("Result: " + (a - b)); break;
            case "*": System.out.println("Result: " + (a * b)); break;
            case "/":
                if (b == 0) System.out.println("Cannot divide by zero");
                else System.out.println("Result: " + (a / b));
                break;
            default: System.out.println("Unknown operator: " + op);
        }

        sc.close();
    }
}`,
      },
    ],
  },

  // ============ 2. Guess the Number ============
  {
    id: "proj-guess-number",
    slug: "guess-number",
    level: "easy",
    titleEn: "Number Guessing Game",
    titleFa: "بازی حدس عدد",
    descEn: "The computer picks a number 1-100, you guess it with hints",
    descFa: "کامپیوتر یک عدد ۱ تا ۱۰۰ انتخاب می‌کند، تو با راهنمایی حدس بزن",
    xp: 60,
    duration: 25,
    conceptsEn: ["Random", "while loop", "Scanner", "if/else", "break"],
    conceptsFa: ["Random", "حلقه while", "Scanner", "if/else", "break"],
    steps: [
      {
        stepEn: "Create GuessNumber.java with a public class and main method.",
        stepFa: "فایل GuessNumber.java با کلاس public و متد main بساز.",
      },
      {
        stepEn: "Generate a random number from 1 to 100 using java.util.Random.",
        stepFa: "یک عدد تصادفی از ۱ تا ۱۰۰ با java.util.Random بساز.",
        hintEn: "new Random().nextInt(100) + 1 gives 1..100",
        hintFa: "new Random().nextInt(100) + 1 عدد ۱ تا ۱۰۰ می‌دهد",
        code: `import java.util.Random;
Random rand = new Random();
int target = rand.nextInt(100) + 1;`,
      },
      {
        stepEn: "Create a Scanner and a counter variable for attempts.",
        stepFa: "یک Scanner و متغیر شمارنده برای تعداد تلاش‌ها بساز.",
        code: `Scanner sc = new Scanner(System.in);
int attempts = 0;`,
      },
      {
        stepEn: "Loop: read a guess, increment attempts. If too low, say 'higher'. If too high, say 'lower'. If correct, break.",
        stepFa: "حلقه بزن: حدس بخوان، شمارنده را اضافه کن. اگر کم بود بگو 'بالاتر'. اگر زیاد بود بگو 'پایین‌تر'. اگر درست بود break.",
        hintEn: "while (true) { ... if (guess == target) break; ... }",
        hintFa: "while (true) { ... if (guess == target) break; ... }",
      },
      {
        stepEn: "When the loop ends, print the number of attempts.",
        stepFa: "وقتی حلقه تمام شد، تعداد تلاش‌ها را چاپ کن.",
      },
    ],
    solution: [
      {
        name: "GuessNumber.java",
        content: `import java.util.Random;
import java.util.Scanner;

public class GuessNumber {
    public static void main(String[] args) {
        Random rand = new Random();
        int target = rand.nextInt(100) + 1;
        Scanner sc = new Scanner(System.in);
        int attempts = 0;

        System.out.println("I picked a number from 1 to 100. Guess it!");

        while (true) {
            System.out.print("Your guess: ");
            int guess = sc.nextInt();
            attempts++;

            if (guess < target) {
                System.out.println("Higher!");
            } else if (guess > target) {
                System.out.println("Lower!");
            } else {
                System.out.println("Correct! You got it in " + attempts + " tries.");
                break;
            }
        }

        sc.close();
    }
}`,
      },
    ],
  },

  // ============ 3. FizzBuzz ============
  {
    id: "proj-fizzbuzz",
    slug: "fizzbuzz",
    level: "easy",
    titleEn: "FizzBuzz",
    titleFa: "FizzBuzz",
    descEn: "The classic interview question — master loops and conditionals",
    descFa: "سوال کلاسیک مصاحبه — حلقه و شرط را مسلط شو",
    xp: 40,
    duration: 10,
    conceptsEn: ["for loop", "modulo operator %", "if/else if/else", "String concatenation"],
    conceptsFa: ["حلقه for", "عملگر باقیمانده %", "if/else if/else", "الحاق رشته"],
    steps: [
      {
        stepEn: "Loop from 1 to 100 with a for loop.",
        stepFa: "با حلقه for از ۱ تا ۱۰۰ حلقه بزن.",
        code: `for (int i = 1; i <= 100; i++) { ... }`,
      },
      {
        stepEn: "If the number is divisible by 3 (i % 3 == 0), print 'Fizz'.",
        stepFa: "اگر عدد بر ۳ بخش‌پذیر است (i % 3 == 0)، چاپ کن 'Fizz'.",
      },
      {
        stepEn: "If divisible by 5 (i % 5 == 0), print 'Buzz'.",
        stepFa: "اگر بر ۵ بخش‌پذیر است (i % 5 == 0)، چاپ کن 'Buzz'.",
      },
      {
        stepEn: "If divisible by BOTH 3 and 5, print 'FizzBuzz'. Watch the order!",
        stepFa: "اگر بر هر دو ۳ و ۵ بخش‌پذیر است، چاپ کن 'FizzBuzz'. ترتیب را رعایت کن!",
        hintEn: "Check FizzBuzz FIRST, otherwise Fizz will catch it.",
        hintFa: "اول FizzBuzz را چک کن، وگرنه Fizz آن را می‌گیرد.",
      },
      {
        stepEn: "Otherwise, print the number itself.",
        stepFa: "در غیر این صورت، خود عدد را چاپ کن.",
      },
    ],
    solution: [
      {
        name: "FizzBuzz.java",
        content: `public class FizzBuzz {
    public static void main(String[] args) {
        for (int i = 1; i <= 100; i++) {
            if (i % 3 == 0 && i % 5 == 0) {
                System.out.println("FizzBuzz");
            } else if (i % 3 == 0) {
                System.out.println("Fizz");
            } else if (i % 5 == 0) {
                System.out.println("Buzz");
            } else {
                System.out.println(i);
            }
        }
    }
}`,
      },
    ],
  },
];
