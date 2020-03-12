parasails.registerPage('api-test', {
  //  ╦╔╗╔╦╔╦╗╦╔═╗╦    ╔═╗╔╦╗╔═╗╔╦╗╔═╗
  //  ║║║║║ ║ ║╠═╣║    ╚═╗ ║ ╠═╣ ║ ║╣
  //  ╩╝╚╝╩ ╩ ╩╩ ╩╩═╝  ╚═╝ ╩ ╩ ╩ ╩ ╚═╝
  data: {
    method : 'GET',
    body_title : 'Query',
    body: '',
    hole : '',

    confirmModalOpen: false,
  },

  //  ╦  ╦╔═╗╔═╗╔═╗╦ ╦╔═╗╦  ╔═╗
  //  ║  ║╠╣ ║╣ ║  ╚╦╝║  ║  ║╣
  //  ╩═╝╩╚  ╚═╝╚═╝ ╩ ╚═╝╩═╝╚═╝
  beforeMount: function() {
    // Attach any initial data from the server.
    _.extend(this, SAILS_LOCALS);
    //this.confirmModalOpen = true;
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
          this.confirmModalOpen = true;
          break;
      }
      console.log(this.body_title);
    },

    CloseModal : function(){
      console.log("close modal");
      this.confirmModalOpen = false;
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
          api_url = "/api/v1/api-hole-post";
          post_body = this.body;
          break;
      }

      console.log(api_url);
      console.log(post_body);
      //console.log(SAILS_LOCALS._csrf);

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
            'X-CSRF-Token': SAILS_LOCALS._csrf,
          // 'Content-Type': 'application/x-www-form-urlencoded',
          },
          credentials: "same-origin",
          body: post_body,
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
