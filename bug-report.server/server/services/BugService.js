import { dbContext } from '../db/DbContext'

class BugService {
  async getBugs(query = {}) {
      return await dbContext.Bugs.find(query).populate('profile')
  }
  async postBugs(body) {
    return await dbContext.Bugs.create(body)
  }
  async editBug(id, body) {
    return await dbContext.Bugs.findByIdAndUpdate(id, body, { new: true })
  }
  async getBugById(id) {
   return await dbContext.Bugs.findById(id)
  }
}

export const bugService = new BugService()
