import { api } from './AxiosService'
import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
class NoteService {
  async getNotes(bugId) {
    try {
      const res = await api.get('/api/bugs/' + bugId + '/notes')
      AppState.notes = res.data
      console.log(res.data)
    } catch (err) {
      logger.error(err)
    }
  }

  async postNote(noteData) {
    try {
      const res = await api.post('/api/notes', noteData)
      this.getNotes(noteData.bugId)
      console.log(res.data)
    } catch (err) {
      logger.error(err)
    }
  }
}
export const noteService = new NoteService()
