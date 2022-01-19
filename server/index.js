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

  let from = req.params.from;
  let to = req.params.to;

  let body_genEds = [body.filters.commA, body.filters.commB, body.filters.quantA, body.filters.quantB];
  let body_breadth = [body.filters.bio, body.filters.human, body.filters.lit, body.filters.natSci, body.filters.phySci, body.filters.socSci];


  let sql = "SELECT * FROM courses c";
  let params = [];

  let j = 0;

  // gen eds
  if (body_genEds.includes(true)) {
    sql += " WHERE gen_ed LIKE ?";
    j++;
    let numTrue = body_genEds.filter((g) => g == true).length;
    

    for (let i = 0; i < body_genEds.length; i++) {
      if (body_genEds[i]) params.push(genEd[i]);
      if (j < numTrue) {
        sql += " AND gen_ed LIKE ?";
        j++;
      }
    }
  }

  // ethnic studies
  if (body.filters.ethnic) {
    sql += ` ${j > 0 ? "AND": "WHERE"} counts_as_ethnic_studies=1`
  }

  // breadth
  if (body_breadth.includes(true)) {
    sql += ` ${j > 0 ? "AND": "WHERE"} breadth LIKE ?`;
    j++;
    let numTrue = body_breadth.filter((g) => g == true).length;

    for (let i = 0; i < body_breadth.length; i++) {
      if (body_breadth[i]) params.push(breadth[i]);
      if (j < numTrue) {
        sql += " AND breadth LIKE ?";
        j++;
      }
    }
  }

  console.log(sql);
  console.log(params);
  let numResults = db.prepare(`SELECT COUNT(*) FROM courses ${sql.replace("SELECT * FROM courses c", "")}`).get(params);
  params.push(from, to);
  let courses = db.prepare(sql += " LIMIT ?,?").all(params);
  courses.push({"results": numResults['COUNT(*)']})
  res.json(courses);
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
