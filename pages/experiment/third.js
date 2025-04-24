import {useRouter} from "next/router";

export default function Third() {
    const router = useRouter();

    const handleSubmit = (e) => {
        router.push('/experiment/third_chat');
    };

    return (
        <main className="third_main">
            <image className="third_background" src="/global/background.png"/>
            <image className="third_status" src="/global/status.png"/>
            <image className="third_center" src="/third/center.png"/>
            <image onClick={handleSubmit} className="third_button" src="/global/button.png"/>
        </main>
    );
}