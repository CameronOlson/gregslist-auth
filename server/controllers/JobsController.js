import { Auth0Provider } from '@bcwdev/auth0provider.'
import { dbContext } from '../db/DbContext'
import { jobsService } from '../services/CarsService'
import BaseController from '../utils/BaseController'

export class JobsController extends BaseController {
  constructor() {
    super('api/job')
    this.router
      .get('', this.getJobs)
      .get('/:jobId', this.getJob)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createJob)
      .delete('/:jobId', this.removeJob)
      .put('/:jobId', this.editJob)
  }

  async getJobs(req, res, next) {
    try {
      const jobs = await jobsService.getJobs()
      res.send(jobs)
    } catch (error) {
      next(error)
    }
  }

  async getJob(req, res, next) {
    try {
      const job = await jobsService.getJobById(req.params.jobId)
      res.send(job)
    } catch (error) {
      next(error)
    }
  }

  async createJob(req, res, next) {
    try {
      const job = await jobsService.createJob(req.body)
      res.send(job)
    } catch (error) {
      next(error)
    }
  }

  async removeJob(req, res, next) {
    try {
      const job = await jobsService.removeJob(req.params.jobsId, req.userInfo.id, req.body)
      res.send(job)
    } catch (error) {
      next(error)
    }
  }

  async editJob(req, res, next) {
    try {
      const job = await jobsService.editJob(req.params.jobId, req.userInfo.id, res.body)
      res.send(job)
    } catch (error) {
      next(error)
    }
  }
}
