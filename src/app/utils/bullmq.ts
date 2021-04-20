import { Queue } from 'bullmq';

export const removeRepeatableByName = async (
  queue: Queue,
  name: string,
) => {
  const repeatableJobs = await queue.getRepeatableJobs();
  const jobs = repeatableJobs.filter((job) => job.name === name);

  if (jobs.length) {
    await Promise.all(jobs.map((job) => queue.removeRepeatableByKey(job.key)));
  }
};

