
// register the grid component
Vue.component('demo-grid', {
  template: '#grid-template',
  props: {
    data: Array,
    columns: Array,
    filterKey: String
  },
  data: function () {
    var sortOrders = {}
    this.columns.forEach(function (key) {
      sortOrders[key] = 1
    })
    return {
      sortKey: '',
      sortOrders: sortOrders
    }
  },
  computed: {
    filteredData: function () {
      var sortKey = this.sortKey
      var filterKey = this.filterKey && this.filterKey.toLowerCase()
      var order = this.sortOrders[sortKey] || 1
      var data = this.data
      if (filterKey) {
        data = data.filter(function (row) {
          return Object.keys(row).some(function (key) {
            return String(row[key]).toLowerCase().indexOf(filterKey) > -1
          })
        })
      }
      if (sortKey) {
        data = data.slice().sort(function (a, b) {
          a = a[sortKey]
          b = b[sortKey]
          return (a === b ? 0 : a > b ? 1 : -1) * order
        })
      }
      return data
    }
  },
  filters: {
    capitalize: function (str) {
      return str.charAt(0).toUpperCase() + str.slice(1)
    }
  },
  methods: {
    sortBy: function (key) {
      this.sortKey = key
      this.sortOrders[key] = this.sortOrders[key] * -1
    },
    sortField: function (sort){
      axios.get('owner_sort.php', {
                    params: {
                      limit: demo.lim,
                      offset: demo.off,
                      sortBy: sort + " " + demo.order,
                      //order: demo.order
                    }

            }).then(response => demo.gridData = response.data);
            this.sortBy(sort);
            if(demo.order == 'DESC'){
              demo.order = 'ASC'
            }
            else{
              demo.order = 'DESC'
            }
    },
    sortName: function (){
      axios.get('owner_sort.php', {
                    params: {
                      limit: demo.lim,
                      offset: demo.off,
                      sortBy: 'last ' + demo.order + ', first',
                      //order: demo.order
                    }

            }).then(response => demo.gridData = response.data);
            this.sortBy('last');
            if(demo.order == 'DESC'){
              demo.order = 'ASC'
            }
            else{
              demo.order = 'DESC'
            }
    },
    sortAddr: function (){
      axios.get('owner_sort.php', {
                    params: {
                      limit: demo.lim,
                      offset: demo.off,
                      sortBy: 'zip ' + demo.order + ', street, building, last, first',
                      //order: demo.order
                    }

            }).then(response => demo.gridData = response.data);
            this.sortBy('street');
            if(demo.order == 'DESC'){
              demo.order = 'ASC'
            }
            else{
              demo.order = 'DESC'
            }
    },
    hide: function (id){
      axios.get('owner_hide.php', {
                    params: {
                      id: id,
                    }
            });
            var removeIndex = this.filteredData.map(function(item) { return item.id; })
                       .indexOf(id);
            ~removeIndex && this.filteredData.splice(removeIndex, 1);
            // var index = demo.gridData.indexOf(object.id);
            // if (index > -1) {
            //     demo.gridData.splice(index, 1);
            // }
            
            //console.log(id);
            //delete this.data[id];
    },
    getAge: function(dob) {
        var birthdate = new Date(dob); // Get date of birth
        var cur = new Date();
        var diff = cur-birthdate; // This is the difference in milliseconds
        var age = Math.floor(diff/31557600000); // Divide by 1000*60*60*24*365.25
        return age;
    },
    // getNumOfPages: function(){
    //   var table;
    //   var col;
    //   var numRows;
    //   axios.get('https://cs3660-lehaemail.c9users.io/M1/calc-rows.php', {
    //                 params: {
    //                   table: 'pet',
    //                   col: 'cat'
    //                 }
    //         }).then(response => this.numRows = response.data);
    //   var rows = numRows / 10;
    //   return rows;
    // }
  }
});

// bootstrap the demo
var demo = new Vue({
  el: '#demo',
  // props: {
  //   lim: 10,
  //   offs: 0
  // },
  data: {
    searchQuery: '',
    gridColumns: ['photo', 'last', 'first', 'building', 'street', 'city', 'state', 'zip', 'phone', 'alive', 'notes', 'link_to_pet'],
    gridData: [],
    // currPage: 1,
    // numRows: 1 ,
    lim: 10,
    off: 0,
    sortBy: 'last',
    order: 'DESC',
  },
  
   mounted() {
          axios.get('owner.php', {
                    params: {
                      limit: this.lim,
                      offset: this.off,
                      //sortBy: 'id'
                    }

            }).then(response => this.gridData = response.data);
            
            // axios.get('calc_rows_owner.php', {
            //                 params: {
            //                   //table: 'owner',
            //                   //col: 'cat'
            //                 }
            //         }).then(response => this.numRows = response.data);
        },
        
        // methods: {
        //         getNumOfPages: function(){
        //             var numPages = this.numRows /10;
        //             return numPages;
        //         },
        //         goFirst: function(){
                    
        //         },
        //     }
    
});

var pagination = new Vue({
            el: '#pagenation',
            // props:{
            //     numPages: Array,
            //     table: String,
            //     col: String,
                
            // },
            data: {
                currPage: 1,
                numRows: 1 ,
                //numPages: getNumOfPages
            },
            mounted(){
                axios.get('calc_rows_owner.php', {
                            params: {
                              //table: 'owner',
                              //col: 'cat'
                            }
                    }).then(response => this.numRows = response.data);
            },
            methods: {
                getNumOfPages: function(){
                    var numPages = this.numRows /10;
                    return numPages;
                },
                goFirst: function(){
                    axios.get('owner.php', {
                            params: {
                              limit: 10,
                              offset: 0,
                            }
        
                    }).then(response => demo.gridData = response.data);
                    this.currPage = 1;
                },
                goLast: function(){
                    axios.get('owner.php', {
                            params: {
                              limit: 13500,
                              offset: 13490,
                            }
        
                    }).then(response => demo.gridData = response.data);
                    this.currPage = 1350;
                },
                goPrev: function(){
                    if(this.currPage != 1){
                      // demo.lim = (this.currPage - 1) * 10;
                      // demo.off = demo.lim - 10;
                      axios.get('owner.php', {
                            params: {
                              limit:  10,
                              offset: (this.currPage - 1) * 10 - 10,
                            }
        
                      }).then(response => demo.gridData = response.data);
                      this.currPage--;
                    }
                    else{
                      // Do nothing
                    }
                    
                   
                },
                goNext: function(){
                    if(this.currPage != 1350){
                      // demo.lim = (this.currPage - 1) * 10;
                      // demo.off = demo.lim - 10;
                      axios.get('owner.php', {
                            params: {
                              limit:  10,
                              offset: (this.currPage + 1) * 10 - 10,
                            }
        
                      }).then(response => demo.gridData = response.data);
                      this.currPage++;
                    }
                    else{
                      // Do nothing
                    }
                    
                    
                },
            }
        });

