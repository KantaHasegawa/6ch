package controllers

import javax.inject._
import play.api._
import play.api.mvc._
import scalikejdbc._
import models.Post
import play.api.libs.json._
import play.api.data.Forms._
import play.api.data.Form
import validations._
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

case class PostFormInput(userName: String, content: String, threadId: Int)

@Singleton
class PostController @Inject()(val controllerComponents: ControllerComponents) extends BaseController {

  implicit val session: DBSession = AutoSession

  val logger = LoggerFactory.getLogger(getClass)

  private val form: Form[PostFormInput] = {
    Form(
      mapping(
        "userName" -> text,
        "content" -> text,
        "threadId" -> number
      )(PostFormInput.apply)(PostFormInput.unapply)
    )
  }

  def index(threadId: String) = Action { implicit request: Request[AnyContent] =>
    try{
      val result = Post.findAllBy(sqls"thread_id = ${threadId}")
      Ok(Json.toJson(result))
    }catch{
      case error: Throwable => {
        logger.error(error.getMessage())
        InternalServerError("Sorry, Server Error")
      }
    }
  }

  def count(threadId: String) = Action { implicit request: Request[AnyContent] =>
    try{
      val result = Post.countBy(sqls"thread_id = ${threadId}")
      Ok(Json.toJson(result))
    }catch{
      case error: Throwable => {
        logger.error(error.getMessage())
        InternalServerError("Sorry, Server Error")
      }
    }
  }

  def create() = Action { implicit request: Request[AnyContent] =>
      form.bindFromRequest().fold(
      formWithErrors => {
        BadRequest("Bad Request")
      },
      postData => {
        try{
          PostValidation.isActive(postData)
          val userName = if(postData.userName == "") "名無しさん" else postData.userName
          val resultId = Post.create(userName, postData.content, postData.threadId)
          Ok(Json.obj({"id" -> resultId}))
        }catch{
          case error: Throwable => {
            logger.error(error.getMessage())
            InternalServerError("Sorry, Server Error")
          }
        }
      }
    )
  }
}
