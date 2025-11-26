import React, { useState } from "react";

const ARTICLES = [
  {
    id: 1,
    title: "Understanding JavaScript Closures",
    content:
      "A closure is the combination of a function and the lexical environment within which that function was declared.",
  },
  {
    id: 2,
    title: "React Hooks Guide",
    content:
      "React Hooks let you use state and other React features without writing a class.",
  },
  {
    id: 3,
    title: "Learning Node.js",
    content:
      "Node.js is a JavaScript runtime built on Chrome's V8 JavaScript engine.",
  },
  {
    id: 4,
    title: "CSS Grid vs Flexbox",
    content:
      "Both Grid and Flexbox are powerful layout systems in CSS but are used for different purposes.",
  },
];


const countMatches = (articles, query) => {
  if (!query) return 0;

  const regex = new RegExp(query, "gi");
  let total = 0;

  articles.forEach((article) => {
    const titleMatches = article.title.match(regex);
    const contentMatches = article.content.match(regex);

    if (titleMatches) total += titleMatches.length;
    if (contentMatches) total += contentMatches.length;
  });

  return total;
};

function App() {
  const [query, setQuery] = useState("");

  const highlightText = (text, query) => {
    if (!query) return text;

    const regex = new RegExp(`(${query})`, "gi");
    return text.replace(regex, "<mark>$1</mark>");
  };

  const filtered = ARTICLES.filter(
    (item) =>
      item.title.toLowerCase().includes(query.toLowerCase()) ||
      item.content.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="container">
      <h2>Search</h2>

      <input
        className="search-box"
        type="text"
        placeholder="Search..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      
      {query && (
        <div style={{ marginBottom: "15px", fontWeight: "bold" }}>
          Total matches: {countMatches(filtered, query)}
        </div>
      )}

      <div className="results">
        {filtered.map((item) => (
          <div key={item.id} className="article">
            <h3
              dangerouslySetInnerHTML={{
                __html: highlightText(item.title, query),
              }}
            />
            <p
              dangerouslySetInnerHTML={{
                __html: highlightText(item.content, query),
              }}
            />
          </div>
        ))}

        {filtered.length === 0 && query !== "" && <p>No results found.</p>}
      </div>
    </div>
  );
}

export default App;
