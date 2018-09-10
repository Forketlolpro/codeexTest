<template>
  <div>
    <v-toolbar flat color="white">
      <v-toolbar-title>Справочник</v-toolbar-title>
      <v-divider class="mx-2" inset vertical></v-divider>
      <v-spacer></v-spacer>
      <v-dialog v-model="dialog" max-width="500px">
        <v-btn slot="activator" color="primary" dark class="mb-2">Добавить фирму</v-btn>
        <v-card ref="form">
          <v-card-title>
            <span class="headline">{{ formTitle }}</span>
          </v-card-title>
          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.name" label="Название фирмы" :rules="[() => !!editedItem.name || 'Заполните поле']"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.inn" label="ИНН" :rules="[() => !!editedItem.inn || 'Заполните поле',()=>(editedItem.inn.toString().search(/[\D]/))?true:'Только числа']"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.boss" label="Руководитель" :rules="[() => !!editedItem.boss || 'Заполните поле']"></v-text-field>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" flat @click.native="close">Отмена</v-btn>
            <v-btn color="blue darken-1" flat @click.native="save">Сохранить</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-toolbar>
    <v-data-table :headers="headers" :items="companys" hide-actions class="elevation-1" :pagination.sync="pagination">
      <template slot="items" slot-scope="props">
        <td>{{ props.item.name }}</td>
        <td class="text-xs-left">{{ props.item.inn }}</td>
        <td class="text-xs-left">{{ props.item.boss }}</td>
        <td class="justify-center layout px-0">
          <v-icon small class="mr-2" @click="editItem(props.item)">
            edit
          </v-icon>
          <v-icon small @click="deleteItem(props.item)">
            delete
          </v-icon>
        </td>
      </template>
      <template slot="no-data">
        <v-btn color="primary" @click="initialize">Пусто</v-btn>
      </template>
    </v-data-table>
    <div class="text-xs-center pt-2">
      <v-pagination v-model="pagination.page" :length=pages></v-pagination>
    </div>
  </div>
</template>
<script>
  export default {
    data: () => ({
      pagination: {
        //количество  записей на странице
        rowsPerPage: 25,
      },
      dialog: false,
      //массив с заголовками таблицы
      headers: [{
        text: 'Название',
        align: 'left',
        sortable: true,
        value: 'name'
      },
        {
          text: 'ИНН',
          value: 'inn',
          sortable: 'true'
        },
        {
          text: 'Руководитель',
          value: 'boss'
        },
      ],
      companys: [],
      editedIndex: -1,
      editedItem: {
        name: '',
        inn: 0,
        boss: '',
      },
      defaultItem: {
        name: '',
        inn: 0,
        boss: '',
      }
    }),

    computed: {
      //пагинация страниц
      pages() {
        if (this.pagination.rowsPerPage == null ||
          this.companys.length == null
        ) return 0

        return Math.ceil(this.companys.length / this.pagination.rowsPerPage)
      },

      formTitle() {
        return this.editedIndex === -1 ? 'Добавить фирму' : 'Редактировать'
      }
    },

    watch: {
      dialog(val) {
        val || this.close()
      }
    },

    created() {
      if (window.localStorage.getItem('list') !== null) {
        this.initialize();
      } else {
        window.localStorage.setItem('list', JSON.stringify({
          list: [],
          test: 0
        }));
        this.initialize();
      }
    },

    methods: {
      pushToStorage() {
        window.localStorage.setItem('list', JSON.stringify({
          list: this.companys,
          test: 0
        }))
      },
      initialize() {
        this.companys = JSON.parse(window.localStorage.getItem('list')).list;
      },

      editItem(item) {
        this.editedIndex = this.companys.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },

      deleteItem(item) {
        const index = this.companys.indexOf(item)
        confirm('Вы уверенны?') && this.companys.splice(index, 1)
        this.pushToStorage();
      },

      close() {
        this.dialog = false
        setTimeout(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        }, 300)
      },

      save() {
        //validation
        if (this.editedItem.inn == 0 || this.editedItem.name.length == 0 || this.editedItem.boss.length == 0 || this.editedItem.inn.search(/[\D]/) != -1) {} else {
          if (this.editedIndex > -1) {
            Object.assign(this.companys[this.editedIndex], this.editedItem)
            this.pushToStorage();
          } else {
            this.companys.push(this.editedItem)
            this.pushToStorage();
          }
          this.close()
        }
      }
    }
  }
</script>

<style scoped>
</style>
