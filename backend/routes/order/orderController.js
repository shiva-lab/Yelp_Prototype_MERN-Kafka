var kafka = require('../../kafka/client')

module.exports = {
  filterorderrestsearch: (req, res) => {
    const body = req.body;
    const data = {
      data: body,
      path: 'filter_order_rest_search'
    }
    kafka.make_request('order', data, (err, results) => {
      if (err) {
        return res.status(400).json({
          success: 0,
          message: err
        });
      }
      return res.status(200).json({
        success: 1,
        data: results,
        message: "Order search successful"
      });
    });
  },
  rvieworder: (req, res) => {
    const body = req.body;
    const data = {
      data: body,
      path: 'rvieworder'
    }
    kafka.make_request('order', data, (err, results) => {
      if (err) {
        return res.status(400).json({
          success: 0,
          message: err
        });
      }
      return res.status(200).json({
        success: 1,
        data: results,
        message: "Restaurant view order successful"
      });
    });
  },
  userorderstatus: (req, res) => {
    const body = req.body;
    const data = {
      data: body,
      path: 'userorderstatus'
    }
    kafka.make_request('order', data, (err, results) => {
      if (err) {
        return res.status(400).json({
          success: 0,
          message: err
        });
      }
      return res.status(200).json({
        success: 1,
        data: results,
        message: "user order status successful"
      });
    });
  },
  userorderstatusdesc: (req, res) => {
    const body = req.body;
    const data = {
      data: body,
      path: 'userorderstatusdesc'
    }
    kafka.make_request('order', data, (err, results) => {
      if (err) {
        return res.status(400).json({
          success: 0,
          message: err
        });
      }
      return res.status(200).json({
        success: 1,
        data: results,
        message: "user order status desc successful"
      });
    });
  },
  filterordersearch: (req, res) => {
    const body = req.body;
    const data = {
      data: body,
      path: 'filter_order_search'
    }
    kafka.make_request('order', data, (err, results) => {
      if (err) {
        return res.status(400).json({
          success: 0,
          message: err
        });
      }
      return res.status(200).json({
        success: 1,
        data: results,
        message: "filter order search successful"
      });
    });
  },
  uorderdetails: (req, res) => {
    const body = req.body;
    const data = {
      data: body,
      path: 'uorderdetails'
    }
    kafka.make_request('order', data, (err, results) => {
      if (err) {
        return res.status(400).json({
          success: 0,
          message: err
        });
      }
      return res.status(200).json({
        success: 1,
        data: results,
        message: "user order details successful"
      });
    });
  },
  neworderstatuschange: (req, res) => {
    const body = req.body;
    const data = {
      data: body,
      path: 'neworderstatuschange'
    }
    kafka.make_request('order', data, (err, results) => {
      if (err) {
        return res.status(400).json({
          success: 0,
          message: err
        });
      }
      return res.status(200).json({
        success: 1,
        data: results,
        message: "order status change successful"
      });
    });
  },
  addtocart: (req, res) => {
    const body = req.body;
    const data = {
      data: body,
      path: 'addtocart'
    }
    kafka.make_request('order', data, (err, results) => {
      if (err) {
        return res.status(400).json({
          success: 0,
          message: err
        });
      }
      return res.status(200).json({
        success: 1,
        data: results,
        message: "add to cart successful"
      });
    });
  },
  uviewcart: (req, res) => {
    const body = req.body;
    const data = {
      data: body,
      path: 'uview_cart'
    }
    kafka.make_request('order', data, (err, results) => {
      if (err) {
        return res.status(400).json({
          success: 0,
          message: err
        });
      }
      return res.status(200).json({
        success: 1,
        data: results,
        message: "view cart successful"
      });
    });
  },
  deletefromcart: (req, res) => {
    const body = req.body;
    const data = {
      data: body,
      path: 'delete_from_cart'
    }
    kafka.make_request('order', data, (err, results) => {
      if (err) {
        return res.status(400).json({
          success: 0,
          message: err
        });
      }
      return res.status(200).json({
        success: 1,
        data: results,
        message: "delete from cart successful"
      });
    });
  },
  createorder: (req, res) => {
    const body = req.body;
    const data = {
      data: body,
      path: 'create_order'
    }
    kafka.make_request('order', data, (err, results) => {
      if (err) {
        return res.status(400).json({
          success: 0,
          message: err
        });
      }
      return res.status(200).json({
        success: 1,
        data: results,
        message: "create order successful"
      });
    });
  }

}
