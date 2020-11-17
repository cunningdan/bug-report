import { noteService } from '../services/NoteService'
import  BaseController from '../utils/BaseController'
import { Auth0Provider } from '@bcwdev/auth0provider'

export class NoteController extends BaseController {
constructor() {
  super('api/notes')
  this.router
    .use(Auth0Provider.getAuthorizedUserInfo)
    .post('', this.postNote)

}
async postNote(req, res, next) {
  try {
    req.body.profile = req.userInfo.id
    res.send(await noteService.postNote(req.body))
  } catch(err) {
  next  (err)
    }
  }
}
