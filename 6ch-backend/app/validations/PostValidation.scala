package validations

import models._
import scalikejdbc._
import controllers.PostFormInput

object PostValidation {
  implicit val session: DBSession = AutoSession

  def isActive(post: PostFormInput):Unit = {
    val thread = Thread.find(post.threadId)
    thread match {
        case None => throw new Error("Thread not found")
        case Some(value) => {
          if(!value.active) throw new Error("Thread is not active")
        }
      }
    }
}
