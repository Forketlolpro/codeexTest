<template>
  <div>
    <v-autocomplete
      v-model="editedItem.name"
      label="Название фирмы"
      return-object
      hide-no-data
      hide-selected
      :items="items"
      :search-input.sync="search"
      ></v-autocomplete>
    <v-autocomplete
      v-model="editedItem.inn"
      hide-no-data
      hide-selected
      label="ИНН"
    ></v-autocomplete>
    <v-autocomplete
      v-model="editedItem.boss"
      hide-no-data
      hide-selected
      label="Руководитель"
    ></v-autocomplete>
  </div>
</template>

<script>
    import Api from '../Api.js'
    export default {
      data: ()=>({
              model: null,
              isEditing: false,
              search: null,
              items:[],
              entries: [],
              editedItem: {
                name: '',
                inn: undefined,
                boss: ''
              }
      }),
      watch: {
        search(val){
          Api.party({query: val})
            .then((data) => {
              this.entries=data.suggestions.map((elem)=>{
                return {value:elem.value}
              });
              console.log(this.entries)
              this.items.length=0;
              data.suggestions.forEach((elem)=>{
                this.items.push(elem.value);
              });
            })
            .catch(console.error);
        }
      }
    }
</script>
<style scoped>
</style>
