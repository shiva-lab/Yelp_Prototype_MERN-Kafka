var kafka = require('../../kafka/client')
module.exports = {
  addevent: (req, res) => {
    const body = req.body;
    const path1 = req.file.location
    const data = {
      data: body,
      path: 'addevent',
      path1: path1
    }
    kafka.make_request('event', data, (err, results) => {
      if (err) {
        return res.status(400).json({
          success: 0,
          message: err
        });
      }
      return res.status(200).json({
        success: 1,
        data: results,
        message: "Add event successful"
      });
    });
  },
  vieweventlisting: (req, res) => {
    const body = req.body;
    const data = {
      data: body,
      path: 'view_event_listing',
    }
    kafka.make_request('event', data, (err, results) => {
      if (err) {
        return res.status(400).json({
          success: 0,
          message: err
        });
      }
      return res.status(200).json({
        success: 1,
        data: results,
        message: "view event listing successful"
      });
    });
  },
  viewevent: (req, res) => {
    const body = req.body;
    const data = {
      data: body,
      path: 'viewevent',
    }
    kafka.make_request('event', data, (err, results) => {
      if (err) {
        return res.status(400).json({
          success: 0,
          message: err
        });
      }
      return res.status(200).json({
        success: 1,
        data: results,
        message: "view event successful"
      });
    });
  },
  vieweventasc: (req, res) => {
    const body = req.body;
    const data = {
      data: body,
      path: 'vieweventasc',
    }
    kafka.make_request('event', data, (err, results) => {
      if (err) {
        return res.status(400).json({
          success: 0,
          message: err
        });
      }
      return res.status(200).json({
        success: 1,
        data: results,
        message: "view event asc successful"
      });
    });
  },
  vieweventdetails: (req, res) => {
    const body = req.body;
    const data = {
      data: body,
      path: 'view_event_details',
    }
    kafka.make_request('event', data, (err, results) => {
      if (err) {
        return res.status(400).json({
          success: 0,
          message: err
        });
      }
      return res.status(200).json({
        success: 1,
        data: results,
        message: "view event details successful"
      });
    });
  },
  eventsignup: (req, res) => {
    const body = req.body;
    const data = {
      data: body,
      path: 'event_signup',
    }
    kafka.make_request('event', data, (err, results) => {
      if (err) {
        return res.status(400).json({
          success: 0,
          message: err
        });
      }
      return res.status(200).json({
        success: 1,
        data: results,
        message: "event signup successful"
      });
    });
  },
  viewusersignedupevent: (req, res) => {
    const body = req.body;
    const data = {
      data: body,
      path: 'view_user_signedup_event',
    }
    kafka.make_request('event', data, (err, results) => {
      if (err) {
        return res.status(400).json({
          success: 0,
          message: err
        });
      }
      return res.status(200).json({
        success: 1,
        data: results,
        message: "view user signed events successful"
      });
    });
  },
  vieweventsignup: (req, res) => {
    const body = req.body;
    const data = {
      data: body,
      path: 'view_event_signup',
    }
    kafka.make_request('event', data, (err, results) => {
      if (err) {
        return res.status(400).json({
          success: 0,
          message: err
        });
      }
      return res.status(200).json({
        success: 1,
        data: results,
        message: "view event signup successful"
      });
    });
  },
  searchevent: (req, res) => {
    const body = req.body;
    const data = {
      data: body,
      path: 'search_event',
    }
    kafka.make_request('event', data, (err, results) => {
      if (err) {
        return res.status(400).json({
          success: 0,
          message: err
        });
      }
      return res.status(200).json({
        success: 1,
        data: results,
        message: "search event successful"
      });
    });
  }

}
