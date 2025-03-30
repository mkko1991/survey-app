export async function getServerSideProps() {
    return {
        redirect: {
            destination: '/survey/greetings', // 또는 네가 원하는 메인 페이지
            permanent: false,
        },
    };
}

export default function Home() {
   return null;
}