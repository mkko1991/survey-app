// pages/index.js
import {useRouter} from "next/router";
import {useEffect} from "react";

export async function getServerSideProps() {
    return {
        props: {
            now: new Date().toISOString(),
        },
    };
}

export default function Home() {
    const router = useRouter();
    useEffect(() => {
        router.replace('/survey/greetings');
    }, []);
    return (
        <main>
            <p>현재 시간: {now}</p>
            <p>리디렉션 중입니다...</p>
        </main>
    );
}