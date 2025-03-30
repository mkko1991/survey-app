/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',         // ✅ 정적 export 필수 설정
    trailingSlash: true,      // ✅ 각 페이지 경로에 `/` 붙게 함 (정적 라우팅에 좋음)
    reactStrictMode: true,    // (선택) 개발 경고
    swcMinify: true           // (선택) 빌드 속도 개선
};

module.exports = nextConfig;