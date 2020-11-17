import { dbContext } from '../db/DbContext'
import Note from '../models/Notes'
import { BadRequest } from '../utils/Errors'

class NoteService {
  async getNotes(id) {
    const data = await dbContext.Notes.find({ bugId: id }).populate('bugId').populate('profile')
    return data
  }
  async postNote(body) {
    return await dbContext.Notes.create(body)
  }
  async editNote(id, body) {
    return await dbContext.Notes.findByIdAndUpdate(id, body, { new: true })
  }
  async removeNote(bugId, userId) {
    const noteProfile = await dbContext.Notes.find({ bugId: bugId })
    // @ts-ignore
    if (userId === noteProfile.profile) {
      if (!Note) {
      await dbContext.Notes.findByIdAndDelete(bugId)
        throw new BadRequest('no note by this Id')
      } return this.getNotes()
    } throw new BadRequest('Access Denied')
  }
}
export const noteService = new NoteService()
