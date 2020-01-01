const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

//Load Person Model
const Person = require("../../models/Person");

//Load Profile Model
const Profile = require("../../models/Profile");

//Load Question Model
const Question = require("../../models/Question");

// @type    GET
//@route    /api/questions/
// @desc    route for showing all questions
// @access  PUBLIC
router.get("/", (req, res) => {
  Question.countDocuments()
    .then(count => {
      if (count == 0) {
        res.json({ noquestions: "No questions to show" });
      }
    })
    .catch(err => console.log(err));
  Question.find()
    .sort({ date: "desc" })
    .then(questions => res.json(questions))
    .catch(err => res.json({ noquestions: "No questions to display" }));
});

// @type    GET
//@route    /api/questions/linux
// @desc    route for showing linux questions
// @access  PUBLIC
router.get("/linux", (req, res) => {
  Question.countDocuments()
    .then(count => {
      if (count == 0) {
        res.json({ noquestions: "No questions to show" });
      }
    })
    .catch(err => console.log(err));
  Question.find({ tag: "linux" })
    .sort({ date: "desc" })
    .then(questions => res.json(questions))
    .catch(err => res.json({ noquestions: "No questions to display" }));
});

// @type    POST
//@route    /api/questions/
// @desc    route for submitting questions
// @access  PRIVATE
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const newQuestion = new Question({
      textone: req.body.textone,
      texttwo: req.body.texttwo,
      user: req.user.id,
      name: req.body.name,
      tag: req.body.tag
    });
    newQuestion
      .save()
      .then(question => res.json(question))
      .catch(err => console.log("Unable to Push question into database" + err));
  }
);

// @type    DELETE
//@route    /api/questions/:id
// @desc    route for deleting question by id
// @access  PRIVATE
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const id = req.params.id;
    Question.findOneAndRemove({ _id: id })
      .then(() => res.json({ success: "Successfully Deleted" }))
      .catch(err => console.log(err));
  }
);

// @type    DELETE
//@route    /api/questions/delete/all
// @desc    route for deleting all questions
// @access  PRIVATE
router.delete(
  "/delete/all",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Question.deleteMany()
      .then(() => res.json({ success: "Successfully Deleted" }))
      .catch(err => console.log(err));
  }
);

// @type    POST
//@route    /api/questions/answers/:id
// @desc    route for submitting answers to questions
// @access  PRIVATE
router.post(
  "/answers/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Question.findById(req.params.id)
      .then(question => {
        const newAnswer = {
          user: req.user.id,
          name: req.body.name,
          text: req.body.text
        };
        question.answers.unshift(newAnswer);

        question
          .save()
          .then(question => res.json(question))
          .catch(err => console.log(err));
      })
      .catch(err => console.log(err));
  }
);

// @type    POST
//@route    /api/questions/upvote/:id
// @desc    route for for upvoting
// @access  PRIVATE
router.post(
  "/upvote/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id })
      .then(profile => {
        Question.findById(req.params.id)
          .then(question => {
            if (
              question.upvotes.filter(
                upvote => upvote.user.toString() === req.user.id.toString()
              ).length > 0
            ) {
              //Downvote
              const removethis = question.upvotes
                .map(item => item.user)
                .indexOf(req.user.id.toString());
              question.upvotes.splice(removethis, 1);
              question
                .save()
                .then(question =>
                  res.json({ success: "Successfully Downvoted" })
                )
                .catch(err => console.log(err));
            } else {
              question.upvotes.unshift({ user: req.user.id });
              question
                .save()
                .then(question => res.json(question))
                .catch(err => console.log(err));
            }
          })
          .catch(err => console.log(err));
      })
      .catch(err => console.log(err));
  }
);

module.exports = router;
