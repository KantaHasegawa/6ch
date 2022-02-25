import org.scalatestplus.play._
import org.scalatestplus.play.guice._
import play.api.libs.json.{ JsResult, Json }
import play.api.mvc.{ RequestHeader, Result }
import play.api.test._
import play.api.test.Helpers._
import play.api.test.CSRFTokenHelper._
import models.Thread
import scala.concurrent.Future
import com.fasterxml.jackson.annotation.JsonValue
import play.api.libs.json.JsValue
import play.api.inject.guice.GuiceApplicationBuilder


class ThreadControllerSpec extends PlaySpec with GuiceOneAppPerTest {

  override def fakeApplication() =
  new GuiceApplicationBuilder()
    .configure(
      "db.default.driver" -> "org.h2.Driver",
      "db.default.url" -> "jdbc:h2:mem:test;MODE=MYSQL")
    .build()

  "ThreadControllerSpec" should {
    "FunctionalTest" in {

      val threadBody: JsValue = Json.parse(s"""
      {
        "title": "test_thread"
      }
      """)

      val newRequest = FakeRequest(POST, "/thread/new").withHeaders(HOST -> "localhost:9000").withJsonBody(threadBody).withCSRFToken
      val newResult:Future[Result] = route(app, newRequest).get
      val newResultStatus = status(newResult)
      newResultStatus mustBe 200

      val indexRequest = FakeRequest(GET, "/threads").withHeaders(HOST -> "localhost:9000").withCSRFToken
      val indexResult:Future[Result] = route(app, indexRequest).get
      val threads: Seq[Thread] = Json.fromJson[Seq[Thread]](contentAsJson(indexResult)).get
      threads.last.title mustBe "test_thread"
    }
  }
}
