import {useRouter} from "next/router";
import {useEffect} from "react";

export async function getServerSideProps() {
    console.log("SSR ENV VAR:", process.env.MY_AWS_ACCESS_KEY_ID); // 🔍 CloudWatch에 찍힘
    return {
        props: {
            now: new Date().toISOString(),
        },
    };
}

export default function Home({now}) {
    const router = useRouter();
    useEffect(() => {
        router.replace('/survey/greetings');
    }, []);
    return (
        <main>
            <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"/>
            <p>현재 시간: {now}</p>
            <p>리디렉션 중입니다...</p>
        </main>
    );
}