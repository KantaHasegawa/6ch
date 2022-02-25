package controllers

import javax.inject._
import play.api._
import play.api.mvc._
import scalikejdbc._
import models.Thread
import play.api.libs.json._
import play.api.data.Forms._
import play.api.data.Form
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

case class ThreadFormInput(title: String)

@Singleton
class ThreadController @Inject()(val controllerComponents: ControllerComponents) extends BaseController {

  val PageRange = 30

  implicit val session: DBSession = AutoSession

  val logger = LoggerFactory.getLogger(getClass)

  private val form: Form[ThreadFormInput] = {
    Form(
      mapping(
        "title" -> text
      )(ThreadFormInput.apply)(ThreadFormInput.unapply)
    )
  }

  def index() = Action { implicit request: Request[AnyContent] =>
    try{
      val result = Thread.findAll(sqls"t.active=true")
      Ok(Json.toJson(result))
    }catch{
      case error: Throwable => {
        logger.error(error.getMessage())
        InternalServerError("Sorry, Server Error")
      }
    }
  }

    def show(id: String) = Action { implicit request: Request[AnyContent] =>
    try{
      val result = Thread.find(id.toInt)
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
      threadData => {
        try{
          val resultId = Thread.create(threadData.title)
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

  def indexNotActive(page: String) = Action { implicit request: Request[AnyContent] =>
    try{
      val intPage = page.toInt
      val offset = (intPage * PageRange) - PageRange
      val result = Thread.findLimitOffset(PageRange, offset)
      Ok(Json.toJson(result))
    }catch{
      case error: Throwable => {
        logger.error(error.getMessage())
        InternalServerError("Sorry, Server Error")
      }
    }
  }

  def countNotActivePages() = Action { implicit request: Request[AnyContent] =>
    try{
      val result = Thread.countBy(sqls"active=false")
      var pages = result.toInt / PageRange
      if(0 < result.toInt % PageRange){
        pages += 1
      }
      val response: JsValue = Json.parse(s"""
        {
          "pages": ${pages}
        }
        """)
      Ok(response)
    }catch{
      case error: Throwable => {
        logger.error(error.getMessage())
        InternalServerError("Sorry, Server Error")
      }
    }
  }
}
