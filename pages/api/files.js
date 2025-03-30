import { promises as fs } from 'fs';
import path from 'path';

export default async function handler(req, res) {
    const { dir = '' } = req.query;

    try {
        // 상대 경로를 안전하게 제한
        const baseDir = path.join(process.cwd(), 'public'); // 기준 디렉토리
        const targetDir = path.join(baseDir, dir);

        // 보안 체크: 경로가 baseDir 밖으로 못 나가게
        if (!targetDir.startsWith(baseDir)) {
            return res.status(400).json({ error: 'Invalid directory' });
        }

        const entries = await fs.readdir(targetDir, { withFileTypes: true });
        const files = entries.filter(e => e.isFile()).map(e => path.join(dir, e.name));

        res.status(200).json(files);
    } catch (error) {
        res.status(500).json({ error: 'Directory read failed', details: error.message });
    }
}