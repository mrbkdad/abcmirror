module.exports = {


  friendlyName: 'View api hole',


  description: 'Display "Api hole" page.',


  exits: {

    success: {
      //viewTemplatePath: 'pages/api-tset/api-hole'
    }

  },


  fn: async function () {
    var method = this.req.method;
    console.log("Method : " + method);

    var data;
    if(method == "GET")
      data = this.req.query;
    else if(method == "POST")
      data = this.req.body;

    console.log("Data : " + data);

    // Respond with view.
    return {hole : data};

  }


};
