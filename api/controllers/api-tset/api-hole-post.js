module.exports = {


  friendlyName: 'Api hole post',


  description: '',


  inputs: {

  },


  exits: {

  },


  fn: async function (inputs) {

    console.log(this.req.method);
    var _body = this.req.body;
    console.log(_body);

    // All done.
    return{ pole : _body };

  }


};
