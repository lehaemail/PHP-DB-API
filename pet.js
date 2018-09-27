
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
    getAge: function(dob) {
        var birthdate = new Date(dob); // Get date of birth
        var cur = new Date();
        var diff = cur-birthdate; // This is the difference in milliseconds
        var age = Math.floor(diff/31557600000); // Divide by 1000*60*60*24*365.25
        return age;
    },
    getData: function (sort){
      axios.get('pet_sort.php', {
                    params: {
                      limit: demo.lim,
                      offset: demo.off,
                      sortBy: sort,
                      order: demo.order
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
    hide: function (id){
      axios.get('pet_hide.php', {
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
    gridColumns: ['photo','name', 'species', 'breed', 'dob', 'shots', 'licensed', 'sex', 'neutered', 'alive', 'notes', 'link_to_owner'],
    gridData: [],
    table: '',
    col: '',
    //numRows: 1,
    lim: 15,
    off: 0,
    sortBy: 'name',
    order: 'ASC',
  },
  
   mounted() {
          axios.get('pet.php', {
                    params: {
                      limit: this.lim,
                      offset: 0
                    }

            }).then(response => this.gridData = response.data);
            
            
        },
        
    // mounted(){
    //     axios.get('https://cs3660-lehaemail.c9users.io/M1/calc-rows.php', {
    //                 params: {
    //                   table: 'pet',
    //                   col: 'cat'
    //                 }
    //         }).then(response => this.numRows = response.data);
    // }
})

