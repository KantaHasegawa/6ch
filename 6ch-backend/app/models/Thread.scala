package models

import scalikejdbc._
import java.time.{ZonedDateTime}
import play.api.libs.json._
import play.api.libs.functional.syntax._

case class Thread(
  id: Int,
  title: String,
  createdAt: ZonedDateTime,
  active: Boolean) {

  def save()(implicit session: DBSession): Thread = Thread.save(this)(session)

  def destroy()(implicit session: DBSession): Int = Thread.destroy(this)(session)

}

object Thread extends SQLSyntaxSupport[Thread] {

  val MaxActive = 30

  override val tableName = "thread"

  override val columns = Seq("id", "title", "created_at", "active")

  def apply(t: SyntaxProvider[Thread])(rs: WrappedResultSet): Thread = apply(t.resultName)(rs)
  def apply(t: ResultName[Thread])(rs: WrappedResultSet): Thread = new Thread(
    id = rs.get(t.id),
    title = rs.get(t.title),
    createdAt = rs.get(t.createdAt),
    active = rs.get(t.active)
  )

  def readConstructor( id: Int, title: String, createdAt: ZonedDateTime, active: Boolean) = new Thread(id, title, createdAt, active)

  val t = Thread.syntax("t")
  val p = Post.syntax("p")

  override val autoSession = AutoSession

  implicit val threadWrites = new Writes[Thread] {
    def writes(thread: Thread) = Json.obj(
      "id" -> thread.id,
      "title" -> thread.title,
      "createdAt" -> thread.createdAt,
      "active" -> thread.active
    )
  }

  implicit val threadReads: Reads[Thread] =
  (
    (JsPath \ "id").read[Int] and
    (JsPath \ "title").read[String] and
    (JsPath \ "createdAt").read[ZonedDateTime] and
    (JsPath \ "active").read[Boolean]
  )(Thread.readConstructor _)

  def find(id: Int)(implicit session: DBSession): Option[Thread] = {
    withSQL {
      select.from(Thread as t).where.eq(t.id, id)
    }.map(Thread(t.resultName)).single().apply()
  }

  def findAll(where: SQLSyntax)(implicit session: DBSession) = {
    withSQL(select(t.id, t.title, t.createdAt, t.active).from(Thread as t).innerJoin(Post as p).on(t.id, p.threadId).where(where).groupBy(p.threadId).orderBy(SQLSyntax.max(p.createdAt)).desc).map { rs =>
    Thread(rs.int("id"), rs.string("title"), rs.zonedDateTime("created_at"), rs.boolean("active"))
  }.list().apply()
  }

  def findLimitOffset(limit: Int, offset: Int)(implicit session: DBSession) = {
    withSQL{
    select.from(Thread as t).where.eq(t.active, false).orderBy(t.createdAt.desc).limit(limit).offset(offset)
  }.map(Thread(t.resultName)).list().apply()
  }

  def countAll()(implicit session: DBSession): Long = {
    withSQL(select(sqls.count).from(Thread as t)).map(rs => rs.long(1)).single().apply().get
  }

  def findBy(where: SQLSyntax)(implicit session: DBSession): Option[Thread] = {
    withSQL {
      select.from(Thread as t).where.append(where)
    }.map(Thread(t.resultName)).single().apply()
  }

  def findAllBy(where: SQLSyntax)(implicit session: DBSession): List[Thread] = {
    withSQL {
      select.from(Thread as t).where.append(where)
    }.map(Thread(t.resultName)).list().apply()
  }

  def countBy(where: SQLSyntax)(implicit session: DBSession): Long = {
    withSQL {
      select(sqls.count).from(Thread as t).where.append(where)
    }.map(_.long(1)).single().apply().get
  }

  def create(title: String)(implicit session: DBSession) = {
    val generatedKey = withSQL {
      insert.into(Thread).namedValues(
        column.title -> title
      )
    }.updateAndReturnGeneratedKey().apply()
    compression(session)

    generatedKey.toInt
  }

  private def compression(session: DBSession): Unit = {
    implicit val implicitSession:DBSession = session
    val activeThreadsCount = countBy(sqls"active=true")
    if(activeThreadsCount > MaxActive){
      val oldThread =
        withSQL{
          select(t.id, t.title, t.createdAt, t.active).from(Thread as t).innerJoin(Post as p).on(t.id, p.threadId).where.eq(t.active, true).groupBy(p.threadId).orderBy(SQLSyntax.max(p.createdAt)).asc.limit(1)
        }.map(rs => Thread(rs.int("id"), rs.string("title"), rs.zonedDateTime("created_at"), rs.boolean("active"))).single().apply()

      oldThread match {
        case None => throw new Error("Thread not found to compression")
        case Some(value) => {
          val deleteThread = new Thread(value.id, value.title, value.createdAt, false)
          save(deleteThread)
        }
      }
    }
  }

  def save(entity: Thread)(implicit session: DBSession): Thread = {
    withSQL {
      update(Thread).set(
        column.id -> entity.id,
        column.title -> entity.title,
        column.createdAt -> entity.createdAt,
        column.active -> entity.active
      ).where.eq(column.id, entity.id)
    }.update().apply()
    entity
  }

  def destroy(entity: Thread)(implicit session: DBSession): Int = {
    withSQL { delete.from(Thread).where.eq(column.id, entity.id) }.update().apply()
  }

}
