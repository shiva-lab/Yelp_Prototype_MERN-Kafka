const restEvent = require('../models/restEvent');

function handle_request(msg, callBack) {
  const {
    restaurant_id,
    eventname,
    eventdescription,
    date,
    time,
    address,
    city,
    eventtype,
    hashtag
  } = msg.data;
  if (msg.path === "addevent") {
    restEvent.findOne({ eventname }, (error, results) => {
      if (error) {
        return callBack(error)
      } else {
        if (results) {
          return callBack(" Event Already")
        } else {
          const path1 = msg.path1
          let event = new restEvent({
            restaurant_id: restaurant_id,
            eventname: eventname,
            eventdescription: eventdescription,
            time: time,
            date: date,
            address: address,
            city: city,
            eventtype: eventtype,
            hashtag: hashtag,
            path: path1
          });
          event.save();
          return callBack(null, event)
        }

      }
    });
  } else if (msg.path == "view_event_listing") {
    restEvent.find({ restaurant_id: msg.data.restaurant_id }, (error, result) => {
      if (error) {
        return callBack(error)
      } else {
        return callBack(null, result)
      }
    });
  } else if (msg.path == "viewevent") {
    restEvent.find({}, (error, result) => {
      if (error) {
        return callBack(error)
      } else {
        return callBack(null, result)
      }
    }).sort({ date: -1 });
  } else if (msg.path == "vieweventasc") {
    restEvent.find({}, (error, result) => {
      if (error) {
        return callBack(error)
      } else {
        return callBack(null, result)
      }
    }).sort({ date: 1 });
  } else if (msg.path == "view_event_details") {
    restEvent.find({ _id: msg.data.event_id }, (error, result) => {
      if (error) {
        return callBack(error)
      } else {
        return callBack(null, result)
      }
    });
  } else if (msg.path == "event_signup") {
    restEvent.update({ _id: msg.data._id }, { $push: { RegistredUser: { user_id: msg.data.user_id, username: msg.data.username, Emailid: msg.data.Emailid } } }, { safe: true, upsert: true }, (error, result) => {
      if (error) {
        return callBack(error)
      } else {
        return callBack(null, result)
      }
    });
  } else if (msg.path == "view_user_signedup_event") {
    restEvent.find({ 'RegistredUser.user_id': msg.data.user_id }, {}, (error, result) => {
      if (error) {
        return callBack(error)
      } else {
        return callBack(null, result)
      }
    });

  } else if (msg.path == "view_event_signup") {
    restEvent.findById({ _id: msg.data.event_id }, function (error, result) {
      if (error) {
        return callBack(error)
      } else {
        return callBack(null, result)
      }
    });
  } else if (msg.path == "search_event") {
    restEvent.find({ eventname: msg.data.eventname }, function (error, result) {
      if (error) {
        return callBack(error)
      } else {
        return callBack(null, result)
      }
    });
  }
}

exports.handle_request = handle_request;