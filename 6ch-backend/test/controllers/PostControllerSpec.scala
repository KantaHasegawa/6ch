import org.scalatestplus.play._
import org.scalatestplus.play.guice._
import play.api.libs.json.{ JsResult, Json }
import play.api.mvc.{ RequestHeader, Result }
import play.api.test._
import play.api.test.Helpers._
import play.api.test.CSRFTokenHelper._
import models.Post
import scala.concurrent.Future
import com.fasterxml.jackson.annotation.JsonValue
import play.api.libs.json.JsValue
import play.api.inject.guice.GuiceApplicationBuilder

class PostControllerSpec extends PlaySpec with GuiceOneAppPerTest {

  override def fakeApplication() =
    new GuiceApplicationBuilder()
      .configure(
        "db.default.driver" -> "org.h2.Driver",
        "db.default.url" -> "jdbc:h2:mem:test;MODE=MYSQL")
      .build()

  "PostControllerSpec" should {
    "FunctionalTest" in {

    val threadBody: JsValue = Json.parse(s"""
      {
        "title": "post_test_thread"
      }
      """)

      var threadRequest = FakeRequest(POST, "/thread/new").withHeaders(HOST -> "localhost:9000").withJsonBody(threadBody).withCSRFToken
      val threadResult:Future[Result] = route(app, threadRequest).get
      val resultJson = contentAsJson(threadResult)
      val id = resultJson("id")

      val postBody: JsValue = Json.parse(s"""
      {
        "userName": "test_user",
        "content": "test_content",
        "threadId": $id
      }
      """)

      var newRequest = FakeRequest(POST, "/post/new").withHeaders(HOST -> "localhost:9000").withJsonBody(postBody).withCSRFToken
      val result:Future[Result] = route(app, newRequest).get
      val resultStatus: Int       = status(result)
      resultStatus mustBe 200
      var indexRequest = FakeRequest(GET, s"/posts/$id").withHeaders(HOST -> "localhost:9000").withCSRFToken
      val indexResult:Future[Result] = route(app, indexRequest).get
      val posts: Seq[Post] = Json.fromJson[Seq[Post]](contentAsJson(indexResult)).get
      posts.last.userName mustBe "test_user"
    }
  }
}
