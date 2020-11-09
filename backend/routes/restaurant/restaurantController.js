const Restaurant = require("../Models/Restaurant");
var bcrypt = require("bcrypt-nodejs");


function handle_request(msg, callBack) {
  if (msg.path === "view_home") {
    Restaurant.find({ _id: msg.data.restaurant_id }, (error, result) => {
      if (error) {
        return callBack(error);
      }
      return callBack(null, result);
    });
  }
  else if (msg.path === "create_restaurant") {
    let data = msg.data;
    let hashp = bcrypt.hashSync(data.restpass)
    var newRestaurant = new Restaurant({
      restaurantname: data.restaurantname,
      Emailid: data.Emailid,
      restpass: hashp,
      location: data.location,
    });
    newRestaurant.save((error, data) => {
      if (error) {
        return callBack(error);
      }
      console.log(data);
      return callBack(null, data);
    })
  } else if (msg.path === "restaurant_login") {
    Restaurant.findOne({ Emailid: msg.data.Emailid }, (error, user) => {
      if (error) {
        return callBack(error);
      }
      if (user) {
        return callBack(null, user);
      }
      return callBack("No such user found");
    });
  } else if (msg.path === "home_view_restaurant") {
    Restaurant.find({}, (error, result) => {
      if (error) {
        callBack(error);
      }
      // If issue add content type
      return callBack(null, result);
    });
  } else if (msg.path === "restaurant_search") {
    Restaurant.find(
      { $or: [{ cuisine: msg.data.search1 }, { location: msg.data.search1 }, { deliverymethod: msg.data.search1 }, { restaurantname: msg.data.search1 }] },
      function (error, result) {
        if (error) {
          return callBack(error);
        } else {
          // If issue add content type
          return callBack(null, result);
        }
      });
  } else if (msg.path === "filter_restaurant_search") {
    Restaurant.find()
      .and([
        { $or: [{ delivery_method: msg.data.filter }, { modeofdelivery: msg.data.filter }] },
        { $or: [{ cuisine: msg.data.search }, { location: msg.data.search }, { "menu.itemname": msg.data.search }] }
      ])
      .exec(function (error, result) {
        if (error) {
          return callBack(error);
        } else {
          return callBack(null, result);
        }
      });
  } else if (msg.path === "restaurant_update") {
    const {
      rdescription,
      contactinfo,
      cuisine,
      timings,
      restaurant_id,
      zipcode,
      website,
      address,
      lat,
      lng,
      modeofdelivery,
      delivery_method,
    } = msg.data;

    const path1 = msg.path1
    const path2 = msg.path2
    const path3 = msg.path3
    const path4 = msg.path4

    Restaurant.findByIdAndUpdate(
      { _id: msg.data.restaurant_id },
      {
        rdescription: rdescription,
        contactinfo: contactinfo,
        cuisine: cuisine,
        timings: timings,
        restaurant_id: restaurant_id,
        zipcode: zipcode,
        website: website,
        address: address,
        lat: lat,
        lng: lng,
        modeofdelivery: modeofdelivery,
        delivery_method: delivery_method,
        path: path1,
        path1: path2,
        path2: path3,
        path3: path4,
      },
      { new: true }, (error, results) => {
        if (error) {
          return callBack(error)
        } else {
          return callBack(null, results)
        }
      });
  } else if (msg.path === "add_menu") {
    const {
      itemname,
      price,
      itemdescription,
      itemcategory,
      ingredients,
      restaurant_id,
    } = msg.data;
    var objData = { itemname: msg.data.itemname, price: msg.data.price, description: msg.data.description, path: msg.path1, itemcategory: msg.data.itemcategory, Ingredients: msg.data.ingredients };
    Restaurant.findByIdAndUpdate(
      { _id: msg.data.restaurant_id },
      { $push: { menu: objData } },
      (error, results) => {
        if (error) {
          return callBack(error)
        } else {
          return callBack(null, results)
        }
      })
  } else if (msg.path === "view_menu") {
    Restaurant.find({ _id: msg.data.restaurant_id }, {}, (error, results) => {
      if (error) {
        return callBack(error)
      } else {
        return callBack(null, results)
      }
    });
  } else if (msg.path === "uview_menu") {
    Restaurant.find({ _id: msg.data.restaurant_id },{'menu':[]}, (error, results) => {
      if (error) {
        return callBack(error)
      } else {
        return callBack(null, results)
      }
    });
  } else if (msg.path === "edit_menu") {
    const {
      itemname,
      price,
      itemdescription,
      itemcategory,
      ingredients,
      restaurant_id,
      item_id
    } = msg.data;
    var quantity = "1"
    Restaurant.updateOne(
      { _id: msg.data.restaurant_id, "menu._id": msg.data.item_id },
      { $set: { "menu.$.itemname": itemname, "menu.$.price": price, "menu.$.itemdescription": itemdescription, "menu.$.itemcategory": itemcategory, "menu.$.quantity": quantity, "menu.$.Ingredients": ingredients, "menu.$.path": msg.path1 } }
      , (error, results) => {
        if (error) {
          console.log(error);
        } else {
          console.log("Success");
          console.log(results);
          res.send(JSON.stringify(results));
        }
      });
  } else if (msg.path === "delete_from_menu") {
    Restaurant.updateOne({ _id: msg.data.restaurant_id }, { "$pull": { "menu": { "_id": msg.data._id } } }, { safe: true, multi: true }, (error, results) => {
      if (error) {
        return callBack(error)
      }
      else {
        return callBack(null, results)
      }
    });
  } else if (msg.path === "add_review") {
    const {
      review,
      rating,
      order_id,
      restaurant_id,
      user_id,
      email
    } = msg.data;
    var objData = {
      review_desc: msg.data.review,
      rating: msg.data.rating,
      order_id: msg.data.order_id,
      email: msg.data.email,
      path: msg.path1,
      restaurant_id: msg.data.restaurant_id,
      user_id: msg.data.user_id,
    };
    Restaurant.findByIdAndUpdate(
      { _id: msg.data.restaurant_id },
      { $push: { review: objData } },
      (error, results) => {
        if (error) {
          return callBack(error)
        } else {
          return callBack(null, results)
        }
      });
  } else if (msg.path === "view_review") {
    Restaurant.find({ _id: msg.data.restaurant_id }, {}, (error, results) => {
      if (error) {
        return callBack(error)
      } else {
        return callBack(error, results)
      }
    });
  }
}


exports.handle_request = handle_request;