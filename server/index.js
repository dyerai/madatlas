// server/index.js
import express from "express";
import Database from "better-sqlite3";

const db = new Database("./data.db", { readonly: true, fileMustExist: true });

const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.json());

app.get("/api", (req, res) => {
  res.json({ message: "Hello from server!" });
});

app.get("/api/getSubjects", (req, res) => {
  let getSubjects = db
    .prepare("SELECT * FROM subjects s ORDER BY s.abbrev;")
    .all();
  res.json(getSubjects);
});

app.get("/api/getCourses/:from-:to", (req, res) => {
  let from = req.params.from;
  let to = req.params.to;
  let getAllCourses = db
    .prepare(
      "SELECT * FROM courses c ORDER BY c.abbrev LIMIT ?,?;"
    )
    .all([from, to]);
  res.json(getAllCourses);
});

app.get("/api/getNumCourses", (req, res) => {
  let getNumCourses = db.prepare("SELECT COUNT(*) FROM courses").get();
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


  const from = req.params.from;
  const to = req.params.to;

  const body_genEds = [body.filters.commA, body.filters.commB, body.filters.quantA, body.filters.quantB];
  const body_breadth = [body.filters.bio, body.filters.human, body.filters.lit, body.filters.natSci, body.filters.phySci, body.filters.socSci];
  let combinator = "AND";

  if (typeof body.combinator !== "undefined") {
    const body_combinator = [body.combinator.and, body.combinator.or, body.combinator.andNot];
    for (let i = 0; i < body_combinator.length; i++) {
      if (body_combinator[i]) combinator = combinators[i];
    }
  }

  let sql = "SELECT * FROM courses";
  let params = [];

  let j = 0;

  // subject
  if (body.filters.subject != '0') {
    sql += " INNER JOIN course_subjects ON course_subjects.course_id = courses.id AND course_subjects.subject_id = ?";
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

  let numResults = db.prepare(`SELECT COUNT(*) FROM courses ${sql.replace("SELECT * FROM courses", "")}`).get(params);
  params.push(from, to);
  
  sql += " ORDER BY number";
  let courses = db.prepare(sql += " LIMIT ?,?").all(params);

  courses.forEach((course) => {
    let credits = db.prepare("SELECT DISTINCT credits FROM courses WHERE abbrev = ?").all(course.abbrev).map((row) => row.credits);
    course.credits = credits;
  })
  //console.log(courses[0])
  courses.push({"results": numResults['COUNT(*)']})
  res.json(courses);
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
