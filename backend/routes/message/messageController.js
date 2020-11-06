var kafka = require('../../kafka/client')


  module.exports = {
    getMessages : (req,res)=>{
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
          message: "Sign up Successful"
        });
      });
      
      // getMessages(id,(err, results) => {
      //   if (err) {
      //     console.log(err);
      //     return;
      //   }
      //     return res.json({
      //     success: 1,
      //     data: results
      //     });
      // });
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
          message: "Sign up Successful"
        });
      });
      
      // addMessage(req.body, (err, results) => {
      //   if (err) {
      //     console.log(err);
      //     return res.status(500).json({
      //       success: 0,
      //       message: "Database connection errror"
      //     });
      //   }
      //   return res.status(200).json({
      //     success: 1,
      //     data: results
      //   });
      // });
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
          message: "Sign up Successful"
        });
      });
      // createMessage(req.body, (err, results) => {
      //   if (err) {
      //     console.log(err);
      //     return res.status(500).json({
      //       success: 0,
      //       message: "Database connection errror"
      //     });
      //   }
      //   return res.status(200).json({
      //     success: 1,
      //     data: results
      //   });
      // });
    },
}