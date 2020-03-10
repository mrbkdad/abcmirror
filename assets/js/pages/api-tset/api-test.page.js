parasails.registerPage('api-test', {
  //  ╦╔╗╔╦╔╦╗╦╔═╗╦    ╔═╗╔╦╗╔═╗╔╦╗╔═╗
  //  ║║║║║ ║ ║╠═╣║    ╚═╗ ║ ╠═╣ ║ ║╣
  //  ╩╝╚╝╩ ╩ ╩╩ ╩╩═╝  ╚═╝ ╩ ╩ ╩ ╩ ╚═╝
  data: {
    method : 'GET',
    body_title : 'Query',
    body: '',
    hole : '',
  },

  //  ╦  ╦╔═╗╔═╗╔═╗╦ ╦╔═╗╦  ╔═╗
  //  ║  ║╠╣ ║╣ ║  ╚╦╝║  ║  ║╣
  //  ╩═╝╩╚  ╚═╝╚═╝ ╩ ╚═╝╩═╝╚═╝
  beforeMount: function() {
    // Attach any initial data from the server.
    _.extend(this, SAILS_LOCALS);

    //this.hole = "abc";
    //console.log(SAILS_LOCALS);
  },
  mounted: async function() {
    //…
  },

  //  ╦╔╗╔╔╦╗╔═╗╦═╗╔═╗╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
  //  ║║║║ ║ ║╣ ╠╦╝╠═╣║   ║ ║║ ║║║║╚═╗
  //  ╩╝╚╝ ╩ ╚═╝╩╚═╩ ╩╚═╝ ╩ ╩╚═╝╝╚╝╚═╝
  methods: {
    OptionChange : function(){
      console.log("OptionChange Function!");
      switch(this.method){
        case "GET":
          this.body_title = "Query";
          break;
        case "POST":
          this.body_title = "Body";
          break;
      }
      console.log(this.body_title);
    },

    SubmitHole : async function(){
      console.log("SubmitHole Function!");
      var api_url = "/api-hole";
      var post_body = '';
      switch(this.method){
        case "GET":
          api_url = api_url + "?" + this.body;
          break;
        case "POST":
          post_body = this.body;
          break;
      }

      console.log(api_url);
      console.log(post_body);

      if(this.method == "GET"){
        fetch(api_url).then((res)=>{
          if(res.ok){
            return res.json();
          }
          throw new Error("API-HOLE's Response is not ok!")
        }).then((json)=>{
          console.log(json);
          this.hole = json;
        });
      }else if(this.method == "POST"){
        fetch(api_url,{
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
          body:this.post_body,
        }).then((res)=>{
          if(res.ok){
            return res.json();
          }
          throw new Error("API-HOLE's Response is not ok!")
        }).then((json)=>{
          console.log(json);
          this.hole = json;
        });
      }

      this.$forceUpdate();
    }
  }
});
