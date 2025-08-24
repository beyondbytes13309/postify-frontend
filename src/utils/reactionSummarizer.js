const reactionsEmojis = {
  1: ["👍", "Like"],
  2: ["👎", "Dislike"],
  3: ["💗", "Love"],
  4: ["😂", "Funny"],
  5: ["😮", "Surprised"],
  6: ["😢", "Sad"],
  7: ["😡", "Angry"],
  8: ["🧐", "Curious"],
  9: ["🤝", "Respect"],
  10: ["💡", "Insightful"],
};

const reactionSummarizer = (reactions) => {
  if (!Array.isArray(reactions) || reactions.length === 0) {
    return [];
  }

  const reactionNums = reactions
    .map((reaction) => Number(reaction))
    .filter((num) => num >= 1 && num <= 10);

  if (reactionNums.length === 0) {
    return [];
  }

  // Count each reaction
  const counts = {};
  for (const num of reactionNums) {
    counts[num] = (counts[num] || 0) + 1;
  }

  // Sort reactions by count descending
  const sortedReactions = Object.entries(counts)
    .sort((a, b) => b[1] - a[1]) // sort by count
    .slice(0, 3) // take top 3
    .map(([reaction]) => reactionsEmojis[Number(reaction)][0]); // map to emoji
  return sortedReactions;
};

export { reactionSummarizer }