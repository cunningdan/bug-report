import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'

class BugService {
  async getBugs(query = {}) {
      return await dbContext.Bugs.find(query).populate('profile')
  }
  async postBugs(body) {
    return await dbContext.Bugs.create(body)
  }
  async editBug(id, body) {
    const bugResults = await dbContext.Bugs.findById(id)
    if (bugResults.closed == false) {
      return await dbContext.Bugs.findByIdAndUpdate(id, body, { new: true })
    } else {
      throw new BadRequest('Cannot edit closed bugs')
    }
  }
  async getBugById(id) {
   return await dbContext.Bugs.findById(id)
  }
}

export const bugService = new BugService()
