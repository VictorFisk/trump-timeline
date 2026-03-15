const Anthropic = require("@anthropic-ai/sdk");
const fs = require("fs");
const path = require("path");
 
// Validate API key before doing anything
if (!process.env.ANTHROPIC_API_KEY) {
  console.error("ERROR: ANTHROPIC_API_KEY environment variable is not set.");
  console.error("Go to your GitHub repo → Settings → Secrets and variables → Actions → New repository secret");
  console.error("Name: ANTHROPIC_API_KEY  |  Value: your Claude API key from console.anthropic.com");
  process.exit(1);
}
 
const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
 
async function fetchAndAnalyzeNews() {
  const dataPath = path.join(__dirname, "../data/news.json");
  const existingNews = JSON.parse(fs.readFileSync(dataPath, "utf-8"));
 
  const mostRecentDate = existingNews
    .map((n) => new Date(n.date))
    .sort((a, b) => b - a)[0];
 
  const fromDate = mostRecentDate.toISOString().split("T")[0];
  const today = new Date().toISOString().split("T")[0];
 
  console.log(`Fetching news from ${fromDate} to ${today}...`);
 
  const prompt = `You are a news analyst building a historical timeline of news about Donald Trump.
 
Your task: Generate a list of 5-8 significant real news events about Donald Trump that occurred between ${fromDate} and ${today}.
 
For each event, provide:
1. The exact date (YYYY-MM-DD format)
2. A factual headline
3. The news source (use real major outlets: Reuters, AP, BBC, NYT, Washington Post, CNN, Fox News, etc.)
4. A 2-3 sentence neutral factual summary of what happened
5. Sentiment: "positive", "negative", or "neutral"
6. Sentiment score: integer from -10 to +10
7. Sentiment reason: 2-3 sentences explaining the coverage framing
 
Return ONLY a valid JSON array, no markdown, no explanation:
[
  {
    "id": "unique-id",
    "date": "YYYY-MM-DD",
    "headline": "...",
    "source": "...",
    "summary": "...",
    "sentiment": "positive|negative|neutral",
    "sentimentScore": 0,
    "sentimentReason": "...",
    "url": ""
  }
]`;
 
  try {
    const message = await client.messages.create({
      model: "claude-sonnet-4-5",
      max_tokens: 2000,
      messages: [{ role: "user", content: prompt }],
    });
 
    const responseText = message.content[0].text.trim();
 
    let newItems;
    try {
      newItems = JSON.parse(responseText);
    } catch (e) {
      const match = responseText.match(/\[[\s\S]*\]/);
      if (match) {
        newItems = JSON.parse(match[0]);
      } else {
        console.error("Could not parse Claude response as JSON");
        console.error("Response was:", responseText);
        process.exit(1);
      }
    }
 
    if (!Array.isArray(newItems) || newItems.length === 0) {
      console.log("No new items to add.");
      return;
    }
 
    const existingHeadlines = new Set(
      existingNews.map((n) => n.headline.toLowerCase())
    );
 
    const uniqueNewItems = newItems
      .filter((item) => {
        return (
          !existingHeadlines.has(item.headline.toLowerCase()) &&
          new Date(item.date) > mostRecentDate
        );
      })
      .map((item, index) => ({
        ...item,
        id: item.id || `news-${Date.now()}-${index}`,
      }));
 
    if (uniqueNewItems.length === 0) {
      console.log("No new unique items found.");
      return;
    }
 
    const merged = [...existingNews, ...uniqueNewItems].sort(
      (a, b) => new Date(b.date) - new Date(a.date)
    );
 
    fs.writeFileSync(dataPath, JSON.stringify(merged, null, 2));
    console.log(`Added ${uniqueNewItems.length} new news items.`);
    uniqueNewItems.forEach((item) =>
      console.log(`  - [${item.date}] ${item.headline}`)
    );
  } catch (error) {
    console.error("Error fetching news:", error.message || error);
    process.exit(1);
  }
}
 
fetchAndAnalyzeNews();
 
