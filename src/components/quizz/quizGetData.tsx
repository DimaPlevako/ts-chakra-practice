import React, { useEffect, useState } from "react";
import getQuizData from "components/quizz/api/quizApi";
import localQuizData from "components/quizz/data/quizData.json"; // adjust path as needed

type QuizParams = {
    limit?: number;
    category?: string;
    difficulty?: string;
};

type SourceType = "api" | "local";

const UseQuizData = (
    params?: QuizParams,
    source: SourceType = "api"
) => {
    const [quizData, setQuizData] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchQuizData = async () => {
            setLoading(true);
            setError(null);
            try {
                if (source === "local") {
                    setQuizData(localQuizData);
                } else {
                    const data = await getQuizData(params || {});
                    setQuizData(data);
                }
            } catch (err) {
                setError("Failed to load quiz data.");
            } finally {
                setLoading(false);
            }
        };

        fetchQuizData();
    }, [params, source]);

    return { quizData, loading, error };
};

export default UseQuizData;