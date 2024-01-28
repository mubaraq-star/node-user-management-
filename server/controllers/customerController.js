const customer = require("../models/customer");
// const customer = require("../models/customer");
// const mongoose = require('mongoose');
exports.Homepage = async (req, res) => {
  // const messages = req.flash('info')
  const locals = {
    title: " THE INDUSTROUS LADY",
    description: "possibility unleashed, success achieved",
  };
//   res.render("index", { locals, messages: req.flash("info") });
  let perPage = 12;
  let page = req.query.page || 1;

  try {
    const customers = await customer
      .aggregate([{ $sort: { updatedAt: -1 } }])
      .skip(perPage * page - perPage)
      .limit(perPage)
      .exec();
    const count = await customer.count();
         res.render('index',{locals,customers, current: page, pages: Math.ceil(count /perPage) , messages: req.flash("info") })
  } catch (error) {
    console.log(error)
  }

//   try {
//     const customers = await customer.find({}).limit(10);

//     res.render("index", { locals, messages: req.flash("info"), customers });
//   } catch (err) {
//     console.log(err);
//   }
};


exports.Aboutpage = async (req, res) => {
  const messages = req.flash('info')
  const locals = {
    title: " About page",
    description: "THE INDUSTRIOUS LADY",
  };

  try {
             res.render('about',{ locals , messages: req.flash("info") })
  } catch (error) {
    console.log(error)
  }
}

// new user request
exports.AddUser = async (req, res) => {
  const locals = {
    title: "  THE INDUSTROUS LADY",
    description: "possibility unleashed, success achieved",
  };
  res.render("customer/add", locals);
};
// post new user
exports.PostUser = async (req, res) => {
  console.log(req.body);
  const newUser = new customer({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    details: req.body.details,
    email: req.body.email,
    details: req.body.details,
    tel: req.body.tel,
  });

  try {
    await customer.create(newUser);
    await req.flash("info", "New User  has been added");

    res.redirect("/");
  } catch (err) {
    console.log(err);
  }
};

exports.view = async (req, res) => {
  try{
    const customers = await customer.findOne({_id: req.params.id});
    const locals = {
      title: "  View customer Data",
      description: "possibility unleashed, success achieved",
    };

    res.render("customer/view", {locals,customers});

  } catch (error){
    console.log(error);
  }
}

exports.edit = async (req, res) => {
  try{
    const customers = await customer.findOne({_id: req.params.id});
    const locals = {
      title: "  Edit customer Details",
      description: "possibility unleashed, success achieved",
    };

    res.render("customer/edit", {locals,customers});

  } catch (error){
    console.log(error);
  }
}



exports.editpost = async (req, res) => {
  try {
    await customer.findByIdAndUpdate(req.params.id,{
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      tel: req.body.tel,
      email: req.body.email, 
      details: req.body.details,
      updatedAt: Date.now()
    });
    await res.redirect(`/edit/${req.params.id}`);
    
    console.log('redirected');
  } catch (error) {
    console.log(error);
  }
}


exports.deleteCustomer = async (req,res)=>{

  try {
 await customer.deleteOne({
  _id:req.params.id
 });
 res.redirect("/")
  }
  catch(error){
console.log(error)
  }
}

exports.searchCustomer = async (req, res) => {
  const locals = {
    title: "Search Customer Data",
    description: "possibility unleashed, success achieved",
  };

  try {
    let searchTerm = req.body.searchTerm;
    const searchNoSpecialChar = searchTerm.replace(/[^a-zA-Z0-9 ]/g, "");

    const customers = await customer.find({
      $or: [
        { firstName: { $regex: new RegExp(searchNoSpecialChar, "i") } },
        { lastName: { $regex: new RegExp(searchNoSpecialChar, "i") } },
      ],
    });

    res.render("search", {
      customers,
      locals,
    });
  } catch (error) {
    console.log(error);
  }
};