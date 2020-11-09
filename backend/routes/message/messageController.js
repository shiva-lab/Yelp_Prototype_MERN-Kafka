var kafka = require('../../kafka/client')
module.exports = {
  getMessages: (req, res) => {
    const id = req.params.id;
    const data = {
      id: id,
      path: 'get_messages'
    }
    kafka.make_request('message', data, (err, results) => {
      if (err) {
        return res.status(400).json({
          success: 0,
          message: err
        });
      }
      console.log(res);
      return res.status(200).json({
        success: 1,
        data: results,
        message: "Get Messages Successful"
      });
    });

  },
  addMessage: (req, res) => {
    const payload = {
      data: req.body,
      path: 'add_message'
    }
    kafka.make_request('message', payload, (err, results) => {
      if (err) {
        return res.status(400).json({
          success: 0,
          message: err
        });
      }
      return res.status(200).json({
        success: 1,
        data: results,
        message: "Add Messages Successful"
      });
    });
  },
  createMessage: (req, res) => {
    const payload = {
      data: req.body,
      path: 'create_message'
    }
    kafka.make_request('message', payload, (err, results) => {
      if (err) {
        return res.status(400).json({
          success: 0,
          message: err
        });
      }
      return res.status(200).json({
        success: 1,
        data: results,
        message: "Create Message Successful"
      });
    });
  },
}