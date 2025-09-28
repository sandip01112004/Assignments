// src/utils/scoreCalculator.js
/**
 * scoreCalculator
 * @param {Array} questions - array of question objects from DB, each must contain _id (as string/object), correctIndex (number)
 * @param {Array} answers - array of { questionId: string, selectedIndex: number } (user-submitted)
 *
 * Returns:
 * {
 *   score: Number,
 *   total: Number,
 *   details: [
 *     { questionId, selectedIndex, correctIndex, isCorrect }
 *   ]
 * }
 */
function scoreCalculator(questions, answers) {
  // Normalize questions map by id string
  const qMap = new Map();
  for (const q of questions) {
    qMap.set(String(q._id), q);
  }

  const details = [];
  let score = 0;
  const total = questions.length;

  // Build answers map for quick lookup (last answer wins if duplicates)
  const aMap = new Map();
  if (Array.isArray(answers)) {
    for (const a of answers) {
      if (!a || !a.questionId) continue;
      aMap.set(String(a.questionId), a.selectedIndex);
    }
  }

  // Iterate over all quiz questions to ensure unanswered are treated as wrong
  for (const q of questions) {
    const qid = String(q._id);
    const correctIndex = Number(q.correctIndex);
    const selectedIndex = aMap.has(qid) ? aMap.get(qid) : null;
    const isCorrect = typeof selectedIndex === 'number' && selectedIndex === correctIndex;
    if (isCorrect) score += 1;
    details.push({
      questionId: qid,
      selectedIndex: selectedIndex,
      correctIndex,
      isCorrect
    });
  }

  return { score, total, details };
}

module.exports = scoreCalculator;
