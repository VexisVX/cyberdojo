import { Lesson } from "../../types/lesson";

export const proLessons: Lesson[] = [
  {
    id: "pro-xss",
    slug: "xss",
    title: "Cross-Site Scripting (XSS)",
    description: "How attackers inject JavaScript into pages",
    category: "pro",
    duration: 15,
    xp: 35,
    blocks: [
      { type: "heading", content: "What is XSS?" },
      { type: "paragraph", content: "XSS happens when untrusted user input ends up in the page as HTML/JS without proper escaping. The attacker's script runs in the victim's browser with full access to cookies, tokens, and the DOM." },
      { type: "heading", content: "Three Types" },
      { type: "list", items: [
        "Reflected — payload in URL, echoed back instantly",
        "Stored — payload saved in DB, shown to every visitor",
        "DOM-based — client-side JS writes input to innerHTML",
      ]},
      { type: "heading", content: "Vulnerable Code" },
      { type: "code", lang: "javascript", content: "// DANGEROUS\ndocument.getElementById(\"out\").innerHTML = userInput;\n\n// SAFE\ndocument.getElementById(\"out\").textContent = userInput;" },
      { type: "callout", variant: "danger", content: "Never trust user input. Always escape output based on context: HTML, attribute, JS, CSS, URL — each needs different escaping." },
    ],
  },
  {
    id: "pro-sqli",
    slug: "sql-injection",
    title: "SQL Injection",
    description: "When user input escapes into SQL queries",
    category: "pro",
    duration: 15,
    xp: 35,
    blocks: [
      { type: "heading", content: "The Classic Attack" },
      { type: "paragraph", content: "If you build SQL by string concatenation, a user can inject their own SQL. The famous OR 1=1 trick bypasses login forms." },
      { type: "code", lang: "sql", content: "-- Vulnerable query\nSELECT * FROM users WHERE username = 'admin' AND password = '' OR 1=1 -- '" },
      { type: "heading", content: "The Fix: Prepared Statements" },
      { type: "code", lang: "javascript", content: "// SAFE\nconst q = \"SELECT * FROM users WHERE username = ? AND password = ?\";\ndb.query(q, [username, password]);" },
      { type: "callout", variant: "success", content: "Parameterized queries make SQL injection impossible because the SQL structure is fixed before values are inserted." },
    ],
  },
];
