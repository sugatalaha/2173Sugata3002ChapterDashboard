import { Chapter } from "../model/chapter.model.js";
import redisClient from "../utils/redisClient.js";
import fs from "fs";

const uploadChapters = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: 'No file uploaded' });

    const fileData = fs.readFileSync(req.file.path, 'utf-8');
    const chapters = JSON.parse(fileData);

    const failed = [];
    const success = [];

    for (const data of chapters) {
      try {
        const chapter = new Chapter(data);
        await chapter.validate();
        await chapter.save();
        success.push(data);
      } catch (err) {
        failed.push({ chapter: data.chapter, error: err.message });
      }
    }

    fs.unlink(req.file.path, (err) => {
      if (err) {
        console.error('Failed to delete file:', err);
      } else {
        console.log('Temporary file deleted');
      }
    });

    // Flush all Redis keys using REST
    await redisClient.flushAll();

    res.json({ message: 'Upload complete', successCount: success.length, failed });
  } catch (err) {
    res.status(500).json({ message: 'Internal Server Error', error: err.message });
  }
};

const getChapters = async (req, res) => {
  try {
    const { class: className, unit, subject, page = 1, limit = 10, isWeakChapter, status } = req.query;
    const filter = {};
    if (className) filter.class = className;
    if (unit) filter.unit = unit;
    if (subject) filter.subject = subject;
    if (isWeakChapter === "true") filter.isWeakChapter = true;
    else if (isWeakChapter === "false") filter.isWeakChapter = false;
    if (status) filter.status = status;

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const [chapters, total] = await Promise.all([
      Chapter.find(filter).skip(skip).limit(parseInt(limit)),
      Chapter.countDocuments(filter),
    ]);

    const responseData = {
      total,
      page: parseInt(page),
      limit: parseInt(limit),
      results: chapters,
    };

    // Save to Redis via Upstash REST API
    const cacheKey = res.locals.cacheKey;
    if (cacheKey) {
      await redisClient.setEx(cacheKey, 3600, JSON.stringify(responseData)); // 1 hr TTL
    }

    return res.status(200).json(responseData);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving chapters', error: err.message });
  }
};

const getChapterForId = async (req, res) => {
  try {
    const { id } = req.params;
    const chapter = await Chapter.findById(id);
    return res.status(200).json({ chapter, message: "Chapter fetched successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};

export { uploadChapters, getChapters, getChapterForId };
