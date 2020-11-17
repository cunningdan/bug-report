import { Auth0Provider } from '@bcwdev/auth0provider'
import { noteService } from '../services/NoteService'
import BaseController from '../utils/BaseController'
import { bugService } from '../services/BugService'
export class BugController extends BaseController {
  constructor() {
    super('api/bugs')
    this.router
    .use(Auth0Provider.getAuthorizedUserInfo)
    .get('', this.getBugs)
    .post('', this.postBugs)
    .get('/:bugId/notes', this.getNotes)
    .get('/:bugId', this.getBugById)
    .delete('/:id/notes/:id', this.delete)

  }
  async postBugs(req, res, next) {
    try {
      req.body.profile = req.userInfo.id
      const data = await bugService.postBugs(req.body)
      res.send(data)
    } catch (err) {
      next(err)
    }
  }
  async delete(req, res, next) {
    try {
      res.send(await noteService.removeNote(req.params.bugId, req.userInfo.id))
    } catch (err) {
      next(err)
    }
  }
  async getBugs(req,res,next) {
    try {
      res.send(await bugService.getBugs(req.query))
    } catch(err) {
      next(err)
    }
  }
  async getNotes(req, res,next) {
    try{
      res.send(await noteService.getNotes(req.params.bugId))
    } catch(err) {
      next(err)
    }
  }
  async getBugById(req,res,next) {
    try {
      res.send(await bugService.getBugById(req.params.bugId))
    } catch(err) {
      next(err)
    }
  }
}
