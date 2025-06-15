import express from 'express';
import ffmpeg from 'fluent-ffmpeg';
import { PrismaClient } from '@prisma/client';
import { generateMetadata } from '../services/generateMetadata.js';

const metadatarouter = express.Router();
const prisma = new PrismaClient();

metadatarouter.post('/generate/:videoId', async (req, res) => {
  try {
    const { videoId } = req.params;
    const video = await prisma.video.findUnique({
      where: { id: Number(videoId) },
    });

    if (!video) {
      return res.status(404).json({ error: 'Video not found' });
    }

    const thumbnailPath = `uploads/thumb-${videoId}.jpg`;
 return res.json({thumbnailPath})
    await new Promise((resolve, reject) => {
      ffmpeg(video.filePath)
        .screenshots({
          count: 1,
          folder: 'uploads',
          filename: `thumb-${videoId}.jpg`,
        })
        .on('end', resolve)
        .on('error', reject);
    });

    const metadata = await generateMetadata();

    const updated = await prisma.video.update({
      where: { id: Number(videoId) },
      data: {
        thumbnail: thumbnailPath,
        title: metadata.title || 'Untitled',
        description: metadata.description || 'No description',
        hashtags: metadata.hashtags || [],
      },
    });

    res.json({
      thumbnail: updated.thumbnail,
      title: updated.title,
      description: updated.description,
      hashtags: updated.hashtags,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Metadata generation failed' });
  }
});

export default metadatarouter;
