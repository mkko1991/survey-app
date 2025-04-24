import {useRouter} from "next/router";
import {useEffect} from "react";
import {useSurveyStore} from "@/store/survey.js";

export default function Last() {
    const {
        email,
        phone,
        age,
        gender,
        job,
        answers,
        usageTime,
        emojiFreq,
        platforms,
        platformEtc,
        favoriteEmojis,
        recommendedEmojis,
    } = useSurveyStore();
    const router = useRouter();

    useEffect(async() => {
        const response = await fetch("/api/submit", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email,
                phone,
                data: {
                    age,
                    gender,
                    job,
                    answers,
                    usageTime,
                    emojiFreq,
                    platforms,
                    platformEtc,
                    favoriteEmojis,
                },
            }),
        });

        const result = await response.json();
    }, []);

    return (
        <main className="last_main">
            <img className="last_background" src="/global/background.png"/>
            <img className="last_status" src="/global/status.png"/>
            <img className="last_center" src="/last/center.png"/>
        </main>
    );
}