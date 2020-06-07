const eventModel = require("../Models/event");
const formidable = require("formidable");
const validator = require("validator");
var fs = require("fs");
const { uploadDir } = require("../config");

exports.registerEvent = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;

  form.parse(req, (err, fields, file) => {
    if (err) {
      res.status(400).json({
        error: err,
      });
    }
    //destructure the fields
    const { name, mobile, email, reg_type, tickets } = fields;

    if (
      name === undefined ||
      mobile === undefined ||
      email === undefined ||
      reg_type === undefined ||
      tickets === undefined ||
      file.id_image === undefined
    ) {
      return res.status(422).json({
        error: "Please fill all fields",
      });
    }

    var oldpath = file.id_image.path;
    var newpath = uploadDir + file.id_image.name;
    fs.rename(oldpath, newpath, function (err) {
      if (err) throw err;
    });

    let event = new eventModel(fields);

    event.id_image = newpath;

    //save to the DB
    event.save((err, event) => {
      if (err) {
        res.status(400).json({
          error: "Event Registration Failed",
        });
      }
      res.json({ reg_id: event._id });
    });
  });

  // form.on('file', function (name, file){
  //     console.log('Uploaded ' + file.name);
  // });
};
