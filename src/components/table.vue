<template>
  <div>
    <v-toolbar flat color="white">
      <v-toolbar-title>Справочник</v-toolbar-title>
      <v-divider
        class="mx-2"
        inset
        vertical
      ></v-divider>
      <v-spacer></v-spacer>
      <v-dialog v-model="dialog" max-width="500px">
        <v-btn slot="activator" color="primary" dark class="mb-2">Добавить фирму</v-btn>
        <v-card>
          <v-card-title>
            <span class="headline">{{ formTitle }}</span>
          </v-card-title>
          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.name" label="Название фирмы"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.inn" label="ИНН"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.boss" label="Руководитель"></v-text-field>
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
    <v-data-table
      :headers="headers"
      :items="companys"
      hide-actions
      class="elevation-1"
    >
      <template slot="items" slot-scope="props">
        <td>{{ props.item.name }}</td>
        <td class="text-xs-left">{{ props.item.inn }}</td>
        <td class="text-xs-left">{{ props.item.boss }}</td>
        <td class="justify-center layout px-0">
          <v-icon
            small
            class="mr-2"
            @click="editItem(props.item)"
          >
            edit
          </v-icon>
          <v-icon
            small
            @click="deleteItem(props.item)"
          >
            delete
          </v-icon>
        </td>
      </template>
      <template slot="no-data">
        <v-btn color="primary" @click="initialize">Пусто</v-btn>
      </template>
    </v-data-table>
  </div>
</template>
<script>
  import {listOfCompanys} from '../companyList.js';
  export default {
    data: () => ({
      dialog: false,
      headers: [
        {
          text: 'Название',
          align: 'left',
          sortable: true,
          value: 'name'
        },
        { text: 'ИНН', value: 'inn',sortable: 'true' },
        { text: 'Руководитель', value: 'boss' },
      ],
      companys: [],
      editedIndex: -1,
      editedItem: {
        name: '',
        inn: undefined,
        boss: '',
      },
      defaultItem: {
        name: '',
        inn: undefined,
        boss: '',
      }
    }),

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'Добавить фирму' : 'Редактировать'
      }
    },

    watch: {
      dialog (val) {
        val || this.close()
      }
    },

    created () {
      this.initialize()
    },

    methods: {
      initialize () {
        this.companys = listOfCompanys;
      },

      editItem (item) {
        this.editedIndex = this.companys.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },

      deleteItem (item) {
        const index = this.companys.indexOf(item)
        confirm('Вы уверенны?') && this.companys.splice(index, 1)
      },

      close () {
        this.dialog = false
        setTimeout(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        }, 300)
      },

      save () {
        if (this.editedIndex > -1) {
          Object.assign(this.companys[this.editedIndex], this.editedItem)
        } else {
          this.companys.push(this.editedItem)
        }
        this.close()
      }
    }
  }
</script>

<style scoped>
</style>
