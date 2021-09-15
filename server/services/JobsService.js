import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'

class JobsService {
  async getJobs() {
    const jobs = await dbContext.Job.find()
    return jobs
  }

  async getJobById(jobId) {
    const job = await dbContext.Job.findById(jobId)
    if (!job) {
      throw new BadRequest('Invalid Job Id')
    } return job
  }

  async createJob(jobData) {
    const job = await dbContext.Job.create(jobData)
    return job
  }

  async removeHouse(jobId) {
    const job = await this.getJobById(jobId)
    await job.remove()
    return job
  }

  async editJob(jobId, userId, jobData) {
    const job = await this.getJobById(jobId)
    if (userId !== job.creatorId.toString()) {
      throw new BadRequest('This is Bad')
    }
    job.jobTitle = jobData.jobTitle || job.jobTitle
    job.company = jobData.company || job.company
    job.rate = jobData.rate || job.rate
    job.hours = jobData.hours || job.hours
    job.description = jobData.description || job.description
    job.creatorId = jobData.creatorId || job.creatorId
    job.jobTitle = jobData.jobTitle || job.jobTitle
    await job.save()
    return job
  }
}

export const jobsService = new JobsService()
