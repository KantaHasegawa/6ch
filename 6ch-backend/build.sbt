name := """6ch-backend"""
organization := "com.example"

version := "1.0-SNAPSHOT"

lazy val root = (project in file(".")).enablePlugins(PlayScala)

scalaVersion := "2.13.8"

libraryDependencies += guice
libraryDependencies += specs2 % Test
libraryDependencies ++= Seq(
  jdbc,
  evolutions,
  "org.scalatestplus.play" %% "scalatestplus-play" % "5.0.0" % Test,
  "com.h2database"  %  "h2"                           % "1.4.200",
  "org.scalikejdbc" %% "scalikejdbc"                  % "3.5.0",
  "org.scalikejdbc" %% "scalikejdbc-config"           % "3.5.0",
  "org.scalikejdbc" %% "scalikejdbc-play-initializer" % "2.8.0-scalikejdbc-3.5",
  "org.scalikejdbc" %% "scalikejdbc-test"   % "3.5.0"   % "test",
  "ch.qos.logback"  %  "logback-classic"    % "1.2.3",
  "mysql" % "mysql-connector-java" % "8.0.22",
)

scalacOptions in Test ++= Seq("-Yrangepos")

enablePlugins(ScalikejdbcPlugin)

// Adds additional packages into Twirl
//TwirlKeys.templateImports += "com.example.controllers._"

// Adds additional packages into conf/routes
// play.sbt.routes.RoutesKeys.routesImport += "com.example.binders._"
