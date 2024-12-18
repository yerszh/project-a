import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function getUserAnswersAndQuestions(userQuizzesId: string) {
  try {
    // Fetch UserQuiz with its related UserQuestions and UserAnswers
    const userQuizData = await prisma.userQuiz.findUnique({
      where: {
        user_quizzes_id: userQuizzesId, // Filter by user_quizzes_id
      },
      include: {
        userQuestions: true, // Include related UserQuestions
        UserAnswer: true, // Include related UserAnswers
      },
    });

    return userQuizData;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

// Example usage
(async () => {
  const userQuizzesId = "some_user_quizzes_id";
  const data = await getUserAnswersAndQuestions(userQuizzesId);
  console.log(data);
})();
