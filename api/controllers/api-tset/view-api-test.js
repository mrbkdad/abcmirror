module.exports = {


  friendlyName: 'View api test',


  description: 'Display "Api test" page.',


  exits: {

    success: {
      viewTemplatePath: 'pages/api-tset/api-test'
    }

  },


  fn: async function () {
    /*
    var method = this.req.method;
    var data;
    if(method == 'GET')
      data = this.req.query;
    else if(method == 'POST')
      data = this.req.body;

    console.log("Method ["+method+"] : "+data);

    // Respond with view.
    return {hole : data};
    */
    return {};
  }
};
