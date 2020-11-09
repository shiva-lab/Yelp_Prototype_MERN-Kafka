const Order = require("../Models/Order");

function handle_request(msg, callBack) {
  if (msg.path === "filter_order_rest_search") {
    Order.find({ restaurant_id: msg.data.restaurant_id, orderstatus: msg.data.filter }, (error, results) => {
      if (error) {
        return callBack(error)
      } else {
        return callBack(null, results)
      }
    });
  } else if (msg.path === "rvieworder") {
    Order.find({ restaurant_id: msg.data.restaurant_id, orderstatus: { $ne: " " } }, (error, results) => {
      if (error) {
        return callBack(error)
      } else {
        return callBack(null, results)
      }
    });
  } else if (msg.path === "userorderstatus") {
    Order.find({ user_id: msg.data.user_id, orderstatus: { $ne: " " } }, (error, results) => {
      if (error) {
        return callBack(error)
      } else {
        return callBack(null, results)
      }
    }).sort({ ts: 1 });
  } else if (msg.path === "userorderstatusdesc") {
    Order.find({ user_id: msg.data.user_id, orderstatus: { $ne: " " } }, (error, results) => {
      if (error) {
        return callBack(error)
      } else {
        return callBack(null, results)
      }
    }).sort({ ts: -1 });
  } else if (msg.path === "filter_order_search") {
    Order.find({ user_id: msg.data.user_id, orderstatus: msg.data.filter }, (error, results) => {
      if (error) {
        return callBack(error)
      } else {
        return callBack(null, results)
      }
    });
  } else if (msg.path === "uorderdetails") {
    Order.find({ "id": msg.id }, { 'cart': [] }, (error, results) => {
      if (error) {
        return callBack(error)
      } else {
        return callBack(null, results)
      }
    });
  } else if (msg.path === "neworderstatuschange") {
    Order.findByIdAndUpdate({ _id: msg.data._id }, { orderstatus: msg.data.updatestatus }, { new: true }, (error, results) => {
      if (error) {
        return callBack(error)
      } else {
        Order.findOne({
          _id: msg.data._id, orderstatus:msg.data.updatestatus,
        }, (error, result) => {
          if (error){
            return callBack(error)
          } else {
            return callBack(null, result)
          }
        });
      }
    });
  } else if (msg.path === "getneworderstatuschange") {
    Order.findOne({ id: msg.id }, (error, results) => {
      if (error) {
        return callBack(error)
      } else {
        return callBack(null, results)
      }
    });
  }
  else if (msg.path === "addtocart") {
    Order.findOneAndUpdate(
      { user_id: msg.data.user_id, restaurant_id: msg.data.restaurant_id, orderstatus: " " },
      { restaurant_id: msg.data.restaurant_id, user_name: msg.data.user_name, orderstatus: " ", $push: { cart: { itemname: msg.data.itemname, itemid: msg.data._id, price: msg.data.price, path: msg.data.path, cartstatus: "New", user_id: msg.data.user_id, restaurant_id: msg.data.restaurant_id, restaurant_name: msg.data.restaurant_name, user_name: msg.data.user_name } } }, { upsert: true }, (error, results) => {
        if (error) {
          return callBack(error)
        } else {
          return callBack(null, results)
        }
      });
  } else if (msg.path === "uview_cart") {
    Order.find({ "user_id": msg.data.user_id, orderstatus: " " }, {}, (error, results) => {
      if (error) {
        return callBack(error)
      } else {
        return callBack(null, results)
      }
    });
  } else if (msg.path === "delete_from_cart") {
    Order.updateOne({ user_id: msg.data.user_id }, { "$pull": { "cart": { "itemid": msg.data.itemid } } }, { safe: true, multi: true }, (error, results) => {
      if (error) {
        return callBack(error)
      } else {
        return callBack(null, results)
      }
    });
  } else if (msg.path === "create_order") {
    var ts = Date.now()
    Order.updateOne({ '_id': msg.data.order_id, "cart.user_id": msg.data.user_id },
      { $set: { "cart.$.cartstatus": "done" }, deliverymode: msg.data.deliverymode, orderstatus: "New Order", ts: ts },

      (error, results) => {
        if (error) {
          return callBack(error)
        } else {
          return callBack(null, results)
        }
      });
  }
}
exports.handle_request = handle_request;