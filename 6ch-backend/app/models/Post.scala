package models

import scalikejdbc._
import java.time.{ZonedDateTime}
import play.api.libs.json._
import play.api.libs.functional.syntax._

case class Post(
  id: Int,
  userName: String,
  content: String,
  createdAt: ZonedDateTime,
  threadId: Int) {

  def save()(implicit session: DBSession): Post = Post.save(this)(session)

  def destroy()(implicit session: DBSession): Int = Post.destroy(this)(session)

}

object Post extends SQLSyntaxSupport[Post] {

  val MaxPost = 15
  override val tableName = "post"

  override val columns = Seq("id", "user_name", "content", "created_at", "thread_id")

  def apply(p: SyntaxProvider[Post])(rs: WrappedResultSet): Post = apply(p.resultName)(rs)
  def apply(p: ResultName[Post])(rs: WrappedResultSet): Post = new Post(
    id = rs.get(p.id),
    userName = rs.get(p.userName),
    content = rs.get(p.content),
    createdAt = rs.get(p.createdAt),
    threadId = rs.get(p.threadId)
  )

  def readConstructor( id: Int, userName: String, content: String, createdAt: ZonedDateTime, threadId: Int) =
    new Post(id, userName, content, createdAt, threadId)

  val p = Post.syntax("p")

  override val autoSession = AutoSession

  implicit val postWrites = new Writes[Post] {
    def writes(post: Post) = Json.obj(
      "id" -> post.id,
      "userName" -> post.userName,
      "content" -> post.content,
      "createdAt" -> post.createdAt,
      "threadId" -> post.threadId
    )
  }

  implicit val postReads: Reads[Post] =
    (
      (JsPath \ "id").read[Int] and
      (JsPath \ "userName").read[String] and
      (JsPath \ "content").read[String] and
      (JsPath \ "createdAt").read[ZonedDateTime] and
      (JsPath \ "threadId").read[Int]
    )(Post.readConstructor _)

  def find(id: Int)(implicit session: DBSession): Option[Post] = {
    withSQL {
      select.from(Post as p).where.eq(p.id, id)
    }.map(Post(p.resultName)).single().apply()
  }

  def findAll()(implicit session: DBSession): List[Post] = {
    withSQL(select.from(Post as p)).map(Post(p.resultName)).list().apply()
  }

  def countAll()(implicit session: DBSession): Long = {
    withSQL(select(sqls.count).from(Post as p)).map(rs => rs.long(1)).single().apply().get
  }

  def findBy(where: SQLSyntax)(implicit session: DBSession): Option[Post] = {
    withSQL {
      select.from(Post as p).where.append(where)
    }.map(Post(p.resultName)).single().apply()
  }

  def findAllBy(where: SQLSyntax)(implicit session: DBSession): List[Post] = {
    withSQL {
      select.from(Post as p).where.append(where).orderBy(p.createdAt).asc
    }.map(Post(p.resultName)).list().apply()
  }

  def countBy(where: SQLSyntax)(implicit session: DBSession): Long = {
    withSQL {
      select(sqls.count).from(Post as p).where.append(where)
    }.map(_.long(1)).single().apply().get
  }

  def create(
    userName: String,
    content: String,
    threadId: Int)(implicit session: DBSession): Int = {
    val generatedKey = withSQL {
      insert.into(Post).namedValues(
        column.userName -> userName,
        column.content -> content,
        column.threadId -> threadId
      )
    }.updateAndReturnGeneratedKey().apply()
    deactivate(threadId, session)

    generatedKey.toInt
  }

  private def deactivate(threadId: Int, session: DBSession): Unit = {
    implicit val implicitSession: DBSession = session

    val postCount = countBy(sqls"thread_id=${threadId}")
    if(MaxPost <= postCount){
      sql"UPDATE thread SET active=false WHERE id=${threadId}".update().apply()
    }
  }

  def save(entity: Post)(implicit session: DBSession): Post = {
    withSQL {
      update(Post).set(
        column.id -> entity.id,
        column.userName -> entity.userName,
        column.content -> entity.content,
        column.createdAt -> entity.createdAt,
        column.threadId -> entity.threadId
      ).where.eq(column.id, entity.id)
    }.update().apply()
    entity
  }

  def destroy(entity: Post)(implicit session: DBSession): Int = {
    withSQL { delete.from(Post).where.eq(column.id, entity.id) }.update().apply()
  }
}
