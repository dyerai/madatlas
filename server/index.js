// server/index.js
import 'dotenv/config';
import express from "express";
import Database from "better-sqlite3";
import { PrismaClient } from '@prisma/client';
import { OAuth2Client } from "google-auth-library";

const prisma = new PrismaClient()

const db = new Database("./data.db", { readonly: true, fileMustExist: true });

const CLIENTID = process.env.GOOGLE_CLIENT_ID;

const GAuthClient = new OAuth2Client(CLIENTID);

const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.json());

app.get("/api", (req, res) => {
  res.json({ message: "Hello from server!" });
});

app.post("/api/rateCourse/:courseID", async (req, res) => {
  const { courseID } = req.params;
  const rating = req.body;

  
});

app.post("/api/login", async (req, res) => {
  const { token } = req.body;
  
  const ticket = await GAuthClient.verifyIdToken({
    idToken: token,
    audience: CLIENTID
  });
  const { name, email } = ticket.getPayload();

  if (email.endsWith("@wisc.edu")) {
    res.status(201);
    // const user = await prisma.user.upsert({
    //   where: { email: email },
    //   update: { name: name },
    //   create: { 
    //     name: name, 
    //     email: email 
    //   }
    // });
    console.log({email: email, name: name});
    res.json(user);
  } else {
    // raise error
    res.status(511);
    res.json(JSON.stringify({error: "Not a Student"}));
  }
});

app.get("/api/getSubjects", async (req, res) => {
  let getSubjects = await prisma.subject.findMany({
    orderBy: {abbrev: 'asc'}
  });

  res.json(getSubjects);
});

app.get("/api/getCourses/:from-:to", async (req, res) => {
  let from = parseInt(req.params.from);
  let to = parseInt(req.params.to);

  let getAllCourses = await prisma.course.findMany({
    orderBy: {abbrev: 'asc'},
    skip: from,
    take: to,
  })
  // db
  //   .prepare(
  //     "SELECT * FROM courses c ORDER BY c.abbrev LIMIT ?,?;"
  //   )
  //   .all([from, to]);
  res.json(getAllCourses);
});

app.get("/api/getNumCourses", async (req, res) => {
  let getNumCourses = await prisma.course.count();
  res.json(getNumCourses);
  console.log(getNumCourses)
})

app.post("/api/search/:from-:to", (req, res) => {
  const body = req.body;
  const genEd = [
    "%Communication Part A%",
    "%Communication Part B%",
    "%Quantitative Reasoning Part A%",
    "%Quantitative Reasoning Part B%",
  ];
  const breadth = [
    "%Biological Sci. Counts toward the Natural Sci req%",
    "%Humanities%",
    "%Literature%",
    "%Natural Science%",
    "%Physical Sci. Counts toward the Natural Sci req%",
    "%Social Science%",
  ];
  const combinators = [
    "AND",
    "OR",
    "AND NOT",
  ];

  const from = parseInt(req.params.from);
  const to = parseInt(req.params.to);

  const body_genEds = [body.filters.commA, body.filters.commB, body.filters.quantA, body.filters.quantB];
  const body_breadth = [body.filters.bio, body.filters.human, body.filters.lit, body.filters.natSci, body.filters.phySci, body.filters.socSci];
  let combinator = "OR";

  if (typeof body.combinator !== "undefined") {
    const body_combinator = [body.combinator.and, body.combinator.or, body.combinator.andNot];
    for (let i = 0; i < body_combinator.length; i++) {
      if (body_combinator[i]) combinator = combinators[i];
    }
  }

  let sql = "SELECT * FROM Course";
  let params = [];

  // let query = prisma.course.findMany({
  //   where: {
      
  //   },
  //   skip: {from},
  //   take: {to}
  // })

  let j = 0;
  // subject
  if (body.filters.subject != '0') {
    sql += " INNER JOIN _CourseToSubject ON _CourseToSubject.A = Course.id AND _CourseToSubject.B = ?";
    params.push(body.filters.subject);
  }

  // gen eds
  if (body_genEds.includes(true)) {
    sql += " WHERE gen_ed LIKE ?";
    j++;
    let numTrue = body_genEds.filter((g) => g == true).length;
    

    for (let i = 0; i < body_genEds.length; i++) {
      if (body_genEds[i]) params.push(genEd[i]);
      if (j < numTrue) {
        sql += ` ${combinator} gen_ed LIKE ?`;
        j++;
      }
    }
  }

  // ethnic studies
  if (body.filters.ethnic) {
    sql += ` ${j > 0 ? combinator: "WHERE"} counts_as_ethnic_studies=1`
    j++;
  }

  // breadth
  if (body_breadth.includes(true)) {
    sql += ` ${j > 0 ? combinator: "WHERE"} breadth LIKE ?`;
    j++;
    let numTrue = body_breadth.filter((g) => g == true).length;

    for (let i = 0; i < body_breadth.length; i++) {
      if (body_breadth[i]) params.push(breadth[i]);
      if (j < numTrue) {
        sql += ` ${combinator} breadth LIKE ?`;
        j++;
      }
    }
  }

  console.log(sql);
  console.log(params);

  let numResults = db.prepare(`SELECT COUNT(*) FROM Course ${sql.replace("SELECT * FROM Course", "")}`).get(params);
  params.push(from, to);

  sql += " WHERE id IN (SELECT course_id FROM CourseSection)"
  sql += " ORDER BY number";
  console.log(sql);
  let courses = db.prepare(sql += " LIMIT ?,?").all(params);

  courses.forEach((course) => {
    let instructors = db.prepare("SELECT * FROM CourseSection INNER JOIN Instructor ON CourseSection.instructor_id = Instructor.Id WHERE course_id = ?").all(course.id);
    course.instructors = instructors;
  })
  console.log(courses[0])

  courses.push({"results": numResults['COUNT(*)']})
  res.json(courses);
});

app.post("/api/rateCourse", (req, res) => {
  const body = req.body;

  console.log(body);

  res.status(201)
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
